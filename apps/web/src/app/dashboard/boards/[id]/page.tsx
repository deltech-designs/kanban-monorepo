'use client';
import React from 'react';
import { BoardView } from '@/components/app/features/dashboard/board/BoardView';

interface BoardDetailsPageProps {
  params: {
    id: string;
  };
}

export default function BoardDetailsPage({ params }: BoardDetailsPageProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50/30">
      <div className="flex-1 overflow-hidden">
        <BoardView boardId={params.id} />
      </div>
    </div>
  );
}
