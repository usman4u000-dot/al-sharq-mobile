import React, { useState } from "react";

const brandsData = [
  { name: "Samsung", slug: "samsung" },
  { name: "Apple", slug: "apple" },
  { name: "Huawei", slug: "huawei" },
  { name: "Nokia", slug: "nokia" },
  { name: "Sony", slug: "sony" },
  { name: "LG", slug: "lg" },
  { name: "HTC", slug: "htc" },
  { name: "Motorola", slug: "motorola" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Google", slug: "google" },
  { name: "Honor", slug: "honor" },
  { name: "Oppo", slug: "oppo" },
  { name: "Realme", slug: "realme" },
  { name: "OnePlus", slug: "oneplus" },
  { name: "Nothing", slug: "nothing" },
  { name: "vivo", slug: "vivo" },
  { name: "Meizu", slug: "" },
  { name: "Ulefone", slug: "" },
  { name: "Alcatel", slug: "alcatel" },
  { name: "ZTE", slug: "zte" },
  { name: "RugOne", slug: "" },
  { name: "Umidigi", slug: "" },
  { name: "Coolpad", slug: "" },
  { name: "Oscal", slug: "" },
  { name: "Sharp", slug: "sharp" },
  { name: "Micromax", slug: "" },
  { name: "Infinix", slug: "" },
  { name: "Asus", slug: "asus" },
  { name: "Tecno", slug: "" },
  { name: "Doogee", slug: "" },
  { name: "Blackview", slug: "" },
  { name: "Cubot", slug: "" },
  { name: "Oukitel", slug: "" },
  { name: "Itel", slug: "" },
  { name: "TCL", slug: "tcl" }
];

export default function SupportedBrands() {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-20">
        <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
          Supported Brands
        </h3>
      </div>

      <div className="flex w-[200%] gap-6 sm:gap-8 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Double the brands array for seamless loop */}
        {[...brandsData, ...brandsData].map((brand, i) => (
          <div 
            key={`${brand.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:-translate-y-1 transition-transform cursor-default gap-3"
          >
            {brand.slug && (
              <img 
                src={`https://cdn.simpleicons.org/${brand.slug}/64748b`} 
                alt={`${brand.name} logo`} 
                className="w-6 h-6 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <span className="font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap text-lg text-center" style={{ fontFamily: 'var(--font-heading, "Inter", sans-serif)' }}>
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
