'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  label: string;
}

export default function BackBtn({ href, label }: Props) {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
