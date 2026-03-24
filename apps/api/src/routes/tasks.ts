import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  Task,
  TaskStatus,
  CreateTaskInput,
  UpdateTaskInput,
  ApiResponse,
  PaginatedResponse,
} from '@kanban/types';

const router = Router();

// In-memory storage (replace with database in production)
const tasks = new Map<string, Task>();

// GET /api/tasks - Get all tasks (with optional filtering)
router.get('/', (req: Request, res: Response<PaginatedResponse<Task>>) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const boardId = req.query.boardId as string;
  const status = req.query.status as TaskStatus;

  let allTasks = Array.from(tasks.values());

  if (boardId) {
    allTasks = allTasks.filter((task) => task.boardId === boardId);
  }

  if (status) {
    allTasks = allTasks.filter((task) => task.status === status);
  }

  const total = allTasks.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedTasks = allTasks.slice(start, start + limit);

  res.json({
    success: true,
    data: paginatedTasks,
    pagination: { page, limit, total, pages },
    timestamp: new Date().toISOString(),
  });
});

// GET /api/tasks/:id - Get single task
router.get('/:id', (req: Request, res: Response<ApiResponse<Task | null>>) => {
  const task = tasks.get(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    data: task,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/tasks - Create task
router.post('/', (req: Request, res: Response<ApiResponse<Task>>) => {
  const { title, description, status, boardId } = req.body as CreateTaskInput;

  if (!title || !boardId) {
    return res.status(400).json({
      success: false,
      error: 'title and boardId are required',
      timestamp: new Date().toISOString(),
    });
  }

  const task: Task = {
    id: uuidv4(),
    title,
    description,
    status: status || TaskStatus.TODO,
    boardId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.set(task.id, task);

  res.status(201).json({
    success: true,
    data: task,
    timestamp: new Date().toISOString(),
  });
});

// PUT /api/tasks/:id - Update task
router.put('/:id', (req: Request, res: Response<ApiResponse<Task | null>>) => {
  const task = tasks.get(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
      timestamp: new Date().toISOString(),
    });
  }

  const updates = req.body as UpdateTaskInput;
  const updatedTask: Task = {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };

  tasks.set(updatedTask.id, updatedTask);

  res.json({
    success: true,
    data: updatedTask,
    timestamp: new Date().toISOString(),
  });
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req: Request, res: Response<ApiResponse<null>>) => {
  if (!tasks.has(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
      timestamp: new Date().toISOString(),
    });
  }

  tasks.delete(req.params.id);

  res.json({
    success: true,
    data: null,
    timestamp: new Date().toISOString(),
  });
});

export default router;
