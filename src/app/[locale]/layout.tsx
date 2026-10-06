import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Cargova Logistics | Global Freight Forwarding, Air & Ocean Cargo',
  description: 'Premier global freight forwarder connecting Egypt and 150+ countries worldwide with air, ocean (FCL/LCL), customs clearance, and real-time cargo tracking.',
  keywords: 'Cargova Logistics, Egypt logistics, Suez canal freight, ocean freight, air cargo, container shipping, cargo tracking, customs brokerage, Maersk, MSC, Emirates SkyCargo',
  authors: [{ name: 'Cargova Logistics' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cargova-logistics.com'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Cargova Logistics | Global Supply Chain - Egypt to the World',
    description: 'Premier air, ocean, and multimodal logistics solutions connecting Egypt with 150+ countries worldwide.',
    type: 'website',
    siteName: 'Cargova Logistics',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cargova Logistics - Global Supply Chain Solutions Egypt to the World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargova Logistics | Global Supply Chain - Egypt to the World',
    description: 'Connecting Egypt with 150+ countries worldwide through air, ocean, and customs clearance logistics.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070e1a] text-slate-100 antialiased flex flex-col selection:bg-sky-500 selection:text-white">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
