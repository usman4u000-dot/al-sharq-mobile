import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Plus, X } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <div className={`flex flex-col items-end gap-3 mb-4 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 group">
          <span className="bg-white dark:bg-slate-800 text-sm font-medium py-1.5 px-3 rounded-lg shadow-lg text-slate-800 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Us
          </span>
          <a
            href="https://wa.me/971507117043?text=Hello%20Al%20Sharq%20LLC,%20I%20would%20like%20to%20book%20a%20repair."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
        
        <div className="flex items-center gap-3 group">
          <span className="bg-white dark:bg-slate-800 text-sm font-medium py-1.5 px-3 rounded-lg shadow-lg text-slate-800 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call +971 50 711 7043
          </span>
          <a
            href="tel:+971507117043"
            className="flex items-center justify-center bg-brand-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            aria-label="Call Now"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center gap-3 group">
          <span className="bg-white dark:bg-slate-800 text-sm font-medium py-1.5 px-3 rounded-lg shadow-lg text-slate-800 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Visit Shop
          </span>
          <a
            href="https://maps.app.goo.gl/av8StphkLwrKdLdZA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Visit Shop"
          >
            <MapPin className="w-5 h-5" />
          </a>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-blue text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contact Options"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
        ) : (
          <Plus className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
