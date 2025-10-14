/**
 * Centralized error handling utilities
 */

import { toast } from '@/hooks/use-toast';
import { AppError, ErrorType } from './types';

export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    handleAppError(error);
  } else if (error instanceof Error) {
    handleGenericError(error);
  } else {
    handleUnknownError(error);
  }
}

function handleAppError(error: AppError): void {
  switch (error.type) {
    case ErrorType.VALIDATION:
      toast({
        title: 'Validation Error',
        description: error.message,
        variant: 'destructive'
      });
      break;
    case ErrorType.NETWORK:
      toast({
        title: 'Network Error',
        description: 'Please check your internet connection and try again.',
        variant: 'destructive'
      });
      break;
    case ErrorType.AUTH:
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive'
      });
      break;
    case ErrorType.NOT_FOUND:
      toast({
        title: 'Not Found',
        description: error.message,
        variant: 'destructive'
      });
      break;
    case ErrorType.SERVER:
      toast({
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive'
      });
      break;
    default:
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive'
      });
  }
  
  logError(error);
}

function handleGenericError(error: Error): void {
  toast({
    title: 'Error',
    description: error.message || 'Something went wrong',
    variant: 'destructive'
  });
  
  logError(error);
}

function handleUnknownError(error: unknown): void {
  toast({
    title: 'Error',
    description: 'An unexpected error occurred',
    variant: 'destructive'
  });
  
  console.error('Unknown error:', error);
}

function logError(error: Error | AppError): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', error);
  } else {
    // In production, send to error tracking service (e.g., Sentry)
    try {
      const errorLog = JSON.parse(localStorage.getItem('error_log') || '[]');
      errorLog.push({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        type: error instanceof AppError ? error.type : 'GENERIC'
      });
      localStorage.setItem('error_log', JSON.stringify(errorLog.slice(-50)));
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }
}

/**
 * Retry logic for network requests
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}

/**
 * Safe async wrapper that catches and handles errors
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error);
    return fallback;
  }
}
