import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, DollarSign, Clock, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

const caseStudies = [
  {
    id: 'bella-salon',
    title: 'Bella Hair Salon',
    location: 'Toronto, ON',
    industry: 'Hair Salon',
    employees: 8,
    image: '/src/assets/placeholders/hero-salon.webp',
    problem: 'Managing appointments across 8 stylists, no online booking, scattered customer data, manual inventory tracking',
    solution: 'Implemented NeonO\'s complete platform including online booking, POS system, marketing automation, and analytics',
    results: {
      revenueIncrease: 45,
      timesSaved: 15,
      customerRetention: 35,
      onlineBookings: 75
    },
    quote: "NeonO transformed our business. We went from chaos to complete organization, and our revenue increased by 45% in just 6 months.",
    author: "Maria Santos",
    role: "Owner",
    timeline: "6 months",
    featured: true
  },
  {
    id: 'zen-spa',
    title: 'Zen Day Spa',
    location: 'Vancouver, BC',
    industry: 'Spa',
    employees: 12,
    image: '/src/assets/placeholders/appointments.webp',
    problem: 'Low online presence, manual appointment booking, no customer retention strategy, inefficient staff scheduling',
    solution: 'Built custom website with online booking, implemented automated marketing campaigns, and streamlined operations',
    results: {
      revenueIncrease: 60,
      timesSaved: 20,
      customerRetention: 50,
      onlineBookings: 85
    },
    quote: "The automated marketing alone paid for NeonO in the first month. Our customer retention has never been higher.",
    author: "David Chen",
    role: "General Manager",
    timeline: "4 months"
  },
  {
    id: 'urban-barbershop',
    title: 'Urban Cuts Barbershop',
    location: 'Montreal, QC',
    industry: 'Barbershop',
    employees: 6,
    image: '/src/assets/placeholders/team.webp',
    problem: 'Cash-only business, no customer database, walk-in only appointments, limited marketing reach',
    solution: 'Modernized with digital payments, online booking system, customer loyalty program, and social media integration',
    results: {
      revenueIncrease: 38,
      timesSaved: 12,
      customerRetention: 40,
      onlineBookings: 65
    },
    quote: "NeonO helped us modernize without losing our neighborhood barbershop feel. Sales are up 38% and customers love the convenience.",
    author: "Antoine Dubois",
    role: "Owner",
    timeline: "5 months"
  },
  {
    id: 'glow-aesthetics',
    title: 'Glow Aesthetics Clinic',
    location: 'Calgary, AB',
    industry: 'Medical Aesthetics',
    employees: 15,
    image: '/src/assets/placeholders/marketing.webp',
    problem: 'Complex booking requirements, HIPAA compliance needs, high no-show rates, manual treatment tracking',
    solution: 'Deployed enterprise features including advanced scheduling, secure patient records, automated reminders, and treatment plans',
    results: {
      revenueIncrease: 52,
      timesSaved: 25,
      customerRetention: 45,
      onlineBookings: 80
    },
    quote: "NeonO's medical features are exactly what we needed. Patient management is seamless and our no-show rate dropped by 60%.",
    author: "Dr. Sarah Wilson",
    role: "Medical Director",
    timeline: "8 months"
  }
];

const metrics = [
  { label: 'Average Revenue Increase', value: '49%', icon: TrendingUp },
  { label: 'Hours Saved Per Week', value: '18hrs', icon: Clock },
  { label: 'Customer Retention Boost', value: '+42%', icon: Users },
  { label: 'ROI Within First Year', value: '312%', icon: DollarSign }
];

export default function CaseStudiesPage() {
  const featuredStudy = caseStudies.find(study => study.featured);
  const otherStudies = caseStudies.filter(study => !study.featured);

  return (
    <>
      <SEOHead
        title="Success Stories & Case Studies - Real Results with NeonO"
        description="See how beauty businesses increased revenue by 49% on average with NeonO. Real case studies with detailed metrics and results."
        path="/case-studies"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Success Stories</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Real Results from Real Businesses
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover how beauty businesses like yours transformed their operations and increased revenue with NeonO.
              </p>
            </div>
          </OptimizedInView>

          {/* Key Metrics */}
          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-primary">{metric.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Featured Case Study */}
          {featuredStudy && (
            <ScrollReveal>
              <Card className="mb-12 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={featuredStudy.image} 
                      alt={featuredStudy.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default">Featured</Badge>
                      <Badge variant="outline">{featuredStudy.industry}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{featuredStudy.title}</h2>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {featuredStudy.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {featuredStudy.employees} employees
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">+{featuredStudy.results.revenueIncrease}%</div>
                        <div className="text-sm text-muted-foreground">Revenue Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{featuredStudy.results.timesSaved}hrs</div>
                        <div className="text-sm text-muted-foreground">Time Saved/Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">+{featuredStudy.results.customerRetention}%</div>
                        <div className="text-sm text-muted-foreground">Customer Retention</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{featuredStudy.results.onlineBookings}%</div>
                        <div className="text-sm text-muted-foreground">Online Bookings</div>
                      </div>
                    </div>

                    <blockquote className="text-lg italic text-muted-foreground mb-4 border-l-4 border-primary pl-4">
                      "{featuredStudy.quote}"
                    </blockquote>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="text-sm">
                        <div className="font-semibold">{featuredStudy.author}</div>
                        <div className="text-muted-foreground">{featuredStudy.role}</div>
                      </div>
                    </div>

                    <Button asChild>
                      <Link to={`/case-studies/${featuredStudy.id}`}>
                        Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          )}

          {/* Other Case Studies Grid */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {otherStudies.map((study) => (
                <Card key={study.id} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{study.industry}</Badge>
                    </div>
                    <CardTitle className="text-lg">{study.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {study.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">+{study.results.revenueIncrease}%</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{study.results.timesSaved}hrs</div>
                        <div className="text-xs text-muted-foreground">Time Saved</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/case-studies/${study.id}`}>
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-hero text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to write your success story?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  Join hundreds of beauty businesses already growing with NeonO. Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <Link to="/roi">Calculate Your ROI</Link>
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
