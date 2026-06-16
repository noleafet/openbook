'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import { LuLoader } from 'react-icons/lu';

import { ErrorUtil } from '@/lib/errors';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/hooks/useAuth';
import { UserService } from '@/services/user-service';
import { useIsMounted } from '@/hooks/useIsMounted';


const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});


export default function LoginForm() {
  const { authUser, login, logout, isLoading } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMsg(null);

    UserService.authenticate(values).then(res => login(res)).catch(err => {
      const message = ErrorUtil.getErrorMessage(err);
      setErrorMsg(
        message || 'Invalid username or password.'
      );
    });
  }

  async function onClickLogout() {
    try {
      logout();
    } catch (err: unknown) {
      setErrorMsg(ErrorUtil.getErrorMessage(err));
    }
  }

  return (
    useIsMounted() && //snapshot to prevent hydration mismatch
    <div className='flex items-center justify-end'>

      {authUser && (
        <span className='flex flex-row gap-2 items-center'>
          <span className='text-lg'>{authUser.user.name}</span>
          <Button title='Logout' onClick={onClickLogout} variant='ghost' className='p-0 w-5 cursor-pointer [&>svg]:size-full!'>
            <PiSignOutDuotone />
          </Button>
        </span>
      )}

      {!authUser && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-row gap-2 items-center'>

            {/* Username Field */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className="max-w-36">
                  <FormControl>
                    <Input
                      placeholder='Username'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-10 max-w-36 border-sm border-gray-700 bg-black/30 py-1 px-3 text-sm text-destructive' />
                  {/* Global Error Display */}
                  {errorMsg && (
                    <span className='absolute top-11 border-sm border-gray-700 bg-black/30 py-1 px-3 text-sm text-destructive'>
                      {errorMsg}
                    </span>
                  )}
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className="max-w-36">
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-10 max-w-36 border-sm border-gray-700 bg-black/30 py-1 px-3 text-sm text-destructive' />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button title='Login' variant='ghost' type='submit' className='p-0 w-6 cursor-pointer [&>svg]:size-full!' disabled={isLoading}>
              {isLoading ? <LuLoader /> : <PiSignInDuotone />}
            </Button>

          </form>
        </Form>
      )}
    </div>
  );
}