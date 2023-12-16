import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  provider: string;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
};

async function deleteAccount(provider: string) {
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
  onToggle,
}: Props): JSX.Element => {
  // TODO: 送信中はボタンをdisabledにする
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='top-[0] translate-y-[0] sm:top-[50%] sm:max-w-[350px] sm:translate-y-[-50%]'>
        <DialogHeader>
          <DialogTitle className='text-base'>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='mt-4 gap-x-0.5 gap-y-2'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              キャンセル
            </Button>
          </DialogClose>
          <Button
            type='submit'
            className='flex gap-2'
            onClick={() => {
              deleteAccount(provider);
              onClose();
              onToggle();
            }}
          >
            <span>解除する</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
