import { useTranslations } from 'next-intl';
import { Globe, PackageCheck, Clock, Headphones } from 'lucide-react';

export function Stats() {
  const t = useTranslations('stats');

  const stats = [
    {
      value: t('countries'),
      label: t('countriesLabel'),
      icon: Globe,
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
    },
    {
      value: t('shipments'),
      label: t('shipmentsLabel'),
      icon: PackageCheck,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
    },
    {
      value: t('onTime'),
      label: t('onTimeLabel'),
      icon: Clock,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
    },
    {
      value: t('support'),
      label: t('supportLabel'),
      icon: Headphones,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
    },
  ];

  return (
    <section className="py-12 bg-[#070e1a] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-2xl sm:text-3xl lg:text-4xl font-black ${stat.textColor} tracking-tight font-display`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
