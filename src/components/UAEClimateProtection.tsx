import React from 'react';
import { motion } from 'motion/react';
import { Sun, Wind, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';

const climateRisks = [
  {
    icon: Sun,
    title: "50°C Extreme Heat",
    description: "High ambient temperatures in the UAE rapidly degrade lithium-ion batteries and dry out laptop thermal paste, causing thermal throttling.",
    solution: "Premium Battery Upgrades & Liquid Metal Thermal Repasting",
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-500/20"
  },
  {
    icon: Wind,
    title: "Micro-Sand & Dust",
    description: "Fine desert sand infiltrates charging ports, speakers, and MacBook fans, causing friction, short circuits, and scratching internal components.",
    solution: "Ultrasonic Deep Cleaning & Port Refurbishment",
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-500/20"
  },
  {
    icon: Droplets,
    title: "High Coastal Humidity",
    description: "Sharjah's coastal humidity causes microscopic condensation inside poorly sealed devices, leading to logic board corrosion over time.",
    solution: "Nano-Coating Water Resistance & Board De-Oxidation",
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-500/20"
  }
];

export default function UAEClimateProtection({ onBookNow }: { onBookNow: (service?: string) => void }) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-amber-50/50 dark:from-slate-900 dark:to-slate-900 border-y border-amber-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold mb-4">
            <ShieldCheck className="w-4 h-4" />
            Sharjah Local Market Special
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">UAE Climate Device Protection</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The UAE's extreme summer heat, coastal humidity, and fine desert sand are the silent killers of electronics. We offer specialized preventative maintenance to keep your devices running cooler and longer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {climateRisks.map((risk, index) => {
            const Icon = risk.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-amber-900/5 border border-amber-100 dark:border-slate-700 relative overflow-hidden group"
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500 ${risk.bg}`}></div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 ${risk.bg} ${risk.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">
                  {risk.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 relative z-10">
                  {risk.description}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700 relative z-10">
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Our Solution</div>
                  <div className="font-bold text-brand-blue dark:text-brand-orange">
                    {risk.solution}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => onBookNow('UAE Climate Protection Package')}
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-brand-orange hover:bg-slate-800 dark:hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Book Summer Protection Package
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
