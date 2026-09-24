import React, { useState } from 'react';
import { Plane, Truck, ShieldCheck, ArrowRight, Globe, CheckCircle2, MessageCircle, Phone, PackageCheck, Wrench, Laptop, Cpu, HardDrive } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface GCCRegionalSectionProps {
  onBookNow?: (serviceName?: string) => void;
}

interface CountryData {
  id: string;
  nameEn: string;
  nameAr: string;
  flag: string;
  currency: string;
  transitTime: string;
  citiesEn: string;
  citiesAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  descriptionEn: string;
  descriptionAr: string;
}

const targetCountries: CountryData[] = [
  {
    id: 'saudi',
    nameEn: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currency: 'SAR / AED',
    transitTime: '2-3 Business Days',
    citiesEn: 'Riyadh, Jeddah, Dammam, Khobar, Makkah, Madinah',
    citiesAr: 'الرياض، جدة، الدمام، الخبر، مكة المكرمة، المدينة المنورة',
    keywordsEn: [
      'Mail-in iPhone repair UAE from Saudi Arabia',
      'MacBook logic board repair Riyadh Jeddah to Sharjah',
      'Forensic data recovery UAE for KSA clients',
      'Wholesale refurbished iPhones & laptops Sharjah to Saudi Arabia',
      'Micro-soldering lab UAE for Saudi clients'
    ],
    keywordsAr: [
      'تصليح ايفون شحن للشارقة الامارات من السعودية',
      'صيانة ماك بوك دقيقة شحن للشارقة الرياض جدة',
      'صيانة ماذربورد وايسي لابتوب في الامارات لعملاء السعودية',
      'استعادة بيانات الهواتف المعطوبة شحن للشارقة',
      'تجارة جوالات جملة ومستعملة من الشارقة للسعودية'
    ],
    descriptionEn: 'Daily express courier processing from Riyadh, Jeddah & Eastern Province for high-end MacBook logic boards, crushed iPhones, and B2B wholesale electronics supply.',
    descriptionAr: 'خدمة شحن واستلام سريعة يومياً من الرياض وجدة والمنطقة الشرقية لصيانة بوردات الماك بوك الدقيقة، الايفون المعطوب، واستيراد الأجهزة بالجملة.'
  },
  {
    id: 'oman',
    nameEn: 'Oman & Muscat',
    nameAr: 'سلطنة عُمان ومسقط',
    flag: '🇴🇲',
    currency: 'OMR / AED',
    transitTime: '1-2 Business Days',
    citiesEn: 'Muscat, Salalah, Sohar, Nizwa',
    citiesAr: 'مسقط، صلالة، صحار، نزوى',
    keywordsEn: [
      'Phone and laptop repair shipping Oman Muscat to Sharjah UAE',
      'Oman Muscat mail-in mobile repair UAE',
      'Logic board repair Sharjah for Oman customers',
      'Wholesale computers & gadgets Sharjah to Muscat Oman',
      'Data recovery hard drive Oman to UAE lab'
    ],
    keywordsAr: [
      'تصليح هواتف ولابتوبات شحن من مسقط الى الشارقة الامارات',
      'صيانة ماك بوك وبوردات دقيقة عمان مسقط الشارقة',
      'استعادة بيانات الهاردسك والميموري التالف من عمان للشارقة',
      'تجارة هواتف ولابتوبات جملة من الامارات الى مسقط وعمان',
      'قطع غيار وشاشات اصلية شحن من الشارقة الى سلطنة عمان'
    ],
    descriptionEn: 'Fast overland and express air shipping connection between Muscat/Sohar and our Sharjah lab. 24-48h turnaround for micro-soldering and device batch orders.',
    descriptionAr: 'ربط بري وجوي فائق السرعة بين مسقط وصحار ومختبرنا بالشارقة. إنجاز خلال 24 إلى 48 ساعة لأصعب أعطال المذربورد وشحنات الجملة.'
  },
  {
    id: 'bahrain',
    nameEn: 'Bahrain',
    nameAr: 'مملكة البحرين',
    flag: '🇧🇭',
    currency: 'BHD / AED',
    transitTime: '2-3 Business Days',
    citiesEn: 'Manama, Riffa, Muharraq',
    citiesAr: 'المنامة، الرفاع، المحرق',
    keywordsEn: [
      'Bahrain to Sharjah UAE mail-in device repair',
      'Wholesale iPhone and laptop trading Sharjah to Bahrain',
      'MacBook liquid damage micro-repair Bahrain to UAE',
      'Emergency data recovery Sharjah for Bahrain businesses',
      'Component-level logic board fix UAE for Bahrain'
    ],
    keywordsAr: [
      'تصليح ايفون وماك بوك شحن من البحرين الى الشارقة',
      'صيانة لحام ميكروسكوبي وبوردات في الامارات لعملاء البحرين',
      'تجارة اجهزة وهواتف جملة الشارقة المنامة البحرين',
      'استرجاع البيانات المحذوفة والتالفة البحرين الشارقة',
      'صيانة اجهزة ابل وسامسونج شحن جوي سريع الى الشارقة'
    ],
    descriptionEn: 'Direct courier handling from Manama with certified technical diagnostic reports and full insurance on all dispatched devices.',
    descriptionAr: 'استلام مباشر من المنامة عبر البريد السريع مع تقارير فحص تقنية وتأمين شامل على جميع الأجهزة المشحونة لمختبرنا بالشارقة.'
  },
  {
    id: 'turkey',
    nameEn: 'Turkey (Türkiye)',
    nameAr: 'الجمهورية التركية (تركيا)',
    flag: '🇹🇷',
    currency: 'USD / AED / TRY',
    transitTime: '3-4 Business Days',
    citiesEn: 'Istanbul, Ankara, Izmir, Antalya',
    citiesAr: 'إسطنبول، أنقرة، إزمير، أنطاليا',
    keywordsEn: [
      'UAE Sharjah to Turkey electronics wholesale trading',
      'Motherboard logic board repair Sharjah mail-in Turkey Istanbul',
      'Refurbished laptops & phones exporter Sharjah to Türkiye',
      'Apple MacBook chip-level repair UAE for Turkish clients',
      'BAE Şarika anakart tamiri ve toptan telefon ticareti Türkiye'
    ],
    keywordsAr: [
      'تجارة اجهزة والكترونيات جملة من الشارقة الامارات الى تركيا اسطنبول',
      'صيانة مذربورد ولابتوب دقيقة في الشارقة لعملاء تركيا',
      'استيراد جوالات وقطع غيار من الامارات الى تركيا',
      'صيانة اجهزة ذكية وشحن دولي بين تركيا والشارقة',
      'مركز صيانة بوردات الشارقة تركيا'
    ],
    descriptionEn: 'Strategic bridge between Sharjah electronics trading hub and Turkish tech businesses for bulk pre-owned devices, original spare parts, and complex micro-soldering.',
    descriptionAr: 'جسر تجاري وتقني بين سوق الشارقة للإلكترونيات وقطاع التقنية في تركيا لتصدير الأجهزة المجددة، قطع الغيار، والصيانة الدقيقة للبوردات.'
  },
  {
    id: 'kuwait-qatar',
    nameEn: 'Kuwait & Qatar',
    nameAr: 'الكويت وقطر',
    flag: '🇰🇼 🇶🇦',
    currency: 'KWD / QAR / AED',
    transitTime: '2-3 Business Days',
    citiesEn: 'Kuwait City, Doha, Al Rayyan, Hawally',
    citiesAr: 'مدينة الكويت، الدوحة، حولي، الريان',
    keywordsEn: [
      'Kuwait & Qatar mail-in repair to Sharjah UAE',
      'Wholesale electronics trading Sharjah to Kuwait and Qatar',
      'MacBook M1/M2/M3 board repair UAE for Kuwait clients',
      'Forensic data recovery Doha to Sharjah lab',
      'High-end smartphone micro-soldering GCC express'
    ],
    keywordsAr: [
      'صيانة اجهزة دقيقة شحن من الكويت وقطر الى الشارقة الامارات',
      'تصليح بوردات ماك بوك وايفون الكويت الدوحة الشارقة',
      'استيراد اجهزة مستعملة ومجددة جملة من الشارقة للكويت وقطر',
      'استعادة بيانات من اجهزة تالفة شحن من قطر والكويت الى الشارقة',
      'مركز صيانة الكترونيات معتمد في الشارقة لعملاء الكويت وقطر'
    ],
    descriptionEn: 'Seamless courier services from Kuwait City and Doha directly to our Sharjah industrial lab with full digital tracking and video repair documentation.',
    descriptionAr: 'خدمة شحن سريعة من الكويت والدوحة مباشرة إلى مختبرنا بالشارقة مع تتبع رقمي وتوثيق مصور لمراحل الصيانة بالفيديو.'
  }
];

