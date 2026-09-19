import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ, { faqs } from '../components/FAQ';
import { getFAQPageSchema, getLocalBusinessSchema } from '../data/businessInfo';

export default function FAQPage() {
  const faqPageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessSchema(),
      {
        ...getFAQPageSchema(
          faqs.map(f => ({ question: f.question, answer: f.answer })),
          {
            pageUrl: "https://allsharq.com/faq",
            pageTitle: "Frequently Asked Questions | Al Sharq Mobile & Computer Repair Sharjah",
            description: "Find verified answers to common questions about iPhone, Samsung, MacBook, laptop repairs, turnaround times, and pricing in Sharjah."
          }
        ),
        "@context": undefined
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://allsharq.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ",
            "item": "https://allsharq.com/faq"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Phone & Laptop Repair Sharjah | Al Sharq</title>
        <meta name="description" content="Find expert answers to common questions about smartphone, MacBook, and laptop repair services, turnaround times, warranty, and pricing in Sharjah." />
        <meta name="keywords" content="phone repair FAQ Sharjah, iPhone repair questions, laptop repair Sharjah cost, screen replacement warranty, Al Sharq Mobile hours" />
        <link rel="canonical" href="https://allsharq.com/faq" />
        <meta property="og:title" content="Frequently Asked Questions | Phone & Laptop Repair Sharjah | Al Sharq" />
        <meta property="og:description" content="Find expert answers to common questions about repair turnaround times, pricing, and warranty at Al Sharq Mobile Sharjah." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allsharq.com/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(faqPageStructuredData)}
        </script>
      </Helmet>
      <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
        <FAQ />
      </div>
    </>
  );
}

