'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';
import { Alert } from '@/components/app/ui/Alert';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Add password reset logic here
      console.log('Sending reset link to:', email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fc] font-sans p-4">
      <div className="bg-white p-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-full max-w-[440px] text-center z-10 relative">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-xl mb-6 shadow-sm">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </div>

        <h1 className="m-0 text-[26px] font-bold text-gray-900 tracking-tight">Forgot Password?</h1>

        {!isSubmitted ? (
          <>
            <p className="mt-3 mb-8 text-[15px] text-gray-500 leading-relaxed px-1">
              No worries! Enter your email below and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="text-left w-full">
              <Input
                label="Email Address"
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              />

              <Button
                type="submit"
                fullWidth
                className="mt-2 mb-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-[15px]"
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="mt-4 mb-8">
            <Alert type="success" title="Check your email" className="mb-6">
              <p>
                We've sent password reset instructions to <strong>{email}</strong>.
              </p>
            </Alert>

            <Button
              type="button"
              variant="outline"
              fullWidth
              className="py-3 rounded-lg"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 w-full text-center">
          <p className="text-[14px] text-gray-500 m-0">
            Remembered your password?{' '}
            <Link href="/auth/login" className="text-blue-600 font-medium hover:underline text-[14px]">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-10 text-[13px] text-gray-400 absolute bottom-10">
        © {new Date().getFullYear()} HiramBoard Inc. All rights reserved.
      </div>
    </div>
  );
}
