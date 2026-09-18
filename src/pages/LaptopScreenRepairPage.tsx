import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Monitor, Wrench, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  onBookNow: (service?: string) => void;
}

export default function LaptopScreenRepairPage({ onBookNow }: Props) {
  return (
    <div className="pt-20">
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/laptop-screen-repair" />
        <title>Laptop Screen Repair Sharjah | MacBook Display Replacement Muwaileh</title>
        <meta name="description" content="Expert Laptop Screen Replacement & Repair in Sharjah. Specializing in OLED, 4K, and Gaming Displays for MacBook, Dell, HP, Lenovo, and Acer." />
        <meta name="keywords" content="Laptop Screen Repair Sharjah, MacBook Display Replacement Muwaileh, Broken Laptop Hinge Fix Sharjah, Computer Repair, OLED Laptop Repair UAE" />
      </Helmet>

      <div className="pt-24 pb-4 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/laptop-repair' },
            { label: 'Laptop Screen Repair' }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 bg-brand-blue dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Expert Laptop Screen Replacement & Repair
            </h1>
            <p className="text-xl text-blue-200 leading-relaxed mb-8">
              Sharjah’s Authority for OLED, 4K, and Gaming Displays
            </p>
            <button
              onClick={() => onBookNow('Laptop Screen Repair')}
              className="px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              Book Screen Repair <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            In 2026, laptop screens are more advanced than ever—with OLED, 120Hz, and ultra-thin panels—but they are also more fragile. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we treat every screen repair as a surgical procedure.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            A broken screen doesn't just block your view; it can lead to "ghost touches" or internal cable damage. Since 2014, we have been the most trusted lab in Sharjah for resolving complex display issues for all brands, including MacBook, Dell, HP, Lenovo, and Acer.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8 text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                1. Professional LCD & OLED Replacement
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We source only A+ Grade panels that match your original manufacturer’s brightness (nits) and color accuracy.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Why Choose Us?</strong> Many shops install "budget" panels that look dim or yellowish. At Al Sharq, we verify every screen with a 10-point pixel test before it leaves our lab.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                2. Cracked Hinge & Frame Restoration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Is your screen flickering when you move the lid? This is often a failing hinge putting pressure on the display cable (EDP/LVDS).
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>The Al Sharq Standard:</strong> We don't just replace the screen; we reinforce the internal hinge anchors to ensure the new display never cracks from mechanical stress again.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                3. Flickering & Vertical Line Diagnostics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Lines on the screen aren't always a broken panel—they can be a failing GPU or a loose internal connector.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>The Al Sharq Standard:</strong> We perform a "Bypass Test" using an external monitor. This ensures we don’t charge you for a new screen if the problem is actually a simple cable adjustment or a motherboard issue.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommendations Table */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">
              Screen Repair Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find out what screen technology your laptop uses and our repair recommendation.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900 text-brand-blue dark:text-white">
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-800 rounded-tl-xl">Laptop Type</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-800">Screen Tech</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-800 rounded-tr-xl">Repair Recommendation</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">Business (HP/Dell)</td>
                  <td className="p-4">FHD IPS</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                      <CheckCircle className="w-4 h-4" /> Highly Recommended
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">- Affordable & fast.</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">Creative (MacBook)</td>
                  <td className="p-4">Liquid Retina/OLED</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-brand-orange font-medium">
                      <CheckCircle className="w-4 h-4" /> Essential
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">- Restores 100% device value.</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 rounded-bl-xl">Budget (Acer/Lenovo)</td>
                  <td className="p-4">TN Panel</td>
                  <td className="p-4 rounded-br-xl">
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                      <CheckCircle className="w-4 h-4" /> Recommended
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">- Cheaper than a new unit.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Marketing / Calibration Section */}
      <section className="py-24 bg-brand-blue dark:bg-slate-950 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional Screen Calibration
              </h2>
              <p className="text-xl text-blue-200 mb-6 leading-relaxed">
                "At Al Sharq Mobile Phone & Computer Trading LLC, we don't just change the glass; we restore the colors. 🎨 Professional screen calibration included with every premium repair."
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">#SharjahTech</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">#Muwaileh</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">#LaptopRepair</span>
              </div>
              <button
                onClick={() => onBookNow('Laptop Screen Repair')}
                className="px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img loading="lazy" src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop" 
                  alt="Laptop Screen Calibration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">A+ Grade Panels</p>
                    <p className="text-sm text-gray-500">10-point pixel test verified</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
