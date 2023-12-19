'use client';

import { useState, type JSX, MouseEvent } from 'react';
import { signIn } from 'next-auth/react';
import { getAccountAction } from '@/app/actions';
import { Switch } from '@/components/ui/switch';
import { AccountProvider } from '@/app/_components/AccountLinkingSection/AccountLinkingSection';
import { ConfirmDialog } from '@/app/_components/AccountLinkingSection/AccountLinkingToggle/ConfirmDialog';

type Props = {
  provider: AccountProvider;
  isToggleOn: boolean;
  isDisabled: boolean;
};

const getProviderName = (provider: AccountProvider): string => {
  switch (provider) {
    case 'google':
      return 'Google';
    case 'line':
      return 'LINE';
  }
};

export const AccountLinkingToggle = ({
  provider,
  isToggleOn,
  isDisabled,
}: Props): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const providerName = getProviderName(provider);

  const onToggle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isToggleOn) {
      setIsDialogOpen(true);
    }
    if (!isToggleOn) {
      await signIn(provider);
      getAccountAction();
    }
  };

  return (
    <div className='flex mb-6'>
      <Switch
        id={provider}
        name={provider}
        checked={isToggleOn}
        disabled={isDisabled}
        onClick={onToggle}
      />
      <label
        htmlFor={provider}
        className='ml-4'
      >{`${providerName}アカウントを連携`}</label>
      <ConfirmDialog
        title={`${providerName}アカウント連携を解除しますか`}
        provider={provider}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onFetchAccount={getAccountAction}
      />
    </div>
  );
};
