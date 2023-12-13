// RecoilRoot: CSR Component
'use client';
import { RecoilRoot } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export default function RecoilRootProvider({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
