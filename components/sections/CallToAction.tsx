'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target, Clock, Users } from 'lucide-react';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you! We\'ll contact you soon with your free trial details.');
    setEmail('');
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Personalized Plan',
      description: 'Custom workout and nutrition plan',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Flexible Hours',
      description: '24/7 access with your membership',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Guidance',
      description: 'Certified trainers always available',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'All Equipment',
      description: 'Access to $500k+ worth of equipment',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Start Your <span className="text-gray-900">Fitness Journey</span> Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              Join thousands of members who transformed their lives with our expert guidance
              and state-of-the-art facilities.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                What You'll Get With Your Free Trial
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-2 bg-white/20 rounded-xl text-white">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{benefit.title}</h4>
                      <p className="text-white/80 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white">2,500+</div>
                    <div className="text-white/80 text-sm">Active Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-white/80 text-sm">Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">7-Day</div>
                    <div className="text-white/80 text-sm">Free Trial</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl mb-4">
                  <ArrowRight className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Claim Your Free Trial
                </h3>
                <p className="text-gray-600">
                  No credit card required. Start your transformation today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? 'Processing...' : (
                    <>
                      Start 7-Day Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  By signing up, you agree to our{' '}
                  <a href="/terms" className="text-red-600 hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </form>

              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold">24 people</span> joined this week
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <p className="text-center text-white/80 mb-6">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['Fitness Magazine', 'Health & Wellness', 'Bodybuilding.com', 'Men\'s Health'].map((brand, index) => (
                <div
                  key={index}
                  className="text-white/50 text-lg font-bold hover:text-white transition-colors"
                >
                  {brand}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;