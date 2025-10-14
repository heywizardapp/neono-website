import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { EducationContent } from '@/types/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AlertCircle, Info, Lightbulb, AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCategoryById } from '@/config/education/categories';
import { SEOHead } from '@/components/SEO/SEOHead';

interface EducationTemplateProps {
  content: EducationContent;
}

export function EducationTemplate({ content }: EducationTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>(content.sections[0]?.id || '');
  const category = getCategoryById(content.category);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = content.sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(content.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content.sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'important':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getCalloutVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <>
      <SEOHead
        title={`${content.title} | NeonO Knowledge Base`}
        description={content.description}
        path={`/resources/${content.slug}`}
        type="article"
        publishedTime={content.publishedAt}
        modifiedTime={content.lastUpdated}
        author={content.author}
        keywords={content.tags.join(', ')}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/resources">Resources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/resources?category=${content.category}`}>
                      {category?.name || content.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {content.categoryPath.length > 1 && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{content.categoryPath[1]}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{content.estimatedReadTime}</span>
              </div>
              {content.difficulty && (
                <Badge variant="secondary">{content.difficulty}</Badge>
              )}
              <span>Last updated: {new Date(content.lastUpdated || content.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar - Jump Links */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <h3 className="font-semibold mb-4">On this page</h3>
                <nav className="space-y-1">
                  {content.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                  {content.faqs && content.faqs.length > 0 && (
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      FAQs
                    </button>
                  )}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="max-w-3xl">
              {/* Description */}
              <div className="prose prose-lg dark:prose-invert mb-8">
                <p className="text-xl text-muted-foreground">{content.description}</p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {content.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <h2 className="text-3xl font-bold mb-6">{section.title}</h2>

                    {/* Screenshot */}
                    {section.screenshot && (
                      <Card className="mb-6 overflow-hidden">
                        <img
                          src={section.screenshot.src}
                          alt={section.screenshot.alt}
                          className="w-full h-auto"
                        />
                        {section.screenshot.caption && (
                          <CardContent className="pt-3">
                            <p className="text-sm text-muted-foreground text-center">
                              {section.screenshot.caption}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    )}

                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {section.content}
                      </ReactMarkdown>
                    </div>

                    {/* Callouts */}
                    {section.callouts && section.callouts.length > 0 && (
                      <div className="space-y-4">
                        {section.callouts.map((callout, idx) => (
                          <Alert key={idx} variant={getCalloutVariant(callout.type)}>
                            <div className="flex gap-3">
                              {getCalloutIcon(callout.type)}
                              <AlertDescription className="flex-1">
                                <strong className="capitalize">{callout.type}:</strong> {callout.content}
                              </AlertDescription>
                            </div>
                          </Alert>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* FAQs */}
              {content.faqs && content.faqs.length > 0 && (
                <section id="faqs" className="mt-16 scroll-mt-20">
                  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {content.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose dark:prose-invert">
                            <ReactMarkdown>{faq.answer}</ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              {/* Related Articles */}
              {content.relatedArticles && content.relatedArticles.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid gap-4">
                    {content.relatedArticles.map((articleId) => (
                      <Card key={articleId} className="hover:border-primary transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <Link to={`/resources/${articleId}`} className="hover:text-primary">
                              Related Article Title
                            </Link>
                            <ChevronRight className="h-5 w-5" />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Help Footer */}
              <Card className="mt-16 bg-muted/50">
                <CardHeader>
                  <CardTitle>Still need help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Button asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
