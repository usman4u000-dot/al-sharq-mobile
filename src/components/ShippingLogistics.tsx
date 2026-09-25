import React, { useState } from 'react';
import { 
  Plane, 
  Truck, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  MessageCircle, 
  Navigation, 
  Calendar,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export interface RouteDetail {
  id: string;
  capitalEn: string;
  capitalAr: string;
  countryEn: string;
  countryAr: string;
  flag: string;
  distanceKm: number;
  flightTimeHrs: string;
  primaryCouriers: {
    name: string;
    type: 'Air Express' | 'Land Express' | 'Priority Air';
    transitHours: string;
    estDays: string;
    costEstimateAED: string;
    badge?: string;
  }[];
  customsNoteEn: string;
  customsNoteAr: string;
  recommendedCourier: string;
  totalRoundtripDays: string;
}

const gccRoutes: RouteDetail[] = [
  {
    id: 'riyadh',
    capitalEn: 'Riyadh',
    capitalAr: 'الرياض',
    countryEn: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    distanceKm: 870,
    flightTimeHrs: '1 hr 45 min',
    recommendedCourier: 'DHL Express / SMSA',
    totalRoundtripDays: '3 - 4 Days',
    primaryCouriers: [
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '24 - 36 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '140 - 180 AED (~145 - 185 SAR)',
        badge: 'Fastest Door-to-Door'
      },
      {
        name: 'SMSA Express',
        type: 'Air Express',
        transitHours: '36 - 48 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '110 - 150 AED (~115 - 155 SAR)',
        badge: 'Best KSA Network'
      },
      {
        name: 'Aramex GCC Express',
        type: 'Land Express',
        transitHours: '48 - 72 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '95 - 130 AED (~100 - 135 SAR)',
        badge: 'Economical'
      }
    ],
    customsNoteEn: 'Pre-cleared through Riyadh Air Cargo. Declare as "Used Personal Device for Temporary Repair & Return" to avoid import duty.',
    customsNoteAr: 'تخليص سريع عبر الشحن الجوي بمطار الملك خالد. يدرج في البوليصة كـ "جهاز شخصي مستعمل مرسل للصيانة المؤقتة" للإعفاء من الجمارك.'
  },
  {
    id: 'muscat',
    capitalEn: 'Muscat',
    capitalAr: 'مسقط',
    countryEn: 'Oman',
    countryAr: 'سلطنة عُمان',
    flag: '🇴🇲',
    distanceKm: 420,
    flightTimeHrs: '55 min (or 4.5 hrs Land)',
    recommendedCourier: 'DHL Express / Direct Land Cargo',
    totalRoundtripDays: '2 - 3 Days',
    primaryCouriers: [
      {
        name: 'Direct Land Express (Al Wajajah Line)',
        type: 'Land Express',
        transitHours: '16 - 24 hrs',
        estDays: '1 Day',
        costEstimateAED: '80 - 120 AED (~8.5 - 12.5 OMR)',
        badge: 'Super Fast Overland'
      },
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '24 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '120 - 160 AED (~12.5 - 16.5 OMR)',
        badge: 'Priority Flight'
      },
      {
        name: 'Aramex Muscat-Sharjah',
        type: 'Land Express',
        transitHours: '24 - 36 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '90 - 130 AED (~9.5 - 13.5 OMR)',
        badge: 'Reliable Daily'
      }
    ],
    customsNoteEn: 'Direct border corridor between Oman and UAE (Hatta / Al Wajajah). Quick 1-hour customs clearance for personal electronics.',
    customsNoteAr: 'ممر بري مباشر عبر منفذ الوجاجة / حتا. تخليص جمركي فوري خلال ساعة للأجهزة الشخصية مع متابعة لحظية.'
  },
  {
    id: 'manama',
    capitalEn: 'Manama',
    capitalAr: 'المنامة',
    countryEn: 'Bahrain',
    countryAr: 'مملكة البحرين',
    flag: '🇧🇭',
    distanceKm: 485,
    flightTimeHrs: '1 hr 10 min',
    recommendedCourier: 'DHL Express (Bahrain Hub)',
    totalRoundtripDays: '2 - 4 Days',
    primaryCouriers: [
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '24 - 36 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '130 - 170 AED (~13.5 - 17.5 BHD)',
        badge: 'Direct Air Hub'
      },
      {
        name: 'FedEx Priority',
        type: 'Priority Air',
        transitHours: '36 - 48 hrs',
        estDays: '2 Days',
        costEstimateAED: '140 - 180 AED (~14.5 - 18.5 BHD)',
        badge: 'Insured'
      },
      {
        name: 'Aramex Bahrain Express',
        type: 'Air Express',
        transitHours: '48 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '100 - 140 AED (~10.5 - 14.5 BHD)',
        badge: 'Standard'
      }
    ],
    customsNoteEn: 'Bahrain International Airport to Sharjah International Airport direct cargo routing. Zero VAT applicable on warranty repairs.',
    customsNoteAr: 'شحن مباشر من مطار البحرين الدولي إلى مطار الشارقة. لا تطبق ضريبة القيمة المضافة على الصيانة والضمان.'
  },
  {
    id: 'kuwait-city',
    capitalEn: 'Kuwait City',
    capitalAr: 'مدينة الكويت',
    countryEn: 'Kuwait',
    countryAr: 'دولة الكويت',
    flag: '🇰🇼',
    distanceKm: 850,
    flightTimeHrs: '1 hr 40 min',
    recommendedCourier: 'DHL Express Worldwide',
    totalRoundtripDays: '3 - 4 Days',
    primaryCouriers: [
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '24 - 36 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '140 - 190 AED (~12 - 16 KWD)',
        badge: 'Fastest'
      },
      {
        name: 'FedEx International',
        type: 'Priority Air',
        transitHours: '36 - 48 hrs',
        estDays: '2 Days',
        costEstimateAED: '150 - 200 AED (~13 - 17 KWD)',
        badge: 'Safe Tracking'
      },
      {
        name: 'Aramex GCC',
        type: 'Air Express',
        transitHours: '48 - 72 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '110 - 150 AED (~9 - 13 KWD)',
        badge: 'Economy'
      }
    ],
    customsNoteEn: 'Daily direct flights from Kuwait Airport to UAE. Electronic waybill with device IMEI avoids inspection delays.',
    customsNoteAr: 'رحلات شحن جوي يومية مباشرة من مطار الكويت إلى الإمارات. بوليصة إلكترونية مع رقم IMEI لتفادي أي تأخير تفتيش.'
  },
  {
    id: 'doha',
    capitalEn: 'Doha',
    capitalAr: 'الدوحة',
    countryEn: 'Qatar',
    countryAr: 'دولة قطر',
    flag: '🇶🇦',
    distanceKm: 380,
    flightTimeHrs: '1 hr 05 min',
    recommendedCourier: 'DHL / Qatar Airways Cargo',
    totalRoundtripDays: '2 - 3 Days',
    primaryCouriers: [
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '24 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '130 - 175 AED (~128 - 173 QAR)',
        badge: 'Top Choice'
      },
      {
        name: 'FedEx Priority',
        type: 'Priority Air',
        transitHours: '36 hrs',
        estDays: '1 - 2 Days',
        costEstimateAED: '145 - 190 AED (~143 - 188 QAR)',
        badge: 'Corporate Safe'
      },
      {
        name: 'Aramex GCC Line',
        type: 'Air Express',
        transitHours: '48 hrs',
        estDays: '2 Days',
        costEstimateAED: '105 - 145 AED (~103 - 143 QAR)',
        badge: 'Budget'
      }
    ],
    customsNoteEn: 'Rapid air transfer Hamad International to Sharjah/Dubai. Clean bill of entry under temporary maintenance category.',
    customsNoteAr: 'نقل جوي فائق السرعة من مطار حمد الدولي إلى الشارقة. إعفاء جمركي تحت بند الصيانة المؤقتة للأجهزة.'
  },
  {
    id: 'istanbul',
    capitalEn: 'Istanbul',
    capitalAr: 'إسطنبول',
    countryEn: 'Turkey (Türkiye)',
    countryAr: 'الجمهورية التركية',
    flag: '🇹🇷',
    distanceKm: 3010,
    flightTimeHrs: '4 hrs 30 min',
    recommendedCourier: 'DHL Express / Turkish Cargo',
    totalRoundtripDays: '5 - 6 Days',
    primaryCouriers: [
      {
        name: 'DHL Express Worldwide',
        type: 'Air Express',
        transitHours: '48 - 72 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '220 - 280 AED (~60 - 78 USD)',
        badge: 'Fastest Eurasian'
      },
      {
        name: 'UPS Worldwide Saver',
        type: 'Priority Air',
        transitHours: '48 - 72 hrs',
        estDays: '2 - 3 Days',
        costEstimateAED: '240 - 300 AED (~65 - 82 USD)',
        badge: 'Insured'
      },
      {
        name: 'PTT / Aramex International',
        type: 'Air Express',
        transitHours: '4 - 5 Days',
        estDays: '4 - 5 Days',
        costEstimateAED: '160 - 220 AED (~44 - 60 USD)',
        badge: 'Economical Bulk'
      }
    ],
    customsNoteEn: 'Cross-continental Eurasian air bridge. Ideal for complex micro-soldering and B2B wholesale electronics import.',
    customsNoteAr: 'جسر جوي دولي يربط إسطنبول بالشارقة. مثالي لأعطال البوردات المعقدة وتجارة الأجهزة والقطع بالجملة.'
  }
];

