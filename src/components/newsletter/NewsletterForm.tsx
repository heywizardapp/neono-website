import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Mail } from 'lucide-react';
import { useConsent } from '@/hooks/useConsent';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema, type NewsletterFormData } from '@/lib/validation/schemas';
import { handleError } from '@/lib/errors/handlers';

interface NewsletterFormProps {
  variant?: 'inline' | 'footer';
  className?: string;
}

export function NewsletterForm({ variant = 'inline', className = '' }: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { canUseAnalytics } = useConsent();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: '',
      industry: undefined,
      consent: false
    }
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Track newsletter signup
      // Analytics tracking moved to production service

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      
      // Reset form after success message
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      handleError(error);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`p-6 text-center ${className}`}>
        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
        <h3 className="font-semibold mb-2">Thanks for subscribing!</h3>
        <p className="text-sm text-muted-foreground">
          You'll receive industry insights and product updates.
        </p>
      </Card>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Stay Updated</h3>
          <p className="text-sm text-muted-foreground">
            Get industry insights and product updates
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className={isFooter ? 'flex gap-2' : 'space-y-4'}>
          <div className={isFooter ? 'flex-1' : ''}>
            <Label htmlFor="newsletter-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              aria-describedby="email-hint"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
            <span id="email-hint" className="sr-only">
              Enter your email address to subscribe to our newsletter
            </span>
          </div>

          {!isFooter && (
            <div>
              <Label htmlFor="newsletter-industry">Industry (optional)</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="newsletter-industry">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Hair Salon</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                      <SelectItem value="spa">Spa & Wellness</SelectItem>
                      <SelectItem value="nails">Nail Salon</SelectItem>
                      <SelectItem value="aesthetics">Aesthetics & Med Spa</SelectItem>
                      <SelectItem value="massage">Massage Therapy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>
              )}
            </div>
          )}

          {isFooter && (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="newsletter-consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-describedby="consent-description"
              />
            )}
          />
          <Label
            htmlFor="newsletter-consent"
            className="text-sm leading-relaxed cursor-pointer"
          >
            I agree to receive marketing emails from NeonO. You can unsubscribe at any time.
          </Label>
        </div>
        {errors.consent && (
          <p className="text-sm text-destructive">{errors.consent.message}</p>
        )}
        <span id="consent-description" className="sr-only">
          Required consent checkbox for newsletter subscription
        </span>

        {!isFooter && (
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
        )}
      </form>
    </Card>
  );
}