'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ConfirmDialog } from '@/app/_components/ConfirmDialog/ConfirmDialog';
import { Switch } from '@/components/ui/switch';
import { action } from '@/app/actions';

export type Provider = 'google' | 'line';

type Props = {
  accounts: Provider[];
};

export const AccountLinkingSection = ({ accounts }: Props): JSX.Element => {
  const [isGoogleAccount, setIsGoogleAccount] = useState<boolean>(
    accounts.includes('google')
  );
  const [isLineAccount, setIsLineAccount] = useState<boolean>(
    accounts.includes('line')
  );
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false);
  const [isLineDialogOpen, setIsLineDialogOpen] = useState(false);

  const toggleGoogleAccount = async () => {
    if (isGoogleAccount) {
      setIsGoogleDialogOpen(true);
    }
    if (!isGoogleAccount) {
      await signIn('google');
      action();
    }
  };

  const toggleLineAccount = async () => {
    if (isLineAccount) {
      setIsLineDialogOpen(true);
    }
    if (!isLineAccount) {
      await signIn('line');
      action();
    }
  };

  return (
    <div className='w-80 mb-8'>
      <p className='mb-2 text-base font-bold'>アカウント設定</p>
      <p className='mb-4 text-sm text-slate-600'>
        いずれかひとつの認証が必要です。アカウント削除する場合は運営にお問い合わせください。
      </p>
      <div className='px-5 py-6 border-2 border-slate-200 rounded-lg'>
        <div className='flex mb-6'>
          <Switch
            checked={isGoogleAccount}
            disabled={!isLineAccount}
            onClick={toggleGoogleAccount}
          />
          <label className='ml-4'>Googleアカウントを連携</label>
          <ConfirmDialog
            title='Googleアカウント連携を解除しますか'
            provider='google'
            isOpen={isGoogleDialogOpen}
            onClose={() => setIsGoogleDialogOpen(false)}
            onToggle={() => setIsGoogleAccount(false)}
          />
        </div>
        <div className='flex'>
          <Switch
            checked={isLineAccount}
            disabled={!isGoogleAccount}
            onClick={toggleLineAccount}
          />
          <label className='ml-4'>LINEアカウントを連携</label>
          <ConfirmDialog
            title='LINEアカウント連携を解除しますか'
            provider='line'
            isOpen={isLineDialogOpen}
            onClose={() => setIsLineDialogOpen(false)}
            onToggle={() => setIsLineAccount(false)}
          />
        </div>
      </div>
    </div>
  );
};
