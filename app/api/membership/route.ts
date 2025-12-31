import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Membership from '@/models/Membership';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const billingPeriod = searchParams.get('billingPeriod');
    const isActive = searchParams.get('isActive') !== 'false';
    
    const query: any = { isActive };
    if (billingPeriod) query.billingPeriod = billingPeriod;
    
    const memberships = await Membership.find(query)
      .sort({ price: 1 })
      .lean();
    
    // Calculate yearly prices
    const membershipsWithPricing = memberships.map(membership => {
      if (billingPeriod === 'yearly') {
        const yearlyPrice = membership.price * 12 * 0.8; // 20% discount
        return {
          ...membership,
          price: yearlyPrice,
          billingPeriod: 'yearly',
          monthlyEquivalent: yearlyPrice / 12,
          discount: 20,
        };
      }
      
      return {
        ...membership,
        price: membership.price,
        billingPeriod: 'monthly',
        monthlyEquivalent: membership.price,
        discount: 0,
      };
    });
    
    return NextResponse.json({
      success: true,
      data: membershipsWithPricing,
      billingPeriod: billingPeriod || 'monthly',
    });
  } catch (error) {
    console.error('Get memberships error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch memberships' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check admin authentication
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    
    const body = await request.json();
    
    const membership = await Membership.create(body);
    
    return NextResponse.json({
      success: true,
      message: 'Membership plan created successfully',
      data: membership,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create membership error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Membership with this name already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create membership' },
      { status: 500 }
    );
  }
}