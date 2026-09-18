import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Terminal, Shield, RefreshCw, Cpu, Database, CheckCircle, ArrowRight } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function SoftwareIssuesPage({ onBookNow }: { onBookNow: (service?: string) => void }) {
  return (
    <>
      <Helmet>
        <title>Software Issues & OS Flashing | Al Sharq Mobile</title>
        <meta name="description" content="Expert software repair, OS flashing, bootloop fixes, and firmware updates for phones, tablets, and computers." />
      </Helmet>
      
      <div className="pt-16 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="bg-brand-blue py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/5 pattern-grid-lg opacity-50"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800/50 rounded-full text-blue-200 font-semibold text-sm mb-6 border border-blue-700">
              <Terminal className="w-4 h-4" />
              Advanced Software Diagnostics
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-space">Software Issues & OS Flashing</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Stuck on the logo? Forgot your password? Apps crashing? We restore your device's software to factory-fresh performance without compromising your data when possible.
            </p>
            <button 
              onClick={() => onBookNow('Software Issues')}
              className="px-8 py-4 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95"
            >
              Book Software Repair
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Common Software Problems We Fix</h2>
            <p className="text-gray-600 dark:text-gray-400">If it's a digital issue, we can solve it.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: RefreshCw, title: 'Bootloop / Stuck on Logo', desc: 'Device restarts endlessly or freezes on the manufacturer logo. We re-flash the firmware to restore functionality.' },
              { icon: Shield, title: 'Password & FRP Unlock', desc: 'Forgot your passcode or Google account (FRP)? We provide legitimate unlocking services (proof of ownership required).' },
              { icon: Cpu, title: 'OS Updates & Downgrades', desc: 'Stuck on an old version or regretting a buggy update? We safely flash the optimal OS version for your hardware.' },
              { icon: Database, title: 'Storage Corruption', desc: 'System taking up all your storage? Apps crashing constantly? We clean the system partition and resolve corruption.' }
            ].map((feature, i) => (
              <SpotlightCard key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-slate-950 py-20 border-t border-gray-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Don't Let Software Glitches Slow You Down</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Most software issues can be resolved in under an hour by our certified technicians.</p>
            <button 
              onClick={() => onBookNow('Software Issues')}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-brand-blue/30"
            >
              Get Free Diagnostic <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
