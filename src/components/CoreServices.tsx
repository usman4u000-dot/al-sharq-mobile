import React from 'react';
import { Cpu, HardDrive, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CoreServices() {
  const services = [
    {
      icon: Cpu,
      title: "Chip-Level Logic Board Repairs",
      link: "/logic-board-repair",
      description: "Our micro-soldering experts diagnose and repair complex motherboard issues, saving devices that others might consider unfixable. We specialize in MacBook Logic Board Repair UAE."
    },
    {
      icon: HardDrive,
      title: "Data Recovery",
      link: "/data-recovery",
      description: "Lost your photos or important files? We use advanced techniques to recover data from water-damaged or dead devices. Trust the Data Recovery Specialist Sharjah."
    },
    {
      icon: Smartphone,
      title: "Certified Pre-Owned Devices",
      link: "/shop",
      description: "Looking for an upgrade? We offer a wide selection of thoroughly tested, certified pre-owned smartphones and laptops with warranty."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue to-blue-900 dark:from-slate-900 dark:to-slate-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&fm=webp')] bg-cover bg-center mix-blend-overlay"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Core Services by Al Sharq Mobile Phone & Computer Trading LLC
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              At Techfix & Gidgets, we go beyond basic screen replacements. We specialize in advanced technical solutions, from micro-soldering to <Link to="/data-recovery" className="underline hover:text-brand-orange transition-colors">data recovery</Link>, ensuring your digital life runs smoothly. We are your go-to for <Link to="/laptop-repair" className="underline hover:text-brand-orange transition-colors">Laptop Repair Sharjah</Link> and <Link to="/macbook-repair" className="underline hover:text-brand-orange transition-colors">Fast MacBook Repair Sharjah</Link>.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                hover: { y: -8, backgroundColor: "rgba(255, 255, 255, 0.2)", transition: { duration: 0.3 } },
                tap: { scale: 0.98 }
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center shadow-xl flex flex-col group cursor-pointer"
            >
              <Link to={service.link} className="flex flex-col h-full focus:outline-none">
                <motion.div 
                  className="w-20 h-20 mx-auto bg-brand-orange/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300"
                  variants={{
                    hover: { scale: 1.15, rotate: [0, -15, 15, -15, 0], transition: { duration: 0.5 } },
                    tap: { scale: 0.9 }
                  }}
                >
                  <service.icon className="w-10 h-10 text-brand-orange group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-blue-100 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
