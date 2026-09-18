import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Wrench, Star } from 'lucide-react';

const ACTIVITIES = [
  { name: 'Omar M.', action: 'just booked a screen repair for', device: 'iPhone 14 Pro Max', icon: Wrench, color: 'text-brand-orange', bg: 'bg-orange-100' },
  { name: 'Sarah A.', action: 'left a 5-star review for her', device: 'MacBook Repair', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { name: 'Khaled', action: 'just picked up his repaired', device: 'Samsung Galaxy S23 Ultra', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
  { name: 'Fatima', action: 'saved AED 400 trading in an', device: 'iPhone 12 Pro', icon: CheckCircle2, color: 'text-brand-blue', bg: 'bg-blue-100' },
  { name: 'Ahmed', action: 'just booked a battery replacement for', device: 'iPad Pro', icon: Wrench, color: 'text-brand-orange', bg: 'bg-orange-100' }
];

export default function RecentActivityToast() {
  const [currentActivity, setCurrentActivity] = useState<typeof ACTIVITIES[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the cycle after a few seconds
    const startDelay = setTimeout(() => {
      showNextActivity();
    }, 5000);

    return () => clearTimeout(startDelay);
  }, []);

  const showNextActivity = () => {
    // Pick a random activity
    const randomActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    setCurrentActivity(randomActivity);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Wait randomly between 10-25 seconds before showing next
      const nextDelay = Math.floor(Math.random() * 15000) + 10000;
      setTimeout(showNextActivity, nextDelay);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && currentActivity && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="hidden md:flex fixed bottom-24 left-6 z-40 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 max-w-sm items-center gap-4 pointer-events-none"
        >
          <div className={`${currentActivity.bg} p-2 rounded-full dark:bg-slate-700`}>
            <currentActivity.icon className={`w-5 h-5 ${currentActivity.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              <span className="font-bold">{currentActivity.name}</span> {currentActivity.action} <span className="font-semibold text-brand-blue dark:text-blue-400">{currentActivity.device}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Verified Customer • Just now</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
