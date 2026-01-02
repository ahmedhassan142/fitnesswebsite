import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/booking';
import Class from '@/models/Class';
import { z } from 'zod';

const bookingSchema = z.object({
  classId: z.string().min(1, 'Class ID is required'),
  bookingDate: z.string().datetime(),
  participants: z.number().min(1).max(10),
  notes: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);
    
    // Check if class exists and is active
    const classDoc = await Class.findById(validatedData.classId);
    if (!classDoc || !classDoc.isActive) {
      return NextResponse.json(
        { success: false, error: 'Class not found or inactive' },
        { status: 404 }
      );
    }
    
    // Check capacity
    const existingBookings = await Booking.countDocuments({
      class: validatedData.classId,
      bookingDate: new Date(validatedData.bookingDate),
      status: { $ne: 'cancelled' },
    });
    
    if (existingBookings + validatedData.participants > classDoc.capacity) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not enough spots available',
          availableSpots: classDoc.capacity - existingBookings,
        },
        { status: 400 }
      );
    }
    
    // In production, get user from session
    const userId = 'mock-user-id'; // Replace with actual user from session
    
    const booking = await Booking.create({
      user: userId,
      class: validatedData.classId,
      bookingDate: new Date(validatedData.bookingDate),
      participants: validatedData.participants,
      notes: validatedData.notes,
      status: 'confirmed',
    });
    
    // Update class booked count
    await Class.findByIdAndUpdate(validatedData.classId, {
      $inc: { booked: validatedData.participants },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Booking confirmed!',
      data: booking,
      receipt: {
        bookingId: booking._id,
        className: classDoc.name,
        date: booking.bookingDate,
        participants: booking.participants,
        status: booking.status,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          //@ts-ignore
          details: error.errors 
        },
        { status: 400 }
      );
    }
    //@ts-ignore
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'You already have a booking for this class' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const query: any = {};
    
    if (userId) query.user = userId;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.bookingDate = {};
      if (startDate) query.bookingDate.$gte = new Date(startDate);
      if (endDate) query.bookingDate.$lte = new Date(endDate);
    }
    
    const bookings = await Booking.find(query)
      .populate('class', 'name category schedule intensity')
      .populate('user', 'name email')
      .sort({ bookingDate: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}