import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  Board,
  CreateBoardInput,
  UpdateBoardInput,
  ApiResponse,
  PaginatedResponse,
} from '@kanban/types';

const router = Router();

// In-memory storage (replace with database in production)
const boards = new Map<string, Board>();

// GET /api/boards - Get all boards
router.get('/', (req: Request, res: Response<PaginatedResponse<Board>>) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const allBoards = Array.from(boards.values());
  const total = allBoards.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedBoards = allBoards.slice(start, start + limit);

  res.json({
    success: true,
    data: paginatedBoards,
    pagination: { page, limit, total, pages },
    timestamp: new Date().toISOString(),
  });
});

// GET /api/boards/:id - Get single board
router.get('/:id', (req: Request, res: Response<ApiResponse<Board | null>>) => {
  const board = boards.get(req.params.id);

  if (!board) {
    return res.status(404).json({
      success: false,
      error: 'Board not found',
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    data: board,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/boards - Create board
router.post('/', (req: Request, res: Response<ApiResponse<Board>>) => {
  const { name, description, userId } = req.body as CreateBoardInput;

  if (!name || !userId) {
    return res.status(400).json({
      success: false,
      error: 'name and userId are required',
      timestamp: new Date().toISOString(),
    });
  }

  const board: Board = {
    id: uuidv4(),
    name,
    description,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  boards.set(board.id, board);

  res.status(201).json({
    success: true,
    data: board,
    timestamp: new Date().toISOString(),
  });
});

// PUT /api/boards/:id - Update board
router.put('/:id', (req: Request, res: Response<ApiResponse<Board | null>>) => {
  const board = boards.get(req.params.id);

  if (!board) {
    return res.status(404).json({
      success: false,
      error: 'Board not found',
      timestamp: new Date().toISOString(),
    });
  }

  const updates = req.body as UpdateBoardInput;
  const updatedBoard: Board = {
    ...board,
    ...updates,
    updatedAt: new Date(),
  };

  boards.set(updatedBoard.id, updatedBoard);

  res.json({
    success: true,
    data: updatedBoard,
    timestamp: new Date().toISOString(),
  });
});

// DELETE /api/boards/:id - Delete board
router.delete('/:id', (req: Request, res: Response<ApiResponse<null>>) => {
  if (!boards.has(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: 'Board not found',
      timestamp: new Date().toISOString(),
    });
  }

  boards.delete(req.params.id);

  res.json({
    success: true,
    data: null,
    timestamp: new Date().toISOString(),
  });
});

export default router;
