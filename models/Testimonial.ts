import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITestimonial extends Document {
  // Personal Information
  name: string;
  role?: string; // e.g., "Software Engineer", "Stay-at-home Parent"
  location?: string;
  age?: number;
  
  // Contact & Social
  email?: string;
  phone?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  
  // Testimonial Content
  title: string;
  content: string;
  shortContent?: string; // For cards/previews
  
  // Media
  profileImage?: string;
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  
  // Transformation Details
  transformation?: {
    beforeWeight?: number;
    afterWeight?: number;
    weightLoss?: number;
    beforeMeasurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      thighs?: number;
    };
    afterMeasurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      thighs?: number;
    };
    duration: string; // e.g., "6 months", "12 weeks"
    startDate?: Date;
    endDate?: Date;
  };
  
  // Categories & Tags
  categories: string[];
  tags: string[];
  
  // Fitness Goals
  goals: string[];
  achievements: string[];
  
  // Ratings & Metrics
  rating: number; // 1-5
  metrics: {
    strengthImprovement?: number; // percentage
    enduranceImprovement?: number;
    flexibilityImprovement?: number;
    consistencyScore?: number; // 1-10
  };
  
  // Program Details
  program?: {
    type: string; // e.g., "Personal Training", "HIIT Classes", "Yoga"
    trainer?: Types.ObjectId; // Reference to trainer
    duration: string;
    sessionsPerWeek?: number;
  };
  
  // Status & Visibility
  status: 'pending' | 'approved' | 'rejected' | 'draft' | 'featured';
  featuredLevel: 'none' | 'homepage' | 'landing' | 'social'; // Where it's featured
  visibility: 'public' | 'private' | 'members-only';
  
  // Approval & Verification
  approvedAt?: Date;
  approvedBy?: Types.ObjectId;
  verified: boolean; // Verified as authentic
  verificationNotes?: string;
  
  // Engagement Metrics
  likes: number;
  shares: number;
  views: number;
  comments: Types.ObjectId[]; // Reference to comments
  
  // SEO & Marketing
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  
  // Admin
  adminNotes?: string;
  internalTags?: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  
  // Virtuals
  isVerified: boolean;
  hasTransformation: boolean;
  daysSincePublished: number;
}

