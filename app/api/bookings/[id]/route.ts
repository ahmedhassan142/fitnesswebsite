import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Class from '@/models/Class';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const booking = await Booking.findById(params.id)
      .populate('class', 'name category schedule intensity capacity')
      .populate('user', 'name email')
      .lean();
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Get booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Handle cancellation
    if (body.status === 'cancelled' && booking.status !== 'cancelled') {
      // Update class booked count
      await Class.findByIdAndUpdate(booking.class, {
        $inc: { booked: -booking.participants },
      });
    }
    
    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('class', 'name');
    
    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Update class booked count before deleting
    await Class.findByIdAndUpdate(booking.class, {
      $inc: { booked: -booking.participants },
    });
    
    await Booking.findByIdAndDelete(params.id);
    
    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}