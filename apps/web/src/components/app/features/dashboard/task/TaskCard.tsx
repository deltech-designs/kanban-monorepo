import React from 'react';

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

const getBorderColorClass = (columnId: string) => {
  switch (columnId) {
    case 'todo':
      return 'border-l-[#A0AEC0]';
    case 'in-progress':
      return 'border-l-[#4A90E2]';
    case 'review':
      return 'border-l-[#F5A623]';
    case 'done':
      return 'border-l-[#4CAF88]';
    default:
      return 'border-l-transparent';
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getTagColorClass = (color: TaskTag['color']) => {
    switch (color) {
      case 'orange':
        return 'text-orange-600 bg-orange-50';
      case 'blue':
        return 'text-blue-700 bg-blue-50';
      case 'teal':
        return 'text-teal-700 bg-teal-50';
      case 'gray':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div
      onClick={() => onClick(task.id)}
      className={`bg-white rounded-lg p-3 shadow-sm border border-gray-100 border-l-[3px] ${getBorderColorClass(task.columnId)} hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block uppercase tracking-widest ${getTagColorClass(tag.color)}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      <h4 className="font-bold text-[#1A1F36] mb-1.5 leading-snug text-[14px]">{task.title}</h4>
      <div className="flex items-center justify-between mt-2 pt-1">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#A0AEC0]">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {task.dateStr}
        </div>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${task.assignee.avatarColor}`}
        >
          {task.assignee.initials}
        </div>
      </div>
    </div>
  );
};
