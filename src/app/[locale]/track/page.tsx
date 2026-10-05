import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { TrackingWidget } from '@/components/track/TrackingWidget';
import { Search, Mail, ShieldCheck, Clock, Globe } from 'lucide-react';

interface TrackPageProps {
  params: {
    locale: string;
  };
  searchParams?: {
    number?: string;
  };
}

export default function TrackPage({ params: { locale }, searchParams }: TrackPageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('track');
  const initialNumber = searchParams?.number || '';

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Tracking Widget */}
        <TrackingWidget initialNumber={initialNumber} locale={locale} />

        {/* Live Tracking Assistance Box */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Carrier EDI Milestones refresh continuously. Need manual bill of lading verification?</span>
          </div>
          <a
            href="mailto:info@cargova-logistics.com?subject=Bill of Lading Verification"
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold flex-shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>info@cargova-logistics.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
