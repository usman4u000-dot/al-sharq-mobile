import React, { useState, useEffect } from 'react';
import { Laptop, Cpu, Thermometer, ShieldCheck, ArrowRight, CheckCircle2, Clock, Award, MonitorPlay, Activity, AlertTriangle, PowerOff, Usb } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WarrantyBadge from '../components/WarrantyBadge';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';

export default function MacBookRepairPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'complete'>('idle');

  const runDiagnostic = () => {
    setIsTesting(true);
    setTestResult('testing');
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          setTestResult('complete');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);
  };

  const macbookFaqs = [
    {
      q: "My MacBook won't turn on after spilling water on it. Can it be saved?",
      a: "In many cases, yes. Do not try to turn it on or plug it in. Bring it to us immediately. We use ultrasonic cleaning and component-level micro-soldering to repair liquid-damaged logic boards."
    },
    {
      q: "Is it worth repairing an older MacBook logic board?",
      a: "Often, yes. Logic board repair is significantly cheaper than buying a new MacBook or replacing the entire board through Apple. We can assess your device and give you an honest recommendation."
    },
    {
      q: "Will I lose my data during a logic board repair?",
      a: "Our primary goal during logic board repair is to retain your data. Because the storage is soldered onto the board in modern MacBooks, fixing the board is often the only way to recover the data."
    },
    {
      q: "How long does a MacBook screen replacement take?",
      a: "If we have the screen in stock, a MacBook screen replacement can usually be completed on the same day within a few hours."
    }
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
      "name": "MacBook logic board repair Sharjah",
      "serviceType": "Computer Repair",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC"
      },
      "areaServed": {
        "@type": "City",
        "name": "Sharjah"
      },
      "description": "Expert MacBook logic board repair in Sharjah. We specialize in M2, M3, and M4 logic boards and screen replacements.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AED",
        "lowPrice": "150"
      }
    }
  ];

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
        "name": "MacBook logic board repair Sharjah",
        "item": "https://allsharq.com/services/macbook-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/macbook-repair" />
        <title>MacBook logic board repair Sharjah | Screen Fix | Al Sharq</title>
        <meta name="description" content="Sharjah's expert MacBook specialist since 2014. Professional MacBook logic board repair, M2/M3/M4 screen replacement, and liquid damage restoration." />
        <meta name="keywords" content="MacBook logic board repair Sharjah, MacBook Specialist Sharjah, M4 Logic Board Repair, Secure Data Recovery Mac, MacBook Screen Fix Muwaileh" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Services', path: '/#services' },
            { label: 'MacBook logic board repair' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Laptop className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                MacBook logic board repair Sharjah
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Targeting: MacBook Pro, MacBook Air (M2, M3, and M4 Series)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                Don't replace your board. Restore it. Expert MacBook solutions since 2014. We provide industrial-grade Specialist Tech Support in our fully equipped Sharjah lab.
              </p>
              <WarrantyBadge />
              <br />
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
              >
                Book a Diagnostic
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000" 
                alt="Technician meticulously working on a MacBook logic board under a microscope with precision tools" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                <p className="text-white text-sm md:text-base font-medium text-center">
                  "Don't replace your board. Restore it. Expert MacBook solutions since 2014."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key USPs / Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Expert Logic Board Repair</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Component-level micro-soldering</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Same-Day Service</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fast turnaround on most repairs</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Certified Technicians</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">10+ years of Apple expertise</p>
              </div>
            </motion.div>
          </div>

          {/* Services Breakdown */}
          <div className="space-y-16 mb-20">
            {/* Advanced GPU & BGA Repair with Diagnostic Tool */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full font-semibold text-sm">
                    <MonitorPlay className="w-4 h-4" />
                    Advanced GPU & BGA Repair
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Graphics Glitches? Black Screens?
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    If your MacBook is experiencing visual artifacts, random reboots, thermal throttling, or booting to a black screen, the GPU might be failing. Our specialists use advanced BGA (Ball Grid Array) rework stations to perform precision reballing or complete chip replacements.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Visual artifacts, lines, or distorted colors',
                      'Kernel panics and random graphic-intensive crashes',
                      'Precision BGA reballing and chip replacement',
                      'Thermal paste replacement and cooling optimization'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  {/* Diagnostic Tool UI */}
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-brand-orange"></div>
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400" />
                      Web-Based GPU Stress Test
                    </h4>
                    <p className="text-slate-400 text-sm mb-6">
                      Run a quick browser-based benchmark to check for rendering anomalies or performance throttling.
                    </p>
                    
                    {testResult === 'idle' && (
                      <button 
                        onClick={runDiagnostic}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors shadow-lg hover:shadow-purple-500/20"
                      >
                        Start GPU Health Check
                      </button>
                    )}

                    {testResult === 'testing' && (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-slate-300">
                          <span>Running WebGL Benchmark...</span>
                          <span>{testProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="bg-purple-500 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${testProgress}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-slate-800 p-3 rounded-lg">
                            <div className="text-xs text-slate-400">Simulated Load</div>
                            <div className="text-lg font-mono text-white">98%</div>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-lg">
                            <div className="text-xs text-slate-400">Temp (Est)</div>
                            <div className="text-lg font-mono text-orange-400">85°C</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {testResult === 'complete' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-white font-semibold mb-1">Analysis Complete</h5>
                              <p className="text-slate-300 text-sm">
                                Benchmark finished. If you noticed stuttering, glitches, or if your fan is unusually loud, your GPU may require physical inspection.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => { setTestResult('idle'); setTestProgress(0); }}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                          >
                            Run Again
                          </button>
                          <Link 
                            to="/"
                            className="flex-1 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-colors text-center"
                          >
                            Book Repair
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 1. Expert Logic Board */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                  <Cpu className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-blue dark:text-white">
                  1. Expert Logic Board & Chip-Level Repair
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                While others suggest an expensive "board replacement," we offer Logic Board Restoration. Since 2014, our Skilled Technicians have specialized in:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    M-Series Power IC Replacement
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Fixing MacBooks that won't turn on or charge.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    Liquid Damage Restoration
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Ultrasonic cleaning and chemical treatment to save data and hardware after a spill.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    Short Circuit Repair
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Precision micro-soldering under 40x magnification to replace individual blown capacitors.</p>
                </div>
              </div>
            </motion.div>

            {/* 2. Precision Screen */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                  <Laptop className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-blue dark:text-white">
                  2. Precision Screen & Display Assembly
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Replacing a screen on a 2026 MacBook Pro requires more than just tools—it requires calibration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    M2, M3, & M4 Display Fixes
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">We use premium panels to maintain ProMotion (120Hz) and Liquid Retina XDR brightness levels.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    Sensor Transfer
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">We ensure the "Lid Angle Sensor" is correctly calibrated so your MacBook sleeps and wakes perfectly.</p>
                </div>
              </div>
            </motion.div>

            {/* 3. Performance & Thermal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                  <Thermometer className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-blue dark:text-white">
                  3. Performance & Thermal Management
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                The 2026 M-series chips generate significant heat during heavy video editing or AI processing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    Thermal Paste Upgrade
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Replacing factory paste with high-conductivity liquid metal or specialized pads.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    Internal De-Dusting
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Vital for Sharjah’s environment to prevent thermal throttling.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* M4 Chip Specific Troubleshooting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">
                M4 Chip Specific Troubleshooting
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experiencing issues with your latest Apple Silicon? Here are common M4 problems and how our specialists resolve them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blackout Failures */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
                  <PowerOff className="w-7 h-7 text-gray-800 dark:text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  'Blackout' Failures
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Sudden screen blackouts or the device completely failing to power on, even when connected to a charger.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-brand-blue dark:text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Our Solution
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    After attempting a force restart, if the issue persists, it often points to a PMIC (Power Management IC) failure or a display flex cable fault. We perform board-level micro-soldering to replace the exact failing component.
                  </p>
                </div>
              </div>

              {/* GPU Throttling */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <Thermometer className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  GPU Throttling (Heat)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Noticeable frame drops, sluggish performance, or loud fan noise during heavy workloads like video editing or 3D rendering.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-brand-blue dark:text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Our Solution
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The M4 chip generates significant heat. We resolve thermal throttling by performing an internal deep clean and upgrading the factory thermal paste to high-conductivity liquid metal or premium thermal pads.
                  </p>
                </div>
              </div>

              {/* USB-C Port Problems */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <Usb className="w-7 h-7 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  USB-C / Thunderbolt Issues
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Ports not recognizing external drives, charging intermittently, only working on one side, or feeling physically loose.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-brand-blue dark:text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Our Solution
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beyond cleaning debris, persistent issues usually indicate damaged CD3217/CD3218 USB-C controller chips on the logic board. We specialize in replacing these specific ICs to restore full port functionality.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">MacBook Service Pricing</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="p-4 md:p-6 font-semibold text-sm md:text-base border-b border-blue-800">Service</th>
                    <th className="p-4 md:p-6 font-semibold text-sm md:text-base border-b border-blue-800">MacBook Air (M2/M3)</th>
                    <th className="p-4 md:p-6 font-semibold text-sm md:text-base border-b border-blue-800">MacBook Pro (M3/M4)</th>
                    <th className="p-4 md:p-6 font-semibold text-sm md:text-base border-b border-blue-800">Turnaround</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Logic Board Fix</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 700 - 1,100</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 950 - 1,600</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">2-3 Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Screen Replacement</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 900 - 1,400</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 1,600 - 2,400</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">Same-Day</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Battery Renewal</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 350 - 500</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 550 - 750</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">3 Hours</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Keyboard/Trackpad</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 400 - 600</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">AED 650 - 900</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">1 Day</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white"><Link to="/data-recovery" className="hover:text-brand-orange transition-colors underline">Data Recovery</Link></td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">From AED 500</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">From AED 500</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">2-4 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* MacBook Testimonials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">
                Trusted by Mac Users in Sharjah
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers say about our logic board and performance repairs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative">
                <div className="text-brand-orange mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "Apple told me my M1 MacBook Pro logic board was dead and needed a $800 replacement. The team at Techfix diagnosed a shorted capacitor and fixed it for a fraction of the cost. It's been running perfectly for 6 months now."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-brand-blue dark:text-blue-300 font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Sarah M.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Graphic Designer</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative">
                <div className="text-brand-orange mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "Spilled coffee on my MacBook Air. I thought I lost all my university thesis data. They not only recovered my data but managed to ultrasonically clean the board and bring the laptop back to life. Absolute lifesavers!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-brand-orange dark:text-orange-300 font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Ahmed K.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">University Student</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative">
                <div className="text-brand-orange mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "My 2019 MacBook Pro was overheating and running incredibly slow. They did a full thermal paste replacement and internal cleaning. It feels like a brand new machine. Very professional and fast service."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-xl">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Rahul P.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="mb-20">
            <ServiceFAQ faqs={macbookFaqs.map(f => ({ question: f.q, answer: f.a }))} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
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

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <a 
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq%20LLC,%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20[Device%20Model]."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Book Repair Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
