import * as React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { blogStorage } from '@/lib/blog/storage';
import { useToast } from '@/hooks/use-toast';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000; // 1 minute lockout after max attempts

export default function BlogLogin() {
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [attempts, setAttempts] = React.useState(0);
  const [lockedUntil, setLockedUntil] = React.useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLocked = Date.now() < lockedUntil;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      const secondsLeft = Math.ceil((lockedUntil - Date.now()) / 1000);
      toast({
        variant: 'destructive',
        title: 'Too many attempts',
        description: `Please wait ${secondsLeft} seconds before trying again.`
      });
      return;
    }
    setLoading(true);

    // Intentional delay to slow brute-force attempts
    const delay = Math.min(500 * Math.pow(2, attempts), 8000);
    setTimeout(() => {
      if (blogStorage.authenticate(password)) {
        setAttempts(0);
        toast({
          title: 'Login Successful',
          description: 'Welcome to the blog admin panel.'
        });
        navigate('/admin/blog');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= MAX_ATTEMPTS) {
          setLockedUntil(Date.now() + LOCKOUT_MS);
          toast({
            variant: 'destructive',
            title: 'Account Locked',
            description: 'Too many failed attempts. Please wait 1 minute.'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: `Invalid password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`
          });
        }
      }
      setLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold">NeonO</Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Blog Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the blog management panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Contact your administrator for access credentials.
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link to="/">Back to Website</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
