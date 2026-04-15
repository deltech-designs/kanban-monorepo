'use client';

import React from 'react';
import { SignupIllustrationPanel } from '@/components/app/features/auth/signup/SignupIllustrationPanel';
import { SignupForm } from '@/components/app/features/auth/signup/SignupForm';

export default function SignUp() {
  return (
    <main className="flex min-h-screen">
      <SignupIllustrationPanel />

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-white py-10">
        <SignupForm />
      </div>
    </main>
  );
}
