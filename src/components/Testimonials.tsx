import React from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed S.',
    title: 'The "Emergency" Fix',
    content: "I dropped my iPhone 17 Pro Max at Sharjah City Centre and the screen went black. I brought it to Al Sharq Mobile Phone and they had it fixed in 45 minutes! Fast, professional, and the new screen looks perfect.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Sarah K.',
    title: 'The "MacBook Specialist"',
    content: "My MacBook wouldn't turn on. The technicians at Al Sharq actually performed a logic board repair instead of just replacing parts. Saved me a lot of money. You can really tell they’ve been in business for over 10 years.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Omar M.',
    title: 'The "Trading & Upgrade" Experience',
    content: "Traded in my old S24 Ultra for a new S26 here. The process was so easy and they gave me a much better price than the online trade-in sites. They even helped me transfer all my data and photos for free.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Excellent Refurbished Devices',
    content: "Bought a refurbished iPhone here. It looks brand new and works perfectly. The staff was super helpful in transferring my data too.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'David Kim',
    title: 'Beyond Just Phones',
    content: "I dropped my camera lens and they fixed it! I didn't even know they did camera repairs. Amazing service.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&fm=webp'
  },
  {
    name: 'Robert Wilson',
    title: 'Honest & Transparent',
    content: "Honest advice. I thought I needed a new battery, but they just cleaned the charging port for free. Won a customer for life!",
    rating: 5,
    image: ''
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">What Our Customers Say</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Real feedback from our Sharjah community</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex text-brand-orange">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <span className="text-brand-blue dark:text-white font-bold text-xl">5.0</span>
          <span className="text-brand-grey dark:text-gray-400">(500+ Google Reviews)</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-8 w-full overflow-hidden">
        {/* Carousel Track */}
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] group">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div 
              key={idx}
              className="w-[350px] md:w-[450px] flex-none mx-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 relative text-left"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border-2 border-slate-100 dark:border-slate-600 shadow-sm text-slate-400 dark:text-slate-500">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {testimonial.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                      Verified Google Review
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium italic mb-2 line-clamp-4">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
        
        {/* Reverse Carousel Track */}
        <div className="flex w-max animate-infinite-scroll-reverse hover:[animation-play-state:paused] group mt-4">
          {[...testimonials, ...testimonials].reverse().map((testimonial, idx) => (
            <div 
              key={idx}
              className="w-[350px] md:w-[450px] flex-none mx-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 relative text-left"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border-2 border-slate-100 dark:border-slate-600 shadow-sm text-slate-400 dark:text-slate-500">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {testimonial.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                      Verified Google Review
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium italic mb-2 line-clamp-4">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <a 
          href="https://g.page/r/Cbj3mzKloR9PEBM/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-brand-blue dark:border-slate-600 text-brand-blue dark:text-white rounded-full font-semibold hover:bg-brand-blue hover:text-white dark:hover:bg-slate-700 transition-colors duration-300 shadow-sm"
        >
          <MessageSquarePlus className="h-5 w-5" />
          Leave a Review
        </a>
      </div>
    </section>
  );
}
