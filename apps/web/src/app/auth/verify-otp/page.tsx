'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/app/partials/Button';
import { OtpInput } from '@components/ui/OtpInput';
// import Onboarding from '../dashboard/onboarding';

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Verifying OTP:', otp);
      setTimeout(() => {
        router.push('/workspace');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fc] font-sans p-4">
      <div className="bg-white p-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-full max-w-[450px] text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-600 rounded-full mb-6">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="m-0 text-[28px] font-bold text-gray-900 tracking-tight">
          Verify your account
        </h1>
        <p className="mt-3 mb-2 text-[15px] text-gray-500 leading-relaxed px-2">
          We&apos;ve sent a 4-digit code to your email. Please enter it below to continue to your
          Kanban board.
        </p>

        <form onSubmit={handleVerify}>
          <OtpInput length={4} onChange={setOtp} />

          <Button
            type="submit"
            fullWidth
            className="py-3.5 text-base bg-[#3b46f1] hover:bg-blue-700 rounded-xl"
            disabled={otp.length !== 4}
          >
            {loading ? 'verifying...' : 'Verify'}
          </Button>
        </form>

        <p className="mt-6 text-[14px] text-gray-500">
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            className="text-blue-600 font-medium hover:text-blue-700 bg-transparent border-none cursor-pointer"
          >
            Resend code
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase">
            Secure Verification
          </span>
        </div>
      </div>

      {/* {isModalOpen && <WorkspaceSetupModal onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
}
