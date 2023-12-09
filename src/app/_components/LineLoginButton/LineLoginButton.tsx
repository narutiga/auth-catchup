'use client';

import { signIn } from 'next-auth/react';
import type { JSX, MouseEvent } from 'react';

type Props = {
  buttonText?: string;
  callbackUrl?: string;
};

export const LineLoginButton = ({
  buttonText = 'sign in with LINE',
  callbackUrl,
}: Props): JSX.Element => {
  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (callbackUrl != null) {
      await signIn('line', { callbackUrl });

      return;
    }

    await signIn('line');
  };

  return (
    <button
      type='button'
      className='dark:focus:ring-[#00c300]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#00c300] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#00c300]/90 focus:ring-4 focus:ring-[#00c300]/50'
      onClick={handleLogin}
    >
      <svg
        className='-ml-1 mr-2 h-4 w-4'
        aria-hidden='true'
        focusable='false'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.95-13.3c-.55 0-1.06.26-1.39.66-.1.12-.18.24-.26.38-.08-.14-.16-.26-.26-.38-.33-.4-.84-.66-1.39-.66-1.1 0-2 .9-2 2s.9 2 2 2c.55 0 1.06-.26 1.39-.66.1-.12.18-.24.26-.38.08.14.16.26.26.38.33.4.84.66 1.39.66 1.1 0 2-.9 2-2s-.9-2-2-2zm7.9 0c-.55 0-1.06.26-1.39.66-.1.12-.18.24-.26.38-.08-.14-.16-.26-.26-.38-.33-.4-.84-.66-1.39-.66-1.1 0-2 .9-2 2s.9 2 2 2c.55 0 1.06-.26 1.39-.66.1-.12.18-.24.26-.38.08.14.16.26.26.38.33.4.84.66 1.39.66 1.1 0 2-.9 2-2s-.9-2-2-2zm-7.9 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7.9 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
        ></path>
      </svg>
      {buttonText}
    </button>
  );
};
