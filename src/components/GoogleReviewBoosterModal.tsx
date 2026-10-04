import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, CheckCircle2, MessageCircle, ExternalLink, Heart, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GoogleReviewBoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoogleReviewBoosterModal({ isOpen, onClose }: GoogleReviewBoosterModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Google Business Profile direct review write link
  const googleReviewUrl = "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8";

  const handleRatingClick = (star: number) => {
    setSelectedRating(star);
    setSubmitted(true);
    // If 4 or 5 stars, redirect to Google Maps reviews after 1.2s
    if (star >= 4) {
      setTimeout(() => {
        window.open(googleReviewUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 text-center p-6 relative"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Google Logo / Brand Icon */}
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-9 h-9" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            {isAr ? 'كيف كانت تجربتك مع الشرق موبايل؟' : 'How was your experience at Al Sharq Mobile?'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
            {isAr ? 'تقييمك على خرائط جوجل يدعم الورشة المحلية في مويلح، الشارقة ويساعد الآخرين!' : 'Your feedback on Google Maps supports our local Muwaileh workshop and helps fellow tech users!'}
          </p>

          {!submitted ? (
            <div>
              {/* Star Rating Interactive Selector */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRatingClick(star)}
                    className="p-1.5 focus:outline-none transition-transform hover:scale-125"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        (hoveredStar || selectedRating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-brand-blue hover:bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isAr ? 'كتابة تقييم مباشرة على خرائط جوجل' : 'Review Directly on Google Maps'}</span>
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'شكراً جزيلاً لثقتكم بنا!' : 'Thank you for your rating!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'يتم تحويلك إلى خرائط جوجل لتأكيد التقييم وكتابة تعليقك...' : 'Opening Google Maps so you can post your review in 1 click...'}
              </p>
              <div className="pt-2">
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
                >
                  <span>{isAr ? 'اضغط هنا إذا لم يفتح الرابط تلقائياً' : 'Click here if Google Maps did not open'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-center gap-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-brand-orange" />
            <span>Fire Station Road, Muwaileh Commercial, Sharjah</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
