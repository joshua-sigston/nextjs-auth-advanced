import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import CardWrapper from './CardWrapper';

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Somwthing went wrong!"
      backBtnHref="/auth/signIn"
      backBtnLabel="Back to Sign In"
      showSocial
    >
      <div></div>
    </CardWrapper>
  );
}
