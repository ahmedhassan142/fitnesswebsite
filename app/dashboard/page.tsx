'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  Target,  Clock, Heart, Dumbbell } from 'lucide-react';
import UserDashboard from '../../components/dashboard/UserDashboard';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">My Fitness Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Track your progress and manage your fitness journey.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            {['overview', 'workouts', 'nutrition', 'progress', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <UserDashboard activeTab={activeTab} />

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">This Week's Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Dumbbell className="h-6 w-6" />, label: 'Workouts', value: '5', change: '+2' },
              { icon: <Clock className="h-6 w-6" />, label: 'Active Hours', value: '8.5', change: '+1.2' },
              { icon: <Heart className="h-6 w-6" />, label: 'Avg HR', value: '142', unit: 'bpm', change: '-5' },
              { icon: <Target className="h-6 w-6" />, label: 'Goals Met', value: '80%', change: '+10%' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}{stat.unit && <span className="text-lg">{stat.unit}</span>}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}