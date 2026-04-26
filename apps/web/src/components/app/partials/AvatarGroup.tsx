import React from 'react';
import { Avatar } from './Avatar';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarMember {
  id: string;
  name: string;
  src?: string;
}

export interface AvatarGroupProps {
  members: AvatarMember[];
  totalCount?: number;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-5 h-5', text: 'text-[8px]' },
  sm: { container: 'w-6 h-6', text: 'text-[10px]' },
  md: { container: 'w-8 h-8', text: 'text-xs' },
  lg: { container: 'w-10 h-10', text: 'text-sm' },
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  members,
  totalCount,
  max = 2,
  size = 'xs',
  className = '',
}) => {
  const displayMembers = members.slice(0, max);
  const remainingCount = (totalCount ?? members.length) - displayMembers.length;
  const { container, text } = sizeStyles[size];

  return (
    <div className={`flex items-center -space-x-2 relative z-0 ${className}`}>
      {displayMembers.map((member, index) => {
        const zIndex = 20 - index;
        return (
          <Avatar
            key={member.id}
            name={member.name}
            src={member.src}
            size={size}
            className="border-2 border-white shadow-sm relative"
            style={{ zIndex }}
          />
        );
      })}
      
      {remainingCount > 0 && (
        <div 
          className={`${container} rounded-full border-2 border-white bg-[#f8fafc] flex items-center justify-center font-bold text-[#64748b] shadow-sm relative z-0 ${text}`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
