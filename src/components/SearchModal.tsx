import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, Loader2, Smartphone, Cpu, HardDrive, Battery, Tablet, Droplet, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../utils/logger';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { title: 'Phone Repair', path: '/phone-repair', icon: Smartphone, description: 'Screen, battery, and logic board fixes' },
  { title: 'Logic Board Repair', path: '/logic-board-repair', icon: Cpu, description: 'Micro-soldering & component level fixes' },
  { title: 'iPhone Repair', path: '/iphone-repair', icon: Smartphone, description: 'iPhone 17, 16, 15, 14, 13, 12 & more' },
  { title: 'Data Recovery', path: '/data-recovery', icon: HardDrive, description: 'Secure retrieval for hard drives & SSDs' },
  { title: 'Samsung Repair', path: '/samsung-repair', icon: Smartphone, description: 'Galaxy S, Note, A & J Series' },
  { title: 'Charging Port Repair', path: '/charging-port-repair', icon: Battery, description: 'Fix loose or broken charging ports' },
  { title: 'Tablet Repair', path: '/tablet-repair', icon: Tablet, description: 'iPad, Samsung, Lenovo & more' },
  { title: 'Liquid Damage Repair', path: '/liquid-damage-repair', icon: Droplet, description: 'Advanced ultrasonic chemical cleaning' },
  { title: 'Laptop Repair', path: '/laptop-repair', icon: Laptop, description: 'MacBook, Dell, HP, Lenovo & more' },
  { title: 'Computer & Laptop Solutions', path: '/computer-repair', icon: Laptop, description: 'PC upgrades and general fixes' },
  { title: 'MacBook Specialist', path: '/macbook-repair', icon: Laptop, description: 'M-Series logic board & screen repair' },
  { title: 'Screen Protectors', path: '/screen-protector', icon: Smartphone, description: '9H Tempered Glass & Hydrogel' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        logger.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (error) {
        logger.error('Failed to start speech recognition', error);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      navigate(filteredResults[0].path);
      onClose();
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const filteredResults = query.trim() === '' 
    ? [] 
    : searchItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 flex flex-col max-h-[80vh]"
          >
            <form onSubmit={handleSearch} className="relative flex items-center p-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
              <Search className="w-6 h-6 text-gray-400 dark:text-gray-500 ml-2" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for repairs, parts, or services..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 h-12 outline-none"
              />
              
              <div className="flex items-center gap-2">
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {isListening ? (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="p-2 rounded-full bg-red-100 text-red-600 animate-pulse hover:bg-red-200 transition-colors"
                    title="Stop listening"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
                    title="Voice Search"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            <div className="overflow-y-auto flex-1">
              {query.trim() === '' ? (
                <div className="p-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 mb-3 uppercase tracking-wider">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['iPhone 15 Screen', 'Samsung Battery', 'Water Damage', 'Data Recovery'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  {filteredResults.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wider">Results</p>
                      {filteredResults.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleResultClick(item.path)}
                          className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                        >
                          <div className="w-10 h-10 bg-brand-blue/5 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-orange/10 transition-colors">
                            <item.icon className="w-5 h-5 text-brand-blue dark:text-blue-400 group-hover:text-brand-orange transition-colors" />
                          </div>
                          <div>
                            <div className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">{item.title}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try searching for something else or browse our services.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
