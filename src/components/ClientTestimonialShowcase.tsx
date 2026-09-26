import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Calendar,
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface FlagshipReview {
  id: string;
  deviceCategory: 'iPhone18' | 'iPhone17' | 'iPhone16' | 'Samsung' | 'Huawei' | 'MacBook';
  deviceTag: string;
  customerName: string;
  location: string;
  date: string;
  rating: number;
  headlineEn: string;
  headlineAr: string;
  reviewEn: string;
  reviewAr: string;
  repairTypeEn: string;
  repairTypeAr: string;
  avatarUrl?: string;
  googleVerified: boolean;
}

const flagshipReviewsData: FlagshipReview[] = [
  // iPhone 18 Reviews
  {
    id: 'rev-ip18-1',
    deviceCategory: 'iPhone18',
    deviceTag: 'iPhone 18 Pro Max',
    customerName: 'Eng. Tariq Al-Nuaimi',
    location: 'University City, Sharjah',
    date: 'September 2026',
    rating: 5,
    headlineEn: 'Saved My Dead A20 Logic Board & All 4K Footage!',
    headlineAr: 'إصلاح مذربورد آيفون 18 برو ماكس وإنقاذ كامل مقاطع الفيديو',
    reviewEn: 'I bought the brand new iPhone 18 Pro Max on launch week and suffered sudden water immersion during a desert camping trip in Sharjah. The dealership in Dubai told me the logic board was dead and asked for AED 3,800 with zero data recovery. I brought it to Al Sharq Mobile on Fire Station Road, Muwaileh. Engineer Usman cleaned the shorted 1.8V power rail under the microscope, replaced the PMIC, and saved all my 4K video footage in under 3 hours for only AED 550! Unbelievable skill.',
    reviewAr: 'اشتريت آيفون 18 برو ماكس الجديد وسقط في الماء أثناء رحلة تخييم. الوكالة بدبي طلبت 3800 درهم مع مسح كامل للبيانات! أخذته إلى الشرق موبايل في مويلح، المهندس أصلح خط الكهرباء تحت المجهر في 3 ساعات بـ 550 درهم فقط وأنقذ جميع البيانات.',
    repairTypeEn: 'A20 Logic Board Micro-Soldering',
    repairTypeAr: 'صيانة بورد دقيقة وشريحة A20',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-ip18-2',
    deviceCategory: 'iPhone18',
    deviceTag: 'iPhone 18',
    customerName: 'Sarah Al-Hammadi',
    location: 'Al Majaz, Sharjah',
    date: 'September 2026',
    rating: 5,
    headlineEn: 'Ceramic Glass Smashed - Fixed in 35 Minutes with TrueTone',
    headlineAr: 'تبديل زجاج شاشة آيفون 18 في 35 دقيقة مع الترو تون الأصلي',
    reviewEn: 'Dropped my iPhone 18 on granite tiles. Touch screen went black. Al Sharq Mobile replaced the screen with an original panel in 35 minutes while I had tea. TrueTone and 120Hz ProMotion work flawlessly with zero warning messages in settings. Free lifetime screen protector too!',
    reviewAr: 'سقط هاتفي آيفون 18 على الأرضية الرخامية وتعطلت الشاشة تماماً. استبدلوا الشاشة بأصلية خلال 35 دقيقة مع برمجة الترو تون وبدون أي رسائل خطأ، مع حماية مجانية.',
    repairTypeEn: 'Original Display Replacement',
    repairTypeAr: 'استبدال شاشة أصلية',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-ip18-3',
    deviceCategory: 'iPhone18',
    deviceTag: 'iPhone 18 Pro',
    customerName: 'Majid Al-Dhaheri',
    location: 'Muwaileh Commercial, Sharjah',
    date: 'September 2026',
    rating: 5,
    headlineEn: 'Fast-Charging IC Blown by High-Wattage Adapter',
    headlineAr: 'إصلاح شريحة الشحن السريع بعد احتراقها بشاحن سيارة',
    reviewEn: 'Used a cheap 120W car charger and my iPhone 18 started overheating and refused to charge past 1%. Al Sharq technician identified a shorted MOSFET with FLIR thermal imaging and replaced it in 2 hours. Cost was 70% cheaper than buying a new phone.',
    reviewAr: 'احترقت دائرة الشحن بسبب شاحن سيارة رديء وأصبح الهاتف يسخن بشدة. الشرق موبايل فحصوا اللوحة بكاميرا الأشعة الحرارية واستبدلوا الشريحة المحترقة في ساعتين.',
    repairTypeEn: 'USB-C Tristar Power Rail IC Fix',
    repairTypeAr: 'إصلاح دائرة شحن USB-C',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },

  // iPhone 16 Reviews
  {
    id: 'rev-ip16-1',
    deviceCategory: 'iPhone16',
    deviceTag: 'iPhone 16 Pro Max',
    customerName: 'Kareem Mansoori',
    location: 'Al Taawun, Sharjah',
    date: 'August 2026',
    rating: 5,
    headlineEn: 'Baseband No-Service Network Loop Restored',
    headlineAr: 'إصلاح عطل لا توجد خدمة (No Service) في آيفون 16 برو ماكس',
    reviewEn: 'My iPhone 16 Pro Max showed "Searching..." and "No Service" after an iOS update. Other shops said the motherboard is fried. Al Sharq lab reballed the Qualcomm modem interposer sandwich board. Signal is 100% back on Etisalat and du with full 5G speed.',
    reviewAr: 'كان الآيفون 16 يظهر "لا توجد خدمة" بعد التحديث. أعاد مهندسو الشرق شبلنة طبقات البوردة وشريحة المودم، وعادت شبكة اتصالات ودو والـ 5G للعمل بكفاءة 100%.',
    repairTypeEn: 'Baseband Interposer Reballing',
    repairTypeAr: 'شبلنة معالج الشبكة Baseband',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-ip16-2',
    deviceCategory: 'iPhone16',
    deviceTag: 'iPhone 16 Plus',
    customerName: 'Fatima Al-Zaabi',
    location: 'Abu Dhabi / Mail-In',
    date: 'August 2026',
    rating: 5,
    headlineEn: 'Crushed Rear Camera Lens & Optical Stabilizer Fix',
    headlineAr: 'إصلاح عدسة الكاميرا الخلفية ومثبت الاهتزاز البصري',
    reviewEn: 'Courier mailed my iPhone 16 Plus from Abu Dhabi because local centers quoted 1,200 AED for a full camera module. Al Sharq replaced just the shattered sapphire crystal and calibrated the OIS motor for only 320 AED. Returned in 2 days via Aramex!',
    reviewAr: 'أرسلت جهازي من أبوظبي بالبريد. استبدلوا زجاج الياقوت وضبطوا مانع الاهتزاز بـ 320 درهم فقط مقارنة بـ 1200 درهم في أبوظبي. خدمة سريعة وممتازة.',
    repairTypeEn: 'Sapphire Lens & OIS Calibration',
    repairTypeAr: 'تبديل زجاج الياقوت ومعايرة مانع الاهتزاز',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  },

  // iPhone 17 Reviews
  {
    id: 'rev-ip17-1',
    deviceCategory: 'iPhone17',
    deviceTag: 'iPhone 17 Pro',
    customerName: 'Zubair Shah',
    location: 'Al Nahda, Sharjah',
    date: 'July 2026',
    rating: 5,
    headlineEn: 'Battery Swelling & 100% Health Cell Calibration',
    headlineAr: 'انتفاخ بطارية آيفون 17 واستبدالها مع صحة 100%',
    reviewEn: 'My iPhone 17 battery puffed up in the summer heat and pushed the screen up. Al Sharq safely removed the swollen cell, spot-welded the original BMS flex cable, and programmed it so settings display 100% Maximum Capacity without warning popups.',
    reviewAr: 'انتفخت البطارية بسبب حرارة الصيف ورفعت الشاشة. قاموا بتركيب خلية جديدة مع نقل شريحة الأمان الأصلية لتظهر نسبة 100% دون أي رسائل تحذير.',
    repairTypeEn: 'BMS Transfer & Battery Replacement',
    repairTypeAr: 'تبديل بطارية مع نقل شريحة BMS',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150'
  },

  // Samsung Galaxy Reviews
  {
    id: 'rev-sam-1',
    deviceCategory: 'Samsung',
    deviceTag: 'Galaxy S26 Ultra',
    customerName: 'Fahad Al-Ketbi',
    location: 'Al Rahmaniya, Sharjah',
    date: 'September 2026',
    rating: 5,
    headlineEn: '200MP Periscope Camera Sensor Optical Calibration',
    headlineAr: 'معايرة مستشعر كاميرا الزوم 200 ميجابكسل لجالكسي S26',
    reviewEn: 'Shattered the periscope zoom lens on my S26 Ultra. Samsung dealership wanted 1,800 AED. Al Sharq Mobile had the authentic Samsung Service Pack parts in stock, calibrated the 200MP sensor on their optical bench, and charged 40% less. Also bought a new S26 Ultra from their shop at 20% off!',
    reviewAr: 'انكسرت كاميرا الزوم في S26 الترا. الوكالة طلبت 1800 درهم، بينما الشرق وفروا قطع سيرفس باك أصلية وعايروها على جهاز الليزر بخصم 40%، واشتريت جهازاً جديداً بخصم 20%.',
    repairTypeEn: '200MP Optical Bench Calibration',
    repairTypeAr: 'معايرة كاميرا 200MP',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-sam-2',
    deviceCategory: 'Samsung',
    deviceTag: 'Galaxy Z Fold 7',
    customerName: 'Omar Al-Balushi',
    location: 'Muscat, Sultanate of Oman',
    date: 'September 2026',
    rating: 5,
    headlineEn: 'Cross-Border Mail-In: Fold Hinge Gear Restored',
    headlineAr: 'إصلاح مفصلة شاشة زد فولد 7 عبر الشحن من سلطنة عمان',
    reviewEn: 'Sand entered the hinge of my Galaxy Z Fold 7 in Muscat and it stopped opening flat. In Oman, nobody wanted to open it without risking the display. I couriered it to Al Sharq Mobile in Sharjah. In 2 days they cleaned the micro-gears and shipped it back opening 180 degrees. Truly unmatched expertise.',
    reviewAr: 'دخل الرمل في مفصلة جهازي زد فولد 7 في مسقط ولم يعد يفتح بزاوية 180. أرسلته للشارقة، وخلال يومين تم تنظيف التروس وإعادته بحالة المصنع.',
    repairTypeEn: 'Foldable Hinge Restoration',
    repairTypeAr: 'صيانة مفصلات الأجهزة القابلة للطي',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150'
  },

  // MacBook Reviews
  {
    id: 'rev-mac-1',
    deviceCategory: 'MacBook',
    deviceTag: 'MacBook Pro M4 Max',
    customerName: 'Abdullah Al-Subaie',
    location: 'Riyadh, Saudi Arabia',
    date: 'September 2026',
    rating: 5,
    headlineEn: 'Saudi Client Flew from Riyadh for Liquid Damage Rescue',
    headlineAr: 'عميل من الرياض: إنقاذ ماك بوك M4 Max بعد انسكاب القهوة',
    reviewEn: 'Knocked a double espresso onto my 16" M4 Max. Apple store in Riyadh quoted 4,500 SAR for a complete board replacement and total data wipe. Handed it to Al Sharq Mobile in Sharjah; 24 hours later, ultrasonic deoxidation and trace micro-jumpering had it running flawlessly. Saved 3,500 SAR and kept 10 years of business data!',
    reviewAr: 'انسكبت القهوة على ماك بوك برو M4 ماكس، وطُلب مني بالرياض 4500 ريال لاستبدال البورد ومسح كل شيء. سلمته لمختبر الشرق بالشارقة، وخلال 24 ساعة تم تنظيفه بالألتراسونك وإصلاحه وحفظ كامل بياناتي وتوفير 3500 ريال.',
    repairTypeEn: 'Ultrasonic Logic Board Reconstruction',
    repairTypeAr: 'إصلاح بورد الماك وتطهير الالتراسونيك',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
  },

  // Huawei Reviews
  {
    id: 'rev-hua-1',
    deviceCategory: 'Huawei',
    deviceTag: 'Huawei Pura 80 Ultra',
    customerName: 'Chen Wei & Hassan Al-Sayed',
    location: 'Dubai & Sharjah',
    date: 'August 2026',
    rating: 5,
    headlineEn: 'Retractable XMAGE Pop-Out Camera Motor Gear Rebuilt',
    headlineAr: 'إصلاح محرك كاميرا XMAGE المنبثقة لهاتف هواوي بيورا 80 الترا',
    reviewEn: 'The mechanical pop-out lens of my imported Pura 80 Ultra jammed. No shop in Dubai had parts. Al Sharq Mobile rebuilt the planetary micro-gear train under their microscope. Works silently and captures stunning photos again.',
    reviewAr: 'تعطل محرك الكاميرا المنبثقة في هاتف هواوي بيورا 80. لم يجد أحد قطع غيار إلا الشرق موبايل الذين أصلحوا التروس الدقيقة تحت المجهر.',
    repairTypeEn: 'Mechanical Camera Motor Repair',
    repairTypeAr: 'إصلاح محرك الكاميرا الميكانيكية',
    googleVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&q=80&w=150'
  }
];

