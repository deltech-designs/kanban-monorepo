import React from 'react';

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = 'OR CONTINUE WITH EMAIL' }: AuthDividerProps) {
  return (
    <div className="flex items-center mb-8 before:content-[''] before:flex-1 before:border-b before:border-gray-200 after:content-[''] after:flex-1 after:border-b after:border-gray-200">
      <span className="px-3 text-[11px] text-gray-400 uppercase font-semibold tracking-wider">
        {text}
      </span>
    </div>
  );
}
