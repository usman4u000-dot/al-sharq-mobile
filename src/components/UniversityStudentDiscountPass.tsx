import React, { useState } from 'react';
import { 
  GraduationCap, 
  Percent, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Laptop, 
  Tablet, 
  BookOpen, 
  Copy, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function UniversityStudentDiscountPass() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedUni, setSelectedUni] = useState('aus');
  const [copied, setCopied] = useState(false);

  const UNIVERSITIES = [
    { id: 'aus', name: 'American University of Sharjah (AUS)', nameAr: 'الجامعة الأمريكية في الشارقة', distance: '2 mins away' },
    { id: 'uos', name: 'University of Sharjah (UoS)', nameAr: 'جامعة الشارقة', distance: '3 mins away' },
    { id: 'hct', name: 'Higher Colleges of Technology (HCT)', nameAr: 'كليات التقنية العليا بالشارقة', distance: '4 mins away' },
    { id: 'skyline', name: 'Skyline University College', nameAr: 'كلية سكايلان الجامعية', distance: '5 mins away' }
  ];

  const currentUni = UNIVERSITIES.find(u => u.id === selectedUni) || UNIVERSITIES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CAMPUS15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Al Sharq Mobile! I am a student at ${currentUni.name}. I would like to activate my 15% Student Discount (Code: CAMPUS15) for my device repair/accessory. I have my student ID ready.`
  );

  return (
    <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-indigo-500/40 shadow-2xl relative overflow-hidden my-12">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-500/30">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>{isAr ? 'برنامج خصومات المدينة الجامعية بالشارقة' : 'Sharjah University City Student Pass'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              {isAr ? 'خصم 15% لجميع الطلاب وأعضاء الهيئة التدريسية' : '15% Off All Repairs & Accessories for Students'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {isAr 
                ? 'ورشة الشرق تقع في مويلح على بعد دقيقتين فقط من المدينة الجامعية. أظهر بطاقتك الجامعية واحصل على صيانة سريعة خلال 25 دقيقة أثناء فترات الامتحانات والمشاريع.'
                : 'Located right next to University City on Fire Station Road, Muwaileh. Fast 25-minute bench turnaround so you never miss an assignment deadline.'}
            </p>
          </div>

          <div className="bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 text-xs text-slate-300 w-fit shrink-0 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
            <span>2 Mins from AUS & UoS Campuses</span>
          </div>
        </div>

        {/* University Selector Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {isAr ? 'اختر جامعتك في الشارقة:' : 'Select Your University in Sharjah:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {UNIVERSITIES.map(uni => {
              const isSelected = uni.id === selectedUni;
              return (
                <button
                  key={uni.id}
                  onClick={() => setSelectedUni(uni.id)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border text-start cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="block truncate">{isAr ? uni.nameAr : uni.name}</span>
                  <span className="text-[10px] text-indigo-300 block mt-0.5">{uni.distance}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Student Perks Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-brand-orange text-xs font-mono font-bold uppercase">Perk 1</span>
            <h4 className="font-extrabold text-sm sm:text-base text-white mt-1 mb-1">
              {isAr ? 'استبدال شاشة الآيباد واللابتوب' : 'iPad & MacBook Display Fix'}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr 
                ? 'استبدال الشاشات المكسورة والبطاريات خلال 25-35 دقيقة لضمان عدم تأخرك عن المحاضرات.'
                : 'Cracked screen, dead battery, or trackpad issues fixed in 25-35 mins with 90-day warranty.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-emerald-400 text-xs font-mono font-bold uppercase">Perk 2</span>
            <h4 className="font-extrabold text-sm sm:text-base text-white mt-1 mb-1">
              {isAr ? 'لاصقات ورقية لقلم آبل (Paper-Feel)' : 'Paper-Feel Film + Free Fitting'}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr 
                ? 'ملمس ورقي مانع للانزلاق لكتابة الملاحظات والرسم في GoodNotes وProcreate مع تركيب مجاني بدون فقاعات.'
                : 'Non-glare paper texture for GoodNotes, OneNote & Procreate. Installed free on our clean bench.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase">Perk 3</span>
            <h4 className="font-extrabold text-sm sm:text-base text-white mt-1 mb-1">
              {isAr ? 'طابور الأولوية للامتحانات' : 'Exam Rush Priority Pass'}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr 
                ? 'أولوية فورية في طابور الصيانة أثناء فترات الامتحانات النهائية بدون رسوم استعجال إضافية.'
                : 'Skip the standard queue during midterm and final exam weeks with immediate bench triage.'}
            </p>
          </div>
        </div>

        {/* Promo Voucher & WhatsApp Claim Bar */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-xl shrink-0">
              15%
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-bold">
                Student & Faculty Promo Code
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-mono font-black text-amber-400">
                  CAMPUS15
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <span className="text-xs text-slate-400 block mt-1">
                Valid with physical or digital university student ID card
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/971507117043?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isAr ? 'تفعيل الخصم عبر واتساب' : 'Claim 15% on WhatsApp'}</span>
            </a>

            <a
              href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'موقع الورشة بمويلح' : 'Visit Muwaileh Shop'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
