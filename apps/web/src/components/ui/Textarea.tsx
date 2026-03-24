'use client';

import React, { TextareaHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, id, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="block text-[13px] font-bold tracking-wider uppercase text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            className={`w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4A3CF0] focus:ring-1 focus:ring-[#4A3CF0] transition-colors resize-y ${className}`}
            {...props}
          />
        </div>
        {hint && <span className="block text-xs text-gray-400 mt-2">{hint}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
