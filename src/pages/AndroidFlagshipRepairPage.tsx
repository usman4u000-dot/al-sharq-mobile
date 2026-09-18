import React from 'react';
import { Smartphone, Battery, Cpu, ShieldCheck, CheckCircle2, ChevronRight, ArrowRight, Zap, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ExpressFixBanner from '../components/ExpressFixBanner';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';

export default function AndroidFlagshipRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const brands = [
    {
      name: "Xiaomi & Poco",
      features: ["120W+ Hyper-Charging Port Repair", "Leica Camera Module Calibration", "MIUI/HyperOS Software Flashing"]
    },
    {
      name: "Huawei & Honor",
      features: ["HarmonyOS Recovery", "Curved OLED Screen Replacement", "Kirin Chipset Diagnostics"]
    },
    {
      name: "Google Pixel",
      features: ["Tensor Chip Thermal Management", "Pixel Camera OIS Repair", "Stock Android Bootloop Fixes"]
    },
    {
      name: "Oppo & Vivo",
      features: ["SuperVOOC Battery Replacement", "Pop-up/Motorized Camera Repair", "In-Display Fingerprint Calibration"]
    }
  ];

  const androidFaqs = [
    {
      question: "Do you use original parts for Xiaomi and Huawei?",
      answer: "Yes, we source original OEM parts for major Chinese flagships, including specific components like Xiaomi's 120W charging ports and Huawei's curved OLED screens."
    },
    {
      question: "Can you fix a Google Pixel that's stuck in a bootloop?",
      answer: "Bootlooping is a common issue with some Pixel models. We can diagnose whether it's a software issue (requiring a re-flash) or a hardware issue (like a failing battery or motherboard component) and repair it."
    },
    {
      question: "How long does a screen replacement take for a curved display?",
      answer: "Curved OLED screen replacements (like on Huawei Mate or Honor Magic series) require precision and take about 2 to 3 hours to ensure a perfect fit and seal."
    },
    {
      question: "Do you repair water-damaged Android phones?",
      answer: "Yes, we offer comprehensive water damage restoration. The key is to bring the device to us as quickly as possible and avoid trying to turn it on or charge it."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Android Flagship Repair Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC"
    },
    "areaServed": {
      "@type": "City",
      "name": "Sharjah"
    },
    "description": "Expert repair for premium Android devices in Sharjah. We specialize in Xiaomi hyper-charging, Huawei HarmonyOS, Honor curved screens, and Google Pixel repairs.",
    "serviceType": "Smartphone Repair"
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
        "name": "Android Flagship Repair",
        "item": "https://allsharq.com/services/android-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/android-flagship-repair" />
        <title>Android Flagship Repair Sharjah | Huawei, Xiaomi, Pixel | Al Sharq</title>
        <meta name="description" content="Expert repair for premium Android devices in Sharjah. We specialize in Xiaomi hyper-charging, Huawei HarmonyOS, Honor curved screens, and Google Pixel repairs." />
        <meta name="keywords" content="Xiaomi repair Sharjah, Huawei repair Sharjah, Honor screen replacement, Google Pixel repair UAE, Android flagship repair Muwaileh" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Breadcrumbs items={[
              { label: 'Services', path: '/#services' },
              { label: 'Android Flagship Repair' }
            ]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Smartphone className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Android Flagship Repair
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Huawei, Xiaomi, Honor & Pixel
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                While Apple and Samsung dominate the headlines, we know the UAE relies heavily on high-end Chinese flagships and Google devices. At Al Sharq, we stock specialized parts and possess the technical know-how for proprietary technologies like Xiaomi's 120W+ hyper-charging and Honor's curved OLED displays.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://picsum.photos/seed/android-repair-tech/800/600" 
                alt="Android Flagship Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <ExpressFixBanner onBookNow={onBookNow} />

          <div className="text-center mb-12 mt-20">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Supported Brands & Technologies</h3>
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
                  <Cpu className="w-6 h-6 text-brand-orange" />
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
                <h3 className="text-3xl font-bold mb-6">Why Choose Us for Alternative Flagships?</h3>
                <p className="text-blue-100 text-lg mb-8">
                  Most repair shops in Sharjah only stock parts for iPhones and Samsung Galaxy devices. We maintain a robust supply chain for Xiaomi, Huawei, and Google Pixel components, ensuring you don't have to wait weeks for a simple screen replacement.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Proprietary Fast-Charging Port Repairs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <RefreshCcw className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">OS-Specific Software Flashing & Unbricking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Original OEM Parts Sourcing</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img loading="lazy" src="https://picsum.photos/seed/android-motherboard/600/600" alt="Android Motherboard" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold mb-1">100%</p>
                  <p className="text-sm font-medium">Diagnostic Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <ServiceFAQ faqs={androidFaqs} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <button 
              onClick={() => onBookNow('Android Flagship Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book Android Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('Android Flagship Repair')}
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
