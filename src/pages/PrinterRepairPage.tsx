import React from 'react';
import { Printer, ShieldCheck, Wrench, PackageSearch, ArrowRight, CheckCircle2, Factory } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrinterRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const services = [
    {
      id: "hp-repair",
      icon: Printer,
      title: "HP OfficeJet & LaserJet",
      description: "Expert paper jam resolution, fuser replacements, and complete logic board repair."
    },
    {
      id: "canon-repair",
      icon: Printer,
      title: "Canon Pixma & Maxify",
      description: "Printhead unclogging, error code clearing, and ink absorption pad replacements."
    },
    {
      id: "epson-repair",
      icon: Printer,
      title: "Epson EcoTank & WorkForce",
      description: "Advanced continuous ink system fixes and precision roller realignment."
    },
    {
      id: "samsung-brother",
      icon: Printer,
      title: "Samsung & Brother",
      description: "Drum unit resets, toner delivery system repairs, and fixing connectivity issues."
    },
    {
      id: "heavy-duty-plotters",
      icon: Factory,
      title: "Plotters & Photocopiers",
      description: "Heavy-duty commercial systems maintenance (Konica Minolta, Xerox, etc)."
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/printer-repair" />
        <title>Expert Printer Maintenance Service | Noor's Printer UAE</title>
        <meta name="description" content="Welcome to Noor's Printer, your trusted partner for all types of printer solutions and maintenance services across Dubai, Sharjah, Abu Dhabi, and Fujairah." />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Services', path: '/' },
            { label: 'Printer Repair' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <Printer className="w-8 h-8 text-brand-orange" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 leading-tight">
                Expert Printer Maintenance Service Across UAE
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Welcome to Noor’s Printer
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Your trusted partner for all types of printer solutions and maintenance services across Dubai, Sharjah, Abu Dhabi, and Fujairah. We specialize in fixing, maintaining, and servicing printers, plotters, and photocopiers of all major brands including <span className="font-bold text-brand-blue dark:text-white">HP, Canon, Epson, Samsung, Brother, and Konica Minolta</span>.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "No Hidden Charges",
                  "All Brands Supported",
                  "On-Site Repair",
                  "Service Warranty"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-1.5 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070&auto=format&fit=crop" 
                alt="Expert Printer Repair and Maintenance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Printer Repair Expertise</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group"
              >
                <div className="bg-brand-blue/5 dark:bg-slate-700 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                  {service.description}
                </p>
                <button
                  onClick={() => onBookNow(`${service.title} Printer Service`)}
                  className="font-semibold text-brand-orange hover:text-orange-600 flex items-center gap-2 transition-colors"
                >
                  Request Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-blue dark:bg-slate-950 p-12 rounded-3xl text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
               <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-brand-orange" />
               <h3 className="text-3xl font-bold mb-4">Fast On-Site Response</h3>
               <p className="text-lg text-blue-100 mb-8 font-medium">
                 Don't let a broken printer halt your business. Contact Noor’s Printer today for professional diagnostics and on-site servicing throughout the UAE.
               </p>
               <button 
                onClick={() => onBookNow("Printer Maintenance Priority Response")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:-translate-y-1"
               >
                 <Wrench className="w-5 h-5" />
                 Book a Technician Now
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
