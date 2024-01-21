import 'server-only';

import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import * as jose from 'jose';
import { db } from '@/db';
import { accounts } from '@/db/schema';
import { options } from '@/features/auth';

export type AccountProvider = 'google' | 'line';

type ProviderObject = {
  provider: AccountProvider;
};

export const fetchAccountProviders = async (): Promise<ProviderObject[]> => {
  const session = await getServerSession(options);
  const secret = new TextEncoder().encode(
    String(process.env.APP_ACCESS_TOKEN_SECRET)
  );
  const jwt = String(session?.appAccessToken);
  const { payload } = await jose.jwtVerify(jwt, secret);
  const userId = String(payload.sub);

  try {
    const res = await db
      .select({
        provider: accounts.provider,
      })
      .from(accounts)
      .where(eq(accounts.userId, userId));
    return res.map((x) => ({ provider: x.provider as AccountProvider }));
  } catch (e) {
    console.log(e);
    return [];
  }
};
