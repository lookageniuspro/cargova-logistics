import { NextResponse } from 'next/server';

// Demo shipment datasets for showcase & testing (no database requirement)
const mockShipments: Record<string, any> = {
  'CGV2024001': {
    trackingNumber: 'CGV2024001',
    status: 'In Transit',
    type: 'Air Freight Express',
    carrier: 'Emirates SkyCargo (EK9921)',
    origin: 'Shanghai Pudong (PVG), China',
    destination: 'Los Angeles (LAX), USA',
    estimatedDelivery: '2026-10-15',
    timeline: [
      { status: 'Order & Booking Confirmed', date: '2026-10-01 08:30', completed: true },
      { status: 'Cargo Received at Shanghai Gateway', date: '2026-10-02 14:15', completed: true },
      { status: 'Export Customs Clearance Passed', date: '2026-10-03 11:00', completed: true },
      { status: 'Departed Hub - In Transit over Pacific', date: '2026-10-04 18:45', completed: true },
      { status: 'Import Customs Clearance', date: 'Pending Arrival', completed: false },
      { status: 'Airport Ground Transfer', date: 'Pending', completed: false },
      { status: 'Final Delivery to Consignee Door', date: 'Pending', completed: false },
    ],
  },
  'CGV2024002': {
    trackingNumber: 'CGV2024002',
    status: 'Customs Clearance',
    type: 'Ocean Freight FCL (40ft High Cube)',
    carrier: 'Maersk Line (Vessel: Madrid Maersk)',
    origin: 'Port of Singapore (SGSIN)',
    destination: 'Port of Rotterdam (NLRTM), Netherlands',
    estimatedDelivery: '2026-10-20',
    timeline: [
      { status: 'Container Stuffed & Sealed', date: '2026-09-25 10:00', completed: true },
      { status: 'Loaded on Vessel Madrid Maersk', date: '2026-09-27 16:30', completed: true },
      { status: 'Maritime Transit via Suez Canal', date: '2026-09-30 04:00', completed: true },
      { status: 'Vessel Berthed at Rotterdam Terminal', date: '2026-10-04 09:20', completed: true },
      { status: 'Customs Clearance in Progress', date: '2026-10-05 13:40', completed: true },
      { status: 'Inland Rail Transfer to Distribution Hub', date: 'Scheduled 2026-10-08', completed: false },
      { status: 'Delivered to Final Warehouse', date: 'Pending', completed: false },
    ],
  },
};

export async function GET(
  request: Request,
  { params }: { params: { number: string } }
) {
  const trackingNumber = (params.number || '').toUpperCase().trim();
  const shipment = mockShipments[trackingNumber];

  if (!shipment) {
    return NextResponse.json(
      {
        error: 'Shipment not found',
        message: 'No live record matching this reference. For immediate cargo trace assistance, contact info@cargova-logistics.com',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(shipment);
}
