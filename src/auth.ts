// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { settings } from "@/config";
import type { User as IamUser } from "@/models/scim";
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { headers, cookies } from "next/headers";
import { nextCookies } from "better-auth/next-js";

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

export const auth = betterAuth({
  baseURL: `${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}/api/auth`,
  secret: IAM_DASHBOARD_AUTH_SECRET,
  user: {
    additionalFields: {
      hasRoleAdmin: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
      sub: {
        type: "string",
        defaultValue: "",
        required: true,
        input: false,
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "indigo-iam",
          discoveryUrl: `${IAM_API_URL}/.well-known/openid-configuration`,
          clientId: IAM_DASHBOARD_OIDC_CLIENT_ID,
          clientSecret: IAM_DASHBOARD_OIDC_CLIENT_SECRET,
          scopes: IAM_DASHBOARD_OIDC_SCOPES?.split(" "),
          getUserInfo: async tokens => {
            const { idToken, accessToken } = tokens;
            if (!idToken || !accessToken) {
              // returning null will raise an exception during the login flow
              return null;
            }
            const hasRoleAdmin = await fetchRoleAdmin(accessToken);
            const profile = decodeJWT(idToken);
            return {
              id: profile.sub,
              emailVerified: profile.email_verified ?? false,
              name: profile.name,
              email: profile.email,
              sub: profile.sub,
              hasRoleAdmin,
            };
          },
        },
      ],
    }),
    nextCookies(),
  ],
  session: {
    expiresIn: 3600,
    disableSessionRefresh: true,
    cookieCache: {
      strategy: "jwe",
      enabled: true,
      maxAge: 3600,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
    updateAccountOnSignIn: true,
  },
});

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

// For unknown reasons, setting isAdmin in the getUserInfo function does not
// get update between each session, despite the same check on scopes.
// Although calling this function every time is required to known if the
// current user is an admin or not, the cost could be beneficial in terms of
// synchronization
export async function isUserAdmin() {
  const { scopes } = await getAccessToken();
  return scopes ? scopes.findIndex(s => s.includes("iam:admin")) > 0 : false;
}

export async function signIn(role: "default" | "admin" = "default") {
  console.debug(`Signin in with role '${role}'...`);
  const scope =
    role === "admin"
      ? IAM_DASHBOARD_OIDC_ADMIN_SCOPES
      : IAM_DASHBOARD_OIDC_SCOPES;
  const scopes = scope.split(" ");
  const { url } = await auth.api.signInWithOAuth2({
    body: {
      providerId: "indigo-iam",
      callbackURL: `${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}`,
      scopes,
    },
  });
  return url; // /authorize endpoint
}

export async function signOut(fromLoginService = false) {
  if (fromLoginService) {
    const cookiesStore = await cookies();
    cookiesStore.delete("JSESSIONID");
  }
  await auth.api.signOut({ headers: await headers() });
}
