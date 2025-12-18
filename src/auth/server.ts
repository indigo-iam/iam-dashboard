// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { settings } from "@/config";
import type { User as IamUser } from "@/models/scim";
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { nextCookies } from "better-auth/next-js";

function decodeJWT(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}

const {
  IAM_API_URL,
  IAM_AUTH_SECRET,
  IAM_DASHBOARD_BASE_URL,
  IAM_DASHBOARD_CLIENT_ID,
  IAM_DASHBOARD_CLIENT_SECRET,
  IAM_DASHBOARD_SCOPES,
} = settings;

export const auth = betterAuth({
  baseURL: IAM_DASHBOARD_BASE_URL,
  secret: IAM_AUTH_SECRET,
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean",
        defaultValue: false,
        required: true,
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
          clientId: IAM_DASHBOARD_CLIENT_ID,
          clientSecret: IAM_DASHBOARD_CLIENT_SECRET,
          scopes: IAM_DASHBOARD_SCOPES?.split(" "),
          getUserInfo: async tokens => {
            const { idToken, accessToken } = tokens;
            if (!idToken || !accessToken) {
              // returning null will raise an exception during the login flow
              return null;
            }
            const profile = decodeJWT(idToken);
            const me = await fetchMe(accessToken);
            const indigoUser = me["urn:indigo-dc:scim:schemas:IndigoUser"];
            const isAdmin =
              indigoUser?.authorities?.includes("ROLE_ADMIN") ?? false;
            return {
              id: profile.sub,
              emailVerified: profile.email_verified ?? false,
              name: profile.name,
              email: profile.email,
              sub: profile.sub,
              isAdmin,
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

async function fetchMe(access_token: string): Promise<IamUser> {
  const authorization = `Bearer ${access_token}`;
  const response = await fetch(`${IAM_API_URL}/scim/Me`, {
    headers: { authorization },
  });
  if (!response.ok) {
    throw Error("cannot fetch Me during authorization");
  }
  return await response.json();
}

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;

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

export async function signIn() {
  const { url } = await auth.api.signInWithOAuth2({
    body: { providerId: "indigo-iam" },
  });
  redirect(url);
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  const cookiesStore = await cookies();
  cookiesStore.getAll().forEach(c => cookiesStore.delete(c.name));
}
