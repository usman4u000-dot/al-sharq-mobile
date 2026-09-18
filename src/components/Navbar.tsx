import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, ChevronDown, Smartphone, Laptop, Activity, Tablet, Droplet, Cpu, HardDrive, Battery, Gamepad2, Watch, Globe, Zap, Phone, MessageCircle, MapPin, Clock, Wrench, ChevronRight, Bluetooth, Camera, Volume2, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onBookNow: () => void;
  onTrackRepair: () => void;
  isBookingOpen?: boolean;
}

const navServices = [
  { to: '/cracked-screen-repair', icon: Smartphone, title: 'Cracked or Broken Screen', desc: 'Expert screen replacements for all devices' },
  { to: '/battery-replacement', icon: Battery, title: 'Battery Issues', desc: 'Fast battery replacements & diagnostics' },
  { to: '/water-damage-repair', icon: Droplet, title: 'Water/Liquid Damage', desc: 'Advanced ultrasonic chemical cleaning' },
  { to: '/charging-port-repair', icon: Zap, title: 'Charging Port Problems', desc: 'Fix loose or broken charging ports' },
  { to: '/camera-repair', icon: Camera, title: 'Camera Repair', desc: 'Front and rear camera lens replacements' },
  { to: '/audio-repair', icon: Volume2, title: 'Audio Issues', desc: 'Speaker and microphone repairs' },
  { to: '/body-repair', icon: Layers, title: 'Button/Body Damage', desc: 'Housing, back glass, and button fixes' },
  { to: '/software-issues', icon: Cpu, title: 'Software Issues', desc: 'OS unlocking, flashing & updates' },
  { to: '/data-recovery', icon: HardDrive, title: 'Data Recovery', desc: 'Secure retrieval for dead devices' },
];

