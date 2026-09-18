import React from 'react';
import { motion } from 'motion/react';
import { Car, Clock, ShieldCheck, Star } from 'lucide-react';

const features = [
  {
    icon: Car,
    title: "Mobile Repair Lab",
    description: "Our fully-equipped, climate-controlled service vans come directly to your home or office anywhere in Sharjah & Dubai."
  },
  {
    icon: Clock,
    title: "45-Minute Express Fix",
    description: "Most iPhone screens, Samsung batteries, and iPad and MacBook minor repairs are completed in under an hour."
  },
  {
    icon: ShieldCheck,
    title: "Data Privacy Guaranteed",
    description: "Your device never leaves your sight. Watch our certified technicians complete the repair in real-time."
  },
  {
    icon: Star,
    title: "VIP White-Glove Service",
    description: "Trained elite technicians dedicated to handling high-net-worth clients and premium flagship devices."
  }
];

export default function VIPDoorstepRepair({ onBookNow }: { onBookNow?: (service?: string) => void }) {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-y border-brand-orange/20 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6 border border-brand-orange/20">
            <Star className="w-4 h-4" />
            Premium Service Offering
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue dark:text-white mb-6">
            VIP Doorstep Repair
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Too busy to visit our service center? Let Al Sharq Mobile bring the repair lab to you. Experience seamless, secure, and instant device repair at your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl bg-brand-blue dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Book Your VIP Concierge Technician Today</h3>
              <p className="text-blue-100 dark:text-slate-300 mb-8 max-w-xl mx-auto">
                Select "VIP Doorstep Repair" when booking your service, and a specialized technician will be dispatched to your location with all necessary genuine parts.
              </p>
              <button 
                onClick={() => onBookNow?.('VIP Doorstep Repair Service')}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/25"
              >
                <Car className="w-5 h-5" />
                Request VIP Doorstep Service
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
