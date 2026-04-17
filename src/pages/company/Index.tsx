import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Building, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

const companyPages = [
  {
    icon: Building,
    title: 'About NeonO',
    description: 'Learn about our mission, values, and the team behind the platform empowering beauty businesses worldwide.',
    href: '/company/about',
    color: 'text-primary'
  },
  {
    icon: Briefcase,
    title: 'Careers',
    description: 'Join our team of passionate individuals building the future of beauty business technology.',
    href: '/company/careers',
    color: 'text-accent'
  },
  {
    icon: Users,
    title: 'Press & Media',
    description: 'Media resources, press releases, and company news. Get in touch with our press team.',
    href: '/company/press',
    color: 'text-mint'
  },
  {
    icon: Mail,
    title: 'Contact Us',
    description: 'Get support, ask questions, or schedule a demo with our expert team.',
    href: '/contact',
    color: 'text-lavender'
  }
];

const quickStats = [
  { label: 'Launch Date', value: 'April 2026' },
  { label: 'Anchor Partner', value: 'Metro Beauty Supply' },
  { label: 'Built For', value: 'Canadian Salons' },
  { label: 'Platform', value: 'All-in-One' }
];

export default function CompanyIndex() {
  return (
    <>
      <SEOHead
        title="Company - About NeonO, Careers, and Press"
        description="Learn about NeonO's mission to empower beauty businesses, explore career opportunities, and access press resources."
        path="/company"
        keywords="neono company, about neono, beauty tech company, careers"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Company", href: "/company" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Company</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                Empowering beauty businesses worldwide
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built by salon industry professionals for Canadian beauty businesses.
                Discover NeonO's story, meet our team, and explore opportunities to join our mission.
              </p>
            </div>
          </OptimizedInView>

          {/* Quick Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {quickStats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* Company Pages Grid */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {companyPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card mb-4 ${page.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {page.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {page.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Button variant="ghost" className="w-full group/btn" asChild>
                        <Link to={page.href}>
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal>
            <Card className="mb-16 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 lg:p-12">
                  <h2 className="text-3xl font-serif font-bold mb-6">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Whether you're interested in learning more about NeonO, exploring partnership opportunities, 
                    or joining our team, we'd love to hear from you.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Headquarters</div>
                        <div className="text-sm text-muted-foreground">Toronto, Ontario, Canada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">General Inquiries</div>
                        <div className="text-sm text-muted-foreground">hello@neono.ca</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Support</div>
                        <div className="text-sm text-muted-foreground">support@neono.ca</div>
                      </div>
                    </div>
                  </div>

                  <Button asChild>
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/src/assets/placeholders/marketing.webp" 
                    alt="NeonO team working together"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-hero text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Ready to transform your business?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  See why NeonO is the all-in-one platform Canadian beauty businesses have been waiting for.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <Link to="/demo">Book a Demo</Link>
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