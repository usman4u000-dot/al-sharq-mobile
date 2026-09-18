import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function BehindTheScenesVideo() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
              Behind the Scenes at Al Sharq
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Step inside our state-of-the-art Muwaileh lab and see how our certified technicians bring your devices back to life.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          <div className="aspect-video relative">
            <img
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop&fm=webp"
              alt="Behind the scenes at Al Sharq Mobile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/40 group-hover:bg-brand-blue/30 transition-colors duration-300 flex items-center justify-center">
              <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/30 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
