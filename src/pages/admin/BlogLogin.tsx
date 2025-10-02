import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { blogStorage } from '@/lib/blog/storage';
import { useToast } from '@/hooks/use-toast';

export default function BlogLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (blogStorage.authenticate(password)) {
        toast({
          title: 'Login Successful',
          description: 'Welcome to the blog admin panel.'
        });
        navigate('/admin/blog');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid password. Please try again.'
        });
      }
      setLoading(false);
    }, 500);
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
                Demo password: <code className="bg-muted px-2 py-1 rounded">neono2024</code>
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
