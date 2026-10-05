import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, Clock, MapPin, ShieldCheck, Headphones, Globe2 } from 'lucide-react';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('contact');

  return (
    <div className="py-16 sm:py-24 bg-[#070e1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Headphones className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Contact Methods Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email card - Highlighted */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c1f3d] to-[#071326] border border-sky-500/40 shadow-xl space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {t('officialEmailTitle')}
              </h3>
              <a
                href="mailto:info@cargova-logistics.com"
                className="text-lg sm:text-xl font-bold text-sky-400 hover:text-sky-300 transition-colors block break-all font-mono"
              >
                info@cargova-logistics.com
              </a>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('responseTime')}
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Operations Dispatch Desk Active</span>
            </div>
          </div>

          {/* Phone / WhatsApp card */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {t('phoneTitle')}
              </h3>
              <a
                href="tel:+201282878325"
                className="text-lg sm:text-xl font-bold text-white hover:text-amber-400 transition-colors block font-mono"
                dir="ltr"
              >
                +20 128 287 8325
              </a>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('phoneDesc')}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              WhatsApp Available for Instant Cargo Milestones
            </div>
          </div>

          {/* Operational Trade Hubs */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Global Gateway Port Coverage
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Rotterdam • Antwerp • Shanghai • Ningbo • Singapore • Dubai • Los Angeles • Houston
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
              Strictly Corporate Invoicing & Wire Transfers
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="max-w-3xl mx-auto">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
