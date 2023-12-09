'use client';

import { signOut } from 'next-auth/react';
import type { JSX, MouseEvent } from 'react';

const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

  await signOut({ callbackUrl: '/' });
};

export const LogoutButton = (): JSX.Element => {
  return (
    <button
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      onClick={handleLogout}
    >
      ログアウト
    </button>
  );
};
