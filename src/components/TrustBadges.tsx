import React from 'react';
import { Gem, Zap, Scroll, Trophy, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Gem,
      title: "Genuine Parts",
      description: "We source high-quality components through our trading division to ensure factory-level performance."
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Most screen and battery repairs are completed in 30–60 minutes while you wait in-store."
    },
    {
      icon: Scroll,
      title: "90-Day Warranty",
      description: "Every repair is backed by our signature warranty, giving you total peace of mind and technical support."
    },
    {
      icon: Trophy,
      title: "12+ Years Exp.",
      description: "Established in 2014, our senior technicians have repaired thousands of devices across the UAE."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-4 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-brand-orange" />
            The Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) Guarantee
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Why Sharjah has trusted us since 2014
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 12, 
                delay: index * 0.1 
              }}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 mx-auto bg-brand-blue/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                <badge.icon className="w-8 h-8 text-brand-blue dark:text-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                {badge.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
