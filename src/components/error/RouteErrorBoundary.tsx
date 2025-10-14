/**
 * Route-level error boundary with navigation fallback
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

interface RouteErrorBoundaryProps {
  error: Error;
}

export function RouteErrorBoundary({ error }: RouteErrorBoundaryProps) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">Page Error</h1>
        <p className="text-muted-foreground mb-6">
          This page encountered an error. Please try navigating back or return home.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-left bg-muted p-3 rounded-md mb-6 overflow-auto max-h-32 text-xs">
            <code className="break-all">{error.message}</code>
          </div>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
