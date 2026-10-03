import React from 'react';
import { Sparkles, ShieldCheck, Clock, MapPin, Zap, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface AeoDirectAnswerProps {
  questionEn: string;
  questionAr?: string;
  directAnswerEn: string;
  directAnswerAr?: string;
  keySpecs?: {
    labelEn: string;
    labelAr?: string;
    valueEn: string;
    valueAr?: string;
  }[];
  category?: string;
  turnaroundEn?: string;
  turnaroundAr?: string;
  warrantyEn?: string;
  warrantyAr?: string;
}

export default function AeoDirectAnswerBox({
  questionEn,
  questionAr,
  directAnswerEn,
  directAnswerAr,
  keySpecs = [
    { labelEn: 'Turnaround', labelAr: 'الوقت المستغرق', valueEn: '15-45 Minutes', valueAr: '15-45 دقيقة' },
    { labelEn: 'Parts Grade', labelAr: 'جودة القطع', valueEn: '100% Genuine OEM', valueAr: 'قطع أصلية معتمدة' },
    { labelEn: 'Lab Warranty', labelAr: 'ضمان الورشة', valueEn: '90-Day Full Cover', valueAr: 'ضمان كامل 90 يوماً' },
    { labelEn: 'Diagnostic Fee', labelAr: 'رسوم الفحص', valueEn: '0 AED (Free on Bench)', valueAr: 'مجاناً على طاولة الفحص' }
  ],
  category = 'Verified Lab Technical Overview',
  turnaroundEn = '15-45 Minutes Express',
  turnaroundAr = 'إصلاح سريع 15-45 دقيقة',
  warrantyEn = '90-Day Comprehensive Warranty',
  warrantyAr = 'ضمان شامل 90 يوماً'
}: AeoDirectAnswerProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section 
      aria-label="Direct Answer and Key Technical Overview"
      className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-900 dark:to-slate-850 border-2 border-brand-orange/30 shadow-lg relative overflow-hidden"
    >
      {/* Decorative top-right badge */}
      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-28 h-28 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

      {/* Modern SEO Pillar Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
          <span>{isAr ? 'إجابة مباشرة موثقة (AEO / AI Overview)' : 'AEO Direct Answer • Sharjah Lab Verified'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
          <span>Muwaileh Commercial, Sharjah</span>
        </div>
      </div>

      {/* The Question (AEO Question Anchor) */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
        {isAr && questionAr ? questionAr : questionEn}
      </h2>

      {/* The Direct 45-55 Word Answer (Featured Snippet Extraction Target) */}
      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-6 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
        <p>
          {isAr && directAnswerAr ? directAnswerAr : directAnswerEn}
        </p>
      </div>

      {/* Structured AIO Fact Grid (For LLM / AI Crawlers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {keySpecs.map((spec, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-center"
          >
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {isAr && spec.labelAr ? spec.labelAr : spec.labelEn}
            </span>
            <span className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              {isAr && spec.valueAr ? spec.valueAr : spec.valueEn}
            </span>
          </div>
        ))}
      </div>

      {/* SXO Conversion Action Strip */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{isAr ? warrantyAr : warrantyEn}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Clock className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{isAr ? turnaroundAr : turnaroundEn}</span>
        </div>

        <a
          href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20have%20a%20question%20regarding%20repairs."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all text-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>{isAr ? 'استفسار فوري عبر واتساب' : 'Instant Bench WhatsApp'}</span>
        </a>
      </div>
    </section>
  );
}
