import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Smartphone, Laptop, Cpu, Settings, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onBookNow: () => void;
}

const FloatingElement = ({ children, delay = 0, yRange = 20, duration = 4, className = "" }: any) => (
  <motion.div
    animate={{ y: [0, -yRange, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute ${className}`}
  >
    {children}
  </motion.div>
);

export default function Hero({ onBookNow }: HeroProps) {
  const [bgImage] = useState('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=2070&fm=webp');
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="relative bg-brand-blue dark:bg-slate-950 overflow-hidden min-h-[500px] sm:min-h-[640px] lg:min-h-[700px] flex items-center transition-colors duration-300 text-start">
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/95 to-brand-blue/75 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/75 z-10" />
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ 
            scale: [1.05, 1.15, 1.05],
            filter: ["brightness(1)", "brightness(1.05)", "brightness(1)"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          src={bgImage}
          alt="Technician repairing a phone"
          className="w-full h-full object-cover opacity-25"
          style={{ transformOrigin: 'center center' }}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Animated Particles / Highlights */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-orange/15 rounded-full blur-[90px] mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/15 rounded-full blur-[90px] mix-blend-screen"></div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-[11px] sm:text-sm font-medium mb-3 sm:mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-green-400 relative"></span>
              <span>{isAr ? 'المختبر الأكثر تطوراً في الشارقة' : "Sharjah's Most Advanced Repair Lab"}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 sm:mb-6 tracking-tight">
              {isAr ? 'خبراء إصلاح الهواتف والكمبيوتر' : 'Fast, Certified Device Repairs'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 text-xl sm:text-3xl md:text-4xl lg:text-5xl block mt-1 sm:mt-2">
                {isAr ? 'إصلاح الهواتف واللابتوب في نفس اليوم' : 'Same-Day Mobile & Laptop Care in Sharjah'}
              </span>
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-gray-300 mb-5 sm:mb-8 max-w-xl leading-relaxed font-normal">
              {isAr 
                ? 'مركز الإصلاح الشامل في مويلح، الشارقة. من استبدال شاشات الآيفون وسامسونج إلى صيانة بوردات الماك بوك واستعادة البيانات المفقودة، بأعلى معايير الجودة وضمان 90 يوماً.'
                : 'Muwaileh’s premier electronics repair center. From cracked iPhone and Samsung screens to MacBook logic board micro-soldering and secure data recovery, backed by a 90-day warranty.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4"
          >
            <MagneticButton 
              onClick={onBookNow}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-500 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all shadow-[0_8px_30px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 active:scale-95"
              strength={30}
            >
              <span>{isAr ? 'احجز موعد إصلاح' : 'Book a Repair'}</span>
              <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isAr ? 'rotate-180' : ''}`} />
            </MagneticButton>
            <MagneticButton 
              onClick={onBookNow}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 active:scale-95"
              strength={20}
            >
              <span>{isAr ? 'حساب تكلفة الإصلاح' : 'Get Free Estimate'}</span>
            </MagneticButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 text-gray-300 text-xs sm:text-sm font-medium pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 shrink-0">
                <Smartphone className="h-4 w-4 text-brand-orange" />
              </div>
              <span className="leading-tight">{isAr ? 'إصلاح فوري' : 'Same-Day Fix'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 shrink-0">
                <Laptop className="h-4 w-4 text-brand-orange" />
              </div>
              <span className="leading-tight">{isAr ? 'ماك وويندوز' : 'Mac & PC Pro'}</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Creative Elements (Hidden on small screens) */}
        <div className="hidden lg:block relative h-full min-h-[500px]">
          <FloatingElement delay={0} yRange={25} duration={5} className="top-10 left-10">
            <div className="w-32 h-32 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl">
              <Cpu className="w-12 h-12 text-brand-orange/80" />
            </div>
          </FloatingElement>
          
          <FloatingElement delay={1.5} yRange={30} duration={6} className="top-40 right-0">
            <div className="w-48 h-48 bg-brand-orange/10 border border-brand-orange/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)] transform rotate-12">
              <Smartphone className="w-20 h-20 text-brand-orange/90" />
            </div>
          </FloatingElement>
          
          <FloatingElement delay={0.8} yRange={15} duration={4} className="bottom-10 left-1/4 z-30">
            <div className="w-40 h-40 bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg -rotate-12">
              <Settings className="w-16 h-16 text-blue-400/80 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </FloatingElement>

          {/* Central glowing orb */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/40 border-2 border-brand-orange/30 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_rgba(249,115,22,0.3)]"
          >
            <Zap className="w-16 h-16 text-brand-orange" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
