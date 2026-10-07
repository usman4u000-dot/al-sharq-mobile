import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  Smartphone, 
  Laptop, 
  Activity, 
  Cpu, 
  HardDrive, 
  Battery, 
  Globe, 
  Zap, 
  Wrench, 
  ChevronRight, 
  Camera, 
  Volume2, 
  Layers, 
  ArrowRight, 
  Printer, 
  Monitor, 
  Mic, 
  GraduationCap, 
  Building2, 
  Sparkles,
  ShieldCheck,
  Calculator,
  Shield,
  Droplet,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LiteModeToggle from './LiteModeToggle';
import SearchModal from './SearchModal';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onBookNow: () => void;
  onTrackRepair: () => void;
  isBookingOpen?: boolean;
}

const navServices = [
  { to: '/phone-repair', icon: Smartphone, title: 'Mobile Phone Repairs', desc: 'iPhone & Android screen, battery & chip fix' },
  { to: '/computer-repair', icon: Monitor, title: 'Computer & Desktop Repairs', desc: 'PC hardware, OS & motherboard diagnostics' },
  { to: '/laptop-repair', icon: Laptop, title: 'Laptop & MacBook Repair', desc: 'Motherboard micro-soldering & upgrades' },
  { to: '/laptop-screen-repair', icon: Monitor, title: 'Laptop Screen Replacement', desc: 'Retina, OLED & 144Hz panel replacement' },
  { to: '/printer-repair', icon: Printer, title: 'Printer Repair & Maintenance', desc: 'LaserJet & InkTank servicing in Sharjah' },
  { to: '/logic-board-repair', icon: Cpu, title: 'Chip-Level Micro-Soldering', desc: 'Complex motherboard & short-circuit repair' },
  { to: '/cracked-screen-repair', icon: Smartphone, title: 'Cracked or Broken Screen', desc: 'Expert screen replacements for all devices' },
  { to: '/battery-replacement', icon: Battery, title: 'Battery Issues & Health', desc: 'Fast battery replacements & diagnostics' },
  { to: '/water-damage-repair', icon: Droplet, title: 'Water/Liquid Damage', desc: 'Advanced ultrasonic chemical cleaning' },
  { to: '/charging-port-repair', icon: Zap, title: 'Charging Port Problems', desc: 'Fix loose or broken charging ports' },
  { to: '/camera-repair', icon: Camera, title: 'Camera Repair & OIS', desc: 'Front and rear camera lens replacements' },
  { to: '/data-recovery', icon: HardDrive, title: 'Data Recovery & NAND', desc: 'Secure retrieval for dead devices' },
];

