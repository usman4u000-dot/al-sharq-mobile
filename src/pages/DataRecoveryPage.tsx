import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Database, Shield, HardDrive, Smartphone, MessageCircle, Cloud, Cpu, FileSearch, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WarrantyBadge from '../components/WarrantyBadge';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import DataRecoveryCalculator from '../components/DataRecoveryCalculator';

interface DataRecoveryPageProps {
  onBookNow: (service?: string) => void;
}

export default function DataRecoveryPage({ onBookNow }: DataRecoveryPageProps) {
  const recoveryMenu = [
    {
      type: "Logical Recovery",
      scenario: "Accidental deletion, formatted SD cards, or software loops.",
      price: "300 – 800",
      icon: FileSearch
    },
    {
      type: "Physical/Hardware",
      scenario: "Broken screens, dead motherboards, or faulty charging chips.",
      price: "800 – 1,800",
      icon: HardDrive
    },
    {
      type: "Liquid Damage Recovery",
      scenario: "Phones dropped in salt water or coffee (requires ultrasonic cleaning).",
      price: "600 – 1,500",
      icon: AlertTriangle
    },
    {
      type: "Forensic WhatsApp/Chat",
      scenario: "Recovering deleted business chats or media from encrypted apps.",
      price: "500 – 1,200",
      icon: MessageCircle
    },
    {
      type: "\"No Data, No Fee\"",
      scenario: "Evaluation fee for complex cases.",
      price: "50 (Refundable)",
      icon: Shield
    }
  ];

  const tiers = [
    {
      title: "Tier 1: Cloud-First Recovery",
      description: "Before opening the phone, we check for \"hidden\" backups in Samsung Cloud, iCloud, or Google Photos that the customer might have missed.",
      icon: Cloud
    },
    {
      title: "Tier 2: \"Donors & Swaps\"",
      description: "If the motherboard is dead, we use a \"Donor Board\" to transplant the CPU and NAND Flash chip. This is a high-level skill that sets Al Sharq apart from basic repair shops in Muwaileh.",
      icon: Cpu
    },
    {
      title: "Tier 3: Software Extraction",
      description: "We use 2026-updated versions of tools like Cellebrite (for law-enforcement grade recovery) or Wondershare Dr.Fone for simple deletions.",
      icon: Database
    }
  ];

  const recoveryFaqs = [
    {
      question: "What does 'No Data, No Fee' mean?",
      answer: "It means exactly that! We will evaluate your device and attempt recovery. If we are unable to recover the data you need, you will not be charged the recovery fee. A small, refundable diagnostic fee may apply for complex cases."
    },
    {
      question: "Can you recover data from a phone that won't turn on?",
      answer: "Yes. We specialize in 'dead' devices. We use micro-soldering to repair the logic board just enough to boot the device and extract the data, or we perform a 'chip-off' recovery if the board is beyond repair."
    },
    {
      question: "Is my data kept private?",
      answer: "Absolutely. We follow strict privacy protocols. Your data is recovered onto an encrypted drive, handed directly to you, and securely wiped from our lab systems immediately after you verify the recovery."
    },
    {
      question: "Can you recover deleted WhatsApp messages?",
      answer: "In many cases, yes. We use forensic software to extract deleted chats and media, provided they haven't been overwritten by new data. The sooner you bring the device to us, the higher the chance of success."
    },
    {
      question: "How long does data recovery take?",
      answer: "Simple logical recoveries (deleted files) can take a few hours. Complex physical recoveries (dead motherboards, liquid damage) can take 3 to 7 days depending on the severity of the damage and parts required."
    }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ComputerStore", "RepairService"],
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
      "name": "Data recovery Sharjah",
      "serviceType": "Data Recovery",
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
      "description": "Professional data recovery services in Sharjah. We recover lost photos, business files, and WhatsApp chats from smartphones, tablets, and hard drives.",
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
        "name": "Data recovery Sharjah",
        "item": "https://allsharq.com/services/data-recovery"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Data recovery Sharjah | Forensic Data Extraction | Al Sharq</title>
        <meta name="description" content="Expert data recovery Sharjah. Lost photos, files, or WhatsApp chats? We offer advanced data extraction for smartphones, tablets, and laptops." />
        <meta name="keywords" content="Data recovery Sharjah, iPhone Data Recovery, Hard Drive Recovery, WhatsApp Recovery Sharjah, No Data No Fee" />
        <link rel="canonical" href="https://allsharq.com/data-recovery" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

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
              { label: 'Data Recovery Services' }
            ]} />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 text-brand-orange font-semibold text-sm mb-6"
            >
              <Database className="w-4 h-4" />
              <span>2026 Advanced Recovery Lab</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Data recovery Sharjah – We Bring Your Memories Back to Life
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-200 mb-10"
            >
              Lost your photos, business files, or WhatsApp chats? Al Sharq Mobile is Muwaileh's trusted recovery lab.
            </motion.p>
            <WarrantyBadge />
            <br />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
            >
              <button
                onClick={() => onBookNow('Data Recovery')}
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-brand-orange/25"
              >
                Start Free Diagnostic
              </button>
              <a
                href="https://wa.me/971507117043"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                WhatsApp Us Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <DataRecoveryCalculator onBookNow={onBookNow} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            In 2026, <strong className="text-brand-blue dark:text-white">data recovery</strong> has become a specialized field requiring more than just software. With the high encryption of iPhone 17 and Samsung S26, recovering lost files requires a combination of forensic-grade tools and hardware expertise. Data loss can be devastating, whether it's years of family photos or critical business documents. As a specialized mobile phone shop in Sharjah, we offer advanced data recovery services for all smartphones, tablets, and laptops.
          </p>
        </div>
      </section>

      {/* Service Menu */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
              The 2026 Data Recovery Service Menu
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Transparent pricing for complex recovery scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recoveryMenu.map((item, index) => (
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
                  {item.type}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[60px]">
                  {item.scenario}
                </p>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Price</span>
                  <span className="text-xl font-bold text-brand-orange">AED {item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Strategy */}
      <section className="py-20 bg-brand-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Technical Strategy: "The Three-Tier Approach"
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              To maintain our reputation as the best mobile service center in Sharjah, we use this hierarchy for data:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-6">
                  <tier.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-4">{tier.title}</h3>
                <p className="text-slate-300 leading-relaxed">{tier.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content & Privacy Guarantee */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-brand-blue dark:text-white mb-8">
                Specialized Recovery Services
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">iPhone Data Recovery Sharjah</h3>
                    <p className="text-gray-600 dark:text-gray-400">Recovering data from disabled iPhones, boot loops (Apple logo stuck), and water-damaged iPhone 16/17 series.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hard Drive & SSD Recovery</h3>
                    <p className="text-gray-600 dark:text-gray-400">Is your laptop not booting? We extract data from corrupted SSDs and external hard drives.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Encrypted App Recovery</h3>
                    <p className="text-gray-600 dark:text-gray-400">We specialize in retrieving deleted WhatsApp, Telegram, and SMS messages using secure forensic methods.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-brand-blue/10 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Privacy Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We understand that your data is private. At Al Sharq, we follow a strict Non-Disclosure Protocol. Your recovered data is handed over to you on a secure drive and permanently deleted from our lab systems after verification.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border-l-4 border-brand-orange shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">"The Hook"</h4>
                <p className="text-gray-600 dark:text-gray-400 italic text-sm">
                  "I understand how important those photos are. At Al Sharq, we don't just fix the hardware; we prioritize your data. We offer a 'No Data, No Fee' policy for most recovery cases. We will perform a deep scan of the memory chips, and if we can't retrieve your files, you don't pay the recovery fee. Shall we start the diagnostic?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro-Tip Upsell Section */}
      <section className="py-16 bg-brand-orange/10 dark:bg-brand-orange/5 border-y border-brand-orange/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-brand-blue dark:text-white mb-4">
            Pro-Tip: The "Recovery Bundle"
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            After a successful recovery, always upsell a 2026 Cloud Backup Subscription or a High-Speed External SSD from our shop.
          </p>
          <p className="text-xl font-medium text-brand-orange italic">
            "Now that we've saved your data, let's set up an automated 2026 cloud backup so this never happens again. I can give you a deal on this 1TB Samsung SSD today."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ServiceFAQ 
          title="Frequently Asked Questions - Data Recovery Sharjah"
          pageUrl="https://allsharq.com/data-recovery"
          faqs={recoveryFaqs} 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 mb-20"
        >
          <button 
            onClick={() => onBookNow('Data Recovery')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Sticky Mobile Book Now Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
          <button 
            onClick={() => onBookNow('Data Recovery')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
          >
            Book Consultation Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
