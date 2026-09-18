import React from 'react';
import { Gamepad2, Battery, Cpu, ShieldCheck, CheckCircle2, ChevronRight, ArrowRight, Zap, Fan } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import ExpressFixBanner from '../components/ExpressFixBanner';

export default function GamingPhoneRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const brands = [
    {
      name: "ASUS ROG Phone Series",
      features: ["AeroActive Cooler Port Repair", "Ultrasonic AirTrigger Calibration", "Dual-Cell Battery Replacement"]
    },
    {
      name: "Nubia RedMagic Series",
      features: ["Built-in Mechanical Cooling Fan Repair", "Shoulder Trigger Replacement", "Liquid Cooling System Diagnostics"]
    },
    {
      name: "Black Shark Series",
      features: ["Magnetic Pop-up Trigger Repair", "120W Hyper Charge Port Fix", "Motherboard Thermal Paste Reapplication"]
    },
    {
      name: "Lenovo Legion Duel",
      features: ["Side-Mounted Pop-up Camera Repair", "Dual Type-C Port Replacement", "Vapor Chamber Cooling Fixes"]
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/gaming-phone-repair" />
        <title>Gaming Phone Repair Sharjah | ROG, RedMagic | Al Sharq</title>
        <meta name="description" content="Specialized repair for gaming smartphones in Sharjah. We fix ASUS ROG, Nubia RedMagic, and Black Shark devices, including cooling fans and ultrasonic triggers." />
        <meta name="keywords" content="Gaming phone repair Sharjah, ASUS ROG repair UAE, Nubia RedMagic screen replacement, Black Shark battery fix, mobile gaming repair Muwaileh" />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/phone-repair' },
            { label: 'Gaming Phones' }
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Gamepad2 className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Gaming Phone Repair
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                ASUS ROG, Nubia RedMagic & More
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Mobile gaming is massive in the UAE, and gaming phones have unique, complex hardware that standard repair shops won't touch. From built-in mechanical cooling fans to ultrasonic shoulder triggers and dual-cell batteries, Al Sharq Mobile has the specialized expertise to get you back in the game.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://picsum.photos/seed/gaming-phone-repair/800/600" 
                alt="Gaming Phone Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <ExpressFixBanner onBookNow={onBookNow} />

          <div className="text-center mb-12 mt-20">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Supported Gaming Hardware</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Gamepad2 className="w-6 h-6 text-brand-orange" />
                  {brand.name}
                </h4>
                <ul className="space-y-4">
                  {brand.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Trust Us With Your Gaming Rig?</h3>
                <p className="text-blue-100 text-lg mb-8">
                  Gaming phones are built differently. They have vapor chambers, active cooling fans, and complex motherboard layouts to handle extreme heat. Opening an ASUS ROG phone without knowing the exact layout of the AirTriggers will permanently damage the device.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Fan className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Active Cooling System Restoration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Ultrasonic Trigger Calibration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Battery className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Dual-Cell Battery Syncing</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img loading="lazy" src="https://picsum.photos/seed/gaming-motherboard/600/600" alt="Gaming Motherboard" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold mb-1">Zero</p>
                  <p className="text-sm font-medium">Thermal Throttling</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button 
              onClick={() => onBookNow('Gaming Phone Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book Gaming Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
