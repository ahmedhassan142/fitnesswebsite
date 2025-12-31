'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Shield, CreditCard, Clock, Users, Dumbbell } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const categories = [
    { id: 'general', label: 'General', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'membership', label: 'Membership', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'facility', label: 'Facility', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'classes', label: 'Classes', icon: <Users className="h-5 w-5" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="h-5 w-5" /> },
  ];

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'What are your operating hours?',
      answer: 'We are open 24/7 for all Premium and Ultimate members. Basic members have access from 5:00 AM to 11:00 PM daily. Our staffed hours are from 5:00 AM to 11:00 PM every day.',
      category: 'general',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: 2,
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 7-day free trial for new members. During your trial, you\'ll have full access to all facilities, equipment, and group classes. No credit card required to start your trial.',
      category: 'membership',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 3,
      question: 'What equipment do you have?',
      answer: 'We have over $500,000 worth of state-of-the-art equipment including: Strength training (power racks, free weights, machines), Cardio (treadmills, bikes, rowers), Functional training (TRX, battle ropes, plyo boxes), and Specialized zones (HIIT, yoga, recovery).',
      category: 'facility',
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      id: 4,
      question: 'Are personal trainers included?',
      answer: 'Personal trainer sessions are included in our Ultimate membership (1 session per month). Premium and Basic members can purchase sessions individually or in packages. All our trainers are certified and have extensive experience.',
      category: 'classes',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 5,
      question: 'What safety measures do you have?',
      answer: 'Your safety is our priority. We have 24/7 security cameras, emergency buttons throughout the facility, certified staff during operating hours, regular equipment maintenance, and comprehensive cleaning protocols.',
      category: 'safety',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: 6,
      question: 'Can I bring a guest?',
      answer: 'Premium members receive 2 guest passes per month, while Ultimate members can bring guests anytime. Basic members can purchase day passes for guests. All guests must sign a waiver and be accompanied by a member.',
      category: 'membership',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 7,
      question: 'Do you have locker rooms and showers?',
      answer: 'Yes! We have premium locker rooms with private showers, sauna, steam room, and complimentary towel service for Premium and Ultimate members. Lockers are available for daily use (bring your own lock) or rent monthly.',
      category: 'facility',
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      id: 8,
      question: 'What if I need to cancel my membership?',
      answer: 'You can cancel your membership anytime through your online account or by visiting the front desk. We require 30 days notice for cancellation. There are no cancellation fees for month-to-month memberships.',
      category: 'membership',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 9,
      question: 'Do you offer nutrition guidance?',
      answer: 'Yes! All members receive a basic nutrition guide. Premium members get access to our nutrition workshops, and Ultimate members include a personal nutrition consultation. We also offer specialized nutrition programs for weight loss, muscle gain, and performance.',
      category: 'classes',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 10,
      question: 'Are there age restrictions?',
      answer: 'Members must be 16 years or older. Teens aged 14-15 can join with parent/guardian supervision. We offer special youth programs and family memberships. Please contact us for family pricing options.',
      category: 'general',
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const filteredItems = faqItems.filter(item => item.category === activeCategory);
  const otherCategories = categories.filter(cat => cat.id !== activeCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about memberships, facilities, and services
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* FAQ List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          openItems.includes(item.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Other Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Other Categories
                </h3>
                <div className="space-y-3">
                  {otherCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      {category.icon}
                      <span className="font-medium text-gray-700">
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-gray-300 mb-6">
                  Can't find what you're looking for? Our team is here to help.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Live Chat
                  </button>
                  <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                    Call Us Now
                  </button>
                  <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                    Send Email
                  </button>
                </div>
              </div>

              {/* Popular Questions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Popular Questions
                </h3>
                <div className="space-y-3">
                  {faqItems.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveCategory(item.category);
                        if (!openItems.includes(item.id)) {
                          setOpenItems([...openItems, item.id]);
                        }
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">
                        {item.question}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {item.answer.substring(0, 60)}...
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Start your fitness journey with a 7-day free trial and expert guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                  Schedule a Tour
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}