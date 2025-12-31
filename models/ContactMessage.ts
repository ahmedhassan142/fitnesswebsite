import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  // Personal Information
  name: string;
  email: string;
  phone?: string;
  
  // Message Content
  subject: string;
  message: string;
  category: 'general' | 'membership' | 'feedback' | 'support' | 'partnership' | 'other';
  
  // Status Tracking
  status: 'pending' | 'read' | 'replied' | 'archived' | 'spam';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string; // Admin/Staff member assigned
  tags: string[];
  
  // Response Tracking
  repliedAt?: Date;
  replyMessage?: string;
  replyBy?: string; // Admin who replied
  
  // Admin Notes
  adminNotes?: string;
  internalNotes?: string;
  
  // Newsletter & Marketing
  newsletterOptIn: boolean;
  marketingOptIn: boolean;
  
  // Technical Metadata
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  pageUrl?: string;
  
  // UTM Parameters (for marketing tracking)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  readAt?: Date;
  archivedAt?: Date;
  
  // Virtuals
  isNew: boolean;
  daysSinceCreation: number;
}

const ContactMessageSchema: Schema = new Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [100, 'Email cannot exceed 100 characters'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      validate: {
        validator: function(v: string) {
          // Allow empty or valid phone numbers
          if (!v) return true;
          // Basic phone validation - adjust based on your needs
          return /^[\+]?[1-9][\d]{0,14}$/.test(v.replace(/[\s\-\(\)]/g, ''));
        },
        message: 'Please enter a valid phone number'
      }
    },
    
    // Message Content
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    category: {
      type: String,
      enum: ['general', 'membership', 'feedback', 'support', 'partnership', 'other'],
      default: 'general',
      index: true,
    },
    
    // Status Tracking
    status: {
      type: String,
      enum: ['pending', 'read', 'replied', 'archived', 'spam'],
      default: 'pending',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    
    // Response Tracking
    repliedAt: {
      type: Date,
    },
    replyMessage: {
      type: String,
      maxlength: [5000, 'Reply cannot exceed 5000 characters'],
    },
    replyBy: {
      type: String,
      trim: true,
    },
    
    // Admin Notes
    adminNotes: {
      type: String,
      maxlength: [2000, 'Admin notes cannot exceed 2000 characters'],
    },
    internalNotes: {
      type: String,
      maxlength: [1000, 'Internal notes cannot exceed 1000 characters'],
    },
    
    // Newsletter & Marketing
    newsletterOptIn: {
      type: Boolean,
      default: false,
    },
    marketingOptIn: {
      type: Boolean,
      default: false,
    },
    
    // Technical Metadata
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    referrer: {
      type: String,
      trim: true,
      maxlength: [500, 'Referrer URL cannot exceed 500 characters'],
    },
    pageUrl: {
      type: String,
      trim: true,
      maxlength: [500, 'Page URL cannot exceed 500 characters'],
    },
    
    // UTM Parameters
    utmSource: {
      type: String,
      trim: true,
    },
    utmMedium: {
      type: String,
      trim: true,
    },
    utmCampaign: {
      type: String,
      trim: true,
    },
    utmTerm: {
      type: String,
      trim: true,
    },
    utmContent: {
      type: String,
      trim: true,
    },
    
    // Timestamps
    readAt: {
      type: Date,
    },
    archivedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: function (doc, ret:any) {
        // Remove internal fields from JSON response
        delete ret.__v;
        delete ret.ipAddress;
        delete ret.userAgent;
        delete ret.internalNotes;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes for better query performance
ContactMessageSchema.index({ email: 1, createdAt: -1 });
ContactMessageSchema.index({ status: 1, createdAt: -1 });
ContactMessageSchema.index({ category: 1, createdAt: -1 });
ContactMessageSchema.index({ priority: 1, createdAt: -1 });
ContactMessageSchema.index({ assignedTo: 1, status: 1 });
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ 'tags': 1 });

// Virtual property to check if message is new (unread for less than 24 hours)
ContactMessageSchema.virtual('isNew').get(function() {
  if (this.status !== 'pending') return false;
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  //@ts-ignore
  return this.createdAt > oneDayAgo;
});

