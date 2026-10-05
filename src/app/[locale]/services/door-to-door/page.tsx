import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Truck, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';

export default function DoorToDoorPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services.doorToDoor');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>End-to-End Multimodal Transport</span>
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
              title: 'Single-Point Accountability',
              desc: 'One bill of lading, one invoice, and one coordinator overseeing multimodal transitions across ocean, rail, and road.',
            },
            {
              title: 'Factory Pickup & Drayage',
              desc: 'Coordinated container positioning at factory loading bays with live GPS vehicle tracking.',
            },
            {
              title: 'Final Mile Delivery & Liftgate Service',
              desc: 'Tail-lift delivery to commercial sites, retail fulfillment centers, and rural project destinations.',
            },
            {
              title: 'Duty-Paid DDP & DAP Solutions',
              desc: 'Delivered Duty Paid (DDP) options removing all import customs complexities for the end consignee.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5 text-purple-400 font-bold text-base">
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
            <h3 className="text-xl font-bold text-white mb-1">Book Door-to-Door Logistics</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Complete origin-to-destination quotation. Official desk: <a href="mailto:info@cargova-logistics.com" className="text-purple-400 underline">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Door Delivery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
