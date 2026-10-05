'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { 
  Search, 
  ArrowRight, 
  Calculator, 
  Plane, 
  Ship, 
  ShieldCheck, 
  Clock, 
  Globe2, 
  Sparkles 
} from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    router.push(`/track?number=${encodeURIComponent(trackingNumber.trim())}`);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#0a1628] via-[#070e1a] to-[#070e1a]">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('badge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            <span>{t('titlePrefix')} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              {t('titleHighlight')}
            </span>{' '}
            <span>{t('titleSuffix')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Interactive Fast Tracking Search Box */}
          <div className="pt-2 max-w-xl mx-auto">
            <form
              onSubmit={handleTrackSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl focus-within:border-sky-500/60 focus-within:ring-2 focus-within:ring-sky-500/20 backdrop-blur-md transition-all"
            >
              <div className="flex items-center gap-3 w-full px-3 py-1">
                <Search className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder={t('trackPlaceholder')}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>{t('trackBtn')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
              <span>Try test numbers:</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('CGV2024001');
                  router.push('/track?number=CGV2024001');
                }}
                className="text-sky-400 hover:underline font-mono"
              >
                CGV2024001
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingNumber('CGV2024002');
                  router.push('/track?number=CGV2024002');
                }}
                className="text-sky-400 hover:underline font-mono"
              >
                CGV2024002
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/quote"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>{t('quoteBtn')}</span>
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 shadow-md transition-all"
            >
              <span>{t('exploreBtn')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Online Payments / Corporate Bank Wire</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>2-Hour Dedicated Quote Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>Direct Space on Top 8 Ocean & Air Lines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
