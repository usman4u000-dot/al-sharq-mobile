import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Clock,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import UAEDirhamSymbol from './UAEDirhamSymbol';

export interface RepairComparisonItem {
  id: string;
  category: 'iPhone' | 'MacBook' | 'Samsung' | 'Motherboard' | 'DataRecovery';
  serviceNameEn: string;
  serviceNameAr: string;
  deviceModel: string;
  marketAverageAED: number;
  ourPriceAED: number;
  turnaroundTime: string;
  partsQualityEn: string;
  partsQualityAr: string;
  highlightBadge?: string;
}

const defaultComparisons: RepairComparisonItem[] = [
  {
    id: 'ip18-screen',
    category: 'iPhone',
    serviceNameEn: 'iPhone 18 Pro Max OLED Display & TrueTone Calibration',
    serviceNameAr: 'شاشة آيفون 18 برو ماکس الأصلية مع برمجة ترو تون',
    deviceModel: 'iPhone 18 Pro / Pro Max',
    marketAverageAED: 1350,
    ourPriceAED: 1080, // Exactly 20% lower
    turnaroundTime: '30 - 45 Minutes',
    partsQualityEn: 'Original 120Hz LTPO OLED + Lifetime Tempered Glass',
    partsQualityAr: 'شاشة أصلية 120Hz مع حماية زجاجية مجانية',
    highlightBadge: '20% OFF Deal'
  },
  {
    id: 'ip17-screen',
    category: 'iPhone',
    serviceNameEn: 'iPhone 17 Pro Max Original Display Replacement',
    serviceNameAr: 'تبديل شاشة آيفون 17 برو ماكس الأصلية',
    deviceModel: 'iPhone 17 Pro / Pro Max',
    marketAverageAED: 1100,
    ourPriceAED: 880, // Exactly 20% lower
    turnaroundTime: '30 Minutes',
    partsQualityEn: '100% Genuine Apple Screen + IP68 Water Seal Restored',
    partsQualityAr: 'شاشة أصلية مع استعادة عازل الماء والغبار',
    highlightBadge: 'Save AED 220'
  },
  {
    id: 'ip16-board',
    category: 'iPhone',
    serviceNameEn: 'iPhone 16 Pro Max Logic Board & Baseband No-Service Repair',
    serviceNameAr: 'صيانة بوردة آيفون 16 برو ماكس وعطل الشبكة والـ Baseband',
    deviceModel: 'iPhone 16 Pro / Pro Max',
    marketAverageAED: 750,
    ourPriceAED: 550, // 27% lower
    turnaroundTime: '2 - 3 Hours',
    partsQualityEn: 'Micro-soldering under 40x microscope (No board swap)',
    partsQualityAr: 'لحام ميكروسكوبي دقيق دون الحاجة لتبديل البورد بالكامل',
    highlightBadge: 'Best Seller'
  },
  {
    id: 'mac-m4-board',
    category: 'MacBook',
    serviceNameEn: 'MacBook Pro M4 Max Liquid Damage Logic Board Reconstruction',
    serviceNameAr: 'صيانة مذربورد ماك بوك برو M4 تالف بالسوائل والقهوة',
    deviceModel: 'MacBook Pro 14" & 16" (M4 / M4 Max)',
    marketAverageAED: 3800, // Official Apple Store full board swap
    ourPriceAED: 750, // Massive 80% savings vs dealership
    turnaroundTime: '24 Hours',
    partsQualityEn: 'Component-level capacitor/PMIC rebuild (All SSD data preserved)',
    partsQualityAr: 'إصلاح القطع المحترقة فقط مع الحفاظ على كامل البيانات',
    highlightBadge: 'Save AED 3,050 vs Agency'
  },
  {
    id: 'mac-screen',
    category: 'MacBook',
    serviceNameEn: 'MacBook Pro 16" Liquid Retina XDR Screen Replacement',
    serviceNameAr: 'تبديل شاشة ماك بوك برو 16 إنش ريتينا XDR الأصلية',
    deviceModel: 'MacBook Pro 16" (M1 - M4)',
    marketAverageAED: 2600,
    ourPriceAED: 1950, // 25% lower
    turnaroundTime: 'Same Day',
    partsQualityEn: 'Grade A+ Factory Assembly with TrueTone Ambient Sensor',
    partsQualityAr: 'شاشة كاملة أصلية مع حساس الإضاءة المحيطية',
    highlightBadge: 'Top Tier'
  },
  {
    id: 's26-screen',
    category: 'Samsung',
    serviceNameEn: 'Samsung Galaxy S26 Ultra Dynamic AMOLED 2X Display',
    serviceNameAr: 'شاشة سامسونج جالكسي S26 الترا دايناميك أموليد',
    deviceModel: 'Samsung Galaxy S26 Ultra 5G',
    marketAverageAED: 1400,
    ourPriceAED: 1120, // 20% lower
    turnaroundTime: '45 Minutes',
    partsQualityEn: 'Original Samsung Service Pack with Titanium Mid-Frame',
    partsQualityAr: 'شاشة سامسونج أصلية سيرفس باك مع فریم تيتانيوم',
    highlightBadge: '20% Below Market'
  },
  {
    id: 'zfold7-hinge',
    category: 'Samsung',
    serviceNameEn: 'Samsung Galaxy Z Fold 7 Hinge Realignment & Flexible OLED Restoration',
    serviceNameAr: 'إصلاح مفصلة وشاشة سامسونج زد فولد 7 القابلة للطي',
    deviceModel: 'Galaxy Z Fold 7 / Z Fold 6',
    marketAverageAED: 2400,
    ourPriceAED: 850, // 65% lower than full unit replacement
    turnaroundTime: '1 - 2 Days',
    partsQualityEn: 'Precision gear cleaning + micro-bristle realignment',
    partsQualityAr: 'تنظيف مسننات المفصلة بالموجات فوق الصوتية وضبط الزوايا',
    highlightBadge: 'Huge Savings'
  },
  {
    id: 'data-recovery',
    category: 'DataRecovery',
    serviceNameEn: 'Forensic NAND Flash Chip-Off Data Recovery (Dead / Crushed Phone)',
    serviceNameAr: 'استعادة بيانات جنائية من رقائق الذاكرة (جهاز محطم أو ميت)',
    deviceModel: 'All iPhones, MacBooks & Galaxy Devices',
    marketAverageAED: 1600,
    ourPriceAED: 650, // 60% lower
    turnaroundTime: '24 - 48 Hours',
    partsQualityEn: 'Cleanroom extraction • Strict No-Data No-Fee policy',
    partsQualityAr: 'استخراج في غرفة معقمة • لا بيانات = لا رسوم إطلاقاً',
    highlightBadge: 'Priceless Data'
  }
];

