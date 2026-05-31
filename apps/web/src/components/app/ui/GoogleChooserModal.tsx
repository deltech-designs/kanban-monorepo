'use client';

import React, { useState } from 'react';

interface GoogleProfile {
  email: string;
  name: string;
  googleId: string;
  avatar?: string;
  color: string;
}

const GOOGLE_ACCOUNTS: GoogleProfile[] = [
  {
    email: 'alex.river@gmail.com',
    name: 'Alex River',
    googleId: 'google-user-1111',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    color: '#3b82f6',
  },
  {
    email: 'sarah.chen@gmail.com',
    name: 'Sarah Chen',
    googleId: 'google-user-2222',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    color: '#10b981',
  },
  {
    email: 'marcus.vance@gmail.com',
    name: 'Marcus Vance',
    googleId: 'google-user-3333',
    avatar: undefined,
    color: '#f59e0b',
  },
];

interface GoogleChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (profile: { email: string; name: string; googleId: string; avatar?: string }) => void;
}

export function GoogleChooserModal({ isOpen, onClose, onSelect }: GoogleChooserModalProps) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;

    // Generate a random numeric google ID
    const randomId = 'google-user-' + Math.floor(100000 + Math.random() * 900000);
    onSelect({
      name: customName,
      email: customEmail,
      googleId: randomId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in">
      <div 
        className="w-full max-w-[420px] rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.14)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-[#f1f5f9]">
          <svg className="w-8 h-8 mb-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Choose an account</h2>
          <p className="text-sm text-gray-500 mt-1">to continue to Hiram Board</p>
        </div>

        {/* Content list */}
        {!showCustomForm ? (
          <div className="mt-4 flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
            {GOOGLE_ACCOUNTS.map((profile) => (
              <button
                key={profile.googleId}
                onClick={() => onSelect(profile)}
                className="flex items-center gap-3.5 w-full p-2.5 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group text-left outline-none cursor-pointer"
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover shadow-xs border border-gray-100"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[15px] font-bold shadow-xs shrink-0"
                    style={{ backgroundColor: profile.color }}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {profile.name}
                  </p>
                  <p className="text-[12px] text-gray-500 truncate mt-0.5 leading-none">
                    {profile.email}
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3 text-blue-600" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4.5l2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            ))}

            <button
              onClick={() => setShowCustomForm(true)}
              className="flex items-center gap-3.5 w-full p-2.5 rounded-xl border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all duration-200 text-left outline-none cursor-pointer mt-1"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-700 leading-tight">Use another account</p>
                <p className="text-[12px] text-gray-400 mt-0.5 leading-none">Simulate custom profile</p>
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="mt-4 space-y-3.5">
            <div>
              <label htmlFor="custom-name" className="text-[12px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                id="custom-name"
                type="text"
                placeholder="John Doe"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full h-10.5 rounded-xl border border-[#cbd5e1] bg-gray-50 px-3 text-[14px] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="custom-email" className="text-[12px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                Google Email Address
              </label>
              <input
                id="custom-email"
                type="email"
                placeholder="john.doe@gmail.com"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full h-10.5 rounded-xl border border-[#cbd5e1] bg-gray-50 px-3 text-[14px] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="flex-1 h-10 rounded-xl border border-gray-200 text-[13.5px] font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 h-10 rounded-xl bg-blue-600 text-[13.5px] font-bold text-white shadow-md hover:bg-blue-700 cursor-pointer shadow-blue-200"
              >
                Choose Profile
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex justify-between items-center text-[11.5px] text-gray-400">
          <span>Google Secure SSO</span>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold hover:text-red-500 hover:underline bg-transparent border-none cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
