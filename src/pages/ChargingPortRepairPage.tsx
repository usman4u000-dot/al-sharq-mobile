import React from 'react';
import { Plug, Smartphone, Laptop, ShieldCheck, CheckCircle2, ArrowRight, Zap, Droplet, Activity, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

export default function ChargingPortRepairPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Charging Port Repair Sharjah",
        "provider": BUSINESS_PROVIDER_SCHEMA,
        "description": "Specializing in USB-C 4.0, Thunderbolt 5, and High-Wattage Repairs for smartphones and laptops in Sharjah.",
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
            "name": "Charging Port Repair"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/charging-port-repair" />
        <title>Precision Charging Port Repair | Sharjah | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="Specializing in USB-C 4.0, Thunderbolt 5, and High-Wattage Repairs for smartphones and laptops in Sharjah." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/phone-repair' },
            { label: 'Charging Port Repair' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Plug className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Precision Charging Port & Power Rail Solutions
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Specializing in USB-C 4.0, Thunderbolt 5, and High-Wattage Repairs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                In 2026, charging ports have become high-tech hubs capable of 120W+ power delivery and high-speed data transfer. Repairing a port isn't just about a loose connection—it’s about maintaining the fast-charging integrity of modern devices. Our Precision Soldering gives us a massive advantage over mobile vans.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
              >
                Book a Port Repair
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070&auto=format&fit=crop" 
                alt="Precision Charging Port Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="text-white font-medium flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-orange" />
                    We verify every repair with professional amperage testing to ensure correct wattage draw.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 space-y-8">
              {/* 1. Smartphone USB-C */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Smartphone className="w-7 h-7 text-brand-blue dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-white">
                    1. Smartphone USB-C & Lightning Restoration
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Whether it’s the latest iPhone 17 or a Samsung S26, the charging port is the most used physical component.</p>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-brand-orange" />
                      Debris & Corrosion Extraction
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Sharjah’s humidity and dust can cause "Ghost Charging" or slow power draw. We provide professional ultrasonic cleaning to restore connection without replacing the part.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Plug className="w-5 h-5 text-brand-orange" />
                      Component-Level Port Replacement
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">If the port is physically damaged, we replace the sub-board or solder a new port directly, ensuring your Fast Charging and Data Sync remain 100% functional.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-brand-orange" />
                      Water Damage Treatment
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">If your phone warns of "Liquid in Connector," we perform a deep-clean and sensor reset to prevent a motherboard short-circuit.</p>
                  </div>
                </div>
              </motion.div>

              {/* 2. Laptop & MacBook Power Port */}
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
                    2. Laptop & MacBook Power Port Repair
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Plug className="w-5 h-5 text-brand-orange" />
                      MacBook MagSafe 3 & USB-C Restoration
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We fix loose MagSafe connections and burnt-out USB-C ports on M2, M3, and M4 MacBooks.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-brand-orange" />
                      Gaming Laptop DC Jack Repair
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">For high-power laptops (Asus ROG, HP Omen, MSI), we reinforce the charging jack to handle the high-wattage heat without melting the housing.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-brand-orange" />
                      Power IC Diagnostics
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Sometimes the port is fine, but the Charging IC on the motherboard is dead. Our Skilled Technicians specialize in these complex logic board fixes.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              {/* Connection Guarantee Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-blue rounded-3xl p-8 text-white shadow-xl sticky top-32"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="text-2xl font-bold mb-6">The Al Sharq "Connection Guarantee"</h4>
                <p className="text-blue-100 mb-8">We don't just hand back your device; we verify the repair with professional testing:</p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Zap className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Amperage Test</strong>
                      <span className="text-sm text-blue-200">We use a USB power meter to ensure your device is drawing the correct wattage (e.g., 25W, 45W, or 100W).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <LinkIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Data Continuity</strong>
                      <span className="text-sm text-blue-200">We verify that your phone or laptop connects to a computer for data transfer, not just charging.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">90-Day Warranty</strong>
                      <span className="text-sm text-blue-200">Your port is covered against loose connections or manufacturing defects.</span>
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
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Charging Port Service Pricing (2026 Sharjah Market)</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400">
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Device</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Service Type</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Price (AED)</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Turnaround</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPhone 16 / 17 Series</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">USB-C Port Replacement</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">250 – 380</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day (1 hr)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Samsung S25 / S26 Series</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Port Sub-Board Fix</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">200 – 350</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day (1 hr)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">MacBook (M-Series)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">USB-C / MagSafe Port Fix</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">450 – 700</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">3 – 5 Hours</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Windows Laptop</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">DC Jack / Type-C Soldering</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">250 – 450</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Same-Day</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Cleaning Service</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Port/Speaker Deep Clean</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">50 – 100</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">15 Mins</td>
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
