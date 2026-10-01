import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Cpu, 
  HardDrive, 
  ShoppingBag, 
  Printer, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export interface TopicalPillar {
  id: string;
  pillarNameEn: string;
  pillarNameAr: string;
  pillarUrl: string;
  pillarBadge: string;
  icon: any;
  colorClass: string;
  descriptionEn: string;
  descriptionAr: string;
  coreAuthorityServices: string[];
  featuredArticles: {
    title: string;
    url: string;
  }[];
}

export const TOPICAL_PILLARS: TopicalPillar[] = [
  {
    id: 'apple-ecosystem',
    pillarNameEn: 'Apple iPhone & Watch Engineering',
    pillarNameAr: 'هندسة وصيانة الآيفون وساعات أبل',
    pillarUrl: '/iphone-repair',
    pillarBadge: 'Pillar 01',
    icon: Smartphone,
    colorClass: 'from-blue-600 to-indigo-700',
    descriptionEn: 'Factory-grade OCA optical lamination, 0-cycle OEM battery health restoration, laser back glass, and Face ID EEPROM micro-soldering.',
    descriptionAr: 'كبس شاشات بتقنية OCA الأصلية، تبديل بطاريات 0-Cycle OEM، ليزر الزجاج الخلفي، ولحام بصمة الوجه الدقيق.',
    coreAuthorityServices: [
      'iPhone 18/17/16 OLED Screen Replacement',
      'TrueTone & Ambient Sensor Recalibration',
      'OEM Battery Replacement (15 Mins)',
      'Rear Camera Optical Stabilization Fix'
    ],
    featuredArticles: [
      { title: 'Apple iPhone 18 & 18 Pro Launch & Teardown Guide', url: '/blog/iphone-18-launch-colors-specs-repair-sharjah' },
      { title: 'iPhone 16 Pro Max Screen & Logic Board Fix in Sharjah', url: '/blog/iphone-16-pro-max-screen-repair-sharjah-guide' },
      { title: 'iPhone Battery Drain in UAE Summer Heat Guide', url: '/blog/iphone-battery-replacement-sharjah-uae-heat-guide' }
    ]
  },
  {
    id: 'macbook-logic-board',
    pillarNameEn: 'MacBook & Laptop Micro-Soldering',
    pillarNameAr: 'صيانة ماك بوك ولابتوبات (Level 4 Micro-Soldering)',
    pillarUrl: '/macbook-repair',
    pillarBadge: 'Pillar 02',
    icon: Laptop,
    colorClass: 'from-amber-600 to-orange-600',
    descriptionEn: 'Level 4 component-level motherboard recovery for Apple Silicon M1 through M5. Saving burnt power ICs without expensive logic board swaps.',
    descriptionAr: 'صيانة الماذر بورد بالميكروسكوب لمعالجات أبل سيليكون M1 حتى M5 وإنقاذ البورد من التبديل الكامل المكلف.',
    coreAuthorityServices: [
      'Apple Silicon M-Series Liquid Spill De-Oxidation',
      'Burnt PMIC & Power Rail Capacitor Soldering',
      'MacBook Flexgate Backlight Cable Re-joining',
      'High-Performance Thermal Paste Repaste'
    ],
    featuredArticles: [
      { title: 'MacBook Pro M4 Max Liquid Spill Recovery & Micro-Soldering', url: '/blog/macbook-pro-m4-max-liquid-spill-recovery-logic-board-sharjah' },
      { title: 'Level 4 Micro-Soldering vs 4,500 AED Dealership Board Swaps', url: '/blog/macbook-logic-board-repair-sharjah-guide' },
      { title: 'MacBook Pro Flexgate & Stage Light Fix Guide', url: '/blog/macbook-pro-m3-pro-screen-replacement-sharjah-guide' }
    ]
  },
  {
    id: 'samsung-android',
    pillarNameEn: 'Samsung Galaxy & Foldable Hardware',
    pillarNameAr: 'صيانة سامسونج جالاكسي والأجهزة القابلة للطي',
    pillarUrl: '/samsung-repair',
    pillarBadge: 'Pillar 03',
    icon: Cpu,
    colorClass: 'from-cyan-600 to-blue-700',
    descriptionEn: 'Dedicated curved Dynamic AMOLED separation benches, Foldable inner screen flex hinge restoration, and Snapdragon thermal dissipation.',
    descriptionAr: 'فصل وتغيير زجاج الشاشات المنحنية وشاشات الفولد القابلة للطي ومعالجة حرارة معالجات سناب دراجون.',
    coreAuthorityServices: [
      'Galaxy S26 Ultra / S25 Ultra Glass Refurbishing',
      'Galaxy Z Fold & Z Flip Hinge Mechanism Repair',
      'Fast Charging Sub-Board & Port Soldering',
      'Knox Data Preservation & Root Recovery'
    ],
    featuredArticles: [
      { title: 'Samsung Galaxy S26 Ultra & Z Fold 7 Teardown & Repair', url: '/blog/samsung-galaxy-s26-ultra-launch-snapdragon-repair-sharjah' },
      { title: 'Samsung S24 Ultra AMOLED Screen Replacement Sharjah', url: '/blog/samsung-galaxy-s24-ultra-screen-replacement-sharjah-guide' },
      { title: 'Galaxy Z Fold 6 Hinge & Inner Screen Repair Guide', url: '/blog/samsung-galaxy-z-fold-6-screen-repair-sharjah-guide' }
    ]
  },
  {
    id: 'forensic-data-recovery',
    pillarNameEn: 'Forensic NAND & SSD Data Recovery',
    pillarNameAr: 'استعادة البيانات المتقدمة من الذواكر الميتة',
    pillarUrl: '/data-recovery',
    pillarBadge: 'Pillar 04',
    icon: HardDrive,
    colorClass: 'from-purple-600 to-indigo-800',
    descriptionEn: 'Clean-bench retrieval of lost accounting, databases, and family photos from dead smartphones, submerged PCIe NVMe SSDs, and formatted drives.',
    descriptionAr: 'استعادة البيانات من الأجهزة المحترقة والغارقة بالماء والذواكر المشفرة بموجب سياسة (لا بيانات، لا رسوم).',
    coreAuthorityServices: [
      'Dead Smartphone NAND Chip-Off Extraction',
      'Encrypted APFS & BitLocker Partition Rescue',
      'NVMe SSD Controller Repair & Firmware Re-flash',
      'Strict Privacy & Corporate NDA Guarantee'
    ],
    featuredArticles: [
      { title: 'Forensic SSD & Mobile NAND Data Recovery in Sharjah', url: '/blog/forensic-mobile-nand-ssd-data-recovery-sharjah-uae' },
      { title: 'Water Damaged Phone Data Recovery Guide', url: '/blog/water-damage-data-recovery-sharjah-lab-guide' },
      { title: 'Dead Laptop SSD & Hard Drive Recovery Sharjah', url: '/blog/hard-drive-recovery-sharjah-lab-guide' }
    ]
  },
  {
    id: 'wholesale-gcc-commerce',
    pillarNameEn: 'Port Wholesale & GCC Cross-Border Trade',
    pillarNameAr: 'تجارة واستيراد الجوالات بأسعار الجملة للخليج',
    pillarUrl: '/gcc-services',
    pillarBadge: 'Pillar 05',
    icon: ShoppingBag,
    colorClass: 'from-emerald-600 to-teal-700',
    descriptionEn: 'Direct container port clearance delivering brand-new factory-sealed smartphones at 20% below mall retail across UAE, KSA, Oman, Bahrain, Kuwait, Qatar & Turkey.',
    descriptionAr: 'استيراد حاويات مباشر من موانئ الإمارات بأسعار الجملة (خصم 20%) مع شحن سريع ومؤمن لجميع دول الخليج.',
    coreAuthorityServices: [
      'Factory-Sealed Flagships at Port Wholesale Rates',
      'Tabby & Tamara 4-Month Split Payments',
      'Saudi Arabia (Riyadh/Jeddah) DHL 24h Express Lane',
      'Oman, Kuwait, Bahrain & Qatar Customs-Cleared Transit'
    ],
    featuredArticles: [
      { title: 'Buying Brand-New Phones 20% Below Retail in Sharjah', url: '/blog/buy-brand-new-phones-wholesale-sharjah-20-percent-below-retail-guide' },
      { title: 'Saudi Arabia Mail-In Repair to Sharjah (Riyadh & Jeddah)', url: '/blog/saudi-arabia-iphone-18-macbook-repair-shipping-sharjah-riyadh-jeddah' },
      { title: 'Oman Muscat & Sohar Mail-In Repair to Sharjah Lab', url: '/blog/oman-muscat-macbook-iphone-mail-in-repair-sharjah-lab' }
    ]
  },
  {
    id: 'commercial-printers',
    pillarNameEn: 'Commercial & Industrial Hardware Care',
    pillarNameAr: 'صيانة الطابعات الليزرية والمعدات المكتبية',
    pillarUrl: '/printer-repair',
    pillarBadge: 'Pillar 06',
    icon: Printer,
    colorClass: 'from-rose-600 to-red-700',
    descriptionEn: 'Preventive service contracts, fuser assembly rebuilds, and thermal printhead maintenance for corporate fleets and industrial warehouses.',
    descriptionAr: 'عقود صيانة الشركات وتبديل رولات السخان وطابعات الباركود الحرارية للشركات في صناعية الشارقة.',
    coreAuthorityServices: [
      'HP Enterprise LaserJet Fuser Roller Replacement',
      'Epson EcoTank PrecisionCore Head Unclogging',
      'Zebra Industrial Thermal Barcode Head Servicing',
      'Corporate Fleet B2B Maintenance Agreements'
    ],
    featuredArticles: [
      { title: 'Sharjah Commercial & Industrial Printer Care Guide', url: '/blog/commercial-laser-thermal-printer-repair-guide-sharjah-industrial' },
      { title: 'HP LaserJet Maintenance & Roller Repair Sharjah', url: '/blog/hp-laserjet-fuser-roller-replacement-sharjah-guide' },
      { title: 'Epson EcoTank Printhead Unclogging Guide', url: '/blog/epson-ecotank-printhead-cleaning-sharjah-guide' }
    ]
  },
  {
    id: 'hyper-local-sharjah',
    pillarNameEn: 'Sharjah "Near Me" Local Repair Bench',
    pillarNameAr: 'مركز الصيانة المباشر في مويلح (قريب مني بالشارقة)',
    pillarUrl: '/phone-repair',
    pillarBadge: 'Pillar 07',
    icon: MapPin,
    colorClass: 'from-violet-600 to-purple-700',
    descriptionEn: 'The central physical lab on Fire Station Road, Muwaileh Commercial. Rapid 20-minute turnaround for University City, Al Majaz, and Sahara Centre.',
    descriptionAr: 'الموقع المركزي في مويلح التجارية على شارع محطة الإطفاء لخدمة سكان المدينة الجامعية والمجاز والنهدة وعجمان.',
    coreAuthorityServices: [
      '20-Minute Express Walk-In Bench Repairs',
      'Free Diagnostic Testing Under 40x Microscope',
      '1-Year Comprehensive Lab Guarantee',
      'Comfortable Customer Waiting Lounge with Free Wi-Fi'
    ],
    featuredArticles: [
      { title: 'Ultimate "Near Me" Phone & Laptop Guide in Sharjah', url: '/blog/mobile-phone-repair-shop-near-me-sharjah-guide' },
      { title: 'Phone Repair Near Muwaileh Commercial Sharjah', url: '/blog/phone-repair-muwaileh-commercial-sharjah-guide' },
      { title: 'Laptop & Computer Repair Near University City Sharjah', url: '/blog/laptop-repair-university-city-sharjah-guide' }
    ]
  }
];

