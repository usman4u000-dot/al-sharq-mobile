import React from 'react';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

interface Props {
  onClick?: () => void;
}

export default function StickyContactButton({ onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:flex fixed bottom-8 left-24 z-40 bg-slate-900/90 dark:bg-slate-800/90 text-white p-3.5 rounded-full shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors items-center justify-center group border border-white/10"
      aria-label="Staff Technician Tools"
    >
      <Settings className="w-5 h-5 relative z-10 text-slate-300 group-hover:text-white transition-colors" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium group-hover:ml-2 group-hover:mr-1 relative z-10 text-xs text-slate-200">
        Staff Tools
      </span>
    </motion.button>
  );
}
