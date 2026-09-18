import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Smartphone, Laptop, Battery, Zap, AlertCircle, CheckCircle2, ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

type Device = 'Phone' | 'Laptop';
type Issue = 'Power' | 'Screen' | 'Battery' | 'Software';

export default function TroubleshootingPage() {
  const [device, setDevice] = useState<Device | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const solutions = {
    Phone: {
      Power: "Try a Force Restart: Press and quickly release Volume Up, then Volume Down. Finally, press and hold the Side/Power button until you see the logo (can take up to 20 seconds).",
      Screen: "If the screen is black but the phone rings, it's a display failure. If it's unresponsive to touch, try cleaning the screen and removing any thick screen protectors. A force restart may also help.",
      Battery: "Check your Battery Health in Settings. If it's below 80%, it needs replacement. To save power now, turn on Low Power Mode and disable Background App Refresh.",
      Software: "Ensure your device has enough storage (at least 5GB free). Delete unused apps and try updating your OS via iTunes/Finder if OTA fails."
    },
    Laptop: {
      Power: "Reset the SMC (System Management Controller). For older MacBooks: Hold Shift + Control + Option + Power for 10 seconds while plugged in. For M-Series: Simply restart the Mac.",
      Screen: "Connect to an external monitor. If the external monitor works, your laptop's display or display cable is faulty. If neither works, it's likely a GPU or Logic Board issue.",
      Battery: "Click the battery icon. If it says 'Service Recommended', it's time for a replacement. Try resetting the SMC to recalibrate battery readings.",
      Software: "Boot into Safe Mode (Hold Shift during startup for Intel, or hold Power button for M-Series). This clears caches and disables third-party startup items."
    }
  };

  const reset = () => {
    setDevice(null);
    setIssue(null);
    setShowSolution(false);
    setFeedback(null);
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/troubleshoot" />
        <title>Self-Help Troubleshooting | Al Sharq Mobile Phone</title>
        <meta name="description" content="Try our interactive troubleshooting assistant to fix common device issues before booking a repair." />
      </Helmet>
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
              <Wrench className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-4xl font-bold text-brand-blue dark:text-white mb-4">
              Interactive Troubleshooting
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Let's see if we can fix your issue right now, for free.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              {!device && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">1. What device are you having trouble with?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => setDevice('Phone')} className="flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-blue dark:hover:border-brand-blue bg-slate-50 dark:bg-slate-900 transition-all text-left">
                      <Smartphone className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Smartphone / Tablet</span>
                    </button>
                    <button onClick={() => setDevice('Laptop')} className="flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-blue dark:hover:border-brand-blue bg-slate-50 dark:bg-slate-900 transition-all text-left">
                      <Laptop className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Laptop / MacBook</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {device && !issue && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setDevice(null)} className="text-sm text-brand-blue dark:text-blue-400 mb-6 font-medium hover:underline flex items-center gap-1">← Back to Device Selection</button>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">2. What seems to be the main issue?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'Power', icon: Zap, label: "Won't Turn On / Dead" },
                      { id: 'Screen', icon: AlertCircle, label: "Screen / Display Issues" },
                      { id: 'Battery', icon: Battery, label: "Battery Draining Fast" },
                      { id: 'Software', icon: RefreshCcw, label: "Freezing / Software Bugs" }
                    ].map(item => (
                      <button key={item.id} onClick={() => { setIssue(item.id as Issue); setShowSolution(true); }} className="flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-orange dark:hover:border-brand-orange bg-slate-50 dark:bg-slate-900 transition-all text-left">
                        <item.icon className="w-6 h-6 text-brand-orange" />
                        <span className="font-bold text-gray-900 dark:text-white">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {showSolution && device && issue && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <button 
                    onClick={() => {
                      setIssue(null);
                      setShowSolution(false);
                      setFeedback(null);
                    }} 
                    className="text-sm text-brand-blue dark:text-blue-400 mb-6 font-medium hover:underline flex items-center gap-1"
                  >
                    ← Back to Issues
                  </button>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-800 mb-8">
                    <h3 className="text-xl font-bold text-brand-blue dark:text-blue-400 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" /> Suggested Fix
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                      {solutions[device][issue]}
                    </p>
                  </div>

                  {!feedback ? (
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">Did this solve your problem?</p>
                      <div className="flex justify-center gap-4">
                        <button onClick={() => setFeedback('yes')} className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors">
                          Yes, it worked!
                        </button>
                        <button onClick={() => setFeedback('no')} className="px-8 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-xl font-bold transition-colors">
                          No, still broken
                        </button>
                      </div>
                    </div>
                  ) : feedback === 'yes' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Awesome!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">We're glad we could help you fix it for free.</p>
                      <button onClick={reset} className="text-brand-blue dark:text-blue-400 font-medium hover:underline">Start Over</button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Looks like it needs a pro.</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">Don't worry, our expert technicians can diagnose and repair this for you quickly.</p>
                      <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1">
                        Book a Repair Now
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <div className="mt-6">
                        <button onClick={reset} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">Try another solution</button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
