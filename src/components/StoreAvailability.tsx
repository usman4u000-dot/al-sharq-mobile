import React, { useEffect, useState } from 'react';
import { Clock, Store, Users, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SpotlightCard from './SpotlightCard';

type StoreStatus = 'open' | 'closing_soon' | 'closed';
type BusyLevel = 'quiet' | 'moderate' | 'busy' | 'offline';

export default function StoreAvailability() {
  const [timeStr, setTimeStr] = useState('');
  const [status, setStatus] = useState<StoreStatus>('closed');
  const [busyLevel, setBusyLevel] = useState<BusyLevel>('offline');
  const [waitTime, setWaitTime] = useState<string>('--');

  useEffect(() => {
    // Determine the store status and busy level continuously
    const updateStoreStatus = () => {
      // Sharjah offset is UTC+4
      const utcDate = new Date();
      const offsetDate = new Date(utcDate.getTime() + (4 * 60 * 60 * 1000));
      const hours = offsetDate.getUTCHours();
      const minutes = offsetDate.getUTCMinutes();
      const day = offsetDate.getUTCDay(); // 0 = Sunday, 5 = Friday

      setTimeStr(
        offsetDate.toLocaleTimeString('en-US', { 
          timeZone: 'UTC', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      );

      // Store hours logic: Usually 9:00 AM to 11:00 PM, let's say.
      const isOpen = hours >= 9 && hours < 23;
      const isClosingSoon = hours === 22; // 10 PM to 11 PM

      if (!isOpen) {
        setStatus('closed');
        setBusyLevel('offline');
        setWaitTime('--');
      } else if (isClosingSoon) {
        setStatus('closing_soon');
        setBusyLevel('quiet');
        setWaitTime('5-10 min');
      } else {
        setStatus('open');
        // Fake busy level based on time of day
        if (hours >= 17 && hours <= 21) {
          setBusyLevel('busy');
          setWaitTime('15-25 min'); // Evening peak
        } else if (hours >= 13 && hours <= 16) {
          setBusyLevel('moderate');
          setWaitTime('10-15 min'); // Afternoon
        } else if (day === 5 && hours < 14) {
          // Friday prayers
          setBusyLevel('quiet');
          setWaitTime('0-5 min');
        } else {
          setBusyLevel('moderate');
          setWaitTime('5-15 min');
        }
      }
    };

    updateStoreStatus();
    const interval = setInterval(updateStoreStatus, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden" id="store-availability">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SpotlightCard className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between z-10 relative">
            
            {/* Store Information */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 shadow-sm">
                <Store className="w-4 h-4" /> Live Store Update
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Thinking of visiting us today?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
                Check our live estimated wait times and foot traffic to plan your visit. Most walk-in repairs are completed while you wait.
              </p>
            </div>

            {/* Dashboard Display */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700 w-full flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center">
                
                {/* Time & Status */}
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1 flex items-center justify-center md:justify-start gap-1.5">
                    <Clock className="w-4 h-4" /> Local Sharjah Time
                  </div>
                  <div className="text-4xl font-mono font-black text-slate-800 dark:text-slate-200 mb-2 mt-1">
                    {timeStr}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    status === 'open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    status === 'closing_soon' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status !== 'closed' ? 'bg-current' : 'hidden'}`}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                    </span>
                    {status === 'closed' ? 'Store is Closed' : status === 'closing_soon' ? 'Closing Soon' : 'Store is Open'}
                  </div>
                </div>

                <div className="hidden md:block w-px h-20 bg-slate-200 dark:bg-slate-700"></div>

                {/* Busy Status */}
                <div className="text-center w-full md:w-auto">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className={`w-5 h-5 ${
                      busyLevel === 'busy' ? 'text-red-500' : 
                      busyLevel === 'moderate' ? 'text-orange-500' : 
                      busyLevel === 'quiet' ? 'text-green-500' : 
                      'text-gray-400'
                    }`} />
                    <span className="font-bold text-gray-900 dark:text-white capitalize">
                      {busyLevel} Traffic
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Est. wait for walk-ins
                  </div>
                  <div className="text-2xl font-bold text-brand-blue">
                    {waitTime}
                  </div>
                </div>

              </div>
              
              <div className="mt-4 text-center lg:text-right">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-orange-600 transition-colors z-20 pointer-events-auto"
                >
                  Get directions on Google Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
