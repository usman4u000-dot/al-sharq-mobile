/**
 * Dynamic Monthly Campaign & Restock Wave Engine
 * Calculates rotating sale waves, cooldown intervals, discount percentages,
 * and GCC localized currencies across the month.
 */

export interface CampaignWave {
  id: number;
  startDay: number; // 1-31
  endDay: number;
  discountPercent: number;
  isDealActive: boolean; // true = sale active, false = restock cooldown / deal off
  nameEn: string;
  nameAr: string;
  tagEn: string;
  tagAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

// 30-Day Rotating Campaign Waves
export const MONTHLY_CAMPAIGN_WAVES: CampaignWave[] = [
  {
    id: 1,
    startDay: 1,
    endDay: 5,
    discountPercent: 20,
    isDealActive: true,
    nameEn: "Phase 1: Direct Import Flash Wave (20% OFF)",
    nameAr: "المرحلة الأولى: موجة الاستيراد المباشر (خصم 20%)",
    tagEn: "20% Online Deal",
    tagAr: "خصم 20% أونلاين",
    descriptionEn: "Direct port import batch at wholesale rates for online pre-reservations.",
    descriptionAr: "شحنة ميناء دبي بأسعار الجملة المباشرة للحجوزات الإلكترونية المسبقة."
  },
  {
    id: 2,
    startDay: 6,
    endDay: 8,
    discountPercent: 0,
    isDealActive: false,
    nameEn: "Restock Cooldown: Warehouse Unpacking & Lab Inspection",
    nameAr: "فترة فك الشحنات والفرز المخبري (الطلبات معلقة مؤقتاً)",
    tagEn: "Batch Unpacking (3 Days)",
    tagAr: "فرز الشحنة (3 أيام)",
    descriptionEn: "Current batch sold out. Technicians verifying incoming cargo. Priority queue open.",
    descriptionAr: "نفدت شحنة المرحلة السابقة. الفنيون يفرزون الطرود القادمة. التسجيل المسبق متاح."
  },
  {
    id: 3,
    startDay: 9,
    endDay: 13,
    discountPercent: 12,
    isDealActive: true,
    nameEn: "Phase 2: Mid-Month Wholesale Drop (12% OFF)",
    nameAr: "المرحلة الثانية: تخفيضات منتصف الشهر (خصم 12%)",
    tagEn: "12% Mid-Month Deal",
    tagAr: "خصم 12% منتصف الشهر",
    descriptionEn: "Factory-sealed units released with TDRA/TRA warranty.",
    descriptionAr: "أجهزة أصلية مختومة مع ضمان رسمي موثق."
  },
  {
    id: 4,
    startDay: 14,
    endDay: 16,
    discountPercent: 0,
    isDealActive: false,
    nameEn: "GCC Cargo Transit & Customs Clearance Window",
    nameAr: "فترة الترانزيت الجمركي والتخليص الإقليمي",
    tagEn: "Cargo Customs Pause",
    tagAr: "تخليص جمركي (توقف مؤقت)",
    descriptionEn: "Inter-GCC dispatch hub replenishment. Secure your incoming queue position.",
    descriptionAr: "إعادة تزويد مركز التوزيع الخليجي. احجز رقمك في قائمة الشحنة القادمة."
  },
  {
    id: 5,
    startDay: 17,
    endDay: 22,
    discountPercent: 23,
    isDealActive: true,
    nameEn: "Phase 3: Mega Flagship Surge (23% OFF)",
    nameAr: "المرحلة الثالثة: العرض الفائق للهواتف الرائدة (خصم 23%)",
    tagEn: "23% Mega Deal",
    tagAr: "خصم 23% سوبر فلاش",
    descriptionEn: "Highest discount wave of the month for high-tier flagships.",
    descriptionAr: "أعلى نسبة خصم خلال الشهر للموديلات الرائدة (آيفون وسامسونج)."
  },
  {
    id: 6,
    startDay: 23,
    endDay: 26,
    discountPercent: 14,
    isDealActive: true,
    nameEn: "Phase 4: Tech & Gadget Clearance (14% OFF)",
    nameAr: "المرحلة الرابعة: تصفيات الأجهزة والملحقات (خصم 14%)",
    tagEn: "14% Special Deal",
    tagAr: "خصم 14% خاص",
    descriptionEn: "Tablets, Smartwatches, and Audio bundled with accessories.",
    descriptionAr: "أجهزة لوحية وساعات ذكية وسماعات أصلية مع ملحقاتها."
  },
  {
    id: 7,
    startDay: 27,
    endDay: 31,
    discountPercent: 0,
    isDealActive: false,
    nameEn: "Month-End Global Inventory Audit & Pre-Booking",
    nameAr: "جرد نهاية الشهر والحجز المسبق للشهر القادم",
    tagEn: "Next Month Pre-Order",
    tagAr: "حجز مسبق للشهر الجديد",
    descriptionEn: "Inventory consolidation in Sharjah lab. Early bird reservations open.",
    descriptionAr: "إعادة تنظيم المخزون في مستودع الشارقة. باب الحجز المبكر مفتوح."
  }
];

export interface GCCRegionConfig {
  code: string;
  nameEn: string;
  nameAr: string;
  flag: string;
  currency: string;
  currencyAr: string;
  exchangeRate: number; // multiplier from AED
  deliveryHours: string;
  courierName: string;
}

export const GCC_REGIONS: Record<string, GCCRegionConfig> = {
  ae: {
    code: 'ae',
    nameEn: 'United Arab Emirates',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    currency: 'AED',
    currencyAr: 'د.إ',
    exchangeRate: 1.0,
    deliveryHours: '2 - 4 Hours (Express Courier / Van)',
    courierName: 'Al Sharq Local Express (Same-Day)'
  },
  sa: {
    code: 'sa',
    nameEn: 'Saudi Arabia (KSA)',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currency: 'SAR',
    currencyAr: 'ر.س',
    exchangeRate: 1.02,
    deliveryHours: '24 - 48 Hours',
    courierName: 'DHL Express / SMSA Express'
  },
  om: {
    code: 'om',
    nameEn: 'Oman (Muscat/Sohar)',
    nameAr: 'سلطنة عُمان',
    flag: '🇴🇲',
    currency: 'OMR',
    currencyAr: 'ر.ع',
    exchangeRate: 0.105,
    deliveryHours: '24 Hours (Overland Shuttle / DHL)',
    courierName: 'Oman Direct Cargo & DHL'
  },
  bh: {
    code: 'bh',
    nameEn: 'Bahrain (Manama)',
    nameAr: 'مملكة البحرين',
    flag: '🇧🇭',
    currency: 'BHD',
    currencyAr: 'د.ب',
    exchangeRate: 0.103,
    deliveryHours: '24 - 48 Hours',
    courierName: 'Aramex Priority / DHL'
  },
  kw: {
    code: 'kw',
    nameEn: 'Kuwait',
    nameAr: 'دولة الكويت',
    flag: '🇰🇼',
    currency: 'KWD',
    currencyAr: 'د.ك',
    exchangeRate: 0.084,
    deliveryHours: '24 - 48 Hours',
    courierName: 'DHL Express Worldwide'
  },
  qa: {
    code: 'qa',
    nameEn: 'Qatar (Doha)',
    nameAr: 'دولة قطر',
    flag: '🇶🇦',
    currency: 'QAR',
    currencyAr: 'ر.ق',
    exchangeRate: 0.99,
    deliveryHours: '24 - 48 Hours',
    courierName: 'Aramex / DHL Express'
  },
  tr: {
    code: 'tr',
    nameEn: 'Turkey (Istanbul)',
    nameAr: 'تركيا',
    flag: '🇹🇷',
    currency: 'USD',
    currencyAr: '$',
    exchangeRate: 0.272,
    deliveryHours: '48 - 72 Hours Air Freight',
    courierName: 'Turkish Cargo & FedEx'
  }
};

/**
 * Returns current wave details according to day of the month
 */
export function getCurrentCampaignWave(overrideDay?: number): CampaignWave {
  const day = overrideDay ?? new Date().getDate();
  const wave = MONTHLY_CAMPAIGN_WAVES.find(w => day >= w.startDay && day <= w.endDay);
  return wave || MONTHLY_CAMPAIGN_WAVES[0];
}

/**
 * Calculates days remaining in the current wave
 */
export function getDaysRemainingInWave(wave: CampaignWave, overrideDay?: number): number {
  const currentDay = overrideDay ?? new Date().getDate();
  const remaining = wave.endDay - currentDay;
  return remaining >= 0 ? remaining : 0;
}

/**
 * Calculate dynamic price based on wave discount percentage
 */
export function calculateWavePrice(marketPrice: number, discountPercent: number): {
  finalPriceAED: number;
  savingsAED: number;
  discountPercent: number;
} {
  // If deal is paused / cooldown, fallback to standard wholesale discount of 10%
  const effectiveDiscount = discountPercent > 0 ? discountPercent : 10;
  const savings = Math.round(marketPrice * (effectiveDiscount / 100));
  const finalPrice = marketPrice - savings;
  return {
    finalPriceAED: finalPrice,
    savingsAED: savings,
    discountPercent: effectiveDiscount
  };
}

/**
 * Convert AED amount to selected GCC regional currency
 */
export function convertToGCC(amountAED: number, regionCode: string): {
  convertedAmount: string;
  currency: string;
  currencyAr: string;
} {
  const region = GCC_REGIONS[regionCode] || GCC_REGIONS.ae;
  const converted = amountAED * region.exchangeRate;
  
  // Format based on currency decimal conventions
  let formatted = '';
  if (region.currency === 'OMR' || region.currency === 'KWD' || region.currency === 'BHD') {
    formatted = converted.toFixed(1);
  } else {
    formatted = Math.round(converted).toLocaleString();
  }

  return {
    convertedAmount: formatted,
    currency: region.currency,
    currencyAr: region.currencyAr
  };
}
