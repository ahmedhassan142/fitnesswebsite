'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Target, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  membershipPlan: 'basic' | 'premium' | 'ultimate';
  fitnessGoal: string;
  referralSource: string;
  agreeToTerms: boolean;
}

const JoinForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    membershipPlan: 'premium',
    fitnessGoal: 'weight_loss',
    referralSource: 'website',
    agreeToTerms: false,
  });

  const fitnessGoals = [
    { id: 'weight_loss', label: 'Weight Loss' },
    { id: 'muscle_gain', label: 'Muscle Gain' },
    { id: 'endurance', label: 'Endurance & Fitness' },
    { id: 'recovery', label: 'Rehabilitation & Recovery' },
    { id: 'general', label: 'General Health' },
  ];

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29.99/month',
      features: ['Gym Access', 'Locker Room', 'Weekday Hours'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$49.99/month',
      features: ['24/7 Access', 'Group Classes', 'Guest Passes'],
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: '$79.99/month',
      features: ['Personal Training', 'Nutrition Plan', 'Premium Locker'],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.agreeToTerms) {
        throw new Error('Please agree to the terms and conditions');
      }

      if (!formData.email || !formData.firstName || !formData.lastName) {
        throw new Error('Please fill in all required fields');
      }

      // Submit to API using React's extended form element with Server Actions[citation:1]
      const response = await fetch('/api/membership/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      // Success - show confirmation and redirect
      setSuccess(true);
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        router.push(`/thank-you?reference=${data.reference}`);
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 text-center"
      >
        <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for joining IronPeak Fitness. Our team will contact you within 24 hours 
          to complete your membership setup.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to confirmation page...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Join IronPeak Fitness</h2>
        <p className="opacity-90">Start your fitness journey today with our 7-day free trial</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-red-600" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-red-200 outline-none transition"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Membership Plan Selection */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Plan</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    formData.membershipPlan === plan.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, membershipPlan: plan.id as any }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{plan.name}</h4>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.membershipPlan === plan.id
                        ? 'bg-red-500 border-red-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">{plan.price}</div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Goals */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-red-600" />
              Primary Fitness Goal
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {fitnessGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${
                    formData.fitnessGoal === goal.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: goal.id }))}
                >
                  <div className="text-sm font-medium">{goal.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you hear about us?
            </label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
            >
              <option value="website">Website / Google</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend Referral</option>
              <option value="advertisement">Advertisement</option>
              <option value="event">Local Event</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t pt-6">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                id="terms"
                className="mt-1 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="/terms" className="text-red-600 hover:underline font-medium">
                  Terms & Conditions
                </a>{' '}
                and understand that my 7-day free trial begins immediately upon approval. 
                I authorize IronPeak Fitness to charge my selected membership fee after the trial period.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing Application...
                </>
              ) : (
                'Start 7-Day Free Trial'
              )}
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              No credit card required for free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;