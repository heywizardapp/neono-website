import { useState } from 'react';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Users, CheckCircle, Clock, Video, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';
import { useToast } from '@/hooks/use-toast';

const demoFeatures = [
  {
    title: 'Complete Platform Tour',
    description: 'See all features in action: appointments, POS, marketing, analytics, and more.',
    duration: '30 minutes'
  },
  {
    title: 'Customized to Your Business',
    description: 'We\'ll tailor the demo to your specific industry and business needs.',
    duration: 'Personalized'
  },
  {
    title: 'ROI Calculation',
    description: 'Calculate potential savings and revenue increase for your business.',
    duration: '5 minutes'
  },
  {
    title: 'Q&A Session',
    description: 'Get all your questions answered by our beauty industry experts.',
    duration: '15 minutes'
  }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export default function Demo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'salon',
    teamSize: '1-5',
    currentSoftware: '',
    preferredDate: '',
    preferredTime: '',
    goals: '',
    hearAboutUs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Demo scheduled successfully!",
      description: "We'll send you a calendar invite within 15 minutes.",
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: 'salon',
      teamSize: '1-5',
      currentSoftware: '',
      preferredDate: '',
      preferredTime: '',
      goals: '',
      hearAboutUs: ''
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEOHead
        title="Book a Demo - See NeonO in Action | Beauty Business Software"
        description="Schedule a personalized demo of NeonO's beauty business software. See how our platform can streamline your salon, spa, or barbershop operations."
        path="/demo"
        keywords="neono demo, beauty software demo, salon software demo, schedule demo"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Breadcrumbs 
            customCrumbs={[
              { label: "Home", href: "/" },
              { label: "Book a Demo", href: "/demo" }
            ]} 
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Video className="w-4 h-4 mr-2" />
                Live Demo
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                See NeonO in action
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Book a personalized demo with our beauty industry experts and discover how NeonO can transform your business operations.
              </p>
            </div>
          </OptimizedInView>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Demo Form */}
            <ScrollReveal>
              <Card className="p-6 lg:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-display">Schedule Your Demo</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll schedule a personalized demo at your convenience.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="john@salon.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-medium">
                      Business Name *
                    </label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      required
                      placeholder="Your Salon/Spa Name"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="businessType" className="text-sm font-medium">
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="salon">Hair Salon</option>
                        <option value="barbershop">Barbershop</option>
                        <option value="spa">Spa & Wellness</option>
                        <option value="aesthetics">Medical Aesthetics</option>
                        <option value="nails">Nail Salon</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="teamSize" className="text-sm font-medium">
                        Team Size *
                      </label>
                      <select
                        id="teamSize"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="1-5">1-5 employees</option>
                        <option value="6-15">6-15 employees</option>
                        <option value="16-30">16-30 employees</option>
                        <option value="31+">31+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="currentSoftware" className="text-sm font-medium">
                      Current Software (if any)
                    </label>
                    <Input
                      id="currentSoftware"
                      value={formData.currentSoftware}
                      onChange={(e) => handleInputChange('currentSoftware', e.target.value)}
                      placeholder="e.g., Fresha, Booksy, Square, etc."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="preferredDate" className="text-sm font-medium">
                        Preferred Date
                      </label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="preferredTime" className="text-sm font-medium">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium">
                      What are your main goals? (Optional)
                    </label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      rows={3}
                      placeholder="e.g., Increase bookings, reduce no-shows, streamline operations..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full btn-hero-primary"
                  >
                    {isSubmitting ? (
                      'Scheduling Demo...'
                    ) : (
                      <>
                        Schedule My Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </ScrollReveal>

            {/* Demo Information */}
            <div className="space-y-8">
              
              {/* What to Expect */}
              <ScrollReveal>
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      What to Expect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    {demoFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{feature.description}</p>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <Clock className="h-3 w-3" />
                            {feature.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Demo Stats */}
              <ScrollReveal>
                <Card className="p-6 bg-gradient-subtle border-0">
                  <CardContent className="px-0">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">92%</div>
                        <div className="text-sm text-muted-foreground">Choose NeonO after demo</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">45min</div>
                        <div className="text-sm text-muted-foreground">Average demo length</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
                        <div className="text-sm text-muted-foreground">Average setup time after demo</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Alternative Options */}
              <ScrollReveal>
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Prefer a Different Format?</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/contact">
                          <Phone className="mr-2 h-4 w-4" />
                          Call to Schedule: (555) 123-4567
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/signup">
                          <Users className="mr-2 h-4 w-4" />
                          Start Free Trial Instead
                        </Link>
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Not ready for a demo? <Link to="/products" className="text-primary hover:underline">Explore our features</Link> or <Link to="/case-studies" className="text-primary hover:underline">read success stories</Link> first.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}