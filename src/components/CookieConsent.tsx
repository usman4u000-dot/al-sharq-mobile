import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay before showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-5 md:p-6 pointer-events-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 bg-brand-orange/10 p-3 rounded-full">
              <Cookie className="w-6 h-6 text-brand-orange" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">We value your privacy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link> for more information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button
                onClick={declineCookies}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-colors whitespace-nowrap"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-orange hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
