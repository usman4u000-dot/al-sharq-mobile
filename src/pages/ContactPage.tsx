import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/ContactSection';
import { getLocalBusinessSchema } from '../data/businessInfo';

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessSchema(),
      {
        "@type": "ContactPage",
        "@id": "https://allsharq.com/contact#webpage",
        "url": "https://allsharq.com/contact",
        "name": "Contact Al Sharq Mobile Phone & Computer Trading LLC",
        "description": "Contact Sharjah's top-rated mobile and computer repair service. Phone, WhatsApp, location and business hours.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://allsharq.com/#website",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC",
          "url": "https://allsharq.com"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Mobile Shop Near Me Sharjah | Al Sharq Mobile</title>
        <meta name="description" content="Looking for a mobile shop near me in Sharjah? Contact Al Sharq Mobile Phone for expert phone repair near me, screen replacements, and battery fixes." />
        <link rel="canonical" href="https://allsharq.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>
      <ContactSection />
    </>
  );
}
