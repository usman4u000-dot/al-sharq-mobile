import React from 'react';
import { Truck, GraduationCap, CreditCard, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const perks = [
  {
    icon: Truck,
    title: "Free Pick-up & Delivery",
    description: "Available across Sharjah (Al Majaz, Muwaileh, Al Qasimia). We collect, repair, and return your device to your doorstep.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    icon: GraduationCap,
    title: "University City Discounts",
    description: "Special 15% discount on all repairs for students of AUS, UoS, and HCT. Just show your university ID.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    icon: CreditCard,
    title: "Buy Now, Pay Later",
    description: "Split your repair or purchase cost into 4 interest-free payments using Tabby or Tamara.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    icon: Clock,
    title: "Late Night Support",
    description: "We understand emergencies happen. Open till midnight on weekends for all your urgent tech crises.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  }
];

export default function LocalMarketPerks() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue dark:text-white mb-6">Built for Sharjah</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We've tailored our services to meet the fast-paced, digital lifestyle of the UAE. Enjoy these exclusive local perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${perk.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {perk.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {perk.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
         <div className="inline-flex items-center gap-6 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-full shadow-md">
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-sm">Accepted Here:</span>
            <div className="flex gap-4">
              {/* Tabby Logo Placeholder */}
              <div className="h-8 flex items-center">
                 <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">tabby</span>
              </div>
              {/* Tamara Logo Placeholder */}
              <div className="h-8 flex items-center">
                 <span className="font-black text-2xl tracking-tighter text-[#E58869]">tamara</span>
              </div>
            </div>
         </div>
        </div>
      </div>
    </section>
  );
}
