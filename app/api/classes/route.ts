import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Class from '@/models/Class';
import Trainer from '@/models/Trainer';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const day = searchParams.get('day');
    const intensity = searchParams.get('intensity');
    const trainer = searchParams.get('trainer');
    const isActive = searchParams.get('isActive') !== 'false';
    
    const query: any = { isActive };
    
    if (category) query.category = category;
    if (day) query['schedule.day'] = day;
    if (intensity) query.intensity = intensity;
    if (trainer) query.trainer = trainer;
    
    const classes = await Class.find(query)
      .populate('trainer', 'name specialization rating')
      .sort({ 'schedule.day': 1, 'schedule.startTime': 1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: classes,
      count: classes.length,
    });
  } catch (error) {
    console.error('Get classes error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check authentication and admin role
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    
    const body = await request.json();
    
    // Validate trainer exists
    const trainerExists = await Trainer.findById(body.trainer);
    if (!trainerExists) {
      return NextResponse.json(
        { success: false, error: 'Trainer not found' },
        { status: 404 }
      );
    }
    
    const newClass = await Class.create(body);
    
    return NextResponse.json({
      success: true,
      message: 'Class created successfully',
      data: newClass,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create class error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Class with this name already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create class' },
      { status: 500 }
    );
  }
}