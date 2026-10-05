import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Warehouse, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';

export default function WarehousingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services.warehousing');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Warehouse className="w-3.5 h-3.5" />
            <span>Smart 3PL & Distribution Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Bonded & Duty-Suspension Storage',
              desc: 'Secure bonded warehousing allowing deferred customs duties and tax liabilities until final market release.',
            },
            {
              title: 'Cross-Docking & Transloading',
              desc: 'Rapid cargo deconsolidation and truck transfer minimizing dwell times and eliminating unnecessary storage costs.',
            },
            {
              title: 'Pick, Pack & Global B2B Fulfillment',
              desc: 'Barcode-scanned inventory handling, pallet rebuilding, shrink-wrapping, and reverse logistics management.',
            },
            {
              title: 'Climate-Controlled & High-Security Hubs',
              desc: '24/7 CCTV, restricted biometric access, fire suppression, and temperature-humidity monitoring.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Inquire About Warehouse Space</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Rotterdam, Shanghai, Dubai, Chicago hubs. Email: <a href="mailto:info@cargova-logistics.com" className="text-cyan-400 underline">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Request Storage Plan</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
