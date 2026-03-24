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
      className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-[#3b46f1]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {task.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`text-[10px] font-bold px-2 py-1 rounded inline-block uppercase tracking-widest ${getTagColorClass(tag.color)}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <button className="text-gray-300 group-hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <h4 className="font-bold text-gray-900 mb-2 leading-tight text-[14px]">{task.title}</h4>
      <p className="text-[13px] text-gray-500 mb-5 line-clamp-2 leading-relaxed font-medium">
        {task.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className={`flex items-center gap-1.5 text-xs font-bold border border-gray-100 rounded-md px-2 py-1 ${task.dateStr === 'Today' ? 'text-orange-500 bg-orange-50/50' : 'text-gray-500 bg-gray-50/50'}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {task.dateStr}
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white ${task.assignee.avatarColor}`}>
          {task.assignee.initials}
        </div>
      </div>
    </div>
  );
};
