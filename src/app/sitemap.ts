import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cargova-logistics.com';

  // All static paths across the platform
  const paths = [
    '',
    '/about',
    '/services',
    '/services/air-freight',
    '/services/ocean-freight',
    '/services/project-cargo',
    '/services/customs-brokerage',
    '/services/warehousing',
    '/services/door-to-door',
    '/quote',
    '/track',
    '/partners',
    '/knowledge-base',
    '/contact',
  ];

  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  paths.forEach((path) => {
    routing.locales.forEach((locale) => {
      // Build alternates for multilingual hreflang
      const languages: Record<string, string> = {};
      routing.locales.forEach((altLocale) => {
        languages[altLocale] = `${baseUrl}/${altLocale}${path}`;
      });

      // Priority calculation
      let priority = 0.8;
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';

      if (path === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (path === '/quote' || path === '/track' || path === '/services') {
        priority = 0.9;
        changeFrequency = 'daily';
      } else if (path.startsWith('/services/')) {
        priority = 0.85;
        changeFrequency = 'weekly';
      }

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      });
    });
  });

  return sitemapEntries;
}
