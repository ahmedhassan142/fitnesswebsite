import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/models/MembershipApplication';
import { sendWelcomeEmail } from '@/lib/email';
import { z } from 'zod';

// Schema validation for form data
const joinFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  membershipPlan: z.enum(['basic', 'premium', 'ultimate']),
  fitnessGoal: z.string(),
  referralSource: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate form data
    const validatedData = joinFormSchema.parse(body);
    
    // Check if user already applied
    const existingApplication = await MembershipApplication.findOne({
      email: validatedData.email,
      status: { $in: ['pending', 'approved'] },
    });
    
    if (existingApplication) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'You already have an active application. Our team will contact you soon.' 
        },
        { status: 400 }
      );
    }
    
    // Generate unique reference number
    const referenceNumber = `IRONPEAK-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Create membership application in database
    const application = await MembershipApplication.create({
      ...validatedData,
      referenceNumber,
      status: 'pending',
      appliedAt: new Date(),
      trialStartDate: null, // Will be set upon approval
      trialEndDate: null,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent'),
      metadata: {
        browser: request.headers.get('sec-ch-ua') || 'unknown',
        platform: request.headers.get('sec-ch-ua-platform') || 'unknown',
      },
    });
    
    // Send welcome email (async - don't wait for it)
    sendWelcomeEmail(application.email, {
      name: `${application.firstName} ${application.lastName}`,
      reference: application.referenceNumber,
      plan: application.membershipPlan,
    }).catch(console.error);
    
    // Send notification to admin (you can implement this)
    // await sendAdminNotification(application);
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      reference: application.referenceNumber,
      applicationId: application._id,
      nextSteps: [
        'Our team will review your application within 24 hours',
        'You will receive a welcome email with next steps',
        'Visit us anytime for a facility tour',
      ],
    }, { status: 201 });
    
  } catch (error) {
    console.error('Membership join API error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          //@ts-ignore
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate email error
    //@ts-ignore
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email already exists in our system' 
        },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process application. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    const email = searchParams.get('email');
    
    if (!reference && !email) {
      return NextResponse.json(
        { success: false, error: 'Reference or email required' },
        { status: 400 }
      );
    }
    
    const query: any = {};
    if (reference) query.referenceNumber = reference;
    if (email) query.email = email;
    
    const application = await MembershipApplication.findOne(query)
      .select('-__v -ipAddress -userAgent -metadata')
      .lean();
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: application,
    });
    
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}