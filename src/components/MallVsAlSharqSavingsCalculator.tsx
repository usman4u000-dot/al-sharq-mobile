import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Gift, 
  TrendingDown, 
  ShoppingBag, 
  Store, 
  Building2,
  Tag
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import UAEDirhamSymbol from './UAEDirhamSymbol';
import { convertToGCC } from '../services/campaignScheduleService';

interface DeviceComparisonItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  mallPriceAED: number;
  alSharqPriceAED: number;
  image: string;
  freeGiftsEn: string;
  freeGiftsAr: string;
}

const COMPARISON_DEVICES: DeviceComparisonItem[] = [
  {
    id: 'iphone-18-pro-max',
    nameEn: 'iPhone 18 Pro Max (256GB Sealed)',
    nameAr: 'آيفون 18 برو ماکس (256 جيجا أصلي مختوم)',
    category: 'Apple Flagship',
    mallPriceAED: 5299,
    alSharqPriceAED: 4239,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free 35W Dual GaN Fast Charger + 9H Sapphire Screen Guard (Value: AED 199)',
    freeGiftsAr: 'شاحن GaN سريع 35W أصلي + حماية شاشة ياقوتية 9H مجاناً (بقيمة 199 درهم)'
  },
  {
    id: 'iphone-16-pro-max',
    nameEn: 'iPhone 16 Pro Max (256GB Desert Titanium)',
    nameAr: 'آيفون 16 برو ماکس (256 جيجا تيتانيوم صحراوي)',
    category: 'Apple Flagship',
    mallPriceAED: 4899,
    alSharqPriceAED: 3919,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free MagSafe Case + Camera Lens Sapphire Protector (Value: AED 175)',
    freeGiftsAr: 'كفر MagSafe شفاف أصلي + حماية عدسات الكاميرا الياقوتية مجاناً (بقيمة 175 درهم)'
  },
  {
    id: 'samsung-s26-ultra',
    nameEn: 'Samsung Galaxy S26 Ultra 5G (512GB)',
    nameAr: 'سامسونج جالاكسي S26 ألترا 5G (512 جيجا)',
    category: 'Samsung Flagship',
    mallPriceAED: 5099,
    alSharqPriceAED: 4079,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free 45W Samsung Super Fast Charger + S-Pen Spare Tips (Value: AED 180)',
    freeGiftsAr: 'شاحن سامسونج سوبر فاست 45W أصلي + رؤوس قلم S-Pen إضافية مجاناً'
  },
  {
    id: 'macbook-pro-16-m4',
    nameEn: 'MacBook Pro 16" M4 Pro (36GB RAM / 512GB)',
    nameAr: 'ماك بوك برو 16 إنش M4 برو (36 جيجا رام)',
    category: 'MacBook & Laptops',
    mallPriceAED: 10499,
    alSharqPriceAED: 8399,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free Hard-Shell Case + USB-C 8-in-1 Hub + Keyboard Shield (Value: AED 350)',
    freeGiftsAr: 'حقيبة مقاومة للصدمات + هب 8 منافذ تايب سي مجاناً (بقيمة 350 درهم)'
  },
  {
    id: 'apple-watch-ultra-2',
    nameEn: 'Apple Watch Ultra 2 (Titanium / Trail Loop)',
    nameAr: 'ساعة أبل ألترا 2 (تيتانيوم أصلي مختوم)',
    category: 'Smartwatches',
    mallPriceAED: 3199,
    alSharqPriceAED: 2559,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free Titanium Link Strap + Screen Armor (Value: AED 150)',
    freeGiftsAr: 'حزام تيتانيوم إضافي مجاناً + حماية مضادة للخدوش'
  },
  {
    id: 'ipad-pro-13-m4',
    nameEn: 'iPad Pro 13" (M4 OLED Display / 256GB)',
    nameAr: 'آيباد برو 13 إنش (شاشة أوليد M4 / 256 جيجا)',
    category: 'Tablets',
    mallPriceAED: 5199,
    alSharqPriceAED: 4159,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    freeGiftsEn: 'Free Magnetic Folio Case + Matte Paper-Feel Screen Protector (Value: AED 210)',
    freeGiftsAr: 'كفر مغناطيسي ذكي + حماية شاشة ملمس الورق مجاناً'
  }
];

