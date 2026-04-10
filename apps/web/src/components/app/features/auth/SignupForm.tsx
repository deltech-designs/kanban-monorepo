'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import { Input } from '@/components/app/partials/Input';
import { Button } from '@/components/app/partials/Button';
import { Checkbox } from '@/components/app/partials/Checkbox';

interface SignupFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupForm({ onSubmit }: SignupFormProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        label={
          <span className="text-gray-500 font-normal">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary font-medium hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary font-medium hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        }
      />

      <Button type="submit" disabled={!isChecked} fullWidth className="py-3 bg-primary hover:bg-primary/80 text-base">
        Create Account
      </Button>
    </form>
  );
}
