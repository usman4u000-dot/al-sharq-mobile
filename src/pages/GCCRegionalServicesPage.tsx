import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Globe, Plane, Truck, ShieldCheck, CheckCircle2, Phone, MessageCircle, MapPin, Calculator, Package, AlertCircle, Cpu, HardDrive, Laptop, Smartphone, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ShippingLogistics from '../components/ShippingLogistics';
import GCCPriceComparison from '../components/GCCPriceComparison';
import MailInPassGenerator from '../components/MailInPassGenerator';

interface GCCRegionalServicesPageProps {
  onBookNow?: (serviceName?: string) => void;
}

interface ShippingEstimate {
  country: string;
  flag: string;
  deviceType: string;
  approxShippingCostAED: string;
  approxRepairRangeAED: string;
  estimatedDays: string;
}

export default function GCCRegionalServicesPage({ onBookNow }: GCCRegionalServicesPageProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedCountryCalc, setSelectedCountryCalc] = useState('saudi');
  const [selectedDeviceCalc, setSelectedDeviceCalc] = useState('macbook');

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://allsharq.com/gcc-services#service",
        "name": "GCC & Middle East Mail-In Device Repair & Wholesale Electronics",
        "serviceType": "Electronics Repair & Wholesale Export",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC",
          "url": "https://allsharq.com",
          "telephone": "+971507117043",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
            "addressLocality": "Muwaileh, Sharjah",
            "addressRegion": "Sharjah",
            "postalCode": "00000",
            "addressCountry": "AE"
          }
        },
        "areaServed": [
          { "@type": "Country", "name": "Saudi Arabia" },
          { "@type": "Country", "name": "Oman" },
          { "@type": "Country", "name": "Bahrain" },
          { "@type": "Country", "name": "Turkey" },
          { "@type": "Country", "name": "Kuwait" },
          { "@type": "Country", "name": "Qatar" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "description": "Cross-border mail-in technical repair for iPhone, MacBook logic boards, and data recovery from Saudi Arabia, Oman, Bahrain, Kuwait, Qatar, and Turkey to Sharjah UAE."
      },
      {
        "@type": "FAQPage",
        "@id": "https://allsharq.com/gcc-services#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I send my broken iPhone or MacBook from Saudi Arabia or Oman to Sharjah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can safely courier your device using DHL, FedEx, or Aramex directly to Al Sharq Mobile Lab in Muwaileh, Sharjah. Contact our WhatsApp at +971507117043 first for free diagnosis, quote, and shipping instructions."
            }
          },
          {
            "@type": "Question",
            "name": "What payment methods are accepted for clients in Saudi Arabia, Oman, Bahrain, and Turkey?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We accept GCC bank transfers, international credit/debit cards (Visa, MasterCard), Apple Pay, Tabby/Tamara where applicable, and international wire transfers in SAR, OMR, BHD, USD, or AED."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer wholesale device export from Sharjah to GCC and Turkey?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Al Sharq Mobile supplies certified Grade A+ pre-owned iPhones, refurbished laptops, and logic board IC spare parts in bulk with official invoices and commercial export documentation to GCC countries and Turkey."
            }
          }
        ]
      }
    ]
  };

  const handleWhatsApp = (topic: string) => {
    const text = encodeURIComponent(
      `Hello Al Sharq Sharjah Lab. I am inquiring about: ${topic}. My country is ${selectedCountryCalc.toUpperCase()}.`
    );
    window.open(`https://wa.me/971507117043?text=${text}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>
          {isAr
            ? 'صيانة وتجارة الهواتف والماك بوك للخليج والسعودية وعمان والبحرين وتركيا | الشارقة موبايل'
            : 'GCC & Regional Tech Hub Sharjah | Saudi Arabia, Oman, Bahrain, Turkey Mail-In Repair & Wholesale | Al Sharq'}
        </title>
        <meta
          name="description"
          content={
            isAr
              ? 'مختبر الصيانة المتقدم وتجارة الإلكترونيات بالشارقة لعملاء السعودية، عمان، مسقط، البحرين، الكويت، قطر وتركيا. صيانة بوردات، استعادة بيانات، وتصدير جملة عبر البريد السريع.'
              : 'Premier mail-in iPhone & MacBook logic board repair lab and wholesale electronics exporter in Sharjah, UAE. Fast courier dispatch from Saudi Arabia, Oman, Bahrain, Kuwait, Qatar & Turkey.'
          }
        />
        <meta
          name="keywords"
          content="تصليح ايفون شحن للشارقة الامارات من السعودية, صيانة ماك بوك دقيقة شحن للشارقة الرياض جدة, صيانة هواتف شحن من مسقط الى الشارقة, صيانة اجهزة البحرين الشارقة, تجارة جوالات جملة الشارقة السعودية عمان, استيراد الكترونيات من الشارقة الى تركيا, استعادة بيانات شحن للشارقة, Saudi Arabia mail-in phone repair UAE, MacBook logic board repair Riyadh Jeddah to Sharjah, Oman Muscat phone repair UAE, Bahrain mail-in device repair Sharjah, Turkey electronics wholesale exporter Sharjah, Kuwait Qatar mail-in repair UAE, GCC micro-soldering center Sharjah"
        />
        <link rel="canonical" href="https://allsharq.com/gcc-services" />
        <meta property="og:title" content="GCC & Regional Tech Hub Sharjah | Saudi Arabia, Oman, Bahrain, Turkey" />
        <meta property="og:description" content="Mail-in micro-soldering, forensic data recovery, and B2B wholesale electronics supply from Sharjah, UAE to GCC and Turkey." />
        <meta property="og:url" content="https://allsharq.com/gcc-services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 bg-gradient-to-br from-brand-blue via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-orange text-sm font-bold mb-6 backdrop-blur-md">
            <Globe className="w-4 h-4" />
            <span>{isAr ? 'خدمات دول الخليج العربي والشرق الأوسط' : 'GCC & Middle East Cross-Border Technical Lab'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 max-w-4xl">
            {isAr ? (
              <>مختبر الشارقة المتخصص لعملاء <span className="text-brand-orange">السعودية، عمان، البحرين، الكويت، قطر وتركيا</span></>
            ) : (
              <>Sharjah’s Premier Lab for <span className="text-brand-orange">Saudi Arabia, Oman, Bahrain, Kuwait, Qatar & Turkey</span></>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {isAr
              ? 'هل واجهت عطلاً معقداً في مذربورد الماك بوك أو الآيفون ولم تجد حلاً في مدينتك؟ أو تبحث عن مورد موثوق للأجهزة المجددة وقطع الغيار الأصلية من سوق الشارقة؟ نحن نوفر لك خدمة الشحن المباشر والفحص الميكروسكوبي مع ضمان معتمد.'
              : 'Facing a complex MacBook logic board failure, unrecoverable data on a crushed phone, or sourcing certified wholesale electronics from the UAE? Al Sharq Mobile Lab provides insured mail-in repairs and bulk export with transparent pricing and video documentation.'}
          </p>

          {/* Quick country flags banner */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 pb-6 border-t border-white/10 text-sm font-semibold text-slate-300">
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇸🇦</span> {isAr ? 'السعودية (الرياض، جدة)' : 'Saudi Arabia'}</span>
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇴🇲</span> {isAr ? 'عُمان (مسقط، صلالة)' : 'Oman (Muscat)'}</span>
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇧🇭</span> {isAr ? 'البحرين (المنامة)' : 'Bahrain'}</span>
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇹🇷</span> {isAr ? 'تركيا (إسطنبول)' : 'Turkey (Istanbul)'}</span>
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇰🇼</span> {isAr ? 'الكويت' : 'Kuwait'}</span>
            <span className="flex items-center gap-1.5"><span className="text-2xl">🇶🇦</span> {isAr ? 'قطر (الدوحة)' : 'Qatar'}</span>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => handleWhatsApp('General Mail-in Consultation')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 transition-all text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isAr ? 'استشارة مجانية عبر واتساب (+971 50 711 7043)' : 'Free WhatsApp Consultation (+971 50 711 7043)'}</span>
            </button>
            <a
              href="#shipping-guide"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-sm transition-all text-base border border-white/15"
            >
              <Package className="w-5 h-5" />
              <span>{isAr ? 'خطوات إرسال وتغليف الجهاز' : 'How to Ship Your Device'}</span>
            </a>
          </div>

        </div>
      </section>

      {/* Target Country Cards Grid */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {isAr ? 'خدماتنا المخصصة لكل دولة' : 'Tailored Solutions by Country'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              {isAr
                ? 'استمتع بخدمات صيانة بمستوى الوكالة وأسعار سوق الشارقة التنافسية مع شحن سريع وتخليص جمركي سهل.'
                : 'Take advantage of component-level technical mastery and UAE wholesale prices with reliable courier handling.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Saudi Arabia Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇸🇦</span>
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-full">
                    {isAr ? '2-3 أيام شحن' : '2-3 Days Courier'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'المملكة العربية السعودية (KSA)' : 'Saudi Arabia (KSA)'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'الرياض • جدة • الدمام • الخبر • مكة • المدينة' : 'Riyadh • Jeddah • Dammam • Khobar • Makkah'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'إصلاح دقيق لبوردات ماك بوك وآبل سيليكون (M1, M2, M3, M4)، استبدال معالجات آيفون 15/16/18، واستعادة بيانات الأجهزة التالفة بعد رفضها في ورش الصيانة المحلية.'
                    : 'Specialized logic board micro-soldering for Apple M-series chips, iPhone CPU repairs, dead phone NAND recovery, and wholesale electronics export.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'شحن عبر DHL / Aramex / SMSA' : 'DHL / Aramex Express Door-to-Door'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالريال السعودي أو التحويل البنكي' : 'Payment in SAR, AED or Credit Card'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Saudi Arabia Mail-in Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من السعودية' : 'Connect from Saudi Arabia'}</span>
              </button>
            </div>

            {/* Oman & Muscat Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇴🇲</span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full">
                    {isAr ? '1-2 أيام شحن بري وجوي' : '1-2 Days Express'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'سلطنة عُمان ومسقط' : 'Oman & Muscat'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'مسقط • صلالة • صحار • نزوى' : 'Muscat • Salalah • Sohar • Nizwa'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'أسرع خط ربط بري وجوي بين مسقط ومختبرنا بالشارقة. استقبال أجهزة اللابتوب والماك بوك والهواتف الذكية مع تسليم في وقت قياسي وتوريد قطع الغيار بالجملة.'
                    : 'Fastest overland and air connection between Muscat and Sharjah. Same-week turnaround on complex logic board diagnostics and bulk hardware orders.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'شحن بري سريع يومي عبر خط الشارقة-مسقط' : 'Daily direct cargo & courier'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالريال العماني أو الدرهم' : 'Payment in OMR or AED'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Oman Muscat Mail-in Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من عُمان ومسقط' : 'Connect from Oman / Muscat'}</span>
              </button>
            </div>

            {/* Bahrain Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇧🇭</span>
                  <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue dark:text-blue-400 font-bold text-xs rounded-full">
                    {isAr ? '2-3 أيام شحن' : '2-3 Days Courier'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'مملكة البحرين' : 'Kingdom of Bahrain'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'المنامة • الرفاع • المحرق • مدينة عيسى' : 'Manama • Riffa • Muharraq'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'إصلاح الهواتف المحترقة أو المتضررة من السوائل، لحام دقيق لشرائح الطاقة والشحن، واستعادة البيانات للشركات والأفراد بالمنامة مع توثيق بالفيديو.'
                    : 'Liquid corrosion cleanup, power IC replacements, and corporate forensic data recovery dispatched seamlessly from Manama to our Sharjah laboratory.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'تأمين كامل على الأجهزة أثناء النقل' : 'Fully insured return air courier'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالدينار البحريني أو البطاقة' : 'Payment in BHD or Card'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Bahrain Mail-in Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من البحرين' : 'Connect from Bahrain'}</span>
              </button>
            </div>

            {/* Turkey (Türkiye) Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇹🇷</span>
                  <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs rounded-full">
                    {isAr ? '3-4 أيام شحن جوي' : '3-4 Days Air Cargo'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'الجمهورية التركية (Türkiye)' : 'Turkey (Türkiye)'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'إسطنبول • أنقرة • إزمير • أنطاليا' : 'Istanbul • Ankara • Izmir • Antalya'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'مركز تجاري وتقني رئيسي لتصدير الأجهزة المجددة والهواتف الذكية بالجملة من الشارقة إلى تركيا، بالإضافة إلى إصلاح المذربورد المعقدة للورش والمتاجر التركية.'
                    : 'B2B electronics bridge between Sharjah and Turkish markets: certified wholesale refurbished phones, laptops, logic board micro-soldering, and original IC components.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'فواتير تجارية رسمية وتوثيق جمركي' : 'Commercial invoices & export docs'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالدولار أو اليورو أو الليرة' : 'USD, EUR, TRY & AED accepted'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Turkey Wholesale & Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من تركيا' : 'Connect from Turkey'}</span>
              </button>
            </div>

            {/* Kuwait Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇰🇼</span>
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-full">
                    {isAr ? '2-3 أيام شحن' : '2-3 Days Courier'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'دولة الكويت' : 'Kuwait'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'مدينة الكويت • حولي • الفروانية • السالمية' : 'Kuwait City • Hawally • Salmiya'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'صيانة الماك بوك الميت وأجهزة الألعاب التالفة، وإصلاح انحناء الهيكل وشاشات سامسونج فولد القابلة للطي، مع استيراد الهواتف المستعملة بالجملة.'
                    : 'Dead MacBook restoration, Samsung Galaxy Z Fold hinge & screen repairs, and bulk refurbished iPhones dispatched from Sharjah to Kuwait.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'استلام وتسليم حتى باب المنزل' : 'Doorstep courier pickup & delivery'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالدينار الكويتي أو البطاقة' : 'Payment in KWD or Card'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Kuwait Mail-in Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من الكويت' : 'Connect from Kuwait'}</span>
              </button>
            </div>

            {/* Qatar Card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🇶🇦</span>
                  <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue dark:text-blue-400 font-bold text-xs rounded-full">
                    {isAr ? '2-3 أيام شحن' : '2-3 Days Courier'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAr ? 'دولة قطر' : 'Qatar'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-4">
                  {isAr ? 'الدوحة • الريان • الوكرة • الخور' : 'Doha • Al Rayyan • Al Wakrah'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {isAr
                    ? 'إصلاح أعطال اللوحة الأم المستعصية واستعادة البيانات من أجهزة اللابتوب والهواتف للشركات والجهات الحكومية والأفراد في قطر عبر شحن جوي سريع للشارقة.'
                    : 'Mission-critical enterprise data recovery, MacBook board micro-soldering, and certified pre-owned Apple hardware delivery to Doha.'}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'سرية بيانات فائقة وضمان كتابي' : 'NDA data security & 90-day warranty'}</span>
                  </div>
                  <div className="text-xs text-brand-blue dark:text-blue-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'دفع بالريال القطري أو الدرهم' : 'Payment in QAR or AED'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Qatar Mail-in Repair')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تواصل معنا من قطر' : 'Connect from Qatar'}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive GCC & Regional Shipping & Currency Cost Estimator */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-full uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>{isAr ? 'حاسبة التكلفة والعملة والشحن التقديرية' : 'Interactive Regional Cost & Currency Estimator'}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 mb-3">
              {isAr ? 'احسب تكلفة الإصلاح والشحن بعملة بلدك' : 'Estimate Repair & Courier Shipping in Your Currency'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {isAr
                ? 'اختر بلدك ونوع الجهاز لمعرفة التكلفة التقريبية بالريال السعودي، العماني، القطري، الدينار البحريني، الكويتي، أو الدولار الأمريكي.'
                : 'Select your country and device to see transparent estimates in SAR, OMR, BHD, KWD, QAR, or USD with courier turnaround.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Country Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  {isAr ? '1. اختر بلد الإرسال:' : '1. Select Your Country:'}
                </label>
                <select
                  value={selectedCountryCalc}
                  onChange={(e) => setSelectedCountryCalc(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                >
                  <option value="saudi">🇸🇦 Saudi Arabia (المملكة العربية السعودية - SAR)</option>
                  <option value="oman">🇴🇲 Oman & Muscat (سلطنة عمان ومسقط - OMR)</option>
                  <option value="bahrain">🇧🇭 Bahrain (مملكة البحرين - BHD)</option>
                  <option value="turkey">🇹🇷 Turkey / Türkiye (الجمهورية التركية - USD/TRY)</option>
                  <option value="kuwait">🇰🇼 Kuwait (دولة الكويت - KWD)</option>
                  <option value="qatar">🇶🇦 Qatar (دولة قطر - QAR)</option>
                </select>
              </div>

              {/* Device / Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  {isAr ? '2. اختر نوع الجهاز والعطل:' : '2. Select Device & Issue:'}
                </label>
                <select
                  value={selectedDeviceCalc}
                  onChange={(e) => setSelectedDeviceCalc(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                >
                  <option value="macbook">💻 MacBook Logic Board Micro-Soldering (M1-M4 / Intel)</option>
                  <option value="iphone">📱 iPhone Motherboard / CPU Reballing / Power IC</option>
                  <option value="data-recovery">💾 Forensic Data Recovery (Dead Phone / Burnt SSD)</option>
                  <option value="foldable">📱 Samsung Galaxy Z Fold / Flip Hinge & AMOLED</option>
                  <option value="b2b">📦 B2B Wholesale Pre-Owned Batch Order (10+ Units)</option>
                </select>
              </div>

            </div>

            {/* Calculated Breakdown Card */}
            {(() => {
              const countryRates: Record<string, { code: string; rate: number; courierAED: number; days: string }> = {
                saudi: { code: 'SAR', rate: 1.02, courierAED: 140, days: '2-3 Business Days' },
                oman: { code: 'OMR', rate: 0.105, courierAED: 110, days: '1-2 Business Days' },
                bahrain: { code: 'BHD', rate: 0.103, courierAED: 140, days: '2-3 Business Days' },
                turkey: { code: 'USD', rate: 0.272, courierAED: 240, days: '3-4 Business Days' },
                kuwait: { code: 'KWD', rate: 0.084, courierAED: 150, days: '2-3 Business Days' },
                qatar: { code: 'QAR', rate: 0.99, courierAED: 140, days: '2-3 Business Days' },
              };

              const servicePricing: Record<string, { nameEn: string; nameAr: string; minAED: number; maxAED: number }> = {
                macbook: {
                  nameEn: 'MacBook M1/M2/M3/M4 Logic Board Micro-Soldering',
                  nameAr: 'صيانة مذربورد ماك بوك الدقيقة ورقائق M1-M4',
                  minAED: 450,
                  maxAED: 750,
                },
                iphone: {
                  nameEn: 'iPhone Flagship Motherboard / Power IC / Baseband Repair',
                  nameAr: 'إصلاح بوردة آيفون وشريحة الطاقة والشبكة واللحام الدقيق',
                  minAED: 350,
                  maxAED: 550,
                },
                'data-recovery': {
                  nameEn: 'Forensic NAND Chip-Off Data Recovery (No-Data No-Fee)',
                  nameAr: 'استعادة بيانات جنائية من رقائق الذاكرة (لا بيانات = لا رسوم)',
                  minAED: 400,
                  maxAED: 850,
                },
                foldable: {
                  nameEn: 'Samsung Galaxy Z Fold / Flip Ultra-Thin Glass & Hinge Alignment',
                  nameAr: 'إصلاح شاشات ومفصلات سامسونج فولد وفليب القابلة للطي',
                  minAED: 550,
                  maxAED: 950,
                },
                b2b: {
                  nameEn: 'B2B Wholesale Pre-Owned Batch Inspection & Export',
                  nameAr: 'توريد وتصدير أجهزة جملة ومجددة (أكثر من 10 أجهزة)',
                  minAED: 1200,
                  maxAED: 3500,
                },
              };

              const countryInfo = countryRates[selectedCountryCalc] || countryRates.saudi;
              const serviceInfo = servicePricing[selectedDeviceCalc] || servicePricing.macbook;

              const totalMinAED = serviceInfo.minAED + countryInfo.courierAED;
              const totalMaxAED = serviceInfo.maxAED + countryInfo.courierAED;

              const totalMinLocal = Math.round(totalMinAED * countryInfo.rate);
              const totalMaxLocal = Math.round(totalMaxAED * countryInfo.rate);
              const courierLocal = Math.round(countryInfo.courierAED * countryInfo.rate);

              return (
                <div className="bg-gradient-to-br from-brand-blue/5 via-slate-50 to-brand-orange/5 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl p-6 sm:p-8 border border-brand-blue/15 dark:border-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1">
                        {isAr ? 'تكلفة الصيانة التقريبية بالشارقة' : 'Estimated Repair & Lab Labor'}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                        {serviceInfo.minAED} - {serviceInfo.maxAED} AED
                      </div>
                      <div className="text-xs font-bold text-brand-orange mt-1">
                        ≈ {Math.round(serviceInfo.minAED * countryInfo.rate)} - {Math.round(serviceInfo.maxAED * countryInfo.rate)} {countryInfo.code}
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1">
                        {isAr ? 'الشحن السريع ذهاب وإياب (DHL/Aramex)' : 'Roundtrip Courier (Insured)'}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                        ≈ {countryInfo.courierAED} AED
                      </div>
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        ≈ {courierLocal} {countryInfo.code} ({countryInfo.days})
                      </div>
                    </div>

                    <div className="p-4 bg-brand-orange text-white rounded-xl shadow-lg shadow-orange-500/20">
                      <div className="text-xs text-orange-100 font-semibold mb-1">
                        {isAr ? 'الإجمالي التقديري مع الشحن' : 'Estimated Total (Repair + Shipping)'}
                      </div>
                      <div className="text-xl sm:text-2xl font-black">
                        {totalMinLocal} - {totalMaxLocal} {countryInfo.code}
                      </div>
                      <div className="text-xs text-orange-100 font-medium mt-1">
                        ({totalMinAED} - {totalMaxAED} AED)
                      </div>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {isAr
                        ? '* الأسعار تقديرية وتخضع للفحص الميكروسكوبي النهائي. ينطبق مبدأ "لا إصلاح = لا رسوم صيانة".'
                        : '* Estimates are subject to microscopic inspection. Strict "No Fix, No Fee" policy applies.'}
                    </div>

                    <button
                      onClick={() => {
                        const quoteMsg = `Hello Al Sharq Lab Sharjah. I calculated an estimate from ${selectedCountryCalc.toUpperCase()} for ${serviceInfo.nameEn} (Approx ${totalMinLocal}-${totalMaxLocal} ${countryInfo.code}). Please confirm feasibility and courier details.`;
                        window.open(`https://wa.me/971507117043?text=${encodeURIComponent(quoteMsg)}`, '_blank');
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shrink-0 w-full sm:w-auto justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد التقدير وإرسال الجهاز عبر واتساب' : 'Confirm Estimate on WhatsApp'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* Cross-Border GCC Capitals Courier Shipping Logistics Visualizer */}
      <ShippingLogistics />

      {/* Savings & Price Advantage vs Agency Replacement */}
      <GCCPriceComparison />

      {/* Step by step shipping guide */}
      <section id="shipping-guide" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-full uppercase tracking-wider">
              {isAr ? 'دليل الشحن السريع' : 'Easy 4-Step Process'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 mb-4">
              {isAr ? 'كيف ترسل جهازك إلى مختبرنا في الشارقة؟' : 'How Mail-In Repair to Sharjah Works'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              {isAr
                ? 'إجراءات سهلة وآمنة تضمن سلامة جهازك ومتابعة مستمرة لحظة بلحظة حتى عودته إليك.'
                : 'A seamless, insured process ensuring complete device safety and real-time updates from arrival to return delivery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-brand-orange text-white font-black flex items-center justify-center mb-4 text-base">1</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                {isAr ? '1. فحص وتشخيص واتساب' : '1. WhatsApp Diagnosis'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr
                  ? 'تواصل معنا على +971507117043 مع شرح المشكلة ونوع الجهاز. سنعطيك تقديراً دقيقاً للتكلفة وإمكانية الإصلاح قبل أن تشحن أي شيء.'
                  : 'Message us symptoms, photos or video. Our master technicians provide a transparent repair estimate and feasibility evaluation.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-brand-orange text-white font-black flex items-center justify-center mb-4 text-base">2</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                {isAr ? '2. التغليف والشحن' : '2. Packaging & Courier'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr
                  ? 'قم بلف الجهاز بالفقاعات الواقية وضعه في صندوق كرتوني محكم. اشحنه عبر DHL أو Aramex أو FedEx إلى عنوان مختبرنا في الشارقة، وزودنا برقم التتبع.'
                  : 'Bubble-wrap the device in a sturdy box. Dispatch via DHL/Aramex/FedEx to our Muwaileh Sharjah lab and share the tracking code.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-brand-orange text-white font-black flex items-center justify-center mb-4 text-base">3</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                {isAr ? '3. الإصلاح والتوثيق' : '3. Precision Lab Fix'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr
                  ? 'بمجرد وصول الطرد، يبدأ الفحص الميكروسكوبي وتصوير المشكلة بالفيديو. يتم الإصلاح وتجربة جميع الوظائف بنجاح وإرسال فيديو التشغيل لك.'
                  : 'Upon arrival, our engineers inspect the logic board under microscope, perform micro-soldering, and send video confirmation of the running device.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center mb-4 text-base">4</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                {isAr ? '4. الإعادة مع الضمان' : '4. Return & Guarantee'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {isAr
                  ? 'يتم الدفع عبر الإنترنت أو التحويل، ويشحن الجهاز فوراً إلى عنوانك بالبريد السريع المؤمن مع ضمان رسمي مدة 90 يوماً.'
                  : 'Complete secure online payment, and your device is couriered back to your address with tracking and a full 90-day warranty.'}
              </p>
            </div>

          </div>

          {/* Lab Shipping Address Box */}
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                  {isAr ? 'عنوان مختبر الاستلام الرسمي بالشارقة:' : 'Official Lab Courier Destination Address:'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                  Al Sharq Mobile Phone & Computer Trading LLC<br />
                  BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Industrial Area<br />
                  Sharjah, United Arab Emirates (P.O. Box / Postal: 00000)<br />
                  Tel / Mobile: +971 50 711 7043 / +971 6 539 2120
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "Al Sharq Mobile Phone & Computer Trading LLC, BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Industrial Area, Sharjah, UAE. Phone: +971507117043"
                  );
                  alert(isAr ? "تم نسخ العنوان إلى الحافظة!" : "Shipping address copied to clipboard!");
                }}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-gray-900 dark:text-white font-bold rounded-xl text-sm transition-colors"
              >
                {isAr ? 'نسخ العنوان الكامل' : 'Copy Courier Address'}
              </button>
              <button
                onClick={() => handleWhatsApp('Request Courier Assistance')}
                className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
              >
                {isAr ? 'مساعدة في الشحن عبر واتساب' : 'Get Shipping Help'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Digital Printable Mail-In Intake Pass Generator */}
      <MailInPassGenerator />

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              {isAr ? 'الأسئلة الشائعة حول الصيانة والشحن من دول الخليج وتركيا' : 'Frequently Asked Questions (GCC & Regional)'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isAr ? 'إجابات مباشرة على استفسارات الجمارك والتكلفة والضمان' : 'Everything you need to know about customs, warranty, and costs'}
            </p>
          </div>

          <div className="space-y-6">
            
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{isAr ? 'هل سأدفع جمارك عند إرسال جهازي المعطوب للصيانة من السعودية أو عمان؟' : 'Do I need to pay customs when sending my broken device for repair?'}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr
                  ? 'عند ملء بوليصة الشحن لدى DHL أو Aramex، يتم تحديد نوع الشحنة كـ "Personal Used Item for Repair" (جهاز شخصي مستعمل مرسل للصيانة). هذا التصنيف يعفي الجهاز من الرسوم الجمركية في معظم دول الخليج، ولا توجد ضرائب جديدة عند إعادة الجهاز بعد إصلاحه.'
                  : 'When filling the airway bill with DHL or Aramex, declare the package as "Personal Used Electronics for Repair & Return". In most GCC countries, this designates the item for temporary repair and avoids import tariffs.'}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{isAr ? 'ماذا لو كان جهازي غير قابل للإصلاح؟ هل أدفع تكلفة الصيانة؟' : 'What if my logic board cannot be repaired? Do I still pay?'}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr
                  ? 'نحن نطبق سياسة واضحة وعادلة: "لا إصلاح = لا رسوم صيانة". إذا كان المعالج الرئيسي تالفاً تماماً ولا يمكن إصلاحه، لن تدفع أي رسوم فحص أو صيانة، وتتحمل فقط تكلفة شحن العودة إن رغبت في استرجاع الجهاز.'
                  : 'We strictly follow a "No Fix, No Fee" policy on micro-soldering and data recovery. If a processor or NAND is physically damaged beyond recovery, you pay 0 AED for repair labor.'}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{isAr ? 'هل تقدمون ضماناً للأجهزة التي تم إصلاحها وإرسالها خارج الإمارات؟' : 'Do you provide a warranty for devices sent back outside the UAE?'}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr
                  ? 'نعم، جميع عمليات إصلاح اللوحة الأم والقطع المستبدلة مغطاة بضمان رسمي مدة 90 يوماً. يتم تسجيل الرقم التسلسلي (Serial / IMEI) في نظامنا الرقمي ويمكنك تتبع حالة الضمان عبر موقعنا في أي وقت.'
                  : 'Yes! All logic board repairs and replacement parts carry an official 90-day warranty registered to your serial number and IMEI in our digital system.'}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{isAr ? 'كيف يتم شراء وتصدير الهواتف واللابتوبات بالجملة من الشارقة؟' : 'How can retail businesses import wholesale electronics from Al Sharq?'}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr
                  ? 'نوفر لمتاجر الهواتف والكمبيوتر في السعودية وعمان والبحرين وتركيا قوائم أسعار يومية للأجهزة المجددة الأصلية (Grade A+ / Grade A) ولابتوبات ديل ولينوفو وماك بوك. نقوم بالشحن الجوي السريع مع الفاتورة الضريبية وقائمة التعبئة الرسمية.'
                  : 'We supply certified pre-owned devices, bulk laptops, and original Apple spare parts with commercial packing lists and invoices directly from Sharjah’s vibrant tech trade hub to your business.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange to-orange-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-black mb-4">
            {isAr
              ? 'هل لديك جهاز معقد أو استفسار تجاري من دول الخليج أو تركيا؟'
              : 'Have a Device to Repair or Bulk Order from GCC or Turkey?'}
          </h2>
          <p className="text-orange-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            {isAr
              ? 'فريق المهندسين في انتظارك لتقديم الفحص المبدئي المجاني وتنسيق استلام الشحنة اليوم.'
              : 'Our engineering lab team is ready to evaluate your device and arrange courier receipt today.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleWhatsApp('Immediate Repair Booking')}
              className="px-8 py-4 bg-white text-brand-orange font-black rounded-2xl shadow-xl hover:bg-orange-50 transition-all text-base flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isAr ? 'تحدث مباشرة مع مهندس المختبر' : 'Chat with Lab Engineer (+971 50 711 7043)'}</span>
            </button>
            <a
              href="tel:+971507117043"
              className="px-8 py-4 bg-orange-700/60 hover:bg-orange-700 text-white font-bold rounded-2xl transition-all text-base flex items-center gap-2 border border-white/20"
            >
              <Phone className="w-5 h-5" />
              <span>+971 50 711 7043</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
