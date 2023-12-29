import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
};

import SignInPage from '@/containers/SignIn';

export default function SignIn() {
  return <SignInPage />;
}
