'use client';

import React, { useState, useTransition } from 'react';
import CardWrapper from '../components/CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { reset } from '@/actions/reset';
import {
  useForm,
  ResetSchema,
  zodResolver,
  ErrorMsg,
  SuccessMsg,
} from '@/app/imports';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log(values);
    setError('');
    setSuccess('');
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backBtnLabel="Back to Sign In"
      backBtnHref="/auth/signIn"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ErrorMsg message={error} />
          <SuccessMsg message={success} />
          <Button
            disabled={isPending}
            type="submit"
            variant="default"
            className="w-full"
          >
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
