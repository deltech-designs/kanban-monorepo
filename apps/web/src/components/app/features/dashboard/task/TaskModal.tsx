'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/app/partials/Modal';
import { AvatarSelect, AvatarSelectOption } from '@/components/app/partials/AvatarSelect';
import { DatePicker } from '@/components/app/partials/DatePicker';
import { StatusSelect } from '@/components/app/partials/StatusSelect';
import { PrioritySelect, Priority, PriorityOption } from '@/components/app/partials/PrioritySelect';
import { ModalInput } from '@/components/app/partials/ModalInput';
import { ModalTextarea } from '@/components/app/partials/ModalTextarea';
import { Task, TaskAssignee } from './TaskCard';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  columnId?: string;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
  onDelete?: (taskId: string) => void;
}

interface MockMember extends TaskAssignee {
  name: string;
  avatarSrc?: string;
}

const MOCK_MEMBERS: MockMember[] = [
  { name: 'Alex Rivera', initials: 'AR', avatarColor: 'bg-indigo-100 text-indigo-700' },
  { name: 'Jane Doe', initials: 'JD', avatarColor: 'bg-cyan-100 text-cyan-700' },
  { name: 'Brian Walsh', initials: 'BW', avatarColor: 'bg-orange-100 text-orange-700' },
  { name: 'Rachel Huang', initials: 'RH', avatarColor: 'bg-rose-100 text-rose-700' },
];

const ASSIGNEE_OPTIONS: AvatarSelectOption[] = MOCK_MEMBERS.map((m) => ({
  name: m.name,
  src: m.avatarSrc,
}));

const STATUS_OPTIONS = [
  { id: 'backlog', label: 'Backlog', color: '#A0AEC0' },
  { id: 'in-progress', label: 'In Progress', color: '#4A90E2' },
  { id: 'review', label: 'Review', color: '#F5A623' },
  { id: 'done', label: 'Done', color: '#4CAF88' },
];

const PRIORITY_OPTIONS: PriorityOption[] = [
  { id: 'low', label: 'LOW' },
  { id: 'med', label: 'MED' },
  { id: 'high', label: 'HIGH' },
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
  const isEditing = Boolean(task);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [priority, setPriority] = useState<Priority>('high');
  const [assigneeIndex, setAssigneeIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dateStr);
      setStatus(task.columnId);
      const idx = MOCK_MEMBERS.findIndex((m) => m.initials === task.assignee.initials);
      setAssigneeIndex(idx >= 0 ? idx : 0);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus(columnId || 'in-progress');
      setAssigneeIndex(0);
    }
    setPriority('high');
  }, [isOpen, task, columnId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { name: _name, ...assignee } = MOCK_MEMBERS[assigneeIndex];

    const taskData: Omit<Task, 'id'> & { id?: string } = {
      id: task?.id,
      columnId: status,
      title: title.trim(),
      description,
      dateStr: dueDate || 'No date',
      assignee,
      tags: task?.tags ?? [],
    };

    onSave(taskData);
  };

  const handleDelete = () => {
    if (task && onDelete && confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create Task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Task Title */}
        <ModalInput
          id="task-title"
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          autoFocus
        />

        {/* Description */}
        <ModalTextarea
          id="task-description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          rows={3}
        />

        {/* Assignee + Due Date row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assignee */}
          <AvatarSelect
            id="task-assignee"
            label="Assignee"
            options={ASSIGNEE_OPTIONS}
            value={assigneeIndex}
            onChange={setAssigneeIndex}
          />

          {/* Due Date */}
          <DatePicker
            id="task-due-date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Select date"
          />
        </div>

        {/* Status + Priority row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <StatusSelect
            id="task-status"
            label="Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
          />

          {/* Priority */}
          <PrioritySelect
            label="Priority"
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={setPriority}
          />
        </div>

        {/* Delete link (edit mode only) */}
        {isEditing && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="self-start text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Delete task
          </button>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2.5 text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-400/25 cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
