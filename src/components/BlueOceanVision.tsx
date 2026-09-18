import React from 'react';
import { motion } from 'motion/react';
import { Activity, RefreshCcw, Printer, Glasses, Recycle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface BlueOceanVisionProps {
  onBookNow: (service?: string) => void;
}

export default function BlueOceanVision({ onBookNow }: BlueOceanVisionProps) {
  const innovations = [
    {
      icon: Activity,
      title: 'AI-Powered "Proactive" Maintenance',
      pitch: '"Our AI predicts your battery will fail in 15 days. Replace it now at a discount to avoid a sudden shutdown."',
      service: 'For a small fee (or free with any repair), provide a digital report analyzing battery impedance, flash memory wear, and sensor accuracy.',
      value: 'Creates "proactive" sales and reduces urgent, stressful walk-ins.'
    },
    {
      icon: RefreshCcw,
      title: 'Subscription-Based "Tech Care" Plans',
      pitch: '"Predictable costs for Sharjah families and University City students."',
      service: 'A monthly subscription (e.g., AED 29/month) that covers: Unlimited screen protector replacements, one free internal cleaning per year, and 20% discount on all logic board repairs.',
      value: 'Locks customers into Al Sharq for life and stabilizes monthly cash flow.'
    },
    {
      icon: Printer,
      title: '3D-Printed Custom Parts & Housing',
      pitch: '"We don\'t just fix it; we make it yours. Custom 3D-printed laptop skins and protective gear available in-store."',
      service: 'Use a desktop 3D printer to create custom-colored phone housings, internal brackets for discontinued laptops, or personalized laptop stands.',
      value: 'Solves the "out of stock" problem for rare older models and attracts the gaming/modding community.'
    },
    {
      icon: Glasses,
      title: 'Remote "Virtual Repair" & AR Support',
      pitch: '"Fix it with an expert, virtually. 15-minute AR consultation for only AED 50."',
      service: 'Use Augmented Reality (AR) via a smartphone app to guide customers through simple software fixes or external cleaning.',
      value: 'Scales expertise without occupying a technician\'s bench space. If they can\'t fix it virtually, they bring it to your shop (guaranteed lead).'
    },
    {
      icon: Recycle,
      title: 'The "Sustainable Tech" Trade-In Hub',
      pitch: '"Eco-friendly tech. Repaired by engineers, guaranteed for a year. 40% cheaper than new."',
      service: 'A "Refurbish-to-Donate" or "Certified Pre-Owned" program. Buy "dead" motherboards, repair them at the chip level, and sell them as "Al Sharq Certified" devices with a 1-year warranty.',
      value: 'High-margin sales on refurbished units that most shops would throw away as "scrap."'
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-brand-orange/20 text-brand-orange font-semibold text-sm mb-4"
          >
            Al Sharq 2026 Vision
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Beyond Standard Repairs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Transforming into a futuristic powerhouse in Sharjah. We are shifting toward AI-driven diagnostics, sustainability, and high-margin specialized services to leapfrog the competition in Muwaileh.
          </motion.p>
        </div>

        {/* 5 Blue Ocean Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {innovations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors group"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                <item.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <div className="space-y-4">
                <div>
                  <strong className="text-brand-orange text-sm uppercase tracking-wider">The Pitch</strong>
                  <p className="text-gray-300 italic mt-1">"{item.pitch}"</p>
                </div>
                <div>
                  <strong className="text-brand-orange text-sm uppercase tracking-wider">The Service</strong>
                  <p className="text-gray-400 mt-1 text-sm">{item.service}</p>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <strong className="text-white text-sm">Business Value:</strong>
                  <p className="text-gray-400 mt-1 text-sm">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
        >
          <div className="p-8 md:p-10 border-b border-slate-700 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">The Evolution of Repair</h3>
            <p className="text-gray-400 mt-2">How Al Sharq is redefining the industry standard in 2026.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="p-6 font-semibold text-gray-300 border-b border-slate-700">Feature</th>
                  <th className="p-6 font-semibold text-gray-400 border-b border-slate-700 border-l border-slate-700/50">2024 (Standard Shop)</th>
                  <th className="p-6 font-semibold text-brand-orange border-b border-slate-700 border-l border-slate-700/50 text-lg">2026 (Al Sharq Vision)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-6 font-medium text-white">Diagnostics</td>
                  <td className="p-6 text-gray-400 border-l border-slate-700/50 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Manual "Trial & Error"
                  </td>
                  <td className="p-6 text-white border-l border-slate-700/50 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" /> AI-Automated Log Analysis
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-6 font-medium text-white">Micro-Repair</td>
                  <td className="p-6 text-gray-400 border-l border-slate-700/50 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Standard Soldering
                  </td>
                  <td className="p-6 text-white border-l border-slate-700/50 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" /> BGA & Laser Micro-Welding
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-6 font-medium text-white">Warranty</td>
                  <td className="p-6 text-gray-400 border-l border-slate-700/50 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> 30-Day Verbal
                  </td>
                  <td className="p-6 text-white border-l border-slate-700/50 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" /> 90-Day Digital + OTP Verified
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-6 font-medium text-white">Customer Journey</td>
                  <td className="p-6 text-gray-400 border-l border-slate-700/50 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Walk-in only
                  </td>
                  <td className="p-6 text-white border-l border-slate-700/50 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" /> WhatsApp AI Bot + On-site Pickup
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => onBookNow('2026 Vision Services')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
          >
            Experience the Future of Repair
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
