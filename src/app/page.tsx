import {
  AccountLinkingSection,
  GoogleLoginButton,
  LineLoginButton,
  LogoutButton,
  UserProfile,
} from '@/app/_components';
import type { Session } from 'next-auth';
import { headers } from 'next/headers';
import type { JSX } from 'react';

async function fetchSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = (await response.json()) as Session;

  return Object.keys(session).length > 0 ? session : null;
}

type ValidSession = {
  user: {
    name: string;
    email?: string;
    image: string;
  };
  expires: string;
  appAccessToken: string;
};

function isValidSession(session: Session | null): session is ValidSession {
  if (session) {
    // サンプルコードなので手抜きしているが実際はちゃんと型検査をする
    if (session.user?.name != null && session.user.image != null) {
      return true;
    }
  }

  return false;
}

export default async function Home(): Promise<JSX.Element> {
  const session = await fetchSession(headers().get('cookie') ?? '');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {isValidSession(session) ? (
        <>
          <UserProfile
            name={session.user.name}
            email={session.user.email ?? ''}
            avatarUrl={session.user.image}
          />
          <AccountLinkingSection />
          <LogoutButton />
        </>
      ) : (
        <span className='isolate inline-flex rounded-md shadow-sm'>
          <GoogleLoginButton />
          <LineLoginButton />
        </span>
      )}
    </main>
  );
}
