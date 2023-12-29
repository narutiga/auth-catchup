import 'server-only';

export type AccountProvider = 'google' | 'line';

type ProviderObject = {
  provider: AccountProvider;
};

export async function fetchAccountProviders(
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
