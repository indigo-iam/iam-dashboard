// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { Profile, User, Awaitable, TokenSet } from "@auth/core/types";
import type { User as IamUser } from "@/models/scim";
import type { OIDCConfig } from "next-auth/providers";
import { settings } from "@/config";

const basePath = settings.basePath ?? "";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
    is_admin: boolean;
    userId: string;
  }
}

declare module "next-auth" {
  interface User {
    sub: string;
  }
  interface Session {
    access_token: string;
    is_admin: boolean;
    expired: boolean;
  }
}

const IamProvider: OIDCConfig<Profile> = {
  id: "indigo-iam",
  name: "Indigo-IAM",
  type: "oidc",
  issuer: process.env.IAM_AUTHORITY_URL,
  clientId: process.env.IAM_CLIENT_ID,
  clientSecret: process.env.IAM_CLIENT_SECRET,
  authorization: {
    params: {
      scope: process.env.IAM_SCOPES,
    },
  },
  checks: ["pkce", "state"],
  profile: (profile: Profile, _: TokenSet): Awaitable<User> => {
    const user: User = {
      id: profile.sub ?? undefined,
      name: profile.name ?? undefined,
      email: profile.email ?? undefined,
      image: profile.picture ?? undefined,
      sub: profile.sub as string,
    };
    return user;
  },
};

export const authConfig: NextAuthConfig = {
  debug: process.env.AUTH_DEBUG === "true",
  providers: [IamProvider],
  session: { strategy: "jwt" },
  basePath: `${basePath}/api/auth`,
  pages: { signIn: "/signin", signOut: "/signout" },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        // first time login, save access token and expiration
        const { access_token } = account;
        const expires_at = (account.expires_at ?? 0) * 1000;
        const me = await fetchMe(access_token);
        const indigoUser = me["urn:indigo-dc:scim:schemas:IndigoUser"];
        const is_admin =
          indigoUser?.authorities?.includes("ROLE_ADMIN") ?? false;
        token.userId = user.sub;
        return { ...token, access_token, is_admin, expires_at };
      }
      return token;
    },
    async authorized({ auth }) {
      return !!auth && !auth.expired;
    },
    async session({ session, token }) {
      const { access_token, expires_at, is_admin } = token;
      session.user.id = token.userId;
      session.access_token = access_token;
      session.is_admin = is_admin;
      session.expired = expires_at < Date.now();
      return session;
    },
  },
};

async function fetchMe(access_token: string): Promise<IamUser> {
  const info = {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };
  const { BASE_URL } = settings;
  const response = await fetch(`${BASE_URL}/scim/Me`, info);
  if (!response.ok) {
    throw Error("cannot fetch Me during authorization");
  }
  return await response.json();
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
