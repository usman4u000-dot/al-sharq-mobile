import React from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldHalf, TrendingDown, Users } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: "Dedicated Account Manager",
    description: "Get a single point of contact for all your business repair needs, invoicing, and fleet status updates."
  },
  {
    icon: TrendingDown,
    title: "Volume Pricing Tiers",
    description: "Save up to 35% on standard repair costs with our corporate volume-based pricing structures."
  },
  {
    icon: ShieldHalf,
    title: "Priority 24hr SLA",
    description: "Business devices get bumped to the front of the queue. Essential for POS iPads and delivery driver phones."
  },
  {
    icon: Users,
    title: "Employee Discount Program",
    description: "Extend our corporate discount to your employees' personal devices as an added employee benefit."
  }
];

export default function CorporateFleetRepair() {
  return (
    <section className="py-24 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/30 text-blue-300 rounded-full text-sm font-bold mb-6 border border-brand-blue/50">
              <Building2 className="w-4 h-4" />
              B2B & Enterprise Solutions
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Corporate Fleet IT & <span className="text-brand-orange">Mobile Repair</span>
            </h2>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              From delivery driver smart phones to retail point-of-sale tablets and office MacBooks, downtime costs your business money. Al Sharq Mobile provides priority enterprise repair contracts across Sharjah and Dubai.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/25">
              Request Corporate Brochure
            </button>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1200" 
                alt="Corporate business professionals in a meeting" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-2xl font-black text-white">45+</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Local Businesses</h4>
                    <p className="text-slate-300 text-sm">Trust Al Sharq with their tech fleets</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
