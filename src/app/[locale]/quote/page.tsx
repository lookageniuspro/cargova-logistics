import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { Calculator, ShieldCheck, Mail, Clock, CheckCircle2 } from 'lucide-react';

interface QuotePageProps {
  params: {
    locale: string;
  };
}

export default function QuotePage({ params: { locale } }: QuotePageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('quote');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Notice Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Zero Online Payments:</strong> All commercial orders are confirmed via official proforma & B2B wire invoice.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sky-400 flex-shrink-0">
            <Mail className="w-4 h-4" />
            <span>Official Desk: info@cargova-logistics.com</span>
          </div>
        </div>

        {/* Calculator Widget */}
        <QuoteCalculator locale={locale} />
      </div>
    </div>
  );
}
