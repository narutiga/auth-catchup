import {
  AccountLinkingSection,
  GoogleLoginButton,
  LineLoginButton,
  LogoutButton,
  UserProfile,
} from '@/app/_components';
import { Provider } from '@/app/_components/AccountLinkingSection/AccountLinkingSection';
import type { Session } from 'next-auth';
import { headers } from 'next/headers';
import type { JSX } from 'react';

type ProviderObject = {
  provider: Provider;
};

async function fetchSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });
  const session = (await response.json()) as Session;
  return Object.keys(session).length > 0 ? session : null;
}

async function fetchAccountProviders(
  cookie: string
): Promise<ProviderObject[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/account`, {
    method: 'GET',
    headers: { cookie },
    next: { tags: ['account'] },
  });
  if (!res.ok) return [];
  return res.json();
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
  const res = await fetchAccountProviders(headers().get('cookie') ?? '');
  const providers = res.map((x) => x.provider);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {isValidSession(session) ? (
        <>
          <UserProfile
            name={session.user.name}
            email={session.user.email ?? ''}
            avatarUrl={session.user.image}
          />
          <AccountLinkingSection accounts={providers} />
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
