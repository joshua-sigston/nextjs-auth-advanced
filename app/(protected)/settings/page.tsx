'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';

export default async function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <form>
        <button type="submit" onClick={onClick}>
          Sign Out
        </button>
      </form>
    </div>
  );
}
