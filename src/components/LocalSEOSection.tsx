import React from 'react';
import { MapPin, Navigation, Clock, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';

export default function LocalSEOSection() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" />
              Serving All of Sharjah
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Looking for <span className="text-brand-blue dark:text-blue-400">"Mobile Phone Repair Near Me"</span> in Sharjah?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Al Sharq Mobile Phone and Computer Trading is Sharjah’s premier destination for professional device repair and wholesale electronics. Located in Muwaileh, we specialize in advanced laptop repairs, MacBook micro-soldering, and fast mobile screen replacements. We also supply a wide range of original smartphones and premium accessories for retail and B2B clients. Whether you need a complex motherboard fix or a new iPhone, our engineering team delivers reliable, transparent service you can trust.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Whether you need a quick <Link to="/screen-repair" className="text-brand-orange hover:underline font-medium">mobile screen repair near me</Link>, a reliable <Link to="/battery-repair" className="text-brand-orange hover:underline font-medium">phone battery replacement near me</Link>, or just a <strong>cheap mobile repair near me</strong> that doesn't compromise on quality, our certified technicians are ready to help. Stop searching for "<strong>phone fixing near me Sharjah</strong>", "<Link to="/phone-repair" className="text-brand-orange hover:underline font-medium">mobile repair Sharjah</Link>", or "<strong>mobile phone shop near me</strong>" and visit our lab today for <Link to="/data-recovery" className="text-brand-orange hover:underline font-medium">Professional Repair Sharjah</Link>!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-1">
                  <Navigation className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Central Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Easily accessible from anywhere in Sharjah, especially Muwaileh and University City.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Fast Turnaround</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Most "near me" searches end with our 30-minute express repair service.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <TiltCard>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                  alt="Mobile Shop Near Me in Sharjah" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Al Sharq Mobile Phone</h3>
                  <p className="text-blue-100 flex items-center gap-2 mb-4 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh, Sharjah
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-blue rounded-xl font-bold hover:bg-gray-50 transition-colors w-fit pointer-events-auto"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions (Google Maps)
                  </a>
                </div>
              </div>
            </TiltCard>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Call Us Now</div>
                  <div className="font-bold text-gray-900 dark:text-white">+971 50 711 7043</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
