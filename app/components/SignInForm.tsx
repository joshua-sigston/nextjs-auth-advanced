import React from 'react';
import CardWrapper from './CardWrapper';

export default function SignInForm() {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backBtnLabel="Don't have an account"
      backBtnHref="/auth/register"
      showSocial
    >
      <div className="text-center">SignIn</div>
    </CardWrapper>
  );
}
