import React from 'react';
import { Check, X, Shield, DollarSign, Cpu, ArrowRight, Sparkles, Database } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GCCPriceComparison() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const comparisons = [
    {
      faultEn: 'MacBook Pro M1/M2/M3 Logic Board Failure (Dead / Water Damage)',
      faultAr: 'عطل مذربورد ماك بوك برو M1/M2/M3 (جهاز ميت أو تلف سوائل)',
      agencyPrice: '3,200 - 4,500 SAR',
      agencyData: false,
      agencyMethodEn: 'Total board swap (All SSD data permanently lost)',
      agencyMethodAr: 'استبدال كامل للمذربورد (فقدان جميع البيانات نهائياً)',
      sharjahPrice: '550 - 750 AED (~560 - 765 SAR)',
      sharjahData: true,
      sharjahMethodEn: 'Component micro-soldering (Power IC / Caps replaced)',
      sharjahMethodAr: 'لحام ميكروسكوبي دقيق للقطع المحترقة فقط',
      savings: '75% Savings (~2,600+ SAR)'
    },
    {
      faultEn: 'iPhone 15 / 16 / 18 Pro Max Stuck on Apple Logo (Baseband / CPU)',
      faultAr: 'آيفون 15 / 16 / 18 برو ماكس معلق على التفاحة أو عطل معالج',
      agencyPrice: '2,600 - 3,400 SAR',
      agencyData: false,
      agencyMethodEn: 'Device unit replacement only (Requires full wipe)',
      agencyMethodAr: 'استبدال كامل للجهاز (مسح شامل لجميع الذكريات)',
      sharjahPrice: '400 - 600 AED (~410 - 615 SAR)',
      sharjahData: true,
      sharjahMethodEn: 'CPU Reballing & EEPROM transfer (Original FaceID & TrueTone preserved)',
      sharjahMethodAr: 'إعادة شبلنة المعالج مع الحفاظ على بصمة الوجه الأصلية',
      savings: '78% Savings (~2,200+ SAR)'
    },
    {
      faultEn: 'Dead Phone / Crushed Board Forensic Data Recovery',
      faultAr: 'استعادة بيانات من هاتف محطم أو محروق تماماً',
      agencyPrice: 'Not Offered (Declared Unfixable)',
      agencyData: false,
      agencyMethodEn: 'Rejected by dealerships as non-repairable',
      agencyMethodAr: 'مرفوض لدى الوكالات ومراكز الصيانة المعتادة',
      sharjahPrice: '450 - 850 AED (~460 - 870 SAR)',
      sharjahData: true,
      sharjahMethodEn: 'Direct NAND chip-off extraction & donor board transplantation',
      sharjahMethodAr: 'استخراج مباشر لشرائح الذاكرة مع نقلها لبوردة مطابقة',
      savings: 'Priceless Data Retrieved'
    },
    {
      faultEn: 'Samsung Galaxy Z Fold 5 / 6 Hinge & Inner Ultra-Thin Glass Issue',
      faultAr: 'عطل مفصلة وشاشة سامسونج جالاكسي زد فولد القابلة للطي',
      agencyPrice: '2,400 - 3,100 SAR',
      agencyData: false,
      agencyMethodEn: 'Complete frame & screen assembly replacement',
      agencyMethodAr: 'تبديل كامل للشاشة والهيكل الخارجي بسعر باهظ',
      sharjahPrice: '550 - 950 AED (~560 - 970 SAR)',
      sharjahData: true,
      sharjahMethodEn: 'Precision hinge realignment & UTG flex cable re-soldering',
      sharjahMethodAr: 'صيانة ميكانيكية للمفصلة ولحام الكيبل الداخلي بدقة',
      savings: '70% Savings (~1,800+ SAR)'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm rounded-full mb-4">
            <DollarSign className="w-4 h-4" />
            <span>{isAr ? 'مقارنة التوفير المالي لعملاء الخليج' : 'Cost & Data Savings Analysis'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {isAr ? (
              <>لماذا يوفر عملاء السعودية والخليج <span className="text-brand-orange">أكثر من 70%</span> عند الشحن لمختبر الشارقة؟</>
            ) : (
              <>Why GCC Clients Save <span className="text-brand-orange">Over 70%</span> by Mailing to Sharjah Lab</>
            )}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'الوكالات والمراكز التقليدية في الرياض ومسقط والمنامة تقوم باستبدال كامل اللوحة الأم بأسعار تفوق ثمن الجهاز مع مسح كل بياناتك، بينما نقوم في الشارقة بإصلاح المكون المحترق فقط والحفاظ على كامل بياناتك وملفاتك.'
              : 'Dealerships and standard shops in Riyadh or Muscat typically demand full logic board replacement or declare devices unfixable—wiping all your photos and documents. In Sharjah, our chip-level engineers replace only the damaged micro-components, saving you thousands of Riyals.'}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {comparisons.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-black rounded-full">
                    {item.savings}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Case #0{idx + 1}</span>
                </div>

                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 dark:text-white mb-6">
                  {isAr ? item.faultAr : item.faultEn}
                </h3>

                {/* 2-Column Comparison Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  
                  {/* Agency / Local Shop */}
                  <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                    <div className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      <span>{isAr ? 'الوكالة / الصيانة التقليدية' : 'Agency / Local Dealership'}</span>
                    </div>
                    <div className="text-lg font-black text-gray-900 dark:text-white mb-2">
                      {item.agencyPrice}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                      {isAr ? item.agencyMethodAr : item.agencyMethodEn}
                    </p>
                    <div className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      <span>{isAr ? 'البيانات تُمسح بالكامل' : 'All Data Wiped'}</span>
                    </div>
                  </div>

                  {/* Al Sharq Sharjah Lab */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/40 relative overflow-hidden">
                    <div className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{isAr ? 'مختبر الشارقة (الشرق موبايل)' : 'Al Sharq Sharjah Lab'}</span>
                    </div>
                    <div className="text-lg font-black text-emerald-700 dark:text-emerald-300 mb-2">
                      {item.sharjahPrice}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                      {isAr ? item.sharjahMethodAr : item.sharjahMethodEn}
                    </p>
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" />
                      <span>{isAr ? '100% البيانات محفوظة بأمان' : '100% Data Preserved'}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  {isAr ? 'شامل فحص المجهر وضمان 90 يوماً' : 'Includes 90-day warranty & video proof'}
                </span>
                <a
                  href={`https://wa.me/971507117043?text=${encodeURIComponent(
                    `Hello Al Sharq Lab Sharjah! I saw your GCC savings comparison for ${item.faultEn}. I want to courier my device for repair.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  <span>{isAr ? 'احجز هذا الإصلاح' : 'Claim this repair'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner: Video Proof Guarantee */}
        <div className="bg-gradient-to-r from-brand-blue via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black mb-1">
                {isAr ? 'ضمان الفحص بالفيديو 4K قبل سداد أي مبلغ' : 'The 4K Video Verification & Trust Guarantee'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {isAr
                  ? 'لا نطلب سداد تكلفة الصيانة إلا بعد أن نرسل لك فيديو عالي الدقة يوضح جهازك وهو يعمل بنجاح ومطابقة الرقم التسلسلي، لضمان راحة بالك وأنت في بلدك.'
                  : 'We never ask for final repair payment until we send you a crystal-clear 4K video showing your device booted up, functioning, with serial number matching.'}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20would%20like%20to%20learn%20more%20about%20your%20video%20verification%20guarantee."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20"
          >
            {isAr ? 'تحدث مع مهندس المختبر' : 'Chat with Lab Engineer'}
          </a>
        </div>

      </div>
    </section>
  );
}
