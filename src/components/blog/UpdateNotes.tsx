import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { FileEdit, ChevronDown } from 'lucide-react';
import { ContentUpdate } from '@/lib/blog/updateTracking';
import { formatUpdateDate } from '@/lib/blog/updateTracking';
import { useState } from 'react';

interface UpdateNotesProps {
  contentHistory?: ContentUpdate[];
  updateNotes?: string;
  version?: number;
}

export function UpdateNotes({ contentHistory = [], updateNotes, version }: UpdateNotesProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Don't show if no update history
  if (!contentHistory.length && !updateNotes) return null;

  // Combine current update notes with history
  const allUpdates = updateNotes && version
    ? [{ version, date: new Date().toISOString(), notes: updateNotes }, ...contentHistory]
    : contentHistory;

  return (
    <Card className="border-primary/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <FileEdit className="h-5 w-5" />
              <CardTitle className="text-lg">Editorial Updates</CardTitle>
              <Badge variant="secondary">{allUpdates.length}</Badge>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {allUpdates.map((update, index) => (
              <div 
                key={`${update.version}-${update.date}`}
                className={`pl-4 border-l-2 ${index === 0 ? 'border-primary' : 'border-muted'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={index === 0 ? 'default' : 'outline'} className="text-xs">
                    Version {update.version}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatUpdateDate(update.date)}
                  </span>
                </div>
                <p className="text-sm">{update.notes}</p>
                {update.author && (
                  <p className="text-xs text-muted-foreground mt-1">by {update.author}</p>
                )}
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
