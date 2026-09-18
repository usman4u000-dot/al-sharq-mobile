import React from 'react';
import { RefreshCw, DollarSign, ShieldCheck, Smartphone, Laptop, Tablet, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

export default function TradeIn() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-800 transition-colors duration-300" id="trade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-semibold tracking-wide uppercase text-sm mb-2">Trade-In & Sell</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">
            Upgrade Your Tech with Confidence
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Turn Your Old Device into Cash or Credit at Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets). Why let your old gadgets sit in a drawer? Since 2014, we’ve provided the most transparent and competitive trade-in values in the UAE. Whether you want to sell for cash or upgrade to the latest 2026 flagship, we make the process seamless.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* How It Works */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
            <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-6 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-brand-orange" />
              How It Works (3 Simple Steps)
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-lg">Instant Evaluation</h5>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Bring your phone, laptop, or tablet to our Sharjah shop. Our technicians perform a 5-minute diagnostic to assess the condition.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-lg">Best Market Offer</h5>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Based on our 12 years of trading data, we give you a fair, market-leading price offer on the spot.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-lg">Get Paid or Upgrade</h5>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Walk out with Instant Cash or apply the value as a discount toward any new or certified pre-owned device in our store.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Buy & Why Trade */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-4">What We Buy</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">We are currently looking for 2023–2026 models in any condition:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Smartphone className="w-5 h-5 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span><strong>iPhones:</strong> iPhone 15 series through to the latest iPhone 17.</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Smartphone className="w-5 h-5 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span><strong>Samsung:</strong> S24, S25, and S26 Ultra models.</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Laptop className="w-5 h-5 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span><strong>Laptops:</strong> MacBook Air/Pro (M2 chips and newer) and high-end Windows gaming laptops.</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Tablet className="w-5 h-5 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span><strong>Tablets:</strong> iPad Pro and Samsung Galaxy Tab S-series.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-4">Why Trade with Al Sharq Mobile?</h4>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Higher Value:</strong> We often pay 15-20% more than the "big brand" automated kiosks.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Stress:</strong> No waiting for buyers or dealing with "no-shows" from online marketplaces.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <DollarSign className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Immediate Payment:</strong> No "store credit only" traps—if you want cash, you get cash.</span>
                </li>
              </ul>

              <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-4 border-t border-gray-100 dark:border-slate-800 pt-6">Current 2026 Market Rates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Estimated trade-in values for devices in good condition:</p>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">
                  <span className="font-semibold">iPhone 17 Pro Max (256GB)</span>
                  <span className="text-brand-orange font-bold">Up to AED 3,800</span>
                </li>
                <li className="flex items-center justify-between text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">
                  <span className="font-semibold">iPhone 17 Pro (256GB)</span>
                  <span className="text-brand-orange font-bold">Up to AED 3,400</span>
                </li>
                <li className="flex items-center justify-between text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">
                  <span className="font-semibold">Samsung Galaxy S26 Ultra (512GB)</span>
                  <span className="text-brand-orange font-bold">Up to AED 3,500</span>
                </li>
                <li className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Samsung Galaxy S26+ (256GB)</span>
                  <span className="text-brand-orange font-bold">Up to AED 2,900</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">*Prices are estimates and subject to physical inspection.</p>
            </div>
          </div>
        </div>

        {/* Data Security & CTA */}
        <div className="bg-brand-blue dark:bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-orange rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <ShieldCheck className="w-8 h-8 text-brand-orange" />
            </div>
            <h4 className="text-2xl font-bold mb-4">🔒 Your Data is Safe</h4>
            <p className="text-gray-300 mb-8 text-lg">
              As a professional LLC, we perform a Military-Grade Data Wipe on every device we buy, ensuring your personal information is permanently erased before the device is refurbished.
            </p>
            
            <h4 className="text-xl font-bold mb-6">Ready to see what your device is worth?</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://wa.me/971507117043" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp us a photo for an Instant Quote
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-blue hover:bg-gray-100 font-bold rounded-lg transition-colors gap-2"
              >
                <MapPin className="w-5 h-5" />
                Get Directions to Shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
