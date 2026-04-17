import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    businessName: '',
    businessType: 'salon',
    chairCount: '1',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      const { error } = await supabase
        .from('onboarding_data')
        .insert([
          {
            user_id: user.id,
            business_name: formData.businessName,
            business_type: formData.businessType,
            chair_count: formData.chairCount,
            phone: formData.phone,
          },
        ]);

      if (error) throw error;

      // Redirect to dashboard placeholder
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to save onboarding data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                  s <= step ? 'bg-[hsl(240,89%,73%)]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold text-[hsl(215,85%,8%)]">
            Tell us about your business
          </h2>
          <p className="text-gray-600 mt-2">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(240,89%,73%)] focus:border-transparent"
                  placeholder="e.g., Bella Hair Studio"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(240,89%,73%)] focus:border-transparent"
                >
                  <option value="salon">Hair Salon</option>
                  <option value="barbershop">Barbershop</option>
                  <option value="spa">Spa</option>
                  <option value="aesthetics">Medical Aesthetics</option>
                  <option value="nails">Nail Salon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Chairs/Rooms *
                </label>
                <select
                  value={formData.chairCount}
                  onChange={(e) => setFormData({ ...formData, chairCount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(240,89%,73%)] focus:border-transparent"
                >
                  <option value="1">1</option>
                  <option value="2-3">2-3</option>
                  <option value="4-7">4-7</option>
                  <option value="8+">8+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(240,89%,73%)] focus:border-transparent"
                  placeholder="(416) 000-0000"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(240,89%,73%)] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Complete Setup'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
