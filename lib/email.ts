// lib/email.ts
// Simple email service (use Resend, SendGrid, or other services in production)

export async function sendWelcomeEmail(to: string, data: {
  name: string;
  reference: string;
  plan: string;
}) {
  // This is a mock function. In production, use:
  // 1. Resend (recommended for Next.js)
  // 2. SendGrid
  // 3. Nodemailer with SMTP
  
  console.log(`Welcome email sent to: ${to}`);
  console.log('Email data:', data);
  
  // Example with Resend (uncomment and configure):
  /*
  import { Resend } from 'resend';
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'IronPeak Fitness <welcome@ironpeakfitness.com>',
    to: [to],
    subject: 'Welcome to IronPeak Fitness!',
    html: `
      <h2>Welcome ${data.name}!</h2>
      <p>Your application has been received. Reference: ${data.reference}</p>
      <p>Plan: ${data.plan}</p>
      <p>We'll contact you within 24 hours to schedule your free trial.</p>
    `,
  });
  */
  
  return { success: true };
}

export async function sendAdminNotification(application: any) {
  // Send notification to admin about new application
  console.log('New application:', application.referenceNumber);
  
  // Implement your notification service here
  // Could be email, Slack webhook, etc.
}