// Virtual property for days since creation
ContactMessageSchema.virtual('daysSinceCreation').get(function() {
  const now = new Date();
   //@ts-ignore
  const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware for data cleaning
ContactMessageSchema.pre('save', function(next) {
  // Clean phone number
  if (this.phone) {
     //@ts-ignore
    this.phone = this.phone.replace(/[\s\-\(\)]/g, '');
  }
  
  // Auto-tag based on category
   //@ts-ignore
  if (this.category && !this.tags.includes(this.category)) {
     //@ts-ignore
    this.tags.push(this.category);
  }
  
  // Auto-tag high priority for certain subjects
  const highPriorityKeywords = ['urgent', 'emergency', 'asap', 'immediately', 'critical'];
   //@ts-ignore
  const subject = this.subject.toLowerCase();
  if (highPriorityKeywords.some(keyword => subject.includes(keyword))) {
    this.priority = 'high';
     //@ts-ignore
    if (!this.tags.includes('urgent')) {
         //@ts-ignore
      this.tags.push('urgent');
    }
  }
  
  // Set readAt timestamp when status changes to 'read'
  if (this.isModified('status') && this.status === 'read' && !this.readAt) {
    this.readAt = new Date();
  }
  
  // Set archivedAt timestamp when status changes to 'archived'
  if (this.isModified('status') && this.status === 'archived' && !this.archivedAt) {
    this.archivedAt = new Date();
  }
  
  // Set repliedAt timestamp when reply is added
  if (this.isModified('replyMessage') && this.replyMessage && !this.repliedAt) {
    this.repliedAt = new Date();
    this.status = 'replied';
  }
   //@ts-ignore
  next();
});

// Static methods for common queries
ContactMessageSchema.statics.findByEmail = function(email: string) {
  return this.find({ email }).sort({ createdAt: -1 });
};

ContactMessageSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ priority: -1, createdAt: 1 });
};

ContactMessageSchema.statics.findUnreplied = function() {
  return this.find({ 
    $or: [
      { status: 'pending' },
      { status: 'read' }
    ]
  }).sort({ priority: -1, createdAt: 1 });
};

ContactMessageSchema.statics.countByStatus = function() {
  return this.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
};

ContactMessageSchema.statics.getStats = async function(startDate?: Date, endDate?: Date) {
  const match: any = {};
  
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = startDate;
    if (endDate) match.createdAt.$lte = endDate;
  }
  
  return this.aggregate([
    { $match: match },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        byCategory: [{ $group: { _id: '$category', count: { $sum: 1 } } }],
        byDay: [
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
        averageResponseTime: [
          {
            $match: { repliedAt: { $exists: true } },
          },
          {
            $addFields: {
              responseTime: {
                $divide: [
                  { $subtract: ['$repliedAt', '$createdAt'] },
                  1000 * 60 * 60, // Convert to hours
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              avgResponseTime: { $avg: '$responseTime' },
              minResponseTime: { $min: '$responseTime' },
              maxResponseTime: { $max: '$responseTime' },
            },
          },
        ],
      },
    },
  ]);
};

// Instance methods
ContactMessageSchema.methods.markAsRead = function(userId?: string) {
  this.status = 'read';
  this.readAt = new Date();
  if (userId) {
    this.assignedTo = userId;
  }
  return this.save();
};

ContactMessageSchema.methods.addReply = function(reply: string, userId: string) {
  this.replyMessage = reply;
  this.replyBy = userId;
  this.status = 'replied';
  return this.save();
};

ContactMessageSchema.methods.addNote = function(note: string, isInternal = false) {
  if (isInternal) {
    this.internalNotes = this.internalNotes 
      ? `${this.internalNotes}\n${new Date().toISOString()}: ${note}`
      : `${new Date().toISOString()}: ${note}`;
  } else {
    this.adminNotes = this.adminNotes 
      ? `${this.adminNotes}\n${new Date().toISOString()}: ${note}`
      : `${new Date().toISOString()}: ${note}`;
  }
  return this.save();
};

ContactMessageSchema.methods.addTag = function(tag: string) {
  const cleanTag = tag.toLowerCase().trim();
  if (!this.tags.includes(cleanTag)) {
    this.tags.push(cleanTag);
  }
  return this.save();
};

// Export the model
export default mongoose.models.ContactMessage || 
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);