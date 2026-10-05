import { unstable_setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { PartnersMarquee } from '@/components/home/PartnersMarquee';
import { Services } from '@/components/home/Services';
import { Link } from '@/i18n/navigation';
import { ShieldCheck, Mail, ArrowRight, Calculator, Clock } from 'lucide-react';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <Services />
      <PartnersMarquee />

      {/* Conversion Banner Section */}
      <section className="py-20 bg-gradient-to-b from-[#081120] to-[#070e1a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-sky-950/70 via-slate-900 to-blue-950/70 border border-sky-500/30 p-8 sm:p-14 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hidden Fees • Direct Carrier Allocations</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Optimize Your Global Freight Operations?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect directly with our pricing desk. Submit your cargo specifications and receive a transparent, itemized quote within 2 hours.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/quote"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Request Instant Freight Quote</span>
                </Link>

                <a
                  href="mailto:info@cargova-logistics.com"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>info@cargova-logistics.com</span>
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>No credit card required. All invoicing managed via corporate B2B credit and bank transfers.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
