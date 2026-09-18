import React from 'react';
import { Smartphone, Battery, Droplet, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WarrantyBadge from '../components/WarrantyBadge';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import PricingTable from '../components/PricingTable';

export default function IPhoneRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const latestModels = [
    "iPhone 17 Pro Max",
    "iPhone 17 Pro",
    "iPhone 17",
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16",
    "iPhone Air"
  ];

  const recentModels = [
    "iPhone 15",
    "iPhone 14",
    "iPhone 13",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 12 Mini"
  ];

  const classicModels = [
    "iPhone 11 Pro Max",
    "iPhone 11 Pro",
    "iPhone 11",
    "iPhone XS Max",
    "iPhone XS",
    "iPhone XR",
    "iPhone X",
    "iPhone 8"
  ];

  const specificRepairs = [
    "iPhone Screen Replacement",
    "iPhone Battery Replacement",
    "iPhone Back Glass Replacement",
    "Logic Board Repair",
    "Water Damage Restoration"
  ];

  const iphoneFaqs = [
    {
      question: "Will I lose my data during an iPhone screen repair?",
      answer: "No, screen replacements do not affect your data. However, we always recommend backing up your iPhone to iCloud or a computer before any repair as a standard precaution."
    },
    {
      question: "Do you use original Apple parts?",
      answer: "We offer both premium aftermarket parts and genuine Apple parts depending on your budget and preference. All our parts come with a 90-day warranty for your peace of mind."
    },
    {
      question: "How long does an iPhone battery replacement take?",
      answer: "Most iPhone battery replacements are completed within 30-45 minutes. You can wait in our comfortable lounge while we fix your device."
    },
    {
      question: "Will Face ID still work after a screen repair?",
      answer: "Yes, our expert technicians carefully transfer the original TrueDepth camera system to the new screen, ensuring Face ID continues to function perfectly."
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
      "name": "iPhone Repair Sharjah",
      "serviceType": "Smartphone Repair",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC"
      },
      "areaServed": {
        "@type": "City",
        "name": "Sharjah"
      },
      "description": "Expert iPhone repair in Sharjah. We fix all models including iPhone 17, 16, 15, 14, 13, and 12. Screen replacement, battery, and back glass repairs.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AED",
        "lowPrice": "100"
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
        "name": "iPhone repair Sharjah",
        "item": "https://allsharq.com/iphone-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/iphone-repair" />
        <title>iPhone repair Sharjah | iPhone 17 Screen & Battery Replacement | Al Sharq</title>
        <meta name="description" content="Expert iPhone repair Sharjah. We fix all models including iPhone 17, 16, 15, 14, 13, and 12. Screen replacement, battery, and back glass repairs." />
        <meta name="keywords" content="iPhone repair Sharjah, iPhone 17 repair, iPhone screen repair, iPhone battery replacement Sharjah, mobile repair Muwaileh" />
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
          <div className="mb-8">
            <Breadcrumbs items={[
              { label: 'Services', path: '/#services' },
              { label: 'iPhone Repair' }
            ]} />
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                  alt="Apple Logo" 
                  className="h-6 object-contain filter dark:invert"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                iPhone Repair Sharjah
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Expert Screen, Battery & Back Glass Replacement
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                From shattered displays and degraded batteries to cracked back glass, Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) is your trusted destination for <strong>iPhone repairs</strong> in Sharjah and Dubai. Our certified technicians use premium parts to restore your device to factory condition, whether you have the latest <strong>iPhone 17 Pro Max</strong> or a classic <strong>iPhone 11</strong>.
              </p>
              <WarrantyBadge />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80&w=2000&fm=webp" 
                alt="iPhone Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          {/* Specialized Services */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Specialized iPhone Repairs</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
              >
                <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Screen Replacement</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Fast and flawless screen replacements for all models from iPhone 12 to iPhone 17. We restore True Tone and touch sensitivity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
              >
                <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Battery className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Battery Replacement</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Restore your iPhone's all-day battery life with our premium battery replacements, complete with battery health calibration.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
              >
                <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Back Glass Repair</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Precision laser removal and replacement of shattered back glass for iPhone 12, 13, 14, and 15 series.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Models We Fix */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">iPhone Models We Repair</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We provide comprehensive hardware and software support for the entire Apple iPhone lineup.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Latest Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-6 h-6 text-brand-orange" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Latest Series</h4>
                </div>
                <ul className="space-y-3">
                  {latestModels.map((model, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Recent Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-6 h-6 text-brand-orange" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">12, 13, 14 & 15 Series</h4>
                </div>
                <ul className="space-y-3">
                  {recentModels.map((model, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Classic Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-6 h-6 text-brand-orange" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">X & 11 Series</h4>
                </div>
                <ul className="space-y-3">
                  {classicModels.map((model, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-brand-blue/5 dark:bg-slate-700/50 rounded-xl border border-brand-blue/10 dark:border-slate-600">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-brand-orange" />
                    All Repairs Covered
                  </h5>
                  <ul className="space-y-1 mt-2">
                    {specificRepairs.map((repair, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-orange rounded-full"></div>
                        {repair}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Pricing Table Section */}
          <div className="mb-20">
            <PricingTable onBookNow={onBookNow} />
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <ServiceFAQ faqs={iphoneFaqs} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <button 
              onClick={() => onBookNow('iPhone Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('iPhone Repair')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Book Repair Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
