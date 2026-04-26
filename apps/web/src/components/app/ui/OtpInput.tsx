'use client';

import React, { useRef, useState } from 'react';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 4, onChange }) => {
  const [internalValue, setInternalValue] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;

    // Allow only numeric input
    if (!/^[0-9]*$/.test(val)) return;

    const newOtp = [...internalValue];
    // Keep only the last character if multiple are pasted/typed
    newOtp[index] = val.substring(val.length - 1);

    setInternalValue(newOtp);
    if (onChange) onChange(newOtp.join(''));

    // Move focus to next input
    if (val && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !internalValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text/plain')
      .trim()
      .replace(/[^0-9]/g, '');

    if (pastedData) {
      const newOtp = [...internalValue];
      for (let i = 0; i < length; i++) {
        if (pastedData[i]) newOtp[i] = pastedData[i];
      }
      setInternalValue(newOtp);
      if (onChange) onChange(newOtp.join(''));

      // Focus on the appropriate input after paste
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 my-8">
      {internalValue.map((data, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 focus:outline-none transition-all"
        />
      ))}
    </div>
  );
};

OtpInput.displayName = 'OtpInput';
