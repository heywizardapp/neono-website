import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEO/SEOHead';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';
import { EnhancedButton } from '@/components/advanced/EnhancedInteractiveElements';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Users, 
  Calendar,
  ArrowRight,
  CheckCircle,
  HeadphonesIcon
} from 'lucide-react';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    action: 'Start Chat',
    available: '24/7 Support',
    color: 'bg-green-500'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    action: '+1 (555) 123-4567',
    available: 'Mon-Fri 9AM-6PM EST',
    color: 'bg-blue-500'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us detailed questions',
    action: 'support@neono.com',
    available: 'Response within 4 hours',
    color: 'bg-purple-500'
  }
];

const supportTopics = [
  'General Inquiry',
  'Product Demo',
  'Technical Support',
  'Billing & Pricing', 
  'Partnership Opportunities',
  'Press & Media',
  'Other'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      company: '',
      topic: 'General Inquiry',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Get Support & Book a Demo | NeonO"
        description="Contact NeonO's expert team for support, demos, and questions about our beauty business software. 24/7 chat, phone support, and fast email response."
        path="/contact"
      />

      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <OptimizedInView animation="fade">
              <div className="text-center max-w-3xl mx-auto">
                <Badge variant="secondary" className="mb-4">
                  <HeadphonesIcon className="w-4 h-4 mr-2" />
                  Contact Support
                </Badge>
                <h1 className="text-3xl font-display font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                  We're Here to Help
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get expert support, book a demo, or ask questions about how NeonO can transform your beauty business.
                </p>
              </div>
            </OptimizedInView>
          </div>
        </section>

        {/* Quick Contact Methods */}
        <section className="py-8">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <OptimizedInView key={method.title} animation="fade">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${method.color} text-white mb-4 mx-auto`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{method.title}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center space-y-2">
                        <p className="font-medium text-primary">{method.action}</p>
                        <p className="text-sm text-muted-foreground">{method.available}</p>
                      </CardContent>
                    </Card>
                  </OptimizedInView>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 max-w-7xl mx-auto">
              
              {/* Contact Form */}
              <OptimizedInView animation="slide">
                <Card className="p-6 lg:p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-display">Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>
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
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Business Name
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Salon/Spa Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="topic" className="text-sm font-medium">
                        Topic *
                      </label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        {supportTopics.map(topic => (
                          <option key={topic} value={topic}>{topic}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full btn-hero-primary"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </OptimizedInView>

              {/* Contact Info & FAQ */}
              <div className="space-y-8">
                
                {/* Office Information */}
                <OptimizedInView animation="slide">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Visit Our Office
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      <div className="space-y-2">
                        <p className="font-medium">NeonO Headquarters</p>
                        <p className="text-muted-foreground">
                          123 Beauty Tech Blvd<br />
                          Suite 400<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Monday - Friday: 9:00 AM - 6:00 PM PST
                      </div>
                    </CardContent>
                  </Card>
                </OptimizedInView>

                {/* Quick Links */}
                <OptimizedInView animation="slide">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Popular Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="space-y-3">
                        <a href="/demo" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">Book a Demo</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <a href="/pricing" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">View Pricing</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <a href="/roi" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">ROI Calculator</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </OptimizedInView>

                {/* FAQ Quick Answers */}
                <OptimizedInView animation="slide">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle>Quick Answers</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">How quickly can I get started?</h4>
                        <p className="text-sm text-muted-foreground">Most salons are up and running within 24 hours. We provide free setup assistance and data migration.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Do you offer training?</h4>
                        <p className="text-sm text-muted-foreground">Yes! We provide comprehensive onboarding, live training sessions, and ongoing support for your team.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">What about data migration?</h4>
                        <p className="text-sm text-muted-foreground">We handle data migration from most salon software platforms at no additional cost.</p>
                      </div>
                    </CardContent>
                  </Card>
                </OptimizedInView>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}