interface MallVsAlSharqSavingsCalculatorProps {
  onReserveProduct?: (productName: string, price: number) => void;
  selectedRegionCode?: string;
}

export default function MallVsAlSharqSavingsCalculator({
  onReserveProduct,
  selectedRegionCode = 'ae'
}: MallVsAlSharqSavingsCalculatorProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('iphone-18-pro-max');

  const selectedDevice = COMPARISON_DEVICES.find(d => d.id === selectedDeviceId) || COMPARISON_DEVICES[0];

  const savingsAED = selectedDevice.mallPriceAED - selectedDevice.alSharqPriceAED;
  const savingsPercent = Math.round((savingsAED / selectedDevice.mallPriceAED) * 100);
  const tabbyInstallment = (selectedDevice.alSharqPriceAED / 4).toFixed(0);

  const convertedAlSharq = convertToGCC(selectedDevice.alSharqPriceAED, selectedRegionCode);
  const convertedMall = convertToGCC(selectedDevice.mallPriceAED, selectedRegionCode);
  const convertedSavings = convertToGCC(savingsAED, selectedRegionCode);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-2xl transition-all">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-600/10 text-red-600 dark:text-red-400 font-black text-xs rounded-full uppercase tracking-wider mb-2.5">
          <TrendingDown className="w-4 h-4" />
          <span>{isAr ? 'حاسبة مقارنة أسعار المولات مع سعر الجملة المباشر' : 'Mall Retail vs Direct Import Savings Calculator'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
          {isAr ? 'كم ستوفر عند الشراء من متجر الشرق بدلاً من المولات الكبرى؟' : 'Calculate Exact Savings: Al Sharq vs Mega Shopping Malls'}
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {isAr
            ? 'قارن بوضوح وشفافية بين أسعار معارض المولات الفاخرة وأسعار الاستيراد المباشر من موانئ دبي والشارقة. نفس الأجهزة الأصلية المختومة مع ضمان رسمي، ولكن بدون رسوم المولات الباهظة!'
            : 'See transparent side-by-side pricing comparing major UAE retail malls against Al Sharq direct port wholesale import batches. 100% factory-sealed original flagships with official warranty.'}
        </p>
      </div>

      {/* Device Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
        {COMPARISON_DEVICES.map(device => {
          const isSelected = device.id === selectedDeviceId;
          return (
            <button
              key={device.id}
              onClick={() => setSelectedDeviceId(device.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-brand-blue text-white shadow-md shadow-blue-900/20 border-brand-orange scale-105'
                  : 'bg-slate-50 dark:bg-slate-750 text-gray-700 dark:text-gray-300 border-slate-200 dark:border-slate-700 hover:border-brand-orange/50'
              }`}
            >
              {isAr ? device.nameAr.split('(')[0] : device.nameEn.split('(')[0]}
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Device Preview Card (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-750 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-between h-full">
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white dark:bg-slate-900 shadow-inner">
              <img 
                src={selectedDevice.image} 
                alt={selectedDevice.nameEn}
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow">
                20% OFF DEAL
              </span>
            </div>

            <div className="text-[11px] font-bold text-brand-orange uppercase mb-1">
              {selectedDevice.category}
            </div>

            <h3 className="font-black text-base text-gray-900 dark:text-white leading-tight mb-2">
              {isAr ? selectedDevice.nameAr : selectedDevice.nameEn}
            </h3>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-left text-xs space-y-1 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مختوم بكرتون المصنع الأصلي' : 'Factory Sealed & TDRA Approved'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'ضمان رسمي محلي ودولي 1 سنة' : '1-Year Official Manufacturer Warranty'}</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Savings Analysis (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Mega Shopping Mall Retail Card */}
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                <span>{isAr ? 'معارض ومحلات المولات الكبرى' : 'Mega Mall Luxury Retail'}</span>
              </div>
              
              <div className="text-2xl font-black text-gray-700 dark:text-gray-300 line-through">
                AED {selectedDevice.mallPriceAED.toLocaleString()}
              </div>

              {selectedRegionCode !== 'ae' && (
                <div className="text-xs text-gray-400 mt-0.5">
                  ≈ {convertedMall.convertedAmount} {convertedMall.currency}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-gray-500 space-y-1">
                <div>❌ Full retail markup applied</div>
                <div>❌ Mall luxury tenant overheads</div>
                <div>❌ No bundled screen guard or GaN adapter</div>
              </div>
            </div>

            {/* Al Sharq Direct Wholesale Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 dark:from-slate-850 dark:via-indigo-950/40 dark:to-slate-850 border-2 border-brand-orange shadow-lg">
              <div className="flex items-center justify-between gap-2 text-xs font-black text-brand-orange uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'سعر الاستيراد المباشر (متجر الشرق)' : 'Al Sharq Port Direct Wholesale'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-mono text-[10px]">
                  -{savingsPercent}%
                </span>
              </div>

              <div className="flex items-baseline gap-1 text-3xl font-black text-emerald-600 dark:text-emerald-400">
                <UAEDirhamSymbol size={26} className="text-emerald-600 dark:text-emerald-400" />
                <span>{selectedDevice.alSharqPriceAED.toLocaleString()}</span>
                <span className="text-xs font-mono text-gray-400 uppercase">AED</span>
              </div>

              {selectedRegionCode !== 'ae' && (
                <div className="text-xs font-bold text-brand-orange mt-0.5">
                  ≈ {convertedAlSharq.convertedAmount} {convertedAlSharq.currency}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-amber-200 dark:border-slate-700 text-xs text-gray-700 dark:text-gray-300 space-y-1 font-medium">
                <div>✓ Wholesale port clearance pricing</div>
                <div>✓ Same original device &amp; warranty</div>
                <div>✓ Free VIP bundled accessories</div>
              </div>
            </div>

          </div>

          {/* High-Impact Total Savings Summary Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                {isAr ? 'صافي المبلغ الذي توفره في جيبك:' : 'YOUR NET INSTANT CASH SAVINGS:'}
              </div>
              <div className="text-2xl sm:text-3xl font-black">
                AED {savingsAED.toLocaleString()} SAVED (-{savingsPercent}%)
              </div>
              {selectedRegionCode !== 'ae' && (
                <div className="text-xs text-emerald-200 font-bold mt-0.5">
                  ≈ {convertedSavings.convertedAmount} {convertedSavings.currency} saved
                </div>
              )}
            </div>

            {/* Split In 4 Tabby / Tamara */}
            <div className="bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-xs text-right">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">Split into 4 payments:</span>
              <span className="font-black text-sm text-white">AED {tabbyInstallment} / month</span>
              <span className="text-[10px] text-emerald-300 block">Tabby / Tamara • 0% Interest</span>
            </div>
          </div>

          {/* Free Gifts Bundle Included */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3 text-xs">
            <Gift className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-gray-900 dark:text-white block mb-0.5">
                {isAr ? 'هدية حصرية مرفقة مجاناً مع هذا الجهاز:' : 'VIP Bundle Gift Included Free With This Device:'}
              </span>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr ? selectedDevice.freeGiftsAr : selectedDevice.freeGiftsEn}
              </p>
            </div>
          </div>

          {/* Action Button to Lock Deal */}
          <div className="pt-2">
            <a
              href="#shop"
              onClick={() => {
                if (onReserveProduct) {
                  onReserveProduct(selectedDevice.nameEn, selectedDevice.alSharqPriceAED);
                }
              }}
              className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer text-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAr 
                  ? `احجز جهازك الآن بسعر الجملة (وفر ${savingsAED} درهم)` 
                  : `Lock Your 20% OFF Allocation (Save AED ${savingsAED})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
