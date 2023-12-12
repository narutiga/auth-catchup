'use client';

import { Switch } from '@/components/ui/switch';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface LinkState {
  isGoogleLinked: boolean;
  isLineLinked: boolean;
}

const initialLinkState: LinkState = {
  isGoogleLinked: true,
  isLineLinked: false,
};

export const AccountLinkingSection = (): JSX.Element => {
  const [linkState, setLinkState] = useState<LinkState>(initialLinkState);
  const onGoogleAccountLink = async () => {
    if (linkState.isGoogleLinked) {
      setLinkState({ ...linkState, isGoogleLinked: false });
    }
    if (!linkState.isGoogleLinked) {
      // await signIn('google');
      setLinkState({ ...linkState, isGoogleLinked: true });
    }
  };

  const onLineAccountLink = async () => {
    if (linkState.isLineLinked) {
      setLinkState({ ...linkState, isLineLinked: false });
    }
    if (!linkState.isLineLinked) {
      // await signIn('line');
      setLinkState({ ...linkState, isLineLinked: true });
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
            checked={linkState.isGoogleLinked}
            onClick={onGoogleAccountLink}
            disabled={!linkState.isLineLinked}
          />
          <label className='ml-4'>Googleアカウントを連携</label>
        </div>
        <div className='flex'>
          <Switch
            checked={linkState.isLineLinked}
            onClick={onLineAccountLink}
            disabled={!linkState.isGoogleLinked}
          />
          <label className='ml-4'>LINEアカウントを連携</label>
        </div>
      </div>
    </div>
  );
};
