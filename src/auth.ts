import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { Profile, User, Awaitable, TokenSet } from "@auth/core/types";
import type { OIDCConfig } from "next-auth/providers";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
  }
}

declare module "next-auth" {
  interface Session {
    access_token?: string & DefaultSession["user"];
    expires_at: number;
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
      scope: "openid email profile scim:read scim:write",
    },
  },
  checks: ["pkce", "state"],

  profile: (profile: Profile, _: TokenSet): Awaitable<User> => {
    const user: User = {
      id: profile.sub ?? undefined,
      name: profile.name ?? undefined,
      email: profile.email ?? undefined,
      image: profile.picture ?? undefined,
    };
    return user;
  },
};

export const authConfig: NextAuthConfig = {
  providers: [IamProvider],
  // pages: {
  //   signIn: "/signin",
  // },
  callbacks: {
    authorized({ auth }) {
      let authorized = false;
      if (auth?.access_token) {
        authorized = auth.expires_at < Date.now();
      }
      return authorized;
    },
    async jwt({ token, account }) {
      if (account) {
        const { access_token } = account;
        if (!access_token) {
          throw Error("Access Token not found");
        }
        token.access_token = access_token;
        token.expires_at = (account.expires_at ?? 0) * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.expires_at = token.expires_at;
      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
