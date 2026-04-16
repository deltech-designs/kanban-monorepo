'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/app/partials/Button';
import { BoardCard } from '@/components/app/features/dashboard/BoardCard';
import { Board } from '@kanban/types';

// Mock boards data
const initialBoards: (Board & { 
  taskCount: number; 
  category: string; 
  categoryColor: 'blue' | 'orange' | 'gray';
  membersCount: number;
})[] = [
  {
    id: '1',
    name: 'Q4 Global Launch',
    description: 'Tracking omnichannel marketing assets and press releases.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    taskCount: 34,
    category: 'CAMPAIGNS',
    categoryColor: 'blue',
    membersCount: 6,
  },
  {
    id: '2',
    name: 'Brand Evolution',
    description: 'Visual identity refinement and new typography standards.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    taskCount: 8,
    category: 'DESIGN',
    categoryColor: 'orange',
    membersCount: 2,
  },
  {
    id: '3',
    name: 'Content Calendar',
    description: 'Weekly social media scheduling and blog production pipeline.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    taskCount: 42,
    category: 'STRATEGY',
    categoryColor: 'gray',
    membersCount: 3,
  },
  {
    id: '4',
    name: 'Mobile App UI',
    description: 'Iteration on version 2.4 mobile experience and flow maps.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    taskCount: 15,
    category: 'PRODUCT',
    categoryColor: 'blue',
    membersCount: 2,
  },
  {
    id: '5',
    name: 'User Feedback',
    description: 'Aggregating quarterly survey results and interview notes.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    taskCount: 5,
    category: 'RESEARCH',
    categoryColor: 'orange',
    membersCount: 1,
  }
];

export default function BoardsPage() {
  return (
    <div className="p-8 lg:p-10 max-w-[1400px] mx-auto min-h-screen bg-slate-50/30">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Workspace Home</h1>
            <span className="px-3 py-1 bg-blue-100/50 text-blue-700 border border-blue-200/50 text-xs font-bold rounded-full tracking-wider uppercase ml-2">
              Active
            </span>
          </div>
          <p className="text-slate-500 text-base leading-relaxed max-w-2xl mt-2">
            Welcome back, Marketing Team. You have <span className="font-medium text-slate-700">12 active boards</span> across 3 project streams.
            Manage your flow and track real-time progress below.
          </p>
        </div>
        {/* <Button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all">
          <span className="mr-0.5">+</span> Create New Board
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initialBoards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            taskCount={board.taskCount}
            category={board.category}
            categoryColor={board.categoryColor}
            membersCount={board.membersCount}
          />
        ))}

        {/* Create Board Card (Visual Shortcut) */}
        <Link
          href="/dashboard/boards/new"
          className="group flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-2xl transition-all h-full min-h-[240px] border-2 border-dashed border-slate-300 hover:bg-blue-50/50 hover:border-blue-400 hover:shadow-sm"
        >
          <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300 ease-out">
            <svg
              className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-semibold text-[16px] text-slate-700 group-hover:text-blue-700 transition-colors mb-1">Create New Board</span>
          <span className="text-[13px] text-slate-500 text-center">Start a fresh project flow</span>
        </Link>
      </div>
    </div>
  );
}
