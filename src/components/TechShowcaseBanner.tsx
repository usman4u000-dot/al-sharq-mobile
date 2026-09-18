import React from 'react';
import { motion } from 'motion/react';
import { Camera, Cpu, Battery, Shield, Zap, Maximize, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingTag = ({ 
  children, 
  delay = 0, 
  icon: Icon, 
  position,
  iconRight = false
}: { 
  children: React.ReactNode, 
  delay?: number, 
  icon?: any, 
  position: string,
  iconRight?: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: "spring", bounce: 0.5 }}
    className={`absolute ${position} z-20 hidden md:flex`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 py-2 px-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white hover:bg-white/20 transition-colors cursor-default"
    >
      {!iconRight && Icon && (
        <div className="p-1.5 bg-brand-orange/20 rounded-full shrink-0">
          <Icon className="w-4 h-4 text-brand-orange" />
        </div>
      )}
      <span className="font-semibold text-sm tracking-wide whitespace-nowrap">{children}</span>
      {iconRight && Icon && (
        <div className="p-1.5 bg-brand-orange/20 rounded-full shrink-0">
          <Icon className="w-4 h-4 text-brand-orange" />
        </div>
      )}
    </motion.div>
  </motion.div>
);

const FeatureBar = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl transition-all"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h4 className="text-white font-bold text-sm tracking-widest uppercase">{title}</h4>
      <p className="text-orange-100/70 text-xs mt-0.5">{desc}</p>
    </div>
  </motion.div>
);

export default function TechShowcaseBanner() {
  const { language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24 bg-slate-900 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-brand-orange/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[60%] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#FF5A1F] to-[#CC3A00] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 overflow-hidden relative shadow-[0_20px_50px_rgba(255,90,31,0.3)] border border-orange-400/30 min-h-[480px] md:min-h-[600px] flex flex-col md:flex-row shadow-inner">
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[12rem] md:text-[20rem] font-bold text-white/5 whitespace-nowrap pointer-events-none select-none tracking-tighter mix-blend-overlay font-black">
            ULTRA
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full relative z-10 h-full">
            
            {/* Left Content Area (Text & Specs) */}
            <div className={`flex flex-col justify-center ${isRtl ? 'order-2 md:order-2 text-right' : 'order-2 md:order-1'}`}>
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" /> {isRtl ? 'أحدث التقنيات' : 'Next-Gen Technology'}
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
                  {isRtl ? 'المستقبل' : 'THE FUTURE'} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-white">
                    {isRtl ? 'بين يديك الآن.' : 'IS HERE.'}
                  </span>
                </h2>
                
                <p className="text-orange-100/90 text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8 max-w-md drop-shadow-md">
                  {isRtl 
                    ? 'اكتشف أداءً استثنائياً ومتانة لا تضاهى مع حلول الصيانة الاحترافية المعتمدة في الشارقة.' 
                    : 'Experience revolutionary performance, unparalleled durability, and AI-driven intelligence.'}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 gap-3 max-w-sm">
                  <FeatureBar icon={Cpu} title={isRtl ? 'معالجات فائقة الأداء' : 'A19 PRO CHIP'} desc={isRtl ? 'قوة صيانة ومعالجة متطورة' : 'Next-gen gaming power.'} />
                  <FeatureBar icon={Camera} title={isRtl ? 'كاميرات وشاشات احترافية' : '200MP PRO-VISUAL'} desc={isRtl ? 'قطع أصلية ومعايرة ألوان 100%' : 'Perfect focus. Every time.'} />
                  <FeatureBar icon={Maximize} title={isRtl ? 'شاشات فائقة الوضوح' : '4K DOLBY VISION'} desc={isRtl ? 'شاشات نقية بأعلى معايير المصنع' : 'Cinematic quality frames.'} />
                </div>
              </motion.div>
            </div>

            {/* Right Content Area (Image & Floating Elements) */}
            <div className={`relative h-[260px] sm:h-[340px] md:h-full min-h-[260px] md:min-h-[450px] flex items-center justify-center ${isRtl ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                {/* Simulated Phone/Device Image */}
                <img 
                  src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Next Gen Smartphone"
                  className="rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-2 sm:border-4 border-white/15 w-full object-cover max-h-[280px] sm:max-h-[380px]"
                />

                {/* Floating Callouts */}
                <FloatingTag 
                  icon={Shield} 
                  position="top-[-5%] right-[-10%]" 
                  delay={0.6}
                  iconRight
                >
                  Ultra-Slim Titanium Design
                </FloatingTag>

                <FloatingTag 
                  icon={Target} 
                  position="bottom-[-5%] left-[-15%]" 
                  delay={0.8}
                >
                  World's 1st Privacy Display
                </FloatingTag>

                <FloatingTag 
                  icon={Battery} 
                  position="top-[45%] right-[-20%]" 
                  delay={1}
                  iconRight
                >
                  60W Super Fast Charging
                </FloatingTag>
                
                <FloatingTag 
                  icon={Zap} 
                  position="top-[20%] left-[-25%]" 
                  delay={1.2}
                >
                  Snapdragon 8 Elite Gen 5
                </FloatingTag>
              </motion.div>
            </div>
          </div>

          {/* Bottom feature strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-0 left-0 w-full bg-black/20 backdrop-blur-md border-t border-white/10 p-4 hidden lg:block"
          >
            <div className="flex justify-evenly items-center max-w-5xl mx-auto">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-white/70" />
                <span className="text-white/80 text-sm font-semibold tracking-wider font-mono">APP INTELLIGENCE</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-white/70" />
                <span className="text-white/80 text-sm font-semibold tracking-wider font-mono">CENTER STAGE</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-white/70" />
                <span className="text-white/80 text-sm font-semibold tracking-wider font-mono">BORN TO PROTECT</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
