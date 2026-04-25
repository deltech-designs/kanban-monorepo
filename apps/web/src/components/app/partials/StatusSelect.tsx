import React from 'react';

export interface StatusOption {
  id: string;
  label: string;
  color: string;
}

interface StatusSelectProps {
  id?: string;
  label?: string;
  options: StatusOption[];
  value: string;
  onChange: (value: string) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
  const selectedColor = options.find((o) => o.id === value)?.color ?? '#A0AEC0';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Colored dot */}
        <span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none"
          style={{ backgroundColor: selectedColor }}
        />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-full pl-8 pr-8 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2 h-2 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
