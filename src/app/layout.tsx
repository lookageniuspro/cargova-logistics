import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cargova-logistics.vercel.app'),
  title: 'Cargova Logistics | Global Supply Chain - Egypt to the World',
  description: 'Premier air, ocean, and multimodal logistics solutions connecting Egypt with 150+ countries worldwide.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Cargova Logistics | Global Supply Chain - Egypt to the World',
    description: 'Premier air, ocean, and multimodal logistics solutions connecting Egypt with 150+ countries worldwide.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
