import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const faqs = [
  // Smartphone Repair
  {
    category: 'Smartphone Repair',
    question: 'How long does a screen replacement take at your Sharjah shop?',
    answer: 'Most standard screen repairs for iPhone and Samsung models take between 30 to 60 minutes. Since we maintain a large inventory of parts in our trading division, we can often fix your device while you wait.'
  },
  {
    category: 'Smartphone Repair',
    question: 'Will I lose my data during a screen repair?',
    answer: 'No. A screen replacement is a hardware repair and does not affect your internal storage. However, as a professional LLC operating since 2014, we always recommend a routine backup (iCloud or Google Drive) for total peace of mind.'
  },
  {
    category: 'Smartphone Repair',
    question: 'Do you use original screens or high-quality compatible parts?',
    answer: 'We offer both options to fit your budget. We stock Original Pulls/Service Packs for those who want factory quality, and Premium AAA+ Grade compatibles for a more budget-friendly fix. Every screen comes with our signature Al Sharq Warranty.'
  },
  {
    category: 'Smartphone Repair',
    question: 'What is the warranty on a new screen?',
    answer: 'All our screen repairs come with a 90-day limited warranty. This covers any manufacturing defects or touch-response issues. Please note that the warranty does not cover new physical cracks or liquid damage after the device leaves our shop.'
  },
  {
    category: 'Smartphone Repair',
    question: 'My screen is black, but the phone still vibrates. Can it be fixed?',
    answer: 'Yes! This usually means the OLED or LCD panel is broken, but the motherboard is still healthy. We can replace the display assembly and have your phone working like new again.'
  },
  {
    category: 'Smartphone Repair',
    question: 'How much does a screen replacement cost?',
    answer: 'Costs vary depending on the make and model of your device, as well as whether you choose an original or compatible part. We provide a free, no-obligation quote before starting any repair.'
  },
  {
    category: 'Smartphone Repair',
    question: 'Will my battery life improve after a replacement?',
    answer: 'Absolutely. If your phone is shutting down unexpectedly or draining quickly, a new battery will restore its original performance and longevity.'
  },
  {
    category: 'Smartphone Repair',
    question: 'What is your success rate for water damage repair?',
    answer: 'Our success rate for water damage is very high, especially if you bring the device in immediately. Do not attempt to turn it on or charge it. We use specialized ultrasonic cleaning equipment to remove corrosion.'
  },
  // Apple Watch Repairs
  {
    category: 'Apple Watch Repairs',
    question: 'Can you fix a cracked Apple Watch screen?',
    answer: 'Yes, we specialize in Apple Watch screen replacements. We use precision tools to safely remove the broken glass and install a new OLED display, ensuring touch sensitivity and Force Touch features work perfectly.'
  },
  {
    category: 'Apple Watch Repairs',
    question: 'Will my Apple Watch still be waterproof after repair?',
    answer: 'We perform a Water Seal Restoration and use a Pressure Test Chamber after every repair to guarantee your watch remains swim-proof up to 50 meters, just like from the factory.'
  },
  {
    category: 'Apple Watch Repairs',
    question: 'How long does an Apple Watch battery replacement take?',
    answer: 'Apple Watch battery replacements typically take 1-2 hours. We also perform Cell-Level battery calibration to ensure your watchOS correctly reads the new battery health.'
  },
  // Computer Repair
  {
    category: 'Computer Repair',
    question: 'My laptop is running very slow, what can I do?',
    answer: 'We suggest checking for background processes, running virus scans, and considering an SSD upgrade to dramatically improve performance.'
  },
  {
    category: 'Computer Repair',
    question: 'How much does data recovery cost?',
    answer: 'Data recovery costs depend on the severity of the drive failure. We offer a free diagnostic to determine if recovery is possible and provide a firm quote. If we cannot recover your data, you pay nothing.'
  },
  {
    category: 'Computer Repair',
    question: 'Can you recover data from a dead MacBook?',
    answer: 'Yes, our specialized technicians perform logic board micro-soldering to recover data from completely dead MacBooks. We can often retrieve your files even if the device has suffered severe liquid damage or power surges.'
  },
  {
    category: 'Computer Repair',
    question: 'What is the hardware upgrade process for laptops and PCs?',
    answer: 'Bring your device in for a consultation. We will recommend the best RAM or SSD upgrades for your specific needs, provide a quote, and typically complete the upgrade within 24-48 hours.'
  },
  {
    category: 'Computer Repair',
    question: 'Do you charge a diagnostic fee?',
    answer: 'We offer free basic diagnostics. If a complex teardown or advanced motherboard diagnosis is required, there may be a small fee, which is always applied toward the cost of the repair if you proceed.'
  },
  // Device Sales
  {
    category: 'Device Sales',
    question: 'What is the warranty on refurbished items?',
    answer: 'All our certified pre-owned and refurbished devices undergo a rigorous 30-point inspection and come with a standard 90-day warranty for your peace of mind.'
  },
  {
    category: 'Device Sales',
    question: 'What is your return policy for purchased devices?',
    answer: 'We offer a 7-day return policy for defective devices. The item must be returned in its original condition with all accessories and packaging.'
  },
  // General Business Info
  {
    category: 'General Business Info',
    question: 'What are your opening hours?',
    answer: 'We are open Saturday through Thursday from 9:00 AM to 10:00 PM. We are closed on Fridays.'
  },
  {
    category: 'General Business Info',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, all major credit and debit cards (Visa, MasterCard), and contactless payments including Apple Pay and Google Pay.'
  },
  // Online Shopping & Buying Guide
  {
    category: 'Online Shopping',
    question: 'Is it safe to buy smartphones online from Al Sharq Mobile?',
    answer: 'Absolutely. We use highly secure payment gateways and every device you purchase online comes with a 100% authenticity guarantee and is backed by our in-store 90-day warranty.'
  },
  {
    category: 'Online Shopping',
    question: 'Do you offer delivery for accessories and pre-owned phones?',
    answer: 'Yes! We deliver mobile phones, screen protectors, AirPods, and gaming accessories directly to your door across Sharjah and the UAE. Browse our online shop to place an order.'
  },
  // Safety Warning & Urgent Care
  {
    category: 'Urgent Care & Safety',
    question: 'My phone screen is popping up / battery is swelling. What should I do?',
    answer: 'Bring it in immediately. A swollen battery is a severe safety hazard and can cause a fire if punctured. Do not charge the phone and do not attempt to squeeze the screen back down.'
  },
  {
    category: 'Urgent Care & Safety',
    question: 'Do you offer same-day emergency repairs?',
    answer: 'Yes, for most urgent issues like water damage, dead logical boards, or aggressively cracked screens, we perform same-day diagnostic replacements. Visit our Sharjah lab immediately if you experience liquid damage.'
  },
  // Gaming & PC Performance
  {
    category: 'Gaming & PC',
    question: 'My gaming laptop is overheating and dropping FPS. Can you fix this?',
    answer: 'Yes. Gaming laptops require specialized thermal management. We safely dismantle the system, clean the clogged fans, and apply high-grade liquid metal or thermal paste to cool the GPU and CPU and restore maximum performance.'
  },
  {
    category: 'Gaming & PC',
    question: 'How can I speed up my slow computer?',
    answer: 'The most effective method to boost a slow Windows PC or older MacBook is upgrading the mechanical Hard Drive (HDD) to a Solid State Drive (SSD) and increasing the RAM. This can make your computer up to 10x faster.'
  }
];

export default function FAQ() {
  const location = useLocation();
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqs[0].question);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (location.hash === '#apple-watch-repairs') {
      setActiveCategory('Apple Watch Repairs');
      const firstAppleWatchFaq = faqs.find(f => f.category === 'Apple Watch Repairs');
      if (firstAppleWatchFaq) {
        setActiveQuestion(firstAppleWatchFaq.question);
      }
      // Scroll to the FAQ section
      const element = document.getElementById('faq-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq-section" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-orange font-semibold tracking-wide uppercase text-sm mb-2">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-8">Frequently Asked Questions</h3>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveQuestion(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.question} 
              className="border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-orange/30 dark:hover:border-brand-orange/30"
            >
              <button
                onClick={() => setActiveQuestion(activeQuestion === faq.question ? null : faq.question)}
                className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="font-bold text-lg text-brand-blue dark:text-white pr-4">{faq.question}</span>
                {activeQuestion === faq.question ? (
                  <Minus className="h-5 w-5 text-brand-orange shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-brand-grey dark:text-gray-400 shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {activeQuestion === faq.question && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-brand-grey dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-4 bg-white dark:bg-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
