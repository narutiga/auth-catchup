import { GoogleLoginButton } from '@/app/_components';
import type { JSX } from 'react';

// エラーメッセージの一覧は https://next-auth.js.org/configuration/pages#sign-in-page に記載されているので必要な物を定義する
type AuthErrorMessage =
  | 'OAuthSignin'
  | 'OAuthCallback'
  | 'OAuthCreateAccount'
  | 'EmailCreateAccount'
  | 'Callback'
  | 'OAuthAccountNotLinked'
  | 'EmailSignin'
  | 'CredentialsSignin'
  | 'SessionRequired';

type Props = {
  params: unknown;
  searchParams: {
    // TODO 型ガード用の関数とちゃんとした型を用意したほうが良い
    callbackUrl?: string;
    error?: AuthErrorMessage;
  };
};

function getErrorMessage(errorMessage?: AuthErrorMessage): string {
  if (errorMessage === 'OAuthAccountNotLinked') {
    return 'お手数ですが前回と同じアカウントでログインをお願いします。';
  }

  return '予期せぬエラーが発生しました。申し訳ありませんがしばらく時間が経ってからお試しください。';
}

export default function AuthErrorPage({ searchParams }: Props): JSX.Element {
  const errorMessage = getErrorMessage(searchParams.error);

  // TODO サンプルなので手抜き実装だが実際にはURLをバリデーションして自身のアプリケーションのURLかどうかを検証したほうが良い
  const callbackUrl =
    typeof searchParams.callbackUrl === 'string'
      ? searchParams.callbackUrl
      : process.env.NEXTAUTH_URL;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div
        className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'
        role='alert'
      >
        <strong className='font-bold'>
          ログイン中にエラーが発生しました。
        </strong>
        <span className='block sm:inline'>{errorMessage}</span>
      </div>
      <span className='isolate inline-flex rounded-md shadow-sm'>
        <GoogleLoginButton callbackUrl={callbackUrl} />
      </span>
    </main>
  );
}
