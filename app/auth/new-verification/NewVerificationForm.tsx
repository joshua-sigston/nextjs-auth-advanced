'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CardWrapper from '../components/CardWrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerificaiont } from '@/actions/newVerification';
import ErrorMsg from '../components/ErrorMsg';
import SuccessMsg from '../components/SuccessMsg';

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // console.log(success);
  // console.log(error);
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Missing token');
      return;
    }

    console.log(token);
    newVerificaiont(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backBtnHref="/auth/signIn"
      backBtnLabel="Back to Sign In"
    >
      <div className="flex items-center justify-center w-full">
        {!error && !success && <BeatLoader />}
      </div>
      {!success && <ErrorMsg message={error} />}
      <SuccessMsg message={success} />
    </CardWrapper>
  );
}
