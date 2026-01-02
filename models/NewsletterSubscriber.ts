import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  // Basic Information
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  
  // Demographics (optional)
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  location?: string;
  
  // Subscription Details
  subscriptionSource: string; // e.g., 'website', 'signup-form', 'checkout', 'event'
  subscriptionPage?: string; // URL where they subscribed
  ipAddress?: string;
  userAgent?: string;
  
  // Preferences & Interests
  preferences: {
    categories: string[]; // Types of content they're interested in
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'daily'; // How often they want emails
    format: 'html' | 'text'; // Preferred email format
    topics: string[]; // Specific topics of interest
  };
  
  // Status & Consent
  status: 'active' | 'unsubscribed' | 'bounced' | 'complained' | 'pending';
  consentGiven: boolean;
  consentTimestamp: Date;
  doubleOptIn: boolean; // Whether they confirmed via email
  gdprCompliant: boolean;
  
  // Email Statistics
  emailStats: {
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
    lastSent?: Date;
    lastOpened?: Date;
    lastClicked?: Date;
    openRate: number; // percentage
    clickRate: number; // percentage
    bounceCount: number;
    complaintCount: number;
  };
  
  // Tags & Segmentation
  tags: string[];
  segments: string[]; // Marketing segments they belong to
  
  // Meta Information
  metadata: {
    browser?: string;
    device?: 'desktop' | 'mobile' | 'tablet';
    os?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };
  
  // Membership Integration
  isMember: boolean;
  membershipType?: 'basic' | 'premium' | 'ultimate' | 'trial';
  memberSince?: Date;
  memberId?: Types.ObjectId;
  
  // Timestamps
  subscribedAt: Date;
  unsubscribedAt?: Date;
  lastUpdated: Date;
  lastActivity: Date;
  
  // Virtuals
  engagementScore: number;
  isHighlyEngaged: boolean;
  daysSinceSubscription: number;
  daysSinceLastActivity: number;
}

