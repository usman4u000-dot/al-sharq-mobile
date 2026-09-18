import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

export default function LaptopRepairSliderSection() {
  const laptopImages = [
    {
      url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=2070&fm=webp",
      alt: "Professional Laptop Repair",
      caption: "Expert Logic Board Micro-Soldering"
    },
    {
      url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=2070&fm=webp",
      alt: "Laptop Screen Replacement",
      caption: "Fast Screen Replacements for All Brands"
    },
    {
      url: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=2074&fm=webp",
      alt: "MacBook Repair",
      caption: "Specialized MacBook Repair & Support"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Premium Laptop & MacBook Repair in Sharjah
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              From broken screens to complex logic board micro-soldering, our expert technicians handle it all. We provide fast, reliable, and guaranteed repairs for all major laptop brands including Apple, Dell, HP, Lenovo, and Asus.
            </p>
            <Link 
              to="/laptop-repair"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Explore Laptop Services <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ImageCarousel images={laptopImages} autoPlayInterval={4000} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
