'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from './Avatar';

export interface AvatarSelectOption {
  name: string;
  src?: string;
}

interface AvatarSelectProps {
  id?: string;
  label?: string;
  options: AvatarSelectOption[];
  value: number;
  onChange: (index: number) => void;
}

export const AvatarSelect: React.FC<AvatarSelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options[value] ?? options[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (index: number) => {
    onChange(index);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Trigger + dropdown wrapper */}
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all cursor-pointer"
        >
          <Avatar name={selected.name} src={selected.src} size="xs" />
          <span className="flex-1 text-left truncate">{selected.name}</span>
          {/* Chevron */}
          <svg
            className={`w-2 h-2 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <ul
            role="listbox"
            className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg py-1 overflow-hidden"
          >
            {options.map((option, index) => (
              <li
                key={option.name}
                role="option"
                aria-selected={index === value}
                onClick={() => handleSelect(index)}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-sm transition-colors ${
                  index === value
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-800 hover:bg-slate-50'
                }`}
              >
                <Avatar name={option.name} src={option.src} size="xs" />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
