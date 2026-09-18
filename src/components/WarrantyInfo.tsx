import React from 'react';
import { Shield, CheckCircle, Clock, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function WarrantyInfo() {
  const warrantyFeatures = [
    {
      icon: Clock,
      title: "90-Day Repair Warranty",
      description: "All our repairs come with a standard 90-day warranty covering parts and labor for the specific repair performed."
    },
    {
      icon: Shield,
      title: "6-Month Pre-Owned Device Warranty",
      description: "Every certified pre-owned device we sell includes a 6-month warranty against hardware defects."
    },
    {
      icon: CheckCircle,
      title: "Hassle-Free Claims",
      description: "If you experience an issue covered by our warranty, simply bring your device and receipt to our store for a prompt resolution."
    },
    {
      icon: AlertTriangle,
      title: "Warranty Exclusions",
      description: "Physical damage, liquid damage, and unauthorized modifications after our repair or sale will void the warranty."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605171399453-38ca8e252bd9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center p-4 bg-brand-orange/20 rounded-full mb-6 relative">
              {/* Flashing effect behind the icon */}
              <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-20"></div>
              <Zap className="w-12 h-12 text-brand-orange animate-pulse drop-shadow-[0_0_15px_rgba(242,125,38,0.8)]" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
              The Al Sharq Mobile Phone & Computer Trading LLC <br className="hidden md:block" />
              <span className="text-brand-orange">(Techfix & Gidgets)</span> Guarantee
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We stand behind our work and our products. Our transparent warranty policies ensure you have peace of mind long after you leave our store.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {warrantyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 flex items-start gap-6 hover:bg-white/10 transition-colors duration-300 group"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                <feature.icon className="w-7 h-7 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
