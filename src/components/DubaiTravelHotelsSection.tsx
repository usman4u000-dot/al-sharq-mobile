import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hotel, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Tag, 
  ShieldCheck, 
  Compass, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TRIP_COM_DUBAI_HOTELS_URL = "https://www.trip.com/hotels/list?city=220&display=Dubai&optionId=220&optionType=City&optionName=Dubai&Allianceid=10929626&SID=332911573&trip_sub1=&trip_sub3=D20154955";
const EVONIXTEC_URL = "https://evonixtec.com";

export const DubaiTravelHotelsSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-t border-b border-amber-500/30">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'عروض فنادق دبي والسياحة الذكية 2026' : 'Dubai Hotels & Travel Tech Guide 2026'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {isAr ? (
                <>
                  أفضل <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500">فنادق دبي وتجهيزات السفر الذكية</span> قرب برج خليفة
                </>
              ) : (
                <>
                  Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500">Hotels in Dubai 2026</span> & Travel Tech Guide
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'تخطط لرحلتك إلى دبي؟ احصل على خصومات تصل حتى 60% على فنادق 5 نجوم قرب برج خليفة ودبي مول ومارينا عبر Trip.com، وتعرف على أهم التطبيقات والأجهزة التقنية للسفر.'
                : 'Planning your trip to Dubai? Unlock exclusive rates up to 60% OFF on 5-star hotels near Burj Khalifa & Marina on Trip.com, plus tourist eSIM, apps, and gadget reviews.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={TRIP_COM_DUBAI_HOTELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wide transition-all shadow-lg shadow-orange-500/25"
            >
              <span>{isAr ? '👉 تفقد أسعار فنادق دبي' : '👉 Check Dubai Hotel Prices'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              to="/blog/best-hotels-in-dubai-2026-luxury-budget-burj-khalifa-guide"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>{isAr ? 'دليل الفنادق الكامل' : 'Read Full Hotel Guide'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Trip.com Exclusive Hotel Deals */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 flex flex-col justify-between hover:border-amber-500/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Hotel className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300">
                  {isAr ? 'خصم حتى 60%' : 'Up to 60% OFF'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'حجوزات الفنادق المضمونة (Trip.com)' : 'Top Dubai Hotels & Stays'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isAr
                  ? 'فنادق فاخرة واقتصادية في وسط دبي، نخلة جميرا، مارينا وديرة مع إلغاء مجاني وضمان أفضل سعر.'
                  : 'Exclusive deals on Downtown, Marina & Deira properties. Free cancellation and 24/7 multilingual booking support.'}
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Downtown Dubai & Burj Khalifa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dubai Marina & JBR Beach</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Historic Deira & Dubai Creek</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <a
                href={TRIP_COM_DUBAI_HOTELS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{isAr ? 'احجز عبر Trip.com الآن' : 'Book on Trip.com'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Tech Travel Guide & Evonixtec Partner */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-500/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Evonixtec Tech
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'أهم 5 تطبيقات وتقنيات للسائح' : '5 Apps & Tech for Dubai 2026'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isAr
                  ? 'دليل السفر الذكي: تطبيقات كريم ونول، بطاقات eSIM، ومحولات الكهرباء الثلاثية البريطانية Type G.'
                  : 'Everything you need on your phone: Careem & Uber, Nol Metro Pay, UAE tourist eSIMs, and Type G UK adapters.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 mb-4">
                <span className="text-cyan-400 font-semibold block">{isAr ? 'شريك المراجعات التقنية:' : 'Tech Reviews Partner:'}</span>
                <span className="text-slate-300">Detailed hardware reviews on <strong>Evonixtec.com</strong>.</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <Link
                to="/blog/5-best-apps-and-tech-you-need-before-traveling-to-dubai-2026"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                <span>{isAr ? 'اقرأ الدليل' : 'Read Guide'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={EVONIXTEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-300 hover:text-white inline-flex items-center gap-1"
              >
                <span>Evonixtec.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 3: Tourist Emergency Phone & Battery Lab Support */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-orange-500/30 flex flex-col justify-between hover:border-orange-500/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-950 border border-orange-800 text-orange-300">
                  {isAr ? 'صيانة فورية 20 دقيقة' : 'Express Lab'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'دعم تقني وطوارئ للسياح في الإمارات' : 'Tourist Phone Repair & Battery'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isAr
                  ? 'انكسرت الشاشة أو فرغت البطارية في حرارة دبي؟ مختبر الشرق في مويلح (قرب دبي) يقدم صيانة سريعة بأسعار أقل 50% من المولات.'
                  : 'Cracked screen at Dubai Mall or battery draining fast? Al Sharq Lab is 15 mins from Dubai Airport, offering 20-min repairs at wholesale rates.'}
              </p>

              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>iPhone & Samsung OLED screen replacements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>High-capacity battery replacements with heat protection</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                to="/estimate"
                className="text-xs font-bold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
              >
                <span>{isAr ? 'حساب السعر' : 'Get Price'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20am%20a%20tourist%20in%20Dubai%20and%20need%20urgent%20phone%20repair."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
              >
                <span>WhatsApp (+971 50 711 7043)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DubaiTravelHotelsSection;
