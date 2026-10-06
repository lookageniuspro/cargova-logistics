import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { 
  Ship, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');

  return (
    <footer className="bg-[#050b14] border-t border-slate-800 text-slate-400 text-sm">
      {/* Upper highlight row: Email dispatch banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-sky-950/40 via-slate-900 to-blue-950/40 p-6 rounded-2xl border border-sky-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white text-base font-bold">
                  Direct Freight Booking & Operations Desk
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  All requests and quotes are handled directly by our certified logistics coordinators.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:info@cargova-logistics.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                <span>info@cargova-logistics.com</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group py-1">
              <Image
                src="/cargova-logo-dark.png"
                alt="Cargova Logistics"
                width={210}
                height={74}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t('tagline')}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@cargova-logistics.com" className="hover:text-white transition-colors underline font-medium">
                  info@cargova-logistics.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+201282878325" className="hover:text-white transition-colors" dir="ltr">
                  +20 128 287 8325
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>24/7 Global Air & Ocean Dispatch</span>
              </div>
            </div>
          </div>

          {/* Logistics Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">
              {t('servicesTitle')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services/air-freight" className="hover:text-sky-400 transition-colors">
                  {tServices('airFreight.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/ocean-freight" className="hover:text-sky-400 transition-colors">
                  {tServices('oceanFreight.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/project-cargo" className="hover:text-sky-400 transition-colors">
                  {tServices('projectCargo.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/customs-brokerage" className="hover:text-sky-400 transition-colors">
                  {tServices('customsBrokerage.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/warehousing" className="hover:text-sky-400 transition-colors">
                  {tServices('warehousing.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/door-to-door" className="hover:text-sky-400 transition-colors">
                  {tServices('doorToDoor.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-sky-400 transition-colors">
                  {tNav('quote')}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-sky-400 transition-colors">
                  {tNav('track')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-sky-400 transition-colors">
                  {tNav('partners')}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-sky-400 transition-colors">
                  {tNav('knowledgeBase')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Operations & Notice */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">
              {t('contactTitle')}
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Retail Checkout</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('noPaymentNotice')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Global Port Network: Rotterdam • Singapore • Shanghai • Dubai • LA</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t('rights')}</p>
          <div className="flex items-center gap-6">
            <a href="mailto:info@cargova-logistics.com" className="text-slate-400 hover:text-white transition-colors">
              info@cargova-logistics.com
            </a>
            <span>•</span>
            <span>No Online Payment Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
