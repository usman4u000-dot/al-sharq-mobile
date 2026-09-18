import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Battery, Smartphone, Wifi, ZoomIn, ArrowRight } from 'lucide-react';

type ComponentId = 'logic_board' | 'battery' | 'screen' | 'antenna';

interface ComponentData {
  id: ComponentId;
  name: string;
  icon: React.ElementType;
  description: string;
  commonIssues: string[];
  repairMethod: string;
  color: string;
  position: { top: string; left: string };
}

const COMPONENTS: ComponentData[] = [
  {
    id: 'screen',
    name: 'OLED Display & Digitizer',
    icon: Smartphone,
    description: 'The outermost multi-layer glass and OLED panel. Our OEMs deliver 120Hz refresh rates and true blacks.',
    commonIssues: ['Shattered Glass', 'Dead Pixels', 'Touch Ghosting', 'Green Line Issue'],
    repairMethod: 'Vacuum-sealed dust-free lamination & logic board calibration.',
    color: 'text-blue-500 bg-blue-500/20 border-blue-500',
    position: { top: '30%', left: '50%' }
  },
  {
    id: 'logic_board',
    name: 'A-Series / Snapdragon Logic Board',
    icon: Cpu,
    description: 'The brain of the device holding the CPU, RAM, and Power Management IC. The most complex hardware in a phone.',
    commonIssues: ['Bootloop', 'Overheating', 'Liquid Short Circuit', 'Audio IC Failure'],
    repairMethod: 'Level 4 Micro-soldering, Ultrasonic baths, IC Chip Reballing.',
    color: 'text-brand-orange bg-brand-orange/20 border-brand-orange',
    position: { top: '45%', left: '50%' }
  },
  {
    id: 'battery',
    name: 'Lithium-Ion Battery Cell',
    icon: Battery,
    description: 'High-density power storage. Batteries naturally degrade after 500-800 charge cycles, swelling or losing capacity.',
    commonIssues: ['Rapid Drain', 'Random Shutdowns', 'Swelling (Spicy Pillow)'],
    repairMethod: 'Cycle reset, authentic cells with BMS board transfer.',
    color: 'text-green-500 bg-green-500/20 border-green-500',
    position: { top: '65%', left: '45%' }
  },
  {
    id: 'antenna',
    name: 'Baseband & 5G/Wi-Fi Antennas',
    icon: Wifi,
    description: 'Signal transmission modules strategically placed around the chassis for millimeter-wave communication.',
    commonIssues: ['No Service', 'Searching...', 'Weak Wi-Fi Range', 'Bluetooth Dropping'],
    repairMethod: 'Baseband reflow or antenna flex cable replacement.',
    color: 'text-purple-500 bg-purple-500/20 border-purple-500',
    position: { top: '80%', left: '35%' }
  }
];

export default function DeviceAnatomyExplorer() {
  const [activeComponent, setActiveComponent] = useState<ComponentId>('logic_board');

  const activeData = COMPONENTS.find(c => c.id === activeComponent) || COMPONENTS[1];

  return (
    <section className="py-24 bg-slate-950 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background grids and aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6 border border-brand-orange/20">
            <ZoomIn className="w-4 h-4" /> Lab Perspective
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Device Anatomy Explorer
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover what's inside a modern flagship smartphone and how our expert engineers solve complex micro-electronic failures.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left side: Interactive Device Schematic */}
          <div className="flex-1 w-full flex justify-center items-center relative min-h-[500px]">
            <div className="relative w-64 md:w-80 aspect-[1/2] rounded-[3rem] border-4 border-slate-800 bg-slate-900 shadow-2xl p-2 z-10 group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-full w-full bg-gradient-to-b from-slate-800/50 to-transparent"></div>
              
              {/* Camera module outline */}
              <div className="absolute top-6 right-6 w-16 h-20 rounded-2xl border-2 border-slate-700 bg-slate-800/80"></div>
              
              {/* Internal aesthetic lines */}
              <div className="absolute inset-6 border border-brand-blue/20 rounded-2xl"></div>
              
              {/* Interactive Nodes */}
              {COMPONENTS.map((comp) => {
                const isActive = activeComponent === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp.id)}
                    className="absolute z-20 group/node transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-brand-orange"
                    style={{ top: comp.position.top, left: comp.position.left }}
                    aria-label={`View ${comp.name} details`}
                  >
                    <div className="relative">
                      {isActive && (
                        <div className={`absolute inset-0 rounded-full scale-150 animate-ping opacity-30 ${comp.color}`}></div>
                      )}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive ? `${comp.color} shadow-[0_0_20px_inherit]` : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-brand-orange hover:text-brand-orange'
                      }`}>
                        <comp.icon className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 w-32 px-3 py-1 bg-slate-800 rounded shadow-xl text-xs font-bold transition-all border border-slate-700 pointer-events-none ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                      {comp.name}
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-700 rounded-full"></div>
            </div>

            {/* Connecting sweeping line logic (aesthetic) */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-full h-[1px] bg-gradient-to-r from-brand-orange/50 to-transparent -z-10 origin-left scale-x-0 animate-scale-line"></div>
          </div>

          {/* Right side: Component Details */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 ${activeData.color.split(' ')[0].replace('text-', 'bg-')}`}></div>

                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border-2 ${activeData.color}`}>
                  <activeData.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{activeData.name}</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {activeData.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-red-500"></span> Common Failure Modes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeData.commonIssues.map((issue, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-sm border border-slate-700">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                     <h4 className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span> Al Sharq Repair Protocol
                     </h4>
                     <p className="text-slate-300 font-medium">
                       {activeData.repairMethod}
                     </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
            
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <span className="text-slate-500 text-sm font-medium">Select a component node to view details</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
