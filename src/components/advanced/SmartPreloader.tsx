import * as React from 'react';
import { cn } from '@/lib/utils';

interface SmartPreloaderProps {
  className?: string;
  variant?: 'minimal' | 'branded' | 'skeleton';
  showProgress?: boolean;
  estimatedTime?: number;
}

export function SmartPreloader({ 
  className,
  variant = 'branded',
  showProgress = true,
  estimatedTime = 3000
}: SmartPreloaderProps) {
  const [progress, setProgress] = React.useState(0);
  const [loadingStage, setLoadingStage] = React.useState('Initializing...');

  React.useEffect(() => {
    const stages = [
      'Initializing...',
      'Loading resources...',
      'Preparing interface...',
      'Almost ready...',
      'Done!'
    ];

    let currentStage = 0;
    const stageInterval = estimatedTime / stages.length;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + (100 / (estimatedTime / 100)), 100);
        
        // Update stage based on progress
        const newStageIndex = Math.floor((newProgress / 100) * (stages.length - 1));
        if (newStageIndex !== currentStage && newStageIndex < stages.length) {
          currentStage = newStageIndex;
          setLoadingStage(stages[newStageIndex]);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [estimatedTime]);

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center justify-center min-h-screen', className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('min-h-screen bg-background p-8', className)}>
        {/* Header skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-muted rounded-lg" />
          
          {/* Hero skeleton */}
          <div className="h-96 bg-muted rounded-lg" />
          
          {/* Content grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'fixed inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center z-50',
      className
    )}>
      <div className="text-center space-y-8 px-4">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="text-4xl font-display font-bold text-white">
            NeonO
          </div>
          <div className="text-white/80 text-lg">
            Beauty & Wellness Platform
          </div>
        </div>

        {/* Animated loader */}
        <div className="relative">
          {/* Pulsing dots */}
          <div className="flex space-x-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="w-64 mx-auto space-y-3">
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-white/80 text-sm font-medium">
              {loadingStage}
            </div>
            <div className="text-white/60 text-xs">
              {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Hook for managing preloader state
export function usePreloader(minLoadTime = 2000) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadStartTime] = React.useState(Date.now());

  React.useEffect(() => {
    const handleLoad = () => {
      const elapsed = Date.now() - loadStartTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [loadStartTime, minLoadTime]);

  return { isLoading, setIsLoading };
}