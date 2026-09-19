import React from 'react';
import { Smartphone, Monitor, ShieldCheck, CheckCircle2, ArrowRight, Sun, EyeOff, Zap, Laptop, Droplet, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ServiceFAQ from '../components/ServiceFAQ';

export default function ScreenRepairPage() {
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
      "name": "Screen repair Sharjah",
      "serviceType": "Electronics Repair",
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
      "description": "Expert screen repair for iPhone 18, iPhone 17 Pro Max, Samsung S26 Ultra, and MacBook M4 Pro with 2026 Ultra-High-Nit Solutions.",
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
          "name": "Screen repair Sharjah"
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/screen-repair" />
        <title>Screen repair Sharjah | iPhone 17 & S26 Ultra | Al Sharq</title>
        <meta name="description" content="2026 Ultra-High-Nit Solutions. Expert screen repair Sharjah for iPhone 17 Pro Max, Samsung S26 Ultra, and MacBook M4 Pro." />
        <meta name="keywords" content="Screen repair Sharjah, iPhone screen repair, MacBook screen replacement Muwaileh, Samsung screen fix Sharjah" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/phone-repair' },
            { label: 'Screen repair Sharjah' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Monitor className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Screen repair Sharjah
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Supporting iPhone 17 Pro Max, Samsung S26 Ultra, and MacBook M4 Pro
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
                The 2026 flagship screens are highly sensitive. We ensure your replacement keeps all factory features active, from 120Hz ProMotion to extreme dynamic range.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
              >
                Book a Screen Repair
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=1000" 
                afterImage="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000" 
              />
              <div className="absolute top-0 right-0 p-4 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
                  <p className="text-white text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Absolute Perfection
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 space-y-8">
              {/* 1. Smartphone OLED */}
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
                    1. Smartphone OLED & Privacy Display Repair
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <EyeOff className="w-5 h-5 text-brand-orange" />
                      Samsung S26 Ultra "Privacy Display" Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We offer genuine M14 OLED panels that support Samsung’s new "Privacy Mode," which narrows viewing angles to block side-peekers.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-brand-orange" />
                      3,000-Nit Brightness Calibration
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We use specialized tools to calibrate your new screen's peak brightness, ensuring it remains visible even in the harsh UAE desert sun.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-brand-orange" />
                      The "Green Line" Fix
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We specialize in diagnosing and fixing the common "vertical green line" issue on AMOLED screens caused by heat or software-update stress.</p>
                  </div>
                </div>
              </motion.div>

              {/* 2. MacBook & Laptop Display */}
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
                    2. MacBook & Laptop Display Restoration
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-brand-orange" />
                      MacBook Pro M4 Liquid Retina XDR
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">We replace damaged panels while preserving the 120Hz ProMotion and extreme dynamic range.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                      True Tone & FaceID Pairing
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Unlike amateur shops, we transfer the original display IC (Integrated Circuit) to your new screen so that True Tone and FaceID continue to work perfectly.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-brand-orange" />
                      Anti-Reflective Coating
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Our replacement glass includes the 2026-standard anti-reflective coatings to reduce glare in bright Sharjah offices.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              {/* Zero-Dust Protocol Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-blue rounded-3xl p-8 text-white shadow-xl sticky top-32"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="text-2xl font-bold mb-6">The Al Sharq "Zero-Dust" Protocol</h4>
                <p className="text-blue-100 mb-8">Every screen repair at our Sharjah facility follows a strict professional standard:</p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Zap className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">ESD-Safe Environment</strong>
                      <span className="text-sm text-blue-200">To prevent microscopic static damage to your 2026 AI processors.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Droplet className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">Water-Resistant Reseal</strong>
                      <span className="text-sm text-blue-200">We use factory-grade adhesives to restore the IP68 water and dust resistance of your device.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg shrink-0">
                      <Award className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-lg mb-1">90-Day Guarantee</strong>
                      <span className="text-sm text-blue-200">Your new display is covered for touch responsiveness and dead pixels.</span>
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
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Screen Replacement Pricing</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400">
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Model</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Screen Type</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Repair Price (AED)</th>
                    <th className="p-4 md:p-6 font-semibold border-b border-slate-200 dark:border-slate-700">Replacement Price (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPhone 17 Pro Max</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Ceramic Shield 2 / OLED</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">~AED 850 (Glass only)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">~AED 1,750 (Full Panel)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPhone 16 Pro</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Ceramic Shield / OLED</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">~AED 750 (Glass only)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">~AED 1,550 (Full Panel)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">Samsung S26 Ultra</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Gorilla Armor 2 / M14</td>
                    <td className="p-4 md:p-6 text-brand-orange font-medium">~AED 790 (Glass only)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">~AED 1,600 (Full Panel)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">MacBook Pro M4</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Liquid Retina XDR</td>
                    <td className="p-4 md:p-6 text-gray-400">N/A</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">~AED 1,900+</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-gray-900 dark:text-white">iPad Pro (M5)</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">Tandem OLED</td>
                    <td className="p-4 md:p-6 text-gray-400">N/A</td>
                    <td className="p-4 md:p-6 text-gray-600 dark:text-gray-300">~AED 1,400+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="mb-20">
            <ServiceFAQ 
              title="Frequently Asked Questions - Screen Replacement"
              pageUrl="https://allsharq.com/services/screen-repair"
              faqs={[
                {
                  question: "How long does a phone screen replacement take at Al Sharq in Sharjah?",
                  answer: "Most iPhone and Samsung screen replacements are completed within 30 to 45 minutes while you wait at our Muwaileh shop."
                },
                {
                  question: "Can you fix just the cracked outer glass without replacing the OLED panel?",
                  answer: "Yes, if your touch digitizer and AMOLED/OLED display are fully responsive without black bleeding or lines, we can perform outer glass refurbishment using OCA laminating machines, saving you up to 50% compared to a full panel replacement."
                },
                {
                  question: "What is the warranty on replacement screens?",
                  answer: "All replacement displays come with a 90-day warranty covering touch response, flickering, and manufacturing defects."
                },
                {
                  question: "Will True Tone and auto-brightness work after iPhone screen replacement?",
                  answer: "Yes, we use EEPROM programmers to read data from your original screen and transfer serials directly to the new screen, preserving True Tone and automatic brightness sensors."
                },
                {
                  question: "Will my phone data be safe during screen replacement?",
                  answer: "Yes, screen replacement is an external hardware procedure that does not touch or wipe your device storage."
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
