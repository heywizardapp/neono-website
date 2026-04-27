import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRelatedSolutions } from '@/config/solutions';
import { useI18n } from '@/hooks/useI18n';

interface RelatedSolutionsProps {
  currentIndustry: string;
  title?: string;
  description?: string;
}

export function RelatedSolutions({
  currentIndustry,
  title,
  description
}: RelatedSolutionsProps) {
  const { t } = useI18n();
  const resolvedTitle = title || t('relatedSolutions.title');
  const resolvedDescription = description || t('relatedSolutions.subtitle');
  const relatedSolutions = getRelatedSolutions(currentIndustry, t);
  
  if (relatedSolutions.length === 0) return null;

  // Placeholder images for different industries
  const getIndustryImage = (industry: string) => {
    const industryKey = industry.toLowerCase().replace(/\s+/g, '');
    const placeholderMap: Record<string, string> = {
      'barbershops': '💈',
      'spas&wellness': '🧘‍♀️',
      'hairsalons': '💇‍♀️',
      'medicalaesthetics': '✨',
    };
    
    return placeholderMap[industryKey] || '✂️';
  };

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mb-4">
            {resolvedTitle}
          </h2>
          <p className="font-display text-lg text-muted-foreground max-w-2xl mx-auto">
            {resolvedDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {relatedSolutions.map((solution) => (
            <Card key={solution.path} className="hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-3" role="img" aria-label={solution.industry}>
                  {getIndustryImage(solution.industry)}
                </div>
                <CardTitle className="text-lg">{solution.title}</CardTitle>
                <CardDescription>
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <p>✓ {t('relatedSolutions.industryFeatures')}</p>
                  <p>✓ {t('relatedSolutions.tailoredWorkflows')}</p>
                  <p>✓ {t('relatedSolutions.sameGreatPricing')}</p>
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full touch-44 group-hover:border-primary group-hover:text-primary transition-colors"
                >
                  <Link to={solution.path}>
                    {t('solutions.index.explore')} {solution.industry} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('relatedSolutions.dontSeeIndustry')}
          </p>
          <Button variant="ghost" asChild className="touch-44">
            <Link to="/demo">
              {t('relatedSolutions.bookCustomDemo')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RelatedSolutions;