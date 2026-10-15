import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  HelpCircle, 
  MapPin, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceQueryItem {
  id: string;
  queryAr: string;
  queryEn: string;
  answerAr: string;
  answerEn: string;
  benchTime: string;
  pricingAED: string;
}

const VOICE_QUERIES: VoiceQueryItem[] = [
  {
    id: 'ipad-screen-price',
    queryAr: 'كم سعر تصليح شاشة الآيباد في الشارقة؟',
    queryEn: 'How much does iPad screen repair cost in Sharjah?',
    answerAr: 'يبدأ سعر تغيير زجاج ولمس شاشة الآيباد من 180 درهماً لأجهزة آيباد الجيل التاسع والعاشر، ومن 650 درهماً لشاشات آيباد برو OLED. نستخدم تقنية التصفيح البصري مع تركيب واقي زجاج 9H مجاناً وضمان 90 يوماً.',
    answerEn: 'iPad outer glass and touch digitizer replacement starts from AED 180 for 9th and 10th Gen, and AED 650 for iPad Pro OLED panels. We use precision optical lamination with free 9H tempered glass fitting and a 90-day lab warranty.',
    benchTime: '25 - 45 دقيقة',
    pricingAED: 'من 180 درهم'
  },
  {
    id: 'muwaileh-location',
    queryAr: 'وين محل تصليح هواتف وأجهزة قريب مني في مويلح؟',
    queryEn: 'Where is the nearest device repair shop in Muwaileh?',
    answerAr: 'ورشة الشرق تقع في بناية 1017 - محل رقم 2، شارع محطة الدفاع المدني في المنطقة التجارية بمويلح، الشارقة. على بعد دقيقتين فقط من المدينة الجامعية و7 دقائق من سيتي سنتر الزاهية، مع مواقف سيارات متوفرة دائماً أمام المحل.',
    answerEn: 'Al Sharq Technology is located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Commercial, Sharjah. Just 2 mins from University City and 7 mins from City Centre Al Zahia, with free customer parking directly outside.',
    benchTime: 'مفتوح يومياً حتى 11 مساءً',
    pricingAED: 'فحص وتشخيص مجاني'
  },
  {
    id: 'battery-warning',
    queryAr: 'كيف تبدلون بطارية الآيفون بدون ظهور رسالة تحذير قطعة غير معروفة؟',
    queryEn: 'How do you replace an iPhone battery without the unknown part warning?',
    answerAr: 'نقوم بلحام شريحة إدارة الطاقة الأصلية (BMS Board) من بطاريتك القديمة ونقلها للخلية الجديدة بنظام Micro-Welding، مع إعادة ضبط دورات الشحن بجهاز البرمجة، للحفاظ على نسبة صحة البطارية 100% بدون أي رسائل تحذير مزعجة في الإعدادات.',
    answerEn: 'We micro-weld your original BMS battery management chip onto a fresh 0-cycle OEM cell and reprogram the cycle count. This preserves 100% battery health tracking without triggering Apple Unknown Part system warnings.',
    benchTime: '20 - 30 دقيقة',
    pricingAED: 'من 130 درهم'
  },
  {
    id: 'macbook-logic-board',
    queryAr: 'هل تصلحون مذربورد الماك بوك الميت أو المتعطل بالماء؟',
    queryEn: 'Can you repair liquid damaged or dead MacBook logic boards?',
    answerAr: 'نعم، نحن متخصصون في صيانة الميكروسولدنج المستوى الرابع لمعالجات M1 وM2 وM3 وM4 وأجهزة إنتل. نقوم بفحص مسارات الطاقة وتغيير المكثفات والآيسيهات المحروقة بالمجهر بدلاً من تبديل المذربورد بالكامل، مما يوفر أكثر من 70% من سعر الوكالة.',
    answerEn: 'Yes! We specialize in Level 4 micro-soldering for Apple Silicon (M1-M4) and Intel boards. We identify shorted capacitors and burnt power MOSFETs under microscope, saving you over 70% compared to official board replacements.',
    benchTime: '2 - 4 ساعات',
    pricingAED: 'من 280 درهم'
  },
  {
    id: 'free-screen-protector',
    queryAr: 'هل تركيب حماية الشاشة والزجاج 9H مجاني عند الشراء؟',
    queryEn: 'Is tempered glass installation free upon purchase?',
    answerAr: 'نعم بالتأكيد! كل لاصقة حماية شاشة أو زجاج 9H أو لاصقة ورقية للآيباد يتم تركيبها بواسطة فني المختبر داخل محطة تنظيف خالية من الغبار مجاناً 100% مع ضمان عدم وجود أي فقاعات هواء.',
    answerEn: 'Yes, absolutely! Every tempered glass or paper-feel protector includes 100% free machine-assisted installation on our dust-free optical bench with a zero-bubble guarantee.',
    benchTime: '5 دقائق',
    pricingAED: 'من 35 درهم'
  }
];

