 import { z } from 'zod';
 
 // Reason: Centralized API client to standardize error handling, parsing, and env-driven base URL.
 // In dev, some setups may not have DefinePlugin substitution yet. Avoid hard process references.
 const RAW_ENV = (typeof process !== 'undefined' && (process.env as any)?.API_BASE_URL) || '';
 const API_BASE_URL = String(RAW_ENV).replace(/\/$/, '');
 export const isApiConfigured = API_BASE_URL.length > 0;

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

const parseJson = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  try {
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (e) {
    throw {
      status: res.status,
      message: 'Invalid JSON received from server',
      details: text
    } satisfies ApiError;
  }
};

type RequestOptions = Omit<RequestInit, 'method' | 'body'> & { body?: unknown };

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  options: RequestOptions = {}
): Promise<T> => {
  if (!API_BASE_URL) {
    throw {
      status: 500,
      message: 'API_BASE_URL is not configured'
    } satisfies ApiError;
  }

  const url = `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) {
    // Attempt to parse error payload
    let details: unknown;
    try {
      details = await res.json();
    } catch {}
    throw {
      status: res.status,
      message: (details as any)?.message || res.statusText || 'Request failed',
      details
    } satisfies ApiError;
  }

  return parseJson<T>(res);
};

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body })
};

// Zod helpers
export const parseWith = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    // Throw a normalized error for upstream handling
    throw {
      status: 500,
      message: 'Response validation failed',
      details: result.error.flatten()
    } satisfies ApiError;
  }
  return result.data;
};
