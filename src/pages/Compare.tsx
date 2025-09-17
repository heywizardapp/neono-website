import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Minus, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featureMatrix, planLabels, planPricing } from '@/config/compare/featureMatrix';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

export default function ComparePage() {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm text-center font-medium">{value}</span>;
  };

  return (
    <>
      <SEOHead
        title="Compare Plans & Features - NeonO vs Competitors"
        description="Compare NeonO's all-in-one beauty business software with competitors. See what's included vs add-ons, features, and pricing side-by-side."
        path="/compare"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Compare Plans & Features
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See exactly what you get with NeonO vs. competitors. No hidden fees, no expensive add-ons—everything you need is included.
              </p>
            </div>
          </OptimizedInView>

          {/* Key Differentiators */}
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Everything Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    POS, website, marketing, analytics—all in one price. No hidden fees or expensive add-ons.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Better ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Save 60% compared to piecing together multiple tools. Get better results with integrated features.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Superior Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Live training, 24/7 support, and dedicated success manager. Others charge extra for basic support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          {/* Plan Comparison Headers */}
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="font-semibold text-muted-foreground">Features</div>
              {featureMatrix.plans.map((plan) => {
                const pricing = planPricing[plan];
                const isPopular = plan === 'growth';
                const isNeonO = plan !== 'competitorA';
                
                return (
                  <Card key={plan} className={`text-center ${isPopular ? 'ring-2 ring-primary' : ''} ${isNeonO ? 'bg-gradient-subtle' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-center gap-2">
                        <CardTitle className="text-lg">{planLabels[plan]}</CardTitle>
                        {isPopular && <Badge variant="default">Popular</Badge>}
                      </div>
                      <CardDescription>
                        <div className="text-3xl font-bold text-foreground">
                          ${pricing.price}<span className="text-sm font-normal">/mo</span>
                        </div>
                        <div className="text-sm">{pricing.seats} seats included</div>
                        {pricing.note && (
                          <div className="text-xs text-muted-foreground mt-1">{pricing.note}</div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {isNeonO ? (
                        <div className="space-y-2">
                          <Button asChild className="w-full" size="sm">
                            <Link to="/signup">Start Free Trial</Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full" size="sm">
                            <Link to={`/roi?plan=${plan}`}>
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
          </ScrollReveal>

          {/* Feature Comparison by Category */}
          <ScrollReveal>
            <Tabs defaultValue={featureMatrix.categories[0].id} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                {featureMatrix.categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {featureMatrix.categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.label}</CardTitle>
                      <CardDescription>
                        Compare what's included vs. add-on features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.rows.map((row, index) => (
                          <div key={row.id} className={`grid grid-cols-4 gap-4 py-4 ${index < category.rows.length - 1 ? 'border-b' : ''}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{row.label}</span>
                              {row.note && (
                                <span className="text-sm text-muted-foreground mt-1">{row.note}</span>
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
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal>
            <Card className="mt-12 bg-gradient-hero text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to switch to NeonO?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  Join thousands of beauty businesses saving time and money with our all-in-one platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <Link to="/roi">Calculate Your ROI</Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
                    <Link to="/contact">Talk to Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}