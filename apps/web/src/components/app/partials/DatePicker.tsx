'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { formatRelativeDate } from '@/utils/formatRelativeDate';

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const CalendarIcon = () => (
  <svg
    className="w-2 h-2 text-slate-400 shrink-0 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, id, className = '', placeholder = 'Set date...', value, ...props }, ref) => {
    const displayValue = value ? formatRelativeDate(value as string) : placeholder;

    const hasValue = Boolean(value);

    return (
      <div className="flex flex-col gap-1.5">
        {/* Optional label — only renders when passed */}
        {label && (
          <label htmlFor={id} className="text-xs font-bold tracking-wider uppercase text-slate-400">
            {label}
          </label>
        )}

        {/* Wrapper — positions hidden native input over the styled display */}
        <div className="relative inline-block w-full">
          {/* Native input — invisible but fully functional, sits on top */}
          <input
            ref={ref}
            id={id}
            type="date"
            value={value}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            onClick={(e) => {
              try {
                if ('showPicker' in HTMLInputElement.prototype) {
                  e.currentTarget.showPicker();
                }
              } catch (err) {
                // Fallback: if the JS showPicker API is blocked, 
                // the CSS hack in className covers most WebKit/Blink browsers natively.
                // As a last resort, ensure the input gets focus so screen readers and keyboards can interact.
                e.currentTarget.focus();
              }
              if (props.onClick) props.onClick(e);
            }}
            {...props}
          />

          {/* Styled display layer */}
          <div
            className={[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg',
              'bg-slate-50 border border-slate-200',
              'text-[12px] font-medium',
              'focus-within:ring-2 focus-within:ring-blue-400/15 focus-within:border-blue-400',
              'hover:bg-slate-100 transition-colors',
              hasValue ? 'text-slate-700' : 'text-slate-400',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <CalendarIcon  />
            <span>{displayValue}</span>
          </div>
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
