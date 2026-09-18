import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Wrench, Sparkles, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function NotFoundPage() {
  const [isRepaired, setIsRepaired] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);

  const handleRepair = () => {
    setIsRepairing(true);
    
    // Add glitching repair effect to whole screen
    document.body.style.animation = 'glitch 0.3s infinite';
    
    setTimeout(() => {
      document.body.style.animation = 'none';
      setIsRepairing(false);
      setIsRepaired(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#f97316', '#ffffff']
      });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found | Al Sharq</title>
        <meta name="robots" content="noindex, follow" />
        <style>{`
          @keyframes glitch {
            0% { transform: translate(2px, 1px) rotate(0deg); filter: hue-rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); filter: hue-rotate(90deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); filter: hue-rotate(180deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); filter: hue-rotate(270deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); filter: hue-rotate(360deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); filter: invert(0.2); }
            60% { transform: translate(-3px, 1px) rotate(0deg); filter: invert(0.8); }
            70% { transform: translate(3px, 1px) rotate(-1deg); filter: hue-rotate(180deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); filter: hue-rotate(0deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); filter: invert(0.5); }
            100% { transform: translate(1px, -2px) rotate(-1deg); filter: invert(0); }
          }
        `}</style>
      </Helmet>
      
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isRepaired ? (
            <motion.div
              key="broken"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              className="max-w-xl mx-auto relative z-10"
            >
              <div className="relative mb-8 inline-block select-none">
                <motion.h1 
                  animate={isRepairing ? { x: [-5, 5, -5], y: [-2, 2, -2] } : {}}
                  transition={{ repeat: Infinity, duration: 0.1 }}
                  className={`text-9xl font-black text-slate-100 dark:text-slate-800 ${isRepairing ? 'text-red-500/50' : ''}`}
                >
                  404
                </motion.h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    animate={isRepairing ? { rotate: [-2, 2, -2] } : { rotate: -5 }}
                    transition={isRepairing ? { repeat: Infinity, duration: 0.1 } : {}}
                    className="text-2xl font-bold bg-white dark:bg-slate-950 px-4 py-2 text-gray-900 dark:text-white shadow-[10px_10px_0_rgba(0,0,0,0.1)] border-2 border-dashed border-red-400 transform"
                  >
                    404: Component Failure
                  </motion.span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Looks like this page is broken.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                No worries, repairing broken tech is literally what we do. Want to try fixing it?
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleRepair}
                  disabled={isRepairing}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all shadow-lg text-white ${
                    isRepairing 
                      ? 'bg-slate-500 cursor-not-allowed scale-95' 
                      : 'bg-brand-orange hover:bg-orange-500 hover:scale-105 active:scale-95 shadow-orange-500/30'
                  }`}
                >
                  {isRepairing ? (
                    <>
                      <Wrench className="w-5 h-5 animate-bounce" />
                      Repairing...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-5 h-5" />
                      Fix This Page
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
             <motion.div
              key="repaired"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-xl mx-auto relative z-10"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Page Repaired!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Great job. We fix everything from cracked screens to broken websites. 
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20"
                >
                  <Home className="w-5 h-5" />
                  Return Home
                </Link>
                <Link 
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Contact Support
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
