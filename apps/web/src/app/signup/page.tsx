'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';

export default function SignUp() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify-otp');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-b from-[#3B3AEC] to-[#4A3CF0] flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-[3px]">
              <div className="w-2.5 h-2.5 bg-[#3B3AEC] rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-[#878DFD] rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-[#878DFD] rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-[#3B3AEC] rounded-[2px]" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">HiramBoard</span>
        </div>

        {/* Hero Content */}
        <div className="max-w-md mt-20 mb-auto">
          <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight mb-6">
            Design your workflow
            <br />
            with kinetic precision.
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-[400px]">
            Join thousands of digital curators organizing their most ambitious projects in a space
            designed for flow.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 w-max flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-white/50 mt-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-amber-600 mt-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-[#4A3CF0] flex items-center justify-center overflow-hidden">
              <svg
                className="w-8 h-8 text-emerald-600 mt-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">Trusted by 10k+ teams</p>
            <p className="text-white/70 text-xs">From startups to Fortune 500s</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col pt-12 pb-6 px-6 sm:px-12 lg:px-24">
        <div className="flex-1 flex flex-col justify-center max-w-[440px] w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Create an account
            </h2>
            <p className="text-gray-500 text-[15px]">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4 mb-8">
            <Button
              variant="outline"
              type="button"
              className="flex-1 bg-[#F3F4F6] border-transparent hover:border-gray-300 hover:bg-gray-100 text-gray-700 py-2.5 shadow-none"
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <Button
              variant="outline"
              type="button"
              className="flex-1 bg-[#F3F4F6] border-transparent hover:border-gray-300 hover:bg-gray-100 text-gray-700 py-2.5 shadow-none"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Button>
          </div>

          <div className="flex items-center mb-8 before:content-[''] before:flex-1 before:border-b before:border-gray-200 after:content-[''] after:flex-1 after:border-b after:border-gray-200">
            <span className="px-3 text-[11px] text-gray-400 uppercase font-semibold tracking-wider">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="FULL NAME"
              type="text"
              id="fullName"
              placeholder="John Doe"
              className="bg-gray-50/50"
            />

            <Input
              label="WORK EMAIL"
              type="email"
              id="email"
              placeholder="name@company.com"
              className="bg-gray-50/50"
            />

            <Input
              label="PASSWORD"
              type="password"
              id="password"
              placeholder="Min. 8 characters"
              className="bg-gray-50/50"
            />

            <Checkbox
              id="terms"
              required
              className="mt-6 mb-6"
              label={
                <span className="text-gray-500 font-normal">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-[#4A3CF0] font-medium hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#4A3CF0] font-medium hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              }
            />

            <Button
              type="submit"
              fullWidth
              className="py-3 bg-[#4A3CF0] hover:bg-[#3B3AEC] text-base"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-[14px] text-gray-600 mt-8 mb-auto">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4A3CF0] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        {/* <div className="mt-8 border-t border-gray-100 pt-6 flex flex-wrap justify-between md:justify-center md:gap-8 items-center text-[11px] font-medium text-gray-400 uppercase tracking-widest px-4 md:px-0">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-gray-600">
              TERMS
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              CONTACT
            </Link>
          </div>
          <span className="mt-4 md:mt-0">© 2024 HIRAMBOARD</span>
        </div> */}
      </div>
    </div>
  );
}
