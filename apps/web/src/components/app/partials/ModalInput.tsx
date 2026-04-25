import React, { forwardRef, InputHTMLAttributes } from 'react';

interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const ModalInput = forwardRef<HTMLInputElement, ModalInputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all ${className}`}
          {...props}
        />
      </div>
    );
  }
);

ModalInput.displayName = 'ModalInput';
