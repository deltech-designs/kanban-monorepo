'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { APP_NAME } from '@kanban/config';
import { Logo } from '../partials/Logo';
import { useRouter } from 'next/navigation';

export interface TopNavProps {}

export function TopNav({}: TopNavProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the profile menu if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., clearing tokens)
    setIsProfileMenuOpen(false);
    router.push('/auth/login');
  };

  return (
    <header className="h-16 px-6 lg:px-8 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-30">
      {/* Left side spacer to ensure center alignment */}
      <div className="flex-1">{/* You could place the Logo here if needed */}</div>

      {/* Center: workspace name */}
      <div className="flex-1 flex justify-center items-center">
        <span className="text-[14px] font-bold text-slate-700 tracking-tight truncate px-4 py-1.5 bg-slate-100/70 rounded-full border border-slate-200/50">
          {APP_NAME}
        </span>
      </div>

      {/* Right: notification bell + user avatar */}
      <div className="flex flex-1 items-center gap-2 lg:gap-3 justify-end shrink-0">
        {/* Notification bell */}
        <button
          id="navbar-notifications"
          className="group relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell
            className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors"
            strokeWidth={2}
          />
          {/* Unread dot */}
          <span className="absolute right-[9px] top-[9px] w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white shadow-sm" />
        </button>

        <div className="w-px h-5 bg-slate-200/80 mx-1 hidden sm:block"></div>

        {/* User avatar */}
        <div className="relative" ref={menuRef}>
          <button
            id="navbar-user-avatar"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-[13px] font-bold shadow-sm hover:shadow-md hover:scale-105 hover:ring-4 hover:ring-blue-50 transition-all duration-200"
            aria-label="User profile"
          >
            JD
          </button>

          {/* Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                    JD
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-tight">Jane Doe</h3>
                    <p className="text-[12px] text-slate-500 truncate max-w-[150px]">
                      jane.doe@example.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 flex flex-col gap-0.5">
                <button
                  className="w-full flex items-center px-3 py-2 text-[12px] font-medium text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    router.push('/dashboard/settings');
                  }}
                >
                  <User className="w-2 h-2 mr-3 text-slate-400" />
                  Account Settings
                </button>

                <button
                  className="w-full flex items-center px-3 py-2 text-[12px] font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-2 h-2 mr-3 text-rose-400" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
