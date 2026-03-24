'use client';
import React from 'react';
import Link from 'next/link';
import { BoardView } from '@/components/board/BoardView';

interface BoardDetailsPageProps {
  params: {
    id: string;
  };
}

export default function BoardDetailsPage({ params }: BoardDetailsPageProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 py-4 border-b border-gray-100 flex items-center gap-4 bg-white">
        <Link
          href="/dashboard/boards"
          className="text-sm font-semibold text-gray-500 hover:text-gray-900"
        >
          ← Back
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <BoardView boardId={params.id} />
      </div>
    </div>
  );
}
