import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Search, Sparkles, ArrowRight, Smartphone, Laptop, Printer, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceSearchModal({ isOpen, onClose }: VoiceSearchModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLang, setSelectedLang] = useState<'ur' | 'ar' | 'en'>(language === 'ar' ? 'ar' : 'en');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setErrorMessage(null);
    }
  }, [isOpen]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        isAr 
          ? 'متصفحك الحالي لا يدعم التعرف على الصوت مباشرة. يمكنك استخدام حقل البحث النصي.' 
          : 'Speech recognition is not supported in this browser. Please use text search.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang === 'ur' ? 'ur-PK' : selectedLang === 'ar' ? 'ar-AE' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setErrorMessage('Could not hear clearly. Please tap the mic and try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
      setErrorMessage('Could not access microphone.');
    }
  };

  const handleRouteQuery = (queryText: string) => {
    const q = queryText.toLowerCase();
    onClose();

    if (q.includes('screen') || q.includes('شاشة') || q.includes('اسکرین') || q.includes('oled') || q.includes('display')) {
      navigate('/screen-repair');
    } else if (q.includes('iphone') || q.includes('ايفون') || q.includes('آئی فون') || q.includes('apple')) {
      navigate('/iphone-repair');
    } else if (q.includes('macbook') || q.includes('ماك') || q.includes('logic board') || q.includes('میک بک')) {
      navigate('/macbook-repair');
    } else if (q.includes('samsung') || q.includes('سامسونج') || q.includes('سیمسنگ')) {
      navigate('/samsung-repair');
    } else if (q.includes('laptop') || q.includes('لابتوب') || q.includes('کمپیوٹر') || q.includes('computer')) {
      navigate('/computer-repair');
    } else if (q.includes('battery') || q.includes('بطارية') || q.includes('بیٹری')) {
      navigate('/battery-repair');
    } else if (q.includes('printer') || q.includes('طابعة') || q.includes('پرنٹر')) {
      navigate('/printer-repair');
    } else if (q.includes('water') || q.includes('ماء') || q.includes('liquid') || q.includes('پانی')) {
      navigate('/liquid-damage-repair');
    } else if (q.includes('student') || q.includes('طالب') || q.includes('جامعة') || q.includes('اسٹوڈنٹ')) {
      navigate('/students');
    } else {
      navigate(`/search?q=${encodeURIComponent(queryText)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 p-6 text-center relative"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Language Selector Pills */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                selectedLang === 'en'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('ar')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                selectedLang === 'ar'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setSelectedLang('ur')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                selectedLang === 'ur'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              اردو
            </button>
          </div>

          {/* Microphone Animated Circle */}
          <div className="relative my-6 flex items-center justify-center">
            {isListening && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute w-28 h-28 rounded-full bg-brand-orange/30 -z-10"
                />
                <motion.div
                  animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute w-36 h-36 rounded-full bg-brand-orange/20 -z-10"
                />
              </>
            )}

            <button
              onClick={isListening ? () => setIsListening(false) : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isListening
                  ? 'bg-brand-orange text-white scale-110 shadow-orange-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-brand-orange hover:text-white'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start voice recognition'}
            >
              {isListening ? <Mic className="w-9 h-9 animate-pulse" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {isListening
              ? (selectedLang === 'ar' ? 'جاري الاستماع... تفضل بالتحدث' : selectedLang === 'ur' ? 'سن رہے ہیں... بولیے' : 'Listening... Speak now')
              : (selectedLang === 'ar' ? 'اضغط على الميكروفون للتحدث' : selectedLang === 'ur' ? 'مائیک پر کلک کر کے سوال پوچھیں' : 'Tap the microphone to speak')}
          </h3>

          {/* Live Transcript / Result */}
          {transcript ? (
            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-slate-800 border border-brand-orange/30 text-sm font-semibold text-slate-900 dark:text-white my-4">
              "{transcript}"
            </div>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              {selectedLang === 'ar' 
                ? 'جرب أن تقول: "تبديل شاشة آيفون" أو "تصليح ماك بوك"' 
                : selectedLang === 'ur'
                ? 'مثال: "آئی فون 15 اسکرین ریپلیسمنٹ" یا "میک بک مدر بورڈ"'
                : 'Try saying: "iPhone 15 screen replacement", "MacBook liquid damage", or "HP printer repair"'}
            </p>
          )}

          {errorMessage && (
            <p className="text-xs text-rose-500 font-medium mb-3">
              {errorMessage}
            </p>
          )}

          {transcript && (
            <button
              onClick={() => handleRouteQuery(transcript)}
              className="w-full py-3 px-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>{isAr ? 'الانتقال للنتيجة فوراً' : 'Go to Result'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
