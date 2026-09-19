export const BUSINESS_INFO = {
  legalName: "Al Sharq Mobile Phone & Computer Trading LLC",
  name: "Al Sharq Mobile Phone & Computer Trading LLC",
  shortName: "Al Sharq Mobile Phone",
  alternateNames: [
    "Al Sharq Mobile",
    "Al Sharq Phone & Computer Repair",
    "Techfix & Gadgets Sharjah"
  ],
  url: "https://allsharq.com",
  logo: "https://allsharq.com/logo.png",
  image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=1200&h=630",
  telephone: "+971507117043",
  displayPhone: "+971 50 711 7043",
  landline: "+97165392120",
  displayLandline: "+971 6 539 2120",
  whatsapp: "+971507117043",
  whatsappUrl: "https://wa.me/971507117043",
  email: "alsharqmobile@gmail.com",
  googleMapsUrl: "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8",
  address: {
    streetAddress: "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
    addressLocality: "Muwaileh, Sharjah",
    addressRegion: "Sharjah",
    postalCode: "00000",
    addressCountry: "AE",
    fullAddress: "BLDG#1017 - SHOP#2 Fire Station Road - Muwaileh - Industrial Area - Sharjah - United Arab Emirates"
  },
  geo: {
    latitude: 25.3123,
    longitude: 55.4800
  },
  openingHours: [
    {
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "23:00",
      display: "Saturday – Thursday: 9:00 AM – 11:00 PM"
    },
    {
      dayOfWeek: ["Friday"],
      opens: "16:00",
      closes: "23:00",
      display: "Friday: 4:00 PM – 11:00 PM"
    }
  ],
  priceRange: "$$",
  currenciesAccepted: "AED",
  paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Samsung Pay"
};

/**
 * Standard Schema.org Provider object for Service and Product schemas
 */
export const BUSINESS_PROVIDER_SCHEMA = {
  "@type": ["LocalBusiness", "MobilePhoneStore", "ComputerStore", "RepairService"],
  "name": BUSINESS_INFO.name,
  "legalName": BUSINESS_INFO.legalName,
  "alternateName": BUSINESS_INFO.alternateNames,
  "telephone": BUSINESS_INFO.telephone,
  "email": BUSINESS_INFO.email,
  "hasMap": BUSINESS_INFO.googleMapsUrl,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS_INFO.address.streetAddress,
    "addressLocality": BUSINESS_INFO.address.addressLocality,
    "addressRegion": BUSINESS_INFO.address.addressRegion,
    "postalCode": BUSINESS_INFO.address.postalCode,
    "addressCountry": BUSINESS_INFO.address.addressCountry
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": BUSINESS_INFO.geo.latitude,
    "longitude": BUSINESS_INFO.geo.longitude
  }
};

/**
 * Standard Schema.org LocalBusiness structured data matching Google Business Profile
 */
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MobilePhoneStore", "ComputerStore", "RepairService"],
  "@id": "https://allsharq.com/#localbusiness",
  "name": BUSINESS_INFO.name,
  "legalName": BUSINESS_INFO.legalName,
  "alternateName": BUSINESS_INFO.alternateNames,
  "url": BUSINESS_INFO.url,
  "telephone": BUSINESS_INFO.telephone,
  "email": BUSINESS_INFO.email,
  "hasMap": BUSINESS_INFO.googleMapsUrl,
  "priceRange": BUSINESS_INFO.priceRange,
  "currenciesAccepted": BUSINESS_INFO.currenciesAccepted,
  "paymentAccepted": BUSINESS_INFO.paymentAccepted,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS_INFO.address.streetAddress,
    "addressLocality": BUSINESS_INFO.address.addressLocality,
    "addressRegion": BUSINESS_INFO.address.addressRegion,
    "postalCode": BUSINESS_INFO.address.postalCode,
    "addressCountry": BUSINESS_INFO.address.addressCountry
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": BUSINESS_INFO.geo.latitude,
    "longitude": BUSINESS_INFO.geo.longitude
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": BUSINESS_INFO.telephone,
      "contactType": "customer service",
      "areaServed": "AE",
      "availableLanguage": ["English", "Arabic", "Urdu", "Hindi"]
    },
    {
      "@type": "ContactPoint",
      "telephone": BUSINESS_INFO.landline,
      "contactType": "sales",
      "areaServed": "AE",
      "availableLanguage": ["English", "Arabic", "Urdu", "Hindi"]
    }
  ],
  "openingHoursSpecification": BUSINESS_INFO.openingHours.map(slot => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": slot.dayOfWeek,
    "opens": slot.opens,
    "closes": slot.closes
  })),
  "areaServed": [
    {
      "@type": "City",
      "name": "Muwaileh, Sharjah"
    },
    {
      "@type": "City",
      "name": "Sharjah"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    }
  ]
});

