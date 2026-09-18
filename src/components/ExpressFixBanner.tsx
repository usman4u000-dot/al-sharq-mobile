import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface ExpressFixBannerProps {
  onBookNow: (serviceName?: string) => void;
}

export default function ExpressFixBanner({ onBookNow }: ExpressFixBannerProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-brand-blue to-blue-900 dark:from-slate-900 dark:to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop&fm=webp')] bg-cover bg-center mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-semibold text-sm mb-4 border border-brand-orange/30">
              <Zap className="w-4 h-4 fill-current" />
              <span>1-Hour Turnaround</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              The "Express Fix" Screen Replacement
            </h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Need it fast? Get your mobile screen replaced in under an hour. Prices start as low as <span className="font-bold text-brand-orange">AED 150</span> for budget-friendly devices, with highly competitive rates for flagship OLED screens (Samsung & iPhone).
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-5 h-5 text-brand-orange" />
                <span>60-Minute Service</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span>Warranty Included</span>
              </div>
            </div>
            
            <button 
              onClick={() => onBookNow('Express Fix Screen Replacement')}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-brand-orange/25"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=1000&auto=format&fit=crop&fm=webp" 
                alt="Express Mobile Screen Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent flex flex-col justify-end p-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">AED 150</div>
                  <div className="text-sm text-blue-200">Starting Price</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
