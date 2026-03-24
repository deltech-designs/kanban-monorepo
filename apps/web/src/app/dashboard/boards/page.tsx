'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BoardCard } from '@/components/dashboard/BoardCard';
import { Board } from '@kanban/types';

// Mock boards data
const initialBoards: (Board & { taskCount: number; progress: number })[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Marketing site overhaul for Q4 launch.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    taskCount: 12,
    progress: 45,
  },
  {
    id: '2',
    name: 'Q4 Roadmap',
    description: 'Product planning and strategy for Q4.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    taskCount: 8,
    progress: 10,
  },
  {
     id: '3',
     name: 'Mobile App',
     description: 'iOS and Android app development.',
     workspaceId: 'workspace-1',
     userId: 'user-1',
     createdAt: new Date(),
     updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
     taskCount: 24,
     progress: 75,
  }
];

export default function BoardsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Boards</h1>
          <p className="text-gray-500 mt-1">Manage your projects and tasks.</p>
        </div>
        <Link href="/dashboard/boards/new">
          <Button className="font-semibold shadow-md px-5 py-2.5 rounded-xl text-sm bg-[#3b46f1] hover:bg-blue-700 text-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Board
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create Board Card (Visual Shortcut) */}
        <Link 
          href="/dashboard/boards/new"
          className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#3b46f1]/50 hover:bg-[#3b46f1]/5 transition-all text-gray-400 hover:text-[#3b46f1] min-h-50"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Create new board</span>
        </Link>

        {initialBoards.map((board) => (
          <BoardCard 
            key={board.id} 
            board={board} 
            taskCount={board.taskCount}
            progress={board.progress}
          />
        ))}
      </div>
    </div>
  );
}
