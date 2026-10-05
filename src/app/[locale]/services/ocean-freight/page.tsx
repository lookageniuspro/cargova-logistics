import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Ship, CheckCircle2, ShieldCheck, Anchor, Calculator, ArrowRight } from 'lucide-react';

export default function OceanFreightPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services.oceanFreight');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Ship className="w-3.5 h-3.5" />
            <span>Global Maritime Alliances</span>
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
              title: 'Full Container Load (FCL)',
              desc: 'Dedicated 20ft, 40ft, and 40ft High Cube containers with prioritized vessel discharge and direct carrier contracts.',
            },
            {
              title: 'Less than Container Load (LCL)',
              desc: 'Weekly direct consolidation boxes across key global trade corridors with transparent CBM pricing.',
            },
            {
              title: 'Reefer & Climate Maritime Shipping',
              desc: 'State-of-the-art refrigerated units with live telemetry for agricultural, pharmaceutical, and perishable consignments.',
            },
            {
              title: 'Special Equipment (Open Top / Flat Rack)',
              desc: 'Out-of-gauge (OOG) container solutions for machinery, yachts, and structural components.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sky-400 font-bold text-base">
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
            <h3 className="text-xl font-bold text-white mb-1">Ocean Container Rate Inquiry</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct contracts with Maersk, MSC, CMA CGM, COSCO. Official desk: <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Get Ocean Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
