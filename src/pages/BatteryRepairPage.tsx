import React from 'react';
import { Battery, Zap, Thermometer, ShieldCheck, CheckCircle2, ArrowRight, Activity, Plug, Laptop, Flame, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

export default function BatteryRepairPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Advanced Battery & Power Solutions Sharjah",
        "provider": BUSINESS_PROVIDER_SCHEMA,
        "description": "High-Capacity, Heat-Resistant Silicon-Carbon battery replacements for iPhone 18, iPhone 17, Samsung S26, and MacBooks in Sharjah.",
        "areaServed": ["Sharjah", "Dubai", "Ajman"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://allsharq.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Repairs",
            "item": "https://allsharq.com/repairs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Battery Repair"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/battery-repair" />
        <title>Advanced Battery & Power Solutions | Sharjah | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="High-Capacity, Heat-Resistant Power Solutions. Silicon-Carbon (Si-C) battery replacements for iPhone 17, Samsung S26, and MacBooks." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/phone-repair' },
            { label: 'Battery Repair' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Battery className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Advanced Battery & Power Solutions
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Serving Sharjah with High-Capacity, Heat-Resistant Power Solutions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                In 2026, battery technology has evolved with Silicon-Carbon (Si-C) anodes, allowing for thinner phones with much higher capacities. However, these batteries are highly sensitive to the UAE’s extreme heat. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we don't just "swap" batteries; we perform a full Power Management Audit.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
              >
                Book a Battery Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=2070&auto=format&fit=crop" 
                alt="Advanced Battery Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="text-white font-medium flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-orange" />
                    Ensure your device stays powered throughout the day with our 2026-spec Si-C batteries.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 space-y-8">
              {/* 1. Silicon-Carbon */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="w-7 h-7 text-brand-blue dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-white">
                    1. Silicon-Carbon (Si-C) High-Density Replacements
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">For the latest iPhone 17 and Samsung S26 models, we use 2026-spec Si-C batteries. These provide:</p>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Battery className="w-5 h-5 text-brand-orange" />
                      Higher Energy Density
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">More power in the same slim profile, extending your daily usage significantly.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-brand-orange" />
                      Rapid-Charge Compatibility
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Fully compatible with 100W+ ultra-fast charging protocols without degrading the cell.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-brand-orange" />
                      Heat Threshold
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Designed to operate safely even during peak Sharjah summer temperatures.</p>
                  </div>
                </div>
              </motion.div>

              {/* 2. MacBook & Laptop Battery */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Laptop className="w-7 h-7 text-brand-blue dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-white">
                    2. MacBook & Laptop Battery Restoration
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-brand-orange" />
                      MacBook M4 Series
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We replace the adhesive-heavy batteries in the latest M4 Pro/Max models using specialized removal tools that protect the logic board.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <RefreshCcw className="w-5 h-5 text-brand-orange" />
                      Cycle-Count Reset
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We ensure the system correctly recognizes the new battery for accurate health reporting.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-brand-orange" />
                      Bloated Battery Safety
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Professional removal and eco-friendly disposal of swollen batteries to prevent fire hazards and chassis warping.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              {/* Battery Health Diagnostic Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-blue rounded-3xl p-8 text-white shadow-xl sticky top-32"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="text-2xl font-bold mb-6">The "Battery Health" Diagnostic</h4>
                <p className="text-blue-100 mb-8">Every battery service at our Sharjah shop includes a free Power Audit:</p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Plug className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Charging Port Inspection</strong>
                      <span className="text-sm text-blue-200">Cleaning and testing for current stability.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Activity className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Power IC Test</strong>
                      <span className="text-sm text-blue-200">Ensuring the motherboard isn't "leaking" power, which causes fast drainage.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Thermometer className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Thermal Protection Seal</strong>
                      <span className="text-sm text-blue-200">Applying new heat-dissipating tape to keep the battery cool.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Pricing Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Battery Service Pricing (2026 Sharjah Market)</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400">
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Device Category</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Service Type</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Estimated Price (AED)</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Turnaround Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPhone 17 / 16 Series</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Genuine Cell + Gasket</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">350 – 480</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day (1 hr)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Samsung S26 / S25 Series</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">High-Density Si-C Replacement</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">300 – 450</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day (1 hr)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">MacBook Air/Pro (M-Series)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Original Capacity Battery</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">450 – 750</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">3 – 5 Hours</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Windows Gaming Laptops</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">High-Wattage Battery Replacement</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">350 – 550</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPad Pro (M2/M3/M4)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Full Battery Assembly</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">450 – 650</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">1 Day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a 
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq%20LLC,%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20[Device%20Model]."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
    </>
  );
}
