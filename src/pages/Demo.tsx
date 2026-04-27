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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demoFormSchema, type DemoFormData } from '@/lib/validation/schemas';
import { handleError } from '@/lib/errors/handlers';
import { supabase } from '@/lib/supabase';
import { useI18n } from '@/hooks/useI18n';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export default function Demo() {
  const { toast } = useToast();
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
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
    }
  });

  const demoFeatures = [
    {
      title: t('demoPage.platformTour'),
      description: t('demoPage.platformTourDesc'),
      duration: t('demoPage.duration30min')
    },
    {
      title: t('demoPage.customized'),
      description: t('demoPage.customizedDesc'),
      duration: t('demoPage.durationPersonalized')
    },
    {
      title: t('demoPage.roiCalc'),
      description: t('demoPage.roiCalcDesc'),
      duration: t('demoPage.duration5min')
    },
    {
      title: t('demoPage.qaSession'),
      description: t('demoPage.qaSessionDesc'),
      duration: t('demoPage.duration15min')
    }
  ];

  const onSubmit = async (data: DemoFormData) => {
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('demo_requests')
        .insert([{
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone || null,
          business_type: data.businessType,
          team_size: data.teamSize,
          preferred_date: data.preferredDate || null,
          preferred_time: data.preferredTime || null,
          goals: data.goals || null,
          hear_about_us: data.hearAboutUs || null,
        }]);

      if (error) throw error;

      toast({
        title: t('demoPage.successTitle'),
        description: t('demoPage.successDesc'),
      });

      reset();
    } catch (error) {
      console.error('Demo request error:', error);
      toast({
        title: t('demoPage.errorTitle'),
        description: t('demoPage.errorDesc'),
        variant: "destructive",
      });
      handleError(error);
    }
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
              { label: t('common.home'), href: "/" },
              { label: t('demoPage.breadcrumbDemo'), href: "/demo" }
            ]}
          />

          {/* Hero Section */}
          <OptimizedInView animation="fade">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Video className="w-4 h-4 mr-2" />
                {t('demoPage.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                {t('demoPage.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('demoPage.subtitle')}
              </p>
            </div>
          </OptimizedInView>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Demo Form */}
            <ScrollReveal>
              <Card className="p-6 lg:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-display">{t('demoPage.scheduleTitle')}</CardTitle>
                  <CardDescription>
                    {t('demoPage.scheduleDesc')}
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        {t('demoPage.firstName')}
                      </label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        placeholder={t('demoPage.firstNamePlaceholder')}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        {t('demoPage.lastName')}
                      </label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        placeholder={t('demoPage.lastNamePlaceholder')}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t('demoPage.email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder={t('demoPage.emailPlaceholder')}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {t('demoPage.phone')}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder={t('demoPage.phonePlaceholder')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-medium">
                      {t('demoPage.businessName')}
                    </label>
                    <Input
                      id="businessName"
                      {...register('businessName')}
                      placeholder={t('demoPage.businessNamePlaceholder')}
                    />
                    {errors.businessName && (
                      <p className="text-sm text-destructive">{errors.businessName.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="businessType" className="text-sm font-medium">
                        {t('demoPage.businessType')}
                      </label>
                      <select
                        id="businessType"
                        {...register('businessType')}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="salon">{t('demoPage.salon')}</option>
                        <option value="barbershop">{t('demoPage.barbershop')}</option>
                        <option value="spa">{t('demoPage.spaWellness')}</option>
                        <option value="aesthetics">{t('demoPage.medicalAesthetics')}</option>
                        <option value="nails">{t('demoPage.nailSalon')}</option>
                        <option value="other">{t('demoPage.other')}</option>
                      </select>
                      {errors.businessType && (
                        <p className="text-sm text-destructive">{errors.businessType.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="teamSize" className="text-sm font-medium">
                        {t('demoPage.teamSize')}
                      </label>
                      <select
                        id="teamSize"
                        {...register('teamSize')}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="1-5">{t('demoPage.employees15')}</option>
                        <option value="6-15">{t('demoPage.employees615')}</option>
                        <option value="16-30">{t('demoPage.employees1630')}</option>
                        <option value="31+">{t('demoPage.employees31')}</option>
                      </select>
                      {errors.teamSize && (
                        <p className="text-sm text-destructive">{errors.teamSize.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="currentSoftware" className="text-sm font-medium">
                      {t('demoPage.currentSoftware')}
                    </label>
                    <Input
                      id="currentSoftware"
                      {...register('currentSoftware')}
                      placeholder={t('demoPage.currentSoftwarePlaceholder')}
                    />
                    {errors.currentSoftware && (
                      <p className="text-sm text-destructive">{errors.currentSoftware.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="preferredDate" className="text-sm font-medium">
                        {t('demoPage.preferredDate')}
                      </label>
                      <Input
                        id="preferredDate"
                        type="date"
                        {...register('preferredDate')}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.preferredDate && (
                        <p className="text-sm text-destructive">{errors.preferredDate.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="preferredTime" className="text-sm font-medium">
                        {t('demoPage.preferredTime')}
                      </label>
                      <select
                        id="preferredTime"
                        {...register('preferredTime')}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">{t('demoPage.selectTime')}</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-sm text-destructive">{errors.preferredTime.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium">
                      {t('demoPage.goals')}
                    </label>
                    <Textarea
                      id="goals"
                      {...register('goals')}
                      rows={3}
                      placeholder={t('demoPage.goalsPlaceholder')}
                    />
                    {errors.goals && (
                      <p className="text-sm text-destructive">{errors.goals.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full btn-hero-primary"
                  >
                    {isSubmitting ? (
                      t('demoPage.scheduling')
                    ) : (
                      <>
                        {t('demoPage.scheduleMyDemo')}
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
                      {t('demoPage.whatToExpect')}
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
                        <div className="text-sm text-muted-foreground">{t('demoPage.chooseAfterDemo')}</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">45min</div>
                        <div className="text-sm text-muted-foreground">{t('demoPage.avgDemoLength')}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
                        <div className="text-sm text-muted-foreground">{t('demoPage.avgSetupTime')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Alternative Options */}
              <ScrollReveal>
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{t('demoPage.preferDifferent')}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/contact">
                          <Phone className="mr-2 h-4 w-4" />
                          {t('demoPage.callToSchedule')}
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/signup">
                          <Users className="mr-2 h-4 w-4" />
                          {t('demoPage.startTrialInstead')}
                        </Link>
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {t('demoPage.notReady')} <Link to="/products" className="text-primary hover:underline">{t('demoPage.exploreFeatures')}</Link> or <Link to="/case-studies" className="text-primary hover:underline">{t('demoPage.readSuccessStories')}</Link> {t('demoPage.first')}
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
