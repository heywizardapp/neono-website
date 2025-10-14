/**
 * User-friendly error UI fallback
 */

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="max-w-lg w-full p-8 text-center">
        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-4">
          We apologize for the inconvenience. Our team has been notified and is working on a fix.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-left bg-muted p-4 rounded-md mb-4 overflow-auto max-h-40 text-sm">
            <code className="text-xs break-all">{error.message}</code>
          </div>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={resetError} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
