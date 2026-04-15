'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../../components/app/partials/Button';
import { WorkspaceCard } from '../../../components/app/features/dashboard/WorkspaceCard';
import { Workspace } from '@kanban/types';

// Mock workspace data
const initialWorkspaces: (Workspace & { boardCount: number; memberCount: number })[] = [
  {
    id: 'ws-1',
    name: 'Acme Corp Engineering',
    description: 'Engineering team workspace for Acme Corp projects.',
    ownerId: 'user-1',
    members: ['user-1', 'user-2', 'user-3'],
    createdAt: new Date(),
    updatedAt: new Date(),
    boardCount: 12,
    memberCount: 8,
  },
  {
    id: 'ws-2',
    name: 'Marketing Team',
    description: 'Marketing campaigns and social media planning.',
    ownerId: 'user-1',
    members: ['user-1', 'user-4'],
    createdAt: new Date(),
    updatedAt: new Date(),
    boardCount: 5,
    memberCount: 4,
  },
  {
    id: 'ws-3',
    name: 'Personal Projects',
    description: 'My personal side projects and ideas.',
    ownerId: 'user-1',
    members: ['user-1'],
    createdAt: new Date(),
    updatedAt: new Date(),
    boardCount: 3,
    memberCount: 1,
  },
];

export default function WorkspacesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Workspaces</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your teams and projects across different workspaces.
          </p>
        </div>
        <Link href="/dashboard/workspaces/new-workspace">
          <Button className="bg-[#3b46f1] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Workspace
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card (Visual shortcut) */}
        <Link
          href="/dashboard/workspaces/new-workspace"
          className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#3b46f1]/50 hover:bg-[#3b46f1]/5 transition-all text-gray-400 hover:text-[#3b46f1] min-h-55"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-semibold text-sm">Create new workspace</span>
        </Link>

        {initialWorkspaces.map((ws) => (
          <WorkspaceCard key={ws.id} workspace={ws} />
        ))}
      </div>
    </div>
  );
}
