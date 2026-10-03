import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Globe, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GCC_REGIONS } from '../services/campaignScheduleService';

export default function TopBar() {
  const [selectedRegion, setSelectedRegion] = useState('ae');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('alsharq_selected_region');
    if (saved && GCC_REGIONS[saved]) {
      setSelectedRegion(saved);
    }
  }, []);

  const handleSelect = (code: string) => {
    setSelectedRegion(code);
    localStorage.setItem('alsharq_selected_region', code);
    setIsDropdownOpen(false);
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: code } }));
  };

  const currentConfig = GCC_REGIONS[selectedRegion] || GCC_REGIONS.ae;

  return (
    <div className="hidden sm:block bg-gradient-to-r from-brand-orange via-orange-600 to-amber-600 text-white py-1.5 sm:py-2 text-xs md:text-sm font-medium z-40 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <a href="tel:+971507117043" className="flex items-center gap-1.5 hover:text-white/90 transition-colors font-semibold">
            <Phone className="h-3.5 w-3.5 fill-current" />
            <span>+971 50 711 7043</span>
          </a>
          <a href="mailto:alsharqmobile@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-white/90 transition-colors">
            <Mail className="h-3.5 w-3.5 fill-current" />
            <span>alsharqmobile@gmail.com</span>
          </a>
          <Link
            to="/gcc-services"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-[11px] font-bold"
          >
            <span>🇸🇦 🇴🇲 🇧🇭 🇹🇷 🇰🇼 🇶🇦</span>
            <span>GCC &amp; Regional Mail-In Hub</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* GCC Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
              title="Select Country & Currency"
              aria-label={`${currentConfig.currency} - Select Country and GCC Currency`}
              aria-expanded={isDropdownOpen}
            >
              <span>{currentConfig.flag}</span>
              <span className="font-mono">{currentConfig.currency}</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 py-2 z-50 overflow-hidden">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Select Your GCC Destination
                  </div>
                  {Object.values(GCC_REGIONS).map((reg) => (
                    <button
                      key={reg.code}
                      onClick={() => handleSelect(reg.code)}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer ${
                        selectedRegion === reg.code ? 'bg-orange-50/80 dark:bg-slate-800 text-brand-orange font-bold' : ''
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{reg.flag}</span>
                        <span>{reg.nameEn}</span>
                      </span>
                      <span className="font-mono font-bold text-[11px] text-slate-500 dark:text-slate-400">
                        {reg.currency}
                      </span>
                    </button>
                  ))}
                  <div className="px-3 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <Link to="/gcc-services" onClick={() => setIsDropdownOpen(false)} className="text-brand-orange hover:underline font-bold">
                      View GCC Mail-In Shipping &gt;
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            <span>Open: Sat–Thu 9AM–11PM | Fri 4PM–11PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
