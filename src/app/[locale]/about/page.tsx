import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Users, 
  Mail, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('about');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Animated Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-sm">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-display">
              <AnimatedCounter value="150+" duration={1800} />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Global Hubs Connected</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
              <AnimatedCounter value="25,000+" duration={2200} liveTicker={true} tickerInterval={4000} />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Shipments Dispatched</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
              <AnimatedCounter value="99.4%" duration={2000} />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">On-Time Cargo Rate</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 font-display">
              <AnimatedCounter value="24/7" duration={1200} />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Dispatch Operations Desk</div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t('missionTitle')}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t('missionDesc')}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t('visionTitle')}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t('visionDesc')}
            </p>
          </div>
        </div>

        {/* Operational Pillars */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t('valuesTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('val1Title'), desc: t('val1Desc'), icon: Globe2, color: 'text-sky-400' },
              { title: t('val2Title'), desc: t('val2Desc'), icon: ShieldCheck, color: 'text-emerald-400' },
              { title: t('val3Title'), desc: t('val3Desc'), icon: Users, color: 'text-amber-400' },
              { title: t('val4Title'), desc: t('val4Desc'), icon: Award, color: 'text-purple-400' },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <Icon className={`w-8 h-8 ${col.color}`} />
                  <h3 className="text-base font-bold text-white">{col.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Have Questions for our Executive Logistics Team?
          </h3>
          <p className="text-slate-400 text-sm">
            Reach out directly to our corporate desk at <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline font-semibold">info@cargova-logistics.com</a>
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md transition-all"
            >
              Contact Operations Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
