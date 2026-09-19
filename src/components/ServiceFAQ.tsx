import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { getFAQPageSchema } from '../data/businessInfo';

export interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  faqs: FAQItem[];
  pageUrl?: string;
}

export default function ServiceFAQ({ title = "Frequently Asked Questions", faqs, pageUrl }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    ...getFAQPageSchema(faqs, {
      pageUrl: pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://allsharq.com/'),
      pageTitle: title,
      description: `Frequently asked questions regarding ${title.toLowerCase()} at Al Sharq Mobile in Sharjah.`
    })
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-brand-blue dark:text-white mb-10">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <div className="flex-shrink-0 text-brand-orange">
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
