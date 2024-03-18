import React from 'react';

interface Props {
  label: string;
}

export default function Header({ label }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-semibold">Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
