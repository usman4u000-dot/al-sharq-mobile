import React from 'react';
import { Smartphone, Shield, ShieldCheck, CheckCircle2, ArrowRight, Zap, RefreshCw, Power, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

interface BodyRepairPageProps {
  onBookNow?: (service?: string) => void;
}

export default function BodyRepairPage({ onBookNow }: BodyRepairPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Phone Housing, Back Glass & Button Repair Sharjah",
        "provider": BUSINESS_PROVIDER_SCHEMA,
        "description": "Laser back glass removal, titanium and aluminum chassis realignment, and power/volume button flex repair in Sharjah.",
        "areaServed": ["Sharjah", "Dubai", "Ajman"]
      }
    ]
  };

  const handleBook = () => {
    if (onBookNow) {
      onBookNow('Button & Body Damage');
    } else {
      window.location.href = '/estimate';
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/body-repair" />
        <title>Back Glass & Frame Housing Repair Sharjah | Al Sharq Mobile</title>
        <meta name="description" content="Laser back glass replacement, frame dent removal, and broken power or volume button repair for iPhone, Samsung & Google Pixel in Sharjah." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Button & Body Repair', path: '/body-repair' }
          ]} />

          {/* Hero Section */}
          <div className="mt-6 bg-gradient-to-br from-brand-blue to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-orange font-semibold text-xs sm:text-sm mb-6 border border-white/10">
                <Layers className="w-4 h-4" />
                <span>Laser CNC & Frame Restoration • Sharjah</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Restore Structural Perfection with Laser Back Glass & Housing Repair
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Cracked back glass, bent aluminum or titanium frame, or stuck power/volume buttons? Our high-precision laser machines remove broken rear glass cleanly without opening the phone, preventing water seal damage.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleBook}
                  className="px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Power className="w-5 h-5" />
                  Fix Body or Buttons
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
                Structural & Mechanical Repairs We Perform
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Precision frame engineering that makes your device feel straight out of the box.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Layers,
                  title: 'Laser Rear Back Glass Fix',
                  desc: 'We use industrial fiber laser machines to cleanly vaporize adhesive under shattered rear glass on iPhone 12 through iPhone 16/17 series.'
                },
                {
                  icon: Power,
                  title: 'Stuck Power & Action Button',
                  desc: 'Click feedback gone or button completely unresponsive? We replace inner tactile tactile micro-switches and internal flex cables.'
                },
                {
                  icon: Smartphone,
                  title: 'Bent Chassis Realignment',
                  desc: 'Phone slightly warped or bent after sitting on it? We straighten frames using precision calibration clamps to prevent logic board cracks.'
                },
                {
                  icon: RefreshCw,
                  title: 'Volume & Mute Switch Flex',
                  desc: 'Fix loose rocker switches, rattling buttons, or ghost volume jumps with original replacement flex ribbon assemblies.'
                },
                {
                  icon: Shield,
                  title: 'Full Frame Housing Swap',
                  desc: 'Heavy corner dents or deep scratches? Complete original titanium/aluminum mid-frame replacement with MagSafe wireless coils.'
                },
                {
                  icon: Zap,
                  title: 'Wireless Charging Coil Fix',
                  desc: 'Wireless charging or reverse wireless power sharing stopped working after a hard drop? We repair damaged inductors.'
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seamless Factory Fit</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Water-resistant adhesive gaskets applied on all back glass and housing repairs.</p>
              </div>
            </div>
            <button
              onClick={handleBook}
              className="px-6 py-3 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
            >
              Book Service (From AED 150)
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
