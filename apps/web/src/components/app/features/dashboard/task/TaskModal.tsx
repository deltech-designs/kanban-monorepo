'use client';
import React, { useState, useEffect } from 'react';
import { Task, TaskTag, TaskAssignee } from './TaskCard';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  columnId?: string;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
  onDelete?: (taskId: string) => void;
}

const MOCK_MEMBERS: TaskAssignee[] = [
  { initials: 'JD', avatarColor: 'bg-indigo-100 text-indigo-700' },
  { initials: 'AS', avatarColor: 'bg-cyan-100 text-cyan-700' },
  { initials: 'BW', avatarColor: 'bg-orange-100 text-orange-700' },
  { initials: 'RH', avatarColor: 'bg-gray-200 text-gray-700' },
];

const STATUS_OPTIONS = [
  { id: 'todo', label: 'To Do', color: '#A0AEC0' },
  { id: 'in-progress', label: 'In Progress', color: '#4A90E2' },
  { id: 'review', label: 'Review', color: '#F5A623' },
  { id: 'done', label: 'Done', color: '#4CAF88' },
];

const getStatusColor = (columnId: string): string => {
  const status = STATUS_OPTIONS.find((s) => s.id === columnId);
  return status ? status.color : '#A0AEC0';
};

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  columnId,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [status, setStatus] = useState('todo');
  const [assigneeIndex, setAssigneeIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDateStr(task.dateStr);
        setStatus(task.columnId);
        const idx = MOCK_MEMBERS.findIndex((m) => m.initials === task.assignee.initials);
        setAssigneeIndex(idx >= 0 ? idx : 0);
      } else {
        setTitle('');
        setDescription('');
        setDateStr('Today');
        setStatus(columnId || 'todo');
        setAssigneeIndex(0);
      }
    }
  }, [isOpen, task, columnId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: Omit<Task, 'id'> & { id?: string } = {
      id: task?.id,
      columnId: status,
      title,
      description,
      dateStr,
      assignee: MOCK_MEMBERS[assigneeIndex],
      tags: [],
    };

    onSave(taskData);
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      if (confirm('Are you sure you want to delete this task?')) {
        onDelete(task.id);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  const currentStatusColor = getStatusColor(status);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Right-side slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-120 bg-white shadow-lg overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-50 px-8 py-5 flex items-center justify-between">
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#A0AEC0] hover:text-slate-600 transition-colors"
            aria-label="Close panel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form id="task-form" onSubmit={handleSave} className="px-8 py-6 pb-32">
          {/* Task Title - Large Editable Heading */}
          <div className="mb-8">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
              autoFocus
              className="w-full text-2xl font-bold text-slate-900 bg-transparent border-none outline-none placeholder-slate-300 focus:border-b-2 focus:border-[#4A90E2] transition-all pb-2"
            />
          </div>

          {/* Description Section */}
          <div className="mb-12">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details..."
              rows={4}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 transition-all resize-none"
            />
          </div>

          {/* Assignee Section */}
          <div className="mb-12">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-2">
              Assignee
            </label>
            <select
              value={assigneeIndex}
              onChange={(e) => setAssigneeIndex(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 focus:outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 transition-all"
            >
              {MOCK_MEMBERS.map((m, i) => (
                <option key={m.initials} value={i}>
                  {m.initials}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date Section */}
          <div className="mb-12">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-2">
              Due Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                placeholder="e.g. Oct 24"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 pr-10 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 transition-all"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Status Section */}
          <div className="mb-12">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-3">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStatus(opt.id)}
                  style={{
                    backgroundColor: status === opt.id ? opt.color : '#F7F8FC',
                    color: status === opt.id ? 'white' : opt.color,
                  }}
                  className="px-4 py-2 rounded-full text-[12px] font-semibold transition-all border border-transparent hover:opacity-90"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Delete button for existing tasks */}
          {task && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="mb-8 text-[13px] font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Delete task
            </button>
          )}
        </form>

        {/* Save Button - Fixed at bottom */}
        <div
          className="fixed bottom-0 right-0 w-120 border-t border-slate-50 bg-white px-8 py-4"
          style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)' }}
        >
          <button
            form="task-form"
            onClick={handleSave}
            className="w-full py-3 rounded-lg font-semibold text-[14px] text-white bg-[#4A90E2] hover:bg-[#3b82f6] shadow-sm active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-[#4A90E2]/25"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};
