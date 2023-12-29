import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

import ProfilePage from '@/containers/Profile';

export default function Profile() {
  return <ProfilePage />;
}
