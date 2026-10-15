import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Compass
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GoogleMapsDirectionsCard() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-black rounded-3xl p-6 sm:p-8 text-white border border-brand-orange/30 shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'مفتوح الآن حتى 11:00 مساءً' : 'Open Now Daily Until 11:00 PM'}</span>
            </span>
            <span className="text-xs text-slate-400">• Muwaileh Commercial, Sharjah</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {isAr ? 'موقع ورشة الشرق للهواتف والكمبيوتر' : 'Al Sharq Technology Hardware Lab'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-4">
            {isAr 
              ? 'مبنى 1017 - محل رقم 2، شارع محطة الدفاع المدني، تجارية مويلح، الشارقة. بالقرب من المدينة الجامعية والشارقة سيتي سنتر.'
              : 'BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Commercial, Sharjah. Minutes away from University City, Sahara Centre & Dubai border.'}
          </p>

          {/* Quick Drive Times */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
            <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span><strong>2 Min</strong> University City</span>
            </div>
            <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span><strong>7 Min</strong> Sahara Centre</span>
            </div>
            <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span><strong>10 Min</strong> Dubai Border</span>
            </div>
            <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span><strong>12 Min</strong> Rolla Souq</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
          <a
            href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>{isAr ? '1-نقرة لفتح خرائط جوجل' : '1-Tap Google Maps Directions'}</span>
          </a>

          <a
            href="tel:+971507117043"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-white/20 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+971 50 711 7043</span>
          </a>
        </div>
      </div>
    </div>
  );
}
