
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Instagram, Facebook, Twitter, Mail, Star } from 'lucide-react';
import Image from 'next/image';

interface Trainer {
  id: number;
  name: string;
  role: string;
  specialization: string[];
  experience: string;
  certifications: string[];
  rating: number;
  bio: string;
  image: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    email: string;
  };
}

export default function TrainersPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const specializations = ['all', 'strength', 'cardio', 'yoga', 'hiit', 'nutrition', 'recovery'];

  const trainers: Trainer[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Head Trainer & Co-Founder',
      specialization: ['strength', 'hiit'],
      experience: '10+ years',
      certifications: ['NASM Certified', 'CrossFit Level 3', 'Precision Nutrition'],
      rating: 4.9,
      bio: 'Former competitive powerlifter turned fitness educator. Specializes in strength training and functional movement.',
      image: '/trainers/alex.jpg',
      social: {
        instagram: '@alex_johnson_fit',
        email: 'alex@ironpeakfitness.com',
      },
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'Yoga & Recovery Specialist',
      specialization: ['yoga', 'recovery'],
      experience: '8+ years',
      certifications: ['RYT 500', 'Yoga Therapy Certified', 'Myofascial Release'],
      rating: 4.8,
      bio: 'Helping members find balance between intense workouts and mindful recovery through yoga and mobility work.',
      image: '/trainers/sarah.jpg',
      social: {
        instagram: '@sarah_yoga_flow',
        email: 'sarah@ironpeakfitness.com',
      },
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Strength & Conditioning Coach',
      specialization: ['strength', 'cardio'],
      experience: '12+ years',
      certifications: ['CSCS', 'USA Weightlifting', 'Functional Range Conditioning'],
      rating: 4.9,
      bio: 'Works with athletes and fitness enthusiasts to build power, speed, and endurance through evidence-based training.',
      image: '/trainers/mike.jpg',
      social: {
        twitter: '@mikechen_strength',
        email: 'mike@ironpeakfitness.com',
      },
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      role: 'HIIT & Cardio Coach',
      specialization: ['hiit', 'cardio'],
      experience: '6+ years',
      certifications: ['ACE Certified', 'HIIT Specialist', 'Kettlebell Instructor'],
      rating: 4.7,
      bio: 'Energizes classes with high-intensity workouts that push limits while maintaining proper form and safety.',
      image: '/trainers/lisa.jpg',
      social: {
        instagram: '@lisa_cardio_queen',
        facebook: 'lisa.rodriguez.fitness',
        email: 'lisa@ironpeakfitness.com',
      },
    },
    {
      id: 5,
      name: 'David Park',
      role: 'Nutrition & Wellness Coach',
      specialization: ['nutrition', 'recovery'],
      experience: '9+ years',
      certifications: ['Registered Dietitian', 'Sports Nutritionist', 'Wellness Coach'],
      rating: 4.8,
      bio: 'Combines nutritional science with practical lifestyle changes to help members achieve sustainable results.',
      image: '/trainers/david.jpg',
      social: {
        instagram: '@david_nutrition_coach',
        email: 'david@ironpeakfitness.com',
      },
    },
    {
      id: 6,
      name: 'Marcus Lee',
      role: 'Boxing & Functional Fitness',
      specialization: ['cardio', 'hiit'],
      experience: '7+ years',
      certifications: ['Boxing Coach Level 2', 'TRX Certified', 'Mobility Specialist'],
      rating: 4.7,
      bio: 'Bringing boxing techniques to functional fitness for full-body workouts that build coordination and power.',
      image: '/trainers/marcus.jpg',
      social: {
        instagram: '@marcus_boxing_fit',
        email: 'marcus@ironpeakfitness.com',
      },
    },
  ];

  const filteredTrainers = trainers.filter(trainer => 
    selectedSpecialization === 'all' || 
    trainer.specialization.includes(selectedSpecialization)
  );

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Meet Our Expert Trainers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified trainers combine expertise with passion to guide you every step of your fitness journey.
          </p>
        </motion.div>

        {/* Specialization Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white p-1 rounded-2xl shadow-lg inline-flex flex-wrap justify-center gap-2">
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedSpecialization === spec
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTrainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Trainer Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Target className="h-32 w-32" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
                    <p className="text-red-400">{trainer.role}</p>
                  </div>
                  <div className="flex items-center bg-black/50 text-white px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{trainer.rating}</span>
                  </div>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-6">
                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specialization.map(spec => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                    >
                      {spec.charAt(0).toUpperCase() + spec.slice(1)}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-gray-600 mb-6">{trainer.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500">Experience</div>
                    <div className="text-lg font-bold text-gray-900">{trainer.experience}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500">Certifications</div>
                    <div className="text-lg font-bold text-gray-900">
                      {trainer.certifications.length}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 mb-3">
                    <Award className="h-4 w-4 mr-2" />
                    <span className="font-medium">Certifications</span>
                  </div>
                  <div className="space-y-2">
                    {trainer.certifications.map((cert, idx) => (
                      <div key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social & Contact */}
                <div className="border-t pt-6">
                  <div className="flex justify-center space-x-4">
                    {trainer.social.instagram && (
                      <a
                        href={`https://instagram.com/${trainer.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {trainer.social.facebook && (
                      <a
                        href={`https://facebook.com/${trainer.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {trainer.social.twitter && (
                      <a
                        href={`https://twitter.com/${trainer.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-sky-100 text-sky-600 rounded-full hover:bg-sky-200 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    <a
                      href={`mailto:${trainer.social.email}`}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a consultation with one of our expert trainers to create your personalized fitness plan.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all">
            Book a Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}