import React from 'react';
import NavBar from './_components/navbar';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <div
      className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
    from-slate-400 to-emerald-800"'
    >
      <NavBar />
      {children}
    </div>
  );
}
