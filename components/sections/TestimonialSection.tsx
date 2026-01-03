'use client';

import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Award, TrendingUp, Target, Heart } from 'lucide-react';


interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  content: string;
  duration: string;
  achievements: string[];
  beforeAfter?: {
    before: string;
    after: string;
    weightLoss?: number;
  };
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Stories', icon: <Quote className="h-4 w-4" /> },
    { id: 'weight-loss', label: 'Weight Loss', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'strength', label: 'Strength', icon: <Target className="h-4 w-4" /> },
    { id: 'recovery', label: 'Recovery', icon: <Heart className="h-4 w-4" /> },
    { id: 'athletes', label: 'Athletes', icon: <Award className="h-4 w-4" /> },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      role: 'Software Engineer',
      image: '/testimonials/michael.jpg',
      rating: 5,
      content: 'After 10 years of sedentary work, I lost 40lbs in 6 months with IronPeak. The trainers personalized my program and the community kept me motivated. Best decision ever!',
      duration: '6 months',
      achievements: ['Lost 40lbs', 'Gained muscle', 'Improved posture'],
      beforeAfter: {
        before: '/transformations/michael-before.jpg',
        after: '/transformations/michael-after.jpg',
        weightLoss: 40,
      },
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Yoga Instructor',
      image: '/testimonials/sarah.jpg',
      rating: 5,
      content: 'As a yoga instructor, I needed to build strength without losing flexibility. IronPeak\'s recovery programs and expert guidance helped me achieve the perfect balance.',
      duration: '8 months',
      achievements: ['Improved flexibility', 'Increased strength', 'Better balance'],
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Former Athlete',
      image: '/testimonials/david.jpg',
      rating: 5,
      content: 'After a knee injury ended my basketball career, I struggled to stay active. IronPeak\'s rehab program and supportive trainers helped me regain confidence and strength.',
      duration: '1 year',
      achievements: ['Full recovery', 'Regained mobility', 'Back to sports'],
    },
    {
      id: 4,
      name: 'Emily Williams',
      role: 'Marketing Director',
      image: '/testimonials/emily.jpg',
      rating: 5,
      content: 'The 24/7 access was a game-changer for my busy schedule. The equipment is always clean and available. I\'ve never felt stronger or more confident!',
      duration: '4 months',
      achievements: ['Consistent routine', 'Increased energy', 'Better sleep'],
    },
    {
      id: 5,
      name: 'Robert Kim',
      role: 'Personal Trainer',
      image: '/testimonials/robert.jpg',
      rating: 5,
      content: 'I train at IronPeak because of the community. The members support each other, the trainers are knowledgeable, and the facilities are top-notch.',
      duration: '2 years',
      achievements: ['Network built', 'Knowledge gained', 'Client success'],
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      role: 'Mom of Three',
      image: '/testimonials/lisa.jpg',
      rating: 5,
      content: 'Finding time for myself was impossible with three kids. IronPeak\'s childcare and flexible hours made fitness achievable. I\'m healthier and happier!',
      duration: '9 months',
      achievements: ['Self-care routine', 'Stress reduction', 'Healthy habits'],
      beforeAfter: {
        before: '/transformations/lisa-before.jpg',
        after: '/transformations/lisa-after.jpg',
        weightLoss: 25,
      },
    },
  ];

  const stats = [
    { value: '2,500+', label: 'Success Stories' },
    { value: '95%', label: 'Member Satisfaction' },
    { value: '40lbs', label: 'Average Weight Loss' },
    { value: '12 months', label: 'Average Membership' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl mb-6">
            <Quote className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Real Stories, Real Results
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of members who transformed their lives at IronPeak Fitness
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  filter === category.id
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full">
                {/* Testimonial Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {testimonial.rating}.0
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      {testimonial.duration}
                    </span>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6">{testimonial.content}</p>
                  
                  {/* Achievements */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Achievements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Before/After (if available) */}
                  {testimonial.beforeAfter && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Transformation
                      </h4>
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 mb-2" />
                          <div className="text-sm text-gray-600">Before</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            ↓{testimonial.beforeAfter.weightLoss}lbs
                          </div>
                          <div className="text-sm text-gray-500">Weight Loss</div>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-orange-400 mb-2" />
                          <div className="text-sm text-gray-600">After</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Watch Their Journeys
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg">Video testimonial #{i}</p>
                    <p className="text-gray-400">Click to play transformation story</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Amazing Transformation Story
                  </h3>
                  <p className="text-gray-400">
                    Watch how our member achieved incredible results in just 6 months.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of achievers and start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all">
              Start Free Trial
            </button>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Book a Tour
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}