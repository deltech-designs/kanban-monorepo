'use client';
import React, { use } from 'react';
import { BoardView } from '@/components/app/features/dashboard/board/BoardView';

interface BoardDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BoardDetailsPage({ params }: BoardDetailsPageProps) {
  const { id } = use(params);
  return (
    <div className="h-full flex flex-col bg-slate-50/30">
      <div className="flex-1 overflow-hidden">
        <BoardView boardId={id} />
      </div>
    </div>
  );
}