export default function Navbar({ onBookNow, onTrackRepair, isBookingOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRepairsOpen, setIsRepairsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const isAr = language === 'ar';

  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setIsRepairsOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname]);

  const navTools = [
    {
      to: '/hardware-test',
      icon: Sparkles,
      badge: 'NEW',
      title: isAr ? 'مختبر فحص الأجهزة (DeviceLab™)' : 'DeviceLab™ Live Hardware Tester',
      desc: isAr ? 'طرد الماء الصوتي 165Hz، فحص اللمس، بكسلات الشاشة، والميكروفون' : '165Hz sonic water ejector, touch matrix, OLED burn-in & mic dB tester'
    },
    {
      to: '/estimate',
      icon: Calculator,
      title: isAr ? 'حاسبة تكلفة الإصلاح الفورية' : 'Instant Repair Cost Estimator',
      desc: isAr ? 'تسعيرة فورية وشفافة لكافة الأعطال والقطع الأصلية' : 'Immediate transparent price quote for all hardware issues'
    },
    {
      to: '/imei-checker',
      icon: ShieldCheck,
      title: isAr ? 'فحص أصالة الجهاز و TDRA' : 'IMEI & Device Authenticity Check',
      desc: isAr ? 'التحقق من حالة الضمان، اعتماد الهيئة، وتطابق مواصفات الإمارات' : 'Verify UAE TDRA approval, warranty status & blacklist check'
    },
    {
      to: '/mobile-tools',
      icon: Activity,
      title: isAr ? 'مركز أدوات التشخيص الشامل' : 'All Diagnostic Tools & Simulators',
      desc: isAr ? 'محاكي السقوط، فحص البطارية، ومقارنة توفير التكلفة' : 'Drop test simulator, battery thermal audit & savings calculator'
    }
  ];

  return (
    <>
      <nav className="bg-brand-blue/95 dark:bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 shadow-md border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              aria-label="Al Sharq Mobile - Home" 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg shrink-0"
            >
              <Logo variant="dark" />
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              
              {/* 1. Services & Repairs Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => { setIsRepairsOpen(true); setIsToolsOpen(false); }}
                onMouseLeave={() => setIsRepairsOpen(false)}
              >
                <button 
                  ref={servicesButtonRef}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
                  onClick={() => setIsRepairsOpen(!isRepairsOpen)}
                  aria-expanded={isRepairsOpen}
                  aria-label="Services Menu"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isRepairsOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {isRepairsOpen && (
                    <div className="absolute left-0 top-full pt-2 w-[580px] z-50">
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                      >
                        <div className="p-4 grid grid-cols-2 gap-2">
                          {navServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                              <Link 
                                key={index}
                                to={service.to} 
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group/item" 
                                onClick={() => setIsRepairsOpen(false)}
                              >
                                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-slate-750 flex items-center justify-center shrink-0 group-hover/item:bg-orange-100 dark:group-hover/item:bg-slate-650 transition-colors">
                                  <Icon className="w-4 h-4 text-orange-700 dark:text-orange-400 group-hover/item:scale-110 transition-transform" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-slate-900 dark:text-white font-bold text-xs truncate">{service.title}</div>
                                  <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{service.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <Link 
                            to="/services" 
                            onClick={() => setIsRepairsOpen(false)}
                            className="text-xs font-bold text-[#C2410C] dark:text-orange-400 hover:underline flex items-center gap-1.5"
                          >
                            <span>{isAr ? 'عرض كافة الخدمات والإصلاحات' : 'View All Technical Disciplines'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <Link 
                            to="/estimate" 
                            onClick={() => setIsRepairsOpen(false)}
                            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-orange transition-colors"
                          >
                            {isAr ? 'حاسبة التكلفة الفورية ←' : 'Instant Cost Estimator →'}
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. DeviceLab™ & Diagnostics Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => { setIsToolsOpen(true); setIsRepairsOpen(false); }}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <button 
                  ref={toolsButtonRef}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  aria-expanded={isToolsOpen}
                  aria-label="Diagnostic Tools Menu"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>{isAr ? 'مختبر فحص الأجهزة' : 'DeviceLab™ & Tools'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isToolsOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {isToolsOpen && (
                    <div className="absolute left-0 top-full pt-2 w-[440px] z-50">
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                      >
                        <div className="p-3 space-y-1.5">
                          {navTools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                              <Link 
                                key={index}
                                to={tool.to} 
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group/item" 
                                onClick={() => setIsToolsOpen(false)}
                              >
                                <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Icon className="w-4 h-4 text-[#C2410C] dark:text-orange-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-900 dark:text-white font-bold text-xs">{tool.title}</span>
                                    {tool.badge && (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#C2410C] text-white">
                                        {tool.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight mt-0.5 line-clamp-2">
                                    {tool.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 text-center">
                          <Link 
                            to="/hardware-test" 
                            onClick={() => setIsToolsOpen(false)}
                            className="text-xs font-bold text-[#C2410C] dark:text-orange-400 hover:underline inline-flex items-center gap-1.5"
                          >
                            <span>{isAr ? 'بدء فحص هاردوير الجهاز الآن مجاناً' : 'Launch Full 12-Point Hardware Stress Test'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Shop */}
              <Link 
                to="/shop" 
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:text-brand-orange transition-colors rounded-lg"
              >
                {isAr ? 'المتجر' : 'Shop'}
              </Link>

              {/* 4. GCC Mail-In */}
              <Link 
                to="/gcc-services" 
                className="px-3.5 py-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5 rounded-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isAr ? 'دول الخليج (شحن)' : 'GCC Mail-In'}</span>
              </Link>

              {/* 5. AI, Chatbot & Cloud Hub */}
              <Link 
                to="/ai-cloud-solutions" 
                className="px-3.5 py-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAr ? 'الذكاء الاصطناعي والسحابة' : 'AI & Cloud'}</span>
              </Link>

              {/* 6. Arabic Hub */}
              <Link 
                to="/arabic-services" 
                className="px-3.5 py-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 rounded-lg"
              >
                <span>الخدمات بالعربية</span>
              </Link>

              {/* 6. About */}
              <Link 
                to="/about" 
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors rounded-lg"
              >
                {t('nav.about')}
              </Link>

            </div>

            {/* Desktop Right Actions Cluster */}
            <div className="hidden lg:flex items-center gap-2.5">
              
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-white border border-white/10"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                <span className="uppercase tracking-wider">{language === 'en' ? 'عربي' : 'EN'}</span>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Fast Lite Mode Toggle for older systems/mobiles */}
              <LiteModeToggle />

              {/* Search & Voice Pill */}
              <div className="flex items-center bg-white/10 dark:bg-slate-800 rounded-xl p-0.5 border border-white/15">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-slate-200 hover:text-white transition-all"
                  aria-label="Search"
                  title="Search repairs, devices, guides"
                >
                  <Search className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-voice-search'))}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-orange-400 hover:text-orange-300 transition-all"
                  aria-label="Voice Search"
                  title="Voice Search (Urdu / Arabic / English)"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>

              {/* Book Appointment CTA */}
              <button 
                onClick={onBookNow}
                disabled={isBookingOpen}
                aria-label={isBookingOpen ? "Booking in progress" : t('nav.book')}
                className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-5 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 shadow-lg shadow-orange-950/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border border-orange-500/30"
              >
                {isBookingOpen ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>{t('nav.book')}</span>
                  </>
                )}
              </button>

            </div>

            {/* Mobile Header Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-lg text-xs font-bold bg-white/10 text-white flex items-center gap-1 border border-white/15"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe className="h-3 w-3 text-brand-orange" />
                <span>{language === 'en' ? 'عربي' : 'EN'}</span>
              </button>
              
              <ThemeToggle />
              <LiteModeToggle />

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors focus:outline-none"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-white/10 bg-slate-900/98 backdrop-blur-xl max-h-[85vh] overflow-y-auto"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                
                {/* Featured Mobile Banner: DeviceLab */}
                <Link
                  to="/hardware-test"
                  onClick={() => setIsOpen(false)}
                  className="block p-3.5 rounded-2xl bg-gradient-to-r from-orange-950/80 via-slate-800 to-slate-900 border border-orange-500/40 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-black text-white">Al Sharq DeviceLab™</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#C2410C] text-white">
                      NEW FREE TOOL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    165Hz Acoustic Water Ejector • Touch Matrix • Screen Burn-In Checker
                  </p>
                </Link>

                {/* Mobile Services Accordion */}
                <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
                  <button 
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="text-white w-full flex items-center justify-between p-3.5 text-sm font-bold transition-colors hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-brand-orange" />
                      <span>{isAr ? 'خدمات الإصلاح التخصصية' : 'Repair Services & Solutions'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-700/40"
                      >
                        <Link 
                          to="/services" 
                          className="text-[#C2410C] bg-orange-950/30 flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold border border-orange-500/20"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Wrench className="w-3.5 h-3.5 text-brand-orange" />
                            <span>{isAr ? 'عرض كافة الخدمات' : 'View All 5 Technical Specialties'}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        {navServices.map((service, index) => {
                          const Icon = service.icon;
                          return (
                            <Link 
                              key={index}
                              to={service.to} 
                              className="text-slate-300 hover:text-white flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5 text-brand-orange/80" />
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

                {/* Mobile Tools Accordion */}
                <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
                  <button 
                    onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                    className="text-white w-full flex items-center justify-between p-3.5 text-sm font-bold transition-colors hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span>{isAr ? 'أدوات الفحص والتشخيص' : 'Diagnostic Lab & Tools'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileToolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-700/40"
                      >
                        {navTools.map((tool, index) => {
                          const Icon = tool.icon;
                          return (
                            <Link 
                              key={index}
                              to={tool.to} 
                              className="text-slate-300 hover:text-white flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{tool.title}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Nav Links */}
                <div className="space-y-1 pt-1">
                  <Link 
                    to="/gcc-services" 
                    className="text-orange-300 bg-orange-950/40 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold border border-orange-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-400" />
                      <span>{isAr ? 'شحن وإصلاح دول الخليج (Saudi/Oman)' : 'GCC & Regional Mail-In (KSA/Oman)'}</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </Link>

                  <Link 
                    to="/ai-cloud-solutions" 
                    className="text-cyan-300 bg-cyan-950/60 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold border border-cyan-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>{isAr ? 'منصات الذكاء الاصطناعي، شات بوت والسحابة' : 'AIP, AI Chatbot, Cloud & Google AI'}</span>
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950">AI HUB</span>
                  </Link>

                  <Link 
                    to="/arabic-services" 
                    className="text-emerald-300 bg-emerald-950/40 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'صفحة الخدمات والتصليح بالعربية' : 'Arabic Services Hub (الخدمات بالعربية)'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </Link>

                  <Link 
                    to="/shop" 
                    className="text-slate-200 hover:text-white flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{isAr ? 'المتجر والأجهزة المعتمدة' : 'Shop & Certified Devices'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link 
                    to="/students" 
                    className="text-slate-200 hover:text-white flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-brand-orange" />
                      <span>{isAr ? 'خصم الطلاب 15%' : '15% Student Discount (AUS/UoS)'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link 
                    to="/corporate-amc" 
                    className="text-slate-200 hover:text-white flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span>{isAr ? 'عقود الشركات والصيانة (B2B)' : 'Corporate IT & Fleet AMC'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onTrackRepair();
                    }}
                    className="w-full text-slate-200 hover:text-white flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left"
                  >
                    <span>{isAr ? 'تتبع حالة جهازك' : 'Track Your Repair Status'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <Link 
                    to="/about" 
                    className="text-slate-200 hover:text-white flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{t('nav.about')}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Mobile Bottom Booking CTA */}
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      onBookNow();
                    }}
                    className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>{t('nav.book')}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