const TestimonialSchema: Schema = new Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    location: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: [13, 'Age must be at least 13'],
      max: [120, 'Age cannot exceed 120'],
    },
    
    // Contact & Social
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
    },
    socialLinks: {
      instagram: String,
      facebook: String,
      twitter: String,
      linkedin: String,
    },
    
    // Testimonial Content
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [50, 'Content must be at least 50 characters'],
      maxlength: [2000, 'Content cannot exceed 2000 characters'],
    },
    shortContent: {
      type: String,
      trim: true,
      maxlength: [300, 'Short content cannot exceed 300 characters'],
    },
    
    // Media
    profileImage: {
      type: String,
      trim: true,
    },
    beforeImage: {
      type: String,
      trim: true,
    },
    afterImage: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|.*\.mp4)/,
        'Please enter a valid video URL (YouTube, Vimeo, or MP4)'
      ],
    },
    
    // Transformation Details
    transformation: {
      beforeWeight: {
        type: Number,
        min: [30, 'Weight must be at least 30kg'],
        max: [300, 'Weight cannot exceed 300kg'],
      },
      afterWeight: {
        type: Number,
        min: [30, 'Weight must be at least 30kg'],
        max: [300, 'Weight cannot exceed 300kg'],
      },
      weightLoss: Number,
      beforeMeasurements: {
        chest: Number,
        waist: Number,
        hips: Number,
        arms: Number,
        thighs: Number,
      },
      afterMeasurements: {
        chest: Number,
        waist: Number,
        hips: Number,
        arms: Number,
        thighs: Number,
      },
      duration: {
        type: String,
        required: true,
        default: 'Not specified',
      },
      startDate: Date,
      endDate: Date,
    },
    
    // Categories & Tags
    categories: [{
      type: String,
      enum: [
        'weight-loss', 
        'muscle-gain', 
        'strength', 
        'endurance', 
        'recovery', 
        'wellness',
        'athlete', 
        'beginner', 
        'senior', 
        'prenatal', 
        'postnatal',
        'transformation', 
        'community', 
        'mental-health'
      ],
      index: true,
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    
    // Fitness Goals
    goals: [{
      type: String,
      trim: true,
      maxlength: [100, 'Goal cannot exceed 100 characters'],
    }],
    achievements: [{
      type: String,
      trim: true,
      maxlength: [200, 'Achievement cannot exceed 200 characters'],
    }],
    
    // Ratings & Metrics
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      default: 5,
    },
    metrics: {
      strengthImprovement: {
        type: Number,
        min: [0, 'Improvement must be at least 0%'],
        max: [500, 'Improvement cannot exceed 500%'],
      },
      enduranceImprovement: {
        type: Number,
        min: [0, 'Improvement must be at least 0%'],
        max: [500, 'Improvement cannot exceed 500%'],
      },
      flexibilityImprovement: {
        type: Number,
        min: [0, 'Improvement must be at least 0%'],
        max: [500, 'Improvement cannot exceed 500%'],
      },
      consistencyScore: {
        type: Number,
        min: [1, 'Consistency score must be at least 1'],
        max: [10, 'Consistency score cannot exceed 10'],
      },
    },
    
    // Program Details
    program: {
      type: {
        type: String,
        trim: true,
        maxlength: [100, 'Program type cannot exceed 100 characters'],
      },
      trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
      },
      duration: String,
      sessionsPerWeek: Number,
    },
    
    // Status & Visibility
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'draft', 'featured'],
      default: 'pending',
      index: true,
    },
    featuredLevel: {
      type: String,
      enum: ['none', 'homepage', 'landing', 'social'],
      default: 'none',
      index: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'members-only'],
      default: 'public',
    },
    
    // Approval & Verification
    approvedAt: Date,
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationNotes: {
      type: String,
      maxlength: [500, 'Verification notes cannot exceed 500 characters'],
    },
    
    // Engagement Metrics
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
    shares: {
      type: Number,
      default: 0,
      min: [0, 'Shares cannot be negative'],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, 'Views cannot be negative'],
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    
    // SEO & Marketing
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'],
    },
    
    // Admin
    adminNotes: {
      type: String,
      maxlength: [1000, 'Admin notes cannot exceed 1000 characters'],
    },
    internalTags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret:any) {
        // Remove internal fields from JSON response
        delete ret.__v;
        delete ret.internalTags;
        delete ret.adminNotes;
        delete ret.verificationNotes;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Pre-save middleware
TestimonialSchema.pre('save', function(next) {
  // Generate weight loss if before/after weights provided
  //@ts-ignore
  if (this.transformation?.beforeWeight && this.transformation?.afterWeight) {
    //@ts-ignore
    this.transformation.weightLoss = this.transformation.beforeWeight - this.transformation.afterWeight;
  }
  
  // Generate short content if not provided
  if (!this.shortContent && this.content) {
    //@ts-ignore
    this.shortContent = this.content.substring(0, 250) + (this.content.length > 250 ? '...' : '');
  }
  
  // Auto-generate meta fields if not provided
  if (!this.metaTitle) {
    this.metaTitle = `${this.name}'s Transformation Story - ${this.title}`;
  }
  
  if (!this.metaDescription) {
    //@ts-ignore
    this.metaDescription = this.shortContent || this.content.substring(0, 150);
  }
  
  // Generate slug if not provided
  if (!this.slug) {
    //@ts-ignore
    const baseSlug = `${this.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-6)}`;
    this.slug = baseSlug.replace(/--+/g, '-').replace(/^-|-$/g, '');
  }
  
  // Auto-populate categories from tags
  //@ts-ignore
  if (this.tags && this.tags.length > 0) {
    const tagToCategoryMap: Record<string, string> = {
      'weightloss': 'weight-loss',
      'muscle': 'muscle-gain',
      'strong': 'strength',
      'cardio': 'endurance',
      'injury': 'recovery',
      'yoga': 'wellness',
      'athlete': 'athlete',
      'newbie': 'beginner',
      'elderly': 'senior',
      'pregnancy': 'prenatal',
      'mother': 'postnatal',
      'transformation': 'transformation',
      'community': 'community',
      'mental': 'mental-health',
    };
    //@ts-ignore
    this.tags.forEach(tag => {
      const category = tagToCategoryMap[tag];
      //@ts-ignore
      if (category && !this.categories.includes(category)) {
        //@ts-ignore
        this.categories.push(category);
      }
    });
  }
  
  // Set publishedAt when status changes to approved/featured
  if (this.isModified('status') && 
      (this.status === 'approved' || this.status === 'featured') && 
      !this.publishedAt) {
    this.publishedAt = new Date();
  }
  //@ts-ignore
  
  next();
});

// Virtual Properties
TestimonialSchema.virtual('isVerified').get(function() {
  return this.verified;
});

TestimonialSchema.virtual('hasTransformation').get(function() {
  return !!(this.beforeImage && this.afterImage);
});

TestimonialSchema.virtual('daysSincePublished').get(function() {
  if (!this.publishedAt) return null;
  const now = new Date();
  //@ts-ignore
  const diffTime = Math.abs(now.getTime() - this.publishedAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Static Methods
TestimonialSchema.statics.findApproved = function() {
  return this.find({ 
    $or: [
      { status: 'approved' },
      { status: 'featured' }
    ]
  });
};

TestimonialSchema.statics.findFeatured = function(level?: string) {
  const query: any = { status: 'featured' };
  if (level) query.featuredLevel = level;
  return this.find(query);
};

TestimonialSchema.statics.findByCategory = function(category: string) {
  return this.find({ 
    categories: category,
    $or: [
      { status: 'approved' },
      { status: 'featured' }
    ]
  });
};

TestimonialSchema.statics.findWithTransformations = function() {
  return this.find({ 
    $and: [
      { beforeImage: { $exists: true, $ne: null } },
      { afterImage: { $exists: true, $ne: null } },
      {
        $or: [
          { status: 'approved' },
          { status: 'featured' }
        ]
      }
    ]
  });
};

TestimonialSchema.statics.getStats = async function() {
  return this.aggregate([
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        byCategory: [
          { $unwind: '$categories' },
          { $group: { _id: '$categories', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ],
        averageRating: [
          {
            $group: {
              _id: null,
              avgRating: { $avg: '$rating' },
              totalTestimonials: { $sum: 1 },
            },
          },
        ],
        topTags: [
          { $unwind: '$tags' },
          { $group: { _id: '$tags', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ],
        withTransformations: [
          {
            $match: {
              beforeImage: { $exists: true, $ne: null },
              afterImage: { $exists: true, $ne: null },
            },
          },
          { $count: 'count' },
        ],
      },
    },
  ]);
};

TestimonialSchema.statics.searchTestimonials = function(searchTerm: string) {
  return this.find({
    $and: [
      {
        $or: [
          { status: 'approved' },
          { status: 'featured' }
        ]
      },
      {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ]
      }
    ]
  });
};

// Instance Methods
TestimonialSchema.methods.approve = function(adminId: Types.ObjectId, notes?: string) {
  this.status = 'approved';
  this.approvedAt = new Date();
  this.approvedBy = adminId;
  if (notes) this.adminNotes = notes;
  return this.save();
};

TestimonialSchema.methods.feature = function(level: 'homepage' | 'landing' | 'social') {
  this.status = 'featured';
  this.featuredLevel = level;
  this.approvedAt = new Date();
  return this.save();
};

TestimonialSchema.methods.verify = function(notes?: string) {
  this.verified = true;
  if (notes) this.verificationNotes = notes;
  return this.save();
};

TestimonialSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

TestimonialSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

TestimonialSchema.methods.addComment = function(commentId: Types.ObjectId) {
  this.comments.push(commentId);
  return this.save();
};

// Indexes for better query performance
TestimonialSchema.index({ slug: 1 }, { unique: true });
TestimonialSchema.index({ status: 1, publishedAt: -1 });
TestimonialSchema.index({ categories: 1, publishedAt: -1 });
TestimonialSchema.index({ rating: -1, publishedAt: -1 });
TestimonialSchema.index({ featuredLevel: 1, publishedAt: -1 });
TestimonialSchema.index({ tags: 1 });
TestimonialSchema.index({ 'program.trainer': 1 });
TestimonialSchema.index({ name: 'text', title: 'text', content: 'text' });

// Export the model
export default mongoose.models.Testimonial || 
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);