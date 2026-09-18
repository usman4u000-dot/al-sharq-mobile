import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Sparkles } from 'lucide-react';

export default function HomepageBeforeAfter() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            Seeing is Believing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue dark:text-white mb-6">Real Results. Genuine Repairs.</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Drag the slider to see how we transform severely damaged devices back to factory condition using premium parts and micro-soldering precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1592888636186-b4859f7dcbe0?auto=format&fit=crop&q=80&w=1200" 
              afterImage="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200" 
            />
            <h3 className="text-xl font-bold mt-6 text-brand-blue dark:text-white">iPhone 14 Pro Max Total Submersion</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Logic board ultrasound cleaned, short circuits repaired, and OLED screen replaced.</p>
          </div>
          
          <div>
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1605333557555-502d6b3c9fc2?auto=format&fit=crop&q=80&w=1200" 
              afterImage="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1200" 
            />
            <h3 className="text-xl font-bold mt-6 text-brand-blue dark:text-white">MacBook Pro M2 Screen Destruction</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Display assembly replaced with authentic liquid retina XDR panel, retaining True Tone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
