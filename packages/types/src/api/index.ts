// API-specific types
export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
  statusCode: number;
  timestamp: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export type ApiResult<T> = SuccessResponse<T> | ErrorResponse;

// Request/Response types for common operations
export interface CreateRequest<T> {
  data: T;
}

export interface UpdateRequest<T> {
  id: string;
  data: Partial<T>;
}

export interface DeleteRequest {
  id: string;
}
