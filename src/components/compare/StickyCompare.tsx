import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X, GitCompare, Check, Minus, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { featureMatrix, planLabels, planPricing } from '@/config/compare/featureMatrix';
import { PlanKey, FeatureRow } from '@/types/roi';

interface StickyCompareProps {
  showOnPaths?: string[];
}

export function StickyCompare({ showOnPaths = ['/pricing', '/products/', '/solutions/'] }: StickyCompareProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(featureMatrix.categories[0].id);
  const location = useLocation();
  
  const shouldShow = showOnPaths.some(path => location.pathname.startsWith(path));
  
  if (!shouldShow) return null;

  const handleToggle = () => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState) {
        console.log('compare_opened', { path: location.pathname, timestamp: Date.now() });
      }
      return newState;
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log('compare_category_changed', { category: categoryId, timestamp: Date.now() });
  };

  const handleRoiDeeplink = (plan: 'starter' | 'growth') => {
    const roiUrl = `/roi?plan=${plan}`;
    console.log('compare_deeplink_to_roi', { plan, timestamp: Date.now() });
    return roiUrl;
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-mint mx-auto" />
      ) : (
        <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm text-center">{value}</span>;
  };

  // Lock body scroll when dialog is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key handler
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Sticky Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleToggle}
          size="lg"
          className="rounded-full shadow-large hover:shadow-glow transition-all touch-44"
          aria-label="Compare plans and features"
        >
          <GitCompare className="h-5 w-5 mr-2" />
          Compare Plans
        </Button>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-6xl h-[90vh] overflow-hidden p-0"
          aria-describedby="compare-description"
        >
          <DialogHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">Compare plans and features</DialogTitle>
                <DialogDescription id="compare-description">
                  See what's included vs. add-ons elsewhere—then check your ROI.
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="touch-44"
                aria-label="Close comparison"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Plan Headers */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="font-semibold text-muted-foreground">Features</div>
                {featureMatrix.plans.map((plan) => {
                  const pricing = planPricing[plan];
                  const isPopular = plan === 'growth';
                  
                  return (
                    <Card key={plan} className={`text-center ${isPopular ? 'ring-2 ring-primary' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-center gap-2">
                          <CardTitle className="text-lg">{planLabels[plan]}</CardTitle>
                          {isPopular && <Badge variant="default">Popular</Badge>}
                        </div>
                        <CardDescription>
                          <div className="text-2xl font-bold text-foreground">
                            ${pricing.price}<span className="text-sm font-normal">/mo</span>
                          </div>
                          <div className="text-sm">{pricing.seats} seats included</div>
                          {pricing.note && (
                            <div className="text-xs text-muted-foreground mt-1">{pricing.note}</div>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {plan !== 'competitorA' ? (
                          <div className="space-y-2">
                            <Button asChild className="w-full touch-44" size="sm">
                              <Link to="/signup">Start Free Trial</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full touch-44" size="sm">
                              <Link to={handleRoiDeeplink(plan as 'starter' | 'growth')}>
                                See ROI <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            Representative competitor
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Feature Categories */}
              <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
                <TabsList className="grid w-full grid-cols-6 mb-6">
                  {featureMatrix.categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="text-xs touch-44"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {featureMatrix.categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{category.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.rows.map((row) => (
                            <div key={row.id} className="grid grid-cols-4 gap-4 py-3 border-b last:border-b-0">
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{row.label}</span>
                                {row.note && (
                                  <span className="text-xs text-muted-foreground mt-1">{row.note}</span>
                                )}
                              </div>
                              {featureMatrix.plans.map((plan) => (
                                <div key={plan} className="flex items-center justify-center">
                                  {renderFeatureValue(row.values[plan])}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Bottom CTA */}
              <Card className="mt-8 bg-gradient-hero text-white border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Ready to save with NeonO?</h3>
                  <p className="text-white/90 mb-4">
                    Everything you need is included—no hidden fees, no expensive add-ons.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button size="lg" variant="secondary" className="touch-44" asChild>
                      <Link to="/signup">Start Free Trial</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 touch-44" asChild>
                      <Link to="/roi">Calculate ROI</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StickyCompare;