import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, HardDrive, Sparkles, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type DeviceBrand = 'Apple' | 'Samsung';
type DeviceModel = string;
type StorageSize = '64GB' | '128GB' | '256GB' | '512GB' | '1TB';
type Condition = 'Flawless' | 'Good' | 'Cracked' | 'Broken';

interface TradeInState {
  brand: DeviceBrand | null;
  model: DeviceModel | null;
  storage: StorageSize | null;
  condition: Condition | null;
}

const DEVICES = {
  Apple: [
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
  ],
  Samsung: [
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
    'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
    'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
    'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
  ]
};

const STORAGE_OPTIONS: StorageSize[] = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const CONDITIONS: { value: Condition; label: string; description: string; icon: React.ReactNode }[] = [
  { value: 'Flawless', label: 'Flawless', description: 'Looks brand new, no scratches or marks.', icon: <Sparkles className="w-6 h-6 text-emerald-500" /> },
  { value: 'Good', label: 'Good', description: 'Normal wear and tear, minor scratches.', icon: <CheckCircle2 className="w-6 h-6 text-blue-500" /> },
  { value: 'Cracked', label: 'Cracked', description: 'Cracked screen or back glass, but fully functional.', icon: <AlertCircle className="w-6 h-6 text-orange-500" /> },
  { value: 'Broken', label: 'Broken', description: 'Does not turn on, severe damage, or non-functional parts.', icon: <AlertCircle className="w-6 h-6 text-red-500" /> },
];

// Mock pricing logic
const calculateValue = (state: TradeInState): number => {
  if (!state.model || !state.condition) return 0;
  
  let baseValue = 0;
  
  // Very simplified base value logic
  if (state.model.includes('15 Pro Max') || state.model.includes('S24 Ultra')) baseValue = 3500;
  else if (state.model.includes('15') || state.model.includes('S24')) baseValue = 2500;
  else if (state.model.includes('14 Pro Max') || state.model.includes('S23 Ultra')) baseValue = 2800;
  else if (state.model.includes('14') || state.model.includes('S23')) baseValue = 1800;
  else if (state.model.includes('13 Pro Max') || state.model.includes('S22 Ultra')) baseValue = 2000;
  else if (state.model.includes('13') || state.model.includes('S22')) baseValue = 1200;
  else baseValue = 800;

  // Storage multiplier
  const storageMultiplier = {
    '64GB': 0.9,
    '128GB': 1.0,
    '256GB': 1.1,
    '512GB': 1.2,
    '1TB': 1.3
  }[state.storage || '128GB'];

  // Condition multiplier
  const conditionMultiplier = {
    'Flawless': 1.0,
    'Good': 0.8,
    'Cracked': 0.4,
    'Broken': 0.1
  }[state.condition];

  return Math.round(baseValue * storageMultiplier * conditionMultiplier);
};

export default function TradeInPage() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<TradeInState>({
    brand: null,
    model: null,
    storage: null,
    condition: null
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const estimatedValue = calculateValue(state);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 transition-colors duration-300">
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/trade-in" />
        <title>Trade-In Value Calculator | Al Sharq Mobile</title>
        <meta name="description" content="Get an instant estimated trade-in value for your old phone to use towards a repair or a new device." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trade-In Value Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find out how much your device is worth in 4 simple steps.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
          {/* Progress Bar */}
          <div className="bg-gray-100 dark:bg-slate-700 h-2">
            <div 
              className="bg-brand-orange h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select your brand</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(['Apple', 'Samsung'] as DeviceBrand[]).map(brand => (
                      <button
                        key={brand}
                        onClick={() => {
                          setState({ ...state, brand, model: null });
                          handleNext();
                        }}
                        className={`p-6 rounded-xl border-2 text-center transition-all ${
                          state.brand === brand 
                            ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20 text-brand-orange' 
                            : 'border-gray-200 dark:border-slate-600 hover:border-brand-blue dark:hover:border-blue-400 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Smartphone className="w-8 h-8 mx-auto mb-3" />
                        <span className="font-semibold">{brand}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={handleBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select your model</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {state.brand && DEVICES[state.brand].map(model => (
                      <button
                        key={model}
                        onClick={() => {
                          setState({ ...state, model });
                          handleNext();
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          state.model === model 
                            ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20 text-brand-orange' 
                            : 'border-gray-200 dark:border-slate-600 hover:border-brand-blue dark:hover:border-blue-400 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{model}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={handleBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Storage Capacity</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {STORAGE_OPTIONS.map(storage => (
                      <button
                        key={storage}
                        onClick={() => {
                          setState({ ...state, storage });
                          handleNext();
                        }}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          state.storage === storage 
                            ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20 text-brand-orange' 
                            : 'border-gray-200 dark:border-slate-600 hover:border-brand-blue dark:hover:border-blue-400 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <HardDrive className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">{storage}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={handleBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Device Condition</h2>
                  </div>
                  <div className="space-y-3">
                    {CONDITIONS.map(condition => (
                      <button
                        key={condition.value}
                        onClick={() => {
                          setState({ ...state, condition: condition.value });
                          handleNext();
                        }}
                        className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${
                          state.condition === condition.value 
                            ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20' 
                            : 'border-gray-200 dark:border-slate-600 hover:border-brand-blue dark:hover:border-blue-400'
                        }`}
                      >
                        <div className="mt-1">{condition.icon}</div>
                        <div>
                          <div className={`font-bold text-lg ${state.condition === condition.value ? 'text-brand-orange' : 'text-gray-900 dark:text-white'}`}>
                            {condition.label}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            {condition.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                    <Sparkles className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Estimated Value</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {state.brand} {state.model} • {state.storage} • {state.condition} Condition
                  </p>
                  
                  <div className="text-5xl font-black text-brand-orange mb-8">
                    AED {estimatedValue}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-left mb-8">
                    <h3 className="font-semibold text-brand-blue dark:text-blue-400 mb-2">What's next?</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        Bring your device to our Sharjah lab for a final inspection.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        Get paid instantly in cash or use the value towards a repair/new device.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        Prices may vary slightly based on actual physical inspection.
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setStep(1);
                        setState({ brand: null, model: null, storage: null, condition: null });
                      }}
                      className="px-6 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Start Over
                    </button>
                    <button className="px-6 py-3 rounded-xl font-bold text-white bg-brand-orange hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                      Book an Appointment <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
