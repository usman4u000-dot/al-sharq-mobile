import React from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-brand-orange text-white py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <a href="tel:+971507117043" className="flex items-center gap-1.5 hover:text-white/90 transition-colors font-semibold">
            <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            <span>+971 50 711 7043</span>
          </a>
          <a href="mailto:support@allsharq.com" className="hidden sm:flex items-center gap-1.5 hover:text-white/90 transition-colors">
            <Mail className="h-3.5 w-3.5 fill-current" />
            <span>support@allsharq.com</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 fill-current" />
            <span>Muwailah Area, Sharjah, UAE</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
          <span>Open: Sat–Thu 9AM–11PM | Fri 4PM–11PM</span>
        </div>
      </div>
    </div>
  );
}
