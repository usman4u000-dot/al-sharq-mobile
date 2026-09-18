import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function TrustAndResultsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See the Al Sharq Difference
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From shattered displays to logic board revivals. Drag the slider to witness real OEM-quality results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">iPhone 14 Pro Max</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Display Assembly Replacement</p>
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1599847101899-1bdc581335cb?auto=format&fit=crop&q=80&w=800" 
              afterImage="https://images.unsplash.com/photo-1698295627582-7dc23974d6c6?auto=format&fit=crop&q=80&w=800"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">MacBook Pro M2</h3>
            <p className="text-gray-600 dark:text-gray-400">Liquid Damage & Keyboard Replacement</p>
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800" 
              afterImage="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
