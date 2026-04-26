import React from 'react';
import Link from 'next/link';
import { Board } from '@kanban/types';
import { AvatarGroup } from '../../../partials/AvatarGroup';

interface BoardCardProps {
  board: Board;
  taskCount?: number;
  category?: string;
  categoryColor?: 'blue' | 'orange' | 'gray';
  membersCount?: number;
}

const colorMap = {
  blue: { bg: 'bg-[#EBF4FF]', text: 'text-[#4A90E2]', decoration: 'from-[#EBF4FF]/40' },
  orange: { bg: 'bg-[#FFF0E5]', text: 'text-[#F5A623]', decoration: 'from-[#FFF0E5]/60' },
  gray: { bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', decoration: 'from-[#F1F5F9]/80' },
};

export function BoardCard({
  board,
  taskCount = 0,
  category = 'CATEGORY',
  categoryColor = 'gray',
  membersCount = 1,
}: BoardCardProps) {
  const colors = colorMap[categoryColor] || colorMap.gray;

  return (
    <Link href={`/dashboard/boards/${board.id}`} className="block group h-full">
      <div className="relative bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all h-[240px] flex flex-col overflow-hidden">
        {/* Top-right corner decoration shape */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.decoration} to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110 pointer-events-none -z-0`}
        />

        <div className="relative z-10 flex justify-between items-start mb-4">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${colors.bg} ${colors.text}`}
          >
            {category}
          </span>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors bg-white/50 backdrop-blur-sm rounded-full p-1"
            aria-label="Board options"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>

        <h3 className="relative z-10 font-bold text-lg leading-tight text-[#1e293b] mb-1.5 ">
          {board.name}
        </h3>
        <p className="relative z-10 text-[14px] text-[#64748b] leading-relaxed line-clamp-2 min-h-[2.75rem]">
          {board.description}
        </p>

        <div className="relative z-10 mt-auto flex items-center justify-between text-[#64748b] text-[13px] font-medium pt-5">
          {/* Avatar Group */}
          <AvatarGroup
            members={[
              { id: '1', name: 'Member', src: 'https://i.pravatar.cc/150?img=32' },
              ...(membersCount > 1
                ? [{ id: '2', name: 'Member', src: `https://i.pravatar.cc/150?u=${board.id}` }]
                : []),
            ]}
            totalCount={membersCount}
            size="md"
          />

          <div className="flex items-center gap-1.5">
            <svg
              className="w-[15px] h-[15px] text-gray-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14h6m-6 4h6m-3-10h.01"
              />
            </svg>
            {taskCount} Tasks
          </div>
        </div>
      </div>
    </Link>
  );
}
