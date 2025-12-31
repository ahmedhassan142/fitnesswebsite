import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/models/MembershipApplication';

// This is a protected API route - add authentication in production
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Add authentication check in production
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'appliedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    const skip = (page - 1) * limit;
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    
    const [applications, total] = await Promise.all([
      MembershipApplication.find({ status })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v -ipAddress -userAgent')
        .lean(),
      MembershipApplication.countDocuments({ status }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    // Add authentication check
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const body = await request.json();
    const { applicationId, status, notes, trialStartDate } = body;
    
    if (!applicationId || !status) {
      return NextResponse.json(
        { success: false, error: 'Application ID and status required' },
        { status: 400 }
      );
    }
    
    const updateData: any = {
      status,
      reviewedAt: new Date(),
      // In production, use actual admin user ID
      reviewedBy: 'admin@ironpeakfitness.com',
    };
    
    if (notes) updateData.adminNotes = notes;
    
    // If approving, set trial dates
    if (status === 'approved') {
      const startDate = trialStartDate ? new Date(trialStartDate) : new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7); // 7-day trial
      
      updateData.trialStartDate = startDate;
      updateData.trialEndDate = endDate;
    }
    
    // If rejecting, add reason
    if (status === 'rejected' && body.rejectionReason) {
      updateData.rejectionReason = body.rejectionReason;
    }
    
    const application = await MembershipApplication.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v -ipAddress -userAgent');
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Application ${status} successfully`,
      data: application,
    });
    
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}