import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BatteryWarning, Zap, X } from 'lucide-react';

export default function SmartBatteryBanner() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Check for Battery Status API support
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (!isMounted) return;

        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        
        updateBattery();
        
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch((e: Error) => {
        console.log("Battery status API not available: ", e);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Only show if battery is low (< 25%), not charging, and banner wasn't dismissed
  const shouldShow = isVisible && batteryLevel !== null && batteryLevel <= 25 && !isCharging;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm"
        >
          <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-2xl shadow-2xl p-5 relative overflow-hidden">
            {/* Pulsing red background hint */}
            <div className="absolute inset-0 bg-red-500/5 dark:bg-red-500/10 animate-pulse pointer-events-none"></div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start relative z-10">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0 relative">
                <BatteryWarning className="w-6 h-6 text-red-600 dark:text-red-400" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 border-2 border-red-500 rounded-full opacity-50"
                ></motion.div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  Your battery is at {batteryLevel}%
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  Phones dying too quickly? It might be time for a new battery. Our original replacements take just 30 minutes!
                </p>
                <div className="flex gap-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors">
                    <Zap className="w-4 h-4" />
                    Book Battery Fix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
