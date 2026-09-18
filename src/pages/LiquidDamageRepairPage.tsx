import React from 'react';
import { Droplet, ShieldAlert, ZapOff, CheckCircle2, XCircle, ArrowRight, Microscope, Wrench, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LiquidDamageRepairPage() {
  const processSteps = [
    {
      icon: Wrench,
      title: "Full Tear-Down",
      description: "We don't use rice. We immediately disassemble the device and remove the motherboard to stop the electrical \"short-circuiting.\""
    },
    {
      icon: Activity,
      title: "Ultrasonic Bath",
      description: "The motherboard is placed in a specialized ultrasonic machine filled with a proprietary 99.9% Isopropyl solution. This uses high-frequency sound waves to \"blast\" away liquid residue from under tiny chips where a brush cannot reach."
    },
    {
      icon: ShieldAlert,
      title: "Chemical De-corrosion",
      description: "We apply a professional-grade chemical treatment to neutralize the oxidation on copper traces, preventing \"slow death\" that usually happens weeks after a spill."
    },
    {
      icon: Microscope,
      title: "Micro-Soldering Repair",
      description: "If the liquid has already burnt a component, our technicians repair the specific trace under a microscope, saving you the cost of a full board replacement."
    }
  ];

  const dosAndDonts = [
    {
      type: 'dont',
      icon: ZapOff,
      title: "DON'T: Try to charge the device.",
      description: "This sends electricity through the liquid and \"fries\" the processor instantly."
    },
    {
      type: 'dont',
      icon: XCircle,
      title: "DON'T: Use a hairdryer.",
      description: "This pushes the moisture deeper into the internal layers."
    },
    {
      type: 'do',
      icon: CheckCircle2,
      title: "DO: Turn the device off immediately.",
      description: "Cut the power to prevent short circuits."
    },
    {
      type: 'do',
      icon: CheckCircle2,
      title: "DO: Bring it to Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) in Muwaileh.",
      description: "Bring it in within 2-4 hours for the highest success rate."
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/liquid-damage-repair" />
        <title>Water Damage Repair Sharjah | Ultrasonic Cleaning | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="Advanced Ultrasonic Chemical Cleaning for liquid-damaged electronics. Fix wet iPhone Sharjah, MacBook liquid damage Muwaileh, and ultrasonic motherboard cleaning UAE." />
        <meta name="keywords" content="Water damage repair Sharjah, MacBook liquid damage Muwaileh, Ultrasonic motherboard cleaning UAE, Fix wet iPhone Sharjah" />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Services', path: '/' },
            { label: 'Phone Repair Services', path: '/phone-repair' },
            { label: 'Liquid Damage Repair' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-6">
                <Droplet className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-4 leading-tight">
                Advanced Ultrasonic Chemical Cleaning
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Professional Restoration for Liquid-Damaged Electronics
              </h2>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Al Sharq "Science-First" Approach</h3>
                <p className="mb-4">
                  Most people think water is the enemy, but it is actually the minerals and corrosion left behind that destroy your device. Our advanced chemical cleaning process is designed to stop corrosion in its tracks before it reaches the CPU.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=2000&fm=webp" 
                alt="Motherboard Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                  <p className="font-semibold text-lg flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-400" />
                    Water Damage Repair Sharjah
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4-Stage Process */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white flex items-center justify-center gap-3">
                <Microscope className="w-8 h-8 text-brand-orange" />
                Our 4-Stage Restoration Process
              </h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 dark:bg-slate-700/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-blue/10 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                      <step.icon className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                    </div>
                    <div className="text-sm font-bold text-brand-orange mb-2">STAGE {index + 1}</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dos and Don'ts */}
          <div className="mb-20 bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Customer "Dos & Don'ts"</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Crucial steps to take immediately after liquid damage.</p>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Don'ts */}
              <div className="space-y-6">
                {dosAndDonts.filter(item => item.type === 'dont').map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"
                  >
                    <div className="mt-1 shrink-0">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 dark:text-red-400 mb-1">{item.title}</h4>
                      <p className="text-red-700 dark:text-red-300/80 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dos */}
              <div className="space-y-6">
                {dosAndDonts.filter(item => item.type === 'do').map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30"
                  >
                    <div className="mt-1 shrink-0">
                      <item.icon className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 dark:text-green-400 mb-1">{item.title}</h4>
                      <p className="text-green-700 dark:text-green-300/80 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book an Emergency Repair
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
