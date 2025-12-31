'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, User, Mail, Target } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reference) {
      fetch(`/api/membership/join?reference=${reference}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setApplication(data.data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [reference]);

  const nextSteps = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Schedule Tour',
      description: 'Visit our facility for a personal tour',
      action: 'Book Now',
      link: '/contact',
    },
    {
      icon: <User className="h-6 w-6" />,
      title: 'Meet Your Trainer',
      description: 'Schedule a free consultation with a certified trainer',
      action: 'Schedule',
      link: '/trainers',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Plan Workouts',
      description: 'Browse classes and create your workout plan',
      action: 'Explore',
      link: '/classes',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to IronPeak Fitness!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your application has been submitted successfully. 
            {reference && (
              <>
                {' '}Your reference number is:{' '}
                <span className="font-bold text-gray-900">{reference}</span>
              </>
            )}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading your application details...</p>
          </div>
        ) : application ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Application Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Application Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">{application.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Membership Plan</div>
                    <div className="font-medium text-gray-900 capitalize">
                      {application.membershipPlan}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Applied On</div>
                    <div className="font-medium text-gray-900">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Fitness Goal</div>
                    <div className="font-medium text-gray-900">
                      {
                      application.fitnessGoal.replace('_', ' ').replace(/\b\w/g, (l:any)=> l.toUpperCase()) )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Next Steps Info */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">1</span>
                    <span>Our team will review your application within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">2</span>
                    <span>You'll receive a welcome email with your 7-day trial details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">3</span>
                    <span>Schedule your orientation session with a personal trainer</span>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Next Steps Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Get Started With Your Fitness Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-3 bg-red-100 text-red-600 rounded-xl mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <a
                  href={step.link}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                >
                  {step.action}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Questions?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Contact us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Call Now: (555) 123-4567
              </a>
              <a
                href="mailto:membership@ironpeakfitness.com"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}