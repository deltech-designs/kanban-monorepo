'use client';

import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="EMAIL ADDRESS"
        type="email"
        id="email"
        placeholder="name@company.com"
        className="bg-gray-50/50"
      />

      <Input
        label={
          <div className="flex justify-between items-center w-full">
            <span>PASSWORD</span>
            <Link
              href="/forgot-password"
              className="text-[#4A3CF0] font-medium hover:underline normal-case text-sm"
            >
              Forgot?
            </Link>
          </div>
        }
        type="password"
        id="password"
        placeholder="Min. 8 characters"
        className="bg-gray-50/50"
      />

      <Button
        type="submit"
        fullWidth
        className="py-3 bg-[#4A3CF0] hover:bg-[#3B3AEC] text-base mt-2"
      >
        Login
      </Button>
    </form>
  );
}
