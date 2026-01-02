'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  Heart, 
  Dumbbell, 
  Users, 
  Flame, 
  Apple,
  Droplets,
  BarChart3,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Flamenco } from 'next/font/google';

interface UserDashboardProps {
  activeTab: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ activeTab }) => {
  // Recent workouts data
  const recentWorkouts = [
    { name: 'Chest & Triceps', duration: '45 min', calories: 320, date: 'Today', completed: true },
    { name: 'Leg Day', duration: '60 min', calories: 450, date: 'Yesterday', completed: true },
    { name: 'Cardio HIIT', duration: '30 min', calories: 280, date: '2 days ago', completed: true },
    { name: 'Upper Body', duration: '50 min', calories: 380, date: 'Scheduled', completed: false },
  ];

  // Nutrition data
  const nutritionStats = [
    { label: 'Calories', value: '1,850', target: '2,000', unit: 'kcal', color: 'bg-blue-500' },
    { label: 'Protein', value: '142g', target: '150g', unit: 'grams', color: 'bg-green-500' },
    { label: 'Carbs', value: '185g', target: '200g', unit: 'grams', color: 'bg-yellow-500' },
    { label: 'Fat', value: '62g', target: '65g', unit: 'grams', color: 'bg-red-500' },
  ];

  // Progress metrics
  const progressMetrics = [
    { label: 'Weight', current: '74.5kg', target: '72kg', change: '-1.5kg', progress: 70 },
    { label: 'Body Fat %', current: '18.2%', target: '16%', change: '-0.8%', progress: 55 },
    { label: 'Muscle Mass', current: '32.1kg', target: '33kg', change: '+0.5kg', progress: 30 },
    { label: 'BMI', current: '23.1', target: '22.5', change: '-0.3', progress: 80 },
  ];

  // Weekly schedule
  const weeklySchedule = [
    { day: 'Mon', workout: 'Chest & Back', time: '7:00 AM', type: 'Strength' },
    { day: 'Tue', workout: 'Leg Day', time: '7:30 AM', type: 'Strength' },
    { day: 'Wed', workout: 'HIIT Cardio', time: '6:45 AM', type: 'Cardio' },
    { day: 'Thu', workout: 'Arms & Shoulders', time: '7:00 AM', type: 'Strength' },
    { day: 'Fri', workout: 'Yoga & Mobility', time: '8:00 AM', type: 'Recovery' },
    { day: 'Sat', workout: 'Full Body', time: '9:00 AM', type: 'Strength' },
    { day: 'Sun', workout: 'Rest Day', time: '-', type: 'Rest' },
  ];

  // Dashboard content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8" />
                  <span className="text-sm font-medium bg-blue-400/30 px-3 py-1 rounded-full">
                    Weekly Goal
                  </span>
                </div>
                <div className="text-3xl font-bold">85%</div>
                <div className="text-blue-100">Goal Completion</div>
                <div className="mt-4 w-full bg-blue-400/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-4/5"></div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8" />
                  <span className="text-sm font-medium bg-green-400/30 px-3 py-1 rounded-full">
                    Streak
                  </span>
                </div>
                <div className="text-3xl font-bold">21 days</div>
                <div className="text-green-100">Current Streak</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8" />
                  <span className="text-sm font-medium bg-purple-400/30 px-3 py-1 rounded-full">
                    Achievements
                  </span>
                </div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-purple-100">Unlocked</div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-4 ${
                        workout.completed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{workout.name}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {workout.duration}
                          <Flame className="h-3 w-3 ml-3 mr-1" /> {workout.calories} cal
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        workout.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {workout.date}
                      </span>
                      {workout.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 ml-3" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'workouts':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Workout Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Strength Training', 'Cardio Burn', 'Yoga & Mobility', 'HIIT Workout'].map((plan, index) => (
                <motion.div
                  key={plan}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{plan}</h4>
                      <p className="text-gray-600 text-sm mt-1">3 sessions per week</p>
                    </div>
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Duration: 45-60 min</span>
                    <span className="font-medium">Difficulty: {['Beginner', 'Intermediate', 'Advanced', 'Expert'][index]}</span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Start Workout
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="space-y-8">
            {/* Nutrition Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Nutrition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {nutritionStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-600 mb-2">{stat.label}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${stat.color} h-2 rounded-full`}
                        style={{ width: `${(parseInt(stat.value) / parseInt(stat.target)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Target: {stat.target}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Suggestions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Meals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Grilled Chicken Salad', calories: 420, protein: '35g', icon: <Apple className="h-5 w-5" /> },
                  { name: 'Protein Smoothie', calories: 280, protein: '25g', icon: <Droplets className="h-5 w-5" /> },
                  { name: 'Quinoa Bowl', calories: 380, protein: '18g', icon: <Flame className="h-5 w-5" /> },
                ].map((meal, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                        {meal.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{meal.calories} cal</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{meal.name}</h4>
                    <div className="text-sm text-gray-600">Protein: {meal.protein}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            {/* Progress Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Progress Tracking</h3>
              <div className="space-y-6">
                {progressMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{metric.label}</span>
                      <span className="text-gray-600">
                        {metric.current} / {metric.target}
                        <span className={`ml-2 ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${metric.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Progress Over Time</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Weight loss trend chart would appear here</p>
                  <p className="text-sm text-gray-500">-1.5kg over the last 30 days</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h3>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    day.type === 'Rest' 
                      ? 'bg-blue-50' 
                      : day.type === 'Cardio'
                      ? 'bg-red-50'
                      : day.type === 'Recovery'
                      ? 'bg-green-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-16 text-center">
                      <div className="font-bold text-gray-900">{day.day}</div>
                      <div className="text-sm text-gray-600">{day.time}</div>
                    </div>
                    <div className="ml-6">
                      <div className="font-bold text-gray-900">{day.workout}</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                        day.type === 'Rest' 
                          ? 'bg-blue-100 text-blue-800' 
                          : day.type === 'Cardio'
                          ? 'bg-red-100 text-red-800'
                          : day.type === 'Recovery'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {day.type}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors">
                    {day.type === 'Rest' ? 'Rest' : 'Start'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a tab to view content</h3>
            <p className="text-gray-600">Choose from overview, workouts, nutrition, progress, or schedule</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="transition-all duration-300"
    >
      {renderTabContent()}
    </motion.div>
  );
};

export default UserDashboard;