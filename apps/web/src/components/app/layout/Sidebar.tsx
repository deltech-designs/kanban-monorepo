'use client';

import React, {} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


interface Board {
  id: string;
  name: string;
  color: string;
}

const MOCK_BOARDS: Board[] = [
  { id: '1', name: 'Website Redesign', color: '#4A90E2' },
  { id: '2', name: 'Q4 Roadmap', color: '#4CAF88' },
  { id: '3', name: 'Mobile App', color: '#F5A623' },
];

export interface WorkspaceData {
  name: string;
  initial: string;
  plan?: string;
}

interface SidebarProps {
  workspace?: WorkspaceData;
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

function BoardsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm10-10a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V5z"
      />
    </svg>
  );
}

function MembersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a4 4 0 00-5.196-3.804M13 20H3v-2a4 4 0 015.197-3.804M13 20v-2a4 4 0 00-2-3.465M9 20v-2a4 4 0 012-3.465M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.573 1.066 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.065 2.572 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.066 2.573 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.572 1.065 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.573-1.066 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.065-2.572 1.724 1.724 0 010-3.35 1.724 1.724 0 001.066-2.573 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

export function Sidebar({
  workspace = {
    name: 'FlowBoard Team',
    initial: 'F',
    plan: 'Free plan',
  },
}: SidebarProps = {}) {
  const pathname = usePathname() || '';
  const router = useRouter(); 
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isBoardsActive = pathname.startsWith('/dashboard/boards');
  const isMembersActive = pathname.startsWith('/dashboard/members');
  const isSettingsActive = pathname.startsWith('/dashboard/settings');

  const activeBoardId = pathname.match(/\/dashboard\/boards\/([^/]+)/)?.[1] ?? null;

  function navItemClass(isActive: boolean) {
    const base =
      'group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer select-none text-[13.5px] font-medium relative';
    if (isActive)
      return `${base} bg-gradient-to-r from-[#4A90E2]/10 to-[#4A90E2]/5 text-[#4A90E2] shadow-sm`;
    return `${base} text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155]`;
  }

    const handleLogout = () => {
      // Implement actual logout logic here (e.g., clearing tokens)
      setIsProfileModalOpen(false);
      router.push('/auth/login');
    };

  return (
    <aside
      className="flex h-screen flex-col bg-white shrink-0 overflow-hidden"
      style={{
        width: 256,
        borderRight: '1px solid #f1f5f9',
        boxShadow: '1px 0 0 0 #f1f5f9',
      }}
    >
      {/* Workspace header */}
      <div className="px-4 pt-5 pb-4 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' }}
          >
            {workspace.initial || workspace.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-[#1e293b] truncate leading-tight">
              {workspace.name}
            </p>
            <p className="text-[11px] text-[#94a3b8] leading-tight mt-0.5">{workspace.plan}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f1f5f9] mx-4 shrink-0" />

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">

        {/* Section label */}
        <p className="px-3 pb-1.5 text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
          Navigation
        </p>

        {/* All Boards */}
        <Link
          id="sidebar-all-boards"
          href="/dashboard/boards"
          className={navItemClass(isBoardsActive)}
        >
          {isBoardsActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4A90E2] rounded-r-full" />
          )}
          <BoardsIcon className="w-[18px] h-[18px] shrink-0" />
          <span className="flex-1 truncate">All Boards</span>
          <span className="text-[11px] bg-[#4A90E2]/10 text-[#4A90E2] font-semibold px-1.5 py-0.5 rounded-full">
            {MOCK_BOARDS.length}
          </span>
        </Link>

        {/* Members */}
        <Link
          id="sidebar-members"
          href="/dashboard/members"
          className={navItemClass(isMembersActive)}
        >
          {isMembersActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4A90E2] rounded-r-full" />
          )}
          <MembersIcon className="w-[18px] h-[18px] shrink-0" />
          <span className="flex-1 truncate">Members</span>
        </Link>

        {/* Settings */}
        <Link
          id="sidebar-settings"
          href="/dashboard/settings"
          className={navItemClass(isSettingsActive)}
        >
          {isSettingsActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4A90E2] rounded-r-full" />
          )}
          <SettingsIcon className="w-[18px] h-[18px] shrink-0" />
          <span className="flex-1 truncate">Settings</span>
        </Link>

        {/* Boards section */}
        <div className="pt-4">
          <div className="flex items-center justify-between px-3 pb-1.5">
            <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
              Boards
            </p>
            <Link
              href="/dashboard/boards/new"
              className="w-5 h-5 rounded-md flex items-center justify-center text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#4A90E2] transition-colors"
              title="Create board"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-0.5">
            {MOCK_BOARDS.map((board) => {
              const isActive = activeBoardId === board.id;
              return (
                <Link
                  key={board.id}
                  href={`/dashboard/boards/${board.id}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 ${
                    isActive
                      ? 'bg-[#f8fafc] text-[#1e293b] font-semibold'
                      : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: board.color }}
                  />
                  <span className="truncate flex-1">{board.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2] shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Divider above bottom section */}
      <div className="h-px bg-[#f1f5f9] mx-4 shrink-0" />

      {/* Bottom: user row */}
      <div className="px-3 py-4 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' }}
          >
            JD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#1e293b] truncate leading-tight">
              John Doe
            </p>
            <p className="text-[11px] text-[#94a3b8] leading-tight mt-0.5">john@example.com</p>
          </div>
          <button
            id="sidebar-logout"
            className="text-[#94a3b8] hover:text-red-500 transition-colors duration-150 shrink-0 p-1 rounded-lg hover:bg-red-50"
            title="Logout"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogoutIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
