import React from 'react';
import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../task/TaskCard';
import { SortableTaskItem } from '../SortableTaskItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

const getHeaderColorClass = (columnId: string) => {
  switch (columnId) {
    case 'backlog':
      return 'border-t-[#A0AEC0]';
    case 'in-progress':
      return 'border-t-[#4A90E2]';
    case 'review':
      return 'border-t-[#F5A623]';
    case 'done':
      return 'border-t-[#4CAF88]';
    default:
      return 'border-t-gray-200';
  }
};

const getBadgeColorClass = (columnId: string) => {
  switch (columnId) {
    case 'backlog':
      return 'bg-gray-100 text-[#A0AEC0]';
    case 'in-progress':
      return 'bg-blue-100 text-[#4A90E2]';
    case 'review':
      return 'bg-orange-100 text-[#F5A623]';
    case 'done':
      return 'bg-green-100 text-[#4CAF88]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, onTaskClick, onAddTask }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div
      className={`w-80 min-w-80 flex flex-col bg-white rounded-xl shadow-sm border-t-[4px] overflow-hidden transition-shadow hover:shadow-md ${getHeaderColorClass(column.id)}`}
    >
      {/* Column Header */}
      <div className="px-4 pt-4 pb-3.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2.5 text-sm">
            {column.title}
            <span
              className={`${getBadgeColorClass(column.id)} text-[11px] px-2.5 py-1 rounded-md font-semibold`}
            >
              {column.count}
            </span>
          </h3>
          <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100/50 rounded-md transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar px-3 py-3"
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

      {/* Add Task Button */}
      <div className="px-3 py-3 border-t border-gray-100">
        <button
          onClick={() => onAddTask(column.id)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Task
        </button>
      </div>
    </div>
  );
};
