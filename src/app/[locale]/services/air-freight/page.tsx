import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Plane, CheckCircle2, ShieldCheck, Clock, Calculator, Mail, ArrowRight } from 'lucide-react';

export default function AirFreightPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services.airFreight');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Plane className="w-3.5 h-3.5" />
            <span>Priority Global Aviation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('desc')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Charter & Part-Charter Capacity',
              desc: 'Dedicated Antonov, Boeing 747/777 freighters arranged on demand for oversized or urgent consignments.',
            },
            {
              title: 'IATA Accredited Air Forwarding',
              desc: 'Direct block space agreements with leading global airlines ensuring space security during peak seasons.',
            },
            {
              title: 'Cold-Chain & Pharma Logistics',
              desc: 'Strict temperature-controlled air transit with calibrated data loggers and airport ramp tarmac protection.',
            },
            {
              title: 'Express Airport-to-Airport & Door',
              desc: 'Seamless transit times ranging from 24 to 72 hours connecting major aviation cargo hubs.',
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

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Book Air Cargo Space</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Quotes returned in under 2 hours. Official desk: <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Get Air Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
