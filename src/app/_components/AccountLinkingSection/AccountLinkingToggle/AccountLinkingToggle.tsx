'use client';

import { AccountProvider } from '@/app/_components/AccountLinkingSection/AccountLinkingSection';
import { ConfirmDialog } from '@/app/_components/AccountLinkingSection/AccountLinkingToggle/ConfirmDialog';
import { action } from '@/app/actions';
import { Switch } from '@/components/ui/switch';
import { signIn } from 'next-auth/react';
import { useState, type JSX } from 'react';

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
    default:
      return '';
  }
};

export const AccountLinkingToggle = ({
  provider,
  isToggleOn,
  isDisabled,
}: Props): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const providerName = getProviderName(provider);

  const toggleSwitch = async () => {
    if (isToggleOn) {
      setIsDialogOpen(true);
    }
    if (!isToggleOn) {
      await signIn(provider);
      action();
    }
  };

  return (
    <div className='flex mb-6'>
      <Switch
        checked={isToggleOn}
        disabled={isDisabled}
        onClick={toggleSwitch}
      />
      <label className='ml-4'>{`${providerName}アカウントを連携`}</label>
      <ConfirmDialog
        title={`${providerName}アカウント連携を解除しますか`}
        provider={provider}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onClick={action}
      />
    </div>
  );
};
