import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, ShieldCheck, Tag } from 'lucide-react';

const pricingData = {
  "iPhone 15 Series": [
    { repair: "Screen Replacement (Premium OLED)", price: "AED 350 - 650", originalPrice: "AED 450 - 750", time: "45 mins", popular: true },
    { repair: "Screen Replacement (Original Pulled)", price: "AED 750 - 1150", time: "45 mins" },
    { repair: "Battery Replacement", price: "AED 250 - 350", time: "30 mins" },
    { repair: "Back Glass Replacement", price: "AED 250 - 450", time: "2 hrs" },
    { repair: "Charging Port Repair", price: "AED 200 - 300", time: "45 mins" }
  ],
  "iPhone 14 Series": [
    { repair: "Screen Replacement (Premium OLED)", price: "AED 250 - 450", originalPrice: "AED 350 - 550", time: "45 mins", popular: true },
    { repair: "Screen Replacement (Original Pulled)", price: "AED 550 - 850", time: "45 mins" },
    { repair: "Battery Replacement", price: "AED 200 - 280", time: "30 mins" },
    { repair: "Back Glass Replacement", price: "AED 180 - 300", time: "2 hrs" },
    { repair: "Charging Port Repair", price: "AED 180 - 250", time: "45 mins" }
  ],
  "iPhone 13 Series": [
    { repair: "Screen Replacement (Premium OLED)", price: "AED 200 - 350", originalPrice: "AED 300 - 450", time: "45 mins", popular: true },
    { repair: "Screen Replacement (Original Pulled)", price: "AED 450 - 750", time: "45 mins" },
    { repair: "Battery Replacement", price: "AED 180 - 250", time: "30 mins" },
    { repair: "Back Glass Replacement", price: "AED 150 - 250", time: "2 hrs" },
    { repair: "Charging Port Repair", price: "AED 150 - 200", time: "45 mins" }
  ],
  "iPhone 12 & 11 Series": [
    { repair: "Screen Replacement", price: "From AED 150", time: "45 mins", popular: true },
    { repair: "Battery Replacement", price: "From AED 150", time: "30 mins" },
    { repair: "Back Glass Replacement", price: "From AED 120", time: "2 hrs" },
    { repair: "Charging Port Repair", price: "From AED 120", time: "45 mins" }
  ]
};

type SeriesTab = keyof typeof pricingData;

export default function PricingTable({ onBookNow }: { onBookNow?: (service?: string) => void }) {
  const [activeTab, setActiveTab] = useState<SeriesTab>("iPhone 15 Series");

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">Transparent Pricing</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          No hidden fees. Honest estimates. We stock both premium aftermarket and original parts to fit your budget.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(Object.keys(pricingData) as SeriesTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pricing Data */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 p-6 hidden md:grid">
          <div className="col-span-5 font-bold text-slate-800 dark:text-slate-200">Repair Type</div>
          <div className="col-span-3 font-bold text-slate-800 dark:text-slate-200">Estimated Price</div>
          <div className="col-span-2 font-bold text-slate-800 dark:text-slate-200">Turnaround</div>
          <div className="col-span-2 text-right"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-slate-100 dark:divide-slate-700/50"
          >
            {pricingData[activeTab].map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 p-6 items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                
                {/* Repair Type (Mobile & Desktop) */}
                <div className="col-span-1 md:col-span-5 flex flex-col items-start gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{item.repair}</span>
                    {item.popular && (
                      <span className="px-2.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] uppercase font-bold tracking-wider rounded-md border border-green-200 dark:border-green-800">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-baseline gap-2">
                  <span className="md:hidden text-sm text-slate-500 font-medium">Price: </span>
                  <span className="font-bold text-brand-orange text-lg">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">{item.originalPrice}</span>
                  )}
                </div>

                {/* Time */}
                <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{item.time}</span>
                </div>

                {/* Action */}
                <div className="col-span-1 md:col-span-2 mt-2 md:mt-0 md:text-right">
                  <button
                    onClick={() => onBookNow?.(`${activeTab} - ${item.repair}`)}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-brand-orange hover:text-white text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold transition-all"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-500" />
          <span>90-Day Parts Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-500" />
          <span>Price match guarantee</span>
        </div>
      </div>
    </div>
  );
}
