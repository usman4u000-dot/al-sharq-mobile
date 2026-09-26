import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Plane, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ChevronDown, 
  X,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import RepairPriceComparison from './RepairPriceComparison';
import ClientTestimonialShowcase from './ClientTestimonialShowcase';

export interface RegionData {
  id: string;
  nameEn: string;
  nameAr: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateFromAED: number;
  majorCitiesEn: string;
  majorCitiesAr: string;
  courierTimeEn: string;
  courierTimeAr: string;
  primaryCourier: string;
  seoTaglineEn: string;
  seoTaglineAr: string;
}

export const REGIONS: Record<string, RegionData> = {
  saudi: {
    id: 'saudi',
    nameEn: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currencyCode: 'SAR',
    currencySymbol: 'ر.س',
    exchangeRateFromAED: 1.02,
    majorCitiesEn: 'Riyadh, Jeddah, Dammam & Khobar',
    majorCitiesAr: 'الرياض، جدة، الدمام والخبر',
    courierTimeEn: '24 - 48 hrs via DHL / SMSA Express',
    courierTimeAr: 'خلال 24 إلى 48 ساعة عبر DHL / SMSA',
    primaryCourier: 'DHL / SMSA Express',
    seoTaglineEn: 'Insured mail-in repair to Sharjah with 4K video inspection before payment.',
    seoTaglineAr: 'صيانة وشحن مؤمن للشارقة مع فحص بالفيديو 4K قبل السداد وضمان 90 يوماً.'
  },
  oman: {
    id: 'oman',
    nameEn: 'Oman',
    nameAr: 'سلطنة عُمان',
    flag: '🇴🇲',
    currencyCode: 'OMR',
    currencySymbol: 'ر.ع',
    exchangeRateFromAED: 0.105,
    majorCitiesEn: 'Muscat, Salalah, Sohar & Nizwa',
    majorCitiesAr: 'مسقط، صلالة، صحار ونزوى',
    courierTimeEn: '16 - 24 hrs overland or direct air cargo',
    courierTimeAr: 'خلال 16 إلى 24 ساعة براً أو عبر الشحن الجوي',
    primaryCourier: 'DHL / Daily Overland Corridor',
    seoTaglineEn: 'Direct Oman-Sharjah transport line with fast customs clearance.',
    seoTaglineAr: 'خط نقل بري وجوي يومي مباشر بين مسقط والشارقة مع تخليص جمركي فوري.'
  },
  bahrain: {
    id: 'bahrain',
    nameEn: 'Bahrain',
    nameAr: 'مملكة البحرين',
    flag: '🇧🇭',
    currencyCode: 'BHD',
    currencySymbol: 'د.ب',
    exchangeRateFromAED: 0.103,
    majorCitiesEn: 'Manama, Riffa & Muharraq',
    majorCitiesAr: 'المنامة، الرفاع والمحرق',
    courierTimeEn: '24 - 36 hrs via DHL Air Hub',
    courierTimeAr: 'خلال 24 إلى 36 ساعة عبر البريد الجوي السريع',
    primaryCourier: 'DHL Express Worldwide',
    seoTaglineEn: 'Direct air cargo to Sharjah with zero VAT on temporary repairs.',
    seoTaglineAr: 'شحن جوي مباشر للشارقة مع إعفاء ضريبي وجمركي للصيانة.'
  },
  kuwait: {
    id: 'kuwait',
    nameEn: 'Kuwait',
    nameAr: 'دولة الكويت',
    flag: '🇰🇼',
    currencyCode: 'KWD',
    currencySymbol: 'د.ك',
    exchangeRateFromAED: 0.084,
    majorCitiesEn: 'Kuwait City, Hawally & Salmiya',
    majorCitiesAr: 'مدينة الكويت، حولي والسالمية',
    courierTimeEn: '24 - 48 hrs via DHL / FedEx',
    courierTimeAr: 'خلال 24 إلى 48 ساعة عبر DHL / فيديكس',
    primaryCourier: 'DHL / FedEx Express',
    seoTaglineEn: 'Doorstep pickup in Kuwait with direct lab ingestion in Sharjah.',
    seoTaglineAr: 'استلام من باب منزلك في الكويت مع تتبع وتسليم مؤمن في الشارقة.'
  },
  qatar: {
    id: 'qatar',
    nameEn: 'Qatar',
    nameAr: 'دولة قطر',
    flag: '🇶🇦',
    currencyCode: 'QAR',
    currencySymbol: 'ر.ق',
    exchangeRateFromAED: 0.99,
    majorCitiesEn: 'Doha, Al Rayyan & Al Wakrah',
    majorCitiesAr: 'الدوحة، الريان والوكرة',
    courierTimeEn: '24 hrs via DHL Express',
    courierTimeAr: 'خلال 24 ساعة عبر DHL Express',
    primaryCourier: 'DHL Express',
    seoTaglineEn: 'Priority air routing with specialized corporate data recovery.',
    seoTaglineAr: 'شحن فائق السرعة مع أولوية قصوى لاستعادة البيانات للشركات والأفراد.'
  },
  turkey: {
    id: 'turkey',
    nameEn: 'Turkey (Türkiye)',
    nameAr: 'الجمهورية التركية',
    flag: '🇹🇷',
    currencyCode: 'USD',
    currencySymbol: '$',
    exchangeRateFromAED: 0.272,
    majorCitiesEn: 'Istanbul, Ankara & Izmir',
    majorCitiesAr: 'إسطنبول، أنقرة وإزمير',
    courierTimeEn: '2 - 3 business days via DHL / UPS',
    courierTimeAr: 'خلال 2 إلى 3 أيام عمل عبر DHL / UPS',
    primaryCourier: 'DHL Express / Turkish Cargo',
    seoTaglineEn: 'Eurasian cross-border tech corridor for advanced boards & wholesale devices.',
    seoTaglineAr: 'جسر تكنولوجي يربط إسطنبول بالشارقة لصيانة البوردات وتجارة الإلكترونيات بالجملة.'
  },
  uae: {
    id: 'uae',
    nameEn: 'UAE (Domestic)',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbol: 'د.إ',
    exchangeRateFromAED: 1.0,
    majorCitiesEn: 'Sharjah, Dubai, Ajman & Abu Dhabi',
    majorCitiesAr: 'الشارقة، دبي، عجمان وأبوظبي',
    courierTimeEn: 'Same-day walk-in or 2-hour doorstep pickup',
    courierTimeAr: 'استلام فوري في نفس اليوم أو زيارة المختبر في مويلح',
    primaryCourier: 'In-Store Walk-in / Courier Express',
    seoTaglineEn: 'Official Sharjah laboratory with 30-minute express repairs.',
    seoTaglineAr: 'المختبر الرسمي في مويلح بالشارقة مع إصلاح فوري خلال 30 دقيقة.'
  }
};

