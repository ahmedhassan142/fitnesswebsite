import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'yoga' | 'hiit' | 'recovery' | 'boxing';
  trainer: mongoose.Types.ObjectId;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
  };
  capacity: number;
  booked: number;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  requirements: string[];
  isActive: boolean;
}

const ClassSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'yoga', 'hiit', 'recovery', 'boxing'],
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Trainer',
      required: true,
    },
    schedule: {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
        min: 15,
        max: 120,
      },
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    booked: {
      type: Number,
      default: 0,
      min: 0,
    },
    intensity: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    equipment: [String],
    requirements: [String],
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

// Virtual for checking availability
ClassSchema.virtual('availableSpots').get(function () {
  //@ts-ignore
  return this.capacity - this.booked;
});

// Virtual for checking if class is full
ClassSchema.virtual('isFull').get(function () {
  //@ts-ignore
  return this.booked >= this.capacity;
});

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);