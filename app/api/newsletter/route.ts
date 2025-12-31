import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  preferences: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);
    
    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({
      email: validatedData.email,
    });
    
    if (existing) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Already subscribed',
          message: 'You are already subscribed to our newsletter.' 
        },
        { status: 400 }
      );
    }
    
    const subscriber = await NewsletterSubscriber.create({
      ...validatedData,
      status: 'active',
      subscribedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });
    
    // Send welcome email (implement with your email service)
    // await sendWelcomeEmail(subscriber.email);
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email: subscriber.email,
        preferences: subscriber.preferences,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Only admin should access this
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    const skip = (page - 1) * limit;
    
    const [subscribers, total] = await Promise.all([
      NewsletterSubscriber.find({ status })
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NewsletterSubscriber.countDocuments({ status }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}