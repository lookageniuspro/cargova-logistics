'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { 
  Search, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Globe2, 
  Sparkles,
  Plane,
  Ship,
  MapPin
} from 'lucide-react';

// Dynamic import with ssr: false for client-side WebGL Canvas
const Globe3D = dynamic(
  () => import('./Globe3D').then((mod) => mod.Globe3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[360px] sm:h-[480px] lg:h-[620px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400 font-mono">Initializing 3D Global Trade Radar...</span>
        </div>
      </div>
    ),
  }
);

export function Hero() {
  const t = useTranslations('hero');
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    router.push(`/track?number=${encodeURIComponent(trackingNumber.trim())}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#0a1628] via-[#070e1a] to-[#070e1a]">
      {/* Background ambient lighting glow - 100% hardware-safe radial gradients (prevents mobile GPU blur overflow) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-12 -left-12 w-[340px] sm:w-[600px] h-[340px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute top-1/3 -right-12 w-[300px] sm:w-[500px] h-[300px] sm:h-[450px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column Hero on Desktop, Optimized Fluid Flow on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (6 Cols on lg): Headline, Search & CTAs */}
          <div className="relative z-10 lg:col-span-6 space-y-6 text-center lg:text-left rtl:lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{t('badge')}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              <span>{t('titlePrefix')} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                {t('titleHighlight')}
              </span>{' '}
              <span>{t('titleSuffix')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* Fast Tracking Search Input Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleTrackSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl focus-within:border-sky-500/60 focus-within:ring-2 focus-within:ring-sky-500/20 backdrop-blur-md transition-all"
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

              {/* Demo test numbers */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 mt-2.5">
                <span>Demo tracking:</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingNumber('CGV2024001');
                    router.push('/track?number=CGV2024001');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono text-[11px] border border-slate-700 transition-colors"
                >
                  CGV2024001 (Air)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingNumber('CGV2024002');
                    router.push('/track?number=CGV2024002');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono text-[11px] border border-slate-700 transition-colors"
                >
                  CGV2024002 (Ocean)
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/quote"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4" />
                <span>{t('quoteBtn')}</span>
              </Link>

              <Link
                href="/services"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 shadow-md transition-all"
              >
                <span>{t('exploreBtn')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Retail Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>2-Hour Quote Response</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols on lg): Interactive 3D Globe with Egypt routes */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <div className="w-full rounded-3xl bg-slate-950/40 border border-slate-800/80 p-2 sm:p-4 backdrop-blur-sm shadow-2xl relative">
              <Globe3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