export default function GCCRegionalSection({ onBookNow }: GCCRegionalSectionProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedCountry, setSelectedCountry] = useState<string>('saudi');

  const active = targetCountries.find(c => c.id === selectedCountry) || targetCountries[0];

  const handleWhatsApp = (countryName: string) => {
    const text = encodeURIComponent(
      `Hello Al Sharq Mobile Lab Sharjah. I am contacting you from ${countryName} regarding Mail-in Device Repair / Wholesale Trading in Sharjah.`
    );
    window.open(`https://wa.me/971507117043?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/70 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-4">
            <Globe className="w-4 h-4" />
            <span>{isAr ? 'مركز معتمد لجميع دول الخليج والمنطقة' : 'GCC & Regional Tech Hub from Sharjah, UAE'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
            {isAr ? (
              <>خدمات الصيانة بالبريد وتجارة الأجهزة إلى <span className="text-brand-orange">السعودية، عمان، البحرين، الكويت، قطر وتركيا</span></>
            ) : (
              <>Mail-In Repairs & Wholesale Tech to <span className="text-brand-orange">Saudi Arabia, Oman, Bahrain, Kuwait, Qatar & Turkey</span></>
            )}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'مختبر الشرق في مويلح - الشارقة يستقبل يومياً أجهزة العملاء عبر الشحن السريع (DHL / Aramex / FedEx) من السعودية وعمان ومسقط والبحرين وتركيا والكويت وقطر لصيانة المذربورد الميكروسكوبية، استعادة البيانات المستحيلة، وتصدير الأجهزة المجددة والجملة.'
              : 'Al Sharq Mobile Lab in Muwaileh, Sharjah receives devices daily via express couriers (DHL / Aramex / FedEx) from across Saudi Arabia, Oman, Bahrain, Turkey, Kuwait, and Qatar for component-level logic board repairs, forensic data recovery, and B2B wholesale electronics.'}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                {isAr ? 'صيانة بوردات دقيقة (Micro-Soldering)' : 'Chip-Level Logic Board Lab'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr 
                  ? 'إصلاح معالجات A20/A18، شرائح Apple Silicon M1-M4، مشاكل الشحن، وتلف السوائل التي تعجز عنها ورش الصيانة المحلية.'
                  : 'Component-level fixes for Apple M1-M4 chips, power ICs, liquid damage, and CPU reballing when local shops say irreparable.'}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                {isAr ? 'استعادة البيانات الجنائية' : 'Forensic Data Recovery'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr 
                  ? 'استخراج البيانات مباشرة من رقائق NAND للأجهزة المحطمة أو الغارقة بالماء مع الحفاظ التام على الخصوصية ومبدأ "لا استعادة = لا رسوم".'
                  : 'Direct NAND chip-off extraction for dead or crushed phones & SSDs across the GCC with strict data sanctity and no-recovery no-fee.'}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                {isAr ? 'تجارة وتصدير إلكترونيات جملة' : 'B2B Wholesale & Pre-Owned Export'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr 
                  ? 'توريد هواتف آيفون وسامسونج ولابتوبات مجددة أصلية وقطع غيار من سوق الشارقة مباشرة إلى المتاجر في السعودية وعمان والبحرين وتركيا.'
                  : 'Certified Grade A+ pre-owned iPhones, MacBooks, laptops & genuine spare parts shipped from Sharjah to retailers in KSA, Oman, Bahrain & Turkey.'}
              </p>
            </div>
          </div>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {targetCountries.map((c) => {
            const isSelected = c.id === selectedCountry;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="text-xl">{c.flag}</span>
                <span>{isAr ? c.nameAr : c.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Country Detail Box */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{active.flag}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {isAr ? active.nameAr : active.nameEn}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
                {isAr ? active.descriptionAr : active.descriptionEn}
              </p>

              {/* Transit & Cities meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">
                    {isAr ? 'المدن والمناطق المغطاة' : 'Covered Hubs & Cities'}
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {isAr ? active.citiesAr : active.citiesEn}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">
                    {isAr ? 'مدة الشحن السريع إلى الشارقة' : 'Courier Transit Time'}
                  </div>
                  <div className="text-sm font-bold text-brand-orange flex items-center gap-1.5">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>{active.transitTime} ({active.currency})</span>
                  </div>
                </div>
              </div>

              {/* Key Search Keywords / Services */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {isAr ? 'الخدمات المتاحة لهذا البلد / الكلمات الرئيسية' : 'Key Services & Target Inquiries'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(isAr ? active.keywordsAr : active.keywordsEn).map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-brand-blue/5 dark:bg-blue-900/20 text-brand-blue dark:text-blue-300 text-xs font-medium rounded-lg border border-brand-blue/10 dark:border-blue-800/30"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleWhatsApp(isAr ? active.nameAr : active.nameEn)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{isAr ? 'استفسار واتساب للشحن والصيانة' : 'WhatsApp Regional Inquiry'}</span>
                </button>

                <Link
                  to="/gcc-services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-gray-900 dark:text-white font-bold rounded-xl transition-all text-sm sm:text-base"
                >
                  <span>{isAr ? 'تفاصيل الشحن والأسعار' : 'Full Shipping & Transit Guide'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Card / Step Checklist */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 dark:from-slate-900 dark:to-slate-800 p-6 sm:p-8 rounded-2xl border border-brand-blue/10 dark:border-slate-700">
              <h4 className="font-extrabold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span>{isAr ? 'كيف ترسل جهازك إلى مختبرنا بالشارقة؟' : 'How Mail-In Repair Works'}</span>
              </h4>

              <ol className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{isAr ? 'استشارة وتشخيص مبدئي مجاني:' : 'Free Diagnosis on WhatsApp:'}</strong>
                    {isAr ? 'أرسل لنا صور أو فيديو للعطل ونعطيك تقدير التكلفة والإمكانية قبل الشحن.' : 'Send symptoms & photos to +971507117043 for an instant quotation and feasibility check.'}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{isAr ? 'شحن الجهاز إلى الشارقة:' : 'Secure Courier Shipment:'}</strong>
                    {isAr ? 'قم بتغليف الجهاز وارساله عبر DHL أو Aramex أو FedEx إلى عنوان مختبرنا في مويلح، الشارقة.' : 'Pack your device safely and dispatch via DHL/Aramex/FedEx with our registered lab address.'}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{isAr ? 'إصلاح ميكروسكوبي وتوثيق بالفيديو:' : 'Microscope Repair & Video Verification:'}</strong>
                    {isAr ? 'يقوم مهندسونا بإصلاح البورد أو استعادة البيانات مع توثيق بالفيديو وإرساله لك.' : 'Our master technicians perform component repair under microscope and send video proof.'}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{isAr ? 'شحن العودة وضمان 90 يوماً:' : 'Return Shipping & 90-Day Warranty:'}</strong>
                    {isAr ? 'يتم إعادة الجهاز لعنوانك في السعودية أو عمان أو البحرين أو تركيا مع ضمان رسمي.' : 'Device is safely couriered back to your doorstep with full tracking and a 90-day guarantee.'}
                  </div>
                </li>
              </ol>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isAr ? 'العنوان: مويلح، الشارقة، الإمارات' : 'Sharjah Lab, UAE'}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {isAr ? 'استلام يومي مؤكد' : 'Daily Inward Dispatches'}
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
