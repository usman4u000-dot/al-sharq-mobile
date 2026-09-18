import React, { useMemo } from 'react';
import { Smartphone, Smile, Award, Star, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

export default function Achievements() {
  const stats = useMemo(() => {
    // Base date for calculation (e.g., Jan 1, 2024)
    const baseDate = new Date('2024-01-01').getTime();
    const currentDate = new Date().getTime();
    
    // Calculate days passed since base date
    const daysPassed = Math.floor((currentDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // Base values
    const baseRepaired = 12000;
    const baseHappy = 10000;
    
    // Increment by 1+ per day (e.g., 2 devices repaired per day, 1 happy customer per day)
    const currentRepaired = baseRepaired + (daysPassed * 2);
    const currentHappy = baseHappy + daysPassed;

    return [
      {
        icon: Smartphone,
        numericValue: currentRepaired / 1000,
        suffix: "K+",
        decimals: 1,
        label: "Devices Repaired",
        description: `Over ${currentRepaired.toLocaleString()}+ devices repaired since 2014 by our certified technicians.`
      },
      {
        icon: Smile,
        numericValue: currentHappy / 1000,
        suffix: "K+",
        decimals: 1,
        label: "Happy Customers",
        description: `More than ${currentHappy.toLocaleString()} customers trust Al Sharq Mobile Phone for reliable mobile and phone repair in Sharjah.`
      },
      {
        icon: Award,
        numericValue: 12,
        suffix: "+",
        decimals: 0,
        label: "Years of Experience",
        description: "Over 12 years of experience repairing smartphones, tablets, and laptops in Dubai."
      },
      {
        icon: Star,
        numericValue: 4.8,
        suffix: "",
        decimals: 1,
        label: "Rating on Google",
        description: "Rated 4.8 on Google with thousands of 5-star reviews from satisfied repair customers."
      }
    ];
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Achievements we are Proud of!
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-brand-orange mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl text-center border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-orange/20 transition-colors">
                <stat.icon className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-4xl font-bold text-brand-blue dark:text-white mb-2">
                <AnimatedCounter 
                  end={stat.numericValue} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals || 0}
                />
              </h3>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">{stat.label}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-blue dark:bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-orange/5 pattern-grid-lg opacity-20"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
              Need reliable mobile or phone repair in Sharjah? Call our team or message us on WhatsApp to book your repair today — fast service, expert technicians, and warranty included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+971507117043" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                Call Our Team
              </a>
              <a 
                href="https://wa.me/971507117043" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
