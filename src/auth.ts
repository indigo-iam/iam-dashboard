import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { Profile, User, Awaitable, TokenSet } from "@auth/core/types";
import type { User as IamUser } from "@/models/user";
import type { OIDCConfig } from "next-auth/providers";
import getConfig from "./utils/config";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
    is_admin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    access_token?: string & DefaultSession["user"];
    expires_at: number;
    is_admin: boolean;
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
    };
    return user;
  },
};

export const authConfig: NextAuthConfig = {
  providers: [IamProvider],
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
        const me = await fetchMe(access_token);
        token.is_admin =
          me["urn:indigo-dc:scim:schemas:IndigoUser"].authorities?.includes(
            "ROLE_ADMIN"
          ) ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.expires_at = token.expires_at;
      session.is_admin = token.is_admin;
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
  const { BASE_URL } = getConfig();
  const response = await fetch(`${BASE_URL}/scim/Me`, info);
  if (!response.ok) {
    throw Error("cannot fetch Me during authorization");
  }
  return await response.json();
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
