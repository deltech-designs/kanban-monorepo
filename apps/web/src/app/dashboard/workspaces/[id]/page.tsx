'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../../../components/app/partials/Button';
import { WorkspaceTools } from '../../../../components/app/features/dashboard/WorkspaceTools';

interface WorkspaceDetailsPageProps {
  params: {
    id: string;
  };
}

export default function WorkspaceDetailsPage({ params }: WorkspaceDetailsPageProps) {
  // Mock data - In real app fetch by params.id
  const workspace = {
    id: params.id,
    name: 'Acme Corp Engineering',
    description: 'Engineering team workspace for Acme Corp projects.',
    ownerId: 'user-1',
    members: [
      { id: '1', name: 'John Doe', avatar: 'JD', color: 'indigo' },
      { id: '2', name: 'Alice Smith', avatar: 'AS', color: 'cyan' },
      { id: '3', name: 'Bob Wilson', avatar: 'BW', color: 'orange' },
    ],
    boards: [
      { id: '1', title: 'Website Redesign', desc: 'Marketing', updatedAt: '2m ago' },
      { id: '2', title: 'Q4 Roadmap', desc: 'Product', updatedAt: '1h ago' },
      { id: '3', title: 'Mobile App', desc: 'Engineering', updatedAt: '1d ago' },
    ],
  };

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-100 text-indigo-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard/workspaces"
              className="text-sm font-semibold text-gray-400 hover:text-gray-600"
            >
              Workspaces /
            </Link>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
            {workspace.name}
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold border border-indigo-100 uppercase tracking-wider">
              Free Plan
            </span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-2xl">{workspace.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.573 1.066 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.065 2.572 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.066 2.573 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.572 1.065 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.573-1.066 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.065-2.572 1.724 1.724 0 010-3.35 1.724 1.724 0 001.066-2.573 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </Button>
          <Button className="bg-[#3b46f1] hover:bg-blue-700 text-white px-5 rounded-xl shadow-md">
            Invite Members
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content: Boards */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Boards</h2>
            <Link href="/dashboard/boards/new">
              <button className="text-sm font-semibold text-[#3b46f1] hover:text-blue-700 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Board
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {workspace.boards.map((board) => (
              <Link
                key={board.id}
                href={`/dashboard/boards/${board.id}`}
                className="group block p-5 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#3b46f1]/20 transition-all flex flex-col h-40"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-[#3b46f1] group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {board.desc}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#3b46f1] transition-colors line-clamp-1 mb-1">
                  {board.title}
                </h3>
                <div className="mt-auto pt-3 border-t border-gray-50 text-[11px] font-medium text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Updated {board.updatedAt}
                </div>
              </Link>
            ))}

            {/* Create Board Card */}
            <Link
              href="/dashboard/boards/new"
              className="group flex flex-col items-center justify-center p-5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#3b46f1]/40 hover:bg-[#3b46f1]/5 transition-all text-gray-400 hover:text-[#3b46f1] h-40"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="font-semibold text-xs">Create Board</span>
            </Link>
          </div>
        </div>

        {/* Sidebar: Members & Tools */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-8">
          {/* Members Widget */}
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                Members ({workspace.members.length})
              </h2>
              <button className="text-[11px] font-bold text-[#3b46f1] hover:text-blue-700">
                Manage
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="flex -space-x-3 mb-4 pl-1">
                {workspace.members.map((member) => (
                  <div
                    key={member.id}
                    className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold shadow-sm ${colorMap[member.color]} z-10`}
                  >
                    {member.avatar}
                  </div>
                ))}
                <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#3b46f1] hover:border-[#3b46f1] hover:bg-[#3b46f1]/5 transition-all z-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed px-1">
                You have {workspace.members.length} active members in this workspace.
              </p>
            </div>
          </div>

          {/* Tools Widget */}
          <WorkspaceTools />
        </div>
      </div>
    </div>
  );
}
