import React from 'react';
import { Laptop, Zap, Wrench, Monitor, HardDrive, ArrowRight, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ComputerRepairPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  const services = [
    {
      id: "macbook-specialist",
      icon: Laptop,
      title: "MacBook Specialist",
      description: "Expert logic board and screen fixes for M2, M3, and M4 Macs."
    },
    {
      id: "performance-boost",
      icon: Zap,
      title: "Performance Boost",
      description: "SSD and RAM upgrades to make old PCs faster than new ones."
    },
    {
      id: "hardware-fixes",
      icon: Wrench,
      title: "Hardware Fixes",
      description: "Repairing broken hinges, keyboards, and cooling fans."
    },
    {
      id: "software-os",
      icon: Monitor,
      title: "Software & OS",
      description: "Professional Windows/macOS installation and malware removal."
    },
    {
      id: "data-recovery",
      icon: HardDrive,
      title: "Data Recovery",
      description: "Securely retrieving lost files from damaged hard drives."
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/computer-repair" />
        <title>Laptop & MacBook Repair Sharjah | SSD Upgrades & PC Fix | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="Professional computer solutions in Sharjah. Specialist MacBook logic board repair, SSD upgrades, and Windows/macOS support. 12+ years of experience fixing Dell, HP, Lenovo, and Apple. Revive your slow laptop today at Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)." />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Repairs', path: '/laptop-repair' },
            { label: 'Computer Repair' }
          ]} />

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
                Computer & Laptop Solutions
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Professional Computing Solutions
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Revive your tech with Sharjah’s most trusted computing specialists. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we provide comprehensive solutions for MacBooks, Windows laptops, and custom PCs. Whether you need a high-speed <a href="#performance-boost" className="text-brand-orange hover:underline font-semibold">SSD upgrade</a> to boost 2026 performance or expert logic board repairs, our team has over a decade of technical expertise. We pride ourselves on transparent diagnostics and professional hardware support that keeps your home or business running smoothly.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img loading="lazy" src="https://picsum.photos/seed/laptop-repair-tech/800/600" 
                alt="Professional Computer Repair" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Our Key Solutions</h3>
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
                {service.id === 'macbook-specialist' && (
                  <Link 
                    to="/macbook-repair"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-orange-600 transition-colors"
                  >
                    View MacBook Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Specialist Laptop & Computer Hardware */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Specialist Laptop & Computer Hardware</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Targeting Sharjah's professional and student community in Muwaileh/Al Jada. In 2026, professional hardware repair is about Micro-Soldering, AI-Driven Diagnostics, and Module Restoration.
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
                    <Cpu className="w-6 h-6 text-brand-orange" />
                    M-Series Logic Board Restoration
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Expert repair for MacBook Pro M3/M4 logic boards. We fix power rail shorts and display driver circuits, saving you thousands compared to a full board replacement.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <HardDrive className="w-6 h-6 text-brand-orange" />
                    NVMe Gen5 SSD Upgrades
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Boost your laptop speed to 10,000MB/s. We migrate your OS and data perfectly so your 3-year-old laptop feels faster than a brand-new model.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-brand-orange" />
                    Thermal Management Pro
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    High-conductivity liquid metal application and internal fan cleaning. Essential for Sharjah's heat to prevent CPU "throttling" and hardware failure.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-brand-orange" />
                    Hinge & Body Structural Fixes
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Precision bonding and replacement of metal hinges for MacBooks and Windows laptops to prevent screen cable tearing.
                  </p>
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
                    <h4 className="font-bold text-gray-900 dark:text-white">Laptop Hardware Pricing</h4>
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
                        <td className="p-4 font-medium text-gray-900 dark:text-white">Laptop SSD Upgrade (1TB)</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">315 – 550</td>
                        <td className="p-4 text-brand-orange font-medium">Same-Day</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">MacBook Logic Board Fix</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">700 – 1,500</td>
                        <td className="p-4 text-brand-orange font-medium">2–5 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">Laptop Battery (Internal)</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">367 – 450</td>
                        <td className="p-4 text-brand-orange font-medium">Same-Day</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Software & OS Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brand-blue dark:text-white">Software & OS Optimization</h3>
              <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                To stay ahead, your Software & OS services must focus on optimization and protection against "Silicon Strain." We don't just "install" software; we optimize it for the unique Sharjah environment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* OS Installation & Performance Tuning */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Monitor className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">OS Installation & Tuning</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">macOS Tahoe Specialized Support</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Full support for the latest v26.3.1. We fix App Library glitches, revamp search features, and ensure M-series chip compatibility.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Windows 11 AI Optimization</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Disabling unnecessary background AI tasks to prevent overheating and "Silicon Strain" on older laptop CPUs.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Bloatware Removal</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">A clean OS installation with only the essential drivers to ensure your laptop runs 30% faster than a factory-standard setup.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Dual-Boot & Virtualization</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Setting up Parallels or BootCamp for Sharjah professionals who need both Windows and macOS on a single device.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Security, Malware & AI-Data Recovery */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Security & AI-Data Recovery</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">Since 2014, Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) has been the trusted name for data integrity in the UAE.</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Ransomware Protection (2026 Edition)</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Advanced security hardening to protect your business data from "intelligent" ransomware that targets local backups.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Deep Malware Cleanse</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Removing sophisticated spyware and "rootkits" that standard antivirus software misses.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white"><Link to="/data-recovery" className="hover:text-brand-orange transition-colors underline">AI-Driven Data Recovery</Link></strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Using 2026 probabilistic algorithms to recover data from corrupted SSDs or formatted hard drives with a 95% success rate.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 dark:text-white">Cloud Backup Integration</strong>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Syncing your data with secure, locally-optimized cloud solutions for 24/7 disaster recovery.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Pricing Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">Software & OS Pricing</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400 text-sm">
                          <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Service Type</th>
                          <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Technical Detail</th>
                          <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Price (AED)</th>
                          <th className="p-4 font-semibold border-b border-slate-200 dark:border-slate-700">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">OS Reinstallation</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">Windows 11 / macOS Tahoe (Genuine)</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">150 – 200</td>
                          <td className="p-4 text-brand-orange font-medium">1 Hour</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">Full System Clean-up</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">Malware removal + Optimization</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">100 – 150</td>
                          <td className="p-4 text-brand-orange font-medium">45 Mins</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white"><Link to="/data-recovery" className="hover:text-brand-orange transition-colors underline">Data Recovery</Link></td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">Initial Diagnostic & Recovery</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">From 500</td>
                          <td className="p-4 text-brand-orange font-medium">1–3 Days</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">New Laptop Setup</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">Updates, Antivirus, & Office 2026</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">149</td>
                          <td className="p-4 text-brand-orange font-medium">1 Hour</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">Licensed Software</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">MS Office 2026 / Adobe Suite</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">Market Rates</td>
                          <td className="p-4 text-brand-orange font-medium">30 Mins</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>

              <div>
                {/* Pro-Tip Sidebar */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl p-8 text-white shadow-xl h-full flex flex-col justify-center"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">Pro-Tip for 2026: "The Smart Reset"</h4>
                  <p className="text-orange-50 leading-relaxed">
                    We encourage our customers to perform a "Smart Reset" every 6 months. After multiple updates, 2026 software can feel sluggish. A professional reset at Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) clears cache saturations and restores the "day-one" speed of your device.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button 
              onClick={() => onBookNow('Computer Repair')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
            >
              Book a Repair
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
