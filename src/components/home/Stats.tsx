'use client';

import { useTranslations } from 'next-intl';
import { Globe, PackageCheck, Clock, Headphones, Activity, ArrowUpRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function Stats() {
  const t = useTranslations('stats');

  const stats = [
    {
      value: t('countries'),
      label: t('countriesLabel'),
      icon: Globe,
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
      duration: 1800,
      liveTicker: false,
    },
    {
      value: t('shipments'),
      label: t('shipmentsLabel'),
      icon: PackageCheck,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      duration: 2200,
      liveTicker: true, // Lively auto-incrementing as users browse!
      tickerInterval: 3800,
      badge: 'LIVE DISPATCH',
    },
    {
      value: t('onTime'),
      label: t('onTimeLabel'),
      icon: Clock,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      duration: 2000,
      liveTicker: false,
    },
    {
      value: t('support'),
      label: t('supportLabel'),
      icon: Headphones,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      duration: 1500,
      liveTicker: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#070e1a] border-y border-slate-800/80 relative overflow-hidden">
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Real-time Operations Live Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase">
              Global Cargo Telemetry Active • Live Autonomous Dispatch Feed
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Real-time Port & Airway Sync: 99.98% Uptime</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 backdrop-blur-sm"
              >
                {/* Live Badge for Shipments */}
                {stat.badge && (
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {stat.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-black ${stat.textColor} tracking-tight font-display`}>
                    <AnimatedCounter
                      value={stat.value}
                      duration={stat.duration}
                      liveTicker={stat.liveTicker}
                      tickerInterval={stat.tickerInterval}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
