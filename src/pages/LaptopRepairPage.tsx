import React, { useState } from 'react';
import { Laptop, Zap, Wrench, Monitor, HardDrive, ArrowRight, Cpu, ShieldCheck, CheckCircle2, Battery } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceFAQ from '../components/ServiceFAQ';
import ImageCarousel from '../components/ImageCarousel';

export default function LaptopRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Screen Repair', 'Battery Replacement', 'Logic Board Repair', 'Data Recovery', 'Hardware'];

  const laptopImages = [
    {
      url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=2070&fm=webp",
      alt: "Professional Laptop Repair",
      caption: "Expert Logic Board Micro-Soldering"
    },
    {
      url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=2070&fm=webp",
      alt: "Laptop Screen Replacement",
      caption: "Fast Screen Replacements for All Brands"
    },
    {
      url: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=2074&fm=webp",
      alt: "MacBook Repair",
      caption: "Specialized MacBook Repair & Support"
    }
  ];

  const brands = [
    { name: "Apple MacBook Air", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Apple MacBook Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Apple iMac", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Microsoft Surface Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" },
    { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
    { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
    { name: "Asus", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
    { name: "Toshiba", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Toshiba_logo.svg" },
    { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
    { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg" },
    { name: "Huawei", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Huawei_logo.svg" },
    { name: "Sony Vaio", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/VAIO_logo.svg" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  ];

  const services = [
    {
      id: "macbook-specialist",
      icon: Laptop,
      title: "MacBook Repair Sharjah",
      description: "Expert logic board and screen fixes for M2, M3, and M4 Macs. MacBook Repair and Support in Sharjah.",
      category: "Logic Board Repair"
    },
    {
      id: "screen-repair",
      icon: Monitor,
      title: "Screen Repair",
      description: "Fast and reliable screen replacements for all laptop brands.",
      category: "Screen Repair"
    },
    {
      id: "battery-replacement",
      icon: Battery,
      title: "Battery Replacement",
      description: "High-quality battery replacements to restore your laptop's portability.",
      category: "Battery Replacement"
    },
    {
      id: "performance-boost",
      icon: Zap,
      title: "Performance Boost",
      description: "SSD and RAM upgrades to make old PCs faster than new ones.",
      category: "Hardware"
    },
    {
      id: "hardware-fixes",
      icon: Wrench,
      title: "Hardware Fixes",
      description: "Repairing broken hinges, keyboards, and cooling fans.",
      category: "Hardware"
    },
    {
      id: "gaming-laptop",
      icon: Cpu,
      title: "Gaming Laptop Repair",
      description: "Thermal repasting, GPU reflowing, and fan replacements for high-end gaming rigs.",
      category: "Logic Board Repair"
    },
    {
      id: "data-recovery",
      icon: HardDrive,
      title: "Data Recovery",
      description: "Securely retrieving lost files from damaged hard drives.",
      category: "Data Recovery"
    },
    {
      id: "other-laptop",
      icon: Wrench,
      title: "Other Laptop Repair",
      description: "We fix all brands and models, even if they aren't listed here.",
      category: "Hardware"
    }
  ];

  const laptopFaqs = [
    {
      question: "My laptop is running very slow, what can I do?",
      answer: "We suggest checking for background processes, running virus scans, and considering an SSD upgrade to dramatically improve performance."
    },
    {
      question: "How long does a laptop screen repair take?",
      answer: "Most laptop screen repairs are completed within 1 to 2 hours, depending on the model and parts availability. We stock screens for popular MacBook, Dell, HP, and Lenovo models."
    },
    {
      question: "Can you upgrade my old, slow laptop?",
      answer: "Absolutely! Upgrading your hard drive to a solid-state drive (SSD) and adding more RAM are the most cost-effective ways to make an old laptop feel brand new. We can usually complete this in a few hours."
    },
    {
      question: "Do you fix liquid-damaged MacBooks?",
      answer: "Yes, we specialize in logic board micro-soldering and liquid damage repair for MacBooks and Windows laptops. Turn off the device immediately and bring it in as soon as possible for the best chance of recovery."
    },
    {
      question: "Is there a warranty on laptop repairs?",
      answer: "Yes, we provide a 90-day warranty on all laptop hardware repairs and replacement parts, giving you peace of mind."
    },
    {
      question: "Do I need to make an appointment?",
      answer: "Walk-ins are always welcome! However, booking an appointment online ensures you get priority service and minimizes your wait time."
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
      "name": "Laptop repair Sharjah",
      "serviceType": "Computer Repair",
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
      "description": "Professional laptop repair in Sharjah. We fix MacBook Air, MacBook Pro, iMac, Microsoft Surface, Lenovo, Dell, HP, Asus, Acer, Gaming Laptops and more.",
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
        "name": "Laptop repair Sharjah",
        "item": "https://allsharq.com/services/laptop-repair"
      }
    ]
  };

  const filteredServices = activeFilter === 'All' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/laptop-repair" />
        <title>Laptop repair Sharjah | MacBook, Dell, HP, Lenovo | Al Sharq</title>
        <meta name="description" content="Professional laptop repair in Sharjah. We fix MacBook Air, MacBook Pro, iMac, Microsoft Surface, Lenovo, Dell, HP, Asus, Acer, Gaming Laptops and more." />
        <meta name="keywords" content="Laptop repair Sharjah, laptop screen repair, MacBook repair Muwaileh, SSD upgrade Sharjah" />
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
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">Laptop Repair</span>
          </nav>

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
                Laptop repair Sharjah
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                MacBook Repair and Support in Sharjah
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Revive your tech with Sharjah’s most trusted computing specialists. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we provide comprehensive solutions for <strong>MacBooks</strong>, <strong>Windows laptops</strong>, and <strong>Gaming PCs</strong>. Whether you need a high-speed SSD upgrade, expert logic board repairs, or a screen replacement, our team has over a decade of technical expertise.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full"
            >
              <ImageCarousel images={laptopImages} />
            </motion.div>
          </div>

          {/* Brands We Fix */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Brands We Repair</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
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
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Key Solutions</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredServices.map((service, index) => (
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
                {service.id === 'macbook-specialist' && (
                  <Link 
                    to="/macbook-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View MacBook Services <ArrowRight className="w-4 h-4 ml-1" />
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
              </motion.div>
            ))}
          </div>

          <ServiceFAQ 
            title="Frequently Asked Questions - Laptop Repair Sharjah"
            pageUrl="https://allsharq.com/services/laptop-repair"
            faqs={laptopFaqs} 
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20 mb-20"
          >
            <button 
              onClick={() => onBookNow('Laptop Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Sticky Mobile Book Now Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
            <button 
              onClick={() => onBookNow('Laptop Repair')}
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
