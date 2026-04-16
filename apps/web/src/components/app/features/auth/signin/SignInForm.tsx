'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/app/partials/Logo';
import { TitleText } from '@/components/app/partials/TitleText';
import { DescriptionText } from '@/components/app/partials/DescriptionText';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';
import { AuthDivider } from '@/components/app/ui/AuthDivider';

interface SignInFormFields {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState<SignInFormFields>({
    email: '',
    password: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push('/dashboard/boards');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-115 px-4 py-8 sm:px-8">
    

      <div className="mb-8">
        <TitleText level={1} className="mb-2 text-[44px] font-bold leading-[1.05] text-neutral-900">
          Welcome back
        </TitleText>
        <DescriptionText className="text-base text-neutral-700">
          Enter your details to access your workspace.
        </DescriptionText>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="name@company.com"
          autoComplete="email"
          value={fields.email}
          onChange={(event) => setFields((prev) => ({ ...prev, email: event.target.value }))}
          className="h-12 rounded-xl border-transparent bg-[#EEF3FB] px-4 text-[15px] placeholder:text-[#97A3B7] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          required
        />

        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="password" className="text-[13px] font-medium text-neutral-700">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[12px] font-semibold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="........"
          autoComplete="current-password"
          value={fields.password}
          onChange={(event) => setFields((prev) => ({ ...prev, password: event.target.value }))}
          className="h-12 rounded-xl border-transparent bg-[#EEF3FB] px-4 text-[15px] placeholder:text-[#97A3B7] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          required
        />

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          className="mt-1 h-12 rounded-xl bg-linear-to-r from-[#0F4BC9] to-[#1260F0] text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(18,96,240,0.30)] hover:from-[#0E45BA] hover:to-[#1158DB]"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <div className="mt-3">
        <AuthDivider text="Or continue with" />
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        className="h-11 rounded-xl border-transparent bg-primary-light text-[15px] font-semibold text-neutral-800 shadow-none hover:border-[#D8E3F5] hover:bg-[#E8EFFB]"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </Button>

      <p className="mt-8 text-center text-[14px] text-neutral-700">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
          Sign up for free
        </Link>
      </p>
    </section>
  );
}
