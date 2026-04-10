'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthBrandingPanel } from '@/components/app/features/onboarding/AuthBrandingPanel';
import { AuthFormPanel } from '@/components/app/features/onboarding/AuthFormPanel';
import { LoginForm } from '@/components/app/features/auth/LoginForm';

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AuthBrandingPanel
        title={
          <>
            The Kinetic
            <br />
            Workspace.
          </>
        }
        subtitle="Move away from stagnant project management. Experience a fluid, editorial approach to your daily productivity."
      />

      <AuthFormPanel
        title="Welcome back"
        subtitle="Enter your credentials to access your workspace."
        containerClassName="pt-36"
        footerLink={{
          text: "Don't have an account?",
          linkText: 'Create Account',
          href: '/signup',
        }}
      >
        <LoginForm onSubmit={handleLogin} />
      </AuthFormPanel>
    </div>
  );
}
