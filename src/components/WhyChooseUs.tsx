import React from 'react';
import { ShieldCheck, Award, Clock, PenTool, Search, ShoppingBag, Zap, Layers } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Search,
    title: 'Expert Diagnosis',
    description: 'We use state-of-the-art diagnostic tools to find the root cause of your tech troubles.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Quality',
    description: 'As an established Trading LLC, we source only the most reliable parts and premium accessories.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Get your device back fast with our same-day service for most common repairs.',
  },
  {
    icon: Layers,
    title: 'Full Spectrum Service',
    description: 'Whether you need a screen fix, a new gaming rig, or a rugged phone case, we are your one-stop shop.',
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-12 sm:py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-brand-orange font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2">Why Choose Us</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-3 sm:mb-4">The Al Sharq Service Advantage</h3>
          <p className="text-xs sm:text-base text-brand-grey dark:text-gray-400 max-w-2xl mx-auto">
            Licensed tech workshop in Muwaileh, Sharjah. Here is why university students, professionals, and families trust us with their devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="relative group/tooltip inline-block">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange transition-colors cursor-help shadow-sm group-hover/tooltip:shadow-md">
                  <feature.icon className="h-8 w-8" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-2 bg-slate-800 dark:bg-slate-700 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10 shadow-xl">
                  {feature.title}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700"></div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-3">{feature.title}</h4>
              <p className="text-brand-grey dark:text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
