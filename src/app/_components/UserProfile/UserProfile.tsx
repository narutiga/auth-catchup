import type { JSX } from 'react';

type Props = {
  name: string;
  email: string;
  avatarUrl: string;
};

export const UserProfile = ({ name, email, avatarUrl }: Props): JSX.Element => {
  return (
    <div className='flex mb-8 items-center justify-center'>
      <div className='h-128 flex w-96 flex-col rounded-xl bg-gray-200'>
        <img className='w-auto rounded-t-xl' src={avatarUrl} alt='avatar' />
        <div className='flex flex-col p-2 text-center'>
          <span className='text-base font-bold'>{name}</span>
          <span className='text-xs'>{email}</span>
        </div>
      </div>
    </div>
  );
};
