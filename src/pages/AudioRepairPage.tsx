import React from 'react';
import { Volume2, Mic, ShieldCheck, CheckCircle2, ArrowRight, Zap, Headphones, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

interface AudioRepairPageProps {
  onBookNow?: (service?: string) => void;
}

export default function AudioRepairPage({ onBookNow }: AudioRepairPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Smartphone & Laptop Audio Repair Sharjah",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC"
        },
        "description": "Earpiece speaker cleaning, loud speaker replacement, and microphone audio chip micro-soldering in Sharjah.",
        "areaServed": ["Sharjah", "Dubai", "Ajman"]
      }
    ]
  };

  const handleBook = () => {
    if (onBookNow) {
      onBookNow('Audio Repair');
    } else {
      window.location.href = '/estimate';
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/audio-repair" />
        <title>Speaker & Microphone Audio Repair Sharjah | Al Sharq Mobile</title>
        <meta name="description" content="Fix low call volume, crackling loudspeaker, dead microphone, or audio IC logic board issues on iPhone, Samsung & Mac in Sharjah." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Audio Repair', path: '/audio-repair' }
          ]} />

          {/* Hero Section */}
          <div className="mt-6 bg-gradient-to-br from-brand-blue to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-orange font-semibold text-xs sm:text-sm mb-6 border border-white/10">
                <Volume2 className="w-4 h-4" />
                <span>Audio Engineering & Acoustic Lab • Sharjah</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Hear Every Call & Song Clearly with Professional Audio Repair
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Can't hear people during phone calls, facing distorted audio, or callers can't hear your voice? We clean mesh filters with acoustic ultrasonic tools and replace blown speaker coils and audio codec chips.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleBook}
                  className="px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  Fix Audio Problem
                </button>
                <Link
                  to="/estimate"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all border border-white/20 flex items-center gap-2"
                >
                  Get Instant Estimate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Issues We Fix Grid */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Audio Problems We Diagnose and Fix
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Most sound issues resolved within 30 minutes while you wait.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Volume2,
                  title: 'Low Ear Speaker Volume',
                  desc: 'Struggling to hear callers on phone calls? Often caused by compacted makeup, dust, or moisture in the micro-mesh grill.'
                },
                {
                  icon: Mic,
                  title: 'Microphone Not Picking Up',
                  desc: 'People complain they cannot hear you on calls or voice notes sound muffled? We repair top, bottom, and noise-canceling mic modules.'
                },
                {
                  icon: Sparkles,
                  title: 'Crackling / Distorted Sound',
                  desc: 'Loudspeaker buzzing or distorting at high volumes? We replace the blown dynamic drivers with OEM stereo speakers.'
                },
                {
                  icon: Headphones,
                  title: 'Stuck in Headphone Mode',
                  desc: 'Phone thinks headphones are plugged in even when disconnected? We replace faulty audio jack boards and clean detection sensors.'
                },
                {
                  icon: Zap,
                  title: 'Audio IC Micro-Soldering',
                  desc: 'Greyed-out speakerphone button or voice memos failing? We re-ball and replace logic board Audio Codec ICs with microscope precision.'
                },
                {
                  icon: AlertCircle,
                  title: 'MacBook & Laptop Speakers',
                  desc: 'Blown MacBook subwoofers or rattling laptop sound? We replace dual speaker units for crisp, original spatial audio output.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 dark:bg-slate-700 flex items-center justify-center text-brand-blue dark:text-blue-400 mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Banner */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Clean Sound Guarantee</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Decibel and frequency response tested before delivery with guaranteed warranty.</p>
              </div>
            </div>
            <button
              onClick={handleBook}
              className="px-6 py-3 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
            >
              Book Service (From AED 100)
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
