import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileCheck, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';

export default function CustomsBrokeragePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services.customsBrokerage');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>International Trade Compliance</span>
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
              title: 'HS Tariff Classification & Duty Optimization',
              desc: 'Precise classification under the Harmonized Tariff Schedule (HTS) to mitigate duty overpayments and prevent audit penalties.',
            },
            {
              title: 'Customs Clearances (Air, Ocean & Land)',
              desc: 'Direct electronic data interchange (EDI) filing with customs administrations across North America, Europe, Asia, and the Middle East.',
            },
            {
              title: 'ATA Carnet & Temporary Importations',
              desc: 'Zero-duty temporary admission for exhibition equipment, commercial samples, and specialized testing machinery.',
            },
            {
              title: 'Free Trade Agreement (FTA) Certification',
              desc: 'Certificate of origin issuance and preferential origin verifications under bilateral and multilateral trade pacts.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
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
            <h3 className="text-xl font-bold text-white mb-1">Clearance Desk Inquiries</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit your Commercial Invoice & Packing List to <a href="mailto:info@cargova-logistics.com" className="text-emerald-400 underline">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Contact Customs Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
