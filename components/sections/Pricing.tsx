'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Crown } from 'lucide-react';

interface MembershipPlan {
  id: number;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: {
    included: string[];
    excluded: string[];
  };
  popular: boolean;
  icon: React.ReactNode;
  description: string;
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const calculateYearlyPrice = (monthlyPrice: number) => monthlyPrice * 12 * 0.8; // 20% discount

  const plans: MembershipPlan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 29.99,
      period: 'monthly',
      icon: <Star className="h-8 w-8" />,
      description: 'Perfect for getting started',
      popular: false,
      features: {
        included: [
          'Access to gym equipment',
          'Locker room access',
          'Basic fitness assessment',
          'Weekday access (5am-8pm)',
          'Free WiFi',
        ],
        excluded: [
          'Group classes',
          '24/7 access',
          'Guest passes',
          'Towel service',
          'Personal trainer sessions',
        ],
      },
    },
    {
      id: 2,
      name: 'Premium',
      price: 49.99,
      period: 'monthly',
      icon: <Zap className="h-8 w-8" />,
      description: 'Most popular choice',
      popular: true,
      features: {
        included: [
          'All Basic features',
          '24/7 access',
          'All group classes included',
          'Guest passes (2/month)',
          'Premium towel service',
          'Nutrition guide',
        ],
        excluded: [
          'Personal trainer sessions',
          'Premium locker',
          'Bring a friend anytime',
        ],
      },
    },
    {
      id: 3,
      name: 'Ultimate',
      price: 79.99,
      period: 'monthly',
      icon: <Crown className="h-8 w-8" />,
      description: 'Complete fitness experience',
      popular: false,
      features: {
        included: [
          'All Premium features',
          'Personal trainer session (1/month)',
          'Nutrition consultation',
          'Premium locker with charging',
          'Bring a friend anytime',
          'Early access to new classes',
          'Exclusive member events',
        ],
        excluded: [],
      },
    },
  ];

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
    // In a real app, you would redirect to checkout or show a modal
    alert(`Selected ${plans.find(p => p.id === planId)?.name} plan!`);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Membership Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your fitness journey. All plans include access to our
            state-of-the-art facilities and equipment.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white p-1 rounded-2xl shadow-lg inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly <span className="text-sm text-green-600 ml-1">(Save 20%)</span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const displayPrice = billingPeriod === 'yearly' 
              ? calculateYearlyPrice(plan.price)
              : plan.price;
            const monthlyEquivalent = billingPeriod === 'yearly'
              ? (displayPrice / 12).toFixed(2)
              : null;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-1 rounded-full font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className={`bg-white rounded-3xl p-8 h-full ${
                  plan.popular 
                    ? 'border-2 border-red-500 shadow-2xl' 
                    : 'border border-gray-200 shadow-lg'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-red-100 to-orange-100 text-red-600 mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-900">
                        ${displayPrice.toFixed(2)}
                        <span className="text-lg text-gray-600 font-normal">
                          /{billingPeriod === 'yearly' ? 'year' : 'month'}
                        </span>
                      </div>
                      {monthlyEquivalent && (
                        <p className="text-green-600 font-medium">
                          ${monthlyEquivalent}/month equivalent
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h4>
                    
                    {plan.features.included.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="p-1 bg-green-100 rounded-full mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}

                    {plan.features.excluded.length > 0 && (
                      <>
                        <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Not included:</h4>
                        {plan.features.excluded.map((feature, idx) => (
                          <div key={idx} className="flex items-center opacity-50">
                            <div className="p-1 bg-gray-100 rounded-full mr-3">
                              <X className="h-4 w-4 text-gray-400" />
                            </div>
                            <span className="text-gray-500">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-xl'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg'
                    }`}
                  >
                    {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: 'Can I change or cancel my plan anytime?',
                answer: 'Yes! You can upgrade, downgrade, or cancel your membership anytime through your account dashboard. No long-term contracts.',
              },
              {
                question: 'Is there a free trial?',
                answer: 'We offer a 7-day free trial for new members. Experience all our facilities and classes before committing.',
              },
              {
                question: 'Do you offer student or military discounts?',
                answer: 'Yes, we offer 15% discount for students and military personnel with valid ID. Contact our support team for verification.',
              },
              {
                question: 'Can I bring a guest?',
                answer: 'Premium and Ultimate members receive guest passes. Basic members can purchase day passes for guests.',
              },
              {
                question: 'Are personal trainers included?',
                answer: 'Personal trainer sessions are included in the Ultimate plan. Premium and Basic members can purchase sessions separately.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}