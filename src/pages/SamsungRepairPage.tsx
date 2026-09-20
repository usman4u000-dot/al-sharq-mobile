import React from 'react';
import { Smartphone, Battery, Droplet, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Wrench, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';

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
      "@type": ["LocalBusiness", "MobilePhoneStore", "RepairService"],
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "legalName": "Al Sharq Mobile Phone & Computer Trading LLC",
      "image": "https://allsharq.com/logo.png",
      "telephone": "+971507117043",
      "email": "alsharqmobile@gmail.com",
      "hasMap": "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
        "addressLocality": "Muwaileh, Sharjah",
        "addressRegion": "Sharjah",
        "postalCode": "00000",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.3123,
        "longitude": 55.4800
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Samsung Galaxy repair Sharjah",
      "serviceType": "Smartphone Repair",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC",
        "telephone": "+971507117043",
        "hasMap": "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
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
        <title>Samsung Galaxy S25, S24 Ultra & Z Fold Repair Sharjah | AMOLED Fix | Al Sharq</title>
        <meta name="description" content="Expert Samsung Galaxy repair in Sharjah for S25 Ultra, S24 Ultra, Z Fold 6, Z Flip 6, and S23. Same-day Dynamic AMOLED 2X screen replacement, UTG hinge repair, and battery fix in Muwaileh. تصليح سامسونج الشارقة." />
        <meta name="keywords" content="Samsung Galaxy repair Sharjah, Samsung S24 Ultra screen replacement, Samsung S25 Ultra repair Sharjah, Samsung Z Fold 6 hinge repair Muwaileh, Samsung original parts UAE, تصليح سامسونج الشارقة, تصليح شاشات سامسونج مويلح" />
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

          {/* Dedicated In-Depth Tech Guides & Cross-Links */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full mb-3 inline-block">
                Sharjah Technical Guides
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Samsung Galaxy Hardware Guides & Related Services
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
                Explore in-depth repair breakdowns, pricing comparisons, and maintenance tips written by our Muwaileh technicians.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/blog/samsung-galaxy-s24-ultra-s25-repair-sharjah-uae"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-brand-blue flex items-center justify-center font-bold mb-4">
                    S25
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors text-base mb-2">
                    Samsung Galaxy S24 Ultra & S25 Repair Guide
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                    Fixing Dynamic AMOLED 2X green lines, anti-reflective Gorilla Armor glass replacement, and S-Pen sensor calibration in Sharjah.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-brand-blue group-hover:text-brand-orange gap-1 group-hover:translate-x-1 transition-all">
                  Read Technical Breakdown <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link 
                to="/blog/samsung-galaxy-z-fold-6-z-flip-6-screen-crease-repair"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold mb-4">
                    Fold
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors text-base mb-2">
                    Galaxy Z Fold 6 & Z Flip 6 Hinge & Crease Repair
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                    Ultra Thin Glass (UTG) peeling restoration, sonic desert sand extraction from dual-rail hinges, and ribbon flex cable diagnostics.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-brand-blue group-hover:text-brand-orange gap-1 group-hover:translate-x-1 transition-all">
                  Read Technical Breakdown <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>

            {/* Quick Cross-Service Navigation Pills */}
            <div className="mt-8 p-6 bg-slate-100/60 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Related Repair Services:
              </span>
              <div className="flex flex-wrap gap-2">
                <Link to="/iphone-repair" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  iPhone 18 & 16 Repair
                </Link>
                <Link to="/screen-repair" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  Cracked Screen Repair
                </Link>
                <Link to="/battery-replacement" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  Battery Replacement
                </Link>
                <Link to="/charging-port-repair" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  Charging Port Repair
                </Link>
                <Link to="/trade-in" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  Device Trade-In
                </Link>
                <Link to="/screen-protector" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-orange border border-slate-200 dark:border-slate-700 transition-colors">
                  Screen Protector
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <ServiceFAQ 
              title="Frequently Asked Questions - Samsung Repair"
              pageUrl="https://allsharq.com/samsung-repair"
              faqs={[
                {
                  question: "Can you fix the screen on a Samsung Galaxy Z Fold or Z Flip?",
                  answer: "Yes, we specialize in foldable screen repairs. Our lab is equipped with the necessary tools to safely remove and replace the ultra-thin glass (UTG) displays without damaging the hinge mechanism."
                },
                {
                  question: "Are your Samsung replacement parts genuine?",
                  answer: "We use high-quality OEM (Original Equipment Manufacturer) parts and Samsung Service Packs for repairs to ensure the best performance, especially for AMOLED displays and batteries."
                },
                {
                  question: "My Samsung phone is stuck on the logo screen. Can you fix it?",
                  answer: "Yes, this is often a firmware issue, shorted capacitor, or a failing battery/logic board. We perform diagnostic scans to identify the exact cause and resolve the boot loop."
                },
                {
                  question: "Is my Samsung device still waterproof after a repair?",
                  answer: "While we use original-spec laser-cut adhesives to reseal your device, we always recommend keeping any repaired electronic device away from prolonged water immersion."
                }
              ]}
            />
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
