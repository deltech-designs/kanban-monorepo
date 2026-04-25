import React from 'react';

export type Priority = 'low' | 'med' | 'high';

export interface PriorityOption {
  id: Priority;
  label: string;
}

interface PrioritySelectProps {
  label?: string;
  options: PriorityOption[];
  value: Priority;
  onChange: (value: Priority) => void;
}

const getPriorityStyle = (option: Priority, selected: Priority): string => {
  const isActive = option === selected;
  if (!isActive) {
    return 'text-slate-500 hover:text-slate-700';
  }
  switch (option) {
    case 'low':
      return 'bg-white shadow-sm text-green-700';
    case 'med':
      return 'bg-white shadow-sm text-yellow-600';
    case 'high':
      return 'bg-white shadow-sm text-red-700';
    default:
      return '';
  }
};

export const PrioritySelect: React.FC<PrioritySelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex rounded-full bg-[#F4F5F7] p-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex-1 py-1.5 text-xs font-bold tracking-wide rounded-full transition-all ${getPriorityStyle(opt.id, value)}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

