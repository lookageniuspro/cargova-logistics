import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { 
  Plane, 
  Ship, 
  Truck, 
  Warehouse, 
  FileCheck, 
  Anchor, 
  ArrowRight, 
  Box, 
  CheckCircle2 
} from 'lucide-react';

export function Services() {
  const t = useTranslations('services');

  const servicesList = [
    {
      slug: 'air-freight',
      icon: Plane,
      title: t('airFreight.title'),
      short: t('airFreight.short'),
      color: 'from-sky-500 to-blue-600',
      tag: 'Priority 24-72h',
    },
    {
      slug: 'ocean-freight',
      icon: Ship,
      title: t('oceanFreight.title'),
      short: t('oceanFreight.short'),
      color: 'from-blue-600 to-indigo-700',
      tag: 'FCL & LCL',
    },
    {
      slug: 'project-cargo',
      icon: Anchor,
      title: t('projectCargo.title'),
      short: t('projectCargo.short'),
      color: 'from-amber-500 to-orange-600',
      tag: 'Heavy Lift / OOG',
    },
    {
      slug: 'customs-brokerage',
      icon: FileCheck,
      title: t('customsBrokerage.title'),
      short: t('customsBrokerage.short'),
      color: 'from-emerald-500 to-teal-600',
      tag: 'Compliance & Duty',
    },
    {
      slug: 'warehousing',
      icon: Warehouse,
      title: t('warehousing.title'),
      short: t('warehousing.short'),
      color: 'from-cyan-500 to-sky-600',
      tag: 'Bonded & 3PL',
    },
    {
      slug: 'door-to-door',
      icon: Truck,
      title: t('doorToDoor.title'),
      short: t('doorToDoor.short'),
      color: 'from-purple-500 to-pink-600',
      tag: 'End-to-End Multimodal',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#070e1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-3">
            <Box className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="group relative p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.short}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 group/link transition-colors"
                  >
                    <span>{t('learnMore')}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/quote"
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    Instant Quote →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 shadow-md transition-all"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
