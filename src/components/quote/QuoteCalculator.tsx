'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Plane, 
  Ship, 
  Truck, 
  Anchor, 
  ShieldCheck, 
  FileCheck, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuoteCalculatorProps {
  locale: string;
}

export function QuoteCalculator({ locale }: QuoteCalculatorProps) {
  const t = useTranslations('quote');

  // Form parameters
  const [serviceType, setServiceType] = useState('ocean-fcl');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState<number | ''>(500);
  const [volume, setVolume] = useState<number | ''>(3);
  const [cargoValue, setCargoValue] = useState<number | ''>(15000);
  const [insurance, setInsurance] = useState(true);
  const [customs, setCustoms] = useState(true);
  const [hazardous, setHazardous] = useState(false);

  // Contact info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');

  // Status
  const [isCalculated, setIsCalculated] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Rate calculation formula (realistic freight modeling)
  const calcBaseRate = () => {
    const w = Number(weight) || 100;
    const v = Number(volume) || 1;

    switch (serviceType) {
      case 'air-freight':
        // Air freight is charged on chargeable weight (volumetric 1 CBM = 167 KG)
        const chargeableAir = Math.max(w, v * 167);
        return Math.round(chargeableAir * 4.8 + 250);
      case 'ocean-fcl':
        // Standard FCL base rate estimate
        return 2400 + Math.round(v * 25);
      case 'ocean-lcl':
        // LCL is charged per w/m (ton or cbm)
        const wm = Math.max(w / 1000, v);
        return Math.round(wm * 185 + 320);
      case 'project-cargo':
        return Math.round(w * 1.8 + 3500);
      case 'door-to-door':
        return Math.round(w * 3.2 + 850);
      default:
        return 1500;
    }
  };

  const baseRate = calcBaseRate();
  const insuranceFee = insurance ? Math.max(85, Math.round((Number(cargoValue) || 10000) * 0.0035)) : 0;
  const customsFee = customs ? 350 : 0;
  const hazmatSurcharge = hazardous ? Math.round(baseRate * 0.25) : 0;

  const totalMin = baseRate + insuranceFee + customsFee + hazmatSurcharge;
  const totalMax = Math.round(totalMin * 1.18);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setFeedbackMessage('');

    try {
      const payload = {
        name,
        email,
        phone,
        company,
        origin,
        destination,
        serviceType,
        weight,
        volume,
        cargoValue,
        insurance,
        customs,
        hazardous,
        notes,
        estimatedTotal: `$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`,
        locale,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus('sent');
        setFeedbackMessage(t('success'));
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(t('error'));
      }
    } catch (err) {
      setSubmitStatus('error');
      setFeedbackMessage(t('error'));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Parameters & Specifications (Left 7 Cols) */}
      <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Routing & Mode */}
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide mb-4">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">1</span>
              <span>{t('step1')}</span>
            </div>

            {/* Service Type selector pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
              {[
                { id: 'ocean-fcl', label: 'Ocean FCL', icon: Ship },
                { id: 'ocean-lcl', label: 'Ocean LCL', icon: Ship },
                { id: 'air-freight', label: 'Air Freight', icon: Plane },
                { id: 'project-cargo', label: 'Project Cargo', icon: Anchor },
                { id: 'door-to-door', label: 'Door to Door', icon: Truck },
              ].map((svc) => {
                const Icon = svc.icon;
                const isSelected = serviceType === svc.id;
                return (
                  <button
                    type="button"
                    key={svc.id}
                    onClick={() => setServiceType(svc.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-sky-600/20 border-sky-500 text-sky-300 shadow-sm shadow-sky-500/10'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>{svc.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('origin')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shanghai Port (CNSHA)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('destination')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rotterdam (NLRTM) or Hamburg"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Dimensions & Options */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide mb-4">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">2</span>
              <span>{t('step2')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('weight')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('volume')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('cargoValue')}
                </label>
                <input
                  type="number"
                  min="100"
                  value={cargoValue}
                  onChange={(e) => setCargoValue(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-slate-600 focus:ring-sky-500"
                />
                <span className="text-xs sm:text-sm text-slate-300">
                  {t('insurance')}
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customs}
                  onChange={(e) => setCustoms(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-slate-600 focus:ring-sky-500"
                />
                <span className="text-xs sm:text-sm text-slate-300">
                  {t('customs')}
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hazardous}
                  onChange={(e) => setHazardous(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-amber-500"
                />
                <span className="text-xs sm:text-sm text-slate-300">
                  {t('hazardous')}
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Shipper Details */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide mb-4">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">3</span>
              <span>{t('step3')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('name')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="operations@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('phone')}
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('company')}
                </label>
                <input
                  type="text"
                  placeholder="Global Trading Ltd"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('notes')}
              </label>
              <textarea
                rows={3}
                placeholder="Cargo commodities, special handling or required sailing dates..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{submitStatus === 'sending' ? t('submitting') : t('submitQuote')}</span>
            </button>
          </div>

          {submitStatus === 'sent' && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{feedbackMessage}</p>
                <p className="text-xs text-emerald-400/80 mt-1">Official Desk: info@cargova-logistics.com</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{feedbackMessage}</p>
                <p className="text-xs text-red-400/80 mt-1">
                  You can also directly email <a href="mailto:info@cargova-logistics.com" className="underline font-bold">info@cargova-logistics.com</a>
                </p>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Live Estimate Card (Right 5 Cols) */}
      <div className="lg:col-span-5 space-y-6 sticky top-28">
        <div className="bg-gradient-to-br from-[#0c1f3d] to-[#071326] border border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('estimatedRange')}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">USD</span>
          </div>

          <div className="mb-6">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              ${totalMin.toLocaleString()} - ${totalMax.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Indicative freight estimation based on current spot rates</span>
            </p>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-300">
              <span>{t('baseRate')}</span>
              <span className="font-mono font-semibold">${baseRate.toLocaleString()}</span>
            </div>

            {insurance && (
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('insuranceFee')}</span>
                </span>
                <span className="font-mono font-semibold text-emerald-400">+${insuranceFee.toLocaleString()}</span>
              </div>
            )}

            {customs && (
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('customsFee')}</span>
                </span>
                <span className="font-mono font-semibold text-sky-400">+${customsFee.toLocaleString()}</span>
              </div>
            )}

            {hazardous && (
              <div className="flex items-center justify-between text-amber-300">
                <span>IMO/DGR Surcharge (25%)</span>
                <span className="font-mono font-semibold">+${hazmatSurcharge.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Guaranteed No Payment Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparent B2B Invoicing</span>
            </div>
            <p className="leading-relaxed">
              {t('noPaymentNotice')}
            </p>
            <div className="pt-1 text-[11px] text-sky-400">
              Official Desk: info@cargova-logistics.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
