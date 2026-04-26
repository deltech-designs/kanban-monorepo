import React from 'react';
import { Avatar } from '@/components/app/partials/Avatar';
import { Calendar } from 'lucide-react';
import { formatRelativeDate } from '@kanban/utils';

export interface TaskTag {
  label: string;
  color: 'orange' | 'blue' | 'teal' | 'gray';
}

export interface TaskAssignee {
  initials: string;
  avatarColor: string;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  dateStr: string;
  tags: TaskTag[];
  assignee: TaskAssignee;
}

interface TaskCardProps {
  task: Task;
  onClick: (taskId: string) => void;
}

const getGradientClass = (columnId: string) => {
  switch (columnId) {
    case 'todo':
      return 'bg-gradient-to-b from-slate-300 to-slate-400';
    case 'in-progress':
      return 'bg-gradient-to-b from-blue-400 to-indigo-500';
    case 'review':
      return 'bg-gradient-to-b from-amber-400 to-orange-500';
    case 'done':
      return 'bg-gradient-to-b from-emerald-400 to-teal-500';
    default:
      return 'bg-transparent';
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getTagColorClass = (color: TaskTag['color']) => {
    switch (color) {
      case 'orange':
        return 'text-orange-700 bg-orange-50 border border-orange-100 shadow-[0_1px_2px_rgba(255,237,213,0.5)]';
      case 'blue':
        return 'text-blue-700 bg-blue-50 border border-blue-100 shadow-[0_1px_2px_rgba(219,234,254,0.5)]';
      case 'teal':
        return 'text-teal-700 bg-teal-50 border border-teal-100 shadow-[0_1px_2px_rgba(204,251,241,0.5)]';
      case 'gray':
      default:
        return 'text-slate-600 bg-slate-50 border border-slate-200 shadow-[0_1px_2px_rgba(241,245,249,0.5)]';
    }
  };

  return (
    <div
      onClick={() => onClick(task.id)}
      className="group relative bg-white rounded-xl p-2.5 sm:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Subtle Background Glow on Hover */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[9px] font-semibold px-1.5 py-[1px] rounded-md inline-flex items-center uppercase tracking-wide transition-colors group-hover:bg-opacity-80 ${getTagColorClass(tag.color)}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h4 className="font-bold text-slate-800 mb-0.5 leading-snug text-[13px] group-hover:text-indigo-600 transition-colors line-clamp-2">
          {task.title}
        </h4>

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow" />
        {/* Footer */}
        <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-50/80 px-1.5 py-0.5 rounded-md group-hover:bg-white transition-colors">
            <Calendar className="w-1 h-1 text-slate-400" />
            {formatRelativeDate(task.dateStr) || 'No date'}
          </div>
          <div className="relative">
            {/* Soft glow behind avatar on hover */}
            <div className="absolute inset-0 bg-indigo-200 blur-md rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <Avatar
              name={task.assignee.initials}
              size="xs"
              className={`relative z-10 shadow-sm border-2 border-white ring-1 ring-slate-100/50 group-hover:ring-slate-200 transition-all ${task.assignee.avatarColor}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
