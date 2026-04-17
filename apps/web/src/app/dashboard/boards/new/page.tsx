'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const COLORS = ['#4A90E2', '#4CAF88', '#F5A623', '#FF6B6B', '#9B59B6', '#1A1F36'];

export default function CreateBoardModal() {
  const router = useRouter();
  const [boardName, setBoardName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleClose = () => {
    router.back();
  };

  

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardName.trim()) return;
    // In a real app, you would create the board via API
    // Redirecting directly back to workspace or new board path
    router.push('/dashboard/boards');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto p-4 bg-black/40 backdrop-blur-[2px] transition-all">
      <div
        className="bg-white relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 w-full max-w-[480px] rounded-2xl p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button top right */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-5 top-5 text-[#A0AEC0] hover:text-[#1A1F36] hover:bg-slate-100 p-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          aria-label="Close modal"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#1A1F36] tracking-tight mb-2">Create Board</h2>
        <p className="text-gray-500 text-[15px] mb-8">
          Boards are where your team collaborates on projects.
        </p>

        <form onSubmit={handleCreate} className="space-y-7">
          {/* Board Name Field */}
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase mb-2.5 text-[#1A1F36]">
              Board Name
            </label>
            <input
              type="text"
              autoFocus
              placeholder="e.g. Social Media Campaign"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-[#1A1F36] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#4A90E2] focus:ring-4 focus:ring-[#4A90E2]/15 transition-all"
              required
            />
          </div>

          {/* Board Color Field */}
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase mb-3 text-[#1A1F36]">
              Board Color
            </label>
            <div className="flex gap-4">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className="flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    boxShadow:
                      selectedColor === color
                        ? `0 0 0 3px white, 0 0 0 5px ${color}`
                        : '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                  aria-label={`Select color ${color}`}
                >
                  <div
                    className={`transition-all duration-200 ${
                      selectedColor === color ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Private Board Toggle */}
          <div
            className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-4 flex items-center justify-between group hover:border-slate-200 transition-colors cursor-pointer"
            onClick={() => setIsPrivate(!isPrivate)}
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-400 bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:text-[#4A90E2] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-[#1A1F36]">Private Board</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Only invited members can see this.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isPrivate}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2] ${
                isPrivate ? 'bg-[#4A90E2]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  isPrivate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3.5 rounded-xl font-semibold text-[14px] text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#1A1F36] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl font-semibold text-[14px] text-white bg-[#4A90E2] hover:bg-[#3b82f6] shadow-sm active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-[#4A90E2]/25"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
