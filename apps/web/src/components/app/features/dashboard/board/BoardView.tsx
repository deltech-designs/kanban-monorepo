'use client';
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BoardHeader } from '@/components/app/features/dashboard/board/BoardHeader';
import { BoardColumn, ColumnData } from '@/components/app/features/dashboard/board/BoardColumn';
import { Task } from '@/components/app/features/dashboard/task/TaskCard';
import { TaskModal } from '@/components/app/features/dashboard/task/TaskModal';
import { TaskDetailsSidebar } from '@/components/app/features/dashboard/task/TaskDetailsSidebar';
import { SortableTaskItem } from '@/components/app/features/dashboard/SortableTaskItem';
import { Board } from '@kanban/types';

interface BoardViewProps {
  boardId: string;
}

// Mock board database that matches the boards list
const boardDatabase: Record<string, Board> = {
  '1': {
    id: '1',
    name: 'Q4 Global Launch',
    description: 'Tracking omnichannel marketing assets and press releases.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  '2': {
    id: '2',
    name: 'Brand Evolution',
    description: 'Visual identity refinement and new typography standards.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  '3': {
    id: '3',
    name: 'Content Calendar',
    description: 'Weekly social media scheduling and blog production pipeline.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  '4': {
    id: '4',
    name: 'Mobile App UI',
    description: 'Iteration on version 2.4 mobile experience and flow maps.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  '5': {
    id: '5',
    name: 'User Feedback',
    description: 'Aggregating quarterly survey results and interview notes.',
    workspaceId: 'workspace-1',
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const BoardView: React.FC<BoardViewProps> = ({ boardId }) => {
  // Mock fetching board details
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    // Simulate API call - fetch board data from database based on boardId
    const boardData = boardDatabase[boardId];
    if (boardData) {
      setBoard(boardData);
    }
  }, [boardId]);

  const [columns, setColumns] = useState<ColumnData[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      count: 8,
      tasks: [
        {
          id: 'task-1',
          columnId: 'backlog',
          title: 'Refactor API middleware for auth',
          description: '',
          dateStr: 'Oct 24',
          tags: [],
          assignee: { initials: 'JD', avatarColor: 'bg-indigo-100 text-indigo-700' },
        },
        {
          id: 'task-2',
          columnId: 'backlog',
          title: 'Documentation for Webhooks',
          description: '',
          dateStr: 'Oct 29',
          tags: [],
          assignee: { initials: 'AS', avatarColor: 'bg-cyan-100 text-cyan-700' },
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 3,
      tasks: [
        {
          id: 'task-3',
          columnId: 'in-progress',
          title: 'Design System Tonal Layering',
          description: '',
          dateStr: 'Today',
          tags: [{ label: 'FRONTEND', color: 'blue' }],
          assignee: { initials: 'BW', avatarColor: 'bg-blue-100 text-blue-700' },
        },
        {
          id: 'task-4',
          columnId: 'in-progress',
          title: 'OAuth2 Flow Implementation',
          description: '',
          dateStr: 'Yesterday',
          tags: [],
          assignee: { initials: 'RH', avatarColor: 'bg-rose-100 text-rose-700' },
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      count: 2,
      tasks: [
        {
          id: 'task-5',
          columnId: 'review',
          title: 'Mobile Responsive Layouts',
          description: '',
          dateStr: 'Oct 21',
          tags: [],
          assignee: { initials: 'UD', avatarColor: 'bg-purple-100 text-purple-700' },
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      count: 14,
      tasks: [
        {
          id: 'task-6',
          columnId: 'done',
          title: 'Finalize Brand Guidelines',
          description: '',
          dateStr: 'Oct 15',
          tags: [],
          assignee: { initials: 'ML', avatarColor: 'bg-green-100 text-green-700' },
        },
      ],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [targetColumnId, setTargetColumnId] = useState<string>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
    if (columns.find((col) => col.id === id)) {
      return id;
    }
    const container = columns.find((col) => col.tasks.find((task) => task.id === id));
    return container ? container.id : undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns.flatMap((c) => c.tasks).find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setColumns((prev) => {
      const activeItems = prev.find((col) => col.id === activeContainer)?.tasks || [];
      const overItems = prev.find((col) => col.id === overContainer)?.tasks || [];
      const activeIndex = activeItems.findIndex((t) => t.id === active.id);
      const overIndex = overItems.findIndex((t) => t.id === overId);

      let newIndex;
      if (overItems.length > 0 && String(overId) === String(overContainer)) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return prev.map((c) => {
        if (c.id === activeContainer) {
          return {
            ...c,
            tasks: c.tasks.filter((t) => t.id !== active.id),
            count: c.tasks.length - 1,
          };
        }
        if (c.id === overContainer) {
          let newTasks = [...c.tasks];
          const taskToMove = activeItems[activeIndex];

          // Insert at new index
          if (taskToMove) {
            newTasks.splice(newIndex, 0, taskToMove);
          }

          return {
            ...c,
            tasks: newTasks,
            count: newTasks.length,
          };
        }
        return c;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const id = active.id;
    const overId = over?.id;

    if (!overId || id === overId) {
      setActiveTask(null);
      return;
    }

    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId as string);

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const columnIndex = columns.findIndex((col) => col.id === activeContainer);
      const activeIndex = columns[columnIndex].tasks.findIndex((t) => t.id === id);
      const overIndex = columns[columnIndex].tasks.findIndex((t) => t.id === overId);

      if (activeIndex !== overIndex) {
        setColumns((prev) => {
          const newCols = [...prev];
          newCols[columnIndex] = {
            ...newCols[columnIndex],
            tasks: arrayMove(prev[columnIndex].tasks, activeIndex, overIndex),
          };
          return newCols;
        });
      }
    }

    setActiveTask(null);
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  // Actions
  const handleTaskClick = (taskId: string) => {
    const task = columns.flatMap((c) => c.tasks).find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setTargetColumnId(findContainer(taskId) || 'todo');
      setIsModalOpen(true);
    }
  };

  const handleAddTask = (columnId: string) => {
    setEditingTask(undefined);
    setTargetColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'> & { id?: string }) => {
    if (taskData.id) {
      // Edit
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) => (t.id === taskData.id ? ({ ...t, ...taskData } as Task) : t)),
        }))
      );
    } else {
      // Create
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        // Ensure tags and columnId are present if not in taskData (though they should be)
        tags: taskData.tags || [],
        columnId: taskData.columnId || targetColumnId || 'todo',
      };

      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === newTask.columnId) {
            return { ...col, tasks: [...col.tasks, newTask], count: (col.count || 0) + 1 };
          }
          return col;
        })
      );
    }
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
        count: col.tasks.filter((t) => t.id !== taskId).length,
      }))
    );
  };

  const handleAddColumn = () => {
    const name = window.prompt('Enter column name:');
    if (name) {
      setColumns((prev) => [
        ...prev,
        { id: name.toLowerCase().replace(/\s+/g, '-'), title: name, count: 0, tasks: [] },
      ]);
    }
  };

  if (!board) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50/30 overflow-hidden">
      <div className="flex-none px-8 py-3 bg-white border-b border-gray-100">
        <BoardHeader title={board.name} category="Workspaces" subCategory="Product" />
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4 px-8 pt-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 items-start h-full p-1 custom-scrollbar">
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                column={col}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? (
              <div className="opacity-80 rotate-2 cursor-grabbing">
                <SortableTaskItem task={activeTask} onClick={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskModal
        isOpen={isModalOpen && !editingTask}
        onClose={() => setIsModalOpen(false)}
        columnId={targetColumnId}
        onSave={handleSaveTask}
      />
      <TaskDetailsSidebar
        isOpen={isModalOpen && !!editingTask}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};