export default function TopicalAuthorityClusterHub() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand-orange/30 shadow-xl">
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>{isAr ? 'خارطة التخصص الفني والموثوقية الموضوعية' : 'Google Topical Authority & Knowledge Silos'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          {isAr 
            ? 'محاور الخبرة الهندسية وتصنيفات المحتوى التخصصي' 
            : 'Al Sharq 7 Core Engineering Pillars & Topic Clusters'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isAr
            ? 'تم بناء محتوى موقعنا وفق نموذج (Pillar-Cluster Model) المعترف به في محركات البحث؛ حيث يرتبط كل مقال بحثي بصفحة خدمة فنية متخصصة ومعدات مختبر حقيقية في الشارقة.'
            : 'Explore our comprehensive knowledge graph. Every article belongs to a verified engineering pillar, connecting deep technical teardowns with physical repair benches in Muwaileh, Sharjah.'}
        </p>
      </div>

      {/* 7 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {TOPICAL_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={pillar.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-5 flex flex-col justify-between hover:border-brand-orange transition-all hover:shadow-lg group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.colorClass} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {pillar.pillarBadge}
                  </span>
                </div>

                {/* Pillar Link */}
                <Link 
                  to={pillar.pillarUrl} 
                  className="group-hover:text-brand-orange transition-colors inline-block"
                >
                  <h3 className="font-black text-base text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <span>{isAr ? pillar.pillarNameAr : pillar.pillarNameEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-orange" />
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                </p>

                {/* Core Services Bullet Points */}
                <div className="space-y-1 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  {pillar.coreAuthorityServices.slice(0, 3).map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{srv}</span>
                    </div>
                  ))}
                </div>

                {/* Cluster Articles */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Featured Deep Dive Guides:
                  </span>
                  {pillar.featuredArticles.map((art, aIdx) => (
                    <Link
                      key={aIdx}
                      to={art.url}
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange dark:hover:text-brand-orange truncate transition-colors pl-2 border-l-2 border-slate-300 dark:border-slate-700 hover:border-brand-orange"
                    >
                      {art.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pillar Service Anchor */}
              <Link
                to={pillar.pillarUrl}
                className="w-full py-2 bg-white dark:bg-slate-800 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all text-center shadow-sm"
              >
                <span>{isAr ? 'عرض صفحة الخدمة الرئيسية (Pillar)' : 'Explore Service Pillar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
