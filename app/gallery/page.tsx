'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Video, Image as ImageIcon, Users, Dumbbell } from 'lucide-react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'facility', label: 'Facility', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'classes', label: 'Classes', icon: <Users className="h-4 w-4" /> },
    { id: 'community', label: 'Community', icon: <Video className="h-4 w-4" /> },
    { id: 'events', label: 'Events', icon: <Users className="h-4 w-4" /> },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      title: 'Main Training Floor',
      category: 'facility',
      description: 'Our 10,000 sq ft main training area with state-of-the-art equipment',
      image: '/gallery/main-floor.jpg',
    },
    {
      id: 2,
      type: 'image',
      title: 'HIIT Zone',
      category: 'classes',
      description: 'High-intensity interval training area with specialized equipment',
      image: '/gallery/hiit-zone.jpg',
    },
    {
      id: 3,
      type: 'video',
      title: 'Yoga Studio',
      category: 'classes',
      description: 'Peaceful yoga studio with natural lighting and premium mats',
      image: '/gallery/yoga-studio.jpg',
    },
    {
      id: 4,
      type: 'image',
      title: 'Strength Area',
      category: 'facility',
      description: 'Comprehensive strength training section with power racks',
      image: '/gallery/strength-area.jpg',
    },
    {
      id: 5,
      type: 'image',
      title: 'Member Social',
      category: 'community',
      description: 'Monthly member social events and networking',
      image: '/gallery/social-event.jpg',
    },
    {
      id: 6,
      type: 'video',
      title: 'Spin Class',
      category: 'classes',
      description: 'Energetic spin classes with immersive lighting',
      image: '/gallery/spin-class.jpg',
    },
    {
      id: 7,
      type: 'image',
      title: 'Locker Rooms',
      category: 'facility',
      description: 'Premium locker rooms with sauna and steam rooms',
      image: '/gallery/locker-room.jpg',
    },
    {
      id: 8,
      type: 'image',
      title: 'Fitness Challenge',
      category: 'events',
      description: 'Annual fitness challenge winners celebration',
      image: '/gallery/challenge.jpg',
    },
    {
      id: 9,
      type: 'image',
      title: 'Personal Training',
      category: 'classes',
      description: 'One-on-one personal training sessions',
      image: '/gallery/personal-training.jpg',
    },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities and vibrant community
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
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Gallery Item */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Type Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`p-2 rounded-full ${
                    item.type === 'video' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/90 text-gray-900'
                  }`}>
                    {item.type === 'video' ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-white/90 text-gray-900">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10,000+', label: 'Square Feet' },
                { value: '$500K+', label: 'Equipment Value' },
                { value: '50+', label: 'Training Zones' },
                { value: '24/7', label: 'Access' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedItem.title}
                  </h2>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-col