const NewsletterSubscriberSchema: Schema = new Schema(
  {
    // Basic Information
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [100, 'Email cannot exceed 100 characters'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    
    // Demographics
    age: {
      type: Number,
      min: [13, 'Age must be at least 13'],
      max: [120, 'Age cannot exceed 120'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    },
    location: {
      type: String,
      trim: true,
    },
    
    // Subscription Details
    subscriptionSource: {
      type: String,
      required: true,
      default: 'website',
      enum: [
        'website',
        'signup-form',
        'checkout',
        'event',
        'referral',
        'social-media',
        'partnership',
        'import',
        'api',
        'other'
      ],
      index: true,
    },
    subscriptionPage: {
      type: String,
      trim: true,
      maxlength: [500, 'Page URL cannot exceed 500 characters'],
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    
    // Preferences & Interests
    preferences: {
      categories: [{
        type: String,
        enum: [
          'workouts',
          'nutrition',
          'recipes',
          'wellness',
          'mindfulness',
          'fitness-tips',
          'success-stories',
          'new-classes',
          'promotions',
          'events',
          'equipment',
          'recovery',
          'motivation',
          'health-news'
        ],
        default: ['workouts', 'nutrition', 'fitness-tips'],
      }],
      frequency: {
        type: String,
        enum: ['weekly', 'bi-weekly', 'monthly', 'daily'],
        default: 'weekly',
      },
      format: {
        type: String,
        enum: ['html', 'text'],
        default: 'html',
      },
      topics: [{
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [50, 'Topic cannot exceed 50 characters'],
      }],
    },
    
    // Status & Consent
    status: {
      type: String,
      required: true,
      enum: ['active', 'unsubscribed', 'bounced', 'complained', 'pending'],
      default: 'pending',
      index: true,
    },
    consentGiven: {
      type: Boolean,
      required: true,
      default: false,
    },
    consentTimestamp: {
      type: Date,
      default: Date.now,
    },
    doubleOptIn: {
      type: Boolean,
      default: false,
    },
    gdprCompliant: {
      type: Boolean,
      default: true,
    },
    
    // Email Statistics
    emailStats: {
      totalSent: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalOpened: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalClicked: {
        type: Number,
        default: 0,
        min: 0,
      },
      lastSent: Date,
      lastOpened: Date,
      lastClicked: Date,
      openRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      clickRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      bounceCount: {
        type: Number,
        default: 0,
        min: 0,
      },
      complaintCount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    
    // Tags & Segmentation
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    segments: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Segment cannot exceed 50 characters'],
    }],
    
    // Meta Information
    metadata: {
      browser: String,
      device: {
        type: String,
        enum: ['desktop', 'mobile', 'tablet'],
      },
      os: String,
      referrer: String,
      utmSource: String,
      utmMedium: String,
      utmCampaign: String,
      utmTerm: String,
      utmContent: String,
    },
    
    // Membership Integration
    isMember: {
      type: Boolean,
      default: false,
      index: true,
    },
    membershipType: {
      type: String,
      enum: ['basic', 'premium', 'ultimate', 'trial'],
    },
    memberSince: Date,
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    
    // Timestamps
    subscribedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    unsubscribedAt: Date,
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret:any) {
        // Remove internal/technical fields from JSON response
        delete ret.__v;
        delete ret.ipAddress;
        delete ret.userAgent;
        delete ret.metadata;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Pre-save middleware
NewsletterSubscriberSchema.pre('save', function(next) {
  // Update full name if first/last name provided
  if (this.firstName || this.lastName) {
    this.fullName = [this.firstName, this.lastName].filter(Boolean).join(' ');
  }
  
  // Update lastUpdated timestamp
  this.lastUpdated = new Date();
  
  // Update lastActivity if email stats changed
  if (this.isModified('emailStats')) {
    this.lastActivity = new Date();
  }
  
  // Update engagement metrics
  //@ts-ignore
  if (this.emailStats.totalSent > 0) {
     //@ts-ignore
    this.emailStats.openRate = (this.emailStats.totalOpened / this.emailStats.totalSent) * 100;
     //@ts-ignore
    this.emailStats.clickRate = (this.emailStats.totalClicked / this.emailStats.totalSent) * 100;
  }
  
  // Auto-populate tags based on preferences
   //@ts-ignore
  if (this.preferences.categories) {
     //@ts-ignore
    this.preferences.categories.forEach(category => {
      const tag = `interest-${category}`;
       //@ts-ignore
      if (!this.tags.includes(tag)) {
         //@ts-ignore
        this.tags.push(tag);
      }
    });
  }
  
  // Add source tag
  const sourceTag = `source-${this.subscriptionSource}`;
   //@ts-ignore
  if (!this.tags.includes(sourceTag)) {
     //@ts-ignore
    this.tags.push(sourceTag);
  }
  
  // Add frequency tag
   //@ts-ignore
  const frequencyTag = `frequency-${this.preferences.frequency}`;
   //@ts-ignore
  if (!this.tags.includes(frequencyTag)) {
     //@ts-ignore
    this.tags.push(frequencyTag);
  }
  
  // Add member tag if applicable
   //@ts-ignore
  if (this.isMember && !this.tags.includes('member')) {
     //@ts-ignore
    this.tags.push('member');
    if (this.membershipType) {
         //@ts-ignore
      this.tags.push(`member-${this.membershipType}`);
    }
  }
  
  // Set doubleOptIn to true if status changes from pending to active
  if (this.isModified('status') && this.status === 'active' && !this.doubleOptIn) {
    this.doubleOptIn = true;
  }
  
  // Set unsubscribedAt when status changes to unsubscribed
  if (this.isModified('status') && this.status === 'unsubscribed' && !this.unsubscribedAt) {
    this.unsubscribedAt = new Date();
  }
   //@ts-ignore
  next();
});

// Virtual Properties
NewsletterSubscriberSchema.virtual('engagementScore').get(function() {
  const score = {
     //@ts-ignore
    opens: this.emailStats.openRate / 10,
     //@ts-ignore // Convert percentage to score
    clicks: this.emailStats.clickRate * 2, // Weight clicks more heavily
    recency: 0,
    frequency: 0,
  };
  
  // Recency score (recent activity gets higher score)
  if (this.lastActivity) {
     //@ts-ignore
    const daysSinceActivity = (Date.now() - this.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
    score.recency = Math.max(0, 10 - (daysSinceActivity / 10));
  }
  
  // Frequency score
   //@ts-ignore
  if (this.emailStats.totalSent > 0) {
     //@ts-ignore
    const daysSinceSubscription = (Date.now() - this.subscribedAt.getTime()) / (1000 * 60 * 60 * 24);
     //@ts-ignore
    const emailsPerDay = this.emailStats.totalSent / daysSinceSubscription;
    score.frequency = Math.min(10, emailsPerDay * 100);
  }
  
  const totalScore = (score.opens + score.clicks + score.recency + score.frequency) / 4;
  return Math.min(100, Math.max(0, totalScore));
});

NewsletterSubscriberSchema.virtual('isHighlyEngaged').get(function() {
     //@ts-ignore
  return this.engagementScore >= 70 && this.emailStats.openRate >= 30;
});

NewsletterSubscriberSchema.virtual('daysSinceSubscription').get(function() {
  const now = new Date();
   //@ts-ignore
  const diffTime = Math.abs(now.getTime() - this.subscribedAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

NewsletterSubscriberSchema.virtual('daysSinceLastActivity').get(function() {
  if (!this.lastActivity) return null;
  const now = new Date();
   //@ts-ignore
  const diffTime = Math.abs(now.getTime() - this.lastActivity.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Static Methods
NewsletterSubscriberSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

NewsletterSubscriberSchema.statics.findByCategory = function(category: string) {
  return this.find({ 
    status: 'active',
    'preferences.categories': category 
  });
};

NewsletterSubscriberSchema.statics.findEngaged = function(minScore = 70) {
  return this.find({ 
    status: 'active',
    'emailStats.openRate': { $gte: 30 }
  });
};

NewsletterSubscriberSchema.statics.getStats = async function() {
  return this.aggregate([
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        bySource: [{ $group: { _id: '$subscriptionSource', count: { $sum: 1 } } }],
        byFrequency: [{ $group: { _id: '$preferences.frequency', count: { $sum: 1 } } }],
        membersVsNonMembers: [
          { $group: { _id: '$isMember', count: { $sum: 1 } } }
        ],
        growthByMonth: [
          {
            $group: {
              _id: {
                year: { $year: '$subscribedAt' },
                month: { $month: '$subscribedAt' },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } },
        ],
        averageEngagement: [
          { $match: { status: 'active' } },
          {
            $group: {
              _id: null,
              avgOpenRate: { $avg: '$emailStats.openRate' },
              avgClickRate: { $avg: '$emailStats.clickRate' },
              totalSubscribers: { $sum: 1 },
            },
          },
        ],
        topCategories: [
          { $unwind: '$preferences.categories' },
          { $group: { _id: '$preferences.categories', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ],
      },
    },
  ]);
};

NewsletterSubscriberSchema.statics.importFromCSV = async function(csvData: any[]) {
  const operations = csvData.map(record => ({
    updateOne: {
      filter: { email: record.email.toLowerCase() },
      update: { $setOnInsert: record },
      upsert: true,
    },
  }));
  
  return this.bulkWrite(operations);
};

NewsletterSubscriberSchema.statics.findUnengaged = function(daysInactive = 90) {
  const cutoffDate = new Date(Date.now() - daysInactive * 24 * 60 * 60 * 1000);
  
  return this.find({
    status: 'active',
    $or: [
      { lastActivity: { $lt: cutoffDate } },
      { lastActivity: { $exists: false } },
    ],
  });
};

// Instance Methods
NewsletterSubscriberSchema.methods.confirmSubscription = function() {
  this.status = 'active';
  this.doubleOptIn = true;
  this.consentGiven = true;
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.unsubscribe = function(reason?: string) {
  this.status = 'unsubscribed';
  this.unsubscribedAt = new Date();
  this.lastActivity = new Date();
  
  if (reason) {
    if (!this.tags.includes(`unsubscribed-${reason}`)) {
      this.tags.push(`unsubscribed-${reason}`);
    }
  }
  
  return this.save();
};

NewsletterSubscriberSchema.methods.resubscribe = function() {
  if (this.status === 'unsubscribed') {
    this.status = 'active';
    this.unsubscribedAt = undefined;
    this.lastActivity = new Date();
    return this.save();
  }
  return Promise.resolve(this);
};

NewsletterSubscriberSchema.methods.recordEmailSent = function() {
  this.emailStats.totalSent += 1;
  this.emailStats.lastSent = new Date();
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.recordEmailOpened = function() {
  this.emailStats.totalOpened += 1;
  this.emailStats.lastOpened = new Date();
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.recordEmailClicked = function() {
  this.emailStats.totalClicked += 1;
  this.emailStats.lastClicked = new Date();
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.recordBounce = function() {
  this.emailStats.bounceCount += 1;
  this.lastActivity = new Date();
  
  // If multiple bounces, mark as bounced
  if (this.emailStats.bounceCount >= 3) {
    this.status = 'bounced';
  }
  
  return this.save();
};

NewsletterSubscriberSchema.methods.recordComplaint = function() {
  this.emailStats.complaintCount += 1;
  this.status = 'complained';
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.updatePreferences = function(newPreferences: any) {
  if (newPreferences.categories) {
    this.preferences.categories = newPreferences.categories;
  }
  if (newPreferences.frequency) {
    this.preferences.frequency = newPreferences.frequency;
  }
  if (newPreferences.format) {
    this.preferences.format = newPreferences.format;
  }
  if (newPreferences.topics) {
    this.preferences.topics = newPreferences.topics;
  }
  
  this.lastActivity = new Date();
  return this.save();
};

NewsletterSubscriberSchema.methods.addTag = function(tag: string) {
  const cleanTag = tag.toLowerCase().trim();
  if (!this.tags.includes(cleanTag)) {
    this.tags.push(cleanTag);
  }
  return this.save();
};

NewsletterSubscriberSchema.methods.addToSegment = function(segment: string) {
  const cleanSegment = segment.toLowerCase().trim();
  if (!this.segments.includes(cleanSegment)) {
    this.segments.push(cleanSegment);
  }
  return this.save();
};

// Indexes for better query performance
NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });
NewsletterSubscriberSchema.index({ status: 1, subscribedAt: -1 });
NewsletterSubscriberSchema.index({ 'preferences.categories': 1 });
NewsletterSubscriberSchema.index({ tags: 1 });
NewsletterSubscriberSchema.index({ segments: 1 });
NewsletterSubscriberSchema.index({ isMember: 1 });
NewsletterSubscriberSchema.index({ lastActivity: -1 });
NewsletterSubscriberSchema.index({ 'emailStats.openRate': -1 });
NewsletterSubscriberSchema.index({ subscribedAt: -1 });

// Export the model
export default mongoose.models.NewsletterSubscriber || 
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);