import React from 'react';
import { Tablet, Battery, Droplet, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Monitor } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

export default function TabletRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const brands = [
    { name: "Apple iPad", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Samsung Galaxy Tab", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" },
    { name: "Microsoft Surface", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Huawei", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Huawei_logo.svg" },
    { name: "Asus", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
    { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg" },
    { name: "Amazon Fire", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  ];

  const services = [
    {
      id: "apple-ipad-repair",
      icon: Tablet,
      title: "Apple iPad Repair",
      description: "Expert screen replacements and battery fixes for all standard iPad models."
    },
    {
      id: "apple-ipad-pro-repair",
      icon: Monitor,
      title: "Apple iPad Pro Repair",
      description: "Specialized care for iPad Pro displays, FaceID, and logic board issues."
    },
    {
      id: "apple-ipad-mini-repair",
      icon: Tablet,
      title: "Apple iPad Mini Repair",
      description: "Compact repairs for iPad Mini, including charging ports and screens."
    },
    {
      id: "samsung-tablet-repair",
      icon: Tablet,
      title: "Samsung Tablet Repair",
      description: "Samsung Galaxy Tab screen replacements and software troubleshooting."
    },
    {
      id: "lenovo-tablet-repair",
      icon: Tablet,
      title: "Lenovo Tablet Repair",
      description: "Hardware and software fixes for Lenovo Yoga and Tab series."
    },
    {
      id: "acer-tablet-repair",
      icon: Tablet,
      title: "Acer Tablet Repair",
      description: "Reliable repairs for Acer Iconia and other Acer tablet models."
    },
    {
      id: "asus-tablet-repair",
      icon: Tablet,
      title: "Asus Tablet Repair",
      description: "Screen, battery, and motherboard repairs for Asus ZenPad and more."
    },
    {
      id: "android-tablet-repair",
      icon: Cpu,
      title: "Android Tablet Repair",
      description: "Comprehensive repair services for all major Android tablet brands."
    },
    {
      id: "other-tablet-repair",
      icon: ShieldCheck,
      title: "Other Tablet Repair",
      description: "Got a different brand? We fix Huawei, Microsoft Surface, and more."
    }
  ];

  const tabletFaqs = [
    {
      q: "How long does an iPad screen repair take?",
      a: "Most iPad screen repairs are completed within 2 to 4 hours. However, complex repairs on iPad Pro models might take a bit longer to ensure proper sealing and calibration."
    },
    {
      q: "My tablet is not charging. Is it the battery or the port?",
      a: "It could be either, or simply dirt in the charging port. Bring it in for a free diagnostic. We will clean the port first, and if that doesn't work, we can replace the battery or the charging port."
    },
    {
      q: "Can you fix a bent iPad?",
      a: "Yes, we have specialized tools to carefully straighten bent iPad enclosures. It's important to fix this before replacing the screen to ensure the new screen fits perfectly."
    },
    {
      q: "Do you repair kids' tablets like Amazon Fire?",
      a: "Absolutely! We know how important these are. We repair Amazon Fire tablets, Lenovo tabs, and other popular kids' tablets, usually focusing on screen and charging port replacements."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tablet Repair Services",
    "provider": BUSINESS_PROVIDER_SCHEMA,
    "areaServed": {
      "@type": "City",
      "name": "Sharjah"
    },
    "description": "Expert tablet repair in Sharjah. We fix Apple iPad, iPad Pro, iPad Mini, Samsung, Lenovo, Acer, Asus, and Android tablets.",
    "serviceType": "Tablet Repair"
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
        "name": "Tablet Repair Services",
        "item": "https://allsharq.com/services/tablet-repair"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/tablet-repair" />
        <title>Tablet Repair Sharjah | iPad & Samsung Fixes | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="Expert tablet repair in Sharjah. We fix Apple iPad, iPad Pro, iPad Mini, Samsung, Lenovo, Acer, Asus, and Android tablets. Same-day service with a 90-day warranty." />
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
            { label: 'Tablet Repair Services' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Tablet className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Tablet Repair Services
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Expert iPad & Android Tablet Service
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Whether you use your tablet for digital art, business presentations, or keeping the kids entertained, a broken screen or dead battery brings everything to a halt. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we provide comprehensive <strong>Tablet Repair</strong> services in Sharjah. From <strong>Apple iPad Pro Repair</strong> to <strong>Samsung Tablet Repair</strong>, our certified technicians handle all major brands with precision and care.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2069&auto=format&fit=crop" 
                alt="Expert Tablet Repair Technician" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          {/* Brands We Fix */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Tablet Brands We Repair</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-full flex items-center justify-center">
                    <img loading="lazy" src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      className="max-h-full max-w-full object-contain filter dark:invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-xs font-semibold text-center text-gray-600 dark:text-gray-300">{brand.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Tablet Repair Services</h3>
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
              </motion.div>
            ))}
          </div>

          {/* Acer Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue dark:bg-slate-950 rounded-3xl p-8 md:p-12 text-center shadow-xl mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Expert Acer Tablet Repair (Iconia & Enduro Series)</h3>
            <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we specialize in comprehensive repair services for all Acer tablets. Whether you rely on the consumer-friendly <strong>Acer Iconia</strong> series for daily entertainment or depend on the rugged <strong>Acer Enduro</strong> line for demanding field work, our certified technicians have the expertise to restore your device.
            </p>
            <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              From cracked screens and rapid battery drain to charging port failures and software glitches, we provide precise, factory-standard repairs using high-quality components. We stand behind our craftsmanship, which is why every Acer tablet repair comes with our comprehensive <strong>90-day warranty</strong> for your complete peace of mind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                <span>Iconia Series</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                <span>Enduro Series</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span>90-Day Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="mb-20">
            <ServiceFAQ 
              title="Frequently Asked Questions - Tablet & iPad Repair Sharjah"
              pageUrl="https://allsharq.com/tablet-repair"
              faqs={tabletFaqs.map(f => ({ question: f.q, answer: f.a }))} 
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <button 
              onClick={() => onBookNow('Tablet Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('Tablet Repair')}
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
