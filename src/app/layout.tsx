import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cargova-logistics.vercel.app'),
  title: 'Cargova Logistics | Global Freight Forwarding',
  description: 'Premier air, ocean, and multimodal logistics solutions connecting Egypt with 150+ countries worldwide.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