export default function ShippingLogistics() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [selectedRouteId, setSelectedRouteId] = useState<string>('riyadh');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedRoute = gccRoutes.find(r => r.id === selectedRouteId) || gccRoutes[0];

  const labShippingAddress = `Al Sharq Mobile Phone & Computer Trading LLC
BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Industrial Area
Sharjah, United Arab Emirates
Postal Code: 00000 | Tel: +971 50 711 7043 / +971 6 539 2120`;

  const copyAddress = () => {
    navigator.clipboard.writeText(labShippingAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppBooking = (route: RouteDetail) => {
    const text = encodeURIComponent(
      `Hello Al Sharq Lab Sharjah! I am planning to mail in my device from ${route.capitalEn}, ${route.countryEn} for repair. Please share airway bill guidelines & estimated receipt date.`
    );
    window.open(`https://wa.me/971507117043?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs sm:text-sm rounded-full mb-4">
            <Plane className="w-4 h-4" />
            <span>{isAr ? 'حاسبة وخريطة الشحن الدولي المباشر' : 'Cross-Border GCC Mail-In Logistics'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
            {isAr ? (
              <>أوقات وصول الشحنات من <span className="text-brand-orange">عواصم الخليج</span> إلى مختبر الشارقة</>
            ) : (
              <>Courier Delivery Times: <span className="text-brand-orange">GCC Capitals to Sharjah Lab</span></>
            )}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'صُممت خدمتنا لتكون أسهل وأسرع من الصيانة المحلية. اختر عاصمتك لمشاهدة مسار الشحن السريع، شركات النقل المعتمدة (DHL، Aramex، FedEx)، والإعفاءات الجمركية.'
              : 'Sending your device to our specialized micro-soldering laboratory in Muwaileh, Sharjah is as smooth as domestic repair. Select your capital city to explore courier flight times, road transit, and door-to-door insurance.'}
          </p>
        </div>

        {/* Capital City Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {gccRoutes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isSelected
                    ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <span className="text-xl leading-none">{route.flag}</span>
                <span className="font-extrabold">{isAr ? route.capitalAr : route.capitalEn}</span>
                <span className="hidden md:inline-block text-[11px] opacity-80">({isAr ? route.countryAr : route.countryEn})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Route Master Visualizer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoute.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden mb-12"
          >
            {/* Top Corridor Banner */}
            <div className="bg-gradient-to-r from-brand-blue via-slate-900 to-slate-900 text-white p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Route Visual Header */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl block mb-1">{selectedRoute.flag}</span>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">{isAr ? 'نقطة الانطلاق' : 'Origin'}</span>
                    <strong className="text-base sm:text-lg font-black text-white">{isAr ? selectedRoute.capitalAr : selectedRoute.capitalEn}</strong>
                  </div>

                  <div className="flex flex-col items-center px-2 sm:px-4">
                    <div className="flex items-center gap-2 text-brand-orange text-xs sm:text-sm font-bold mb-1">
                      <Plane className="w-4 h-4 animate-pulse" />
                      <span>{selectedRoute.flightTimeHrs}</span>
                    </div>
                    <div className="w-24 sm:w-36 md:w-48 h-1 bg-gradient-to-r from-brand-orange/40 via-brand-orange to-emerald-400 rounded-full relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 font-mono">{selectedRoute.distanceKm} km</span>
                  </div>

                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl block mb-1">🇦🇪</span>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">{isAr ? 'الوجهة' : 'Destination'}</span>
                    <strong className="text-base sm:text-lg font-black text-emerald-400">Sharjah Lab</strong>
                  </div>
                </div>

                {/* Key stats badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{isAr ? 'زمن الدورة الكاملة' : 'Total Roundtrip Turnaround'}</div>
                    <div className="text-base font-black text-brand-orange">{selectedRoute.totalRoundtripDays}</div>
                  </div>
                  <div className="px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{isAr ? 'الناقل الموصى به' : 'Recommended Courier'}</div>
                    <div className="text-base font-black text-white">{selectedRoute.recommendedCourier}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Couriers Comparison Table (7 Cols) */}
                <div className="lg:col-span-7">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-orange" />
                    <span>{isAr ? 'خيارات شركات الشحن من ' + selectedRoute.capitalAr : 'Courier Speed & Transit Options from ' + selectedRoute.capitalEn}</span>
                  </h3>

                  <div className="space-y-3.5 mb-6">
                    {selectedRoute.primaryCouriers.map((courier, idx) => (
                      <div 
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">{courier.name}</span>
                            {courier.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-orange/15 text-brand-orange border border-brand-orange/20">
                                {courier.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-blue dark:text-blue-400" />
                              <span>{courier.transitHours} ({courier.estDays})</span>
                            </span>
                            <span>•</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{courier.type}</span>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0">
                          <div className="text-xs text-gray-400 uppercase font-semibold">{isAr ? 'تكلفة الشحن التقريبية' : 'Approx Transit Cost'}</div>
                          <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">{courier.costEstimateAED}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customs & Clearance Guarantee Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1">
                        {isAr ? 'الإعفاء الجمركي السلس للأجهزة الشخصية' : 'Hassle-Free Customs & Duty Exemption'}
                      </h4>
                      <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
                        {isAr ? selectedRoute.customsNoteAr : selectedRoute.customsNoteEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4-Day End-to-End Timeline Tracker (5 Cols) */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                    <span>{isAr ? 'جدول زمني لرحلة الجهاز (4 أيام)' : 'Typical 4-Day Journey Lifecycle'}</span>
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                    
                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-orange border-2 border-white dark:border-slate-800"></div>
                      <div className="text-xs font-black text-brand-orange uppercase tracking-wider">{isAr ? 'اليوم 1: الاستلام والتغليف' : 'Day 1: Pickup & Flight'}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{isAr ? 'الاستلام من باب منزلك في ' + selectedRoute.capitalAr : 'Doorstep Pickup in ' + selectedRoute.capitalEn}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isAr ? 'كوريير DHL/SMSA يستلم طردك وينطلق به في نفس اليوم.' : 'Courier collects your packaged device and dispatches on the evening air cargo.'}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-blue dark:bg-blue-400 border-2 border-white dark:border-slate-800"></div>
                      <div className="text-xs font-black text-brand-blue dark:text-blue-400 uppercase tracking-wider">{isAr ? 'اليوم 2: الوصول للمختبر' : 'Day 2: Lab Ingestion'}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{isAr ? 'فحص ميكروسكوبي وتصوير فيديو' : 'Microscopic Inspection & Diagnosis'}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isAr ? 'استلام في مويلح، تسجيل رقم IMEI، وفحص اللوحة بكاميرا الأشعة الحرارية.' : 'Received at Muwaileh lab, thermal diagnostic scan, and repair quote confirmed.'}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-slate-800"></div>
                      <div className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">{isAr ? 'اليوم 2 - 3: الصيانة المتقدمة' : 'Day 2-3: Chip Repair'}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{isAr ? 'إصلاح المذربورد واستعادة البيانات' : 'Micro-Soldering & 4K Video Proof'}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isAr ? 'إصلاح اللوحة تحت المجهر واختبار جميع الوظائف وإرسال فيديو تشغيل.' : 'Component repair executed, all rails tested, video confirmation sent to client.'}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{isAr ? 'اليوم 3 - 4: رحلة العودة' : 'Day 3-4: Return Delivery'}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{isAr ? 'التسليم لباب منزلك مع ضمان 90 يوماً' : 'Back at Your Doorstep + 90-Day Warranty'}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isAr ? 'شحن مؤمن دولي مع بوليصة تتبع وضمان رسمي مسجل.' : 'Insured return flight, tracked to your hands with comprehensive 90-day guarantee.'}
                      </p>
                    </div>

                  </div>

                  {/* Actions CTA */}
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleWhatsAppBooking(selectedRoute)}
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'حجز شحنة من ' + selectedRoute.capitalAr : 'Ship from ' + selectedRoute.capitalEn}</span>
                    </button>
                    <button
                      onClick={copyAddress}
                      className="py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-gray-800 dark:text-gray-200 border border-slate-200 dark:border-slate-600 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ العنوان' : 'Copy Lab Address')}</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Packaging Guide Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-1">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white mb-1">
                  {isAr ? 'إرشادات التغليف الآمن للشحن الدولي' : 'Safe International Packaging Guidelines'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAr
                    ? '1. قم بلف الجهاز بـ 3 طبقات من بلاستيك الفقاعات • 2. استخدم كرتوناً مقوى لمنع الصدمات • 3. لا تشحن شواحن أو ملحقات غير ضرورية إلا إذا طُلب منك • 4. الصق بوليصة الشحن بوضوح.'
                    : '1. Wrap device in 3 layers of bubble wrap • 2. Place in a rigid corrugated carton • 3. Keep chargers home unless specifically diagnosing power adapters • 4. Secure the DHL/Aramex label firmly on top.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20please%20send%20me%20your%20courier%20packaging%20checklist."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-gray-900 dark:text-white font-bold text-xs sm:text-sm transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <span>{isAr ? 'طلب مساعدة التغليف' : 'Packaging Checklist'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
