import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Al Sharq</title>
        <meta name="description" content="Find answers to common questions about our repair services, turnaround times, and pricing in Sharjah." />
        <link rel="canonical" href="https://allsharq.com/faq" />
      </Helmet>
      <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
        <FAQ />
      </div>
    </>
  );
}
