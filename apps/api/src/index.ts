import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '@kanban/types';
import { getEnvVar, isDevelopment } from '@kanban/utils';
import { API_BASE_URL, APP_NAME, APP_VERSION } from '@kanban/config';

import boardRoutes from './routes/boards';
import taskRoutes from './routes/tasks';
import healthRoutes from './routes/health';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_DEV === "production" ? "combined" : "dev"));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${requestId}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  res.locals.requestId = requestId;
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/api', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    data: {
      name: APP_NAME,
      version: APP_VERSION,
      status: 'running',
    } as unknown,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  console.error('Error:', err);

  const isDev = isDevelopment();
  const message = isDev ? err.message : 'Internal server error';

  res.status(500).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
});

// Start server
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
  console.log(`\n🚀 ${APP_NAME} API Server`);
  console.log(`Version: ${APP_VERSION}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Server running at http://${host}:${port}`);
  console.log(`API Base URL: ${API_BASE_URL}\n`);
});

export default app;
