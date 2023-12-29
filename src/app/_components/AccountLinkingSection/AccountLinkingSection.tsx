import { headers } from 'next/headers';
import { AccountLinkingToggle } from '@/app/_components/AccountLinkingSection/AccountLinkingToggle';
import {
  AccountProvider,
  fetchAccountProviders,
} from '@/lib/fetchAccountProviders';

const Accounts: AccountProvider[] = ['google', 'line'];

const checkSwitchDisabled = (
  provider: AccountProvider,
  accounts: AccountProvider[]
): boolean => {
  if (accounts.includes(provider) && accounts.length === 1) return true;
  return false;
};

export const AccountLinkingSection = async (): Promise<JSX.Element> => {
  const res = await fetchAccountProviders(headers().get('cookie') ?? '');
  const accounts = res.map((x) => x.provider);

  return (
    <div className='w-80 mb-8'>
      <p className='mb-2 text-base font-bold'>アカウント設定</p>
      <p className='mb-4 text-sm text-slate-600'>
        いずれかひとつの認証が必要です。アカウント削除する場合は運営にお問い合わせください。
      </p>
      <div className='px-5 pt-6 border-2 border-slate-200 rounded-lg'>
        {Accounts.map((account) => (
          <AccountLinkingToggle
            key={account}
            provider={account}
            isToggleOn={accounts.includes(account)}
            isDisabled={checkSwitchDisabled(account, accounts)}
          />
        ))}
      </div>
    </div>
  );
};
