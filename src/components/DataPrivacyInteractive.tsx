import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Unlock, Delete, Battery, SignalHigh, Wifi, CheckCircle, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import SpotlightCard from './SpotlightCard';

type PhoneState = 'locked' | 'verifying' | 'unlocked' | 'reward';

export default function DataPrivacyInteractive() {
  const [pin, setPin] = useState<string>('');
  const [status, setStatus] = useState<PhoneState>('locked');
  const [isError, setIsError] = useState(false);
  const [time, setTime] = useState<string>('');
  
  const CORRECT_PIN = '1234';
  const REWARD_CODE = 'SECURE10';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (digit: string) => {
    if (status !== 'locked' || pin.length >= 4) return;
    
    const newPin = pin + digit;
    setPin(newPin);
    
    if (newPin.length === 4) {
      verifyPin(newPin);
    }
  };

  const handleBackspace = () => {
    if (status !== 'locked' || pin.length === 0) return;
    setPin(prev => prev.slice(0, -1));
    setIsError(false);
  };

  const verifyPin = (currentPin: string) => {
    setStatus('verifying');
    
    setTimeout(() => {
      if (currentPin === CORRECT_PIN) {
        setStatus('unlocked');
        setTimeout(() => {
          setStatus('reward');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#3b82f6', '#ffffff']
          });
        }, 1500);
      } else {
        setIsError(true);
        setTimeout(() => {
          setPin('');
          setIsError(false);
          setStatus('locked');
        }, 800);
      }
    }, 600);
  };

  const resetDemo = () => {
    setPin('');
    setStatus('locked');
    setIsError(false);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold text-sm mb-6 shadow-sm border border-green-200 dark:border-green-800/30">
                <Shield className="w-4 h-4" />
                100% Data Privacy Guarantee
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Your Secrets Are <br />
                <span className="text-brand-orange relative inline-block">
                  Safe With Us.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Handing over your device is stressful. What about your photos, emails, and banking apps? At Al Sharq, we operate under a strict <strong>No-Snooping Policy</strong>. Try unlocking our demonstrator phone to see our commitment in action.
              </p>

              <div className="space-y-6 mb-8">
                <SpotlightCard className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4 z-10 relative">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <strong className="block text-gray-900 dark:text-white text-lg mb-1">Passcodes Kept Offline</strong>
                      <span className="text-gray-600 dark:text-gray-400">If needed for testing, your passcode is securely memorized and never written on public tickets.</span>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4 z-10 relative">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <strong className="block text-gray-900 dark:text-white text-lg mb-1">Targeted Diagnostics</strong>
                      <span className="text-gray-600 dark:text-gray-400">We only access the specific test menus and applications required to verify the repaired components.</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Phone */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            {/* Pulsing Hint Arrow on Desktop */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 rotate-[-10deg]">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Hint: Try '1234'</p>
                <div className="w-3 h-3 bg-white dark:bg-slate-800 absolute -right-1.5 top-1/2 -translate-y-1/2 rotate-45 border-r border-t border-slate-200 dark:border-slate-700"></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-[300px] h-[620px] bg-slate-900 rounded-[3rem] border-[12px] border-black shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] dark:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden flex flex-col"
            >
              {/* Hardware buttons */}
              <div className="absolute top-24 -left-[14px] w-1 h-12 bg-black rounded-l-md opacity-80 z-[-1]"></div>
              <div className="absolute top-40 -left-[14px] w-1 h-12 bg-black rounded-l-md opacity-80 z-[-1]"></div>
              <div className="absolute top-32 -right-[14px] w-1 h-16 bg-black rounded-r-md opacity-80 z-[-1]"></div>

              {/* Dynamic Notch/Dynamic Island area */}
              <motion.div 
                animate={{ width: status === 'unlocked' ? 140 : 110 }}
                className="absolute top-2 left-1/2 -translate-x-1/2 h-7 bg-black rounded-full z-30 flex items-center justify-center transition-all duration-300"
              >
                {status === 'unlocked' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                    <Unlock className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-500 font-bold">Unlocked</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Screen Area */}
              <div className="flex-1 relative flex flex-col p-5 bg-gradient-to-b from-slate-800 to-black text-white overflow-hidden">
                {/* Wallpaper glow */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-blue/30 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-brand-orange/20 rounded-full blur-[60px] pointer-events-none"></div>

                {/* Status Bar */}
                <div className="flex justify-between items-center text-[11px] font-semibold opacity-90 pt-1 px-1 z-20">
                  <span className="w-10 text-center">{time}</span>
                  <div className="flex items-center gap-1.5 w-14 justify-end">
                    <SignalHigh className="w-[14px] h-[14px]" />
                    <Wifi className="w-[14px] h-[14px]" />
                    <Battery className="w-[16px] h-[16px]" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {(status === 'locked' || status === 'verifying') && (
                    <motion.div 
                      key="lockscreen"
                      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col items-center mt-12 z-10"
                    >
                      <motion.div 
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center w-full"
                      >
                        <Lock className={`w-8 h-8 mb-6 ${isError ? 'text-red-400' : 'text-white'}`} />
                        <h3 className="text-xl font-medium mb-8 tracking-wide">Enter Passcode</h3>
                        
                        {/* PIN Dots */}
                        <div className="flex gap-4 mb-16">
                          {[0, 1, 2, 3].map(i => (
                            <div 
                              key={i} 
                              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                                pin.length > i 
                                  ? (isError ? 'bg-red-400 border-red-400' : 'bg-white border-white') 
                                  : 'border-white/40 bg-transparent'
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>

                      {/* Keypad */}
                      <div className="grid grid-cols-3 gap-x-6 gap-y-4 px-4 w-full max-w-[260px]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <button
                            key={num}
                            className="w-[68px] h-[68px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-3xl font-light transition-colors backdrop-blur-sm"
                            onClick={() => handleKeyPress(num.toString())}
                          >
                            {num}
                          </button>
                        ))}
                        <div className="w-[68px] h-[68px]"></div>
                        <button
                          className="w-[68px] h-[68px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-3xl font-light transition-colors backdrop-blur-sm"
                          onClick={() => handleKeyPress('0')}
                        >
                          0
                        </button>
                        <button
                          className="w-[68px] h-[68px] flex items-center justify-center text-white/80 hover:text-white active:scale-95 transition-all"
                          onClick={handleBackspace}
                        >
                          <Delete className="w-7 h-7" />
                        </button>
                      </div>

                      <div className="mt-auto pb-4">
                        <div className="flex lg:hidden items-center justify-center gap-1.5 text-xs text-white/50 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          Hint: Try 1234
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'reward' && (
                    <motion.div 
                      key="reward"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center z-10 w-full"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Access Granted</h4>
                      <p className="text-center text-sm text-slate-300 px-4 mb-8">
                        Most people use weak passcodes. But even if your phone is easily unlocked, our <strong className="text-white">strict no-snooping policy</strong> keeps you safe.
                      </p>

                      <div className="w-full bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 text-center mb-8">
                        <p className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-2">Security Tester Reward</p>
                        <div className="text-2xl font-black tracking-widest text-white mb-2">{REWARD_CODE}</div>
                        <p className="text-[10px] text-white/70">Show this code for 10% off any repair</p>
                      </div>

                      <button 
                        onClick={resetDemo}
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                      >
                        Lock Device Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Home Indicator line */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full z-20"></div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
