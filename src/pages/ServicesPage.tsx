import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Services from '../components/Services';
import CoreServices from '../components/CoreServices';
import AdvancedServices2026 from '../components/AdvancedServices2026';
import TrustAndResultsSection from '../components/TrustAndResultsSection';
import RelatedServicesModule from '../components/RelatedServicesModule';
import { Smartphone, Laptop, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onBookNow: (serviceName?: string) => void;
}

export default function ServicesPage({ onBookNow }: ServicesPageProps) {
  const [selectedDevice, setSelectedDevice] = useState('iphone 18');

  const deviceFilters = [
    { label: 'iPhone 18 & 18 Pro Max', value: 'iphone 18 pro max ceramic shield oled screen' },
    { label: 'iPhone 16 Pro Max', value: 'iphone 16 pro max capture button battery screen' },
    { label: 'iPhone 15 Pro Max', value: 'iphone 15 pro max titanium usb-c port' },
    { label: 'Samsung Galaxy S24/S25', value: 'samsung galaxy s24 s25 ultra amoled screen s-pen' },
    { label: 'Galaxy Z Fold / Flip', value: 'samsung galaxy z fold 6 z flip 6 hinge utg crease' },
    { label: 'MacBook M-Series', value: 'macbook pro air logic board micro-soldering m1 m2 m3 m4' },
    { label: 'Windows Laptops', value: 'laptop computer motherboard screen ssd data recovery' }
  ];

  return (
    <>
      <Helmet>
        <title>All Repair Services & Device Solutions | Al Sharq Mobile Sharjah</title>
        <meta name="description" content="Explore our comprehensive mobile, tablet, and computer repair services. Dynamic model-based diagnostics for iPhone 18, 16, 15, Samsung Galaxy S24/S25, and MacBook." />
      </Helmet>
      
      <div className="pt-16 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="bg-brand-blue py-20 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-space">Comprehensive Repair Services</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              From broken screens to logic board micro-soldering, our expert technicians handle it all with precision and care.
            </p>
        </div>

        {/* Dynamic Model-Specific Related Services Explorer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Model Diagnostic
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Select Your Device Model for Matched Services
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Dynamically inspect parts availability, estimated turnaround times, and certified warranties for your exact device.
                </p>
              </div>
            </div>

            {/* Device Filter Buttons */}
            <div className="flex flex-wrap gap-2 pb-4 mb-2">
              {deviceFilters.map((filter) => {
                const isActive = selectedDevice === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedDevice(filter.value)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20 scale-[1.02]'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Automated Related Services Render */}
            <RelatedServicesModule 
              contentToAnalyze={selectedDevice}
              variant="grid"
              onBookNow={onBookNow}
              className="my-4 p-0 bg-transparent dark:bg-transparent border-0 shadow-none"
            />
          </div>
        </div>
        
        <CoreServices />
        <Services onBookService={onBookNow} />
        <AdvancedServices2026 onBookNow={onBookNow} />
        <TrustAndResultsSection />
      </div>
    </>
  );
}
