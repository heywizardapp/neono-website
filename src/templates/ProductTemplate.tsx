import { MediaRow } from '@/components/MediaRow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';
import { FaqAccordion } from '@/components/FaqAccordion';
import { OptimizedImage } from '@/components/OptimizedImage';

export interface ProductSection {
  id: string;
  title: string;
  eyebrow?: string;
  bullets: string[];
  media: {
    src: string;
    alt: string;
    variant?: 'image' | 'video';
  };
  reverse?: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface ProductScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProductIntegration {
  name: string;
  logo: string;
}

export interface ProductHardware {
  name: string;
  description: string;
  image: string;
}

export interface ProductPricing {
  startingPrice: string;
  includedIn: string[];
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface RelatedProduct {
  name: string;
  href: string;
  description: string;
}

export interface ProductTemplateProps {
  productName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: ProductFeature[];
  benefits: ProductBenefit[];
  screenshots?: ProductScreenshot[];
  integrations?: ProductIntegration[];
  hardware?: ProductHardware[];
  pricing?: ProductPricing;
  faqs: ProductFaq[];
  relatedProducts: RelatedProduct[];
  seoKeywords?: string;
  path: string;
  sections?: ProductSection[];
}

export function ProductTemplate({
  productName,
  tagline,
  description,
  icon: Icon,
  features,
  benefits,
  screenshots,
  integrations,
  hardware,
  pricing,
  faqs,
  relatedProducts,
  seoKeywords,
  path,
  sections,
}: ProductTemplateProps) {
  return (
    <>
      <SEOHead
        title={`${productName} — NeonO ${productName} Features`}
        description={tagline}
        path={path}
        keywords={seoKeywords}
        structuredData={[
          {
            type: 'breadcrumb',
            data: generateStructuredData('breadcrumb', {
              crumbs: [
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: productName, href: path }
              ]
            })
          },
          {
            type: 'product',
            data: generateStructuredData('product', {
              name: `NeonO ${productName}`,
              description: tagline,
              price: pricing?.startingPrice ? parseFloat(pricing.startingPrice.replace(/[^0-9.]/g, '')) : 29,
              currency: 'USD'
            })
          }
        ]}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-subtle overflow-hidden">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero text-white shadow-elegant mb-4">
                <Icon className="h-8 w-8" />
              </div>
              
              <Badge variant="secondary" className="text-sm font-medium">
                {productName}
              </Badge>
              
              <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {tagline}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero-primary" asChild>
                  <Link to="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Watch Demo</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            {screenshots && screenshots.length > 0 && (
              <div className="relative mx-auto max-w-6xl mt-12 lg:mt-20 fade-in-up">
                 <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-3 shadow-2xl ring-1 ring-white/10 dark:ring-white/5">
                    <OptimizedImage 
                      src={screenshots[0].src} 
                      alt={screenshots[0].alt} 
                      className="rounded-xl w-full shadow-inner bg-muted/50"
                    />
                 </div>
                 {/* Decorative elements behind */}
                 <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-[100px] -z-10 opacity-50" />
                 <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-[100px] -z-10 opacity-50" />
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        {sections && sections.length > 0 ? (
          <div className="flex flex-col">
             {sections.map((section, index) => (
                <MediaRow
                  key={section.id}
                  {...section}
                  reverse={section.reverse ?? index % 2 === 1}
                />
             ))}
          </div>
        ) : (
        <section className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Key Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need in {productName.toLowerCase()}, designed for beauty and wellness businesses.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="group relative overflow-hidden rounded-2xl bg-background p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 border"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
                  
                  <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Screenshots Section - Display remaining screenshots if any */}
        {screenshots && screenshots.length > 1 && (
          <section className="py-20 lg:py-32 bg-gradient-subtle">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                  See it in action
                </h2>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                {screenshots.slice(1).map((screenshot, index) => (
                  <div key={index} className="space-y-4">
                    <OptimizedImage
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="rounded-xl border shadow-lg w-full"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      {screenshot.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Business benefits
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real outcomes you can expect when using {productName}.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="space-y-3" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware Section */}
        {hardware && hardware.length > 0 && (
          <section className="py-20 lg:py-32">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                  Professional Hardware
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Industry-leading terminals for reliable, fast, and secure payments.
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3">
                {hardware.map((item) => (
                  <div key={item.name} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border shadow-sm">
                    <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-muted/50 p-8 flex items-center justify-center">
                      <OptimizedImage 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Integrations Section */}
        {integrations && integrations.length > 0 && (
          <section className="py-20 lg:py-32 bg-gradient-subtle">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                  Works with your tools
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Seamlessly integrates with the apps you already use.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-3xl mx-auto">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex flex-col items-center space-y-2">
                    <div className="h-16 w-16 rounded-xl bg-gradient-card border border-border/40 flex items-center justify-center font-bold text-primary">
                      {integration.logo}
                    </div>
                    <span className="text-xs text-muted-foreground text-center">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        {pricing && (
          <section className="py-20 lg:py-32">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl">
                  Simple pricing
                </h2>
                <p className="text-xl text-muted-foreground">
                  {productName} is included in all NeonO plans starting at {pricing.startingPrice}.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {pricing.includedIn.map((plan) => (
                    <Badge key={plan} variant="secondary">{plan}</Badge>
                  ))}
                </div>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                Frequently asked questions
              </h2>
            </div>
            
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-20 lg:py-32">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
                  You might also like
                </h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
                {relatedProducts.map((product) => (
                  <Card key={product.name} className="feature-card group">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link to={product.href}>
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container text-center">
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of beauty and wellness businesses using {productName} to grow faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero-primary" asChild>
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
