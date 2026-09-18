import React from 'react';
import { Watch, Activity, Droplet, Battery, ShieldCheck, CheckCircle2, ChevronRight, ArrowRight, Sparkles, Info, Cpu, Maximize } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ExpressFixBanner from '../components/ExpressFixBanner';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';

export default function AppleWatchRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const services = [
    {
      id: "ghost-haptic",
      icon: Activity,
      title: "\"Ghost\" Haptic Feedback",
      description: "The new Taptic Engine in the Ultra 3 is prone to loosening. We apply micro-vibration dampening and screw-lock application to secure it."
    },
    {
      id: "titanium-peel",
      icon: Sparkles,
      title: "Titanium \"Peel\" & Scratches",
      description: "The Series 11 titanium finish is reporting \"peeling\" issues. Our exclusive Diamond-Grade Polishing service restores the premium look."
    },
    {
      id: "battery-drop",
      icon: Battery,
      title: "Battery \"Instant Drop\"",
      description: "watchOS 26 is aggressive on power. We offer Cell-Level battery calibration to reset the health percentage correctly and replace degraded cells."
    },
    {
      id: "water-seal",
      icon: Droplet,
      title: "Water Seal Restoration",
      description: "After any repair, we use a Pressure Test Chamber to guarantee your watch remains swim-proof to 50m."
    }
  ];

  const watchFaqs = [
    {
      question: "Will my Apple Watch still be waterproof after repair?",
      answer: "We use original-grade adhesives and proper sealing techniques to restore water resistance. However, we guarantee water resistance up to 50m for 30 days post-repair, provided no subsequent physical damage occurs."
    },
    {
      question: "How long does a screen replacement take?",
      answer: "Apple Watch screen replacements typically take 1-2 hours. We need extra time to ensure the adhesive cures properly for a watertight seal."
    },
    {
      question: "Do you repair the Digital Crown if it's stuck?",
      answer: "Yes, a stuck or unresponsive Digital Crown can often be cleaned and repaired. If the internal mechanism is damaged, we can replace the component."
    },
    {
      question: "Can you fix an Apple Watch that won't turn on?",
      answer: "Yes, this is usually a battery issue or a problem with the charging coil. We can diagnose the exact cause and replace the necessary parts."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apple Watch Repair Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC"
    },
    "areaServed": {
      "@type": "City",
      "name": "Sharjah"
    },
    "description": "Professional Apple Watch repair in Sharjah. We fix Series 9, 8, Ultra, and SE. Screen replacement, battery issues, and water damage repair.",
    "serviceType": "Smartwatch Repair"
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
        "name": "Apple Watch Repair",
        "item": "https://allsharq.com/services/apple-watch-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/apple-watch-repair" />
        <title>Apple Watch Repair Sharjah | Series 11 & Ultra 3 | Al Sharq</title>
        <meta name="description" content="Expert Apple Watch repair in Sharjah. Specialized tools for Series 11 and Ultra 3, including Diamond-Grade Polishing, Water Seal Restoration, and Battery Calibration." />
        <meta name="keywords" content="Apple Watch repair Sharjah, Apple Watch Ultra 3 repair, Series 11 screen replacement, Watch battery replacement UAE, smartwatch repair Muwaileh" />
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
              { label: 'Apple Watch Repair' }
            ]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Watch className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Apple Watch Repair
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Series 11 & Ultra 3 Specialists
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Expanding our expertise into wearables, Al Sharq Mobile is one of the few labs in Sharjah equipped with the specialized tools—like precision heating plates and tiny tri-point drivers—required to service modern Apple Watches. In 2026, Apple Watches are thinner and use highly sensitive "Force Touch" gaskets that demand expert handling.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop" 
                alt="Apple Watch Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <ExpressFixBanner onBookNow={onBookNow} />

          <div className="text-center mb-12 mt-20">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">2026 Strategic Repair Solutions</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We tackle the most common and complex issues faced by Apple Watch Series 11 and Ultra 3 users in the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-brand-blue/5 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Trust Us With Your Wearable?</h3>
                <p className="text-blue-100 text-lg mb-8">
                  Wearables require a completely different approach than smartphones. A single mistake during reassembly can compromise the water resistance or destroy the delicate OLED flex cables.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Precision Heating Plates for Safe Opening</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Micro-Torque Screwdrivers (Tri-Point)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Droplet className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium">Post-Repair Pressure Chamber Testing</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2000&auto=format&fit=crop" alt="Apple Watch Internals" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold mb-1">50m</p>
                  <p className="text-sm font-medium">Water Resistance Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Process Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Precision Repair Process</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Repairing an Apple Watch requires surgical precision. Here is how our certified technicians handle your device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-blue/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 font-bold text-xl">
                    1
                  </div>
                  <Cpu className="w-8 h-8 text-brand-orange" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Micro-Soldering & Logic Board Repair</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  For severe damage or power failures, we perform component-level micro-soldering under high-magnification microscopes to repair the logic board without replacing the entire watch.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-blue/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 font-bold text-xl">
                    2
                  </div>
                  <Maximize className="w-8 h-8 text-brand-orange" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Specialized Screen Calibration</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  After replacing the OLED display, we calibrate the new screen to ensure the Force Touch gaskets and touch sensitivity match factory standards perfectly.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-blue/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 font-bold text-xl">
                    3
                  </div>
                  <Droplet className="w-8 h-8 text-brand-orange" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Water Resistance Testing</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Before returning your watch, it undergoes rigorous testing in our Pressure Chamber to verify the new seals and guarantee it remains swim-proof up to 50 meters.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Estimated Repair Pricing</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Transparent pricing for the most common Apple Watch Series 11 and Ultra 3 repairs. Prices may vary slightly based on exact model and parts availability.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="py-4 px-6 font-semibold text-gray-900 dark:text-white">Service</th>
                      <th className="py-4 px-6 font-semibold text-gray-900 dark:text-white">Series 11</th>
                      <th className="py-4 px-6 font-semibold text-gray-900 dark:text-white">Ultra 3</th>
                      <th className="py-4 px-6 font-semibold text-gray-900 dark:text-white">Turnaround</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">Screen Replacement (OLED)</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 650 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 950 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">2-3 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">Battery Replacement & Calibration</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 250 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 350 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">1-2 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">"Ghost" Haptic / Taptic Engine Fix</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 180 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 220 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">1 Hour</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">Diamond-Grade Polishing (Titanium/Steel)</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 150 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">From 200 AED</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">2 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">Water Seal Restoration & Pressure Test</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Included w/ Repairs</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Included w/ Repairs</td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Warranty Section */}
          <div className="mb-20">
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 bg-brand-blue/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Apple Watch Repair Warranty</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    We stand behind the quality of our Apple Watch repairs. Due to the delicate nature of wearables and their exposure to the elements, our warranty terms are specifically tailored for these devices.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> What's Covered
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                        <li>• <strong>6 Months</strong> on Screen Replacements (defects in touch or display, excluding physical damage).</li>
                        <li>• <strong>3 Months</strong> on Battery Replacements (rapid draining or failure to charge).</li>
                        <li>• <strong>3 Months</strong> on Haptic Engine repairs.</li>
                        <li>• Water resistance guarantee (up to 50m) for 30 days post-repair, provided no subsequent physical damage occurs.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Info className="w-5 h-5 text-brand-orange" /> Exclusions
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                        <li>• Accidental damage (drops, cracked glass) after the repair.</li>
                        <li>• Water damage resulting from exceeding the 50m depth rating or exposure to high-velocity water (e.g., jet skiing).</li>
                        <li>• Issues arising from third-party software modifications or beta watchOS updates.</li>
                        <li>• Pre-existing logic board issues not related to the specific repair performed.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services & FAQ */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Services</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Apple Watch Band Replacement:</strong> Need a new look or a replacement for a broken band? We offer a variety of bands and sizing services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Charging Puck Repair:</strong> If your watch isn't charging, the issue might be the magnetic charging puck or cable. We can diagnose and replace it.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Software Troubleshooting:</strong> Experiencing watchOS glitches, syncing issues with your iPhone, or boot loops? We provide comprehensive software support.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-brand-blue/5 dark:bg-blue-900/10 p-8 rounded-2xl border border-brand-blue/10 dark:border-blue-800/30 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-brand-blue/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                <Info className="w-8 h-8 text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Have Questions?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Check out our frequently asked questions about Apple Watch repairs, warranties, and turnaround times.
              </p>
              <Link 
                to="/faq#apple-watch-repairs" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                View All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <ServiceFAQ faqs={watchFaqs} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <button 
              onClick={() => onBookNow('Apple Watch Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book Watch Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('Apple Watch Repair')}
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