export default function ArabicVoiceSearchFAQHub() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [openId, setOpenId] = useState<string>('ipad-screen-price');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const handleSpeak = (item: VoiceQueryItem) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === item.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = isAr ? item.answerAr : item.answerEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isAr ? 'ar-SA' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleMicSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSearchStatus(isAr ? 'عذراً، متصفحك لا يدعم التعرف الصوتي المباشر' : 'Voice recognition not supported in this browser');
      setTimeout(() => setSearchStatus(null), 3000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isAr ? 'ar-AE' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSearchStatus(isAr ? 'جاري الاستماع... تحدث الآن' : 'Listening... speak now');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        setSearchStatus(`${isAr ? 'تم التعرف:' : 'Detected:'} "${transcript}"`);

        // Match query
        const matched = VOICE_QUERIES.find(q => 
          transcript.includes('ايباد') || transcript.includes('ipad') ? q.id === 'ipad-screen-price' :
          transcript.includes('مويلح') || transcript.includes('where') ? q.id === 'muwaileh-location' :
          transcript.includes('بطارية') || transcript.includes('battery') ? q.id === 'battery-warning' :
          transcript.includes('ماك') || transcript.includes('mac') ? q.id === 'macbook-logic-board' : false
        );

        if (matched) {
          setOpenId(matched.id);
        }
        setTimeout(() => setSearchStatus(null), 4000);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setSearchStatus(isAr ? 'لم نتمكن من التقاط الصوت بوضوح' : 'Could not hear clearly. Try again.');
        setTimeout(() => setSearchStatus(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <section className="bg-slate-900 border border-brand-orange/30 rounded-3xl p-6 sm:p-8 md:p-10 text-white my-12 relative overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-brand-orange text-xs font-bold mb-2 border border-orange-500/30">
            <Mic className="w-4 h-4" />
            <span>{isAr ? 'البحث الصوتي الذكي والأسئلة الشائعة بالشارقة' : 'Bilingual Voice Search & Local Q&A Hub'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            {isAr ? 'إجابات مباشرة ومسموعة لأهم أسئلة الصيانة والأسعار' : 'Direct Spoken Answers for Sharjah Tech Inquiries'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isAr 
              ? 'اضغط على زر الميكروفون للبحث الصوتي أو انقر على رمز السماعة لسماع الإجابة بصوت واضح.'
              : 'Tap the microphone for voice search or click the speaker icon to listen to bench technician answers.'}
          </p>
        </div>

        {/* Mic Activation Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleMicSearch}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
              isListening
                ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/40'
                : 'bg-brand-orange hover:bg-orange-600 text-white'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isListening ? (isAr ? 'جاري الاستماع...' : 'Listening...') : (isAr ? 'تحدث للبحث الصوتي' : 'Tap to Voice Search')}</span>
          </button>
        </div>
      </div>

      {/* Voice Status Alert */}
      {searchStatus && (
        <div className="mb-4 p-3 rounded-xl bg-orange-500/20 border border-brand-orange text-brand-orange text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{searchStatus}</span>
        </div>
      )}

      {/* Accordion Questions */}
      <div className="space-y-3">
        {VOICE_QUERIES.map(item => {
          const isOpen = openId === item.id;
          const isSpeakingThis = speakingId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'bg-slate-950 border-brand-orange/60 shadow-lg' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Question Header */}
              <div
                onClick={() => toggleAccordion(item.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-brand-orange text-white' : 'bg-white/10 text-slate-300'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    {isAr ? item.queryAr : item.queryEn}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(item);
                    }}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      isSpeakingThis
                        ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/10'
                    }`}
                    title="Listen Aloud"
                  >
                    {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Accordion Answer Body */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/10 text-xs sm:text-sm text-slate-300 space-y-4">
                  <p className="leading-relaxed">
                    {isAr ? item.answerAr : item.answerEn}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">
                        ⏱ {isAr ? 'المدة:' : 'Time:'} <strong>{item.benchTime}</strong>
                      </span>
                      <span className="text-brand-orange font-bold">
                        💰 {isAr ? 'السعر:' : 'Price:'} {item.pricingAED}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/971507117043?text=${encodeURIComponent(`Hi Al Sharq, I have a question regarding: ${item.queryEn}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{isAr ? 'استفسر عبر واتساب' : 'Ask on WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
