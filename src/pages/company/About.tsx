import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Trophy, Heart, Zap, Globe, Target, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

const stats = [
  { label: 'Beauty Businesses Served', value: '2,500+', icon: Users },
  { label: 'Countries & Regions', value: '15+', icon: Globe },
  { label: 'Average Revenue Increase', value: '49%', icon: Trophy },
  { label: 'Customer Satisfaction', value: '98%', icon: Heart }
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

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former salon owner turned tech entrepreneur. 15 years in beauty industry operations.',
    image: '/src/assets/placeholders/team.webp'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Shopify engineer passionate about building tools that empower small businesses.',
    image: '/src/assets/placeholders/team.webp'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'VP of Product',
    bio: 'Former medical spa director with deep expertise in compliance and customer experience.',
    image: '/src/assets/placeholders/team.webp'
  },
  {
    name: 'Alex Thompson',
    role: 'VP of Engineering',
    bio: 'Previously at Stripe and Square, leading teams that built payment infrastructure.',
    image: '/src/assets/placeholders/team.webp'
  }
];

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Founded by salon owners frustrated with clunky, expensive software that didn\'t understand their business.'
  },
  {
    year: '2020',
    title: 'First 100 Customers',
    description: 'Launched MVP with local salons. Learned that simplicity and powerful features could coexist.'
  },
  {
    year: '2021',
    title: 'Series A Funding',
    description: 'Raised $12M to expand nationwide and build advanced AI features.'
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Launched in Canada, UK, and Australia. Added multi-language and currency support.'
  },
  {
    year: '2023',
    title: '1,000+ Businesses',
    description: 'Crossed 1,000 active businesses. Launched enterprise features for multi-location chains.'
  },
  {
    year: '2024',
    title: 'AI Revolution',
    description: 'Pioneered AI-powered insights and automation. Now serving 2,500+ beauty businesses worldwide.'
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
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
                <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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

          {/* Timeline */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  From a small team with a big vision to serving thousands of beauty businesses worldwide.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {event.year.slice(-2)}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-border mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{event.title}</h3>
                        <Badge variant="outline">{event.year}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Team */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  A diverse team of industry veterans, entrepreneurs, and technologists united by our mission.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                    <h2 className="text-3xl font-bold">Visit Our Office</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We're headquartered in the heart of San Francisco's SOMA district, with remote team 
                    members across North America and Europe. We believe great work happens when talented 
                    people collaborate, whether in person or virtually.
                  </p>
                  <div className="space-y-2 mb-8">
                    <p className="font-medium">NeonO Headquarters</p>
                    <p className="text-muted-foreground">
                      123 Beauty Tech Blvd<br />
                      Suite 400<br />
                      San Francisco, CA 94107
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
                <h2 className="text-2xl font-bold mb-4">Ready to join thousands of growing businesses?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  Experience the NeonO difference. Start your free trial today and see why beauty businesses 
                  choose us to power their growth.
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