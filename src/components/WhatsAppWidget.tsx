import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhatsAppWidget() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasScrolled) return null;

  const quickInquiries = [
    { label: '📱 Screen Repair Quote', labelAr: '📱 استفسار تصليح شاشة', msg: 'Hello Al Sharq Lab, I would like an express screen replacement quote in Sharjah.' },
    { label: '💻 MacBook Logic Board Fix', labelAr: '💻 صيانة ماك بوك دقيقة', msg: 'Hello, I have a MacBook logic board issue and need a micro-soldering diagnostic quote.' },
    { label: '🛍️ 20% OFF Phones', labelAr: '🛍️ شراء هواتف بخصم 20%', msg: 'Hello Al Sharq, I want to inquire about factory-sealed phones at 20% off market price.' },
    { label: '🇸🇦 🇴🇲 GCC Mail-In Shipping', labelAr: '🇸🇦 شحن صيانة من الخليج', msg: 'Hello, I am located in the GCC (Saudi / Oman / Bahrain / Kuwait / Qatar) and want to send my device for mail-in repair.' },
    { label: '🔋 Battery & Heat Fix', labelAr: '🔋 تبديل بطارية 15 دقيقة', msg: 'Hello, my phone is overheating and battery drains fast. I want to claim the 15% discount voucher.' }
  ];

  const handleSendWhatsApp = (textToSend?: string) => {
    const text = textToSend || customText.trim() || 'Hello Al Sharq Mobile, I need assistance with a device repair.';
    const url = `https://wa.me/971507117043?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/30 p-5 mb-4 w-[calc(100vw-32px)] sm:w-84 max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{isAr ? 'فريق الدعم الفني المباشر' : 'Al Sharq VIP Support'}</span>
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <span>Online at Muwaileh Bench</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
                aria-label="Close WhatsApp chat drawer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {isAr
                ? 'مرحباً بك! 👋 اختر نوع استفسارك للتحويل المباشر مع كبير الفنيين على واتساب:'
                : 'Hi there! 👋 Tap a quick inquiry below for an instant WhatsApp quotation with our master technician:'}
            </p>

            {/* Quick Chips */}
            <div className="space-y-1.5 mb-4">
              {quickInquiries.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(chip.msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate">{isAr ? chip.labelAr : chip.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendWhatsApp(); }}
              className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800"
            >
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={isAr ? "اكتب رسالة مخصصة..." : "Type custom issue..."}
                aria-label="Type custom WhatsApp repair inquiry"
                className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="p-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                title="Send on WhatsApp"
                aria-label="Send custom inquiry on WhatsApp"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white dark:border-slate-800"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <MessageCircle className="w-7 h-7 fill-current" />}
      </button>
    </div>
  );
}
