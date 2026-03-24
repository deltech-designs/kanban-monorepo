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
import { BoardHeader } from '@/components/board/BoardHeader';
import { BoardColumn, ColumnData } from '@/components/board/BoardColumn';
import { Task } from '@/components/board/TaskCard';
import { TaskModal } from '@/components/board/TaskModal';
import { SortableTaskItem } from '@/components/board/SortableTaskItem';
import { Board } from '@kanban/types';

interface BoardViewProps {
  boardId: string;
}

export const BoardView: React.FC<BoardViewProps> = ({ boardId }) => {
  // Mock fetching board details
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    // Simulate API call
    setBoard({
      id: boardId,
      name: 'Website Redesign',
      description: 'Marketing site overhaul',
      workspaceId: 'workspace-1',
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }, [boardId]);

  const [columns, setColumns] = useState<ColumnData[]>([
    {
      id: 'todo',
      title: 'To Do',
      count: 2,
      tasks: [
        {
          id: 'task-1',
          columnId: 'todo',
          title: 'Design homepage',
          description: 'Create mockups.',
          dateStr: 'Oct 24',
          tags: [{ label: 'Design', color: 'orange' }],
          assignee: { initials: 'JD', avatarColor: 'bg-indigo-100 text-indigo-700' },
        },
        {
          id: 'task-2',
          columnId: 'todo',
          title: 'User Feedback',
          description: 'Analyze survey results.',
          dateStr: 'Today',
          tags: [{ label: 'Research', color: 'blue' }],
          assignee: { initials: 'AS', avatarColor: 'bg-cyan-100 text-cyan-700' },
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 1,
      tasks: [
        {
          id: 'task-3',
          columnId: 'in-progress',
          title: 'Build navbar',
          description: 'Sticky nav.',
          dateStr: 'Oct 28',
          tags: [{ label: 'Dev', color: 'teal' }],
          assignee: { initials: 'BW', avatarColor: 'bg-orange-100 text-orange-700' },
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      count: 1,
      tasks: [
        {
          id: 'task-4',
          columnId: 'done',
          title: 'Testing',
          description: 'Mobile responsive.',
          dateStr: 'Oct 20',
          tags: [{ label: 'Quality', color: 'gray' }],
          assignee: { initials: 'RH', avatarColor: 'bg-gray-200 text-gray-700' },
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
          tasks: col.tasks.map((t) =>
            t.id === taskData.id ? { ...t, ...taskData } as Task : t
          ),
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
          if (col.id === (newTask.columnId)) {
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
    <div className="flex flex-col h-full pl-8 pt-6 pr-8 pb-8 overflow-hidden bg-white">
      <BoardHeader title={board.name} category="Projects" subCategory={board.description || 'General'} />

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 items-start h-full">
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                column={col}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            ))}

            <button
              onClick={handleAddColumn}
              className="min-w-85 h-12.5 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-semibold hover:border-gray-300 hover:text-gray-500 transition-colors shrink-0"
            >
              + Add Column
            </button>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        columnId={targetColumnId}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};
