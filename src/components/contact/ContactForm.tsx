'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, Clock, Building } from 'lucide-react';

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setServerMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });

      if (response.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        {t('formTitle')}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-8">
        Routed directly to our 24/7 freight operations desk at <a href="mailto:info@cargova-logistics.com" className="text-sky-400 underline font-medium">info@cargova-logistics.com</a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('name')}
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('email')}
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. sarah@enterprise.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('phoneField')}
            </label>
            <input
              name="phone"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('company')}
            </label>
            <input
              name="company"
              placeholder="e.g. Apex Global Trading"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {t('service')}
          </label>
          <select
            name="service"
            required
            defaultValue="ocean"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
          >
            <option value="air">{t('servicesOptions.air')}</option>
            <option value="ocean">{t('servicesOptions.ocean')}</option>
            <option value="project">{t('servicesOptions.project')}</option>
            <option value="customs">{t('servicesOptions.customs')}</option>
            <option value="warehousing">{t('servicesOptions.warehousing')}</option>
            <option value="doorToDoor">{t('servicesOptions.doorToDoor')}</option>
            <option value="other">{t('servicesOptions.other')}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {t('message')}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Please detail your cargo volume, origin/destination ports, target readiness dates, or customs questions..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{status === 'sending' ? t('sending') : t('send')}</span>
        </button>

        {status === 'sent' && (
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{t('success')}</p>
              <p className="text-xs text-emerald-400/80 mt-1">Official Desk: info@cargova-logistics.com</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/40 text-red-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{t('error')}</p>
              <p className="text-xs text-red-400/80 mt-1">
                Please email us directly at <a href="mailto:info@cargova-logistics.com" className="underline font-bold">info@cargova-logistics.com</a>
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
