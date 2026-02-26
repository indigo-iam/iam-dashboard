// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { settings } from "@/config";
import type { User as IamUser } from "@/models/scim";
import { betterAuth } from "better-auth";
import type { BetterAuthOptions, OAuth2Tokens } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { headers, cookies } from "next/headers";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

function decodeJWT(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}

const {
  IAM_API_URL,
  IAM_DASHBOARD_BASE_URL,
  IAM_DASHBOARD_BASE_PATH,
  IAM_DASHBOARD_AUTH_SECRET,
  IAM_DASHBOARD_OIDC_CLIENT_ID,
  IAM_DASHBOARD_OIDC_CLIENT_SECRET,
  IAM_DASHBOARD_OIDC_SCOPES,
  IAM_DASHBOARD_OIDC_ADMIN_SCOPES,
} = settings;

const discoveryUrl = `${IAM_API_URL}/.well-known/openid-configuration`;

async function wellKnown() {
  const response = await fetch(discoveryUrl);
  return await response.json();
}

export async function refreshAccessToken(refreshToken: string, scope?: string) {
  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refreshToken);
  body.append("client_id", IAM_DASHBOARD_OIDC_CLIENT_ID);
  body.append("client_secret", IAM_DASHBOARD_OIDC_CLIENT_SECRET);
  if (scope) {
    body.append("scope", scope);
  }
  const { token_endpoint } = await wellKnown();
  const res = await fetch(token_endpoint, {
    method: "POST",
    body,
  });

  const data = await res.json();
  const tokens: OAuth2Tokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    scopes: data.scope?.split(" "),
    idToken: data.id_token,
  };

  if (data.expires_in) {
    const now = new Date();
    tokens.accessTokenExpiresAt = new Date(
      now.getTime() + data.expires_in * 1000
    );
  }

  if (data.refresh_token_expires_in) {
    const now = new Date();
    tokens.refreshTokenExpiresAt = new Date(
      now.getTime() + data.refresh_token_expires_in * 1000
    );
  }
  return tokens;
}

const indigoIam = () =>
  genericOAuth({
    config: [
      {
        providerId: "indigo-iam",
        discoveryUrl: discoveryUrl,
        clientId: IAM_DASHBOARD_OIDC_CLIENT_ID,
        clientSecret: IAM_DASHBOARD_OIDC_CLIENT_SECRET,
        scopes: IAM_DASHBOARD_OIDC_ADMIN_SCOPES?.split(" "),
        pkce: true,
        getToken: async ({ code, codeVerifier, redirectURI }) => {
          /*
          1. At login, asks for highest privileges, i.e., admin scopes.
          2. If IAM returns those scopes, the user is an admin
          3. If the user is an admin, immediately refresh the token with
             default scopes.
          */
          // 1. Login with admin scopes
          const { token_endpoint } = await wellKnown();
          const body = new URLSearchParams();
          body.append("client_id", IAM_DASHBOARD_OIDC_CLIENT_ID);
          body.append("client_secret", IAM_DASHBOARD_OIDC_CLIENT_SECRET);
          body.append("scope", IAM_DASHBOARD_OIDC_ADMIN_SCOPES);
          body.append("code", code);
          body.append("redirect_uri", redirectURI);
          body.append("grant_type", "authorization_code");
          if (codeVerifier) {
            body.append("code_verifier", codeVerifier);
          }

          const response = await fetch(token_endpoint, {
            method: "POST",
            body,
          });
          const data = await response.json();
          const tokens = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
            scopes: data.scope?.split(" ") ?? [],
            raw: data,
          } satisfies OAuth2Tokens;

          // 2. Check if the users received admin scopes
          if (data.scope?.includes("iam:admin")) {
            console.debug(
              "Logged as admin, refreshing token with down scopes."
            );
            // 3. Refresh the token with lower scopes
            return await refreshAccessToken(
              tokens.refreshToken,
              IAM_DASHBOARD_OIDC_SCOPES
            );
          }
          return tokens;
        },
      },
    ],
  });

export const authConfig = (db: Database.Database) => {
  return {
    baseURL: `${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}/api/auth`,
    secret: IAM_DASHBOARD_AUTH_SECRET,
    database: db,
    user: {
      additionalFields: {
        sub: {
          type: "string",
          input: false,
        },
      },
    },
    session: {
      expiresIn: 3600,
      additionalFields: {
        hasRoleAdmin: {
          type: "boolean",
          defaultValue: false,
        },
      },
    },
    databaseHooks: {
      session: {
        create: {
          before: async (sessionData, ctx) => {
            if (!ctx) {
              return { data: { ...sessionData } };
            }
            const [account] =
              await ctx.context.internalAdapter.findAccountByUserId(
                sessionData.userId
              );
            const { idToken, accessToken } = account;
            if (!idToken || !accessToken) {
              throw new Error(
                "failed to get user info: access token not found"
              );
            }
            const hasRoleAdmin = await fetchRoleAdmin(accessToken);
            const profile = decodeJWT(idToken);
            return { data: { ...sessionData, hasRoleAdmin, profile } };
          },
        },
      },
    },
    account: {
      storeStateStrategy: "database",
      storeAccountCookie: false,
      updateAccountOnSignIn: true,
    },
    plugins: [indigoIam(), nextCookies()],
  } satisfies BetterAuthOptions;
};

export const auth = betterAuth(authConfig(globalThis.db));
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;

async function fetchRoleAdmin(accessToken: string) {
  const authorization = `Bearer ${accessToken}`;
  const response = await fetch(`${IAM_API_URL}/scim/Me`, {
    headers: { authorization },
  });
  if (!response.ok) {
    throw new Error("cannot fetch admin role");
  }
  const me = (await response.json()) as IamUser;
  const indigoUser = me["urn:indigo-dc:scim:schemas:IndigoUser"];
  return indigoUser?.authorities?.includes("ROLE_ADMIN") ?? false;
}

export async function getSession(): Promise<Session | null> {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function getAccessToken() {
  return await auth.api.getAccessToken({
    body: {
      providerId: "indigo-iam",
    },
    headers: await headers(),
  });
}

/*
  Perform a refresh token flow with defined scope and save new tokens in the
  database
*/
export async function updateAccessToken(scope: string) {
  const session = await getSession();
  if (!session) {
    console.error("Session not found");
    return;
  }
  const ctx = await auth.$context;
  const [account] = await ctx.internalAdapter.findAccountByUserId(
    session.user.id
  );
  if (account.refreshToken) {
    try {
      const tokens = await refreshAccessToken(account.refreshToken, scope);
      await ctx.internalAdapter.updateAccount(account.id, {
        accessToken: tokens.accessToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshToken: tokens.refreshToken,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        scope: tokens.scopes?.join(" "),
      });
      console.debug("Refreshed access token.");
      return tokens.accessToken;
    } catch (e: any) {
      console.error("Failed to refresh access token:", e);
      return null;
    }
  }
  return account.accessToken;
}

export async function isUserAdmin() {
  const { scopes } = await getAccessToken();
  return scopes.join(" ").includes("iam:admin");
}

export async function signIn() {
  const scopes = IAM_DASHBOARD_OIDC_ADMIN_SCOPES.split(" ");
  const { url } = await auth.api.signInWithOAuth2({
    body: {
      providerId: "indigo-iam",
      callbackURL: `${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}`,
      scopes,
    },
  });
  return url; // '/authorize' endpoint
}

export async function signOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("JSESSIONID");
  await auth.api.signOut({ headers: await headers() });
}
