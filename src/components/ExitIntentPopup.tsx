import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExitIntentPopup({ onBookNow }: { onBookNow: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show when cursor moves up towards address bar
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        // Save to session storage so we don't annoy them constantly
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Check if already shown in this session
    if (!sessionStorage.getItem('exitPopupShown')) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-blue" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-brand-orange" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Wait! Don't leave yet!</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
                Get <span className="text-brand-orange font-bold">15% OFF</span> your first repair service when you book online right now. Limited time offer!
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsVisible(false);
                    onBookNow();
                  }}
                  className="w-full py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
                >
                  Claim 15% Discount
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-full py-3 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  No thanks, maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
