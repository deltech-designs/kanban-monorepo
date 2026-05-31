import { Request, Response } from 'express';
import { TasksService } from './tasks.service';
import { ApiResponse, PaginatedResponse, Task, TaskStatus } from '@kanban/types';

export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  async getAll(req: Request, res: Response<PaginatedResponse<Task>>): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const boardId = req.query.boardId as string;
      const status = req.query.status as TaskStatus;

      const { tasks, total } = await this.tasksService.findAll(page, limit, { boardId, status });
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: tasks,
        pagination: { page, limit, total, pages },
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      } as any);
    }
  }

  async getOne(req: Request, res: Response<ApiResponse<Task | null>>): Promise<void> {
    try {
      const task = await this.tasksService.findById(req.params.id);

      if (!task) {
        res.status(404).json({
          success: false,
          error: 'Task not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json({
        success: true,
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async create(req: Request, res: Response<ApiResponse<Task>>): Promise<void> {
    try {
      const task = await this.tasksService.create(req.body);

      res.status(201).json({
        success: true,
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async update(req: Request, res: Response<ApiResponse<Task | null>>): Promise<void> {
    try {
      const task = await this.tasksService.update(req.params.id, req.body);

      if (!task) {
        res.status(404).json({
          success: false,
          error: 'Task not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json({
        success: true,
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
    try {
      const deleted = await this.tasksService.delete(req.params.id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Task not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json({
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
