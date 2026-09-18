import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Search, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IMEICheckerProps {
  onBookNow: () => void;
}

export default function IMEIChecker({ onBookNow }: IMEICheckerProps) {
  const [imei, setImei] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'checked'>('idle');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (imei.length < 8) return;
    
    setStatus('loading');
    
    // Simulate API lookup
    setTimeout(() => {
      setStatus('checked');
    }, 2000);
  };

  const handleReset = () => {
    setImei('');
    setStatus('idle');
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background aesthetic */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold mb-4 border border-blue-500/20">
            <ShieldAlert className="w-4 h-4" /> Save up to 40% vs OEM
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Is your Official Warranty Expired?
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Enter your Serial Number or IMEI (dial *#06#). If your Apple or Samsung warranty has expired, we can fix it for a fraction of the official cost.
          </p>

          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCheck} 
                className="flex flex-col sm:flex-row gap-3 max-w-lg"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={imei}
                    onChange={(e) => setImei(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                    placeholder="Enter IMEI or Serial No."
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-orange outline-none transition-all placeholder-gray-500 uppercase font-mono"
                    maxLength={15}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={imei.length < 8}
                  className="bg-brand-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 whitespace-nowrap"
                >
                  Verify Now
                </button>
              </motion.form>
            )}

            {status === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-brand-orange bg-slate-800 border border-slate-700 py-4 px-6 rounded-xl w-fit"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">Connecting to OEM database...</span>
              </motion.div>
            )}

            {status === 'checked' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 border border-slate-700 p-6 rounded-2xl max-w-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-red-400 font-bold mb-1">Out of Official Warranty</h4>
                    <p className="text-sm text-gray-300">
                      Device <strong>{imei}</strong> is no longer covered by manufacturer warranty. Official service centers will charge you premium out-of-warranty rates.
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 mb-6">
                  <p className="text-brand-orange font-medium text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> 
                    Al Sharq Alternative:
                  </p>
                  <p className="text-white text-sm mt-1">
                    We can repair this device today using Grade-A OEM replacement parts for up to 40% less.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={onBookNow}
                    className="flex-1 bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    View Our Prices <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-4 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Check Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative / Image side */}
        <div className="hidden md:block w-72 shrink-0">
           <img 
             src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600" 
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
             alt="Protect your device" 
             className="w-full h-auto drop-shadow-2xl opacity-80 mix-blend-luminosity rounded-2xl"
             referrerPolicy="no-referrer"
           />
        </div>
      </div>
    </div>
  );
}
