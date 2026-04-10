'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthBrandingPanel } from '@/components/app/features/onboarding/AuthBrandingPanel';
import { AuthFormPanel } from '@/components/app/features/onboarding/AuthFormPanel';
import { SignupForm } from '@/components/app/features/auth/SignupForm';
import { Alert } from '@/components/app/ui/Alert';

export default function SignUp() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-otp');
  };

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <div className="absolute top-8 right-8 z-50 w-96">
          {/* <Alert type="success" title="Check your email" className="mb-6">
          We have sent a verification link to your email address.
        </Alert> */}
        </div>
        <AuthBrandingPanel
          title={
            <>
              Design your workflow
              <br />
              with kinetic precision.
            </>
          }
          subtitle="Join thousands of digital curators organizing their most ambitious projects in a space designed for flow."
        />

        <AuthFormPanel
          title="Create an account"
          subtitle="Start your 14-day free trial. No credit card required."
          containerClassName="pt-12"
          footerLink={{
            text: 'Already have an account?',
            linkText: 'Log in',
            href: '/login',
          }}
        >
          <SignupForm onSubmit={handleSignup} />
        </AuthFormPanel>
      </div>
    </>
  );
}
