'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
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

const AVAILABLE_TAG_COLORS: TaskTag['color'][] = ['orange', 'blue', 'teal', 'gray'];

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
  const [assigneeIndex, setAssigneeIndex] = useState(0);
  const [tagLabel, setTagLabel] = useState('');
  const [tagColor, setTagColor] = useState<TaskTag['color']>('blue');

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDateStr(task.dateStr);
        const idx = MOCK_MEMBERS.findIndex(m => m.initials === task.assignee.initials);
        setAssigneeIndex(idx >= 0 ? idx : 0);
        if (task.tags.length > 0) {
          setTagLabel(task.tags[0].label);
          setTagColor(task.tags[0].color);
        } else {
          setTagLabel('');
          setTagColor('blue');
        }
      } else {
        setTitle('');
        setDescription('');
        setDateStr('Today');
        setAssigneeIndex(0);
        setTagLabel('Dev');
        setTagColor('blue');
      }
    }
  }, [isOpen, task]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct tag object only if label is present
    const tags: TaskTag[] = tagLabel ? [{ label: tagLabel, color: tagColor }] : [];

    // Use current task's columnId, or the fallback columnId passed for new tasks
    const colId = task?.columnId || columnId || 'todo';

    const taskData: Omit<Task, 'id'> & { id?: string } = {
      id: task?.id,
      columnId: colId,
      title,
      description,
      dateStr,
      assignee: MOCK_MEMBERS[assigneeIndex],
      tags,
    };

    onSave(taskData);
    onClose();
  };

  const handleDelete = () => {
    // Only allow delete if we have a task (editing mode) and onDelete prop
    if (task && onDelete) {
      if (confirm('Are you sure you want to delete this task?')) {
        onDelete(task.id);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'New Task'}>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Task title" 
            required 
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Add details..." 
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <Input 
              value={dateStr} 
              onChange={(e) => setDateStr(e.target.value)} 
              placeholder="e.g. Oct 24" 
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
             <select 
               className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm h-10 px-3 border"
               value={assigneeIndex}
               onChange={(e) => setAssigneeIndex(Number(e.target.value))}
             >
                {MOCK_MEMBERS.map((m, i) => (
                  <option key={m.initials} value={i}>{m.initials}</option>
                ))}
             </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Tag Label</label>
             <Input value={tagLabel} onChange={(e) => setTagLabel(e.target.value)} placeholder="Tag name" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Tag Color</label>
             <select 
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm h-10 px-3 border"
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value as TaskTag['color'])}
             >
                {AVAILABLE_TAG_COLORS.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
             </select>
           </div>
        </div>

        <div className="flex justify-between pt-4 mt-6 border-t border-gray-100">
          {task && onDelete ? (
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : <div />}
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#3b46f1] hover:bg-blue-700 text-white">Save Task</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
