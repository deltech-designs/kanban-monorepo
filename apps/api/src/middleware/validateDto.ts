import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ApiResponse } from '@kanban/types';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response<ApiResponse>, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = formatErrors(errors);
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        data: formattedErrors as any,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    req.body = dtoInstance;
    next();
  };
}

function formatErrors(errors: ValidationError[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  for (const error of errors) {
    const property = error.property;
    if (error.constraints) {
      result[property] = Object.values(error.constraints);
    }
    if (error.children && error.children.length > 0) {
      const nested = formatErrors(error.children);
      for (const [key, msgs] of Object.entries(nested)) {
        result[`${property}.${key}`] = msgs;
      }
    }
  }

  return result;
}