export interface RegionalServiceWrapperProps {
  children: React.ReactNode;
  serviceNameEn: string;
  serviceNameAr: string;
  category?: string;
  basePriceAED?: number;
}

export default function RegionalServiceWrapper({
  children,
  serviceNameEn,
  serviceNameAr,
  category = 'Device Repair',
  basePriceAED = 350
}: RegionalServiceWrapperProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [regionKey, setRegionKey] = useState<string>('uae');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(false);

  // Auto-detect visitor's region via URL param, LocalStorage, or Timezone
  useEffect(() => {
    try {
      // 1. URL Query Param: ?country=saudi
      const searchParams = new URLSearchParams(window.location.search);
      const countryParam = searchParams.get('country')?.toLowerCase();
      if (countryParam && REGIONS[countryParam]) {
        setRegionKey(countryParam);
        localStorage.setItem('alsharq_selected_region', countryParam);
        return;
      }

      // 2. LocalStorage persistence
      const savedRegion = localStorage.getItem('alsharq_selected_region');
      if (savedRegion && REGIONS[savedRegion]) {
        setRegionKey(savedRegion);
        return;
      }

      // 3. Timezone Heuristic
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Riyadh')) {
        setRegionKey('saudi');
      } else if (tz.includes('Muscat')) {
        setRegionKey('oman');
      } else if (tz.includes('Bahrain')) {
        setRegionKey('bahrain');
      } else if (tz.includes('Kuwait')) {
        setRegionKey('kuwait');
      } else if (tz.includes('Qatar')) {
        setRegionKey('qatar');
      } else if (tz.includes('Istanbul')) {
        setRegionKey('turkey');
      } else {
        setRegionKey('uae');
      }
    } catch {
      setRegionKey('uae');
    }
  }, []);

  const handleSelectRegion = (key: string) => {
    setRegionKey(key);
    setIsDropdownOpen(false);
    localStorage.setItem('alsharq_selected_region', key);
  };

  const region = REGIONS[regionKey] || REGIONS.uae;
  const isInternational = region.id !== 'uae';

  const localPrice = Math.round(basePriceAED * region.exchangeRateFromAED);

  // Dynamic Schema for Local SEO
  const localizedSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isInternational 
      ? `${serviceNameEn} - Mail-In from ${region.nameEn} to Sharjah Lab`
      : `${serviceNameEn} in Sharjah, UAE`,
    "description": isInternational
      ? `Express cross-border mail-in ${serviceNameEn} from ${region.majorCitiesEn}, ${region.nameEn} to Al Sharq Mobile Laboratory in Sharjah, UAE. Component-level repair with 90-day warranty.`
      : `Professional ${serviceNameEn} at Al Sharq Mobile Laboratory in Muwaileh, Sharjah.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "telephone": "+971507117043",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "Country", "name": region.nameEn },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "offers": {
      "@type": "Offer",
      "price": localPrice,
      "priceCurrency": region.currencyCode,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31"
    }
  };

  return (
    <div className="relative">
      
      {/* Injected Localized Schema for Search Crawlers */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localizedSchema)}
        </script>
        {isInternational && (
          <meta 
            name="keywords" 
            content={`تصليح ${serviceNameAr} شحن من ${region.nameAr} للشارقة, ${serviceNameEn} mail-in repair from ${region.nameEn} to UAE, ${serviceNameEn} ${region.majorCitiesEn} Sharjah lab, ${region.currencyCode} repair price`} 
          />
        )}
      </Helmet>

      {/* Top Localized Regional Notification Banner */}
      {!isBannerDismissed && (
        <aside aria-label={isAr ? 'معلومات الشحن الإقليمي' : 'Regional Shipping Information'} className="bg-gradient-to-r from-brand-blue via-slate-900 to-slate-950 text-white border-b border-brand-orange/30 shadow-md relative z-30 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              
              {/* Left / Main Notice */}
              <div className="flex items-center gap-2.5 text-center md:text-left flex-wrap justify-center md:justify-start">
                <span className="text-xl sm:text-2xl leading-none">{region.flag}</span>
                <div>
                  <span className="font-extrabold text-white">
                    {isAr ? (
                      <>
                        {isInternational ? (
                          <>خدمة شحن معتمدة من <span className="text-brand-orange">{region.nameAr}</span> ({region.majorCitiesAr}) إلى مختبر الشارقة</>
                        ) : (
                          <>مختبر الشارقة الرئيسي (مويلح) • خدمة صيانة معتمدة لجميع إمارات الدولة والخليج</>
                        )}
                      </>
                    ) : (
                      <>
                        {isInternational ? (
                          <>Mail-In Service from <span className="text-brand-orange">{region.nameEn}</span> ({region.majorCitiesEn}) to Sharjah Lab</>
                        ) : (
                          <>Official Sharjah Lab (Muwaileh) • Certified Service for UAE & All GCC</>
                        )}
                      </>
                    )}
                  </span>
                  <div className="text-[11px] text-slate-300 flex items-center gap-3 justify-center md:justify-start mt-0.5">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{isAr ? region.courierTimeAr : region.courierTimeEn}</span>
                    </span>
                    <span>•</span>
                    <span>{isAr ? `الأسعار تبدأ من ~${localPrice} ${region.currencySymbol}` : `Starting from ~${localPrice} ${region.currencyCode}`}</span>
                  </div>
                </div>
              </div>

              {/* Right Controls: Country Switcher & Details Link */}
              <div className="flex items-center gap-3 shrink-0">
                
                {/* Country Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs transition-colors"
                  >
                    <span>{region.flag}</span>
                    <span className="hidden sm:inline">{region.nameEn}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-xs">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                        {isAr ? 'اختر دولتك لتخصيص الأسعار والشحن:' : 'Select Your Country:'}
                      </div>
                      {Object.values(REGIONS).map((reg) => (
                        <button
                          key={reg.id}
                          onClick={() => handleSelectRegion(reg.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800 transition-colors ${
                            region.id === reg.id ? 'text-brand-orange font-bold bg-brand-orange/10' : 'text-slate-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{reg.flag}</span>
                            <span>{isAr ? reg.nameAr : reg.nameEn}</span>
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">{reg.currencyCode}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isInternational && (
                  <Link
                    to="/gcc-services"
                    className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>{isAr ? 'دليل الشحن' : 'Shipping Guide'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}

                <button
                  onClick={() => setIsBannerDismissed(true)}
                  className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>
        </aside>
      )}

      {/* Main Service Page Content */}
      <main>
        {children}
      </main>

      {/* Embedded Dynamic Repair Price Comparison (20% to 70% Savings) */}
      <RepairPriceComparison />

      {/* Embedded Google Client Testimonials with iPhone 18/16 & Flagship Filters */}
      <ClientTestimonialShowcase />

      {/* Injected Bottom Regional Mail-In Conversion Card */}
      {isInternational && (
        <section className="py-14 bg-gradient-to-br from-slate-900 via-brand-blue to-slate-900 text-white border-t border-brand-orange/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 text-brand-orange font-bold text-xs rounded-full mb-3">
                  <Plane className="w-3.5 h-3.5" />
                  <span>{isAr ? `شحن ${serviceNameAr} من ${region.nameAr}` : `Express Mail-In ${serviceNameEn} from ${region.nameEn}`}</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black mb-3 leading-tight">
                  {isAr ? (
                    <>أرسل جهازك لـ <span className="text-brand-orange">{serviceNameAr}</span> من {region.nameAr} إلى مختبرنا بالشارقة</>
                  ) : (
                    <>Send Your Device for <span className="text-brand-orange">{serviceNameEn}</span> from {region.nameEn} to Sharjah Lab</>
                  )}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {isAr
                    ? `نوفر لعملائنا في ${region.majorCitiesAr} خدمة شحن مؤمنة وسريعة عبر DHL / Aramex. نرسل لك فيديو عالي الدقة يوضح عمل الجهاز ونجاح الصيانة قبل طلب سداد أي مبالغ.`
                    : `Customers in ${region.majorCitiesEn} can mail their devices via ${region.primaryCourier}. We provide microscopic inspection and send 4K video proof before taking final payment.`}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'ضمان 90 يوماً معتمد' : '90-Day Official Warranty'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'الحفاظ التام على سرية البيانات' : 'Strict Data Privacy (NDA)'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? `دفع بالـ ${region.currencySymbol} أو الدرهم` : `Pay in ${region.currencyCode} or AED`}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <a
                  href={`https://wa.me/971507117043?text=${encodeURIComponent(
                    `Hello Al Sharq Lab Sharjah! I am inquiring about mail-in repair for ${serviceNameEn} from ${region.nameEn} (${region.currencyCode}). Please provide shipping instructions and preliminary quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? `احجز شحنة من ${region.nameAr} عبر واتساب` : `Book Mail-In from ${region.nameEn}`}</span>
                </a>

                <Link
                  to="/gcc-services"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>{isAr ? 'عرض حاسبة الشحن والتكاليف' : 'View Shipping Logistics & Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

    </div>
  );
}
