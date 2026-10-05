'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Ship, Plane, ShieldCheck } from 'lucide-react';

const oceanCarriers = [
  { name: 'Maersk', logo: '/partners/maersk.svg' },
  { name: 'MSC', logo: '/partners/msc.svg' },
  { name: 'CMA CGM', logo: '/partners/cma-cgm.svg' },
  { name: 'COSCO', logo: '/partners/cosco.svg' },
  { name: 'Hapag-Lloyd', logo: '/partners/hapag-lloyd.svg' },
  { name: 'ONE', logo: '/partners/one.svg' },
  { name: 'Evergreen', logo: '/partners/evergreen.svg' },
  { name: 'Yang Ming', logo: '/partners/yang-ming.svg' },
];

const airCarriers = [
  { name: 'Emirates SkyCargo', logo: '/partners/emirates.svg' },
  { name: 'Lufthansa Cargo', logo: '/partners/lufthansa.svg' },
  { name: 'Cathay Pacific Cargo', logo: '/partners/cathay.svg' },
  { name: 'Qatar Airways Cargo', logo: '/partners/qatar.svg' },
  { name: 'FedEx Express', logo: '/partners/fedex.svg' },
  { name: 'DHL Aviation', logo: '/partners/dhl.svg' },
  { name: 'UPS Airlines', logo: '/partners/ups.svg' },
  { name: 'Turkish Cargo', logo: '/partners/turkish.svg' },
];

export function PartnersMarquee() {
  const t = useTranslations('partners');

  return (
    <section className="py-20 bg-[#081120] relative overflow-hidden">
      {/* Decorative gradient blur - hardware-safe */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/2 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('badge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          {t('title')}
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        {/* Ocean Carriers Row */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
            <Ship className="w-4 h-4" />
            <span>{t('oceanTitle')}</span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 py-2">
              {[...oceanCarriers, ...oceanCarriers].map((carrier, idx) => (
                <div
                  key={`${carrier.name}-${idx}`}
                  className="flex items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 transition-all shadow-md group min-w-[190px] h-[72px]"
                >
                  <div className="relative w-36 h-12 flex items-center justify-center">
                    <img
                      src={carrier.logo}
                      alt={carrier.name}
                      className="max-h-10 w-auto object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Air Cargo Carriers Row */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Plane className="w-4 h-4" />
            <span>{t('airTitle')}</span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] gap-6 py-2">
              {[...airCarriers, ...airCarriers].map((carrier, idx) => (
                <div
                  key={`${carrier.name}-${idx}`}
                  className="flex items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all shadow-md group min-w-[190px] h-[72px]"
                >
                  <div className="relative w-36 h-12 flex items-center justify-center">
                    <img
                      src={carrier.logo}
                      alt={carrier.name}
                      className="max-h-10 w-auto object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
