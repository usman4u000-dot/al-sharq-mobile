import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Printer, 
  Laptop, 
  Monitor, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Wrench,
  Sparkles,
  ChevronRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface FiveCoreSpecialtyBlocksProps {
  onBookNow: (serviceName?: string) => void;
}

export default function FiveCoreSpecialtyBlocks({ onBookNow }: FiveCoreSpecialtyBlocksProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobile' | 'printer' | 'laptop' | 'screen' | 'chip'>('all');

  const blocks = [
    {
      id: 'mobile',
      tag: 'Block 1',
      titleEn: 'Mobile Phone & Smartphone Repair',
      titleAr: 'صيانة وإصلاح الهواتف الذكية',
      badgeEn: '15-30 Min Express Fix',
      badgeAr: 'إصلاح سريع 15-30 دقيقة',
      categoryEn: 'Smartphones & Tablets',
      icon: Smartphone,
      accentColor: 'from-orange-500 to-amber-500',
      lightBg: 'bg-orange-100 text-orange-950 dark:bg-orange-950/70 dark:text-orange-200 border-orange-300 dark:border-orange-500/50',
      priceEn: 'From 79 AED',
      priceAr: 'يبدأ من 79 درهم',
      turnaroundEn: '15 - 45 Minutes',
      turnaroundAr: '15 - 45 دقيقة',
      warrantyEn: '90-Day Comprehensive Warranty',
      warrantyAr: 'ضمان شامل لمدة 90 يوماً',
      descEn: 'Comprehensive hardware and logic repair for all Apple iPhone, Samsung Galaxy, Google Pixel, and Xiaomi models. Genuine screens, high-capacity battery cells, and IC audio/charge chips.',
      descAr: 'خدمات شاملة لإصلاح هواتف آيفون وسامسونج وبكسل وشاومي. شاشات أصلية، بطاريات معتمدة، وصيانة دوائر الشحن والصوت مع ضمان 90 يوماً.',
      featuresEn: [
        'OLED & Super AMOLED Screen Replacement',
        'Certified Battery Health Restoration (100% BMS)',
        'Charging Port & USB-C Flex Cable Replacement',
        'Water & Liquid Spill Ultrasonic Chemical Deoxidation',
        'Camera Lens, Face ID & Sensor Calibration'
      ],
      featuresAr: [
        'تبديل شاشات OLED و Super AMOLED الأصلية',
        'استبدال بطاريات معتمدة مع برمجة صحة البطارية',
        'تصليح منفذ الشحن وفلكس التوصيل',
        'إزالة أكسدة السوائل والماء بالموجات الصوتية',
        'معايرة كاميرات وحساسات بصمة الوجه Face ID'
      ],
      link: '/phone-repair',
      ctaTextEn: 'Book Mobile Repair',
      ctaTextAr: 'حجز صيانة الهاتف'
    },
    {
      id: 'printer',
      tag: 'Block 2',
      titleEn: 'Commercial & Home Printer Repair',
      titleAr: 'صيانة وإصلاح الطابعات المكتبية والمنزلية',
      badgeEn: 'LaserJet & InkTank Specialist',
      badgeAr: 'متخصص ليزر جيت وإنك تانك',
      categoryEn: 'Printers & Plotters',
      icon: Printer,
      accentColor: 'from-emerald-500 to-teal-500',
      lightBg: 'bg-emerald-100 text-emerald-950 dark:bg-emerald-950/70 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/50',
      priceEn: 'From 89 AED',
      priceAr: 'يبدأ من 89 درهم',
      turnaroundEn: 'Same-Day / 24 Hours',
      turnaroundAr: 'في نفس اليوم / 24 ساعة',
      warrantyEn: '60-Day Workmanship Warranty',
      warrantyAr: 'ضمان الصيانة 60 يوماً',
      descEn: 'Sharjah’s trusted workshop for HP, Canon, Epson, Brother, and Xerox printers. From stubborn paper jams and roller replacement to dried printhead unclogging and motherboard controller repairs.',
      descAr: 'الورشة المعتمدة في الشارقة لصيانة طابعات HP، كانون، إبسون، براذر، وزيروكس. حل مشاكل سحب الورق، تسليك رؤوس الطباعة، وصيانة كروت التحكم والباور.',
      featuresEn: [
        'Paper Jam & Pickup Roller Roller Replacement',
        'Printhead Ultrasonic Flush & Nozzle Recovery (Epson/Canon)',
        'LaserJet Fuser Unit & Heating Element Rebuild',
        'Formatter Board & Power Supply Circuit Diagnostics',
        'Wi-Fi, Network & Driver Firmware Setup'
      ],
      featuresAr: [
        'معالجة انحشار الورق وتغيير بكرات السحب Roller',
        'تنظيف رؤوس الطباعة المسدودة بالموجات الدقيقة',
        'صيانة وحدة الفيوزر Fuser Unit وسخانات الليزر',
        'فحص بوردات الباور والتحكم Formatter Board',
        'ضبط الاتصال اللاسلكي Wi-Fi وتعريفات الشبكة'
      ],
      link: '/printer-repair',
      ctaTextEn: 'Book Printer Service',
      ctaTextAr: 'حجز صيانة الطابعة'
    },
    {
      id: 'laptop',
      tag: 'Block 3',
      titleEn: 'Laptop Repair & Hardware Overhauls',
      titleAr: 'صيانة اللابتوب والماك بوك الشاملة',
      badgeEn: 'MacBook & Windows Certified',
      badgeAr: 'معتمد ماك بوك وويندوز',
      categoryEn: 'Laptops & Workstations',
      icon: Laptop,
      accentColor: 'from-blue-600 to-indigo-600',
      lightBg: 'bg-blue-100 text-blue-950 dark:bg-blue-950/70 dark:text-blue-200 border-blue-300 dark:border-blue-500/50',
      priceEn: 'From 99 AED',
      priceAr: 'يبدأ من 99 درهم',
      turnaroundEn: '1 - 3 Hours',
      turnaroundAr: '1 - 3 ساعات',
      warrantyEn: '90-Day Parts & Labor Warranty',
      warrantyAr: 'ضمان قطع الغيار والعمل 90 يوماً',
      descEn: 'Full-spectrum repair for Apple MacBook Air/Pro (M1/M2/M3/M4 & Intel), Dell XPS/Alienware, HP Omen/Spectre, Lenovo ThinkPad, and Asus ROG. No-power diagnostics, keyboard replacement, and thermal tuning.',
      descAr: 'صيانة احترافية لأجهزة ماك بوك وديل وإتش بي ولينوفو وأسوس. تشخيص الأجهزة المنطفئة، تغيير الكيبورد، وتبريد المعالجات مع تغيير المعجون الحراري.',
      featuresEn: [
        'Dead Motherboard & Short-Circuit Fault Isolation',
        'Original Keyboard, Trackpad & Battery Replacements',
        'High-Speed NVMe Gen4 SSD & DDR5 RAM Upgrades',
        'Cooling System Overhaul with Arctic MX-6 Thermal Paste',
        'OS Reinstallation, macOS Tahoe/Sonoma & Windows 11'
      ],
      featuresAr: [
        'تحديد ومعالجة التماس الماذربورد للأجهزة الفاصلة باور',
        'استبدال لوحة المفاتيح والماوس باد والبطارية الأصلية',
        'ترقية وسائط التخزين NVMe SSD ورامات DDR5 فائقة السرعة',
        'تنظيف مراوح التبريد وتجديد المعجون الحراري الأصلي',
        'تثبيت أنظمة macOS وويندوز 11 مع الحفاظ على البرامج'
      ],
      link: '/laptop-repair',
      ctaTextEn: 'Book Laptop Repair',
      ctaTextAr: 'حجز صيانة اللابتوب'
    },
    {
      id: 'screen',
      tag: 'Block 4',
      titleEn: 'Laptop Screen Repair & Replacement',
      titleAr: 'استبدال وتصليح شاشات اللابتوب',
      badgeEn: 'Retina, OLED & 144Hz-240Hz',
      badgeAr: 'شاشات ريتينا، OLED، وتردد عالي',
      categoryEn: 'Display Replacement',
      icon: Monitor,
      accentColor: 'from-cyan-500 to-blue-500',
      lightBg: 'bg-cyan-100 text-cyan-950 dark:bg-cyan-950/70 dark:text-cyan-200 border-cyan-300 dark:border-cyan-500/50',
      priceEn: 'From 149 AED',
      priceAr: 'يبدأ من 149 درهم',
      turnaroundEn: '30 - 60 Minutes',
      turnaroundAr: '30 - 60 دقيقة',
      warrantyEn: 'Zero Dead-Pixel Guarantee',
      warrantyAr: 'ضمان خلو تام من البكسلات الميتة',
      descEn: 'Specialized laptop display center in Sharjah. Broken glass, bleeding LCD, vertical color lines, or dim backlight. Factory-original panels with full color calibration and True Tone retention.',
      descAr: 'المركز المتخصص لتبديل شاشات اللابتوب والماك بوك في الشارقة. حل مشاكل الكسر، الخطوط العمودية، والشاشات المظلمة بألواح أصلية ومطابقة لألوان المصنع.',
      featuresEn: [
        'Apple MacBook Retina & Liquid Retina XDR Assemblies',
        'Gaming Laptop Panels (144Hz, 165Hz, 240Hz, 360Hz)',
        'Touchscreen Digitizer & 2-in-1 Convertible Glass Repair',
        'LVDS / eDP Display Cable & Broken Hinge Reconstruction',
        'Full sRGB / DCI-P3 Color Gamut Calibration'
      ],
      featuresAr: [
        'شاشات ماك بوك ريتينا الأصلية مع الحفاظ على True Tone',
        'شاشات لابتوبات الألعاب عالية التردد 144Hz حتى 360Hz',
        'تبديل زجاج اللمس للأجهزة المتحولة 2-in-1',
        'تصليح كابلات الشاشة eDP وترميم مفاصل الشاشة المكسورة',
        'معايرة احترافية لتطابق ألوان sRGB و DCI-P3 بنسبة 100%'
      ],
      link: '/laptop-screen-repair',
      ctaTextEn: 'Replace Laptop Screen',
      ctaTextAr: 'تبديل شاشة اللابتوب'
    },
    {
      id: 'chip',
      tag: 'Block 5',
      titleEn: 'Chip-Level Micro-Soldering & Data Recovery',
      titleAr: 'صيانة المايكرو سولدرينغ واسترجاع البيانات',
      badgeEn: 'Sharjah Cleanroom Grade Lab',
      badgeAr: 'مختبر مجهري متطور بالشارقة',
      categoryEn: 'Logic Board & NAND Recovery',
      icon: Cpu,
      accentColor: 'from-purple-600 to-indigo-600',
      lightBg: 'bg-purple-100 text-purple-950 dark:bg-purple-950/70 dark:text-purple-200 border-purple-300 dark:border-purple-500/50',
      priceEn: 'Free Diagnostic',
      priceAr: 'فحص وتشخيص مجاني',
      turnaroundEn: 'Same-Day / 48h Complex',
      turnaroundAr: 'في نفس اليوم / 48 ساعة للمركب',
      warrantyEn: '6-Month Logic Board Warranty',
      warrantyAr: 'ضمان 6 أشهر على تصليح البورد',
      descEn: 'The technical pinnacle of Al Sharq Mobile. Stereoscopic microscopes and thermal infrared cameras to fix burnt power ICs, blown capacitors, and damaged traces that other shops declare unfixable.',
      descAr: 'قمة الخبرة الهندسية في الشرق. استخدام المجاهر الإلكترونية وكاميرات الأشعة تحت الحمراء لمعالجة الدوائر المحترقة واسترجاع البيانات من الأجهزة الميتة تماماً.',
      featuresEn: [
        'Microscope SMD Capacitor & Resistor Trace Reconstruction',
        'BGA Chip Reballing (CPU, GPU, Power Management PMIC)',
        'NAND Flash Chip-Off Forensic Data Retrieval',
        'Short-Circuit Thermal IR Heat Mapping Diagnostic',
        'Zero Data Loss Policy with Strict Privacy Protocols'
      ],
      featuresAr: [
        'إعادة بناء مسارات الدوائر المجهرية والمكثفات المحترقة',
        'شبلنة ولحام رقائق BGA ومعالجات الطاقة PMIC',
        'استخراج البيانات المباشر من شرائح الذاكرة NAND للأجهزة الميتة',
        'فحص التماس الكهربائي عبر الكاميرات الحرارية بالأشعة تحت الحمراء',
        'سياسة صارمة لحماية الخصوصية ومنع فقدان البيانات'
      ],
      link: '/logic-board-repair',
      ctaTextEn: 'Book Micro-Level Fix',
      ctaTextAr: 'طلب فحص المجهر المتقدم'
    }
  ];

  const filteredBlocks = activeFilter === 'all' 
    ? blocks 
    : blocks.filter(b => b.id === activeFilter);

  return (
    <section 
      id="core-specialties" 
      className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/90 transition-colors duration-300 relative overflow-hidden"
      aria-labelledby="specialty-blocks-heading"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-specialties" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-specialties)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>{isAr ? '5 قطاعات تخصصية معتمدة لعام 2026' : 'Our 5 Core Technical Specialties'}</span>
          </div>

          <h2 
            id="specialty-blocks-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue dark:text-white tracking-tight leading-tight mb-4"
          >
            {isAr 
              ? 'صيانة معتمدة لـ 5 مجالات تقنية متكاملة بالشارقة' 
              : 'Sharjah’s Premier 5-Discipline Repair Center'}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'سواء كنت بحاجة إلى تصليح هاتف ذكي، صيانة طابعة مكتبية، ترقية لابتوب، استبدال شاشة كمبيوتر، أو لحام مجهري دقيق—نقدم لك حلولاً فورية بقطع أصلية وضمان معتمد.'
              : 'Direct chip-level engineering across mobile smartphones, laser/inkjet printers, laptops, precision screen replacements, and micro-soldering. Engineered for speed, genuine components, and honest pricing.'}
          </p>

          {/* Quick Filter Tabs for Mobile & Desktop */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                activeFilter === 'all'
                  ? 'bg-brand-blue text-white shadow-brand-blue/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {isAr ? 'الكل (5 تخصصات)' : 'All 5 Disciplines'}
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                activeFilter === 'mobile'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              {isAr ? 'الهواتف' : 'Mobile'}
            </button>
            <button
              onClick={() => setActiveFilter('printer')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                activeFilter === 'printer'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              {isAr ? 'الطابعات' : 'Printers'}
            </button>
            <button
              onClick={() => setActiveFilter('laptop')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                activeFilter === 'laptop'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              {isAr ? 'اللابتوب' : 'Laptops'}
            </button>
            <button
              onClick={() => setActiveFilter('screen')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                activeFilter === 'screen'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              {isAr ? 'شاشات اللابتوب' : 'Laptop Screens'}
            </button>
            <button
              onClick={() => setActiveFilter('chip')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                activeFilter === 'chip'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              {isAr ? 'اللحام المجهري والبيانات' : 'Micro-Soldering'}
            </button>
          </div>
        </div>

        {/* 5 Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <motion.article
                  key={block.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Header Top Strip */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-slate-100 dark:border-slate-700/60 relative">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${block.accentColor} flex items-center justify-center text-white shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                            {block.tag}
                          </span>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {block.categoryEn}
                          </div>
                        </div>
                      </div>

                      {/* Turnaround Badge */}
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${block.lightBg}`}>
                        <Clock className="w-3 h-3" />
                        {isAr ? block.turnaroundAr : block.turnaroundEn}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors leading-snug">
                      {isAr ? block.titleAr : block.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                      {isAr ? block.descAr : block.descEn}
                    </p>
                  </div>

                  {/* Highlights & Features */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{isAr ? 'أبرز الإصلاحات المتوفرة' : 'Key Capabilities & Inclusions'}</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(isAr ? block.featuresAr : block.featuresEn).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & Warranty Bar */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-6 sm:p-7 rounded-b-3xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold block">
                            {isAr ? 'التكلفة المقدرة' : 'Starting Price'}
                          </span>
                          <span className="text-lg font-black text-brand-blue dark:text-brand-orange">
                            {isAr ? block.priceAr : block.priceEn}
                          </span>
                        </div>
                        <div className="text-end">
                          <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold block">
                            {isAr ? 'الضمان' : 'Protection'}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 justify-end">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {isAr ? block.warrantyAr : block.warrantyEn}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => onBookNow(block.titleEn)}
                          className="w-full py-2.5 px-3 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-orange-900/20 flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{isAr ? block.ctaTextAr : block.ctaTextEn}</span>
                        </button>

                        <Link
                          to={block.link}
                          className="w-full py-2.5 px-3 bg-slate-200/70 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 group/btn"
                        >
                          <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Local Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-brand-blue to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                {isAr ? 'هل تحتاج إلى فحص أولي لجهازك؟' : 'Need a Free In-Person Diagnostic in Sharjah?'}
              </h4>
              <p className="text-xs sm:text-sm text-blue-100/80">
                {isAr 
                  ? 'تفضل بزيارة ورشتنا في مويلح التجارية أو اطلب خدمة الاستلام من باب المنزل.' 
                  : 'Visit our workshop near Fire Station Road, Muwaileh Commercial, or request free pickup anywhere in Sharjah.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20would%20like%20to%20inquire%20about%20repairs."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm text-center shadow-lg transition-all"
            >
              WhatsApp Us (+971 50 711 7043)
            </a>
            <button
              onClick={() => onBookNow('Free Inspection')}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm text-center border border-white/20 transition-all"
            >
              Book Inspection
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
