import React from 'react';
import { Sidebar } from '../../components/app/layout/Sidebar';
import { TopNav } from '../../components/dashboard/TopNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
