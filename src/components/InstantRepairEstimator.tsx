import React, { useState } from 'react';
import { 
  Tablet, 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  ArrowRight,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceOption {
  id: string;
  nameEn: string;
  nameAr: string;
  priceAED: number;
  originalPriceAED: number;
  timeEstimate: string;
  warranty: string;
  type: 'repair' | 'accessory';
}

interface DeviceCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: any;
  models: {
    id: string;
    name: string;
    services: ServiceOption[];
  }[];
}

const ESTIMATOR_DATA: DeviceCategory[] = [
  {
    id: 'tablet',
    nameEn: 'iPad & Tablets',
    nameAr: 'أجهزة الآيباد والتابلت',
    icon: Tablet,
    models: [
      {
        id: 'ipad-10-9',
        name: 'iPad 10th / 9th Gen',
        services: [
          { id: 'screen', nameEn: 'Cracked Glass / Touch Digitizer', nameAr: 'استبدال زجاج ولمس الشاشة', priceAED: 180, originalPriceAED: 260, timeEstimate: '35 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'tempered-glass', nameEn: '9H Military Tempered Glass (+ Free Fitting)', nameAr: 'حماية زجاج 9H + تركيب مجاني', priceAED: 35, originalPriceAED: 65, timeEstimate: '5 mins', warranty: 'Zero-Bubble Guarantee', type: 'accessory' },
          { id: 'eva-case', nameEn: 'Shockproof Kids EVA Foam Case', nameAr: 'كفر رغوي مقاوم للصدمات للأطفال', priceAED: 45, originalPriceAED: 79, timeEstimate: 'Immediate', warranty: 'Drop Protection', type: 'accessory' },
          { id: 'battery', nameEn: 'New 0-Cycle OEM Battery Cell', nameAr: 'بطارية جديدة أصلية 0-دورات', priceAED: 160, originalPriceAED: 240, timeEstimate: '45 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'charging-port', nameEn: 'Type-C Charging Port Clean / Fix', nameAr: 'إصلاح وتبديل منفذ الشحن', priceAED: 120, originalPriceAED: 190, timeEstimate: '30 mins', warranty: '90-Day Lab Warranty', type: 'repair' }
        ]
      },
      {
        id: 'ipad-pro-m4',
        name: 'iPad Pro 11" / 13" (M4 / M2)',
        services: [
          { id: 'screen', nameEn: 'Tandem OLED Complete Screen Replacement', nameAr: 'شاشة OLED كاملة جديدة', priceAED: 650, originalPriceAED: 950, timeEstimate: '45 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'paperfeel', nameEn: 'Paper-Feel Matte Film for Drawing / Notes', nameAr: 'لاصقة ورقية غير لامعة للرسم والملاحظات', priceAED: 49, originalPriceAED: 89, timeEstimate: '5 mins', warranty: 'Texture Guarantee', type: 'accessory' },
          { id: 'tempered-glass', nameEn: '9H Edge-to-Edge Tempered Glass Protector', nameAr: 'زجاج حماية 9H للشاشة كاملة', priceAED: 39, originalPriceAED: 75, timeEstimate: '5 mins', warranty: 'Zero-Bubble Guarantee', type: 'accessory' },
          { id: 'magic-keyboard', nameEn: 'Magnetic Smart Keyboard Folio with Trackpad', nameAr: 'لوحة مفاتيح مغناطيسية ذكية مع لوحة لمس', priceAED: 199, originalPriceAED: 399, timeEstimate: 'Immediate', warranty: '6-Month Warranty', type: 'accessory' },
          { id: 'gan-charger', nameEn: '65W GaN Dual USB-C Fast Charger', nameAr: 'شاحن GaN سريع 65 واط', priceAED: 59, originalPriceAED: 110, timeEstimate: 'Immediate', warranty: '1-Year Lab Warranty', type: 'accessory' }
        ]
      },
      {
        id: 'galaxy-tab',
        name: 'Samsung Galaxy Tab S9 / S10 / A9',
        services: [
          { id: 'screen', nameEn: 'Super AMOLED Display Replacement', nameAr: 'تبديل شاشة سوبر أموليد', priceAED: 350, originalPriceAED: 550, timeEstimate: '45 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'tempered-glass', nameEn: '9H Tempered Glass (+ Free In-Store Fitting)', nameAr: 'زجاج 9H ضد الكسر + تركيب مجاني', priceAED: 35, originalPriceAED: 65, timeEstimate: '5 mins', warranty: 'Zero-Bubble Guarantee', type: 'accessory' },
          { id: 'charging-port', nameEn: 'USB-C Port Replacement & Flex Cable', nameAr: 'إصلاح منفذ تايب سي والشحن', priceAED: 110, originalPriceAED: 170, timeEstimate: '30 mins', warranty: '90-Day Lab Warranty', type: 'repair' }
        ]
      }
    ]
  },
  {
    id: 'phone',
    nameEn: 'iPhone & Smartphones',
    nameAr: 'الآيفون والهواتف الذكية',
    icon: Smartphone,
    models: [
      {
        id: 'iphone-16-15-pro',
        name: 'iPhone 16 / 15 Pro & Pro Max',
        services: [
          { id: 'screen-glass', nameEn: 'Outer Glass Replacement (OCA Lamination)', nameAr: 'تغيير الزجاج الخارجي فقط بدون فقد الشاشة', priceAED: 250, originalPriceAED: 450, timeEstimate: '35 mins', warranty: 'TrueTone Preserved', type: 'repair' },
          { id: 'screen-full', nameEn: 'OEM 120Hz ProMotion OLED Assembly', nameAr: 'شاشة OLED أصلية كاملة 120 هرتز', priceAED: 550, originalPriceAED: 850, timeEstimate: '25 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'battery', nameEn: 'OEM Battery + BMS Chip Swap (No Warning)', nameAr: 'بطارية أصلية مع نقل الشريحة دون رسالة تحذير', priceAED: 180, originalPriceAED: 260, timeEstimate: '25 mins', warranty: '100% Health Preserved', type: 'repair' },
          { id: 'camera-glass', nameEn: 'Sapphire Rear Camera Lens Replacement', nameAr: 'استبدال زجاج الكاميرا الياقوتي', priceAED: 70, originalPriceAED: 120, timeEstimate: '15 mins', warranty: 'Dust-Free Guarantee', type: 'repair' }
        ]
      },
      {
        id: 'iphone-14-13-12',
        name: 'iPhone 14 / 13 / 12 Series',
        services: [
          { id: 'screen', nameEn: 'OLED Display Replacement (TrueTone Kept)', nameAr: 'تبديل شاشة OLED مع تفعيل TrueTone', priceAED: 220, originalPriceAED: 380, timeEstimate: '25 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'battery', nameEn: '0-Cycle High-Capacity Battery Swap', nameAr: 'تبديل بطارية جديدة سريعة', priceAED: 130, originalPriceAED: 190, timeEstimate: '20 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'back-glass', nameEn: 'Laser Back Glass Removal & Fitting', nameAr: 'تغيير الزجاج الخلفي بالليزر', priceAED: 140, originalPriceAED: 240, timeEstimate: '45 mins', warranty: 'Factory Flush Fit', type: 'repair' }
        ]
      },
      {
        id: 'samsung-s25-s24-ultra',
        name: 'Samsung Galaxy S25 / S24 Ultra',
        services: [
          { id: 'screen', nameEn: 'Dynamic AMOLED 2X Display + Frame', nameAr: 'شاشة دايناميك أموليد أصلية مع الإطار', priceAED: 590, originalPriceAED: 890, timeEstimate: '40 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'battery', nameEn: 'Original Samsung Battery Cell Swap', nameAr: 'بطارية سامسونج أصلية', priceAED: 160, originalPriceAED: 230, timeEstimate: '30 mins', warranty: '90-Day Lab Warranty', type: 'repair' }
        ]
      }
    ]
  },
  {
    id: 'laptop',
    nameEn: 'MacBook & Laptops',
    nameAr: 'الماك بوك واللابتوب',
    icon: Laptop,
    models: [
      {
        id: 'macbook-air-pro-m',
        name: 'MacBook Pro / Air (M1, M2, M3, M4)',
        services: [
          { id: 'screen', nameEn: 'Retina / Liquid Retina Complete Display Lid', nameAr: 'شاشة ريتينا أصلية كاملة', priceAED: 690, originalPriceAED: 1100, timeEstimate: '45 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'logic-board', nameEn: 'Level 4 Micro-Soldering (No Power / Liquid)', nameAr: 'صيانة مايكرو للمذربورد (انقطاع طاقة أو سوائل)', priceAED: 280, originalPriceAED: 600, timeEstimate: '2-4 hours', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'battery', nameEn: 'OEM Battery Cell Replacement Set', nameAr: 'مجموعة بطاريات ماك بوك أصلية', priceAED: 280, originalPriceAED: 450, timeEstimate: '60 mins', warranty: '90-Day Lab Warranty', type: 'repair' },
          { id: 'keyboard-trackpad', nameEn: 'Magic Keyboard & Force Touch Trackpad Fix', nameAr: 'إصلاح لوحة المفاتيح والماوس', priceAED: 220, originalPriceAED: 380, timeEstimate: '60 mins', warranty: '90-Day Lab Warranty', type: 'repair' }
        ]
      }
    ]
  }
];

export default function InstantRepairEstimator() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedCatId, setSelectedCatId] = useState<string>('tablet');
  const [selectedModelId, setSelectedModelId] = useState<string>('ipad-10-9');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('screen');

  const currentCategory = ESTIMATOR_DATA.find(c => c.id === selectedCatId) || ESTIMATOR_DATA[0];
  const currentModel = currentCategory.models.find(m => m.id === selectedModelId) || currentCategory.models[0];
  const currentService = currentModel.services.find(s => s.id === selectedServiceId) || currentModel.services[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = ESTIMATOR_DATA.find(c => c.id === catId);
    if (cat && cat.models[0]) {
      setSelectedModelId(cat.models[0].id);
      setSelectedServiceId(cat.models[0].services[0].id);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const model = currentCategory.models.find(m => m.id === modelId);
    if (model && model.services[0]) {
      setSelectedServiceId(model.services[0].id);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Al Sharq Technology! I used your Instant Estimator:\n\nDevice: ${currentModel.name}\nService: ${currentService.nameEn}\nEstimated Price: AED ${currentService.priceAED}\nWarranty: ${currentService.warranty}\n\nI want to confirm availability and schedule my visit to your Muwaileh workshop in Sharjah.`
  );

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-orange/30 shadow-2xl relative overflow-hidden my-12">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-brand-orange text-xs font-bold mb-2 border border-orange-500/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة الأسعار الفورية المعتمدة' : '3-Click Instant Repair & Accessory Estimator'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {isAr ? 'احسب تكلفة صيانة جهازك أو الملحق خلال ثوانٍ' : 'Know Your Exact Bench Price Before You Step Inside'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isAr 
                ? 'أسعار مباشرة من ورشة مويلح بدون وسطاء. قطع أصلية مع ضمان معتمد وتركيب فوري.'
                : 'Direct Muwaileh workshop wholesale pricing. Genuine OEM components with full laboratory warranty.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-fit shrink-0">
            <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
            <span>Muwaileh Commercial, Sharjah</span>
          </div>
        </div>

        {/* Step 1: Device Category Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            1. {isAr ? 'اختر فئة الجهاز:' : 'Select Device Category:'}
          </label>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {ESTIMATOR_DATA.map(cat => {
              const Icon = cat.icon;
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-3.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 transition-all cursor-pointer border text-center sm:text-start ${
                    isSelected
                      ? 'bg-brand-orange text-white border-orange-400 shadow-lg shadow-orange-950/40'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold truncate">
                    {isAr ? cat.nameAr : cat.nameEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Specific Model */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            2. {isAr ? 'اختر الموديل بالتحديد:' : 'Select Exact Model:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {currentCategory.models.map(model => {
              const isSelected = model.id === selectedModelId;
              return (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
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

        {/* Step 3: Choose Service / Accessory */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            3. {isAr ? 'اختر الخدمة أو الملحق المطلوب:' : 'Select Service or Accessory:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentModel.services.map(srv => {
              const isSelected = srv.id === selectedServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-3.5 rounded-xl text-start transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-brand-orange text-white'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-xs sm:text-sm leading-tight">
                      {isAr ? srv.nameAr : srv.nameEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-white/10 shrink-0">
                      AED {srv.priceAED}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-orange" />
                      {srv.timeEstimate}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      {srv.warranty}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quote Result Card & Actions */}
        <div className="bg-gradient-to-r from-slate-850 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border-2 border-brand-orange/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sharjah Workshop Verified Bench Rate</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentModel.name} • {isAr ? currentService.nameAr : currentService.nameEn}
            </h3>
            <div className="flex flex-wrap items-baseline gap-3 mt-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-orange">
                AED {currentService.priceAED}
              </span>
              <span className="text-sm sm:text-base text-slate-400 line-through">
                AED {currentService.originalPriceAED}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save AED {currentService.originalPriceAED - currentService.priceAED} (Wholesale)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 flex flex-wrap gap-4">
              <span>⏱ Turnaround: <strong>{currentService.timeEstimate}</strong></span>
              <span>🛡 Guarantee: <strong>{currentService.warranty}</strong></span>
              <span>📍 Location: <strong>Fire Station Rd, Muwaileh</strong></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/971507117043?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{isAr ? 'حجز فوري عبر واتساب' : '1-Tap Reserve on WhatsApp'}</span>
            </a>

            <a
              href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'الاتجاهات للورشة' : 'Get Workshop Directions'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
