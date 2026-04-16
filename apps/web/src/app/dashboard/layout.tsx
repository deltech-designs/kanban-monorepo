'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/app/layout/Sidebar';
import { TopNav } from '../../components/app/layout/TopNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#F7F8FC] overflow-hidden">
      <Sidebar
        // workspace={{
        //   name: fetchedWorkspace.name,
        //   initial: fetchedWorkspace.initial, // or null, since the sidebar now auto-initializes the first character
        //   plan: fetchedWorkspace.plan,
        // }}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
