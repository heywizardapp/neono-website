import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Trophy, Heart, Zap, Globe, Target, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

const stats = [
  { label: 'Launch Date', value: 'April 2026', icon: Users },
  { label: 'Anchor Partner', value: 'Metro Beauty Supply', icon: Globe },
  { label: 'Built For', value: 'Canadian Salons', icon: Trophy },
  { label: 'All-in-One Platform', value: '10+ Modules', icon: Heart }
];

const values = [
  {
    icon: Target,
    title: 'Customer First',
    description: 'Every decision we make starts with: "How does this help our customers succeed?"',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We constantly evolve our platform with cutting-edge technology and industry insights.',
    color: 'text-accent'
  },
  {
    icon: Heart,
    title: 'Empowerment',
    description: 'We believe small businesses are the backbone of communities and deserve powerful tools.',
    color: 'text-mint'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Great products come from diverse teams working together with shared purpose.',
    color: 'text-lavender'
  }
];


export default function About() {
  return (
    <>
      <SEOHead
        title="About NeonO - Empowering Beauty Businesses Worldwide"
        description="Learn about NeonO's mission to empower beauty businesses with modern, intuitive software. Meet our team and discover our journey from salon owners to industry leaders."
        path="/company/about"
        keywords="about neono, beauty software company, salon management team, beauty business tools"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Company", href: "/company" },
              { label: "About", href: "/company/about" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Story</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Built by salon owners,<br />for beauty businesses
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We started NeonO because we lived the daily struggles of running a beauty business. 
                Complicated software, hidden fees, and tools that didn't understand our industry. 
                So we built something better.
              </p>
            </div>
          </OptimizedInView>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Mission */}
          <ScrollReveal>
            <Card className="mb-20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 lg:p-12">
                  <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-display mb-6">
                    To democratize access to powerful business tools for beauty professionals worldwide. 
                    Every salon, barbershop, spa, and aesthetic clinic deserves software that's as beautiful 
                    and intuitive as the services they provide.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We believe technology should amplify human creativity, not complicate it. That's why we've 
                    built NeonO to be powerful enough for enterprise chains, yet simple enough for solo practitioners.
                  </p>
                  <Button asChild>
                    <Link to="/careers">
                      Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/src/assets/placeholders/hero-salon.webp" 
                    alt="Modern salon interior showcasing beautiful design"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Values */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Our Values</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-display">
                  The principles that guide everything we do, from product decisions to customer relationships.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <CardHeader className="px-0 pt-0">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card mb-4 ${value.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-0">
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Our Story */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Our Story</h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <Card className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed font-display">
                    NeonO was built by people who understand the beauty industry. We saw salon owners
                    juggling 5+ tools, losing money on unbilled colour, and fighting with software that
                    wasn't built for them. So we built the platform we wished existed — one that includes
                    everything, charges honestly, and puts Canadian salons first.
                  </p>
                </Card>
              </div>
            </div>
          </ScrollReveal>

          {/* Team */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Our Team</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-display">
                  Founded by salon industry professionals who lived the problems we're solving.
                </p>
              </div>

              <Card className="text-center p-8">
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  NeonO is backed by Metro Beauty Supply, Canada's leading professional beauty distributor.
                  Our team combines deep beauty industry experience with modern software engineering to build
                  the platform Canadian salons deserve.
                </p>
              </Card>
            </div>
          </ScrollReveal>

          {/* Office */}
          <ScrollReveal>
            <Card className="mb-20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="/src/assets/placeholders/marketing.webp" 
                    alt="NeonO office space with modern design"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="text-3xl font-display font-bold">Visit Our Office</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We're based in Toronto, Canada, with team members across the country.
                    We believe great work happens when talented people collaborate, whether
                    in person or virtually.
                  </p>
                  <div className="space-y-2 mb-8">
                    <p className="font-medium">NeonO Headquarters</p>
                    <p className="text-muted-foreground">
                      Toronto, Ontario, Canada
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-hero text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-display font-bold mb-4">Ready to see NeonO in action?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  Experience the NeonO difference. Book a demo today and see why we built the all-in-one
                  platform Canadian salons have been waiting for.
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