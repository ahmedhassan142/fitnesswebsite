import mongoose, { Schema, Document } from 'mongoose';

export interface IMembership extends Document {
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  limitations: string[];
  isActive: boolean;
  stripePriceId?: string;
}

const MembershipSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    billingPeriod: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
    features: [{
      type: String,
      required: true,
    }],
    limitations: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    stripePriceId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Membership || 
  mongoose.model<IMembership>('Membership', MembershipSchema);