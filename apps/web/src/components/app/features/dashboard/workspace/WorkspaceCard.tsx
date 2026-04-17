import React from 'react';
import { Workspace } from '@kanban/types';
import Link from 'next/link';

interface WorkspaceCardProps {
  workspace: Workspace & { boardCount: number; memberCount: number };
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  return (
    <Link href={`/dashboard/workspaces/${workspace.id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#3b46f1]/20 transition-all h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-indigo-600 font-bold text-xl group-hover:from-indigo-100 group-hover:to-blue-100 transition-colors">
            {workspace.name.charAt(0).toUpperCase()}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-5 h-5 text-gray-400 hover:text-[#3b46f1]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3b46f1] transition-colors">
          {workspace.name}
        </h3>

        {workspace.description && (
          <p className="text-sm text-gray-500 mb-6 line-clamp-2 grow">{workspace.description}</p>
        )}

        <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            {workspace.boardCount} Boards
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            {workspace.memberCount} Members
          </div>
        </div>
      </div>
    </Link>
  );
};
