import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainer extends Document {
  user: mongoose.Types.ObjectId;
  bio: string;
  specialization: string[];
  certifications: string[];
  experience: string;
  rating: number;
  reviews: mongoose.Types.ObjectId[];
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  isActive: boolean;
}

const TrainerSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    specialization: [{
      type: String,
      enum: ['strength', 'cardio', 'yoga', 'hiit', 'nutrition', 'recovery', 'boxing'],
    }],
    certifications: [String],
    experience: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
    social: {
      instagram: String,
      facebook: String,
      twitter: String,
      linkedin: String,
    },
    availability: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      startTime: String,
      endTime: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export default mongoose.models.Trainer || mongoose.model<ITrainer>('Trainer', TrainerSchema);