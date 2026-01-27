import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Users, 
  UserCog, 
  Megaphone, 
  BarChart3, 
  Puzzle, 
  Wrench, 
  Settings, 
  Rocket,
  ChevronRight,
  type LucideIcon
} from 'lucide-react';

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Calendar,
  CreditCard,
  Users,
  UserCog,
  Megaphone,
  BarChart3,
  Puzzle,
  Wrench,
  Settings,
  BookOpen,
};

interface CategoryCardProps {
  category: {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
    article_count: number;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || BookOpen;
  
  return (
    <Link to={`/academy/${category.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {category.title}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-2 min-h-[40px]">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
            {category.article_count} {category.article_count === 1 ? 'article' : 'articles'}
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
