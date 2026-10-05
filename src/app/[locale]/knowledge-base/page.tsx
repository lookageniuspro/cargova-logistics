import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BookOpen, FileText, Box, ShieldCheck, Mail } from 'lucide-react';

const incotermsList = [
  { term: 'EXW (Ex Works)', buyer: 'Buyer assumes full responsibility from seller premises.', seller: 'Makes goods available at origin factory or warehouse.' },
  { term: 'FOB (Free on Board)', buyer: 'Pays ocean/air freight, destination port clearance, and inland transport.', seller: 'Delivers goods onboard the designated vessel at origin port.' },
  { term: 'CIF (Cost, Insurance & Freight)', buyer: 'Takes over risk upon loading, pays import clearance & inland.', seller: 'Pays freight & basic marine insurance to destination port.' },
  { term: 'CFR (Cost & Freight)', buyer: 'Assumes transit risk from port of shipment, arranges own insurance.', seller: 'Pays freight costs to designated port of destination.' },
  { term: 'DDP (Delivered Duty Paid)', buyer: 'Takes delivery at their door; zero customs formalities required.', seller: 'Maximum obligation: pays all freight, import duties, and taxes to door.' },
  { term: 'DAP (Delivered at Place)', buyer: 'Responsible for import customs clearance, duties, and unloading.', seller: 'Delivers goods ready for unloading at buyer specified address.' },
  { term: 'FCA (Free Carrier)', buyer: 'Contracts main carriage freight from nominated origin point.', seller: 'Delivers export-cleared goods to named carrier at agreed terminal.' },
];

const containerSpecs = [
  { type: "20' Standard Dry", extDim: '6.06m × 2.44m × 2.59m', intVol: '33.2 CBM', maxPayload: '28,200 KG', use: 'Heavy dense cargo (minerals, metals, machinery, grain)' },
  { type: "40' Standard Dry", extDim: '12.19m × 2.44m × 2.59m', intVol: '67.7 CBM', maxPayload: '26,600 KG', use: 'Volumetric general merchandise, textiles, electronics' },
  { type: "40' High Cube (HQ)", extDim: '12.19m × 2.44m × 2.89m', intVol: '76.3 CBM', maxPayload: '26,500 KG', use: 'Light bulky goods requiring extra vertical height' },
  { type: "40' Reefer (Cold)", extDim: '12.19m × 2.44m × 2.89m', intVol: '67.0 CBM', maxPayload: '29,400 KG', use: 'Temperature controlled from -30°C to +30°C' },
  { type: "20' / 40' Open Top", extDim: 'Standard dimensions with removable roof', intVol: '32 - 66 CBM', maxPayload: 'Up to 31,000 KG', use: 'Top crane loading for oversized industrial pipes' },
  { type: "20' / 40' Flat Rack", extDim: 'Collapsible end walls without fixed sides', intVol: 'Uncaged', maxPayload: 'Up to 45,000 KG', use: 'OOG machinery, construction vehicles, heavy tanks' },
];

export default function KnowledgeBasePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('knowledgeBase');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Incoterms 2020 Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <FileText className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl font-bold text-white">{t('incotermsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incotermsList.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-sky-400 font-mono">{item.term}</h3>
                <div className="text-xs space-y-1 text-slate-300">
                  <p><strong className="text-slate-400">Seller:</strong> {item.seller}</p>
                  <p><strong className="text-slate-400">Buyer:</strong> {item.buyer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Container Specs Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Box className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">{t('containersTitle')}</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
            <table className="w-full text-left rtl:text-right text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Container Type</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Volume</th>
                  <th className="p-4">Max Payload</th>
                  <th className="p-4">Ideal Commodity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {containerSpecs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-white">{spec.type}</td>
                    <td className="p-4 font-mono">{spec.extDim}</td>
                    <td className="p-4 font-mono text-sky-400">{spec.intVol}</td>
                    <td className="p-4 font-mono text-emerald-400">{spec.maxPayload}</td>
                    <td className="p-4 text-slate-400">{spec.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mandatory Freight Documentation */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">{t('docsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base">Commercial Invoice & Packing List</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Itemized commercial description, HS tariff codes, net/gross weight, dimensions, and declared customs valuation.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base">Bill of Lading (B/L) / AWB</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Document of title proving contract of carriage, port of lading, port of discharge, consignee and notify party.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base">Certificate of Origin & MSDS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Issued by Chamber of Commerce for tariff preferences, alongside Material Safety Data Sheets for IMO/DGR hazmat.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info box */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-2xl mx-auto space-y-3">
          <p className="text-sm text-slate-300">
            Need trade compliance advice or documentation pre-vetting? Contact our customs desk at:
          </p>
          <a
            href="mailto:info@cargova-logistics.com"
            className="inline-flex items-center gap-2 text-sky-400 hover:underline font-bold text-base"
          >
            <Mail className="w-4 h-4" />
            <span>info@cargova-logistics.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
