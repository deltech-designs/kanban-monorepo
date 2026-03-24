'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  match?: 'exact' | 'prefix';
  activePaths?: string[];
}

const MAIN_NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard/workspaces',
    label: 'Workspaces',
    match: 'prefix',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm10-10a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V5z"
        />
      </svg>
    ),
  },
  {
    href: '/dashboard/boards',
    label: 'Boards',
    match: 'exact',
    icon: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M7 3v4m10-4v4M6 11h3m-3 4h3m5-4h4m-4 4h4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    href: '/dashboard/team',
    label: 'Team',
    match: 'prefix',
    icon: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    )
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    match: 'prefix',
    icon: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.573 1.066 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.065 2.572 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.066 2.573 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.572 1.065 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.573-1.066 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.065-2.572 1.724 1.724 0 010-3.35 1.724 1.724 0 001.066-2.573 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    href: '/help',
    label: 'Help',
    match: 'prefix',
    icon: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

function isActivePath(pathname: string, item: NavItem) {
  const { href, match = 'exact', activePaths = [] } = item;
  const directMatch =
    match === 'prefix' ? pathname === href || pathname.startsWith(`${href}/`) : pathname === href;

  if (directMatch) {
    return true;
  }

  return activePaths.some(
    (activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`)
  );
}

function getNavItemClassName(isActive: boolean, isSecondary = false) {
  const baseClassName = isSecondary
    ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-[14px] transition-all'
    : 'flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-[14px] transition-all';

  if (isActive) {
    return `${baseClassName} bg-[#F2F4FF] text-[#4A3CF0] shadow-[inset_0_0_0_1px_rgba(74,60,240,0.08)]`;
  }

  return isSecondary
    ? `${baseClassName} text-[#5F6778] hover:text-[#1F2937]`
    : `${baseClassName} text-[#5F6778] hover:bg-white/70 hover:text-[#1F2937]`;
}

export function Sidebar() {
  const pathname = usePathname() || '';

  return (
    <aside className="w-66 h-screen bg-white/65 backdrop-blur-3xl border-r border-[#E6E9F1] flex flex-col justify-between py-6 px-4">
      <div>
        <div className="px-3 mb-8">
          <h1 className="text-[26px] font-black tracking-tight text-[#1F2430] leading-none">
            HiramBoard
          </h1>
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#99A0B1] mt-1.5">
            The Kinetic Workspace
          </p>
        </div>

        <nav className="space-y-1.5">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={getNavItemClassName(isActive)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <Link
          href="/dashboard/boards/new"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#4A3CF0] hover:bg-[#3F33D6] text-white py-2.5 rounded-xl font-semibold mb-6 shadow-[0_8px_18px_rgba(74,60,240,0.35)] transition-all text-[13px]"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create
        </Link>

        <nav className="space-y-1.5">
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={getNavItemClassName(isActive, true)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-xl bg-white/70 border border-[#E8ECF5] px-3 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#C8E0F5] to-[#E3F8F3] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#33516B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1F2937] leading-tight">Alex Rivera</p>
            <p className="text-[11px] text-[#99A0B1]">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
