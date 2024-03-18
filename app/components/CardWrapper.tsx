'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Header, Social, BackBtn } from '@/app/components/index';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  backBtnHref,
  backBtnLabel,
  showSocial,
}: Props) {
  return (
    <Card className="w-[325px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref} />
      </CardFooter>
    </Card>
  );
}
