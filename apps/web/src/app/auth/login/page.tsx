'use client';
import React from 'react';
import { SignInIllustrationPanel } from '@/components/app/features/auth/signin/SignInIllustrationPanel';
import SignInForm from '@/components/app/features/auth/signin/SignInForm';

export default function Login() {
  return (
    <>
      <main className="flex min-h-screen">
        {/* Form panel */}
        <div className="flex flex-1 items-center justify-center bg-white py-10">
          <SignInForm />
        </div>

        <SignInIllustrationPanel />
      </main>
    </>
  );
}
