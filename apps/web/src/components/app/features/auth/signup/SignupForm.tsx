'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/app/partials/Logo';
import {useRouter} from "next/navigation";
import { TitleText } from '@/components/app/partials/TitleText';
import { DescriptionText } from '@/components/app/partials/DescriptionText';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';
import { AuthDivider } from '@/components/app/ui/AuthDivider';

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [] = useState({})

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: wire up signup API call
    setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <div className="flex flex-col w-full h-full px-3 py-5 max-w-[500px] mx-auto">
      {/* Heading */}
      <div className="w-full mb-8 ">
        <TitleText level={1} className="text-2xl font-bold text-gray-900 mb-2">
          Create your account
        </TitleText>
        <DescriptionText className="text-sm text-gray-500">
          Start managing work with your team.
        </DescriptionText>
      </div>

      {/* Google OAuth */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        className="py-2.5 text-sm text-gray-700 border-gray-300 bg- hover:bg-gray-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="w-full mt-6">
        <AuthDivider text="or continue with" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="" noValidate>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="primary"
          disabled={isLoading}
          className="mt-2  text-[15px]"
        >
          {isLoading ? 'Creating account…' : 'Create Account'}
        </Button>
      </form>

      {/* Bottom link */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}