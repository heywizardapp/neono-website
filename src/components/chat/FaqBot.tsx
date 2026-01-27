import * as React from "react";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import faqData from '@/config/faq.json';

interface FaqBotProps {
  onSuggestion: (answer: string) => void;
}

interface FaqItem {
  question: string;
  answer: string;
  tags: string[];
}

export function FaqBot({ onSuggestion }: FaqBotProps) {
  const [suggestions, setSuggestions] = React.useState<FaqItem[]>([]);
  const [hasShownSuggestions, setHasShownSuggestions] = React.useState(false);

  React.useEffect(() => {
    // Show initial FAQ suggestions on mount
    if (!hasShownSuggestions) {
      const topFaqs = faqData.slice(0, 3) as FaqItem[];
      setSuggestions(topFaqs);
      setHasShownSuggestions(true);
    }
  }, [hasShownSuggestions]);

  const searchFaqs = (query: string): FaqItem[] => {
    const normalizedQuery = query.toLowerCase();
    const scored = faqData.map((faq) => {
      let score = 0;
      
      // Exact matches in question get highest score
      if (faq.question.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }
      
      // Tag matches get medium score
      faq.tags.forEach(tag => {
        if (tag.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(tag.toLowerCase())) {
          score += 5;
        }
      });
      
      // Answer matches get lower score
      if (faq.answer.toLowerCase().includes(normalizedQuery)) {
        score += 2;
      }
      
      return { ...faq, score };
    });

    // Return top 3 results with score > 0
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const handleSuggestionClick = (faq: FaqItem) => {
    onSuggestion(`**${faq.question}**\n\n${faq.answer}`);
    setSuggestions([]); // Clear suggestions after use
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="p-3 bg-accent/50">
      <p className="text-sm font-medium mb-2 text-muted-foreground">
        Common questions:
      </p>
      <div className="space-y-2">
        {suggestions.map((faq, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="h-auto p-2 text-left justify-start whitespace-normal"
            onClick={() => handleSuggestionClick(faq)}
          >
            <span className="text-xs">{faq.question}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}