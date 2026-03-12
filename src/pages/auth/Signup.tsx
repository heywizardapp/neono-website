import * as React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/onboarding');
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
            Start Your Free Trial
          </h1>
          <p className="text-gray-600">
            No credit card required • 14 days free
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
          redirectTo={`${window.location.origin}/onboarding`}
          view="sign_up"
        />
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-[hsl(240,89%,73%)] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
