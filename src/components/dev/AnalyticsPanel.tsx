import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AnalyticsPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [events, setEvents] = React.useState<any[]>([]);
  const [vitals, setVitals] = React.useState<any>({});

  React.useEffect(() => {
    // Listen for keyboard shortcut (Alt + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Analytics Debug Panel</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Dev Only</Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                ✕
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 h-full">
          <Tabs defaultValue="events" className="h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="vitals">Web Vitals</TabsTrigger>
              <TabsTrigger value="experiments">A/B Tests</TabsTrigger>
              <TabsTrigger value="funnels">Funnels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Recent analytics events (Alt + A to toggle)
              </div>
            </TabsContent>
            
            <TabsContent value="vitals" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Core Web Vitals monitoring
              </div>
            </TabsContent>
            
            <TabsContent value="experiments" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                A/B test assignments and conversions
              </div>
            </TabsContent>
            
            <TabsContent value="funnels" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Funnel progress and completion rates
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}