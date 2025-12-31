'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Tag, ChevronRight, BookOpen, TrendingUp, Apple } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'community', label: 'Community' },
    { id: 'tips', label: 'Tips & Tricks' },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Science Behind HIIT: Why It Works',
      excerpt: 'Discover the physiological benefits of high-intensity interval training and how to maximize your results.',
      author: 'Dr. Sarah Miller',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'workouts',
      image: '/blog/hiit-science.jpg',
      tags: ['HIIT', 'Science', 'Cardio'],
      featured: true,
    },
    {
      id: 2,
      title: 'Nutrition for Muscle Recovery',
      excerpt: 'Learn what to eat and when to eat it for optimal muscle recovery and growth.',
      author: 'Mike Chen',
      date: '2024-01-10',
      readTime: '6 min',
      category: 'nutrition',
      image: '/blog/nutrition-recovery.jpg',
      tags: ['Nutrition', 'Recovery', 'Protein'],
      featured: true,
    },
    {
      id: 3,
      title: '5 Essential Mobility Exercises',
      excerpt: 'Improve your flexibility and prevent injuries with these daily mobility exercises.',
      author: 'Lisa Rodriguez',
      date: '2024-01-05',
      readTime: '5 min',
      category: 'wellness',
      image: '/blog/mobility.jpg',
      tags: ['Mobility', 'Injury Prevention', 'Flexibility'],
      featured: false,
    },
    {
      id: 4,
      title: 'Building a Home Workout Routine',
      excerpt: 'Stay fit anywhere with this effective home workout routine using minimal equipment.',
      author: 'Alex Johnson',
      date: '2024-01-01',
      readTime: '7 min',
      category: 'workouts',
      image: '/blog/home-workout.jpg',
      tags: ['Home Workout', 'Bodyweight', 'Routine'],
      featured: false,
    },
    {
      id: 5,
      title: 'The Power of Community in Fitness',
      excerpt: 'How working out with others can boost motivation and improve results.',
      author: 'David Park',
      date: '2023-12-28',
      readTime: '6 min',
      category: 'community',
      image: '/blog/community.jpg',
      tags: ['Community', 'Motivation', 'Accountability'],
      featured: false,
    },
    {
      id: 6,
      title: 'Mindful Eating for Weight Loss',
      excerpt: 'Transform your relationship with food through mindful eating practices.',
      author: 'Emily Chen',
      date: '2023-12-25',
      readTime: '9 min',
      category: 'nutrition',
      image: '/blog/mindful-eating.jpg',
      tags: ['Mindfulness', 'Weight Loss', 'Habits'],
      featured: false,
    },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

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
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Fitness Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, workout tips, nutrition advice, and success stories
          </p>
        </motion.div>

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
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="h-64 lg:h-auto bg-gradient-to-br from-gray-700 to-gray-900" />
                
                {/* Content */}
                <div className="p-8 lg:p-12 text-white">
                  <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-4">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm">Featured</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{featuredPost.readTime} read</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    <span>Read Article</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400" />
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-semibold">
                  <span>Read More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Get Weekly Fitness Tips
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive content, workout plans, and nutrition guides
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-l-full text-gray-900 outline-none"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-r-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-white/80">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}