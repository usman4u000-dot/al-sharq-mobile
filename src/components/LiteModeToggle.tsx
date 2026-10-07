import React, { useEffect, useState } from 'react';
import { Zap, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LiteModeToggle() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isLiteMode, setIsLiteMode] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check saved user preference
    const saved = localStorage.getItem('alsharq_lite_mode');
    if (saved !== null) {
      const enabled = saved === 'true';
      setIsLiteMode(enabled);
      if (enabled) document.documentElement.classList.add('lite-mode');
      return;
    }

    // 2. Auto-detect legacy hardware (Windows 7 / low RAM / low CPU cores / save-data)
    const ua = navigator.userAgent || '';
    const isWin7 = ua.includes('Windows NT 6.1');
    const isOldAndroid = /Android [4-7]\./.test(ua);
    const isLowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2;
    const isSaveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;

    if (isWin7 || isOldAndroid || isLowCpu || isSaveData) {
      setIsLiteMode(true);
      document.documentElement.classList.add('lite-mode');
      localStorage.setItem('alsharq_lite_mode', 'true');
    }
  }, []);

  const toggleLiteMode = () => {
    setIsLiteMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('lite-mode');
      } else {
        document.documentElement.classList.remove('lite-mode');
      }
      localStorage.setItem('alsharq_lite_mode', String(next));
      return next;
    });
  };

  return (
    <button
      onClick={toggleLiteMode}
      title={isLiteMode ? (isAr ? 'الوضع الخفيف مفعل (سريع)' : 'Lite Mode is active (Ultra fast)') : (isAr ? 'تفعيل الوضع الخفيف للأجهزة القديمة' : 'Enable Lite Mode for older systems')}
      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 border ${
        isLiteMode
          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-brand-orange'
      }`}
      aria-label="Toggle Fast Lite Mode"
    >
      {isLiteMode ? (
        <>
          <Gauge className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="font-mono text-[10px] uppercase">
            {isAr ? '⚡ سريع (خفيف)' : '⚡ Fast Mode'}
          </span>
        </>
      ) : (
        <>
          <Zap className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-[10px]">
            {isAr ? 'الوضع السريع' : 'Fast Mode'}
          </span>
        </>
      )}
    </button>
  );
}
