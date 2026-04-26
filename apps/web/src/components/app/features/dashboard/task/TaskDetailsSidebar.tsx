'use client';
import React, { useState, useEffect } from 'react';
import { SlideOver } from '@/components/app/partials/SlideOver';
import { Avatar } from '@/components/app/partials/Avatar';
import { StatusSelect } from '@/components/app/partials/StatusSelect';
import { AvatarSelect } from '@/components/app/partials/AvatarSelect';
import { DatePicker } from '@/components/app/partials/DatePicker';
import { Task, TaskAssignee } from './TaskCard';

interface TaskDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
}

interface MockMember extends TaskAssignee {
  name: string;
  avatarSrc?: string;
  role?: string;
}

const MOCK_MEMBERS: MockMember[] = [
  { name: 'Marcus Thorne', initials: 'MT', avatarColor: 'bg-indigo-100 text-indigo-700', role: 'Lead Designer' },
  { name: 'Alex Rivera', initials: 'AR', avatarColor: 'bg-indigo-100 text-indigo-700', role: 'Engineer' },
  { name: 'Jane Doe', initials: 'JD', avatarColor: 'bg-cyan-100 text-cyan-700', role: 'Product Manager' },
];

const STATUS_OPTIONS = [
  { id: 'backlog', label: 'Backlog', color: '#A0AEC0', bgColor: 'bg-slate-50', textColor: 'text-slate-700' },
  { id: 'in-progress', label: 'In Progress', color: '#3B82F6', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'review', label: 'Review', color: '#F59E0B', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
  { id: 'done', label: 'Done', color: '#10B981', bgColor: 'bg-green-50', textColor: 'text-green-700' },
];

const SectionLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2.5">
    <span className="text-slate-400">{icon}</span>
    <span>{text}</span>
  </div>
);

export const TaskDetailsSidebar: React.FC<TaskDetailsSidebarProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [assigneeIndex, setAssigneeIndex] = useState(0);

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dateStr);
      setStatus(task.columnId || 'in-progress');
      const idx = MOCK_MEMBERS.findIndex((m) => m.initials === task.assignee.initials);
      setAssigneeIndex(idx >= 0 ? idx : 0);
    } else if (isOpen) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('in-progress');
      setAssigneeIndex(0);
    }
  }, [isOpen, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { name: _name, role: _role, ...assignee } = MOCK_MEMBERS[assigneeIndex];
    onSave({
      id: task?.id,
      columnId: status,
      title: title.trim(),
      description,
      dateStr: dueDate || '',
      assignee,
      tags: task?.tags ?? [],
    });
    onClose();
  };

  const activeStatus = STATUS_OPTIONS.find((s) => s.id === status) || STATUS_OPTIONS[1];
  const activeAssignee = MOCK_MEMBERS[assigneeIndex];

  return (
    <SlideOver isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden relative bg-white">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-32">
          {/* Header */}
          <div className="flex items-center justify-between pb-6">
            {/* <div className="flex items-center gap-2 text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium tracking-wide">{task?.id || 'NEW-101'}</span>
            </div> */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors ml-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full text-[26px] leading-tight font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden mb-8"
            rows={2}
          />

          <div className="flex flex-col gap-8">
            {/* STATUS */}
            <div>
              <SectionLabel
                text="STATUS"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                }
              />
              <div className="w-48">
                <StatusSelect
                  options={STATUS_OPTIONS}
                  value={status}
                  onChange={setStatus}
                />
              </div>
            </div>

            {/* ASSIGNEE */}
            <div>
              <SectionLabel
                text="ASSIGNEE"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <div className="w-64">
                <AvatarSelect
                  options={MOCK_MEMBERS}
                  value={assigneeIndex}
                  onChange={setAssigneeIndex}
                />
              </div>
            </div>

            {/* DUE DATE */}
            <div>
              <SectionLabel
                text="DUE DATE"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
              <div className="w-48">
                <DatePicker
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <SectionLabel
                text="DESCRIPTION"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                }
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a more detailed description..."
                className="w-full text-sm text-slate-500 leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none min-h-[100px] p-0"
              />
            </div>

            {/* ATTACHMENTS */}
            <div>
              <SectionLabel
                text="ATTACHMENTS"
                icon={
                  <svg className="w-3.5 h-3.5 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                }
              />
              <div className="flex items-center gap-3">
                {/* Mock Attachment Thumbnail */}
                <div className="w-[72px] h-[48px] bg-gradient-to-b from-slate-200 to-slate-400 rounded border border-slate-300 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/20"></div>
                  <div className="w-full flex justify-around px-1">
                     <div className="w-3 h-4 bg-white/50 rounded-sm"></div>
                     <div className="w-3 h-4 bg-white/50 rounded-sm"></div>
                     <div className="w-3 h-4 bg-white/50 rounded-sm"></div>
                  </div>
                </div>
                {/* Add Attachment Button */}
                <button type="button" className="w-[48px] h-[48px] border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* COMMENTS */}
            <div>
              <SectionLabel
                text="COMMENTS"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
              />
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 border-2 border-white shadow-sm"></div>
                <input
                  placeholder="Add a comment..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-500 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/15 transition-all"
                />
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-8 8-4-4" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 space-y-4">
                {[
                  { name: 'Steve Rogers', time: '2 days ago', text: 'Looks good, but we should probably add proper error boundaries on the client side before merging.', initials: 'SR', avatarColor: 'bg-red-100 text-red-700' },
                  { name: 'Natasha Romanoff', time: '4 days ago', text: 'The tests are green. Ready for QA.', initials: 'NR', avatarColor: 'bg-pink-100 text-pink-700' },
                ].map((comment, idx) => (
                  <div key={idx} className="flex items-start gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-9 h-9 rounded-full ${comment.avatarColor} border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold shrink-0`}>
                      {comment.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-900">{comment.name}</span>
                        <span className="text-xs text-slate-400">{comment.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 p-2">
          <button
            type="submit"
            className="w-full bg-[#4A90E2] text-white font-bold rounded-lg py-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]"
          >
            Save Changes
          </button>
          <div className="text-center mt-3">
            <span className="text-xs text-slate-400 font-medium">Last edited 2 minutes ago</span>
          </div>
        </div>
      </form>
    </SlideOver>
  );
};
