import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "flex items-center gap-3" }: LogoProps) {
  return (
    <div className={className}>
      <Image src="/logo_1.png" alt="Logo" width={30} height={30} />
      <span className="text-xl font-bold tracking-tight">HiramBoard</span>
    </div>
  );
}
