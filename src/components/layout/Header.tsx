'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Ship, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  Search, 
  Calculator, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-[#070e1a] sm:bg-[#070e1a]/95 sm:backdrop-blur-xl border-b border-slate-800/80 transition-all"
      style={{ WebkitBackfaceVisibility: 'hidden', transform: 'translate3d(0, 0, 0)' }}
    >
      {/* Top micro bar for global dispatch & official email */}
      <div className="bg-[#070e1a] border-b border-slate-800/60 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Mandatory official email */}
            <a
              href="mailto:info@cargova-logistics.com"
              className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>info@cargova-logistics.com</span>
            </a>
            <a
              href="tel:+201282878325"
              className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">+20 128 287 8325</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Global Freight Dispatch Active</span>
            </div>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">CARGOVA</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  GLOBAL
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                Freight & Logistics
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('services')}
            </Link>
            <Link
              href="/partners"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('partners')}
            </Link>
            <Link
              href="/knowledge-base"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('knowledgeBase')}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/track"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700/80 hover:border-sky-500/50 transition-all shadow-sm"
            >
              <Search className="w-4 h-4 text-sky-400" />
              <span>{t('track')}</span>
            </Link>

            <Link
              href="/quote"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>{t('quote')}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070e1a]/98 px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('about')}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('services')}
            </Link>
            <Link
              href="/partners"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('partners')}
            </Link>
            <Link
              href="/knowledge-base"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('knowledgeBase')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/80 font-medium"
            >
              {t('contact')}
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700"
            >
              <Search className="w-4 h-4 text-sky-400" />
              <span>{t('track')}</span>
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>{t('quote')}</span>
            </Link>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            Official Desk: <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline">info@cargova-logistics.com</a>
          </div>
        </div>
      )}
    </header>
  );
}
