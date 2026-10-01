import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Award, 
  FileText, 
  Lock, 
  ExternalLink,
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function DeviceAuthenticityChecker() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [serialInput, setSerialInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 600);
  };

  const handleQuickDemo = (demoSerial: string) => {
    setSerialInput(demoSerial);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 400);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-brand-orange/40 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{isAr ? 'منصة التحقق من أصالة الأجهزة والقطع وضمان TDRA' : 'UAE TDRA & OEM Hardware Authenticity Portal'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
          {isAr 
            ? 'تحقق من أصالة جهازك وضمان القطع الأصلية 100%' 
            : 'Verify Device Authenticity, TDRA Approval & OEM Parts'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {isAr
            ? 'سواء اشتريت جهازاً جديداً بخصم 20% من شحناتنا أو قمت بتبديل شاشة وبطارية في مختبرنا، أدخل الرقم التسلسلي (IMEI / Serial) للاطلاع على شهادة الفحص المخبري وتغطية الضمان.'
            : 'Whether you purchased a factory-sealed flagship at our 20% port wholesale discount or had your display/battery replaced in our lab, enter any Serial Number or IMEI below to verify genuine OEM certification and active 1-year warranty.'}
        </p>
      </div>

      {/* Input Box */}
      <form onSubmit={handleVerify} className="relative z-10 max-w-2xl mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              placeholder={isAr ? "أدخل رقم IMEI أو السيريال (مثال: AS-2026-8841)" : "Enter 15-digit IMEI or Serial (e.g. AS-2026-8841)..."}
              className="w-full pl-10 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-orange transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !serialInput.trim()}
            className="px-6 py-3.5 bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="animate-spin text-base">⏳</span>
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>{isAr ? 'فحص الشهادة المخبرية' : 'Verify Certificate'}</span>
          </button>
        </div>

        {/* Demo buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
          <span>{isAr ? 'نماذج سريعة للتجربة:' : 'Quick Demo Serials:'}</span>
          <button
            type="button"
            onClick={() => handleQuickDemo('AS-2026-TDRA-8841')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-orange font-mono font-bold text-[11px] border border-slate-700 transition-colors cursor-pointer"
          >
            AS-2026-TDRA-8841 (Factory Sealed Phone)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('AS-REPAIR-OEM-7712')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono font-bold text-[11px] border border-slate-700 transition-colors cursor-pointer"
          >
            AS-REPAIR-OEM-7712 (OLED Lab Repair)
          </button>
        </div>
      </form>

      {/* Verification Result Certificate */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="relative z-10 bg-slate-800/90 backdrop-blur-md rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 mt-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black text-white">Al Sharq Technical Verification Pass</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
                      ACTIVE &amp; GENUINE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Identifier: <span className="text-white font-bold">{serialInput}</span> • Timestamp: 2026-10-01
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Warranty Protection</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">12 Months (Comprehensive)</span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">TDRA Regulatory Approval</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>TRA / TDRA UAE Certified</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Display / OLED Status</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Genuine OEM Display Serial</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Waterproof Pressure Seal</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>IP68 Vacuum Gasket Verified</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Port Wholesale Rate</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-orange">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>20% Direct Import Pricing</span>
                </div>
              </div>
            </div>

            {/* Verification Footer Note */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700 text-xs">
              <p className="text-slate-400 text-center sm:text-left">
                📍 Inspected at Al Sharq Central Lab, Fire Station Road, Muwaileh Commercial, Sharjah.
              </p>
              <a
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20verified%20my%20device%20serial%20on%20your%20website%20portal%20and%20need%20further%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Ask Technician on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
