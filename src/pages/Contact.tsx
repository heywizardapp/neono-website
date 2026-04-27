import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEO/SEOHead';
import { OptimizedInView } from '@/components/advanced/PerformanceOptimizedAnimations';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validation/schemas';
import { handleError } from '@/lib/errors/handlers';
import { supabase } from '@/lib/supabase';
import {
  Mail,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  HeadphonesIcon,
  Loader2
} from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      topic: 'General Inquiry',
      message: ''
    }
  });

  const contactMethods = [
    {
      icon: Mail,
      title: t('contact.emailSupport'),
      description: t('contact.emailSupportDesc'),
      action: 'support@neono.ca',
      available: t('contact.emailSupportAvail'),
      color: 'bg-purple-500'
    },
    {
      icon: Mail,
      title: t('contact.liveChat'),
      description: t('contact.liveChatDesc'),
      action: 'hello@neono.ca',
      available: t('contact.liveChatAvail'),
      color: 'bg-green-500'
    }
  ];

  const supportTopics = [
    t('contact.topicGeneral'),
    t('contact.topicTechnical'),
    t('contact.topicBilling'),
    t('contact.topicPartnership'),
    t('contact.topicPress'),
    t('contact.topicOther')
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          company: data.company || null,
          topic: data.topic,
          message: data.message,
        }]);

      if (error) throw error;

      toast({
        title: t('contact.successTitle'),
        description: t('contact.successDesc'),
      });

      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('contact.errorTitle'),
        description: t('contact.errorDesc'),
        variant: "destructive",
      });
      handleError(error);
    }
  };

  return (
    <>
      <SEOHead
        title={t('contact.seoTitle')}
        description={t('contact.seoDesc')}
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
                  {t('contact.badge')}
                </Badge>
                <h1 className="text-3xl font-display font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                  {t('contact.title')}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('contact.subtitle')}
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
                  <OptimizedInView key={index} animation="fade">
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
                    <CardTitle className="text-2xl font-display">{t('contact.sendMessage')}</CardTitle>
                    <CardDescription>
                      {t('contact.sendMessageDesc')}
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          {t('contact.fullName')}
                        </label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder={t('contact.namePlaceholder')}
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          {t('contact.emailLabel')}
                        </label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder={t('contact.emailPlaceholder')}
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        {t('contact.businessName')}
                      </label>
                      <Input
                        id="company"
                        {...register('company')}
                        placeholder={t('contact.businessPlaceholder')}
                        aria-invalid={errors.company ? 'true' : 'false'}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                      />
                      {errors.company && (
                        <p id="company-error" role="alert" className="text-sm text-destructive">{errors.company.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="topic" className="text-sm font-medium">
                        {t('contact.topic')}
                      </label>
                      <select
                        id="topic"
                        {...register('topic')}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-invalid={errors.topic ? 'true' : 'false'}
                        aria-describedby={errors.topic ? 'topic-error' : undefined}
                      >
                        {supportTopics.map((topic, index) => (
                          <option key={index} value={topic}>{topic}</option>
                        ))}
                      </select>
                      {errors.topic && (
                        <p id="topic-error" role="alert" className="text-sm text-destructive">{errors.topic.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        {t('contact.messageLabel')}
                      </label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        placeholder={t('contact.messagePlaceholder')}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" role="alert" className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full btn-hero-primary"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.sendButton')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div role="status" aria-live="polite" className="sr-only">
                      {isSubmitting && t('contact.sending')}
                      {isSubmitSuccessful && t('contact.successTitle')}
                    </div>
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
                        {t('contact.visitOffice')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      <div className="space-y-2">
                        <p className="font-medium">{t('contact.headquarters')}</p>
                        <p className="text-muted-foreground">
                          Toronto, Ontario, Canada
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {t('contact.officeHours')}
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
                        {t('contact.popularResources')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="space-y-3">
                        <a href="/pricing" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">{t('contact.viewPricing')}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a href="/roi" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">{t('contact.roiCalculator')}</span>
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
                      <CardTitle>{t('contact.quickAnswers')}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">{t('contact.qa1q')}</h4>
                        <p className="text-sm text-muted-foreground">{t('contact.qa1a')}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">{t('contact.qa2q')}</h4>
                        <p className="text-sm text-muted-foreground">{t('contact.qa2a')}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">{t('contact.qa3q')}</h4>
                        <p className="text-sm text-muted-foreground">{t('contact.qa3a')}</p>
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
