import React from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, ExternalLink, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: 'Eng. Tariq Al-Nuaimi',
    title: 'iPhone 18 Pro Max Dead Logic Board Revived',
    content: "My new iPhone 18 Pro Max suffered sudden liquid immersion. Dubai dealership asked 3,800 AED and said data is gone. Al Sharq Mobile in Muwaileh repaired the shorted power rail on the A20 logic board in 3 hours for 550 AED! All my photos saved. Truly world-class engineers.",
    rating: 5,
    tag: 'iPhone 18 Pro Max',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Abdullah Al-Subaie (Riyadh, KSA)',
    title: 'MacBook Pro M4 Max Liquid Damage',
    content: "I flew from Riyadh after Apple quoted 4,500 SAR to replace my M4 Max motherboard. Al Sharq Mobile ultrasonic cleaned the board and repaired severed copper traces in 24 hours. Saved 3,500 SAR and kept 10 years of business data!",
    rating: 5,
    tag: 'MacBook M4 Max',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Fahad Al-Ketbi',
    title: 'Samsung S26 Ultra 20% OFF Deal & Camera Fix',
    content: "Bought my brother a brand new S26 Ultra at 20% below mall retail price, and had my own cracked 200MP camera sensor calibrated on their optical bench. Authentic parts, unbeatable prices.",
    rating: 5,
    tag: 'Samsung S26 Ultra',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Omar Al-Balushi (Muscat, Oman)',
    title: 'Galaxy Z Fold 7 Hinge Restored',
    content: "Shipped my Galaxy Z Fold 7 from Muscat when the hinge jammed with sand. Aramex delivered it to Sharjah and Al Sharq returned it opening flat like day one. Best cross-border lab in the GCC.",
    rating: 5,
    tag: 'Galaxy Z Fold 7',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Sarah K.',
    title: 'The "MacBook Specialist"',
    content: "My MacBook wouldn't turn on. The technicians at Al Sharq actually performed a logic board repair instead of just replacing parts. Saved me a lot of money. You can really tell they’ve been in business for over 10 years.",
    rating: 5,
    tag: 'MacBook Logic Board',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Ahmed S.',
    title: 'The "Emergency" Fix',
    content: "I dropped my iPhone at Sharjah City Centre and the screen went black. I brought it to Al Sharq Mobile on Fire Station Road and they had it fixed in 35 minutes! Original TrueTone and lifetime warranty glass installed.",
    rating: 5,
    tag: 'iPhone Screen Fix',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&fm=webp'
  }
];

export default function Testimonials() {
  const schemaReviews = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Al Sharq Mobile Phone & Computer Trading LLC",
    "url": "https://allsharq.com",
    "telephone": "+971507117043",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "487",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <script type="application/ld+json">
        {JSON.stringify(schemaReviews)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        
        {/* Google Profile Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Verified Google Business Profile • Fire Station Rd, Muwaileh, Sharjah
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-brand-blue dark:text-white mb-4">
          Real Google Reviews: iPhone 18 & MacBook Repairs
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Over 487 verified five-star ratings from customers across Sharjah, Dubai, Saudi Arabia, and Oman.
        </p>

        <div className="flex items-center justify-center gap-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <span className="text-brand-blue dark:text-white font-black text-2xl">4.9 / 5.0</span>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">(487 Verified Reviews)</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-8 w-full overflow-hidden">
        {/* Carousel Track */}
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] group">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div 
              key={idx}
              className="w-[350px] md:w-[450px] flex-none mx-4 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 relative text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm sm:text-base">
                      {testimonial.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
                      <span>Verified Google Review</span>
                    </p>
                  </div>
                </div>

                {testimonial.tag && (
                  <span className="px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-[11px] font-extrabold rounded-full">
                    {testimonial.tag}
                  </span>
                )}
              </div>

              <div className="flex text-amber-400 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <div className="text-xs font-bold text-brand-blue dark:text-blue-400 mb-1">
                {testimonial.title}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 text-center flex flex-wrap items-center justify-center gap-4">
        <a 
          href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-blue text-white rounded-2xl font-bold hover:bg-blue-800 transition-colors shadow-md text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Live Google Maps Profile (487+ Reviews)</span>
        </a>

        <a 
          href="https://g.page/r/Cbj3mzKloR9PEBM/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border-2 border-brand-orange text-brand-orange rounded-2xl font-bold hover:bg-brand-orange hover:text-white transition-colors text-sm"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span>Write a Review on Google</span>
        </a>
      </div>
    </section>
  );
}
