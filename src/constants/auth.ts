import * as jose from 'jose';
import type { DefaultSession, NextAuthOptions, Session, User } from 'next-auth';
import type { DefaultJWT, JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    appAccessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    iat: number;
    exp: number;
    jti: string;
    provider?: OidcProvider;
  }
}

type OidcProvider = 'google' | 'line';

const isOidcProvider = (value: unknown): value is OidcProvider => {
  if (typeof value !== 'string') {
    return false;
  }

  // Providerの種類が増えたらリファクタリングを検討
  // Providerの種類が増えたら https://next-auth.js.org/providers/ を参照
  return value === 'google' || value === 'line';
};

export const options: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session: async ({
      session,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }) => {
      if (token.sub != null && token.provider != null) {
        const payload = {
          sub: token.sub,
          provider: String(token.provider),
        };

        const secret = new TextEncoder().encode(
          String(process.env.APP_ACCESS_TOKEN_SECRET)
        );

        const alg = 'HS256';

        session.appAccessToken = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg })
          .setExpirationTime('30d')
          .setJti(String(token.jti))
          .sign(secret);
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({ token, account }) => {
      if (account) {
        if (isOidcProvider(account.provider)) {
          token.provider = account.provider;
        }
      }

      return token;
    },
  },
};
