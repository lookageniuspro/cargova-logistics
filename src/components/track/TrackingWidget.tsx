'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Ship, 
  Plane, 
  AlertCircle, 
  Mail, 
  Calendar, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TimelineEvent {
  status: string;
  date: string;
  completed: boolean;
}

interface ShipmentData {
  trackingNumber: string;
  status: string;
  type: string;
  carrier?: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  timeline: TimelineEvent[];
}

interface TrackingWidgetProps {
  initialNumber?: string;
  locale: string;
}

export function TrackingWidget({ initialNumber = '', locale }: TrackingWidgetProps) {
  const t = useTranslations('track');
  const [trackingNumber, setTrackingNumber] = useState(initialNumber);
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTracking = async (num: string) => {
    if (!num.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setShipment(null);

    try {
      const res = await fetch(`/api/track/${encodeURIComponent(num.trim())}`);
      const data = await res.json();

      if (res.ok) {
        setShipment(data);
      } else {
        setErrorMsg(data.message || t('notFoundDesc'));
      }
    } catch (err) {
      setErrorMsg(t('notFoundDesc'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNumber) {
      fetchTracking(initialNumber);
    }
  }, [initialNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(trackingNumber);
  };

  const loadDemo = (num: string) => {
    setTrackingNumber(num);
    fetchTracking(num);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Searching...' : t('trackBtn')}</span>
          </button>
        </form>

        {/* Demo Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-400">
          <span>{t('demoHint')}</span>
          <button
            type="button"
            onClick={() => loadDemo('CGV2024001')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono border border-slate-700 transition-colors"
          >
            CGV2024001 (Air)
          </button>
          <button
            type="button"
            onClick={() => loadDemo('CGV2024002')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono border border-slate-700 transition-colors"
          >
            CGV2024002 (Ocean)
          </button>
        </div>
      </div>

      {/* Shipment Results */}
      {shipment && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                {t('shipmentDetails')}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-3">
                <span>{shipment.trackingNumber}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-sans font-semibold">
                  {shipment.type}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-white">{shipment.status}</span>
              </div>
            </div>
          </div>

          {/* Route Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{t('origin')}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">{shipment.origin}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{t('destination')}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">{shipment.destination}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{t('eta')}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-amber-400 font-mono">{shipment.estimatedDelivery}</p>
            </div>
          </div>

          {/* Milestone Timeline */}
          <div>
            <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>{t('timeline')}</span>
            </h4>

            <div className="relative border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-800 ml-4 rtl:ml-0 rtl:mr-4 space-y-6">
              {shipment.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[9px] rtl:-left-auto rtl:-right-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                      event.completed
                        ? 'bg-sky-500 border-sky-400 shadow-md shadow-sky-500/40'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p
                      className={`text-sm font-bold ${
                        event.completed ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {event.status}
                    </p>
                    <span
                      className={`text-xs font-mono ${
                        event.completed ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {event.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Support Email Box */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Need special cargo release or customs clearance assistance for this shipment?</span>
            </div>
            <a
              href={`mailto:info@cargova-logistics.com?subject=Inquiry on Shipment ${shipment.trackingNumber}`}
              className="px-4 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 border border-sky-500/40 font-semibold transition-colors flex-shrink-0"
            >
              Email Operations Desk
            </a>
          </div>
        </div>
      )}

      {/* Not Found Error Card with Direct Support */}
      {errorMsg && (
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('notFound')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {errorMsg}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Official 24/7 Operations Desk: <strong className="text-white">info@cargova-logistics.com</strong>
            </div>
            <a
              href={`mailto:info@cargova-logistics.com?subject=Manual Tracking Request: ${trackingNumber}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>{t('supportInquiry')}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
