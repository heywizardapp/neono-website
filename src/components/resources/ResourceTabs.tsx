import { Button } from '@/components/ui/button';
import { Grid, FileText, BookOpen, GraduationCap, Video, TrendingUp } from 'lucide-react';

export type ResourceType = 'all' | 'blog' | 'guide' | 'education' | 'video' | 'case-study';

interface ResourceTab {
  id: ResourceType;
  label: string;
  icon: typeof Grid;
}

const resourceTypes: ResourceTab[] = [
  { id: 'all', label: 'All', icon: Grid },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'guide', label: 'Guides', icon: BookOpen },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'case-study', label: 'Success Stories', icon: TrendingUp }
];

interface ResourceTabsProps {
  selectedType: ResourceType;
  onTypeChange: (type: ResourceType) => void;
}

export function ResourceTabs({ selectedType, onTypeChange }: ResourceTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12 bg-muted/30 p-3 rounded-full max-w-3xl mx-auto">
      {resourceTypes.map((type) => {
        const Icon = type.icon;
        return (
          <Button
            key={type.id}
            variant={selectedType === type.id ? 'default' : 'ghost'}
            className="rounded-full px-6 transition-all duration-200"
            onClick={() => onTypeChange(type.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {type.label}
          </Button>
        );
      })}
    </div>
  );
}
