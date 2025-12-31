import mongoose, { Schema, Document } from 'mongoose';

export interface IMembershipApplication extends Document {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  
  // Membership Details
  membershipPlan: 'basic' | 'premium' | 'ultimate';
  fitnessGoal: string;
  referralSource: string;
  
  // Application Status
  referenceNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  appliedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  trialStartDate?: Date;
  trialEndDate?: Date;
  
  // Tracking
  ipAddress: string;
  userAgent: string;
  metadata: {
    browser?: string;
    platform?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
  
  // Notes
  adminNotes?: string;
  rejectionReason?: string;
}

const MembershipApplicationSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    
    // Membership Details
    membershipPlan: {
      type: String,
      enum: ['basic', 'premium', 'ultimate'],
      required: true,
    },
    fitnessGoal: {
      type: String,
      required: true,
    },
    referralSource: {
      type: String,
      default: 'website',
    },
    
    // Application Status
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'expired'],
      default: 'pending',
      index: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: String,
    },
    trialStartDate: {
      type: Date,
    },
    trialEndDate: {
      type: Date,
    },
    
    // Tracking
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    metadata: {
      browser: String,
      platform: String,
      utmSource: String,
      utmMedium: String,
      utmCampaign: String,
    },
    
    // Notes
    adminNotes: {
      type: String,
      maxlength: 1000,
    },
    rejectionReason: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret:any) {
        delete ret.__v;
        delete ret.ipAddress;
        delete ret.userAgent;
        delete ret.metadata;
        return ret;
      },
    },
  }
);

// Compound index for faster queries
MembershipApplicationSchema.index({ email: 1, status: 1 });
MembershipApplicationSchema.index({ referenceNumber: 1 });
MembershipApplicationSchema.index({ status: 1, appliedAt: -1 });

// Pre-save hook to generate reference number
MembershipApplicationSchema.pre('save', function (next) {
  if (!this.referenceNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.referenceNumber = `IRONPEAK-${timestamp}-${random}`;
  }
  //@ts-ignore
  next();
});

export default mongoose.models.MembershipApplication || 
  mongoose.model<IMembershipApplication>('MembershipApplication', MembershipApplicationSchema);