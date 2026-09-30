import React from 'react';
import { MapPin, Navigation, Phone, Clock, Search, Wrench, Smartphone, Laptop, Printer, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function NearMeLocalSearchHub() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const nearMeCategories = [
    {
      titleEn: '📱 Mobile & Phone Repair Near Me',
      titleAr: '📱 تصليح هواتف ومحل موبايلات قريب مني',
      badge: '20-Min Express',
      keywords: [
        { label: 'phone repair near me', path: '/phone-repair' },
        { label: 'mobile shop near me', path: '/shop' },
        { label: 'mobile repair shop near me', path: '/phone-repair' },
        { label: 'mobile repairing center near me', path: '/services' },
        { label: 'phone fixing near me Sharjah', path: '/phone-repair' },
        { label: 'cheap mobile repair near me', path: '/repair-estimate' },
        { label: 'best mobile repair shop in Sharjah near me', path: '/about' },
        { label: 'cell phone repair near me', path: '/phone-repair' },
        { label: 'phone battery replacement near me', path: '/battery-repair' },
        { label: 'mobile screen repair near me', path: '/screen-repair' },
        { label: 'محل تلفونات قريب مني', path: '/contact' },
        { label: 'تصليح هواتف قريب مني بالشارقة', path: '/phone-repair' }
      ]
    },
    {
      titleEn: '🍎 iPhone & Apple Service Near Me',
      titleAr: '🍎 تصليح آيفون ومحل أبل قريب مني',
      badge: 'OEM Certified',
      keywords: [
        { label: 'iphone repair near me', path: '/iphone-repair' },
        { label: 'iphone screen repair near me', path: '/screen-repair' },
        { label: 'iphone battery replacement near me', path: '/battery-repair' },
        { label: 'iphone back glass repair near me', path: '/iphone-repair' },
        { label: 'apple service center near me Sharjah', path: '/iphone-repair' },
        { label: 'iphone water damage repair near me', path: '/liquid-damage-repair' },
        { label: 'cheap iphone screen repair near me', path: '/repair-estimate' },
        { label: 'iphone camera repair near me', path: '/iphone-repair' },
        { label: 'تصليح ايفون قريب مني', path: '/iphone-repair' },
        { label: 'تبديل شاشة ايفون قريب مني', path: '/screen-repair' }
      ]
    },
    {
      titleEn: '💻 Laptop & MacBook Repair Near Me',
      titleAr: '💻 تصليح لابتوب وماك بوك ومحل كمبيوتر قريب مني',
      badge: 'Micro-Soldering',
      keywords: [
        { label: 'laptop repair near me', path: '/laptop-repair' },
        { label: 'macbook repair near me', path: '/macbook-repair' },
        { label: 'computer repair near me', path: '/computer-repair' },
        { label: 'macbook logic board repair near me', path: '/logic-board-repair' },
        { label: 'laptop screen repair near me', path: '/laptop-screen-repair' },
        { label: 'laptop battery replacement near me', path: '/laptop-repair' },
        { label: 'computer shop near me Sharjah', path: '/computer-repair' },
        { label: 'macbook water damage repair near me', path: '/liquid-damage-repair' },
        { label: 'صيانة لابتوب قريب مني', path: '/laptop-repair' },
        { label: 'محل كمبيوتر قريب مني في الشارقة', path: '/computer-repair' }
      ]
    },
    {
      titleEn: '🤖 Samsung, Android & Specialized Tech Near Me',
      titleAr: '🤖 تصليح سامسونج واستعادة بيانات وطابعات قريب مني',
      badge: 'Same-Day Bench',
      keywords: [
        { label: 'samsung repair near me', path: '/samsung-repair' },
        { label: 'samsung screen replacement near me', path: '/screen-repair' },
        { label: 'samsung phone repair near me', path: '/samsung-repair' },
        { label: 'data recovery near me', path: '/data-recovery' },
        { label: 'hard drive data recovery near me', path: '/data-recovery' },
        { label: 'printer repair near me Sharjah', path: '/printer-repair' },
        { label: 'electronics repair shop near me', path: '/services' },
        { label: 'water damage repair near me', path: '/liquid-damage-repair' },
        { label: 'fast mobile repair near me', path: '/repair-estimate' },
        { label: 'تصليح سامسونج قريب مني', path: '/samsung-repair' },
        { label: 'استعادة بيانات قريب مني', path: '/data-recovery' }
      ]
    }
  ];

  const nearbyDistricts = [
    { name: 'Muwaileh Commercial', dist: '0 Mins (We are here!)' },
    { name: 'University City Sharjah', dist: '2 Mins' },
    { name: 'Sharjah Industrial Area', dist: '3 Mins' },
    { name: 'Al Majaz & Corniche', dist: '8 Mins' },
    { name: 'Sahara Centre & Al Nahda', dist: '7 Mins' },
    { name: 'Al Taawun & Al Khan', dist: '9 Mins' },
    { name: 'Dubai Border (Al Qusais)', dist: '10 Mins' },
    { name: 'Ajman Downtown', dist: '12 Mins' }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full uppercase tracking-wider mb-3">
            <Search className="w-4 h-4" />
            <span>{isAr ? 'دليل البحث المحلي السريع في الشارقة' : 'Hyper-Local "Near Me" Search Directory'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-blue dark:text-white mb-3">
            {isAr 
              ? 'تبحث عن محل هواتف أو تصليح لابتوب قريب مني في الشارقة؟' 
              : 'Looking for "Phone Repair Near Me" or "Mobile Shop Near Me" in Sharjah?'}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'موقعنا المركزي في مويلح على شارع محطة الإطفاء يجعلنا الخيار الأقرب والأسرع لسكان مويلح، المدينة الجامعية، المجاز، النهدة، وجميع مناطق الشارقة ودبي وعجمان.'
              : 'Our central facility on Fire Station Road, Muwaileh Commercial puts expert technicians within 5 to 10 minutes from University City, Al Majaz, Sahara Centre, Al Nahda, and Dubai border.'}
          </p>
        </div>

        {/* Proximity / Drive Time Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-10">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-brand-orange" />
            <span>{isAr ? 'المسافة بالسيارة من المناطق المحيطة بنا:' : 'Estimated Driving Time to Our Muwaileh Lab:'}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {nearbyDistricts.map((d, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700 flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white truncate">{d.name}</span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{d.dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Interactive Category Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {nearMeCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-base sm:text-lg text-gray-900 dark:text-white">
                    {isAr ? cat.titleAr : cat.titleEn}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-brand-orange/10 text-brand-orange">
                    {cat.badge}
                  </span>
                </div>

                {/* Keyword Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.keywords.map((kw, kIdx) => (
                    <Link
                      key={kIdx}
                      to={kw.path}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all border border-slate-200/80 dark:border-slate-600/80 hover:scale-105 active:scale-95"
                    >
                      {kw.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">
                  {isAr ? 'صيانة فورية خلال 20 دقيقة' : 'Average repair time: 20-30 mins'}
                </span>
                <Link 
                  to="/estimate" 
                  className="font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  <span>{isAr ? 'احسب السعر' : 'Get Quote'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Callout Box */}
        <div className="bg-gradient-to-r from-brand-blue via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase inline-block mb-1">
              📍 Live GPS Coordinates: 25.3048° N, 55.4326° E
            </span>
            <h4 className="text-xl sm:text-2xl font-black">
              {isAr ? 'تفضل بزيارة ورشتنا في مويلح الآن' : 'Visit Our Muwaileh Repair Lab Right Now'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Commercial, Industrial Area, Sharjah. Open daily until 11:00 PM.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>{isAr ? 'فتح في خرائط جوجل' : 'Navigate on Google Maps'}</span>
            </a>

            <a
              href="tel:+971507117043"
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+971 50 711 7043</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
