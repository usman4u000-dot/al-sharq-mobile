import React from 'react';
import { Phone, MapPin, Clock, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-brand-orange text-white py-1.5 sm:py-2 text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <a href="tel:+971507117043" className="flex items-center gap-1.5 hover:text-white/90 transition-colors font-semibold">
            <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
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
            <span>GCC & Regional Mail-In Lab</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            <span>Open: Sat–Thu 9AM–11PM | Fri 4PM–11PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