export interface RepairPriceComparisonProps {
  currentCategory?: 'iPhone' | 'MacBook' | 'Samsung' | 'Motherboard' | 'DataRecovery' | 'All';
  titleEn?: string;
  titleAr?: string;
}

export default function RepairPriceComparison({
  currentCategory = 'All',
  titleEn = 'Repair Price Comparison: Our Sharjah Lab vs Market Average',
  titleAr = 'مقارنة أسعار الصيانة: أسعار مختبرنا في الشارقة مقارنة بمتوسط أسعار السوق'
}: RepairPriceComparisonProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<string>(currentCategory);

  const filteredItems = defaultComparisons.filter(item => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs sm:text-sm rounded-full mb-4">
            <TrendingDown className="w-4 h-4" />
            <span>{isAr ? 'ضمان توفير لا يقل عن 20% مقارنة بالمولات' : 'Guaranteed 20% to 70% Cost Savings'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            {isAr ? titleAr : titleEn}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'نحن نوفر قطع الغيار الأصلية مباشرة من قنوات الاستيراد بالجملة ونصلح الرقائق الإلكترونية بدلاً من استبدال اللوحات باهظة الثمن، مما يوفر لك ما بين 20% إلى 70% مقارنة بالوكالات والمولات.'
              : 'By importing genuine components directly and repairing individual micro-chips rather than forcing complete board swaps, Al Sharq Mobile saves you 20% to 70% compared to shopping mall kiosks and dealership repair centers.'}
          </p>

          {/* New Official UAE Dirham Symbol Highlight Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm">
            <UAEDirhamSymbol size={18} className="text-brand-orange" />
            <span>
              {isAr ? 'الأسعار الرسمية بالدرهم الإماراتي (الرمز الجديد د.إ / AED)' : 'Official UAE Dirham Pricing (New AED Symbol Included)'}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'All', labelEn: 'All Repairs', labelAr: 'جميع أعمال الصيانة' },
            { id: 'iPhone', labelEn: 'iPhone 18/17/16', labelAr: 'آيفون 18 و 17 و 16' },
            { id: 'MacBook', labelEn: 'MacBook M1 - M4', labelAr: 'ماك بوك برو واير' },
            { id: 'Samsung', labelEn: 'Samsung S26 / Fold', labelAr: 'سامسونج S26 وفولد' },
            { id: 'DataRecovery', labelEn: 'Data Recovery', labelAr: 'استعادة البيانات' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/20 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => {
            const savingsAmount = item.marketAverageAED - item.ourPriceAED;
            const savingsPercent = Math.round((savingsAmount / item.marketAverageAED) * 100);

            return (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:border-brand-orange/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Badge & Percent */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-600 text-white text-[11px] font-black rounded-full shadow-sm">
                      {item.highlightBadge || `${savingsPercent}% OFF`}
                    </span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/30">
                      Save {savingsAmount} AED
                    </span>
                  </div>

                  {/* Device and Service Title */}
                  <div className="text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-1">
                    {item.deviceModel}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {isAr ? item.serviceNameAr : item.serviceNameEn}
                  </h3>

                  {/* Price Comparison Block */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                    
                    {/* Market Average */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                      <span>{isAr ? 'متوسط أسعار المولات / السوق:' : 'Market / Mall Average:'}</span>
                      <span className="line-through font-semibold text-gray-400">
                        {item.marketAverageAED} AED
                      </span>
                    </div>

                    {/* Our Lab Price */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{isAr ? 'سعر الشرق شارجہ:' : 'Al Sharq Direct Lab:'}</span>
                      </span>

                      <div className="flex items-center gap-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        <UAEDirhamSymbol size={20} className="text-emerald-600 dark:text-emerald-400" />
                        <span>{item.ourPriceAED}</span>
                        <span className="text-xs font-bold text-slate-400 font-mono">AED</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-blue dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{isAr ? item.partsQualityAr : item.partsQualityEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{isAr ? `الوقت المتوقع: ${item.turnaroundTime}` : `Estimated Time: ${item.turnaroundTime}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{isAr ? 'شامل ضمان 90 يوماً وفحص مجاني' : '90-Day Warranty + Free Diagnostic'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <a
                    href="tel:+971507117043"
                    className="py-2.5 px-3 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isAr ? 'اتصل الآن' : 'Call'}</span>
                  </a>

                  <a
                    href={`https://wa.me/971507117043?text=${encodeURIComponent(
                      `Hello Al Sharq Lab! I saw your discounted price comparison for "${item.serviceNameEn}" (Our Price: ${item.ourPriceAED} AED vs Market: ${item.marketAverageAED} AED). Please book my repair.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حجز واتساب' : 'WhatsApp'}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="bg-gradient-to-r from-brand-blue via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white mb-1">
                {isAr ? 'سياسة مطابقة الأسعار والشفافية التامة' : 'Price Transparency & Match Guarantee'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {isAr
                  ? 'إذا حصلت على عرض سعر مكتوب لصيانة أصلية بنفس الجودة في أي مركز معتمد بالشارقة، سنمنحك سعراً أقل بـ 10% إضافية. فحص مجاني ولا رسوم إذا لم نصلح الجهاز.'
                  : 'Found a lower written quote in Sharjah for the same genuine component-level repair? We will beat it by an additional 10%. Free diagnostics apply.'}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20want%20to%20request%20a%20price%20match%20or%20custom%20repair%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20"
          >
            {isAr ? 'طلب عرض سعر خاص' : 'Request Custom Quote'}
          </a>
        </div>

      </div>
    </section>
  );
}
