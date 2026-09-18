import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Code, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EasterEggConsole() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const repairCode = ['r', 'e', 'p', 'a', 'i', 'r'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      const key = e.key;
      setSequence(prev => {
        const newSeq = [...prev, key];
        // Keep it to maximum length of our longest code
        if (newSeq.length > Math.max(konamiCode.length, repairCode.length)) {
          newSeq.shift();
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const checkSequence = (targetCode: string[]) => {
      if (sequence.length < targetCode.length) return false;
      const recentKeys = sequence.slice(-targetCode.length);
      return recentKeys.every((key, i) => key.toLowerCase() === targetCode[i].toLowerCase());
    };

    if (checkSequence(repairCode) || checkSequence(konamiCode)) {
      setIsOpen(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
      setSequence([]); // reset
    }
  }, [sequence]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-[200] max-w-[320px] w-full"
        >
          <div className="bg-slate-900 border-2 border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 overflow-hidden font-mono text-xs">
            {/* Header */}
            <div className="bg-slate-800 px-3 py-2 flex items-center justify-between border-b border-green-500/30">
              <div className="flex items-center gap-2 text-green-400">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">secret_override.sh</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 bg-black/50 text-green-400">
              <p className="mb-2">&gt; Initializing debug protocols...</p>
              <p className="mb-2 text-green-300">&gt; Authenticating superuser...</p>
              <p className="mb-4 text-green-200 font-bold animate-pulse">&gt; ACCESS GRANTED.</p>
              
              <div className="bg-green-900/40 border border-green-500/50 rounded p-3 mb-4 text-center">
                <Gift className="w-6 h-6 mx-auto mb-2 text-green-300" />
                <p className="text-white font-bold mb-1">Developer Discount Found!</p>
                <p className="text-green-200">You discovered the secret code. Give this code to your technician:</p>
                <div className="mt-2 text-lg bg-black text-white py-1 px-3 inline-block rounded border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  SUDO-FIX-20
                </div>
                <p className="mt-2 text-[10px] text-green-500">Valid for 20% off any screen repair.</p>
              </div>

              <p className="text-slate-500">&gt; Awaiting next command_ <span className="animate-pulse">█</span></p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
