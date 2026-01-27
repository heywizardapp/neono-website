import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  TrendingUp,
  Type,
  FileText,
  Heading,
  Target,
  Link2,
  Image,
  BookOpen
} from 'lucide-react';
import { SEOAnalysis } from '@/lib/seo/seoAnalyzer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import * as React from "react";

interface SEOScoreCardProps {
  analysis: SEOAnalysis;
  focusKeyword?: string;
}

export function SEOScoreCard({ analysis, focusKeyword }: SEOScoreCardProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const StatusIcon = ({ status }: { status: 'good' | 'warning' | 'error' }) => {
    if (status === 'good') return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    if (status === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const checks = [
    {
      icon: Type,
      label: 'Title Length',
      value: `${analysis.title.length} chars`,
      status: analysis.title.status,
      suggestion: analysis.title.suggestion
    },
    {
      icon: FileText,
      label: 'Meta Description',
      value: `${analysis.description.length} chars`,
      status: analysis.description.status,
      suggestion: analysis.description.suggestion
    },
    {
      icon: FileText,
      label: 'Content Length',
      value: `${analysis.content.wordCount} words`,
      status: analysis.content.status,
      suggestion: analysis.content.suggestion
    },
    {
      icon: Heading,
      label: 'Heading Structure',
      value: `${analysis.headings.h2Count} H2, ${analysis.headings.h3Count} H3`,
      status: analysis.headings.status,
      suggestion: analysis.headings.suggestion
    },
    {
      icon: Target,
      label: 'Focus Keyword',
      value: focusKeyword 
        ? `${analysis.keyword.count} uses (${analysis.keyword.density.toFixed(1)}%)`
        : 'Not set',
      status: analysis.keyword.status,
      suggestion: analysis.keyword.suggestion
    },
    {
      icon: Link2,
      label: 'Links',
      value: `${analysis.links.internal} internal, ${analysis.links.external} external`,
      status: analysis.links.status,
      suggestion: analysis.links.suggestion
    },
    {
      icon: Image,
      label: 'Image Alt Text',
      value: analysis.images.total > 0 
        ? `${analysis.images.withAlt}/${analysis.images.total} (${analysis.images.coverage}%)`
        : 'No images',
      status: analysis.images.status,
      suggestion: analysis.images.suggestion
    },
    {
      icon: BookOpen,
      label: 'Readability',
      value: `${analysis.readability.score}/100 (${analysis.readability.grade})`,
      status: analysis.readability.status,
      suggestion: analysis.readability.suggestion
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            SEO Score
          </span>
          <Badge 
            variant="outline" 
            className={`${getScoreBg(analysis.score)} ${getScoreColor(analysis.score)} border-0 text-lg font-bold px-3`}
          >
            {analysis.score}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={analysis.score} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {analysis.score >= 80 && 'Excellent! Your content is well optimized.'}
            {analysis.score >= 50 && analysis.score < 80 && 'Good start! A few improvements will help.'}
            {analysis.score < 50 && 'Needs work. Follow the suggestions below.'}
          </p>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full text-left">
            <div className="flex items-center justify-between py-2 text-sm font-medium">
              <span>SEO Checklist</span>
              <span className="text-muted-foreground">
                {isOpen ? '▼' : '▶'}
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            {checks.map((check, index) => (
              <div key={index} className="space-y-1 border-l-2 border-border pl-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <check.icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{check.label}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {check.value}
                    </span>
                    <StatusIcon status={check.status} />
                  </div>
                </div>
                {check.suggestion && (
                  <p className="text-xs text-muted-foreground pl-5">
                    {check.suggestion}
                  </p>
                )}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {focusKeyword && (
          <div className="pt-3 border-t space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Keyword Analysis</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                {analysis.keyword.inTitle ? '✅' : '❌'} In title
              </div>
              <div className="flex items-center gap-1">
                {analysis.keyword.inFirstParagraph ? '✅' : '❌'} In first paragraph
              </div>
              <div className="flex items-center gap-1">
                {analysis.keyword.inHeadings ? '✅' : '❌'} In headings
              </div>
              <div className="flex items-center gap-1">
                {analysis.keyword.density >= 1 && analysis.keyword.density <= 3 ? '✅' : '❌'} 
                Density: {analysis.keyword.density.toFixed(1)}%
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
