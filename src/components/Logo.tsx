import React from 'react';

interface LogoProps {
  className?: string;
  showSubtext?: boolean;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "", showSubtext = true, variant = 'light' }: LogoProps) {
  // Colors
  const isDark = variant === 'dark';
  const primaryTextColor = isDark ? 'text-white' : 'text-black';
  const subtextColor = isDark ? 'text-gray-300' : 'text-gray-900';
  
  // SVG Colors
  const phoneColor = isDark ? '#333333' : '#1A1A1A';
  const screenColor = isDark ? '#1A1A1A' : '#FFFFFF';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Text Container */}
      <div className="flex flex-col justify-center text-left">
        <div 
          className={`text-lg sm:text-xl md:text-[1.5rem] font-sans font-extrabold tracking-tight leading-none ${primaryTextColor}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          Al Sharq <span className="text-brand-orange">Mobile</span>
        </div>
        {showSubtext && (
          <div 
            className={`text-[0.55rem] sm:text-[0.65rem] md:text-[0.75rem] font-sans font-semibold tracking-wider mt-1 sm:mt-1.5 ${subtextColor} uppercase`}
            style={{ whiteSpace: 'nowrap' }}
          >
            By Al Sharq Mobile Phone L.L.C
          </div>
        )}
      </div>

      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl transform rotate-3 opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl transform -rotate-3 opacity-10 dark:opacity-30"></div>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'text-white' : 'text-brand-blue'}`}>
          <path d="M18 10L21 7L17 3L14 6M18 10L14 6M18 10C18 10 16.5 11.5 14 11.5C11.5 11.5 10 10 10 10M14 6C14 6 12.5 4.5 12.5 2C12.5 -0.5 14 -3 14 -3M10 10L3 17C2.5 17.5 2.5 18.5 3 19L5 21C5.5 21.5 6.5 21.5 7 21L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 14C14 14 15.5 15.5 15.5 18C15.5 20.5 14 23 14 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 10C10 10 8.5 8.5 6 8.5C3.5 8.5 2 10 2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
