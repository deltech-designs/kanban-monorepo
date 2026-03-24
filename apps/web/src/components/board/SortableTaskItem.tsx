'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard, Task } from './TaskCard';

interface SortableTaskItemProps {
  task: Task;
  onClick: (taskId: string) => void;
}

export const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none" // Recommended for pointer sensors
    >
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
};
