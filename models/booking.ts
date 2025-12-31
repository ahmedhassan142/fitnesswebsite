import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  bookingDate: Date;
  participants: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
}

const BookingSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
      index: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      index: true,
    },
    participants: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 1,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Compound index for unique bookings per user per class per date
BookingSchema.index({ user: 1, class: 1, bookingDate: 1 }, { unique: true });

// Pre-save validation to check class capacity
BookingSchema.pre('save', async function (next) {
  if (this.isModified('participants') || this.isNew) {
    const Class = mongoose.model('Class');
    const classDoc = await Class.findById(this.class);
    
    if (!classDoc) {
      return next(new Error('Class not found'));
    }
    
    const existingBookings = await mongoose.models.Booking.countDocuments({
      class: this.class,
      bookingDate: this.bookingDate,
      status: { $ne: 'cancelled' },
    });
    
    if (existingBookings + this.participants > classDoc.capacity) {
      return next(new Error('Not enough spots available'));
    }
  }
  next();
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);