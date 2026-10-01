import React, { useState } from 'react';
import { Battery, Flame, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Clock, Zap, RefreshCw, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BatteryThermalDiagnosticTool() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [deviceType, setDeviceType] = useState('iphone');
  const [batteryHealth, setBatteryHealth] = useState(78);
  const [heatLevel, setHeatLevel] = useState<'low' | 'medium' | 'extreme'>('medium');
  const [drainSpeed, setDrainSpeed] = useState<'normal' | 'fast' | 'shutoff'>('fast');
  const [isCalculated, setIsCalculated] = useState(false);

  // Diagnostic result calculations
  const calculateResult = () => {
    let score = 100;
    if (batteryHealth < 80) score -= 35;
    else if (batteryHealth < 85) score -= 20;

    if (heatLevel === 'extreme') score -= 30;
    else if (heatLevel === 'medium') score -= 15;

    if (drainSpeed === 'shutoff') score -= 35;
    else if (drainSpeed === 'fast') score -= 20;

    return Math.max(15, score);
  };

  const score = calculateResult();
  const isCritical = score < 50;
  const isWarning = score >= 50 && score < 75;

  const handleDiagnose = () => {
    setIsCalculated(true);
  };

  const getWhatsAppMessage = () => {
    const text = `Hello Al Sharq Lab, I completed the UAE Thermal & Battery Diagnostic on your website. My ${deviceType} scored ${score}/100 with battery health at ${batteryHealth}% and ${heatLevel} heat symptoms. I want to claim the 15% discount voucher (UAEHEAT15) for a 15-minute OEM battery replacement in Muwaileh.`;
    return `https://wa.me/971507117043?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>{isAr ? 'فحص البطارية وحرارة الصيف في الإمارات والخليج' : 'UAE & GCC Climate Thermal Battery Audit'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {isAr ? 'فاحص صحة البطارية والإجهاد الحراري الذكي' : 'Interactive Battery Health & Overheating Diagnostic'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تسبب حرارة الصيف (50° مئوية) في الإمارات انتفاخ البطاريات وتلف أداء الهاتف. افحص بطاريتك خلال 30 ثانية.'
              : 'UAE summer heat (up to 50°C) accelerates lithium degradation and causes thermal throttling. Test your device in 30 seconds.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0">
          <Clock className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {isAr ? 'تركيب خلال 15 دقيقة' : '15-Min Installation'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Section (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Device Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {isAr ? '1. نوع جهازك:' : '1. Select Your Device Type:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'iphone', label: 'Apple iPhone', icon: '📱' },
                { id: 'samsung', label: 'Samsung Galaxy', icon: '🤖' },
                { id: 'macbook', label: 'MacBook / Laptop', icon: '💻' },
                { id: 'ipad', label: 'iPad / Tablet', icon: '📟' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setDeviceType(d.id); setIsCalculated(false); }}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    deviceType === d.id
                      ? 'bg-brand-orange/10 border-brand-orange text-brand-orange shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg">{d.icon}</span>
                  <span>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Battery Health Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="battery-health-slider" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isAr ? '2. نسبة صحة البطارية الحالية:' : '2. Current Battery Health (%) in Settings:'}
              </label>
              <span className={`text-sm font-black px-2.5 py-0.5 rounded-lg ${
                batteryHealth < 80 
                  ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' 
                  : batteryHealth < 85
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
              }`}>
                {batteryHealth}%
              </span>
            </div>
            <input
              id="battery-health-slider"
              type="range"
              min="50"
              max="100"
              value={batteryHealth}
              onChange={(e) => { setBatteryHealth(Number(e.target.value)); setIsCalculated(false); }}
              aria-label="Current battery health percentage"
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-orange"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>50% (Critical Swelling)</span>
              <span>80% (Apple/Samsung Service Threshold)</span>
              <span>100% (New OEM)</span>
            </div>
          </div>

          {/* Step 3: Heat Symptoms */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {isAr ? '3. هل يسخن الجهاز أثناء الشحن أو الاستخدام؟' : '3. Thermal Overheating Symptoms:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Normal Warmth', labelAr: 'حرارة طبيعية', desc: 'No warning alerts' },
                { id: 'medium', label: 'Gets Hot Fast', labelAr: 'يسخن بسرعة', desc: 'Warm in AC, hot in car' },
                { id: 'extreme', label: 'Thermal Warning', labelAr: 'تنبيه الحرارة يظهر', desc: 'Stops charging or lags' }
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => { setHeatLevel(h.id as any); setIsCalculated(false); }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    heatLevel === h.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="font-bold">{isAr ? h.labelAr : h.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{h.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Drain Behavior */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {isAr ? '4. سلوك تفريغ الشحن اليومي:' : '4. Daily Battery Drain Behavior:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Lasts Whole Day', labelAr: 'يدوم طوال اليوم' },
                { id: 'fast', label: 'Dies in 3-5 Hours', labelAr: 'ينفد في 3-5 ساعات' },
                { id: 'shutoff', label: 'Random Shut-Offs', labelAr: 'يطفئ فجأة بنسبة 30%' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setDrainSpeed(d.id as any); setIsCalculated(false); }}
                  className={`p-2.5 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                    drainSpeed === d.id
                      ? 'bg-brand-blue/10 border-brand-blue text-brand-blue dark:text-blue-400 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>{isAr ? d.labelAr : d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDiagnose}
            className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Zap className="w-4 h-4" />
            <span>{isAr ? 'تحليل الحالة وإصدار تقرير الفحص والخصم' : 'Analyze Battery Health & Generate Discount Voucher'}</span>
          </button>
        </div>

        {/* Results Card (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-mono">Diagnostic Report</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">
                Muwaileh Lab Certified
              </span>
            </div>

            {/* Score Radial Visual */}
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 ${
                isCritical 
                  ? 'border-red-500 bg-red-500/20 text-red-400' 
                  : isWarning 
                  ? 'border-amber-500 bg-amber-500/20 text-amber-400' 
                  : 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
              }`}>
                <span className="text-2xl font-black font-mono">{score}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">/ 100</span>
              </div>

              <div>
                <h4 className="text-base font-black">
                  {isCritical 
                    ? (isAr ? 'تحذير حرج: خطر انتفاخ البطارية' : 'Critical: Severe Battery Thermal Degradation') 
                    : isWarning 
                    ? (isAr ? 'حالة متوسطة: ضعف في سعة الشحن' : 'Warning: Moderate Capacity Loss') 
                    : (isAr ? 'حالة ممتازة: البطارية تعمل بكفاءة' : 'Good Condition: Stable Thermal Curve')}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {isCritical
                    ? (isAr ? 'البطارية معرضة لخطر الانتفاخ وكسر الشاشة الخلفية في صيف الإمارات.' : 'High risk of lithium expansion or thermal shutdown in UAE car cabins.')
                    : (isAr ? 'ينصح بتبديل البطارية خلال 15 دقيقة للحفاظ على سرعة المعالج.' : 'Replacement recommended to restore 100% peak CPU clock speeds.')}
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Original 0-Cycle OEM Grade Cell</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Laser-welded thermal circuit breaker (UAE Heat Tested)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>15-Minute Fast Bench Service in Muwaileh</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1-Year Comprehensive Warranty</span>
              </div>
            </div>

            {/* Voucher Box */}
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-300 block">VIP Discount Code</span>
                <span className="font-mono font-black text-sm text-white tracking-wider">UAEHEAT15</span>
              </div>
              <span className="px-2.5 py-1 bg-brand-orange text-white text-xs font-black rounded-xl">
                15% OFF
              </span>
            </div>

            {/* 1-Click WhatsApp Booking */}
            <a
              href={getWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'حجز تبديل فوري عبر واتساب (15 دقيقة)' : 'Claim 15% OFF on WhatsApp (15-Min Fix)'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
