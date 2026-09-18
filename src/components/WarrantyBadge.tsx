import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WarrantyBadge() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 shadow-sm my-4"
    >
      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
        <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-green-800 dark:text-green-300">
          90-Day Al Sharq Engineering Warranty
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          Guaranteed quality on all repairs and parts
        </p>
      </div>
    </motion.div>
  );
}
