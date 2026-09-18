import React from 'react';
import { Smartphone, Battery, Droplet, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Wrench, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SamsungRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const sSeries2026 = [
    { model: "Galaxy S26 Ultra", focus: "Flex Magic Pixel alignment, Privacy Display calibration, and 200MP sensor stabilization." },
    { model: "Galaxy S26+", focus: "Battery degradation from 45W charging and frame/chassis replacement." },
    { model: "Galaxy S26 (Base)", focus: "Gorilla Glass Victus 2 screen replacement and charging port wear." }
  ];

  const zSeries2026 = [
    { model: "Galaxy Z Fold 7", focus: "Ultra-thin internal display precision adhesive handling. Sonic cleaning for Sharjah sand in hinges." },
    { model: "Galaxy Z Flip 7", focus: "Impact damage on 4.1\" FlexWindow. Hinge 'digital detox' sensor calibration." },
    { model: "Galaxy Z TriFold", focus: "Complex multi-hinge synchronization and specialized FPC ribbon cable replacement." }
  ];

  const aSeries2026 = [
    { model: "Galaxy A56 5G", focus: "50MP triple-camera array repairs and 5000 mAh battery swaps." },
    { model: "Galaxy A36 5G", focus: "OS re-installs and screen digitizer repairs for the 6.7\" Super AMOLED." },
    { model: "Galaxy A17 5G", focus: "90Hz display fixes and USB-C port replacements." }
  ];

  const legacyModels = [
    "Galaxy S25 / S24 / S23 Series",
    "Galaxy S22 / S21 / S20 Series",
    "Galaxy Note 20 / Note 10 Series",
    "Galaxy Z Fold 6 / 5 / 4",
    "Galaxy Z Flip 6 / 5 / 4",
    "Older A & J Series Models"
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "image": "https://allsharq.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Muwaileh",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      },
      "telephone": "+971507117043"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Samsung Galaxy repair Sharjah",
      "serviceType": "Smartphone Repair",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC"
      },
      "areaServed": {
        "@type": "City",
        "name": "Sharjah"
      },
      "description": "Expert repair for Samsung Galaxy S26 Ultra, Z Fold 7, and A-Series in UAE. Screen, battery, and logic board replacements.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AED",
        "lowPrice": "150"
      }
    },
    {
      "@context": "https://schema.org",
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
          "name": "Samsung Galaxy repair Sharjah"
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/samsung-repair" />
        <title>Samsung Galaxy repair Sharjah | S26, Z Fold 7, A Series | Al Sharq</title>
        <meta name="description" content="Expert Samsung Galaxy repair in Sharjah for 2026 models including S26 Ultra, Z Fold 7, Z TriFold, and A56. Specialized in Privacy Display calibration and hinge cleaning." />
        <meta name="keywords" content="Samsung Galaxy repair Sharjah, Samsung screen replacement Muwaileh, Z Fold repair Sharjah, Samsung original parts UAE" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/phone-repair' },
            { label: 'Samsung Galaxy repair Sharjah' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" 
                  alt="Samsung Logo" 
                  className="h-6 object-contain filter dark:invert"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Samsung Galaxy repair Sharjah
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Ready for the 2026 Ecosystem
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
                From the groundbreaking <strong>Galaxy S26 Ultra</strong> with its Ambient Island camera, to the complex mechanics of the <strong>Z TriFold</strong>, Al Sharq Mobile Phone & Computer Trading LLC is equipped with the specialized jigs and clean-room environments required for modern Samsung repairs in Sharjah.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onBookNow('Samsung Repair')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
                >
                  Book a Repair
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-800"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=2070&fm=webp" 
                alt="Samsung Galaxy Repair" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    <span className="font-bold">2026 Certified Lab</span>
                  </div>
                  <p className="text-sm text-slate-200">Equipped for Privacy Display calibration and multi-hinge synchronization.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sharjah Specific Issues */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Common 2026 Technical Issues in Sharjah</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Privacy Display Malfunction</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The S26 Ultra’s new privacy layer can sometimes glitch. We provide software re-calibration via specialized diagnostic tools to restore perfect viewing angles.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Foldable Hinge Debris</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Despite IP48 ratings, fine sand from Sharjah winds can occasionally enter the hinge mechanism of the Z Fold 7. We perform deep sonic cleaning to prevent permanent damage.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI Feature Lag</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Older models (S22/S23) struggling with the 2026 Galaxy AI suite often need a NAND Flash optimization or memory expansion to run smoothly.
                </p>
              </motion.div>
            </div>
          </div>

          {/* 2026 Models Breakdown */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">2026 Model Repair Focus</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Advanced engineering requires advanced repair techniques. Here is what we focus on for the latest devices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* The Flagship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col"
              >
                <div className="bg-brand-blue p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-6 h-6 text-brand-orange" />
                    <h4 className="text-xl font-bold">The Flagship: S26 Series</h4>
                  </div>
                  <p className="text-blue-100 text-sm">Featuring the new "Ambient Island" camera housing.</p>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-6">
                    {sSeries2026.map((item, idx) => (
                      <li key={idx} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                        <div className="font-bold text-gray-900 dark:text-white mb-1">{item.model}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span>{item.focus}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* The Foldables */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col"
              >
                <div className="bg-slate-900 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className="w-6 h-6 text-brand-orange" />
                    <h4 className="text-xl font-bold">The Foldables: Z Series</h4>
                  </div>
                  <p className="text-slate-300 text-sm">Requires specialized jigs and clean-room environments.</p>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-6">
                    {zSeries2026.map((item, idx) => (
                      <li key={idx} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                        <div className="font-bold text-gray-900 dark:text-white mb-1">{item.model}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span>{item.focus}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* The Mid-Range */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col"
              >
                <div className="bg-brand-orange p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Battery className="w-6 h-6 text-white" />
                    <h4 className="text-xl font-bold">Performance: A Series</h4>
                  </div>
                  <p className="text-orange-100 text-sm">The go-to models for students in University City.</p>
                </div>
                <div className="p-6 flex-1">
                  <ul className="space-y-6">
                    {aSeries2026.map((item, idx) => (
                      <li key={idx} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                        <div className="font-bold text-gray-900 dark:text-white mb-1">{item.model}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span>{item.focus}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Legacy Support */}
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 text-center mb-16 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">We Still Support Legacy Models</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {legacyModels.map((model, idx) => (
                <span key={idx} className="px-4 py-2 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600">
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Frequently Asked Questions</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "Can you fix the screen on a Samsung Galaxy Z Fold or Z Flip?",
                  a: "Yes, we specialize in foldable screen repairs. Our lab is equipped with the necessary tools to safely remove and replace the ultra-thin glass (UTG) displays without damaging the hinge mechanism."
                },
                {
                  q: "Are your Samsung replacement parts genuine?",
                  a: "We use high-quality OEM (Original Equipment Manufacturer) parts for Samsung repairs to ensure the best performance, especially for AMOLED displays and batteries."
                },
                {
                  q: "My Samsung phone is stuck on the logo screen. Can you fix it?",
                  a: "Yes, this is often a software issue or a failing battery/logic board. We can perform a diagnostic to identify the exact cause and resolve the boot loop."
                },
                {
                  q: "Is my device still waterproof after a repair?",
                  a: "While we use original-spec adhesives to reseal your device, we cannot guarantee the original IP water resistance rating after the device has been opened. We recommend keeping it away from water."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button 
              onClick={() => onBookNow('Samsung Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
