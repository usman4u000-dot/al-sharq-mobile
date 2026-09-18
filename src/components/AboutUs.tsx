import React from 'react';
import { CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const advantages = [
    {
      title: "Expert Diagnosis",
      description: "We use state-of-the-art diagnostic tools to find the root cause of your tech troubles."
    },
    {
      title: "Genuine Quality",
      description: "As an established Trading LLC, we source only the most reliable parts and premium accessories."
    },
    {
      title: "Fast Turnaround",
      description: "We know you can’t be without your tech. That’s why we prioritize efficiency without sacrificing quality."
    },
    {
      title: "Full Spectrum Service",
      description: "Whether you need a screen fix, a new gaming rig, or a rugged phone case, we are your one-stop shop."
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* A Decade of Excellence Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 bg-brand-blue dark:bg-slate-950"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a783?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="A Decade of Excellence in Tech" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/80 to-transparent dark:from-slate-900/95 dark:via-slate-900/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-transparent to-transparent dark:from-slate-900/90"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange font-bold text-sm mb-6 backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span>Est. 2014</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Your Trusted Tech Hub in Sharjah.
              </h2>
              <p className="text-lg md:text-xl text-blue-50 mb-6 leading-relaxed">
                Al Sharq Mobile Phone and Computer Trading is your trusted tech hub in Sharjah. Located in Muwaileh, we specialize in expert mobile repair, laptop repairs, micro soldering, and performance upgrades.
              </p>
              <p className="text-lg text-blue-100 leading-relaxed hidden md:block">
                We also supply a massive range of original smartphones and computer accessories for both retail and wholesale customers across the UAE. Our goal is simple: deliver reliable engineering and quality products right to your doorstep at a fair price.
              </p>
            </div>
            
            {/* Stats/Badges within the banner */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-4xl font-extrabold text-brand-orange mb-2">12+</div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">Years Exp.</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-4xl font-extrabold text-brand-orange mb-2">50k+</div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">Repairs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-4xl font-extrabold text-brand-orange mb-2">100%</div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">Genuine</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-4xl font-extrabold text-brand-orange mb-2">24/7</div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Al Sharq Advantage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-700 transition-colors"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">The Al Sharq Advantage</h3>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-blue/5 dark:bg-slate-700 rounded-xl flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-brand-blue dark:text-blue-400 group-hover:text-brand-orange transition-colors" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{advantage.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
