'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccountProvider } from '@/app/_components/AccountLinkingSection/AccountLinkingSection';
import { useState } from 'react';

type Props = {
  title: string;
  provider: AccountProvider;
  isOpen: boolean;
  onClose: () => void;
  onFetchAccount: () => void;
};

async function deleteAccount(provider: AccountProvider) {
  await fetch('api/account', {
    method: 'DELETE',
    body: JSON.stringify({ provider }),
  });
}

export const ConfirmDialog = ({
  title,
  provider,
  isOpen,
  onClose,
  onFetchAccount,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='top-[0] translate-y-[0] sm:top-[50%] sm:max-w-[350px] sm:translate-y-[-50%]'>
        <DialogHeader>
          <DialogTitle className='text-base'>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='mt-4 gap-x-0.5 gap-y-2'>
          <DialogClose asChild>
            <Button type='button' variant='outline' disabled={isLoading}>
              キャンセル
            </Button>
          </DialogClose>
          <Button
            type='button'
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await deleteAccount(provider);
              onClose();
              onFetchAccount();
              setIsLoading(false);
            }}
          >
            <span>解除する</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
