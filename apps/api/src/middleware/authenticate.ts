import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@kanban/types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export function authenticate(req: Request, res: Response<ApiResponse>, next: NextFunction): void {
  // Extract user ID from header, query, or use a default mock uuid
  const userId = (req.headers['x-user-id'] as string) || 'default-user-uuid';

  req.user = {
    id: userId,
    email: 'user@example.com',
    name: 'Default User',
  };

  next();
}
