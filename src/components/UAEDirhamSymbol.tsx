import React from 'react';

interface UAEDirhamSymbolProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Official UAE Dirham (AED) Currency Symbol Icon
 * Distinctive official ligature representing the UAE Dirham (د.إ / DH with currency cross-strokes)
 */
export default function UAEDirhamSymbol({ 
  className = "inline-block text-current", 
  size = 18,
  showText = false
}: UAEDirhamSymbolProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold ${className}`} title="UAE Dirham (AED)">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 inline-block align-middle"
      >
        {/* Stylized UAE Dirham Emblem with double horizontal currency strikes */}
        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
        <path
          d="M8 7H14.5C16.433 7 18 8.567 18 10.5C18 12.433 16.433 14 14.5 14H8V7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10.5H18.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6 13.5H16.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 14V17.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {showText && <span className="font-mono text-[0.85em] uppercase">AED</span>}
    </span>
  );
}
