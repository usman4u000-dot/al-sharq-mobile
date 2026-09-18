import React from 'react';
import { Sparkles, ShieldCheck, Award, Bike, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AdvancedServicesProps {
  onBookNow: (serviceName?: string) => void;
}

export default function AdvancedServices2026({ onBookNow }: AdvancedServicesProps) {
  const services = [
    {
      icon: Sparkles,
      title: 'AI Device Rejuvenation',
      description: 'Is your iPhone 17 or S26 overheating during heavy AI tasks? Our "AI-Ready Tune-up" includes internal thermal repasting and AI-driven battery recalibration to prevent thermal throttling.',
      actionText: 'Optimize My Device',
      serviceName: 'AI Device Rejuvenation'
    },
    {
      icon: ShieldCheck,
      title: '"Sharjah Shield" Protection',
      description: 'Fine sand and humidity destroy charging ports. We apply a high-grade hydrophobic nano-coating to internal ports, complete with custom dust plugs and a 1-year port cleaning warranty.',
      actionText: 'Get Sharjah Shield',
      serviceName: 'Sharjah Shield Protection',
      videoLink: '#sharjah-shield-video'
    },
    {
      icon: Award,
      title: 'Al Sharq Heritage Editions',
      description: 'Join the Circular Economy. Our "Pre-Loved" Heritage Sales feature high-end models (like iPhone 14/15) fully refurbished with original batteries, premium packaging, and a 12-month warranty.',
      actionText: 'Shop Heritage Editions',
      serviceName: 'Heritage Edition Inquiry'
    },
    {
      icon: Bike,
      title: 'Repair-while-you-Study',
      description: 'Exclusive for AUS and University of Sharjah students. We pick up your phone from the campus gate, repair it in Muwaileh, and deliver it back before your next lecture ends. Loaner phones available!',
      actionText: 'Request Campus Pickup',
      serviceName: 'Campus Pickup Repair'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>New for 2026</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-white mb-6">
              Next-Gen Services for Sharjah
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We've adapted to the latest global trends—AI, sustainability, and Right to Repair—to bring you exclusive services designed specifically for the Sharjah and Muwaileh community.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
            >
              <div className="w-16 h-16 bg-brand-blue/5 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                <service.icon className="w-8 h-8 text-brand-blue dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <button
                  onClick={() => onBookNow(service.serviceName)}
                  className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-brand-orange/80 transition-colors group/btn"
                >
                  {service.actionText}
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
                
                {service.videoLink && (
                  <a 
                    href={service.videoLink}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue dark:text-blue-400 hover:text-brand-orange transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Slow Motion Video: Watch how much sand gets into a phone after just one month in Muwaileh, and how our cleaning process removes it!");
                    }}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Watch Video
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
