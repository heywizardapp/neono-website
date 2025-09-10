import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Mail } from 'lucide-react';
import { useConsent } from '@/hooks/useConsent';

interface NewsletterFormProps {
  variant?: 'inline' | 'footer';
  className?: string;
}

export function NewsletterForm({ variant = 'inline', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { canUseAnalytics } = useConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !consent) return;

    setIsLoading(true);
    
    // Track newsletter signup
    if (canUseAnalytics) {
      console.log('Newsletter signup:', { industry, hasConsent: consent });
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Reset form after success message
      setTimeout(() => {
        setEmail('');
        setIndustry('');
        setConsent(false);
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={isFooter ? 'flex gap-2' : 'space-y-4'}>
          <div className={isFooter ? 'flex-1' : ''}>
            <Label htmlFor="newsletter-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-describedby="email-hint"
            />
            <span id="email-hint" className="sr-only">
              Enter your email address to subscribe to our newsletter
            </span>
          </div>

          {!isFooter && (
            <div>
              <Label htmlFor="newsletter-industry">Industry (optional)</Label>
              <Select value={industry} onValueChange={setIndustry}>
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
            </div>
          )}

          {isFooter && (
            <Button type="submit" disabled={!email || !consent || isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="newsletter-consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(!!checked)}
            required
            aria-describedby="consent-description"
          />
          <Label
            htmlFor="newsletter-consent"
            className="text-sm leading-relaxed cursor-pointer"
          >
            I agree to receive marketing emails from NeonO. You can unsubscribe at any time.
          </Label>
        </div>
        <span id="consent-description" className="sr-only">
          Required consent checkbox for newsletter subscription
        </span>

        {!isFooter && (
          <Button
            type="submit"
            className="w-full"
            disabled={!email || !consent || isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
        )}
      </form>
    </Card>
  );
}