import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@cargova-logistics.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      origin,
      destination,
      serviceType,
      weight,
      volume,
      cargoValue,
      insurance,
      customs,
      hazardous,
      notes,
      estimatedTotal,
      locale = 'en',
    } = body;

    if (!name || !email || !origin || !destination) {
      return NextResponse.json(
        { error: 'Missing required freight parameters' },
        { status: 400 }
      );
    }

    if (RESEND_API_KEY && RESEND_API_KEY.startsWith('re_') && RESEND_API_KEY !== 're_sample_key_replace_with_yours') {
      const resend = new Resend(RESEND_API_KEY);

      await resend.emails.send({
        from: 'Cargova Quote System <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `[QUOTE REQUEST] ${origin} → ${destination} (${serviceType}) - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; color: #1e293b; line-height: 1.6;">
            <div style="background-color: #0A1628; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">CARGOVA LOGISTICS</h1>
              <p style="color: #f59e0b; margin: 6px 0 0 0; font-size: 14px; font-weight: bold;">NEW FORMAL FREIGHT QUOTE REQUEST</p>
            </div>

            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
              <h3 style="color: #0284c7; margin-top: 0;">1. Routing & Pricing Range</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 160px; color: #64748b;">Origin:</td><td style="padding: 6px 0; font-weight: bold;">${origin}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Destination:</td><td style="padding: 6px 0; font-weight: bold;">${destination}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Service Type:</td><td style="padding: 6px 0; text-transform: uppercase;">${serviceType}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Indicative Estimate:</td><td style="padding: 6px 0; color: #16a34a; font-weight: bold; font-size: 16px;">${estimatedTotal || 'TBD'}</td></tr>
              </table>

              <h3 style="color: #0284c7; margin-top: 20px;">2. Cargo Specifications</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 160px; color: #64748b;">Weight:</td><td style="padding: 6px 0;">${weight || 'N/A'} KG</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Volume:</td><td style="padding: 6px 0;">${volume || 'N/A'} CBM</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Cargo Value:</td><td style="padding: 6px 0;">$${cargoValue || 'N/A'} USD</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Insurance Requested:</td><td style="padding: 6px 0;">${insurance ? 'YES' : 'NO'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Customs Assistance:</td><td style="padding: 6px 0;">${customs ? 'YES' : 'NO'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Hazardous (DGR/IMO):</td><td style="padding: 6px 0; color: ${hazardous ? '#dc2626' : '#64748b'}; font-weight: bold;">${hazardous ? 'YES (HAZMAT)' : 'NO'}</td></tr>
              </table>

              <h3 style="color: #0284c7; margin-top: 20px;">3. Shipper Contact</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 160px; color: #64748b;">Contact Name:</td><td style="padding: 6px 0; font-weight: bold;">${name}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Business Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td><td style="padding: 6px 0;">${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Company:</td><td style="padding: 6px 0;">${company || 'N/A'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Special Notes:</td><td style="padding: 6px 0;">${notes || 'None'}</td></tr>
              </table>

              <div style="margin-top: 24px; padding: 12px; background: #f1f5f9; text-align: center; font-size: 12px; color: #64748b; border-radius: 6px;">
                Cargova Logistics B2B Quoting Engine • All payments via Corporate Wire / No Online Checkout
              </div>
            </div>
          </div>
        `
      });

      return NextResponse.json({ success: true });
    }

    // Simulation log
    console.log('[QUOTE REQUEST SIMULATED]:', { origin, destination, serviceType, name, email, estimatedTotal });
    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Quote request transmitted to info@cargova-logistics.com',
    });
  } catch (error: any) {
    console.error('Quote API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
