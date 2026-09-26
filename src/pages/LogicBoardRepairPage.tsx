import React, { useState } from 'react';
import { Cpu, Microscope, ShieldCheck, CheckCircle2, ArrowRight, Zap, Droplet, Flame, Activity, Thermometer, Settings, Smartphone, Wifi, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { logger } from '../utils/logger';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import RegionalServiceWrapper from '../components/RegionalServiceWrapper';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

interface LogicBoardRepairPageProps {
  onBookNow?: (service?: string) => void;
}

export default function LogicBoardRepairPage({ onBookNow }: LogicBoardRepairPageProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [shortFound, setShortFound] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setShortFound(false);
    logger.info('Thermal scan initiated');
    setTimeout(() => {
      try {
        // Simulate potential error during scan
        if (Math.random() < 0.05) {
          throw new Error("Thermal camera connection lost during scan.");
        }
        setIsScanning(false);
        setShortFound(true);
        logger.info('Thermal scan completed successfully, short found');
      } catch (error) {
        logger.error('Thermal scan failed', error);
        setIsScanning(false);
        alert("There was an error communicating with the thermal camera. Please try again.");
      }
    }, 2500);
  };

  const bigThree = [
    {
      title: "Sandwich Board Reballing",
      description: "iPhones (from X to 17) use two-layer motherboards. Dropping the phone often breaks the connection between them. Mastering the 'split, reball, and join' process is essential.",
      icon: Cpu
    },
    {
      title: "IC (Integrated Circuit) Replacement",
      description: "Audio IC: Fixing 'No Sound' or 'Greyed out Voice Memo.' Charging IC (U2/Tristar/USB-C Controller): Fixing phones that won't charge or show 'Liquid Detected' when dry. Power IC: Reviving 'Dead' phones that don't respond to a new battery.",
      icon: Settings
    },
    {
      title: "Short Circuit Detection",
      description: "Using thermal cameras to find a single tiny capacitor ($0.01 cost) that is grounded and preventing the whole phone from turning on. You can charge AED 350–600 for this 'hidden' fix.",
      icon: Zap
    }
  ];

  const equipment = [
    {
      name: "Infrared Thermal Camera",
      description: "To instantly see 'hot spots' on a shorted board.",
      icon: Thermometer
    },
    {
      name: "Digital Trinocular Microscope",
      description: "Connected to a 4K monitor so you can show the customer the microscopic damage (great for trust).",
      icon: Microscope
    },
    {
      name: "Smart Hot Air Station & Micro-Soldering Iron",
      description: "Precise temperature control (e.g., JBC or Sugon brands) to avoid damaging surrounding chips.",
      icon: Settings
    },
    {
      name: "CNC Grinding Machine",
      description: "For safely removing 'underfilled' ICs on the newest iPhone 17 boards without using excessive heat.",
      icon: Cpu
    }
  ];

  const pricing = [
    { fault: "Short Circuit (Capacitor)", difficulty: "Medium", price: "350 – 500", cost: "< 5" },
    { fault: "Sandwich Board Reball", difficulty: "High", price: "600 – 900", cost: "< 20 (Stencil/Solder)" },
    { fault: "FaceID / Dot Projector", difficulty: "Very High", price: "450 – 700", cost: "10 – 30" },
    { fault: "NAND Storage Upgrade", difficulty: "High", price: "500 – 1,200", cost: "150 – 400" }
  ];

  const logicBoardFaqs = [
    {
      question: "What is logic board repair?",
      answer: "Logic board repair involves fixing the main circuit board of your device at the microscopic level. Instead of replacing the entire expensive board, we identify and replace the specific tiny components (like capacitors, resistors, or IC chips) that have failed."
    },
    {
      question: "Is logic board repair safe for my data?",
      answer: "Yes, in fact, it is often the ONLY way to save your data. If your phone won't turn on, Apple will replace the whole device, meaning your data is gone. By repairing the board, we bring the phone back to life so you can access your photos and files."
    },
    {
      question: "How long does micro-soldering take?",
      answer: "Most logic board repairs take between 24 to 72 hours. These are complex procedures that require precise diagnostics, specialized parts, and rigorous testing after the repair is complete."
    },
    {
      question: "Do you offer a warranty on logic board repairs?",
      answer: "Yes, we offer a 90-day warranty on our logic board repairs. If the same component fails again within that time, we will fix it free of charge."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Logic Board & Micro-Soldering Repair",
    "provider": BUSINESS_PROVIDER_SCHEMA,
    "areaServed": {
      "@type": "City",
      "name": "Sharjah"
    },
    "description": "Expert chip-level repair and micro-soldering at Al Sharq Mobile Phone & Computer Trading LLC. We fix dead motherboards, liquid damage, and short circuits.",
    "serviceType": "Electronics Repair"
  };

  const breadcrumbData = {
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
        "name": "Services",
        "item": "https://allsharq.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Logic Board Repair",
        "item": "https://allsharq.com/services/logic-board-repair"
      }
    ]
  };

  return (
    <RegionalServiceWrapper
      serviceNameEn="Logic Board & Micro-Soldering Repair"
      serviceNameAr="صيانة المذربورد واللحام الميكروسكوبي الدقيق"
      category="Motherboard Repair"
      basePriceAED={450}
    >
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/logic-board-repair" />
        <title>Sharjah’s Leading Logic Board & Micro-Soldering Lab | Al Sharq</title>
        <meta name="description" content="Why buy a new phone when we can fix the one you have? Expert chip-level repair at Al Sharq Mobile Phone & Computer Trading LLC." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20 dark:opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/90 via-brand-blue/80 to-slate-50 dark:to-slate-950"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Breadcrumbs */}
            <div className="mb-8">
              <Breadcrumbs items={[
                { label: 'Services', path: '/#services' },
                { label: 'Logic Board Repair' }
              ]} />
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 text-brand-orange font-semibold text-sm mb-6"
              >
                <Cpu className="w-4 h-4" />
                <span>Chip-Level Logic Board Repairs</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
              >
                Sharjah’s Leading Logic Board & Micro-Soldering Lab
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-200 mb-10"
              >
                Why buy a new phone when we can fix the one you have? Expert chip-level repair at Al Sharq.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => onBookNow && onBookNow('Logic Board Repair')}
                  className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-brand-orange/25"
                >
                  Book a Diagnostic
                </button>
                <a
                  href="https://wa.me/971507117043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-300">
              <p className="text-xl leading-relaxed text-center mb-12">
                Most shops will tell you your motherboard is "dead." At Al Sharq, we say, <strong>"Let’s look under the microscope."</strong> We are specialists in chip-level logic board repair in Sharjah, fixing the complex circuitry that others ignore.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Zap className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Power / Dead Phone Recovery</h3>
                  <p className="text-sm">If your phone won't turn on, it’s often a single failed chip. We diagnose and replace faulty ICs to bring your device back to life.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Wifi className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Network & Wi-Fi IC Repair</h3>
                  <p className="text-sm">Is your iPhone 16/17 showing "Searching" or "No Wi-Fi"? This is often a logic board issue, not a software bug. We reball the baseband chip to restore your signal.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Smartphone className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Touch & Display IC Fix</h3>
                  <p className="text-sm">For "Touch Disease" or flickering screens that a new display can't fix.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Thermal Camera Demo */}
        <section className="py-20 bg-slate-100 dark:bg-slate-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
                Thermal Camera Short Circuit Detection
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                See how we use infrared thermal imaging to instantly locate grounded capacitors causing your device to be "dead."
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                
                {/* Thermal Camera Viewfinder */}
                <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-slate-900 border-4 border-slate-800">
                  {/* Base Logic Board Image */}
                  <img loading="lazy" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
                    alt="Logic Board" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isScanning || shortFound ? 'filter grayscale contrast-125 brightness-75' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Thermal Overlay */}
                  <div className={`absolute inset-0 mix-blend-screen transition-opacity duration-1000 ${isScanning || shortFound ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-blue-900/40"></div>
                  </div>

                  {/* Scanning Animation */}
                  {isScanning && (
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-brand-orange shadow-[0_0_15px_rgba(242,125,38,0.8)]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                  )}

                  {/* Hot Spot */}
                  {shortFound && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute top-[45%] left-[60%] w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-white blur-md mix-blend-screen"
                    />
                  )}
                  {shortFound && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-[45%] left-[60%] w-4 h-4 -mt-2 -ml-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
                    />
                  )}

                  {/* UI Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between text-white text-xs font-mono">
                    <span className="bg-black/50 px-2 py-1 rounded">TEMP: {shortFound ? '85.4°C' : '24.1°C'}</span>
                    <span className="bg-black/50 px-2 py-1 rounded">MODE: IR-THERMAL</span>
                  </div>
                  {shortFound && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                      <Flame className="w-4 h-4" />
                      SHORT CIRCUIT DETECTED
                    </div>
                  )}
                </div>

                {/* Controls & Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Precision Diagnostics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    When a phone is completely dead, it's often due to a single microscopic capacitor shorting out the entire power rail. Instead of replacing the whole board, we inject voltage and use a thermal camera to instantly spot the component that gets hot.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                      <span>Pinpoint accuracy down to 0.5mm components</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                      <span>Saves data and avoids expensive board replacement</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                      <span>Fast diagnosis for "No Power" issues</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                      onClick={handleScan}
                      disabled={isScanning}
                      className="flex-1 bg-slate-900 dark:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Thermometer className="w-5 h-5" />
                      {isScanning ? 'Scanning Board...' : 'Run Thermal Scan'}
                    </button>
                    <button
                      onClick={() => onBookNow && onBookNow('Short Circuit Diagnostic')}
                      className="flex-1 bg-brand-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      Initiate Diagnostic
                    </button>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-xl p-4 flex items-start gap-3">
                    <div className="bg-[#25D366] text-white p-2 rounded-full shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        For urgent cases or diagnostics, please contact us directly on WhatsApp:{' '}
                        <a 
                          href="https://wa.me/971507117043" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-[#25D366] hover:underline whitespace-nowrap"
                        >
                          +971-50-7117043
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Big Three */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
                The "Big Three" Chip-Level Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                These are the most common motherboard failures in 2026.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bigThree.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-brand-orange/50 transition-colors group"
                >
                  <div className="w-14 h-14 bg-brand-blue/5 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                    <item.icon className="w-7 h-7 text-brand-blue dark:text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Equipment */}
        <section className="py-20 bg-brand-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Essential 2026 Lab Equipment
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                To be a true chip-level mobile service center in Sharjah, our lab is equipped with:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {equipment.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <item.icon className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing & Sales Script */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Sales Script */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The "Expert" Approach</h3>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-brand-orange rotate-45 rounded-sm"></div>
                  <p className="text-gray-700 dark:text-gray-300 italic relative z-10">
                    "I see the other shop told you the motherboard is dead. Most shops only know how to change parts. At Al Sharq, we actually repair the board. We use a microscope to find the specific micro-component that failed. It’s like heart surgery for your phone. It’s 70% cheaper than buying a new iPhone 17, and you keep all your data. Give us 24 hours for a microscopic diagnostic."
                  </p>
                </div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pricing Strategy (The "Expert" Premium)</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Chip-level repair is 90% skill and 10% parts.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-sm">
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700 rounded-tl-xl">Fault</th>
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Difficulty</th>
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Price (AED)</th>
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700 rounded-tr-xl">Part Cost (AED)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      {pricing.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">{row.fault}</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              row.difficulty === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {row.difficulty}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-brand-orange">{row.price}</td>
                          <td className="p-4 text-gray-500 dark:text-gray-400">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <ServiceFAQ 
            title="Frequently Asked Questions - Logic Board Repair Sharjah"
            pageUrl="https://allsharq.com/services/logic-board-repair"
            faqs={logicBoardFaqs} 
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20 mb-20"
          >
            <button 
              onClick={() => onBookNow?.('Logic Board Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Diagnostic
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow?.('Logic Board Repair')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Book Diagnostic Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </RegionalServiceWrapper>
  );
}
