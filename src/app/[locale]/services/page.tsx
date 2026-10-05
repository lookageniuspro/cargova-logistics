import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Services } from '@/components/home/Services';
import { Link } from '@/i18n/navigation';
import { ShieldCheck, Mail, Calculator } from 'lucide-react';

interface ServicesPageProps {
  params: {
    locale: string;
  };
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  unstable_setRequestLocale(locale);

  return (
    <div className="py-12 bg-[#070e1a]">
      <Services />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Need a Custom Multimodal Logistics Contract?
            </h3>
            <p className="text-sm text-slate-400">
              Our freight architects design tailored supply chain programs. Email specifications to <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline font-semibold">info@cargova-logistics.com</a>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md transition-all"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
