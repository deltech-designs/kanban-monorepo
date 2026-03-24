import { Router, Request, Response } from 'express';
import { ApiResponse } from '@kanban/types';

const router = Router();

interface HealthData {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
}

router.get('/', (req: Request, res: Response<ApiResponse<HealthData>>) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
