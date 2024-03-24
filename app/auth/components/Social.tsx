'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';

export default function Social() {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callback: DEFAULT_SIGNIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      {/* import react icons */}
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          onClick('google');
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          onClick('github');
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
