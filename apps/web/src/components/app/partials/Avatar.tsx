import React from 'react';
import Image from 'next/image';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; px: number }> = {
  xs: { container: 'w-5 h-5', text: 'text-[8px]', px: 22 },
  sm: { container: 'w-6 h-6', text: 'text-[10px]', px: 24 },
  md: { container: 'w-8 h-8', text: 'text-xs', px: 32 },
  lg: { container: 'w-10 h-10', text: 'text-sm', px: 40 },
};

/**
 * Derives initials from a name using the first letter of the first word
 * and the first letter of the last word (e.g. "Alex Rivera" → "AR").
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].length <= 2 ? parts[0].toUpperCase() : parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'sm', className = '', style }) => {
  const { container, text, px } = sizeStyles[size];

  if (src) {
    return (
      <div className={`${container} rounded-full overflow-hidden flex-shrink-0 ${className}`} style={style}>
        <Image src={src} alt={name} width={px} height={px} className="object-cover w-full h-full" />
      </div>
    );
  }

  // If className doesn't contain a background color, provide a default
  const hasBg = className.includes('bg-');
  const defaultColors = hasBg ? '' : 'bg-indigo-100 text-indigo-700';

  return (
    <div
      className={`${container} rounded-full flex-shrink-0 flex items-center justify-center font-bold ${defaultColors} ${text} ${className}`}
      title={name}
      aria-label={name}
      style={style}
    >
      {getInitials(name)}
    </div>
  );
};
