'use client';


import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, Heart } from 'lucide-react';
import CountUp from 'react-countup';

const Stats = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: 2500,
      suffix: '+',
      label: 'Active Members',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      value: 150,
      suffix: '+',
      label: 'Certified Trainers',
      color: 'from-amber-500 to-orange-400',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      value: 100,
      suffix: '+',
      label: 'Weekly Classes',
      color: 'from-emerald-500 to-green-400',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      value: 95,
      suffix: '%',
      label: 'Member Satisfaction',
      color: 'from-rose-500 to-pink-400',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a thriving community dedicated to health and wellness
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;