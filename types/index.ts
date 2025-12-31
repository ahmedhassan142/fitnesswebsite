// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  membership: Membership | null;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  preferredWorkoutTime: string;
  fitnessGoals: string[];
}

export interface UserStats {
  totalWorkouts: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

// Membership Types
export interface Membership {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  type: 'card' | 'paypal';
  lastFour?: string;
  expiryDate?: string;
}

// Class Types
export interface Class {
  id: number;
  name: string;
  category: ClassCategory;
  time: string;
  duration: number; // in minutes
  trainerId: string;
  capacity: number;
  booked: number;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  image: string;
  equipment: string[];
  requirements: string[];
}

export type ClassCategory = 
  | 'strength' 
  | 'cardio' 
  | 'yoga' 
  | 'hiit' 
  | 'recovery' 
  | 'boxing' 
  | 'dance';

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  classId: number;
  date: Date;
  participants: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  notes?: string;
}

// Trainer Types
export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: TrainerSpecialization[];
  experience: string;
  certifications: string[];
  rating: number;
  reviews: number;
  bio: string;
  image: string;
  social: SocialLinks;
  availability: TrainerAvailability[];
}

export type TrainerSpecialization = 
  | 'strength' 
  | 'cardio' 
  | 'yoga' 
  | 'hiit' 
  | 'nutrition' 
  | 'recovery' 
  | 'boxing';

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  email: string;
}

export interface TrainerAvailability {
  day: string;
  startTime: string;
  endTime: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  classId: number;
  date: string;
  participants: number;
  notes?: string;
}

// Dashboard Types
export interface DashboardStats {
  weeklyWorkouts: number;
  weeklyHours: number;
  caloriesBurned: number;
  goalsCompleted: number;
  upcomingClasses: number;
  membershipDaysLeft: number;
}

export interface WorkoutLog {
  id: string;
  date: Date;
  duration: number;
  type: string;
  calories: number;
  exercises: Exercise[];
  notes?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
}