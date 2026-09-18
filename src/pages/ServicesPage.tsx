import React from 'react';
import { Helmet } from 'react-helmet-async';
import Services from '../components/Services';
import CoreServices from '../components/CoreServices';
import AdvancedServices2026 from '../components/AdvancedServices2026';
import TrustAndResultsSection from '../components/TrustAndResultsSection';

interface ServicesPageProps {
  onBookNow: (serviceName?: string) => void;
}

export default function ServicesPage({ onBookNow }: ServicesPageProps) {
  return (
    <>
      <Helmet>
        <title>All Services | Al Sharq Mobile</title>
        <meta name="description" content="Explore our comprehensive mobile, tablet, and computer repair services." />
      </Helmet>
      
      <div className="pt-16 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="bg-brand-blue py-20 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-space">Comprehensive Repair Services</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              From broken screens to logic board micro-soldering, our expert technicians handle it all with precision and care.
            </p>
        </div>
        
        <CoreServices />
        <Services onBookService={onBookNow} />
        <AdvancedServices2026 onBookNow={onBookNow} />
        <TrustAndResultsSection />
      </div>
    </>
  );
}
