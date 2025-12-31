'use client';

import React, { useState } from 'react';
import { Flame, Footprints, Target, TrendingUp } from 'lucide-react';

interface FitnessMetrics {
  steps: number;
  calories: number;
  activeMinutes: number;
  goal: number;
}

interface TrackerProps {
  initialMetrics?: Partial<FitnessMetrics>;
}

const FitnessTracker: React.FC<TrackerProps> = ({ 
  initialMetrics = {} 
}) => {
  const [metrics, setMetrics] = useState<FitnessMetrics>({
    steps: initialMetrics.steps || 8432,
    calories: initialMetrics.calories || 420,
    activeMinutes: initialMetrics.activeMinutes || 75,
    goal: initialMetrics.goal || 10000,
  });

  const progress = (metrics.steps / metrics.goal) * 100;

  const handleAddSteps = (additionalSteps: number) => {
    setMetrics(prev => ({
      ...prev,
      steps: prev.steps + additionalSteps,
      calories: prev.calories + (additionalSteps * 0.04),
      activeMinutes: prev.activeMinutes + Math.floor(additionalSteps / 100),
    }));
  };

  const resetTracker = () => {
    setMetrics({
      steps: 0,
      calories: 0,
      activeMinutes: 0,
      goal: 10000,
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold">Daily Fitness Tracker</h3>
          <p className="text-gray-400">Track your daily activity and progress</p>
        </div>
        <TrendingUp className="h-8 w-8 text-red-400" />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Daily Goal Progress</span>
          <span>{Math.min(progress, 100).toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Footprints className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-gray-400">Steps</span>
          </div>
          <div className="text-2xl font-bold">{metrics.steps.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Goal: {metrics.goal.toLocaleString()}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Flame className="h-5 w-5 text-red-400" />
            <span className="text-sm text-gray-400">Calories</span>
          </div>
          <div className="text-2xl font-bold">{metrics.calories.toFixed(0)}</div>
          <div className="text-xs text-gray-400">KCAL burned</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-green-400" />
            <span className="text-sm text-gray-400">Active</span>
          </div>
          <div className="text-2xl font-bold">{metrics.activeMinutes}</div>
          <div className="text-xs text-gray-400">Minutes</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Remaining</div>
          <div className="text-2xl font-bold">
            {Math.max(0, metrics.goal - metrics.steps).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Steps to goal</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => handleAddSteps(1000)}
          className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          +1,000 Steps
        </button>
        <button
          onClick={() => handleAddSteps(5000)}
          className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
        >
          +5,000 Steps
        </button>
        <button
          onClick={resetTracker}
          className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FitnessTracker;