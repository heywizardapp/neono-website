import * as React from 'react';
import { cn } from '@/lib/utils';

// Props interface matching the original Scene3D
interface Scene3DProps {
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
}

interface Scene3DBackgroundProps {
  className?: string;
}

// Loading component while Scene3D loads
const Scene3DFallback = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg", className)}>
    <div className="animate-pulse">
      <div className="w-8 h-8 bg-primary/30 rounded-full animate-bounce" />
    </div>
  </div>
);

// Lazy load Scene3D component
const LazyScene3DComponent = React.lazy(() => 
  import('../advanced/Scene3D').then(module => ({
    default: module.Scene3D
  }))
);

const LazyScene3DBackgroundComponent = React.lazy(() => 
  import('../advanced/Scene3D').then(module => ({
    default: module.Scene3DBackground
  }))
);

// Main lazy Scene3D wrapper
export function LazyScene3D(props: Scene3DProps) {
  return (
    <React.Suspense fallback={<Scene3DFallback className={props.className} />}>
      <LazyScene3DComponent {...props} />
    </React.Suspense>
  );
}

// Background variant
export function LazyScene3DBackground(props: Scene3DBackgroundProps) {
  return (
    <React.Suspense fallback={<Scene3DFallback className={props.className} />}>
      <LazyScene3DBackgroundComponent {...props} />
    </React.Suspense>
  );
}

// Default export for compatibility
export default LazyScene3D;