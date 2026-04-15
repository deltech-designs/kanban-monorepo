'use client';

import React from 'react';
import { Logo } from '@/components/app/partials/Logo';
import { Button } from '@/components/app/partials/Button';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Logo />
      <Button>Sign In</Button>
    </header>
  );
}
