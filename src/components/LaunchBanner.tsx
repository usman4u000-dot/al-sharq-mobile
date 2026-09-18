import React, { useState } from 'react';
import { X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-brand-orange text-white relative z-50"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 justify-center text-xs sm:text-sm font-medium text-center">
              <Rocket className="w-4 h-4 shrink-0 animate-pulse text-amber-200" />
              <span className="line-clamp-1 sm:line-clamp-none">
                <strong>Muwaileh Launch Offer:</strong> Get 20% off your first repair!
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
