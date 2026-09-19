import React from 'react';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <Logo variant="dark" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Al Sharq Mobile in Sharjah offers professional laptop repairs, wholesale mobile accessories, and original smartphones. Visit our Muwaileh lab for fast service and fair prices.
            </p>
            <div className="text-sm text-gray-500 mb-6 space-y-1">
              <p className="font-semibold text-gray-400">Our Promise to Sharjah:</p>
              <p>• Precision Over "Quick Fixes"</p>
              <p>• Radical Transparency</p>
              <p>• Data Sanctity</p>
              <p>• Innovation-Led Craftsmanship</p>
              <p>• Community Dedication</p>
            </div>
            <div className="flex gap-4">
              <a href="https://facebook.com/alsharq" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com/@alsharq" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/alsharq" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/alsharq" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Repair Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/iphone-repair" className="hover:text-brand-orange transition-colors">iPhone Repair</Link></li>
              <li><Link to="/samsung-repair" className="hover:text-brand-orange transition-colors">Samsung Repair</Link></li>
              <li><Link to="/laptop-repair" className="hover:text-brand-orange transition-colors">Laptop PC Repair</Link></li>
              <li><Link to="/macbook-repair" className="hover:text-brand-orange transition-colors">MacBook Service</Link></li>
              <li><Link to="/tablet-repair" className="hover:text-brand-orange transition-colors">Tablet & iPad Repair</Link></li>
              <li><Link to="/printer-repair" className="hover:text-brand-orange transition-colors">Printer Maintenance</Link></li>
              <li><Link to="/data-recovery" className="hover:text-brand-orange transition-colors">Data Recovery</Link></li>
              <li><Link to="/corporate" className="hover:text-brand-orange transition-colors">Corporate Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Shop Accessories</Link></li>
              <li><Link to="/estimate" className="hover:text-brand-orange transition-colors">Get an Estimate</Link></li>
              <li><Link to="/track-repair" className="hover:text-brand-orange transition-colors">Track Your Repair</Link></li>
              <li><Link to="/trade-in" className="hover:text-brand-orange transition-colors">Device Trade-In</Link></li>
              <li><Link to="/troubleshoot" className="hover:text-brand-orange transition-colors">Troubleshooting</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-orange transition-colors">Repair Gallery</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-orange transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0">
                  <MapPin className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <p className="font-semibold text-white">Al Sharq Mobile Phone & Computer Trading LLC</p>
                  <a 
                    href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange transition-colors block mt-1 text-sm leading-relaxed"
                  >
                    BLDG#1017 - SHOP#2 Fire Station Road<br />
                    Muwaileh - Industrial Area<br />
                    Sharjah - United Arab Emirates
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0">
                  <Phone className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500 mb-0.5">Call or WhatsApp</span>
                  <a href="tel:+971507117043" className="hover:text-brand-orange transition-colors font-medium text-white">
                    +971 50 711 7043
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0">
                  <Mail className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-0.5">Email Us</span>
                  <a href="mailto:alsharqmobile@gmail.com" className="hover:text-brand-orange transition-colors font-medium text-white">
                    alsharqmobile@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-orange/20 transition-colors shrink-0 mt-0.5">
                  <Clock className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-0.5">Business Hours</span>
                  <p className="font-medium text-white text-sm leading-relaxed">
                    Sat-Thu: 9 AM - 11 PM<br/>
                    Fri: 4 PM - 11 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 mb-8">
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Accepted Payment Methods</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium text-sm">Cash</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium text-sm">Credit / Debit Card</span>
            <span className="px-4 py-2 bg-[#EEFDF4] text-[#1D9968] border border-[#1D9968]/20 rounded-lg font-black tracking-tight text-xl">tabby</span>
            <span className="px-4 py-2 bg-[#FFF4F0] text-[#E58869] border border-[#E58869]/20 rounded-lg font-black tracking-tight text-xl">tamara</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 mb-8">
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Areas We Serve</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
            <Link to="/laptop-repair" className="hover:text-brand-orange transition-colors">Laptop Repair Muwaileh</Link>
            <span className="text-slate-700">|</span>
            <Link to="/computer-repair" className="hover:text-brand-orange transition-colors">Computer Shop near University City Sharjah</Link>
            <span className="text-slate-700">|</span>
            <Link to="/phone-repair" className="hover:text-brand-orange transition-colors">Mobile Repair Dubai / Ajman / Abu Dhabi</Link>
            <span className="text-slate-700">|</span>
            <Link to="/laptop-repair" className="hover:text-brand-orange transition-colors">Laptop Service Center Sharjah Industrial Area</Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Al Sharq Mobile Phone & Computer Trading LLC. All rights reserved.</p>
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
