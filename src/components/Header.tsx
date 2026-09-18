import React from 'react';
import { motion } from 'motion/react';
import { Cpu, MapPin, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md shadow-indigo-200">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
                Al Sharq
              </h1>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Mobile & Computer Trading
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Sharjah</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+971 50 711 7043</span>
            </div>
            <button className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              Book Repair
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
