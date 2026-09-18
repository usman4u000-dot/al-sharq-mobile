import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Mobile Shop Near Me Sharjah | Al Sharq Mobile</title>
        <meta name="description" content="Looking for a mobile shop near me in Sharjah? Contact Al Sharq Mobile Phone for expert phone repair near me, screen replacements, and battery fixes." />
        <meta name="keywords" content="mobile shop near me in Sharjah, phone repair near me, best mobile repair shop in Sharjah near me, mobile repairing center near me, phone fixing near me Sharjah, cheap mobile repair near me, mobile screen repair near me, phone battery replacement near me Sharjah, contact Al Sharq Mobile" />
        <link rel="canonical" href="https://allsharq.com/contact" />
      </Helmet>
      <ContactSection />
    </>
  );
}
