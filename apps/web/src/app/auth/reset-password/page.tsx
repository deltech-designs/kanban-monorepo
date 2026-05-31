'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';
import { Alert } from '@/components/app/ui/Alert';
import { useAuth } from '@/hooks/useAuth';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage('Reset token is missing. Please request a new link.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(token, password);
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setErrorMessage(result.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 className="m-0 text-[26px] font-bold text-gray-900 tracking-tight font-sans">Reset Password</h1>

        {!isSubmitted ? (
          <>
            <p className="mt-3 mb-6 text-[15px] text-gray-500 leading-relaxed px-1">
              Please choose a new strong password for your Hiram Board account.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg border border-rose-100 bg-rose-50 text-[13.5px] font-medium text-rose-600 text-left animate-in fade-in duration-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="text-left w-full">
              <Input
                label="New Password"
                type="password"
                id="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                id="confirm-password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                className="mt-4 mb-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-[15px]"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </>
        ) : (
          <div className="mt-4 mb-6">
            <Alert type="success" title="Password Reset Success" className="mb-6">
              <p>
                Your password has been reset successfully! Redirecting you to login...
              </p>
            </Alert>
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

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fc]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
