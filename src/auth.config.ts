import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { Profile, User, Awaitable, TokenSet } from "@auth/core/types";
import type { OIDCConfig } from "next-auth/providers";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string;
    refresh_token?: string;
    expires_at: number;
    error?: string;
  }
}

declare module "next-auth" {
  interface Session {
    access_token?: string & DefaultSession["user"];
    error?: string;
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
      scope: "openid email profile offline_access scim:read scim:write",
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
  basePath: "/api/auth",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    // https://authjs.dev/guides/refresh-token-rotation
    async jwt({ token, user, account }) {
      if (account) {
        const { access_token } = account;
        token.accessToken = access_token;
        token.id = user.id;
        return {
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + (account.expires_in ?? 0)),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      try {
        // https://accounts.google.com/.well-known/openid-configuration
        // We need the `token_endpoint`.
        const endpoint = new URL("token", process.env.IAM_AUTHORITY_URL);
        const response = await fetch(endpoint, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.IAM_CLIENT_ID!,
            client_secret: process.env.IAM_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
          method: "POST",
        });

        const tokens: TokenSet = await response.json();

        if (!response.ok) {
          throw tokens;
        }

        return {
          ...token, // Keep the previous token properties
          access_token: tokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_in ?? 0)),
          // Fall back to old refresh token, but note that
          // many providers may only allow using a refresh token once.
          refresh_token: tokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.error = token.error;
      return session;
    },
  },
};
