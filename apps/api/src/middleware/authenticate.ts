import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@kanban/types';
import { authServiceInstance } from '../auth/auth.routes';
import { AuthRepository } from '../auth/auth.repository';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
      };
    }
  }
}

const repository = new AuthRepository();

export async function authenticate(req: Request, res: Response<ApiResponse>, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies?.session_token;

    if (token) {
      const decoded = authServiceInstance.verifyToken(token);
      if (decoded) {
        req.user = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          avatar: decoded.avatar,
        };
        return next();
      }
    }

    // Support a fallback for tests/seed or headers:
    const headerUserId = req.headers['x-user-id'] as string;
    if (headerUserId) {
      const user = await repository.findById(headerUserId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        };
        return next();
      }

      if (headerUserId === 'default-user-uuid') {
        req.user = {
          id: 'default-user-uuid',
          email: 'user@example.com',
          name: 'Default User',
        };
        return next();
      }
    }

    res.status(401).json({
      success: false,
      error: 'Unauthorized access. Please log in.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized access. Authentication failed.',
      timestamp: new Date().toISOString(),
    });
  }
}
