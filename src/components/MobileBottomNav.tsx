import React from 'react';
import { Phone, MessageCircle, Wrench, MapPin, Bot } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileBottomNavProps {
  onBookNow: () => void;
  onOpenDiagnostic?: () => void;
}

export default function MobileBottomNav({ onBookNow, onOpenDiagnostic }: MobileBottomNavProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom))] transition-colors"
      role="navigation"
      aria-label="Mobile Quick Actions"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        
        {/* Call Us */}
        <a
          href="tel:+971507117043"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-orange active:scale-95 transition-all text-center min-w-[58px]"
          aria-label="Call Store"
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-0.5 text-brand-blue dark:text-blue-400">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {isAr ? 'اتصال' : 'Call'}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/971507117043?text=Hello%20Al%20Sharq%20Mobile,%20I%20would%20like%20to%20inquire%20about%20a%20repair%20service."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-green-600 active:scale-95 transition-all text-center min-w-[58px]"
          aria-label="WhatsApp Us"
        >
          <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-950/40 flex items-center justify-center mb-0.5 text-green-600 dark:text-green-400">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {isAr ? 'واتساب' : 'WhatsApp'}
          </span>
        </a>

        {/* Book Now - Main Action (Highlighted) */}
        <button
          onClick={onBookNow}
          className="flex flex-col items-center justify-center py-1 px-3 -mt-3 rounded-2xl bg-gradient-to-r from-brand-orange to-orange-600 text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all min-w-[76px]"
          aria-label="Book a Repair"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-0.5 text-white">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
            {isAr ? 'احجز الآن' : 'Book Fix'}
          </span>
        </button>

        {/* Directions */}
        <a
          href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-blue active:scale-95 transition-all text-center min-w-[58px]"
          aria-label="Find Location"
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-0.5 text-slate-700 dark:text-slate-300">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {isAr ? 'الموقع' : 'Location'}
          </span>
        </a>

        {/* Diagnostic Bot */}
        <button
          onClick={onOpenDiagnostic}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-orange active:scale-95 transition-all text-center min-w-[58px]"
          aria-label="AI Diagnostic Bot"
        >
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-0.5 text-brand-blue dark:text-blue-400 relative">
            <Bot className="w-4 h-4" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {isAr ? 'فحص ذكي' : 'AI Help'}
          </span>
        </button>

      </div>
    </div>
  );
}
