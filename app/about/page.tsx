'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Award } from 'lucide-react';
import Image from 'next/image';


export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Our Mission',
      description: 'To empower individuals to achieve their fitness goals through state-of-the-art facilities, expert guidance, and a supportive community.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Our Values',
      description: 'We believe in inclusivity, integrity, and innovation. Every member is part of our fitness family.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Our Community',
      description: 'Join 2,500+ members who support and motivate each other to be their best selves every day.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Our Standards',
      description: 'Certified trainers, cutting-edge equipment, and premium facilities maintained to the highest standards.',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  const milestones = [
    { year: '2018', event: 'Founded with a vision for modern fitness' },
    { year: '2019', event: 'Expanded to 10,000 sq ft facility' },
    { year: '2020', event: 'Launched virtual training programs' },
    { year: '2021', event: 'Reached 1,000 member milestone' },
    { year: '2022', event: 'Opened second location' },
    { year: '2023', event: 'Named "Best Gym" by Fitness Magazine' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About IronPeak Fitness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 2018, we've been revolutionizing the fitness experience with cutting-edge
            technology, expert trainers, and a community-focused approach.
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16"
        >
          <Image
            src="/images/gym.jpg"
            alt="IronPeak Fitness Interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Where Fitness Meets Community</h2>
              <p className="text-lg">More than a gym - it's a lifestyle</p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-full ${value.color} mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded by fitness enthusiasts Alex Johnson and Sarah Miller, IronPeak Fitness
                began with a simple idea: create a gym that feels like home.
              </p>
              <p>
                After years of experiencing impersonal, overcrowded gyms, we decided to build
                a space where everyone - from beginners to athletes - could feel comfortable
                and supported.
              </p>
              <p>
                Today, IronPeak is a community of 2,500+ members, 150+ certified trainers,
                and a team dedicated to helping you achieve your fitness goals.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/about/founders.jpg"
              alt="IronPeak Founders"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block w-4 h-4 bg-red-500 rounded-full mx-4 z-10" />
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Alex Johnson', role: 'CEO & Co-Founder', image: '/team/alex.jpg' },
              { name: 'Sarah Miller', role: 'Head Trainer', image: '/team/sarah.jpg' },
              { name: 'Mike Chen', role: 'Operations Director', image: '/team/mike.jpg' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-red-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">
                  Passionate about fitness and dedicated to helping our members succeed.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}