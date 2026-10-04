import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Percent, Clock, MapPin, ShieldCheck, CheckCircle2, ArrowRight, MessageCircle, Smartphone, Laptop, Sparkles, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function StudentDiscountPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState('American University of Sharjah (AUS)');
  const [claimed, setClaimed] = useState(false);

  const universities = [
    'American University of Sharjah (AUS)',
    'University of Sharjah (UoS)',
    'Higher Colleges of Technology (HCT) Sharjah',
    'Skyline University College (SUC)',
    'University of Wollongong / Dubai Campus',
    'Other College / High School'
  ];

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimed(true);
    const msg = `*🎓 STUDENT 15% DISCOUNT CLAIM - AL SHARQ MOBILE*\n\n` +
      `*University:* ${university}\n` +
      `*Student ID Number:* ${studentId || 'Provided at counter'}\n\n` +
      `_Hello Al Sharq, I would like to book a repair service with my 15% University City student discount in Muwaileh._`;
    const url = `https://wa.me/971507117043?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/students" />
        <title>15% University Student Repair Discount Sharjah | AUS & UoS Campus Service | Al Sharq Mobile</title>
        <meta name="description" content="Exclusive 15% discount on iPhone, MacBook, and laptop repairs for students and faculty of AUS, University of Sharjah, and HCT. Same-day repair & campus gate pickup in Muwaileh." />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: isAr ? 'الرئيسية' : 'Home', path: '/' },
            { label: isAr ? 'خصم الطلاب 15%' : 'Student & Faculty Discount' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                <GraduationCap className="w-4 h-4" />
                <span>{isAr ? 'برنامج دعم طلاب المدينة الجامعية' : 'University City Sharjah Student Program'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {isAr ? (
                  <>خصم <span className="text-brand-orange">15%</span> لطلاب الجامعات على تصليح اللابتوب والموبايل</>
                ) : (
                  <>Exclusive <span className="text-brand-orange">15% OFF</span> for University City Students & Faculty</>
                )}
              </h1>

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {isAr ? (
                  'هل تعرضت شاشة آيفونك للكسر أو توقف الماك بوك قبل موعد تسليم المشروع؟ مويلح تبعد 5 دقائق فقط عن المدينة الجامعية. أظهر بطاقتك الجامعية واحصل على خصم فوري 15% وخدمة طوارئ سريعة.'
                ) : (
                  'Cracked your iPhone screen or MacBook display right before assignment deadlines? Located on Fire Station Road, Muwaileh (5 mins from University City), Al Sharq Mobile offers express repairs, genuine parts, and an instant 15% discount for all enrolled students and faculty.'
                )}
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Percent className="w-6 h-6 text-brand-orange mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">15% Instant Savings</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">On all screen, battery, and logic board fixes.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Clock className="w-6 h-6 text-blue-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">30-Min Fast Track</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get back to studying without waiting days.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Smartphone className="w-6 h-6 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Loaner Phone</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Free backup phone during exam week repairs.</p>
                </div>
              </div>
            </motion.div>

            {/* Student Claim Card Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-700 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isAr ? 'تفعيل قسيمة الخصم 15%' : 'Claim Your 15% Student Voucher'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isAr ? 'سارية لجميع الكليات والمعاهد في الشارقة' : 'Valid for all Sharjah colleges, institutes & high schools'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-black text-lg">
                  15%
                </div>
              </div>

              <form onSubmit={handleClaim} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                    {isAr ? 'الجامعة أو الكلية' : 'Your University / College'}
                  </label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    {universities.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                    {isAr ? 'رقم البطاقة الجامعية (Student ID)' : 'Student ID Number (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AUS-98421 or UOS-2024"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-slate-750 border border-brand-orange/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'أظهر بطاقتك الجامعية الحالية عند استلام الجهاز لتطبيق الخصم 15% على إجمالي الفاتورة.'
                      : 'Simply present your student ID or campus email upon device drop-off to apply the 15% discount.'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{isAr ? 'حجز الصيانة بالخصم عبر واتساب' : 'Claim 15% Voucher via WhatsApp'}</span>
                </button>
              </form>
            </motion.div>
          </div>

          {/* Campus Directions & Map Callout */}
          <div className="bg-gradient-to-r from-slate-900 to-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl my-16 not-prose flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-2">
                5 Minutes from University City Gates
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-3">
                Need Fast Pickup From Your Campus Gate?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                If you are stuck in lectures or exam prep, our courier can meet you at Gate 1 or Gate 2 of AUS, UoS, or HCT. We fix the device at our Muwaileh workshop and return it before your next class.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white text-slate-900 font-bold rounded-xl text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Open in Google Maps</span>
              </a>
              <Link
                to="/macbook-repair"
                className="px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all"
              >
                MacBook Repairs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
