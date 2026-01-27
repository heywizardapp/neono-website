import * as React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/dashboard'); // Or wherever you want logged-in users to go
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[hsl(215,85%,8%)] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your NeonO account
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase as any}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(240,89%,73%)',
                  brandAccent: 'hsl(165,82%,49%)',
                },
              },
            },
          }}
          providers={['google']}
          view="sign_in"
        />
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-[hsl(240,89%,73%)] hover:underline">
            Start free trial
          </a>
        </p>
      </div>
    </div>
  );
}
