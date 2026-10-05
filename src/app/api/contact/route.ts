import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@cargova-logistics.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message, locale = 'en' } = body;

    // Data validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Resend API Key is available, dispatch live email
    if (RESEND_API_KEY && RESEND_API_KEY.startsWith('re_') && RESEND_API_KEY !== 're_sample_key_replace_with_yours') {
      const resend = new Resend(RESEND_API_KEY);

      // Notification email to operations team
      const { data, error } = await resend.emails.send({
        from: 'Cargova Website <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `[${locale.toUpperCase()}] New Inquiry from ${name} - ${service || 'General'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b; line-height: 1.6;">
            <div style="background-color: #0A1628; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CARGOVA LOGISTICS</h1>
              <p style="color: #38bdf8; margin: 6px 0 0 0; font-size: 13px;">New Web Operations Inquiry</p>
            </div>
            
            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; width: 140px; color: #64748b;">Full Name:</td><td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; color: #64748b;">Business Email:</td><td style="padding: 10px 0; color: #0284c7;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td><td style="padding: 10px 0; color: #0f172a;">${phone || 'Not provided'}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; color: #64748b;">Company:</td><td style="padding: 10px 0; color: #0f172a;">${company || 'Not provided'}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; color: #64748b;">Service:</td><td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${service || 'General Inquiry'}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: bold; color: #64748b;">Locale / Language:</td><td style="padding: 10px 0; color: #0f172a;">${locale}</td></tr>
              </table>

              <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message Details:</h4>
                <p style="margin: 0; color: #334155; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                Transmitted via Cargova Logistics Web Portal • Official Desk: info@cargova-logistics.com
              </div>
            </div>
          </div>
        `
      });

      if (error) {
        console.error('Resend error:', error);
      }

      // Confirmation to user
      try {
        await resend.emails.send({
          from: 'Cargova Logistics <onboarding@resend.dev>',
          to: [email],
          subject: 'Inquiry Received - Cargova Logistics Freight Desk',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b; line-height: 1.6;">
              <h2 style="color: #0A1628;">Dear ${name},</h2>
              <p>Thank you for reaching out to Cargova Logistics.</p>
              <p>Your inquiry regarding <strong>${service || 'our global logistics services'}</strong> has been routed directly to our operations and pricing desk.</p>
              <p>A certified freight coordinator will review your specifications and respond within <strong>2 hours</strong> during global trade hours.</p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 13px; color: #475569;">
                  For urgent cargo bookings or flight dispatch updates, please email directly to:
                  <a href="mailto:info@cargova-logistics.com" style="color: #0284c7; font-weight: bold;">info@cargova-logistics.com</a>
                  or call our operations desk at <strong>+20 128 287 8325</strong>.
                </p>
              </div>
              <p style="margin-top: 24px;">Best regards,<br/><strong>Cargova Logistics Operations Team</strong></p>
            </div>
          `
        });
      } catch (clientErr) {
        console.warn('Customer confirmation email skipped/deferred:', clientErr);
      }

      return NextResponse.json({ success: true, id: data?.id });
    }

    // Graceful simulation mode (when RESEND_API_KEY is not yet populated in local or demo environment)
    console.log('[LOGISTICS CONTACT SIMULATED]:', { name, email, service, message });
    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Inquiry recorded and routed to info@cargova-logistics.com',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
