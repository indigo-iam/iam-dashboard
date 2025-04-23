// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { Profile, User, Awaitable, TokenSet } from "@auth/core/types";
import type { User as IamUser } from "@/models/scim";
import type { OIDCConfig } from "next-auth/providers";
import getConfig from "./utils/config";

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
    access_token?: string & DefaultSession["user"];
    expired: boolean;
    is_admin: boolean;
    token_expires?: Date & string;
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
  providers: [IamProvider],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin", signOut: "/signout" },
  callbacks: {
    authorized({ request, auth }) {
      if (request.nextUrl.pathname.startsWith("/api/auth")) {
        return true;
      }
      if (auth?.user && auth?.access_token) {
        return true;
      }
      return false;
    },
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
    async session({ session, token }) {
      const { access_token, expires_at, is_admin } = token;
      const expired = expires_at < Date.now();
      const token_expires = new Date(expires_at);
      session.user.id = token.userId;
      return { ...session, access_token, is_admin, expired, token_expires };
    },
  },
};

async function fetchMe(access_token: string): Promise<IamUser> {
  const info = {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };
  const { BASE_URL } = getConfig();
  const response = await fetch(`${BASE_URL}/scim/Me`, info);
  if (!response.ok) {
    throw Error("cannot fetch Me during authorization");
  }
  return await response.json();
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