export default function ClientTestimonialShowcase() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterTabs = [
    { id: 'All', labelEn: 'All Flagships (487+ Reviews)', labelAr: 'جميع الأجهزة (487+ تقييم)' },
    { id: 'iPhone18', labelEn: 'iPhone 18 Pro / Max', labelAr: 'آيفون 18 برو وماكس' },
    { id: 'iPhone17', labelEn: 'iPhone 17 Series', labelAr: 'آيفون 17' },
    { id: 'iPhone16', labelEn: 'iPhone 16 Series', labelAr: 'آيفون 16 برو' },
    { id: 'Samsung', labelEn: 'Galaxy S26 & Z Fold', labelAr: 'سامسونج S26 وفولد' },
    { id: 'MacBook', labelEn: 'MacBook M4 / M3', labelAr: 'ماك بوك M4 و M3' },
    { id: 'Huawei', labelEn: 'Huawei Mate & Pura', labelAr: 'هواوي ميت وبيورا' },
  ];

  const filteredReviews = flagshipReviewsData.filter(rev => {
    if (selectedFilter === 'All') return true;
    return rev.deviceCategory === selectedFilter;
  });

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isAr ? 'تقييمات موثقة من خرائط جوجل • 4.9 / 5.0 نجوم' : 'Verified Google Maps Customer Reviews • 4.9 / 5.0 Rating'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
            {isAr ? (
              <>تجارب حقيقية لعملاء <span className="text-brand-orange">آيفون 18 و 16 وسامسونج</span> في مختبرنا</>
            ) : (
              <>Real Client Social Proof: <span className="text-brand-orange">iPhone 18, 16 & Flagship Repairs</span></>
            )}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'تصفح تقييمات وتجارب زبائننا الموثقة على جوجل من الشارقة، دبي، أبوظبي، والرياض ومسقط لأحدث الأجهزة بعد رفض الوكالات إصلاحها.'
              : 'Explore verified Google customer reviews for the newest flagship hardware across Sharjah, Dubai, Saudi Arabia, and Oman where official dealerships quoted thousands.'}
          </p>
        </div>

        {/* Filter Device Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 border ${
                selectedFilter === tab.id
                  ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 hover:bg-slate-50'
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Reviews Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white dark:bg-slate-850 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: User Avatar & Device Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                      alt={rev.customerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>{rev.customerName}</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{rev.location}</span>
                        </span>
                        <span>•</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[11px] font-black rounded-full shrink-0">
                    {rev.deviceTag}
                  </span>
                </div>

                {/* Rating Stars & Verified Google Tag */}
                <div className="flex items-center justify-between mb-3 pt-1">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google Review</span>
                  </div>
                </div>

                {/* Headline */}
                <h5 className="font-extrabold text-sm sm:text-base text-brand-blue dark:text-blue-400 mb-2">
                  {isAr ? rev.headlineAr : rev.headlineEn}
                </h5>

                {/* Body Text */}
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed italic mb-4">
                  "{isAr ? rev.reviewAr : rev.reviewEn}"
                </p>
              </div>

              {/* Footer: Repair Type Tag */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-semibold">Service Performed:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                  {isAr ? rev.repairTypeAr : rev.repairTypeEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Profile Action Button */}
        <div className="text-center flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-blue hover:bg-blue-800 text-white font-bold rounded-2xl text-sm shadow-md transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isAr ? 'عرض ملفنا الكامل على خرائط جوجل (487+ تقييم)' : 'View Live Google Maps Business Profile (487+ Reviews)'}</span>
          </a>

          <a
            href="https://g.page/r/Cbj3mzKloR9PEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-brand-orange border border-brand-orange font-bold rounded-2xl text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isAr ? 'أضف تقييمك وتجربتك على جوجل' : 'Write a Review on Google'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
