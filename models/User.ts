import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'member' | 'trainer' | 'admin';
  membership: mongoose.Types.ObjectId;
  profile: {
    age?: number;
    weight?: number;
    height?: number;
    fitnessGoals: string[];
    preferredWorkoutTime?: string;
  };
  stats: {
    totalWorkouts: number;
    totalHours: number;
    currentStreak: number;
    longestStreak: number;
    lastWorkout?: Date;
  };
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['member', 'trainer', 'admin'],
      default: 'member',
    },
    membership: {
      type: Schema.Types.ObjectId,
      ref: 'Membership',
    },
    profile: {
      age: Number,
      weight: Number,
      height: Number,
      fitnessGoals: [String],
      preferredWorkoutTime: String,
    },
    stats: {
      totalWorkouts: { type: Number, default: 0 },
      totalHours: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      lastWorkout: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);