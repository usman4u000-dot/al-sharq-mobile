import React, { useState } from 'react';
import { 
  Smartphone, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  DollarSign, 
  Cpu, 
  Layers,
  Sparkles,
  RefreshCw,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export interface DiagnosticOption {
  id: string;
  iconText: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  diagnosisEn: string;
  diagnosisAr: string;
  repairTypeEn: string;
  repairTypeAr: string;
  avgCostAED: string;
  estimatedTime: string;
  recommendationEn: string;
  recommendationAr: string;
  badgeType: 'glass' | 'oled' | 'logic-board' | 'battery';
}

const SYMPTOM_OPTIONS: DiagnosticOption[] = [
  {
    id: 'glass-only',
    iconText: '🪟',
    titleEn: 'Glass Cracked, but Touch & Display Perfect',
    titleAr: 'الزجاج الخارجي مكسور فقط واللمس والصورة سليمان 100%',
    descEn: 'Hairline cracks or spiderweb glass, but all colors are crystal clear and touch responds smoothly everywhere.',
    descAr: 'شروخ أو كسر في الزجاج الخارجي، لكن الألوان واضحة تماماً وبدون خطوط واللمس يعمل بشكل طبيعي.',
    diagnosisEn: 'Outer Front Glass Fracture Only (OLED Core is 100% Intact)',
    diagnosisAr: 'كسر زجاج حماية خارجي فقط (لوحة الأوليد الداخلية سليمة تماماً)',
    repairTypeEn: 'Precision OCA Optical Glass Lamination (Preserves Original Apple/Samsung Display)',
    repairTypeAr: 'كبس زجاج حراري بتقنية OCA (يحافظ على شاشتك الأصلية مع ميزة TrueTone)',
    avgCostAED: 'AED 120 - AED 280 (Saves 60% vs Complete Screen Swap)',
    estimatedTime: '25 - 35 Minutes',
    recommendationEn: 'Do NOT pay for a full screen replacement! Our vacuum OCA autoclave machine separates and laminates new Corning glass while keeping your factory OLED intact.',
    recommendationAr: 'لا تدفع قيمة شاشة كاملة! يقوم فنيونا بفصل الزجاج المكسور وكبس زجاج أصلي جديد مع الاحتفاظ بلوحة الألوان واللمس الأصلية.',
    badgeType: 'glass'
  },
  {
    id: 'oled-damage',
    iconText: '🟢',
    titleEn: 'Green Lines, Black Ink Blotches or Flickering',
    titleAr: 'خطوط خضراء عمودية، بقع حبر سوداء، أو وميض بالشاشة',
    descEn: 'Vertical laser lines (green/pink), black circular ink bleeding, or dead touch zones after a heavy drop.',
    descAr: 'ظهور خطوط خضراء أو وردية، أو بقعة سوداء تتوسع كالحبر، أو اللمس لا يستجيب في أجزاء من الشاشة.',
    diagnosisEn: 'Direct OLED / AMOLED Substrate Fracture',
    diagnosisAr: 'تلف داخلي في مصفوفة بيكسلات الأوليد (OLED Substrate Damage)',
    repairTypeEn: 'Complete OEM Grade Screen & Digitizer Assembly Replacement',
    repairTypeAr: 'تبديل كامل طقم الشاشة مع اللمس (OEM Grade Display Assembly)',
    avgCostAED: 'AED 180 - AED 650 (Depending on device generation)',
    estimatedTime: '20 - 30 Minutes',
    recommendationEn: 'The microscopic organic light emitting diodes have cracked. We replace the entire screen assembly with genuine OEM displays, re-programming serial chips to prevent non-genuine warnings.',
    recommendationAr: 'تكسرت البيكسلات الداخلية للشاشة. نقوم بتركيب شاشة أصلية جديدة مع نقل شفرة الرقم التسلسلي (EEPROM) لتجنب رسائل القطع غير المعروفة.',
    badgeType: 'oled'
  },
  {
    id: 'black-screen-vibrate',
    iconText: '⚡',
    titleEn: 'Completely Black Screen, but Phone Vibrates & Rings',
    titleAr: 'الشاشة سوداء تماماً ولكن الجهاز يرن ويهتز ويستقبل إشعارات',
    descEn: 'The screen is completely off/pitch black, but incoming calls ring, alarms go off, or vibrations work when plugging in charger.',
    descAr: 'الشاشة مطفأة بالكامل، ولكن الهاتف يصدر صوتاً عند الاتصال به أو يهتز عند وضع الشاحن.',
    diagnosisEn: 'Display Backlight Circuit Blown OR Power PMIC Rail Disconnected',
    diagnosisAr: 'عطل في خط تغذية الإضاءة (Backlight Rail) أو كابل الشاشة الداخلي',
    repairTypeEn: 'Logic Board Micro-Soldering OR Display FPC Cable Re-connection',
    repairTypeAr: 'لحام مجهري لدارة الإضاءة بالبورد أو إعادة تثبيت كيبل الشاشة FPC',
    avgCostAED: 'AED 90 - AED 250',
    estimatedTime: '30 - 45 Minutes',
    recommendationEn: 'Most other shops will falsely charge you for an entire screen! Often, the motherboard backlight filter is simply blown from a drop shock, which our micro-soldering bench fixes in 30 minutes.',
    recommendationAr: 'تحذير: معظم المحلات تطلب تبديل شاشة كاملة مكلفة! في 70% من هذه الحالات يكون العطل مجرد فيوز أو فلتر إضاءة محترق بالبورد نصلحه بالمجهر بتكلفة منخفضة.',
    badgeType: 'logic-board'
  },
  {
    id: 'dead-no-charge',
    iconText: '💀',
    titleEn: 'Completely Dead: No Screen, No Vibration, Won\'t Charge',
    titleAr: 'الجهاز ميت بالكامل: لا استجابة، لا شحن، ولا صوت نهائياً',
    descEn: 'Device shows 0.00 Amps on USB meter, gets warm near the camera when plugged in, or happened after liquid spill/car charger spike.',
    descAr: 'الهاتف لا يسحب أمبير على الشاحن، أو يسخن فجأة عند محاولة تشغيله بعد التعرض للماء أو شاحن سيارة رديء.',
    diagnosisEn: 'Primary Power IC (PMIC) Short-Circuit or VDD_MAIN Voltage Drop',
    diagnosisAr: 'شورت كهربائي في دارة الطاقة الرئيسية (VDD_MAIN / PMIC Short)',
    repairTypeEn: 'Level 4 Motherboard Micro-Soldering with Thermal Infrared Inspection',
    repairTypeAr: 'صيانة ماذر بورد مستوى 4 بالفحص الحراري بالأشعة تحت الحمراء',
    avgCostAED: 'AED 180 - AED 450 (Apple dealership charges AED 2,500+ for board swap)',
    estimatedTime: '1 - 2 Hours',
    recommendationEn: 'Your logic board has a grounded ceramic capacitor or blown power management chip. Dealerships refuse to repair boards and demand you buy a new device. Our lab repairs the chip and saves 100% of your data!',
    recommendationAr: 'الوكالات ترفض تصليح الماذر بورد وتطلب مبالغ طائلة لتبديل الجهاز مع فقدان جميع صورك. مهندسونا يصلحون المكثف المحروق فقط مع الحفاظ الكامل على بياناتك.',
    badgeType: 'logic-board'
  }
];

export default function DisplayVsMotherboardDiagnostic() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedId, setSelectedId] = useState<string>('glass-only');
  const selectedOption = SYMPTOM_OPTIONS.find(o => o.id === selectedId) || SYMPTOM_OPTIONS[0];

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Al Sharq Lab, I used your Screen vs Motherboard Diagnostic tool. My device symptom: "${selectedOption.titleEn}". Diagnosis: ${selectedOption.diagnosisEn}. I would like to book an inspection at your Muwaileh bench.`;
    return `https://wa.me/971507117043?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-brand-orange/30 shadow-2xl p-6 sm:p-10 transition-colors">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>{isAr ? 'أداة التشخيص التفاعلي الذكي للأعطال' : 'Interactive Display vs Logic Board Diagnostic'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          {isAr
            ? 'هل جهازك يحتاج زجاج خارجي، شاشة كاملة، أم صيانة ماذر بورد؟'
            : 'Do You Need Glass Only, Full Screen, or Logic Board Repair?'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isAr
            ? 'الكثير من الورش تطالب بتبديل شاشات كاملة بأسعار باهظة بينما العطل قد يكون مجرد كسر زجاج خارجي أو فيوز إضاءة بسيط. اختر الأعراض التي تظهر على شاشتك لاكتشاف العطل الحقيقي والتكلفة العادلة.'
            : 'Stop overpaying for complete display assemblies when only your outer glass is cracked, or getting misdiagnosed when your backlight filter is blown. Select your symptom below to discover the exact technical repair required.'}
        </p>
      </div>

      {/* 4 Interactive Symptom Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {SYMPTOM_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedId === opt.id
                ? 'bg-brand-orange/10 border-brand-orange shadow-md scale-[1.02]'
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{opt.iconText}</span>
                {selectedId === opt.id && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                )}
              </div>
              <h4 className={`text-xs sm:text-sm font-black mb-1 leading-snug ${
                selectedId === opt.id ? 'text-brand-orange' : 'text-slate-900 dark:text-white'
              }`}>
                {isAr ? opt.titleAr : opt.titleEn}
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
              {isAr ? opt.descAr : opt.descEn}
            </p>
          </button>
        ))}
      </div>

      {/* Diagnostic Evaluation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Verified Lab Diagnosis
                </span>
                <span className="px-3 py-0.5 rounded-full bg-brand-orange/20 text-orange-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {selectedOption.estimatedTime}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {isAr ? selectedOption.diagnosisAr : selectedOption.diagnosisEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {isAr ? selectedOption.repairTypeAr : selectedOption.repairTypeEn}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 shrink-0 text-center sm:text-right min-w-[200px]">
              <span className="text-[10px] uppercase font-mono text-slate-300 block mb-0.5">
                Estimated Cost Benchmark
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-400 font-mono block">
                {selectedOption.avgCostAED}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                Includes 1-Year Lab Warranty
              </span>
            </div>
          </div>

          {/* Expert Technical Advice */}
          <div className="py-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'نصيحة المهندس لتجنب الاستغلال المالي:' : 'Master Engineer Recommendation (Anti-Ripoff Guide):'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
              {isAr ? selectedOption.recommendationAr : selectedOption.recommendationEn}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free on-bench 40x microscope inspection in Muwaileh</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isAr ? 'حجز فحص مباشر عبر واتساب' : 'Book Exact Diagnosis on WhatsApp'}</span>
              </a>

              <Link
                to="/repair-estimate"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 border border-white/20 transition-colors"
              >
                <span>{isAr ? 'حاسبة الأسعار الشاملة' : 'Calculate Detailed Estimate'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
