import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target } from 'lucide-react';

interface FocusKeywordProps {
  value: string;
  onChange: (value: string) => void;
}

export function FocusKeyword({ value, onChange }: FocusKeywordProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="focus-keyword" className="flex items-center gap-2">
        <Target className="h-4 w-4" />
        Focus Keyword
      </Label>
      <Input
        id="focus-keyword"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., salon management software"
        className="font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Enter the main keyword you want to rank for
      </p>
    </div>
  );
}
