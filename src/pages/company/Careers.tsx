import { useState } from 'react';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Clock, DollarSign, Users, Heart, Zap, Globe, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision coverage. Mental health support and wellness stipends.',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'Growth & Learning',
    description: '$2,000 annual learning budget, conference attendance, and mentorship programs.',
    color: 'text-accent'
  },
  {
    icon: Globe,
    title: 'Work-Life Balance',
    description: 'Flexible remote work, unlimited PTO policy, and quarterly company retreats.',
    color: 'text-mint'
  },
  {
    icon: DollarSign,
    title: 'Competitive Package',
    description: 'Market-leading salaries, equity participation, and performance bonuses.',
    color: 'text-lavender'
  }
];

const openings = [
  {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$140k - $180k',
    experience: '5+ years',
    description: 'Build scalable web applications using React, Node.js, and modern cloud infrastructure.',
    requirements: [
      'Expert in React, TypeScript, and modern JavaScript',
      'Backend experience with Node.js, PostgreSQL, Redis',
      'Cloud experience (AWS, Docker, Kubernetes)',
      'Beauty/retail industry experience a plus'
    ],
    posted: '2 days ago'
  },
  {
    title: 'Product Manager - Payments',
    department: 'Product',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$130k - $160k',
    experience: '4+ years',
    description: 'Lead product strategy for our payments and POS platform serving thousands of businesses.',
    requirements: [
      'Product management experience in fintech/payments',
      'Understanding of payment processing, compliance',
      'Experience with B2B SaaS products',
      'Strong analytical and communication skills'
    ],
    posted: '1 week ago'
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote (North America)',
    type: 'Full-time',
    salary: '$80k - $110k',
    experience: '3+ years',
    description: 'Help beauty business owners maximize success with NeonO platform and drive retention.',
    requirements: [
      'SaaS customer success experience',
      'Beauty industry knowledge preferred',
      'Excellent communication and problem-solving skills',
      'Experience with customer onboarding and training'
    ],
    posted: '3 days ago'
  },
  {
    title: 'Senior Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    experience: '5+ years',
    description: 'Drive growth marketing initiatives and build our brand in the beauty industry.',
    requirements: [
      'B2B SaaS marketing experience',
      'Content marketing and demand generation',
      'Analytics and data-driven approach',
      'Beauty or retail industry experience a plus'
    ],
    posted: '5 days ago'
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $170k',
    experience: '4+ years',
    description: 'Scale our infrastructure and improve reliability for thousands of businesses worldwide.',
    requirements: [
      'AWS/GCP infrastructure experience',
      'Kubernetes, Docker, CI/CD pipelines',
      'Monitoring, logging, and observability',
      'Security and compliance best practices'
    ],
    posted: '1 week ago'
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$110k - $140k',
    experience: '4+ years',
    description: 'Design beautiful, intuitive experiences for beauty professionals worldwide.',
    requirements: [
      'Strong portfolio of B2B SaaS design work',
      'Figma, user research, and prototyping skills',
      'Understanding of accessibility and mobile design',
      'Experience with design systems'
    ],
    posted: '4 days ago'
  }
];

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Customer Success', 'Sales'];

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [filteredOpenings, setFilteredOpenings] = useState(openings);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterJobs(query, selectedDepartment);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    filterJobs(searchQuery, department);
  };

  const filterJobs = (query: string, department: string) => {
    let filtered = openings;

    if (department !== 'All') {
      filtered = filtered.filter(job => job.department === department);
    }

    if (query.trim()) {
      const normalizedQuery = query.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(normalizedQuery) ||
        job.department.toLowerCase().includes(normalizedQuery) ||
        job.description.toLowerCase().includes(normalizedQuery)
      );
    }

    setFilteredOpenings(filtered);
  };

  return (
    <>
      <SEOHead
        title="Careers at NeonO - Join Our Team of Beauty Tech Innovators"
        description="Join NeonO's mission to empower beauty businesses worldwide. Explore open positions in engineering, product, design, and more. Competitive benefits and remote-friendly culture."
        path="/company/careers"
        keywords="neono careers, beauty tech jobs, remote software jobs, startup careers"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Company", href: "/company" },
              { label: "Careers", href: "/company/careers" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">We're Hiring</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Build the future of beauty business technology
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join a passionate team that's transforming how beauty professionals run their businesses. 
                We're looking for talented individuals who want to make a real impact on thousands of entrepreneurs worldwide.
              </p>
            </div>
          </OptimizedInView>

          {/* Benefits */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Work at NeonO?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We believe great people deserve great benefits and an environment where they can do their best work.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-card mx-auto mb-4 ${benefit.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Open Positions */}
          <ScrollReveal>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Find your next opportunity to grow your career and make a meaningful impact.
                </p>
              </div>

              {/* Search and Filters */}
              <div className="mb-8">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative max-w-md mx-auto">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search positions..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                      aria-label="Search job openings"
                    />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {departments.map(department => (
                      <Button
                        key={department}
                        variant={selectedDepartment === department ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleDepartmentChange(department)}
                      >
                        {department}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredOpenings.map((job, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{job.department}</Badge>
                            <Badge variant="secondary">{job.type}</Badge>
                            <span className="text-sm text-muted-foreground">{job.posted}</span>
                          </div>
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base">{job.description}</CardDescription>
                        </div>
                        <Button asChild>
                          <Link to={`/company/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                          {job.requirements.length > 2 && (
                            <li className="text-primary font-medium">
                              +{job.requirements.length - 2} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredOpenings.length === 0 && (
                <Card className="p-8 text-center">
                  <h3 className="font-semibold mb-2">No positions found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or selecting a different department.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                    setFilteredOpenings(openings);
                  }}>
                    Clear filters
                  </Button>
                </Card>
              )}
            </div>
          </ScrollReveal>

          {/* Culture */}
          <ScrollReveal>
            <Card className="mb-20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 lg:p-12">
                  <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We're a diverse, remote-first team that values collaboration, innovation, and work-life balance. 
                    Our culture is built on trust, transparency, and a shared commitment to helping beauty businesses thrive.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Remote-first with quarterly in-person retreats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Transparent communication and flat hierarchy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Continuous learning and professional development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Diverse perspectives and inclusive environment</span>
                    </div>
                  </div>

                  <Button variant="outline" asChild>
                    <Link to="/company/about">
                      Learn About Our Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/src/assets/placeholders/team.webp" 
                    alt="NeonO team collaborating in modern office space"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Don't See a Fit? */}
          <ScrollReveal>
            <Card className="mb-20 text-center">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Don't see the perfect role?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for talented people who are passionate about our mission. 
                  Send us your resume and tell us how you'd like to contribute to NeonO's growth.
                </p>
                <Button asChild>
                  <Link to="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <Card className="bg-gradient-hero text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to make an impact?</h2>
                <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                  Join our team and help us build the future of beauty business technology. 
                  Together, we'll empower thousands of entrepreneurs to achieve their dreams.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="#open-positions" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('h2:has-text("Open Positions")')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    View Open Positions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}