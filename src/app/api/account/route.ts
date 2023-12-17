import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, sql } from 'drizzle-orm';
import * as jose from 'jose';
import { db } from '@/db';
import { accounts } from '@/db/schema';
import { options } from '@/features/auth';

export const dynamic = 'force-dynamic';
// defaults to auto

export async function GET(req: Request) {
  const session = await getServerSession(options);

  const jwt = session?.appAccessToken || '';
  const secret = new TextEncoder().encode(
    process.env.APP_ACCESS_TOKEN_SECRET || ''
  );
  const { payload } = await jose.jwtVerify(jwt, secret);

  const userId = payload.sub || '';

  try {
    const res = await db
      .select({
        provider: accounts.provider,
      })
      .from(accounts)
      .where(eq(accounts.userId, userId));
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'UNEXPECTED_ERROR_HAS_OCCURRED' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const reqJson = await req.json();
  const { provider } = reqJson;

  const session = await getServerSession(options);

  const jwt = session?.appAccessToken || '';
  const secret = new TextEncoder().encode(
    process.env.APP_ACCESS_TOKEN_SECRET || ''
  );
  const { payload } = await jose.jwtVerify(jwt, secret);

  const userId = payload.sub;

  const existingAccount = await db
    .select()
    .from(accounts)
    .where(
      sql`${accounts.userId} = ${userId} and ${accounts.provider} = ${provider}`
    );

  if (existingAccount.length === 0) {
    return NextResponse.json({ error: 'NOT FOUND' }, { status: 404 });
  }

  try {
    await db
      .delete(accounts)
      .where(
        eq(accounts.providerAccountId, existingAccount[0].providerAccountId)
      );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'UNEXPECTED_ERROR_HAS_OCCURRED' },
      { status: 400 }
    );
  }

  return new Response(null, {
    status: 200,
  });
}