export default function Navbar({ onBookNow, onTrackRepair, isBookingOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRepairsOpen, setIsRepairsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { language, toggleLanguage, t } = useLanguage();
  const isAr = language === 'ar';

  const serviceRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedServiceIndex, setFocusedServiceIndex] = useState<number>(-1);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  const mobileServiceRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedMobileServiceIndex, setFocusedMobileServiceIndex] = useState<number>(-1);
  const mobileServicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isRepairsOpen) {
      setFocusedServiceIndex(-1);
      setFocusedMobileServiceIndex(-1);
    }
  }, [isRepairsOpen]);

  useEffect(() => {
    if (isRepairsOpen && focusedServiceIndex >= 0 && serviceRefs.current[focusedServiceIndex]) {
      serviceRefs.current[focusedServiceIndex]?.focus();
    }
  }, [focusedServiceIndex, isRepairsOpen]);

  useEffect(() => {
    if (isRepairsOpen && focusedMobileServiceIndex >= 0 && mobileServiceRefs.current[focusedMobileServiceIndex]) {
      mobileServiceRefs.current[focusedMobileServiceIndex]?.focus();
    }
  }, [focusedMobileServiceIndex, isRepairsOpen]);

  const handleServicesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedServiceIndex(prev => (prev < navServices.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedServiceIndex(prev => (prev > 0 ? prev - 1 : navServices.length - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsRepairsOpen(false);
      servicesButtonRef.current?.focus();
    }
  };

  const handleMobileServicesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedMobileServiceIndex(prev => (prev < navServices.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedMobileServiceIndex(prev => (prev > 0 ? prev - 1 : navServices.length - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsRepairsOpen(false);
      mobileServicesButtonRef.current?.focus();
    }
  };

  const getLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <>
      <nav className="bg-brand-blue dark:bg-slate-900 text-white sticky top-0 z-50 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <Link to="/" aria-label="Home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg">
              <Logo variant="dark" />
            </Link>
            
            <div className="hidden lg:block">
              <div className="ml-4 xl:ml-10 flex items-baseline space-x-2 xl:space-x-6">
                <Link to="/about" aria-label="About Us" className="relative group px-3 py-2 text-sm font-medium text-white/90 hover:text-brand-orange transition-colors">
                  {t('nav.about')}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"></span>
                </Link>
                <a href={getLink('#why-choose-us')} aria-label="Why Choose Us" className="relative group px-3 py-2 text-sm font-medium text-white/90 hover:text-brand-orange transition-colors">
                  Why Choose Us
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"></span>
                </a>
                
                {/* Services Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsRepairsOpen(true)}
                  onMouseLeave={() => setIsRepairsOpen(false)}
                >
                  <button 
                    ref={servicesButtonRef}
                    className="relative group flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-brand-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-md"
                    onClick={() => {
                      setIsRepairsOpen(!isRepairsOpen);
                      setFocusedServiceIndex(0);
                    }}
                    onKeyDown={(e) => {
                      if (!isRepairsOpen && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setIsRepairsOpen(true);
                        setFocusedServiceIndex(0);
                      } else if (isRepairsOpen && e.key === 'Escape') {
                        e.preventDefault();
                        setIsRepairsOpen(false);
                        servicesButtonRef.current?.focus();
                      } else if (isRepairsOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                        handleServicesKeyDown(e);
                      }
                    }}
                    aria-expanded={isRepairsOpen}
                    aria-label="Services Menu"
                    aria-haspopup="true"
                  >
                    {t('nav.services')} <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRepairsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"></span>
                  </button>
                  
                  <AnimatePresence>
                    {isRepairsOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[90vw] max-w-[650px] z-50">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden origin-top"
                        >
                          <motion.div 
                            className="p-4 grid grid-cols-2 gap-x-4 gap-y-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
                            }}
                          >
                          {navServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                              <motion.div key={index} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                <motion.div whileHover="hover" whileTap="tap">
                                  <Link 
                                    to={service.to} 
                                    ref={(el) => { if (el) serviceRefs.current[index] = el; }}
                                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:bg-slate-50 dark:focus:bg-slate-700 transition-colors group/item relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange" 
                                    onClick={() => setIsRepairsOpen(false)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Escape') {
                                        handleServicesKeyDown(e);
                                      }
                                    }}
                                  >
                                    <motion.div 
                                      variants={{
                                        hover: { scale: 1.15, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.4 } },
                                        tap: { scale: 0.95 }
                                      }}
                                      className="w-10 h-10 bg-brand-blue/5 dark:bg-slate-600 rounded-lg flex items-center justify-center shrink-0 group-hover/item:bg-brand-orange/10 transition-colors"
                                    >
                                      <Icon className="w-5 h-5 text-brand-blue dark:text-blue-400 group-hover/item:text-brand-orange transition-colors" aria-hidden="true" />
                                    </motion.div>
                                    <div>
                                      <div className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">{service.title}</div>
                                      <div className="text-gray-500 dark:text-gray-400 text-xs">{service.desc}</div>
                                    </div>
                                  </Link>
                                </motion.div>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-750 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <Link 
                            to="/services" 
                            onClick={() => setIsRepairsOpen(false)}
                            className="text-xs font-bold text-brand-blue dark:text-blue-400 hover:text-brand-orange dark:hover:text-brand-orange flex items-center gap-1.5 transition-colors"
                          >
                            <span>{isAr ? 'عرض كافة الخدمات والإصلاحات' : 'View All Services & Repairs'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link 
                            to="/estimate" 
                            onClick={() => setIsRepairsOpen(false)}
                            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors"
                          >
                            {isAr ? 'حاسبة التكلفة الفورية ←' : 'Instant Cost Estimator →'}
                          </Link>
                        </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/shop" aria-label="Shop" className="relative group px-3 py-2 text-sm font-medium text-white/90 hover:text-brand-orange transition-colors">
                  Shop
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"></span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              <button
                onClick={toggleLanguage}
                className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
                <span className="uppercase tracking-wider">{language}</span>
              </button>
              <ThemeToggle />
              <button 
                onClick={() => {
                  if (typeof navigator !== 'undefined' && (navigator as any).bluetooth) {
                    (navigator as any).bluetooth.requestDevice({
                      acceptAllDevices: true,
                      optionalServices: ['battery_service']
                    }).then(device => {
                      alert(`Bluetooth 5.0 Audio connected: ${device.name || 'Unknown Audio Device'}`);
                    }).catch(error => {
                      console.log('Bluetooth auto-pairing cancelled or failed', error);
                    });
                  } else {
                    alert('Bluetooth 5.0 connectivity is not supported in this environment.');
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
                aria-label="Connect Bluetooth Audio"
              >
                <Bluetooth className="h-5 w-5 hover:text-brand-orange transition-colors" aria-hidden="true" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <button 
                onClick={onBookNow}
                disabled={isBookingOpen}
                aria-label={isBookingOpen ? "Booking in progress" : t('nav.book')}
                className="bg-brand-orange hover:bg-orange-600 text-white px-4 xl:px-5 py-2 rounded-full font-medium transition-colors text-sm whitespace-nowrap flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isBookingOpen ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Booking...
                  </>
                ) : (
                  t('nav.book')
                )}
              </button>
            </div>

            {/* Mobile Header Controls */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-md text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{language === 'en' ? 'عربي' : 'EN'}</span>
              </button>
              
              <ThemeToggle />

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Mobile Menu"
                aria-expanded={isOpen}
                className="p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 overflow-y-auto max-h-[calc(100vh-4.5rem)] shadow-2xl"
            >
              <div className="px-4 pt-4 pb-8 space-y-4">
                
                {/* Mobile Quick Action Buttons Bar */}
                <div className="grid grid-cols-3 gap-2 pb-1">
                  <a
                    href="tel:+971507117043"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 text-white transition-colors text-center"
                  >
                    <Phone className="w-5 h-5 text-brand-orange mb-1" />
                    <span className="text-xs font-semibold">{isAr ? 'اتصل الآن' : 'Call'}</span>
                  </a>
                  <a
                    href="https://wa.me/971507117043?text=Hello%20Al%20Sharq%20Mobile,%20I%20would%20like%20to%20inquire%20about%20a%20repair."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 text-white transition-colors text-center"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400 mb-1" />
                    <span className="text-xs font-semibold">{isAr ? 'واتساب' : 'WhatsApp'}</span>
                  </a>
                  <a
                    href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 text-white transition-colors text-center"
                  >
                    <MapPin className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-xs font-semibold">{isAr ? 'الموقع' : 'Muwaileh'}</span>
                  </a>
                </div>

                {/* Primary CTA: Book Now */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBookNow();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <Wrench className="w-5 h-5" />
                  <span>{isAr ? 'احجز موعد إصلاح الآن' : 'Book a Repair Service'}</span>
                </button>

                {/* Mobile Services Accordion */}
                <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
                  <button 
                    ref={mobileServicesButtonRef}
                    onClick={() => setIsRepairsOpen(!isRepairsOpen)}
                    aria-expanded={isRepairsOpen}
                    className="text-white w-full flex items-center justify-between p-3.5 text-sm font-bold transition-colors hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-brand-orange" />
                      {isAr ? 'خدمات الإصلاح المتخصصة' : 'Repair Services & Solutions'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isRepairsOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isRepairsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-700/40"
                      >
                        <Link 
                          to="/services" 
                          className="text-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20 flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-colors mb-1 border border-brand-orange/20"
                          onClick={() => { setIsOpen(false); setIsRepairsOpen(false); }}
                        >
                          <div className="flex items-center gap-2.5">
                            <Wrench className="w-4 h-4 text-brand-orange shrink-0" />
                            <span>{isAr ? 'عرض كافة الخدمات والإصلاحات' : 'View All Services & Repairs'}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-brand-orange" />
                        </Link>
                        {navServices.map((service, index) => {
                          const Icon = service.icon;
                          return (
                            <Link 
                              key={index}
                              to={service.to} 
                              className="text-slate-300 hover:text-white hover:bg-slate-700/60 flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors"
                              onClick={() => { setIsOpen(false); setIsRepairsOpen(false); }}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4 text-brand-orange/80 shrink-0" />
                                <span>{service.title}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Nav Links */}
                <div className="space-y-1">
                  <Link 
                    to="/shop" 
                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{isAr ? 'المتجر والإكسسوارات' : 'Shop & Accessories'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link 
                    to="/estimate" 
                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{isAr ? 'حاسبة التكلفة الفورية' : 'Instant Cost Estimator'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onTrackRepair();
                    }}
                    className="w-full text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left"
                  >
                    <span>{isAr ? 'تتبع حالة جهازك' : 'Track Your Repair Status'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <Link 
                    to="/about" 
                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{t('nav.about')}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <a 
                    href={getLink('#why-choose-us')} 
                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Why Choose Us</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>

                  <Link 
                    to="/reviews" 
                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Customer Reviews</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Store Info Footer in Drawer */}
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Open Today: Sat–Thu 9AM–11PM | Fri 4PM–11PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Muwaileh Commercial Area, Sharjah, UAE</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
