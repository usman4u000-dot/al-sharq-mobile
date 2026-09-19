import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getFAQPageSchema } from '../data/businessInfo';

export default function FAQSection() {
  const faqs = [
    {
      question: "Where can I find reliable iPhone repair in Sharjah for the new iPhone 18 and 17?",
      answer: "Al Sharq Mobile is your premier destination for iPhone repair in Sharjah. Our technicians are certified to handle the latest models, including the iPhone 18, 17, and 16 series. Whether you need a camera lens fix, battery swap, or motherboard repair, we use precision tools to ensure factory quality standards."
    },
    {
      question: "What is the cost of mobile screen replacement in Sharjah?",
      answer: "The cost of mobile screen replacement Sharjah varies depending on the model. For budget-friendly devices, prices start as low as AED 150, while flagship OLED screens for Samsung or iPhone are priced competitively based on current market rates. Visit us in Muwaileh for a free quote and a 1-hour \"Express Fix.\""
    },
    {
      question: "Which is the best mobile service center Sharjah for liquid damage?",
      answer: "Al Sharq is widely considered the best mobile service center Sharjah for complex liquid damage and micro-soldering. We use ultrasonic cleaning technology to remove corrosion from motherboards, saving devices that other shops often declare \"unfixable.\""
    },
    {
      question: "Where is the best place to buy cheap mobiles in Sharjah with a warranty?",
      answer: "If you are looking for the best place to buy cheap mobiles in Sharjah, look no further than Al Sharq. We offer \"Al Sharq Certified\" pre-owned devices that undergo a 50-point inspection. You get the latest smartphones Sharjah residents love at a fraction of the original price, complete with a shop warranty."
    },
    {
      question: "Can I get a fast mobile repair Sharjah service for my Samsung Galaxy?",
      answer: "Yes! We specialize in fast mobile repair Sharjah, with most Samsung battery and screen issues resolved in under 45 minutes. As a leading Samsung mobile showroom Sharjah partner for accessories and parts, we ensure your Galaxy device is handled with genuine components."
    },
    {
      question: "Does your smartphone shop Sharjah offer doorstep delivery?",
      answer: "Our smartphone shop Sharjah offers both in-store pickup and mobile online shopping Sharjah options. You can buy mobile online Sharjah through our WhatsApp or web portal and receive same-day delivery across Muwaileh and University City."
    },
    {
      question: "Where can I find high-quality mobile phone accessories Sharjah?",
      answer: "We stock the largest variety of mobile phone accessories Sharjah has to offer. From original 2026 fast chargers and Magsafe cases to privacy screen protectors, our mobile phone shop in Sharjah ensures your device is both stylish and protected."
    },
    {
      question: "Can you recover data from a dead MacBook?",
      answer: "Yes, our specialized technicians perform logic board micro-soldering to recover data from completely dead MacBooks. We can often retrieve your files even if the device has suffered severe liquid damage or power surges."
    },
    {
      question: "Why is Al Sharq considered the best mobile shop Sharjah?",
      answer: "Since 2014, we have built a reputation as the best mobile shop Sharjah by combining expert technical knowledge with honest pricing. Our location as a mobile store near me Sharjah in the Muwaileh area makes us the go-to hub for students and local businesses."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    ...getFAQPageSchema(faqs, {
      pageUrl: "https://allsharq.com/",
      pageTitle: "Frequently Asked Questions - Al Sharq Mobile Phone & Computer Trading LLC Sharjah",
      description: "Frequently asked questions about mobile repair, screen replacement, liquid damage recovery, and tech services in Sharjah."
    })
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
              FAQs (2026 Edition)
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Frequently asked questions about our services, repairs, and products in Sharjah.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900"
            >
              <button
                id={`faq-button-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-2xl"
              >
                <span className="font-bold text-lg text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue/10 dark:bg-slate-800 flex items-center justify-center text-brand-blue dark:text-blue-400">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
