import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useDragControls } from 'motion/react';
import { Info, Sparkles, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DropTestSimulator() {
  const [isBroken, setIsBroken] = useState(false);
  const [isRepaired, setIsRepaired] = useState(false);
  const [dropHeight, setDropHeight] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const dragControls = useDragControls();

  const handleDragEnd = (event: any, info: any) => {
    // If dropped significantly
    if (info.offset.y > 100 || info.velocity.y > 200) {
      controls.start({
        y: 200, // floor level
        rotate: [-10, 15, -5, 0],
        transition: { type: 'spring', bounce: 0.6, duration: 0.8 }
      }).then(() => {
        setIsBroken(true);
        setIsRepaired(false);
        // Add screen shake effect to container
        document.getElementById('drop-container')?.animate([
          { transform: 'translate(1px, 1px) rotate(0deg)' },
          { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          { transform: 'translate(-3px, 0px) rotate(1deg)' },
          { transform: 'translate(3px, 2px) rotate(0deg)' },
          { transform: 'translate(1px, -1px) rotate(1deg)' },
          { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          { transform: 'translate(-3px, 1px) rotate(0deg)' },
          { transform: 'translate(0px, 0px) rotate(0deg)' }
        ], { duration: 400 });
      });
    } else {
      // Snap back if not dropped far enough
      controls.start({ y: 0, rotate: 0, transition: { type: 'spring' } });
    }
  };

  const handleFixIt = () => {
    setIsRepaired(true);
    controls.start({ y: 0, rotate: 0, transition: { type: 'spring', delay: 0.5 } });
    
    setTimeout(() => {
      setIsBroken(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#f97316', '#ffffff']
      });
    }, 600);
  };

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden" id="drop-container">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-semibold text-sm mb-4">
            <AlertTriangle className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            The Drop Test Simulator
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Accidents happen. Drag and drop the phone below to see what happens, and experience how fast our magic repair process is!
          </p>
        </div>

        <div className="relative h-[500px] max-w-3xl mx-auto bg-slate-800/50 rounded-3xl border border-slate-700/50 overflow-hidden flex flex-col items-center p-8">
          
          {/* Floor */}
          <div className="absolute bottom-0 w-full h-32 bg-slate-800/80 border-t border-slate-700 backdrop-blur-sm flex items-center justify-center">
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Hard Concrete Floor</span>
          </div>
          
          {/* Drag instruction */}
          {!isBroken && !isRepaired && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 text-center"
            >
              <div className="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg shadow-brand-blue/20">
                ↓ Drag the phone downwards & drop it!
              </div>
            </motion.div>
          )}

          {/* Interactive Phone */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 200 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragControls={dragControls}
            animate={controls}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            initial={{ y: 0 }}
            className={`w-[220px] h-[450px] bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative mt-16 cursor-grab z-20 ${isBroken ? 'pointer-events-none' : ''}`}
          >
            {/* Screen */}
            <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-slate-200 to-slate-400 relative overflow-hidden p-4 flex flex-col">
              
              {/* Wallpaper / Content */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
              
              <div className="relative z-10 flex flex-col items-center mt-8">
                <div className="text-white text-5xl font-light drop-shadow-md">10:42</div>
                <div className="text-white/90 text-sm font-medium drop-shadow-md">Wednesday, October 11</div>
              </div>

              {/* Cracked Glass Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isBroken && !isRepaired ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='220' height='450' viewBox='0 0 220 450' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M150 0L140 50L170 120L130 180L160 250L110 320L140 450' stroke='white' stroke-opacity='0.8' stroke-width='1.5'/%3E%3Cpath d='M140 50L80 90L90 150L40 220L70 280L20 360L60 450' stroke='white' stroke-opacity='0.6' stroke-width='1.5'/%3E%3Cpath d='M170 120L220 160M130 180L200 210M110 320L180 340' stroke='white' stroke-opacity='0.7' stroke-width='1.5'/%3E%3Ccircle cx='140' cy='50' r='3' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='130' cy='180' r='5' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`
                }}
              ></motion.div>

              {/* White flashes for break/repair */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isBroken && !isRepaired ? [0, 1, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white z-30 pointer-events-none"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isRepaired ? [0, 1, 0] : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-blue z-30 pointer-events-none mix-blend-screen"
              ></motion.div>

            </div>
          </motion.div>

          {/* Action Panels */}
          {isBroken && !isRepaired && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 bg-white p-6 rounded-2xl shadow-xl border border-slate-200 text-center w-[90%] max-w-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ouch! That looked painful.</h3>
              <p className="text-sm text-gray-600 mb-4">Don't worry, this is our specialty.</p>
              <button 
                onClick={handleFixIt}
                className="w-full bg-brand-orange hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Magic Fix
              </button>
            </motion.div>
          )}

          {isRepaired && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute left-1/2 -translate-x-1/2 top-12 z-30 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Good as new in 30 minutes!
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
