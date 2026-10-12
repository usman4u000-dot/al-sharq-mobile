import React from 'react';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Clock, Star, ShieldCheck, Wrench, Sparkles, ShoppingBag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface FooterProps {
  onOpenTerms?: () => void;
}

export default function Footer({ onOpenTerms }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black dark:from-slate-950 dark:to-black text-white pt-12 sm:pt-16 pb-28 md:pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & About Column */}
          <div>
            <div className="mb-5">
              <Logo variant="dark" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Al Sharq Mobile in Sharjah offers professional smartphone and laptop repairs, wholesale mobile accessories, and certified devices. Fast, reliable service with genuine warranty.
            </p>
            <div className="text-xs text-gray-500 mb-5 space-y-1">
              <p className="font-semibold text-gray-400">Our Service Standards:</p>
              <p>• 100% Transparent Price Quotation</p>
              <p>• Data Sanctity &amp; Privacy Protected</p>
              <p>• Same-Day Fast Turnaround</p>
              <p>• Warranty on Parts &amp; Workmanship</p>
            </div>
            <div className="flex gap-3">
              <a href="https://facebook.com/alsharq" target="_blank" rel="noopener noreferrer" aria-label="Visit Al Sharq Facebook Page" className="p-2 bg-white/10 rounded-xl hover:bg-brand-orange transition-colors">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://tiktok.com/@alsharq" target="_blank" rel="noopener noreferrer" aria-label="Visit Al Sharq TikTok Profile" className="p-2 bg-white/10 rounded-xl hover:bg-brand-orange transition-colors">
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/alsharq" target="_blank" rel="noopener noreferrer" aria-label="Visit Al Sharq Twitter X Profile" className="p-2 bg-white/10 rounded-xl hover:bg-brand-orange transition-colors">
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://instagram.com/alsharq" target="_blank" rel="noopener noreferrer" aria-label="Visit Al Sharq Instagram Profile" className="p-2 bg-white/10 rounded-xl hover:bg-brand-orange transition-colors">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Repair Services Column */}
          <div>
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-brand-orange" />
              <span>Repair Services</span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/phone-repair" className="hover:text-brand-orange transition-colors">Mobile Phone Repair</Link></li>
              <li><Link to="/iphone-repair" className="hover:text-brand-orange transition-colors">iPhone Screen &amp; Battery</Link></li>
              <li><Link to="/samsung-repair" className="hover:text-brand-orange transition-colors">Samsung &amp; Android Repair</Link></li>
              <li><Link to="/laptop-repair" className="hover:text-brand-orange transition-colors">Laptop &amp; MacBook Repair</Link></li>
              <li><Link to="/laptop-screen-repair" className="hover:text-brand-orange transition-colors">Laptop Screen Replacement</Link></li>
              <li><Link to="/logic-board-repair" className="hover:text-brand-orange transition-colors">Chip Micro-Soldering</Link></li>
              <li><Link to="/battery-repair" className="hover:text-brand-orange transition-colors">Battery Replacement</Link></li>
              <li><Link to="/data-recovery" className="hover:text-brand-orange transition-colors">Dead Device Data Recovery</Link></li>
            </ul>
          </div>

          {/* Clean Quick Links Column */}
          <div>
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Shop &amp; Mobile Accessories</Link></li>
              <li><Link to="/estimate" className="hover:text-brand-orange transition-colors">Instant Repair Cost Estimator</Link></li>
              <li><Link to="/hardware-test" className="hover:text-brand-orange transition-colors">DeviceLab™ Hardware Tester</Link></li>
              <li><Link to="/track-repair" className="hover:text-brand-orange transition-colors">Track Repair Status</Link></li>
              <li><Link to="/gcc-services" className="hover:text-brand-orange transition-colors">GCC &amp; Regional Mail-In</Link></li>
              <li><Link to="/arabic-services" className="hover:text-brand-orange transition-colors">خدمات الصيانة بالعربية</Link></li>
              <li><Link to="/blog" className="hover:text-brand-orange transition-colors">Tech Blog &amp; Dubai Guides</Link></li>
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Our Sharjah Workshop</Link></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-5">
              Contact &amp; Visit Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-brand-orange" />
                </div>
                <div>
                  <p className="font-semibold text-white text-xs">Al Sharq Mobile Phone &amp; Computer</p>
                  <a 
                    href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange transition-colors block mt-1 text-xs leading-relaxed"
                  >
                    BLDG#1017 - SHOP#2 Fire Station Road<br />
                    Muwaileh - Industrial Area, Sharjah UAE
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0">
                  <Phone className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400">Call / WhatsApp</span>
                  <a href="tel:+971507117043" className="hover:text-brand-orange transition-colors font-semibold text-white text-xs">
                    +971 50 711 7043
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0">
                  <Mail className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400">Email Us</span>
                  <a href="mailto:alsharqmobile@gmail.com" className="hover:text-brand-orange transition-colors font-medium text-white text-xs">
                    alsharqmobile@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0 mt-0.5">
                  <Clock className="h-4 w-4 text-brand-orange" />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="text-[11px] text-slate-400">Opening Hours</span>
                  <p className="font-medium text-white">Sat-Thu: 9 AM - 11 PM</p>
                  <p className="font-medium text-white">Friday: 4 PM - 11 PM</p>
                </div>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-review-booster'))}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span>Rate Us on Google Maps</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/10 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Accepted Payment Methods:</span>
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium text-xs">Cash</span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium text-xs">Visa / Mastercard</span>
            <span className="px-3 py-1 bg-[#EEFDF4] text-[#1D9968] border border-[#1D9968]/20 rounded-lg font-black tracking-tight text-sm">tabby</span>
            <span className="px-3 py-1 bg-[#FFF4F0] text-[#993A1D] border border-[#993A1D]/30 rounded-lg font-black tracking-tight text-sm">tamara</span>
          </div>
        </div>

        {/* Popular Searches & Service Areas (Organized Clean Collapsible/Readable Tags) */}
        <div className="border-t border-white/10 pt-6 pb-6 text-xs text-slate-400">
          <div className="mb-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mr-2">Top Services in Sharjah &amp; UAE:</span>
            <span className="inline-flex flex-wrap gap-x-2 gap-y-1">
              <Link to="/phone-repair" className="hover:text-brand-orange transition-colors">phone repair Sharjah</Link> •
              <Link to="/iphone-repair" className="hover:text-brand-orange transition-colors">iPhone screen repair</Link> •
              <Link to="/laptop-repair" className="hover:text-brand-orange transition-colors">laptop repair Muwaileh</Link> •
              <Link to="/macbook-repair" className="hover:text-brand-orange transition-colors">MacBook repair UAE</Link> •
              <Link to="/battery-repair" className="hover:text-brand-orange transition-colors">battery replacement</Link> •
              <Link to="/screen-repair" className="hover:text-brand-orange transition-colors">cracked screen fix</Link> •
              <Link to="/logic-board-repair" className="hover:text-brand-orange transition-colors">micro-soldering</Link> •
              <Link to="/data-recovery" className="hover:text-brand-orange transition-colors">data recovery</Link> •
              <Link to="/gcc-services" className="text-brand-orange hover:underline font-semibold">GCC Saudi Arabia &amp; Oman Mail-In Hub</Link>
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-3">
          <p>&copy; {new Date().getFullYear()} Al Sharq Mobile Phone &amp; Computer Trading LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/faq" className="hover:text-brand-orange transition-colors">FAQ</Link>
            <Link to="/blog" className="hover:text-brand-orange transition-colors">Blog</Link>
            <Link to="/reviews" className="hover:text-brand-orange transition-colors">Reviews</Link>
            <Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
            <Link to="/warranty" className="hover:text-brand-orange transition-colors">Warranty Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
