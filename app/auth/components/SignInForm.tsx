'use client';

import React, { useState, useTransition } from 'react';
import CardWrapper from './CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import {
  useForm,
  SignInSchema,
  zodResolver,
  ErrorMsg,
  SuccessMsg,
  signInUser,
} from '@/app/imports';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      signInUser(values).then((data) => {
        setError(data?.error);
        // @ts-ignore
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backBtnLabel="Don't have an account"
      backBtnHref="/auth/register"
      showSocial
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
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
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