export interface FAQItemSchema {
  question: string;
  answer: string;
}

/**
 * Top common repair questions across Sharjah customers
 */
export const COMMON_REPAIR_FAQS: FAQItemSchema[] = [
  {
    question: "Where is Al Sharq Mobile located in Sharjah?",
    answer: "Al Sharq Mobile Phone & Computer Trading LLC is conveniently located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area, Sharjah, United Arab Emirates (near University City and the Muwaileh Civil Defence station)."
  },
  {
    question: "How long does a mobile phone or iPhone screen replacement take?",
    answer: "Most screen replacements for iPhone (including iPhone 18, 17, and 16) and Samsung Galaxy devices take between 30 to 60 minutes. We carry a comprehensive on-site inventory of original service packs and AAA+ premium displays."
  },
  {
    question: "Will I lose my personal data during a phone or laptop repair?",
    answer: "No. Standard hardware repairs like screen, battery, camera, or charging port replacements do not erase your internal storage or data. However, routine backups to iCloud or Google Drive are always recommended."
  },
  {
    question: "Can you fix liquid damaged phones or dead MacBook logic boards?",
    answer: "Yes, our certified micro-soldering technicians specialize in ultrasonic cleaning, short-circuit diagnostics, and component-level chip replacement (power IC, audio IC, charging IC) for liquid damaged iPhones, Android flagships, and MacBooks."
  },
  {
    question: "Do you offer a warranty on repairs and replacement parts?",
    answer: "Yes, all screen replacements, battery installations, and hardware repairs at Al Sharq Mobile are backed by our signature 90-day warranty against manufacturer defects and touch responsiveness issues."
  },
  {
    question: "What are your business operating hours in Sharjah?",
    answer: "We are open Saturday through Thursday from 9:00 AM to 11:00 PM, and on Friday from 4:00 PM to 11:00 PM."
  },
  {
    question: "What payment methods are accepted at Al Sharq Mobile?",
    answer: "We accept Cash, Credit Cards, Debit Cards (Visa, MasterCard), Apple Pay, and Samsung Pay."
  },
  {
    question: "Do you provide free diagnostics for smartphone and computer issues?",
    answer: "Yes, we offer free basic hardware diagnostics and transparent price estimates before any repair work commences."
  },
  {
    question: "Can you recover data from a dead computer or corrupted storage drive?",
    answer: "Yes, we perform advanced forensic data recovery from crashed SSDs, mechanical hard drives, water-damaged logic boards, and non-booting mobile phones."
  }
];

/**
 * Generate Schema.org FAQPage structured data linked directly to the LocalBusiness schema
 */
export const getFAQPageSchema = (
  faqs: FAQItemSchema[],
  options?: {
    pageUrl?: string;
    pageTitle?: string;
    description?: string;
  }
) => ({
  "@type": "FAQPage",
  ...(options?.pageUrl ? { "@id": `${options.pageUrl}#faq` } : { "@id": "https://allsharq.com/faq#faq" }),
  "name": options?.pageTitle || "Frequently Asked Questions - Al Sharq Mobile & Computer Repair",
  "description": options?.description || "Expert answers to common questions about smartphone, laptop, screen, and battery repairs at Al Sharq Mobile in Sharjah.",
  "url": options?.pageUrl || "https://allsharq.com/faq",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://allsharq.com/#website",
    "name": "Al Sharq Mobile Phone & Computer Trading LLC",
    "url": "https://allsharq.com"
  },
  "about": {
    "@id": "https://allsharq.com/#localbusiness"
  },
  "publisher": {
    "@type": ["LocalBusiness", "MobilePhoneStore", "ComputerStore", "RepairService"],
    "@id": "https://allsharq.com/#localbusiness",
    "name": BUSINESS_INFO.name,
    "telephone": BUSINESS_INFO.telephone,
    "url": BUSINESS_INFO.url
  },
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

