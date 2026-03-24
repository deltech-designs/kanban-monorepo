import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from './TaskCard'; // Only import Task type
import { SortableTaskItem } from './SortableTaskItem'; // Use SortableTaskItem instead of TaskCard

export interface ColumnData {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
}

interface BoardColumnProps {
  column: ColumnData;
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, onTaskClick, onAddTask }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="min-w-85 max-w-85 flex flex-col bg-[#f4f6fa] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-5 px-1 group">
        <h3 className="font-bold text-gray-900 group-hover:text-[#3b46f1] transition-colors flex items-center gap-3 text-[15px]">
          {column.title}
          <span className="bg-[#e4e7fd] text-[#3b46f1] text-[11px] px-2 py-0.5 rounded-full font-bold shadow-sm">
            {column.count}
          </span>
        </h3>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar min-h-25"
      >
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => onAddTask(column.id)}
        className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-[13px] font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors mx-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    </div>
  );
};
