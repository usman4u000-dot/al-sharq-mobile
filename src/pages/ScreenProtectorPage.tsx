import React from 'react';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

interface ScreenProtectorPageProps {
  onBookNow: (serviceName?: string) => void;
}

export default function ScreenProtectorPage({ onBookNow }: ScreenProtectorPageProps) {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/screen-protector" />
        <title>Premium Screen Protectors | Al Sharq Mobile Phone</title>
        <meta name="description" content="Protect your device with our premium 9H tempered glass and hydrogel screen protectors. Expert installation included at our Sharjah store." />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Shop', path: '/shop' },
            { label: 'Screen Protectors' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Premium Screen Protection
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                Don't wait for a cracked screen. Secure your investment with our military-grade 9H tempered glass and advanced hydrogel films. Expert, bubble-free installation included.
              </p>
              <button 
                onClick={() => onBookNow('Screen Protector Installation')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
              >
                Book Installation
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=1000" 
                alt="Applying screen protector on smartphone" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white text-lg font-medium">Precision, bubble-free application every time.</p>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-4">9H Tempered Glass</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Maximum scratch and drop resistance. Feels exactly like your original screen.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Shatter-proof</li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Oleophobic coating</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-4">Hydrogel Film</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Self-healing technology perfect for curved screens and seamless edge-to-edge coverage.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Self-healing scratches</li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Ultra-thin profile</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-4">Privacy Glass</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Keep your sensitive information safe from prying eyes while protecting your screen.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> 28° viewing angle</li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-brand-orange" /> Anti-glare finish</li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}
