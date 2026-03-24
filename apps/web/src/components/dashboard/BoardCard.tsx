import React from 'react';
import Link from 'next/link';
import { Board } from '@kanban/types';

interface BoardCardProps {
  board: Board;
  taskCount?: number;
  progress?: number;
}

export function BoardCard({ board, taskCount = 0, progress = 0 }: BoardCardProps) {
  return (
    <Link href={`/dashboard/boards/${board.id}`} className="block group h-full">
      <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#4A3CF0]/20 transition-all h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#4A3CF0] group-hover:bg-[#EEF2FF] group-hover:scale-110 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-gray-50 text-gray-500">
            Updated {new Date(board.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-bold text-[16px] text-gray-900 mb-2 truncate">{board.name}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-2 min-h-10 grow">
          {board.description}
        </p>

        <div className="mt-auto flex items-center justify-between text-gray-400 text-[12px] font-medium pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {taskCount} Tasks
          </div>
          {progress > 0 && (
            <div
              className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden"
              title={`${progress}% Complete`}
            >
              <div
                className="h-full bg-linear-to-r from-[#4A3CF0] to-[#878DFD]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
