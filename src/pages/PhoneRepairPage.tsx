import React from 'react';
import { Smartphone, Battery, Plug, Droplet, Cpu, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Clock, Award, HardDrive, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ExpressFixBanner from '../components/ExpressFixBanner';
import LocalSEOSection from '../components/LocalSEOSection';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

export default function PhoneRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const services = [
    {
      id: "screen-display",
      icon: Smartphone,
      title: "Screen & Display",
      description: "Same-day OLED and LCD replacements for iPhone 17 and Samsung S26."
    },
    {
      id: "battery-service",
      icon: Battery,
      title: "Battery Service",
      description: "Certified battery health checks and 15-minute replacements."
    },
    {
      id: "charging-ports",
      icon: Plug,
      title: "Charging Ports",
      description: "Fixing loose connections and Type-C port issues."
    },
    {
      id: "liquid-damage",
      icon: Droplet,
      title: "Liquid Damage",
      description: "Advanced chemical cleaning for water-damaged devices."
    },
    {
      id: "logic-board",
      icon: Cpu,
      title: "Logic Board Repair",
      description: "Precision micro-soldering by our 12-year expert technicians."
    },
    {
      id: "data-recovery",
      icon: HardDrive,
      title: "Data Recovery",
      description: "Securely retrieving lost files from damaged smartphones."
    },
    {
      id: "camera-repair",
      icon: Camera,
      title: "Precision Camera Repair",
      description: "Laser-assisted sapphire glass lens replacement and OIS repair."
    }
  ];

  const phoneFaqs = [
    {
      question: "Will I lose my data during the repair?",
      answer: "For most repairs like screen or battery replacements, your data remains completely safe. However, we always recommend backing up your device before any repair, especially for complex logic board or liquid damage repairs."
    },
    {
      question: "How long does a screen replacement take?",
      answer: "Most screen replacements for popular iPhone and Samsung models are completed within 30 to 60 minutes. We keep a large inventory of premium parts in stock to ensure fast turnaround times."
    },
    {
      question: "Do you offer a warranty on your repairs?",
      answer: "Yes! We stand behind our work with a 90-day warranty on all parts and labor. If you experience any issues related to the repair within this period, we will fix it free of charge."
    },
    {
      question: "Do you use original parts?",
      answer: "We offer both genuine OEM parts and premium aftermarket alternatives to fit your budget. Our technicians will clearly explain the options and differences before starting any repair."
    },
    {
      question: "Can you fix a phone that has been dropped in water?",
      answer: "Yes, we specialize in liquid damage recovery. It's crucial that you turn off the device immediately and bring it to us as soon as possible. Do not try to charge it or turn it on, as this can cause short circuits."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Phone Repair Services",
    "provider": BUSINESS_PROVIDER_SCHEMA,
    "areaServed": {
      "@type": "City",
      "name": "Sharjah"
    },
    "description": "Expert phone repair services in Sharjah including screen replacement, battery fixing, logic board repair, and data recovery for iPhone, Samsung, and more.",
    "serviceType": "Mobile Phone Repair"
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
        "name": "Phone Repair Services",
        "item": "https://allsharq.com/services/phone-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/phone-repair" />
        <title>Expert Phone Repair Sharjah | Mobile Repair Near Me | Al Sharq Mobile</title>
        <meta name="description" content="Looking for phone repair near me in Sharjah? Al Sharq Mobile is the best mobile repair shop near you for iPhone & Samsung screen replacements, battery fixes, and more." />
        <meta name="keywords" content="تصليح هواتف الشارقة, أفضل محل هواتف في الشارقة, Mobile repair Sharjah, Phone repair Sharjah, Screen replacement Sharjah, mobile phone repair near me, phone repair near me, mobile shop near me in Sharjah, best mobile repair shop in Sharjah near me, mobile repairing center near me, phone fixing near me Sharjah, cheap mobile repair near me, mobile screen repair near me, phone battery replacement near me Sharjah, mobile repair shop near me" />
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
            { label: 'Phone Repair Services' }
          ]} />

          {/* Hero Section */}
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
                Phone Repair Services
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Expert Mobile Service
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Welcome to Sharjah’s premier destination for smartphone restoration. Since 2014, Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) has specialized in precision mobile repairs, from same-day screen replacements for the latest iPhone and Samsung models to complex <a href="#logic-board" className="text-brand-orange hover:underline font-semibold">motherboard micro-soldering</a>. Our expert technicians use premium-grade parts to ensure your device performs like new. Trust our 12 years of experience to provide fast, reliable service backed by a 90-day warranty.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://picsum.photos/seed/smartphone-repair-tech/800/600" 
                alt="Expert Phone Repair Technician" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <ExpressFixBanner onBookNow={onBookNow} />

          {/* Key USPs / Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-20">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">12+ years of mobile expertise</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Key Services</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all group scroll-mt-32"
              >
                <div className="w-14 h-14 bg-brand-blue/5 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                  <service.icon className="w-7 h-7 text-brand-blue dark:text-blue-400 group-hover:text-brand-orange transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.id === 'screen-display' && (
                  <Link 
                    to="/screen-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Screen Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'battery-service' && (
                  <Link 
                    to="/battery-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Battery Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'charging-ports' && (
                  <Link 
                    to="/charging-port-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Port Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'liquid-damage' && (
                  <Link 
                    to="/liquid-damage-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Liquid Damage Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'logic-board' && (
                  <Link 
                    to="/logic-board-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Logic Board Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'data-recovery' && (
                  <Link 
                    to="/data-recovery"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View Data Recovery Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {service.id === 'camera-repair' && (
                  <button 
                    onClick={() => onBookNow('Camera Repair')}
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    Book Camera Repair <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Advanced Mobile Hardware Solutions */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Advanced Mobile Hardware Solutions</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                In 2026, professional hardware repair is about Micro-Soldering, AI-Driven Diagnostics, and Module Restoration rather than just swapping parts. We focus on chip-level repairs to prove technical superiority over competitors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-brand-orange" />
                    iPhone 17 & Samsung S26 Screen Replacement
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Replacing screens on the latest 2026 flagships requires more than just swapping glass. The iPhone 17 Pro's Ceramic Shield 2 and the Samsung S26 Ultra's Privacy Display (Flex Magic Pixel) are deeply integrated with the device's logic board.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>IC Chip Transfer:</strong> We transfer the original display IC chip to the new screen to ensure True Tone, FaceID, and auto-brightness function perfectly without "Unknown Part" warnings.</li>
                    <li><strong>Privacy Display Calibration:</strong> For the S26 Ultra, we use specialized diagnostic tools to re-calibrate the privacy layer, preventing "fuzzy text" and PWM eye strain.</li>
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-brand-orange" />
                    Logic Board Repair & Micro-Soldering
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    When a phone is declared "dead" by other shops, the issue is often a microscopic short circuit on the logic board. Our lab is equipped with thermal imaging cameras and high-magnification microscopes to perform component-level repairs.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>BGA Reballing:</strong> We can remove, reball, and replace individual Power ICs, Audio ICs, and Baseband chips.</li>
                    <li><strong>FPC Connector Replacement:</strong> Fixing damaged ribbon cable connectors caused by previous poor repair attempts.</li>
                    <li><strong>Data Recovery:</strong> If the board is beyond repair, we perform "Chip-Off" NAND migrations to donor boards to extract your critical data.</li>
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Droplet className="w-6 h-6 text-brand-orange" />
                    Ultrasonic Liquid Damage Cleaning
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The "rice trick" is a myth that accelerates internal corrosion. If your device has suffered liquid damage (especially from the humid Sharjah climate or salt water), immediate professional intervention is required.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>High-Frequency Ultrasonic Baths:</strong> We completely disassemble the device and submerge the logic board in an ultrasonic cleaner (80kHz - 200kHz) with specialized chemical solvents.</li>
                    <li><strong>Micro-Corrosion Removal:</strong> The ultrasonic waves create microscopic bubbles that gently scrub away oxidation and mineral deposits from underneath tightly packed BGA chips.</li>
                    <li><strong>Vacuum Desiccation:</strong> We ensure the board is 100% bone-dry before re-applying power, preventing fatal short circuits.</li>
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-brand-orange" />
                    Precision Camera & Sapphire Lens Repair
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    With 2026 phones featuring massive, protruding camera bumps, the camera lens is often the first thing to shatter. We offer specialized repairs for these delicate components.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>Laser-Assisted Lens Replacement:</strong> We replace shattered sapphire glass lenses without opening the entire phone, preserving factory water resistance.</li>
                    <li><strong>OIS Dampener Repair:</strong> Fixing Optical Image Stabilization issues commonly caused by motorcycle vibrations (perfect for delivery riders).</li>
                    <li><strong>LiDAR Sensor Calibration:</strong> Ensuring depth sensors function perfectly for AR applications and portrait mode.</li>
                  </ul>
                </motion.div>
              </div>

              <div className="space-y-8">
                {/* E-E-A-T Sidebar */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-brand-blue rounded-2xl p-8 text-white shadow-xl"
                >
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-orange" />
                    Hardware E-E-A-T Verified
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Static-Free Lab</strong>
                        <span className="text-sm text-blue-200">All repairs are performed in an ESD-protected environment.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Diagnostic Reports</strong>
                        <span className="text-sm text-blue-200">Every hardware fix comes with a pre- and post-repair AI diagnostic report.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Specialist Tech Support</strong>
                        <span className="text-sm text-blue-200">The premier provider for Muwaileh, Sharjah.</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                {/* Pricing Table */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">Mobile Hardware Pricing</h4>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400 text-sm">
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Service</th>
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Price (AED)</th>
                        <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">Motherboard Repair</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">450 – 750</td>
                        <td className="p-4 text-brand-orange font-medium">1–3 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">iPhone/Samsung Screen Fix</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">350 – 1,200</td>
                        <td className="p-4 text-brand-orange font-medium">Same-Day</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              </div>
            </div>
          </div>

          <ServiceFAQ 
            title="Frequently Asked Questions - Phone Repair Sharjah"
            pageUrl="https://allsharq.com/phone-repair"
            faqs={phoneFaqs} 
          />

          <LocalSEOSection />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20 mb-20"
          >
            <button 
              onClick={() => onBookNow('Phone Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          
          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('Phone Repair')}
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
