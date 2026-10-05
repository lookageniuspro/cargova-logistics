import { Link } from '@/i18n/navigation';
import { Ship, Mail, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/80 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto">
          <Ship className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-300">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested freight logistics page cannot be found. For assistance, contact our 24/7 team at{' '}
          <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline font-semibold">
            info@cargova-logistics.com
          </a>
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
