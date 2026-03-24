import { ApiResponse } from '@kanban/types';

interface FetchOptions extends RequestInit {
  data?: unknown;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  }

  private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    const { data, headers, ...restOptions } = options;

    const requestOptions: RequestInit = {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, requestOptions);
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error || response.statusText || 'An error occurred',
        errors: data?.details
      };
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: data as T
    };
  }

  async get<T = unknown>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body' | 'data'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = unknown>(endpoint: string, data?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'POST', data });
  }

  async put<T = unknown>(endpoint: string, data?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'PUT', data });
  }

  async patch<T = unknown>(endpoint: string, data?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'PATCH', data });
  }

  async delete<T = unknown>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
