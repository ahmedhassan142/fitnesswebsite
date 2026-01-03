'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Body
              </span>
              , Transform Your Life
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Join our modern fitness community with state-of-the-art equipment, 
              expert trainers, and personalized workout plans for all fitness levels.
            </p>

            <div className="space-y-4 mb-8">
              {[
                '24/7 Access to Premium Facilities',
                'Certified Personal Trainers',
                'Group Classes Included',
                'Nutrition Planning',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all flex items-center justify-center group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-red-500 hover:text-red-600 transition-colors">
                View Classes
              </button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Using Next.js Image component for optimization[citation:10] */}
              <Image
                src="/images/hero-gym.jpg"
                alt="Modern Gym Facility"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Happy Members</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;