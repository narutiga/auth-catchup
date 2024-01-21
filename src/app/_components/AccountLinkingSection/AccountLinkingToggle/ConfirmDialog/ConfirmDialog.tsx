import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getAccountAction } from '@/app/actions';
import { AccountProvider } from '@/lib/fetchAccountProviders';
import { Toast } from '@/components/toast/Toast';

type Props = {
  title: string;
  provider: AccountProvider;
  isOpen: boolean;
  onClose: () => void;
};

const unlinkAccount = async (provider: AccountProvider) => {
  const res = await fetch('api/account', {
    method: 'DELETE',
    body: JSON.stringify({ provider }),
  });
  if (!res.ok) {
    Toast.error({ message: 'アカウントの解除に失敗しました' });
  }
};

export const ConfirmDialog = ({
  title,
  provider,
  isOpen,
  onClose,
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
              await unlinkAccount(provider);
              await getAccountAction();
              onClose();
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
