import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Laptop, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  Truck, 
  Wrench, 
  ArrowLeft,
  Sparkles,
  Search,
  Battery,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { seoBlogsArabic } from '../data/seoBlogsArabic';

export default function ArabicServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://allsharq.com/arabic-services#localbusiness",
        "name": "شركة الشرق لتجارة الهواتف المتحركة والكمبيوتر ذ.م.م",
        "alternateName": "Al Sharq Mobile Phone & Computer Trading LLC",
        "url": "https://allsharq.com/arabic-services",
        "telephone": "+971507117043",
        "image": "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=1200",
        "priceRange": "$$",
        "currenciesAccepted": "AED, SAR, OMR, QAR, KWD, BHD",
        "paymentAccepted": "Cash, Credit Card, Apple Pay, Tabby, Tamara",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
          "addressLocality": "Muwaileh, Sharjah",
          "addressRegion": "Sharjah",
          "postalCode": "00000",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.3123,
          "longitude": 55.4800
        },
        "inLanguage": "ar"
      },
      {
        "@type": "FAQPage",
        "@id": "https://allsharq.com/arabic-services#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "كم يستغرق تصليح شاشة الآيفون أو السامسونج في مركزكم بالشارقة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "يتم تبديل الشاشات الأصلية في ورشتنا الفنية خلال 30 إلى 45 دقيقة فقط مع فحص مجاني ونقل شريحة الـ IC للحفاظ على خاصية True Tone وبضمان 90 يوماً."
            }
          },
          {
            "@type": "Question",
            "name": "أين يقع محل الشرق للموبايلات في الشارقة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "موقعنا في الشارقة - منطقة مويلح التجارية والصناعية - شارع محطة الدفاع المدني - بناية 1017 - محل رقم 2 (BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh)."
            }
          },
          {
            "@type": "Question",
            "name": "هل يمكن شحن أجهزة الماك بوك والآيفون من السعودية أو عمان للتصليح؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، نستقبل يومياً شحنات عبر DHL و SMSA وأرامكس لصيانة اللوحات الأم (Motherboard Micro-soldering) واستعادة البيانات من السعودية وعمان والكويت وقطر والبحرين بأسعار أوفر بنسبة 70% مقارنة بالوكالات."
            }
          }
        ]
      }
    ]
  };

  const handleWhatsApp = (msg: string) => {
    const text = encodeURIComponent(msg);
    window.open(`https://wa.me/971507117043?text=${text}`, '_blank');
  };

  const arabicServicesList = [
    {
      title: "تصليح شاشات الآيفون الفوري (iPhone Screen)",
      models: "iPhone 18 Pro Max, 17, 16 Pro, 15, 14, 13, 12, 11",
      desc: "تبديل شاشات أصلية OEM مع نقل شريحة IC لمنع ظهور رسالة الشاشة غير المعروفة والحفاظ على Face ID و True Tone في 30 دقيقة فقط.",
      warranty: "ضمان 90 يوم معتمد",
      price: "يبدأ من 150 درهم",
      icon: <Smartphone className="w-8 h-8 text-orange-600 dark:text-orange-400" />
    },
    {
      title: "صيانة لوحات الماك بوك الدقيقة (MacBook Logic Board)",
      models: "MacBook Pro & Air (M1, M2, M3, M4 Max, Intel)",
      desc: "إصلاح احترافي لدوائر الكهرباء المحترقة، تلف سوائل الماء، شورت الباور، واستبدال مكثفات الدوائر الدقيقة تحت الميكروسكوب بدلاً من تغيير المذربورد بالكامل.",
      warranty: "ضمان 90 يوم معتمد",
      price: "توفير 70% مقارنة بالوكالات",
      icon: <Laptop className="w-8 h-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "استعادة بيانات الهواتف الميتة (Data Recovery)",
      models: "آيفون وسامسونج و SSDs والأجهزة التالفة كلياً",
      desc: "استخراج مباشر للصور والملاحظات والملفات من ذواكر NAND حتى لو كان الهاتف محروقاً أو مكسوراً أو لا يعمل إطلاقاً مع سياسة (لا بيانات = لا رسوم).",
      warranty: "سرية تامة 100%",
      price: "فحص مجهري مجاني على الكاونتر",
      icon: <HardDrive className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "تصليح هواتف سامسونج فولد وفليب (Galaxy Fold / Flip)",
      models: "Galaxy Z Fold 6/5/4, Z Flip 6/5, S26 Ultra, S25, S24",
      desc: "إصلاح مفصلات الفولد، تبديل شاشات UTG الداخلية القابلة للطي، وحل مشكلات عدم فتح الجهاز بالكامل أو ظهور الخطوط الخضراء.",
      warranty: "ضمان معتمد",
      price: "قطع غيار سامسونج أصلية",
      icon: <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "تبديل بطاريات أصلية لجميع الهواتف (Battery Replacement)",
      models: "Apple, Samsung, Xiaomi, Huawei, Honor, Google Pixel",
      desc: "استبدال خلايا بطارية ليثيوم كوبالت عالية الكثافة المقاومة لحرارة الصيف في الإمارات، مع برمجة نسبة صحة البطارية 100% خلال 20 دقيقة.",
      warranty: "ضمان 6 شهور ضد الانتفاخ",
      price: "يبدأ من 80 درهم",
      icon: <Battery className="w-8 h-8 text-amber-600 dark:text-amber-400" />
    },
    {
      title: "شحن واستقبال الأجهزة من السعودية ودول الخليج",
      models: "السعودية، عمان، الكويت، قطر، البحرين",
      desc: "خدمة صيانة عبر البريد السريع الدولي (DHL / SMSA / Aramex) لأعطال المايكروسولديرنج المعقدة التي ترفضها ورش الصيانة المحلية مع تسليم خلال 3 إلى 5 أيام.",
      warranty: "تتبع مباشر وتأمين شحن",
      price: "أسعار تفضيلية لدول الخليج",
      icon: <Truck className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans" dir="rtl">
      <Helmet>
        <title>مركز الشرق لصيانة الهواتف والكمبيوتر الشارقة | تصليح ايفون وماك بوك وسامسونج مويلح</title>
        <meta 
          name="description" 
          content="أفضل محل تصليح تلفونات ولابتوب في الشارقة مويلح. تصليح شاشات ايفون وسامسونج فوري خلال 30 دقيقة، صيانة مذربورد ماك بوك دقيقة، استعادة بيانات بضمان 90 يوماً. بناية 1017 محل 2 شارع محطة الإطفاء." 
        />
        <meta 
          name="keywords" 
          content="تصليح هواتف الشارقة, تصليح ايفون الشارقة, محل تلفونات مويلح, صيانة ماك بوك الشارقة, تبديل شاشة ايفون مويلح, تصليح سامسونج فولد, استعادة بيانات الجوال الشارقة, محل صيانة كمبيوتر الشارقة, ارخص تصليح شاشات بالشارقة, تصليح اجهزة بالبريد من السعودية, صيانة لابتوب ديل اتش بي الشارقة" 
        />
        <link rel="canonical" href="https://allsharq.com/arabic-services" />
        <meta property="og:title" content="مركز الشرق لصيانة الهواتف والكمبيوتر الشارقة | مويلح" />
        <meta property="og:description" content="صيانة فورية للهواتف واللابتوبات في الشارقة بأسعار أوفر بنسبة 20% إلى 50%. قطع أصلية وضمان 90 يوماً." />
        <meta property="og:url" content="https://allsharq.com/arabic-services" />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section with Vibrant High Contrast */}
      <section className="relative bg-gradient-to-b from-[#0A192F] to-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-orange-500/30">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-600/30 border border-orange-500 text-orange-300 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>المركز الفني الأول المعتمد في الشارقة - مويلح</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            تصليح فوري للهواتف والماك بوك في الشارقة <br />
            <span className="text-orange-500">بأسعار أوفر بنسبة 20% إلى 50%</span> مع ضمان 90 يوماً
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            أهلاً بكم في <strong>شركة الشرق لتجارة الهواتف المتحركة والكمبيوتر ذ.م.م</strong>. نوفر صيانة مجهرية متقدمة لجميع أجهزة آبل وسامسونج ولابتوبات العمل، مع تشخيص فوري مجاني على الكاونتر في موقعنا المعتمد بشارع محطة الدفاع المدني في مويلح.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => handleWhatsApp("السلام عليكم، أود الاستفسار عن تصليح جهازي وأسعاره في ورشتكم بالشارقة")}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-6 h-6" />
              <span>استشارة فورية عبر واتساب (+971 50 711 7043)</span>
            </button>

            <a
              href="tel:+971507117043"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg shadow-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>اتصال مباشر بالمهندس الفني</span>
            </a>
          </div>

          {/* Quick NAP Badge */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-300 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
              <span>
                <strong>العنوان الدقيق:</strong> BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area, Sharjah
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>مفتوح يومياً: 9:00 صباحاً حتى 11:00 مساءً (الجمعة من 4:00 عصراً)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            خدمات الصيانة الأكثر طلباً في الشارقة والإمارات
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            نعتمد أعلى معايير الجودة العالمية وأحدث محطات اللحام المجهري لضمان عودة جهازك للعمل بكفاءة المصنع.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arabicServicesList.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-3">
                  الأجهزة المدعومة: {service.models}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">{service.warranty}</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{service.price}</span>
                </div>
                <button
                  onClick={() => handleWhatsApp(`أود حجز خدمة: ${service.title}`)}
                  className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors"
                >
                  طلب تسعير
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UAE & GCC Courier Information */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2 block">
                تغطية شاملة لجميع مناطق الدولة ودول الخليج
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                هل أنت خارج الشارقة؟ نصلك أينما كنت
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                نوفر خدمة استلام وتسليم سريعة في دبي وعجمان وأبوظبي وأم القيوين ورأس الخيمة والفجيرة، بالإضافة إلى استقبال الأجهزة المعقدة المشحونة من مدن المملكة العربية السعودية (الرياض، جدة، الدمام) وسلطنة عمان والكويت وقطر والبحرين.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>تأمين شامل على الأجهزة أثناء النقل والشحن</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>فحص مباشر وإرسال فيديو تشخيصي للمشكلة عبر واتساب قبل بدء الصيانة</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>دفع آمن بعد إتمام الصيانة بنجاح واختبار جميع الوظائف</span>
                </li>
              </ul>
              <Link
                to="/gcc-services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A192F] dark:bg-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                <span>تفاصيل الشحن والأسعار لعملاء السعودية والخليج</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:w-1/2 bg-white dark:bg-slate-850 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span>ضمان الجودة والأمان في شركة الشرق</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                نحن لسنا مجرد كشك صيانة عادي، بل مختبر إلكتروني هندسي مجهز بأحدث أدوات القياس مثل راسمات الإشارة ومحطات BGA لإعادة تركيب الرقائق ومجاهر تكبير بدقة 4K.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-orange-600 dark:text-orange-400 mb-1">+15,000</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">جهاز تم إصلاحه بنجاح بالشارقة</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">90 يوم</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">ضمان خطي معتمد على جميع القطع</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">30 دقيقة</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">متوسط وقت تبديل الشاشات</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mb-1">4.9 ★</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">تقييم عملاء مويلح والشارقة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arabic Blog Articles & Diagnostic Guides for High SEO Authority */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            مقالات تقنية وأدلة الصيانة المعتمدة
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            اطلع على أحدث شروحات المهندسين حول حماية أجهزتك وتفادي أعطال الشاشات والبطاريات في طقس الإمارات.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoBlogsArabic.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                    اقرأ المزيد <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (Arabic FAQ Schema Grounding) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
          الأسئلة الشائعة حول تصليح وصيانة الأجهزة في الشارقة
        </h2>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              هل تفقد بياناتي (الصور والمحادثات) أثناء تصليح الشاشة أو البطارية؟
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              كلا، لا يتم مسح أو فورمات أي بيانات نهائياً خلال عمليات استبدال الشاشة أو البطارية أو منفذ الشحن. نقوم باختبار الجهاز بأمان تام مع الحفاظ التام على خصوصيتك.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              ما الفرق بين الشاشة الأصلية والتجارية لديكم؟
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              الشاشة الأصلية OEM توفر سطوعاً فائقاً تحت شمس الإمارات مع استجابة لمس 120Hz مطابقة للجديدة وعمر افتراضي طويل للبطارية. أما الشاشات التجارية فتنخفض فيها الألوان وتستهلك طاقة أكبر. نوفر جميع الخيارات حسب ميزانية العميل مع توضيح الفروق بشفافية مطلقة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              كيف أصل إلى فرعكم في الشارقة؟
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              فرعنا في مويلح التجارية، على شارع محطة الإطفاء والدفاع المدني، بناية 1017، محل رقم 2 (BLDG#1017 - SHOP#2 Fire Station Road). نوفر مواقف سيارات مجانية ومريحة أمام المحل مباشرة، ويمكنك فتح الموقع بنقرة واحدة عبر خرائط جوجل.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="bg-orange-600 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            هل تحتاج إلى فحص مجاني لجهازك الآن؟
          </h2>
          <p className="text-orange-100 text-base mb-6">
            تواصل معنا مباشرة وتحدث مع المهندس الفني المختص لمعرفة التكلفة التقديرية ووقت الإصلاح في دقائق معدودة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleWhatsApp("مرحباً، أود معرفة تكلفة فحص وتصليح جهازي")}
              className="px-6 py-3.5 rounded-xl bg-white text-orange-600 font-bold hover:bg-orange-50 transition-colors shadow-lg"
            >
              مراسلة عبر واتساب (+971 50 711 7043)
            </button>
            <a
              href="tel:+971507117043"
              className="px-6 py-3.5 rounded-xl bg-orange-800 hover:bg-orange-900 text-white font-bold transition-colors"
            >
              اتصال هاتفي مباشر
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
