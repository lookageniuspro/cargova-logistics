import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Cargova Logistics - Global Freight Forwarding';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#070e1a',
          backgroundImage: 'radial-gradient(circle at 85% 25%, #0284c7 0%, transparent 45%), radial-gradient(circle at 15% 85%, #1e3a8a 0%, transparent 45%)',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
          border: '12px solid #0f1f38',
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4)',
            }}
          >
            🚢
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '38px', fontWeight: 900, color: '#ffffff', letterSpacing: '2px' }}>
                CARGOVA
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '1px',
                }}
              >
                GLOBAL
              </span>
            </div>
            <span style={{ fontSize: '14px', color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
              Freight & Logistics Network
            </span>
          </div>
        </div>

        {/* Main Center Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '850px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#38bdf8',
              fontSize: '16px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            <span>🇪🇬 Egypt Global Gateway ⇄ 150+ World Ports & Hubs</span>
          </div>

          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Command Your Global Freight With Precision
          </h1>

          <p style={{ fontSize: '22px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
            Integrated Ocean (FCL/LCL), Air Freight, Customs Brokerage & Project Logistics.
          </p>
        </div>

        {/* Bottom Bar Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '28px',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '18px', color: '#38bdf8', fontWeight: 700 }}>
            <span>✉️ info@cargova-logistics.com</span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ color: '#fbbf24' }}>24/7 Global Freight Operations</span>
          </div>

          <div
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '15px',
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            cargova-logistics.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
