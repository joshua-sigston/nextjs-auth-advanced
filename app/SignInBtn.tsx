'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export default function SignInBtn({
  children,
  mode = 'redirect',
  asChild,
}: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/auth/signIn`);
  };

  if (mode === 'modal') {
    return <span>TODO: implement modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
