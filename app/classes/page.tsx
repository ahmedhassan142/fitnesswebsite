'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Target, Filter } from 'lucide-react';
import Image from 'next/image';
// import { getClassImage } from '@/lib/imageUtils';

interface ClassType {
  id: number;
  name: string;
  category: string;
  time: string;
  duration: string;
  trainer: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  spots: number;
  imageFormats: string[]; // Support multiple formats
}

export default function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntensity, setSelectedIntensity] = useState('all');

  const categories = ['all', 'strength', 'cardio', 'yoga', 'hiit', 'recovery'];
  const intensityLevels = ['all', 'beginner', 'intermediate', 'advanced'];

  const classes: ClassType[] = [
    {
      id: 1,
      name: 'Power Lift',
      category: 'strength',
      time: '06:00 AM',
      duration: '60 min',
      trainer: 'Mike Chen',
      intensity: 'Intermediate',
      description: 'Build raw strength with compound movements',
      spots: 15,
      imageFormats: [
        '/classes/power-lift.avif',
        '/classes/power-lift.webp',
        '/classes/power-lift.jfif',
        '/classes/power-lift.jpg',
        '/classes/power-lift.jpeg',
        '/classes/power-lift.png'
      ],
    },
    {
      id: 2,
      name: 'HIIT Revolution',
      category: 'hiit',
      time: '07:30 AM',
      duration: '45 min',
      trainer: 'Alex Johnson',
      intensity: 'Advanced',
      description: 'High-intensity interval training for maximum calorie burn',
      spots: 20,
      imageFormats: [
        '/classes/hiit.avif',
        '/classes/hiit.webp',
        '/classes/hiit.jfif',
        '/classes/hiit.jpg',
        '/classes/hiit.jpeg',
        '/classes/hiit.png'
      ],
    },
    {
      id: 3,
      name: 'Vinyasa Flow',
      category: 'yoga',
      time: '08:00 AM',
      duration: '60 min',
      trainer: 'Sarah Miller',
      intensity: 'Beginner',
      description: 'Fluid movement connecting breath to movement',
      spots: 25,
      imageFormats: [
        '/classes/yoga.avif',
        '/classes/yoga.webp',
        '/classes/yoga.jfif',
        '/classes/yoga.jpg',
        '/classes/yoga.jpeg',
        '/classes/yoga.png'
      ],
    },
    {
      id: 4,
      name: 'Spin Class',
      category: 'cardio',
      time: '05:30 PM',
      duration: '45 min',
      trainer: 'Lisa Rodriguez',
      intensity: 'Intermediate',
      description: 'Indoor cycling for cardiovascular endurance',
      spots: 30,
      imageFormats: [
        '/classes/spin.avif',
        '/classes/spin.webp',
        '/classes/spin.jfif',
        '/classes/spin.jpg',
        '/classes/spin.jpeg',
        '/classes/spin.png'
      ],
    },
    {
      id: 5,
      name: 'Recovery Yoga',
      category: 'recovery',
      time: '07:00 PM',
      duration: '60 min',
      trainer: 'David Park',
      intensity: 'Beginner',
      description: 'Gentle stretches for muscle recovery',
      spots: 20,
      imageFormats: [
        '/classes/recovery-yoga.avif',
        '/classes/recovery-yoga.webp',
        '/classes/recovery-yoga.jfif',
        '/classes/recovery-yoga.jpg',
        '/classes/recovery-yoga.jpeg',
        '/classes/recovery-yoga.png'
      ],
    },
    {
      id: 6,
      name: 'Boxing Conditioning',
      category: 'cardio',
      time: '06:00 PM',
      duration: '60 min',
      trainer: 'Marcus Lee',
      intensity: 'Advanced',
      description: 'Boxing techniques with cardio conditioning',
      spots: 18,
      imageFormats: [
        '/classes/boxing.avif',
        '/classes/boxing.webp',
        '/classes/boxing.jfif',
        '/classes/boxing.jpg',
        '/classes/boxing.jpeg',
        '/classes/boxing.png'
      ],
    },
  ];

  const filteredClasses = classes.filter(cls => {
    const categoryMatch = selectedCategory === 'all' || cls.category === selectedCategory;
    const intensityMatch = selectedIntensity === 'all' || 
      cls.intensity.toLowerCase() === selectedIntensity;
    return categoryMatch && intensityMatch;
  });

  // Helper function to get the first available image format
  const getFirstAvailableImage = (formats: string[]): string => {
    // In a real app, you would check which files exist
    // For now, return the first one
    return formats[3] || formats[0] || '/images/placeholder.jpg';
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Classes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From high-intensity workouts to mindful recovery, find the perfect class for your fitness journey.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="flex items-center mb-6">
            <Filter className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Filter Classes</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Category</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Intensity Level</h3>
              <div className="flex flex-wrap gap-3">
                {intensityLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedIntensity(level)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedIntensity === level
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Class Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls, index) => {
            const imageSrc = getFirstAvailableImage(cls.imageFormats);
            
            return (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {/* Class Image with Next.js Image Component */}
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={`${cls.name} class`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 2} // Load first 2 images immediately
                    />
                    
                    {/* Overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Category text in background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-4xl font-bold text-white/20">
                        {cls.category.toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Intensity badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        cls.intensity === 'Beginner' ? 'bg-green-100 text-green-700' :
                        cls.intensity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {cls.intensity}
                      </span>
                    </div>
                    
                    {/* Spots left badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {cls.spots} spots left
                    </div>
                  </div>

                  {/* Class Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{cls.name}</h3>
                        <p className="text-red-600 font-medium">{cls.category}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{cls.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{cls.time} • {cls.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Trainer: {cls.trainer}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Target className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{cls.category.charAt(0).toUpperCase() + cls.category.slice(1)} Focus</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Book Now
                      </button>
                      <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-red-500 hover:text-red-600 transition-colors">
                        Details
                      </button>
                    </div>
                    
                    {/* Image format info (for debugging) */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Formats available: {cls.imageFormats.map(f => f.split('.').pop()).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Weekly Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-4">Time</th>
                  <th className="pb-4">Monday</th>
                  <th className="pb-4">Tuesday</th>
                  <th className="pb-4">Wednesday</th>
                  <th className="pb-4">Thursday</th>
                  <th className="pb-4">Friday</th>
                  <th className="pb-4">Saturday</th>
                  <th className="pb-4">Sunday</th>
                </tr>
              </thead>
              <tbody>
                {['06:00', '08:00', '12:00', '17:00', '19:00'].map(time => (
                  <tr key={time} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 font-medium">{time}</td>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <td key={day} className="py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Power Lift</span>
                          <span className="text-sm text-gray-400">Mike Chen</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}