import React from 'react';
import { Button } from '../ui/Button';

export function TopNav() {
  return (
    <header className="h-19.5 px-8 flex items-center justify-between border-b border-[#E6E9F2] bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="w-105 max-w-[52%]">
        <div className="relative">
          <svg
            className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA3B6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search across workspace..."
            className="w-full bg-[#F4F6FB] border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-[#4B5565] placeholder:text-[#A1A8B8] focus:bg-white focus:border-[#CFD7EB] focus:ring-2 focus:ring-[#E6EAFE] transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="h-9 bg-[#4A3CF0] hover:bg-[#3F33D6] text-white px-5 rounded-lg text-[13px] font-semibold shadow-[0_8px_18px_rgba(74,60,240,0.28)]">
          Create
        </Button>

        <button
          className="relative w-9 h-9 rounded-full border border-[#E3E8F3] bg-white flex items-center justify-center text-[#6B7384] hover:text-[#4A3CF0] hover:border-[#D3DAEA] transition-colors"
          aria-label="Notifications"
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
        </button>

        <button
          className="w-9 h-9 rounded-full bg-white border border-[#E3E8F3] flex items-center justify-center overflow-hidden hover:border-[#D3DAEA] transition-colors"
          aria-label="User profile"
        >
          <svg className="w-5 h-5 text-[#6B7384]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
