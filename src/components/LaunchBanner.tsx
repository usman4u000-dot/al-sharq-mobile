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
        className="bg-brand-orange text-white relative z-50 text-[11px] sm:text-xs md:text-sm font-semibold shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-center text-center">
              <Rocket className="w-3.5 h-3.5 shrink-0 text-amber-200" />
              <span className="truncate sm:overflow-visible">
                <strong>Muwaileh Launch Special:</strong> 20% off your first repair!
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-0.5 sm:p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
