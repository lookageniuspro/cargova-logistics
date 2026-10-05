import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Ship, Plane, ShieldCheck, CheckCircle2, Globe2, Mail } from 'lucide-react';

const oceanCarriers = [
  { name: 'Maersk Line', logo: '/partners/maersk.svg', hub: 'Copenhagen, Denmark', specialty: 'Global Container Shipping & 2M Alliance' },
  { name: 'MSC (Mediterranean Shipping Co)', logo: '/partners/msc.svg', hub: 'Geneva, Switzerland', specialty: 'World Largest Container Fleet' },
  { name: 'CMA CGM', logo: '/partners/cma-cgm.svg', hub: 'Marseille, France', specialty: 'Ocean Alliance Core Member & LNG Vessels' },
  { name: 'COSCO Shipping', logo: '/partners/cosco.svg', hub: 'Shanghai, China', specialty: 'Transpacific & Asia-Europe Mega Carrier' },
  { name: 'Hapag-Lloyd', logo: '/partners/hapag-lloyd.svg', hub: 'Hamburg, Germany', specialty: 'THE Alliance & Atlantic Trade Leader' },
  { name: 'ONE (Ocean Network Express)', logo: '/partners/one.svg', hub: 'Tokyo / Singapore', specialty: 'Precision Japanese Line Consortium' },
  { name: 'Evergreen Marine', logo: '/partners/evergreen.svg', hub: 'Taipei, Taiwan', specialty: 'Global Ultra-Large Container Vessels' },
  { name: 'Yang Ming', logo: '/partners/yang-ming.svg', hub: 'Keelung, Taiwan', specialty: 'Premier Intra-Asia & Mediterranean Routes' },
];

const airCarriers = [
  { name: 'Emirates SkyCargo', logo: '/partners/emirates.svg', hub: 'Dubai (DXB/DWC)', specialty: 'Widebody Belly & 777 Freighter Network' },
  { name: 'Lufthansa Cargo', logo: '/partners/lufthansa.svg', hub: 'Frankfurt (FRA)', specialty: 'European Gateway & Pharma Cold-Chain' },
  { name: 'Cathay Pacific Cargo', logo: '/partners/cathay.svg', hub: 'Hong Kong (HKG)', specialty: 'Asia-Pacific Transpacific High-Capacity Hub' },
  { name: 'Qatar Airways Cargo', logo: '/partners/qatar.svg', hub: 'Doha (DOH)', specialty: 'Global Charter & Live Animal Transport' },
  { name: 'FedEx Express', logo: '/partners/fedex.svg', hub: 'Memphis (MEM)', specialty: 'Time-Definite Overnight Freight Network' },
  { name: 'DHL Aviation', logo: '/partners/dhl.svg', hub: 'Leipzig (LEJ) & Cincinnati', specialty: 'Worldwide Scheduled Express Cargo Flights' },
  { name: 'UPS Airlines', logo: '/partners/ups.svg', hub: 'Louisville (SDF)', specialty: 'Intercontinental B2B Express Airlift' },
  { name: 'Turkish Cargo', logo: '/partners/turkish.svg', hub: 'Istanbul (IST)', specialty: 'Fastest Growing East-West Air Hub' },
];

export default function PartnersPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('partners');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tier-1 Carrier Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Ocean Carriers Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t('oceanTitle')}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{t('oceanDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {oceanCarriers.map((carrier, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="h-14 flex items-center justify-center bg-slate-950/60 rounded-xl p-2 border border-slate-800/80">
                  <img
                    src={carrier.logo}
                    alt={carrier.name}
                    className="max-h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                    {carrier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{carrier.specialty}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Hub:</span>
                  <span className="text-slate-300 font-medium">{carrier.hub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Cargo Carriers Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t('airTitle')}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{t('airDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {airCarriers.map((carrier, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="h-14 flex items-center justify-center bg-slate-950/60 rounded-xl p-2 border border-slate-800/80">
                  <img
                    src={carrier.logo}
                    alt={carrier.name}
                    className="max-h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {carrier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{carrier.specialty}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Hub:</span>
                  <span className="text-slate-300 font-medium">{carrier.hub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Email Desk */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center max-w-2xl mx-auto space-y-3">
          <p className="text-sm text-slate-300">
            Carrier contract inquiries and space reservations are managed directly via our freight desk at:
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
