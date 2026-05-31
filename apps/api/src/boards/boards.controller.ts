import { Request, Response } from 'express';
import { BoardsService } from './boards.service';
import { ApiResponse, PaginatedResponse, Board } from '@kanban/types';

export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  async getAll(req: Request, res: Response<PaginatedResponse<Board>>): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { boards, total } = await this.boardsService.findAll(page, limit);
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: boards,
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

  async getOne(req: Request, res: Response<ApiResponse<Board | null>>): Promise<void> {
    try {
      const board = await this.boardsService.findById(req.params.id);

      if (!board) {
        res.status(404).json({
          success: false,
          error: 'Board not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json({
        success: true,
        data: board,
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

  async create(req: Request, res: Response<ApiResponse<Board>>): Promise<void> {
    try {
      const userId = req.user?.id || 'anonymous';
      const board = await this.boardsService.create(req.body, userId);

      res.status(201).json({
        success: true,
        data: board,
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

  async update(req: Request, res: Response<ApiResponse<Board | null>>): Promise<void> {
    try {
      const board = await this.boardsService.update(req.params.id, req.body);

      if (!board) {
        res.status(404).json({
          success: false,
          error: 'Board not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json({
        success: true,
        data: board,
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
      const deleted = await this.boardsService.delete(req.params.id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Board not found',
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
