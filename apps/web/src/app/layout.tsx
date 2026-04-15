import type { Metadata } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A professional Kanban board application built with Next.js and TypeScript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
