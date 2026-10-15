import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  DollarSign, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DeviceModel {
  id: string;
  name: string;
  baseValuationAED: number;
}

interface BrandOption {
  id: string;
  name: string;
  icon: any;
  models: DeviceModel[];
}

const BRANDS_DATA: BrandOption[] = [
  {
    id: 'apple-iphone',
    name: 'Apple iPhone',
    icon: Smartphone,
    models: [
      { id: 'ip-16-pm', name: 'iPhone 16 Pro Max', baseValuationAED: 3800 },
      { id: 'ip-16-pro', name: 'iPhone 16 Pro', baseValuationAED: 3200 },
      { id: 'ip-15-pm', name: 'iPhone 15 Pro Max', baseValuationAED: 2600 },
      { id: 'ip-15-pro', name: 'iPhone 15 Pro', baseValuationAED: 2100 },
      { id: 'ip-15', name: 'iPhone 15 / 15 Plus', baseValuationAED: 1650 },
      { id: 'ip-14-pm', name: 'iPhone 14 Pro Max', baseValuationAED: 1800 },
      { id: 'ip-14', name: 'iPhone 14 / 14 Plus', baseValuationAED: 1300 },
      { id: 'ip-13-pm', name: 'iPhone 13 Pro Max', baseValuationAED: 1400 },
      { id: 'ip-13', name: 'iPhone 13 / 13 Mini', baseValuationAED: 1000 },
      { id: 'ip-12', name: 'iPhone 12 Series', baseValuationAED: 750 }
    ]
  },
  {
    id: 'apple-ipad',
    name: 'Apple iPad & Tablets',
    icon: Tablet,
    models: [
      { id: 'ipad-pro-m4', name: 'iPad Pro 11" / 13" (M4 OLED)', baseValuationAED: 2900 },
      { id: 'ipad-pro-m2', name: 'iPad Pro 11" / 12.9" (M2 / M1)', baseValuationAED: 1850 },
      { id: 'ipad-air-m2', name: 'iPad Air 11" / 13" (M2)', baseValuationAED: 1600 },
      { id: 'ipad-10', name: 'iPad 10th Gen (10.9")', baseValuationAED: 850 },
      { id: 'ipad-9', name: 'iPad 9th Gen (10.2")', baseValuationAED: 550 },
      { id: 'ipad-mini-6', name: 'iPad Mini 6 / 7', baseValuationAED: 1100 }
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung Galaxy',
    icon: Smartphone,
    models: [
      { id: 'sam-s25-u', name: 'Galaxy S25 Ultra', baseValuationAED: 3300 },
      { id: 'sam-s24-u', name: 'Galaxy S24 Ultra', baseValuationAED: 2400 },
      { id: 'sam-s23-u', name: 'Galaxy S23 Ultra', baseValuationAED: 1600 },
      { id: 'sam-z-fold', name: 'Galaxy Z Fold 6 / 5', baseValuationAED: 2500 },
      { id: 'sam-tab-s9', name: 'Galaxy Tab S9 / S10 Ultra', baseValuationAED: 1750 }
    ]
  },
  {
    id: 'laptops',
    name: 'MacBook & Laptops',
    icon: Laptop,
    models: [
      { id: 'mac-pro-m3', name: 'MacBook Pro 14" / 16" (M3 / M4)', baseValuationAED: 4200 },
      { id: 'mac-air-m3', name: 'MacBook Air 13" / 15" (M3 / M2)', baseValuationAED: 2600 },
      { id: 'mac-air-m1', name: 'MacBook Air M1', baseValuationAED: 1400 },
      { id: 'gaming-laptop', name: 'RTX 4060 / 4070 Gaming Laptop', baseValuationAED: 2200 }
    ]
  }
];

const CONDITIONS = [
  {
    id: 'flawless',
    multiplier: 1.0,
    titleEn: 'Flawless (Like New)',
    titleAr: 'ممتاز (كالجديد تماماً)',
    descEn: 'Zero scratches, 85%+ battery health, all original parts, screen pristine',
    descAr: 'بدون أي خدوش، صحة البطارية فوق 85%، شاشة أصلية 100%'
  },
  {
    id: 'good',
    multiplier: 0.82,
    titleEn: 'Good Condition',
    titleAr: 'حالة جيدة جداً',
    descEn: 'Light hairline scuffs on frame, clean display, fully operational',
    descAr: 'خدوش سطحية خفيفة على الإطار، الشاشة سليمة وتعمل بالكامل'
  },
  {
    id: 'cracked-glass',
    multiplier: 0.58,
    titleEn: 'Cracked Glass / Back',
    titleAr: 'شاشة أو زجاج خلفي مكسور',
    descEn: 'Outer glass cracked but OLED/touch works, body dented',
    descAr: 'الزجاج الخارجي مكسور ولكن اللمس والعرض يعملان بشكل طبيعي'
  },
  {
    id: 'faulty-board',
    multiplier: 0.35,
    titleEn: 'Faulty / Won’t Turn On',
    titleAr: 'عطل بالمذربورد أو لا يعمل',
    descEn: 'Motherboard short, black display, water damage, or boot loop',
    descAr: 'الجهاز لا يفتح، عطل في لوحة الأم، أو تعرض للماء'
  }
];

const STORAGE_OPTIONS = [
  { id: '128', label: '128 GB', multiplier: 1.0 },
  { id: '256', label: '256 GB', multiplier: 1.08 },
  { id: '512', label: '512 GB', multiplier: 1.18 },
  { id: '1tb', label: '1 TB', multiplier: 1.30 }
];

export default function InstantTradeInCalculator() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedBrandId, setSelectedBrandId] = useState<string>('apple-iphone');
  const [selectedModelId, setSelectedModelId] = useState<string>('ip-15-pm');
  const [selectedConditionId, setSelectedConditionId] = useState<string>('flawless');
  const [selectedStorageId, setSelectedStorageId] = useState<string>('256');

  const currentBrand = BRANDS_DATA.find(b => b.id === selectedBrandId) || BRANDS_DATA[0];
  const currentModel = currentBrand.models.find(m => m.id === selectedModelId) || currentBrand.models[0];
  const currentCondition = CONDITIONS.find(c => c.id === selectedConditionId) || CONDITIONS[0];
  const currentStorage = STORAGE_OPTIONS.find(s => s.id === selectedStorageId) || STORAGE_OPTIONS[1];

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    const brand = BRANDS_DATA.find(b => b.id === brandId);
    if (brand && brand.models[0]) {
      setSelectedModelId(brand.models[0].id);
    }
  };

  // Valuation Calculation
  const estimatedCashAED = Math.round(
    currentModel.baseValuationAED * currentCondition.multiplier * currentStorage.multiplier
  );
  // +15% extra store credit toward repair or new flagship purchase
  const estimatedCreditAED = Math.round(estimatedCashAED * 1.15);

  const whatsappMessage = encodeURIComponent(
    `Hello Al Sharq Technology! I evaluated my trade-in device on your website:\n\nDevice: ${currentModel.name} (${currentStorage.label})\nCondition: ${currentCondition.titleEn}\nEstimated Cash Value: AED ${estimatedCashAED}\nStore Upgrade Credit: AED ${estimatedCreditAED}\n\nI want to bring it to your Muwaileh workshop in Sharjah for instant inspection & payout.`
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-orange/40 shadow-2xl relative overflow-hidden my-10">
      {/* Decorative Aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة استبدال وبيع الأجهزة الفورية' : 'Instant Device Trade-In & Cash Valuation'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              {isAr ? 'اعرف قيمة جهازك القديم أو المكسور كاش الآن' : 'Turn Your Old or Broken Gadget into Instant Cash'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isAr 
                ? 'تقييم فوري خلال 5 دقائق في ورشة مويلح بالشارقة. احصل على نقد فوري أو رصيد إضافي +15% لشراء جهاز جديد أو للصيانة.'
                : 'Get paid on the spot in Muwaileh, Sharjah, or get +15% extra value toward any repair or flagship upgrade.'}
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 w-fit shrink-0">
            <span>⚡ 5-Minute Bench Testing Guarantee</span>
          </div>
        </div>

        {/* 1. Select Brand Category */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            1. {isAr ? 'اختر الشركة المصنعة:' : 'Select Device Brand:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BRANDS_DATA.map(brand => {
              const Icon = brand.icon;
              const isSelected = brand.id === selectedBrandId;
              return (
                <button
                  key={brand.id}
                  onClick={() => handleBrandChange(brand.id)}
                  className={`p-3.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-brand-orange text-white border-orange-400 shadow-lg shadow-orange-950/40 font-black'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 font-bold'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-xs sm:text-sm">{brand.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Model */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            2. {isAr ? 'اختر الموديل:' : 'Select Model:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {currentBrand.models.map(model => {
              const isSelected = model.id === selectedModelId;
              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-slate-900 border-white shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {model.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Storage Option */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            3. {isAr ? 'السعة التخزينية:' : 'Storage Capacity:'}
          </label>
          <div className="flex gap-2">
            {STORAGE_OPTIONS.map(storage => {
              const isSelected = storage.id === selectedStorageId;
              return (
                <button
                  key={storage.id}
                  onClick={() => setSelectedStorageId(storage.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {storage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Device Physical Condition */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            4. {isAr ? 'حالة الجهاز الفعلية:' : 'Physical & Hardware Condition:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CONDITIONS.map(cond => {
              const isSelected = cond.id === selectedConditionId;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedConditionId(cond.id)}
                  className={`p-4 rounded-2xl text-start transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-500/20 border-brand-orange text-white ring-2 ring-brand-orange/40'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <h5 className="font-extrabold text-sm mb-1 text-white">
                      {isAr ? cond.titleAr : cond.titleEn}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {isAr ? cond.descAr : cond.descEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Valuation Result Display Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-black p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sharjah Lab Market Value • Verified 2026</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {currentModel.name} ({currentStorage.label})
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Condition: <strong>{currentCondition.titleEn}</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[11px] text-slate-400 block">💵 Instant Cash Payout:</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  AED {estimatedCashAED}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Paid immediately via cash or bank transfer</span>
              </div>

              <div className="bg-orange-500/10 p-3.5 rounded-2xl border border-brand-orange/30">
                <span className="text-[11px] text-brand-orange block font-bold">🌟 Store Upgrade / Repair Credit (+15%):</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-orange">
                  AED {estimatedCreditAED}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Valid for phone purchase, accessories or repair</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/971507117043?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{isAr ? 'تأكيد العرض عبر واتساب' : 'Lock In Trade-In Quote (WhatsApp)'}</span>
            </a>

            <div className="text-[11px] text-center text-slate-400">
              📍 Bring device to Muwaileh Shop for 5-min testing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
