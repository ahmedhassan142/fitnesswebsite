'use client';

import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Calendar } from 'lucide-react';

interface ClassType {
  id: number;
  name: string;
  time: string;
  duration: string;
  trainer: string;
  capacity: number;
  booked: number;
  intensity: 'Low' | 'Medium' | 'High';
  category: string;
}

const ClassSchedule = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const classes: ClassType[] = [
    {
      id: 1,
      name: 'HIIT Revolution',
      time: '06:00 AM',
      duration: '45 min',
      trainer: 'Alex Johnson',
      capacity: 30,
      booked: 28,
      intensity: 'High',
      category: 'Cardio',
    },
    {
      id: 2,
      name: 'Power Yoga',
      time: '08:00 AM',
      duration: '60 min',
      trainer: 'Sarah Miller',
      capacity: 25,
      booked: 22,
      intensity: 'Medium',
      category: 'Yoga',
    },
    {
      id: 3,
      name: 'Strength & Conditioning',
      time: '05:00 PM',
      duration: '60 min',
      trainer: 'Mike Chen',
      capacity: 20,
      booked: 18,
      intensity: 'High',
      category: 'Strength',
    },
    {
      id: 4,
      name: 'Spin Class',
      time: '06:30 PM',
      duration: '45 min',
      trainer: 'Lisa Rodriguez',
      capacity: 35,
      booked: 32,
      intensity: 'Medium',
      category: 'Cardio',
    },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Weekly Class Schedule
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our variety of classes designed for all fitness levels
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-white p-1 shadow-sm">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Class Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getIntensityColor(cls.intensity)}`}>
                    {cls.intensity}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{cls.name}</h3>
                  <p className="text-sm text-gray-500">{cls.category}</p>
                </div>
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{cls.time} • {cls.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {cls.booked}/{cls.capacity} booked
                  </span>
                  <div className="ml-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Trainer: <span className="font-medium">{cls.trainer}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;