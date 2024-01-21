import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, sql } from 'drizzle-orm';
import * as jose from 'jose';
import { db } from '@/db';
import { accounts } from '@/db/schema';
import { options } from '@/features/auth';

export async function DELETE(req: NextRequest) {
  const reqJson = await req.json();
  const { provider } = reqJson;

  const session = await getServerSession(options);
  const jwt = String(session?.appAccessToken);
  const secret = new TextEncoder().encode(
    String(process.env.APP_ACCESS_TOKEN_SECRET)
  );
  const { payload } = await jose.jwtVerify(jwt, secret);
  const userId = String(payload.sub);

  const existingAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  if (existingAccounts.length === 1) {
    return new Response(null, {
      status: 204,
    });
  }

  const targetAccount = existingAccounts.find(
    (account) => account.provider === provider
  );

  if (targetAccount === undefined) {
    return NextResponse.json({ error: 'NOT FOUND' }, { status: 404 });
  }

  try {
    await db
      .delete(accounts)
      .where(eq(accounts.providerAccountId, targetAccount.providerAccountId));
    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'UNEXPECTED_ERROR_HAS_OCCURRED' },
      { status: 400 }
    );
  }
}
