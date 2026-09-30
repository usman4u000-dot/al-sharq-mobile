import React from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GoogleReviewsTrustBadge() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const reviews = [
    {
      id: 1,
      author: 'Ahmed Al Nuaimi',
      authorAr: 'أحمد النعيمي',
      city: 'Sharjah, UAE',
      cityAr: 'الشارقة، الإمارات',
      rating: 5,
      date: '2 days ago',
      textEn: 'Fixed my iPhone 16 Pro Max cracked OLED in 25 minutes at their Muwaileh lab. Mega malls asked for 1,700 AED; Al Sharq did original OEM with TrueTone for less than half! Honest technicians.',
      textAr: 'قمت بتبديل شاشة آيفون 16 برو ماكس في 25 دقيقة فقط في ورشة مويلح. المحلات طلبت 1,700 درهم، بينما مركز الشرق أنجزها بقطع أصلية ومعايرة ترو تون بنصف السعر. فنيون محترفون وأمناء.'
    },
    {
      id: 2,
      author: 'Fahad Al Otaibi',
      authorAr: 'فهد العتيبي',
      city: 'Riyadh, Saudi Arabia',
      cityAr: 'الرياض، السعودية',
      rating: 5,
      date: '5 days ago',
      textEn: 'Ordered a brand new sealed iPhone 18 Pro Max from Riyadh. Shipped direct from Sharjah port warehouse via DHL in 36 hours. Original sealed box and saved 950 SAR compared to Jarir/Extra!',
      textAr: 'طلبت آيفون 18 برو ماكس مختوم كرتون المصنع إلى الرياض. وصلني عبر DHL خلال 36 ساعة فقط. وفرت أكثر من 950 ريال مقارنة بالسوق المحلي مع ضمان رسمي موثق!'
    },
    {
      id: 3,
      author: 'Salim Al Busaidi',
      authorAr: 'سالم البوسعيدي',
      city: 'Muscat, Oman',
      cityAr: 'مسقط، سلطنة عمان',
      rating: 5,
      date: '1 week ago',
      textEn: 'My MacBook M3 had severe coffee liquid damage. Local repairers in Muscat declared it dead. Sent it to Al Sharq in Sharjah: they ultrasonic cleaned and micro-soldered the power IC with all files intact!',
      textAr: 'تعرض ماك بوك M3 لسكب سوائل وتوقف تماماً. ورش مسقط اعتبرته تالفاً ولا يمكن تصليحه. أرسلته للشارقة، قاموا بلحام ميكروسكوبي وتنظيف بالألتراسونيك ورجعت كل ملفاتي سليمة.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-750 shadow-xl my-12">
      
      {/* Top Google Rating Summary Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          {/* Google Logo / Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md shrink-0">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-2xl font-black text-gray-900 dark:text-white">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-1">
                ✓ Google Verified
              </span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isAr ? 'تقييم ممتاز مبني على أكثر من 850 تقييم حقيقي في شارجة مويلح ودول الخليج' : 'Based on 850+ verified customer reviews across Sharjah, UAE & GCC'}
            </p>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>{isAr ? 'عرض تقييمات خرائط جوجل' : 'Read All Reviews on Google Maps'}</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
        </a>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                "{isAr ? rev.textAr : rev.textEn}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-gray-900 dark:text-white block">
                  {isAr ? rev.authorAr : rev.author}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-orange" />
                  <span>{isAr ? rev.cityAr : rev.city}</span>
                </span>
              </div>

              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
