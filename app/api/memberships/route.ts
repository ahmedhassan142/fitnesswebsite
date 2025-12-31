import { NextRequest, NextResponse } from 'next-server';

interface MembershipPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  popular: boolean;
  yearlyDiscount?: number;
}

const membershipPlans: MembershipPlan[] = [
  {
    id: 1,
    name: 'Basic',
    description: 'Perfect for getting started',
    price: 29.99,
    billingPeriod: 'monthly',
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Basic fitness assessment',
      'Weekday access (5am-8pm)',
      'Free WiFi',
    ],
    popular: false,
  },
  {
    id: 2,
    name: 'Premium',
    description: 'Most popular choice',
    price: 49.99,
    billingPeriod: 'monthly',
    features: [
      'All Basic features',
      '24/7 access',
      'All group classes included',
      'Guest passes (2/month)',
      'Premium towel service',
      'Nutrition guide',
    ],
    popular: true,
    yearlyDiscount: 20,
  },
  {
    id: 3,
    name: 'Ultimate',
    description: 'Complete fitness experience',
    price: 79.99,
    billingPeriod: 'monthly',
    features: [
      'All Premium features',
      'Personal trainer session (1/month)',
      'Nutrition consultation',
      'Premium locker with charging',
      'Bring a friend anytime',
      'Early access to new classes',
      'Exclusive member events',
    ],
    popular: false,
    yearlyDiscount: 25,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const billingPeriod = searchParams.get('period') as 'monthly' | 'yearly' || 'monthly';

  // Calculate yearly prices with discounts
  const plansWithPricing = membershipPlans.map(plan => {
    if (billingPeriod === 'yearly' && plan.yearlyDiscount) {
      const yearlyPrice = plan.price * 12 * (1 - plan.yearlyDiscount / 100);
      const monthlyEquivalent = yearlyPrice / 12;
      
      return {
        ...plan,
        price: yearlyPrice,
        billingPeriod: 'yearly',
        monthlyEquivalent: monthlyEquivalent,
        discount: plan.yearlyDiscount,
      };
    }
    
    return {
      ...plan,
      price: plan.price,
      billingPeriod: 'monthly',
      monthlyEquivalent: plan.price,
      discount: 0,
    };
  });

  return NextResponse.json(
    { 
      plans: plansWithPricing,
      billingPeriod,
      currency: 'USD',
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, userId, paymentMethod } = body;

    // Validate plan exists
    const plan = membershipPlans.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Process payment (simplified)
    const paymentStatus = 'succeeded'; // Mock payment processing
    
    if (paymentStatus === 'succeeded') {
      const membership = {
        id: Date.now(),
        userId,
        planId,
        planName: plan.name,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        status: 'active',
        payment: {
          amount: plan.price,
          currency: 'USD',
          method: paymentMethod,
          status: 'completed',
        },
      };

      return NextResponse.json(
        { 
          message: 'Membership activated successfully!',
          membership,
          receipt: {
            membershipId: membership.id,
            plan: plan.name,
            amount: plan.price,
            startDate: membership.startDate,
            endDate: membership.endDate,
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 402 }
      );
    }
  } catch (error) {
    console.error('Membership API error:', error);
    return NextResponse.json(
      { error: 'Failed to process membership' },
      { status: 500 }
    );
  }
}