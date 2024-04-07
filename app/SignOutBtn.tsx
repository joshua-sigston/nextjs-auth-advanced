'use client';
import { signOut } from '@/auth';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function SignOutBtn({ children }: Props) {
  const onClick = () => {
    signOut();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
