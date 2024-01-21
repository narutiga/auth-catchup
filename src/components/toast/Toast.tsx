'use client';

import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import {
  Cross2Icon,
  InfoCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface MessageProps {
  onClick: () => void;
  children: ReactNode;
}

const Message = ({ onClick, children }: MessageProps) => {
  return (
    <div className='flex items-center'>
      <span className='mr-3'>{children}</span>
      <Button
        variant='outline'
        className='h-auto bg-background p-2'
        onClick={onClick}
      >
        <Cross2Icon
          width={16}
          height={16}
          aria-label='hidden'
          className='text-black'
        />
      </Button>
    </div>
  );
};

interface Options {
  id?: string;
  type: 'notify' | 'success' | 'error' | 'caution';
}

const makeOptions = ({ id, type }: Options) => {
  // TailwindCSS のクラス名を動的に割り当てるとパージされてしまうため、直接色を指定しています
  const typedTextColor = {
    notify: '#000000',
    success: '#ffffff',
    error: '#ffffff',
    caution: '#000000',
  };
  const typedBgColor = {
    notify: '#ffffff',
    success: '#047857', // emerald/700
    error: '#B91C1C', // red/700
    caution: '#FCD34D', // amber/300
  };
  const options = {
    // duration: 100000, // デバッグ用
    style: {
      color: typedTextColor[type],
      backgroundColor: typedBgColor[type],
      padding: '8px 2px 8px 12px',
    },
  };
  return id ? { ...options, id } : options;
};

interface Props {
  message: string;
  id?: string;
}

const commonIconProps = {
  'aria-hidden': true,
  width: 20,
  height: 20,
  className: 'stroke-2',
};

export const Toast = {
  notify: ({ id, message }: Props) => {
    return toast(<Message onClick={() => toast.remove()}>{message}</Message>, {
      ...makeOptions({ id, type: 'notify' }),
      icon: <InfoCircledIcon {...commonIconProps} />,
    });
  },
  success: ({ id, message }: Props) => {
    return toast.success(
      <Message onClick={() => toast.remove()}>{message}</Message>,
      {
        ...makeOptions({ id, type: 'success' }),
        icon: <CheckCircledIcon {...commonIconProps} />,
      }
    );
  },
  error: ({ id, message }: Props) => {
    return toast.error(
      <Message onClick={() => toast.remove()}>{message}</Message>,
      {
        ...makeOptions({ id, type: 'error' }),
        icon: <CrossCircledIcon {...commonIconProps} />,
      }
    );
  },
  caution: ({ id, message }: Props) => {
    return toast(<Message onClick={() => toast.remove()}>{message}</Message>, {
      ...makeOptions({ id, type: 'caution' }),
      icon: <ExclamationTriangleIcon {...commonIconProps} />,
    });
  },
};
