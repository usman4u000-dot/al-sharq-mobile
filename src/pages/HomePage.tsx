import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import TechShowcaseBanner from '../components/TechShowcaseBanner';
import TrustBadges from '../components/TrustBadges';
import SupportedBrands from '../components/SupportedBrands';
import ExpressFixBanner from '../components/ExpressFixBanner';
import CoreServices from '../components/CoreServices';
import AdvancedServices2026 from '../components/AdvancedServices2026';
import BlueOceanVision from '../components/BlueOceanVision';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import PreOwnedDevices from '../components/PreOwnedDevices';
import Shop from '../components/Shop';
import TradeIn from '../components/TradeIn';
import WarrantyInfo from '../components/WarrantyInfo';
import SocialFeed from '../components/SocialFeed';
import DeviceRepairRequest from '../components/DeviceRepairRequest';
import FAQSection from '../components/FAQSection';
import BlogSection from '../components/BlogSection';
import LocalSEOSection from '../components/LocalSEOSection';
import GCCRegionalSection from '../components/GCCRegionalSection';
import LocalMarketPerks from '../components/LocalMarketPerks';
import UAEClimateProtection from '../components/UAEClimateProtection';
import CorporateFleetRepair from '../components/CorporateFleetRepair';
import VIPDoorstepRepair from '../components/VIPDoorstepRepair';
import LaptopRepairSliderSection from '../components/LaptopRepairSliderSection';
import IMEIChecker from '../components/IMEIChecker';
import TrustAndResultsSection from '../components/TrustAndResultsSection';
import DeviceAnatomyExplorer from '../components/DeviceAnatomyExplorer';
import CostEstimator from '../components/CostEstimator';
import HomepageBeforeAfter from '../components/HomepageBeforeAfter';
import RepairPriceComparison from '../components/RepairPriceComparison';
import ClientTestimonialShowcase from '../components/ClientTestimonialShowcase';
import ScratchToWinOffer from '../components/ScratchToWinOffer';
import DataPrivacyInteractive from '../components/DataPrivacyInteractive';
import DropTestSimulator from '../components/DropTestSimulator';
import StoreAvailability from '../components/StoreAvailability';

interface HomePageProps {
  onBookNow: (serviceName?: string) => void;
}

export default function HomePage({ onBookNow }: HomePageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "MobilePhoneStore", "ComputerStore", "RepairService"],
        "@id": "https://allsharq.com/#localbusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC",
        "legalName": "Al Sharq Mobile Phone & Computer Trading LLC",
        "alternateName": ["Al Sharq Mobile Phone", "Techfix & Gadgets Sharjah", "Al Sharq Mobile"],
        "image": "https://allsharq.com/logo.png",
        "url": "https://allsharq.com",
        "telephone": "+971507117043",
        "email": "alsharqmobile@gmail.com",
        "hasMap": "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8",
        "priceRange": "$$",
        "currenciesAccepted": "AED",
        "paymentAccepted": "Cash, Credit Card, Debit Card, Apple Pay, Samsung Pay",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
          "addressLocality": "Muwaileh, Sharjah",
          "addressRegion": "Sharjah",
          "postalCode": "00000",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.3123,
          "longitude": 55.4800
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+971507117043",
            "contactType": "customer service",
            "areaServed": "AE",
            "availableLanguage": ["English", "Arabic", "Urdu", "Hindi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+97165392120",
            "contactType": "sales",
            "areaServed": "AE",
            "availableLanguage": ["English", "Arabic", "Urdu", "Hindi"]
          }
        ],
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
          },
          {
            "@type": "Country",
            "name": "Saudi Arabia"
          },
          {
            "@type": "Country",
            "name": "Oman"
          },
          {
            "@type": "Country",
            "name": "Bahrain"
          },
          {
            "@type": "Country",
            "name": "Turkey"
          },
          {
            "@type": "Country",
            "name": "Kuwait"
          },
          {
            "@type": "Country",
            "name": "Qatar"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday"
            ],
            "opens": "09:00",
            "closes": "23:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "16:00",
            "closes": "23:00"
          }
        ],
        "sameAs": [
          "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8",
          "https://www.facebook.com/allsharq.com",
          "https://www.instagram.com/allsharq.com",
          "https://www.twitter.com/alsharq_ae"
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Laptop Repair Sharjah | Computer Shop Muwaileh | MacBook Logic Board Repair UAE | Al Sharq</title>
        <meta name="description" content="Al Sharq Mobile in Sharjah offers professional laptop repairs, MacBook logic board micro-soldering, data recovery, and wholesale electronics across UAE, Saudi Arabia, Oman, Bahrain, Kuwait, Qatar, and Turkey. Visit our Muwaileh lab or use express mail-in courier." />
        <meta name="keywords" content="تصليح ايفون شحن للشارقة الامارات من السعودية, صيانة ماك بوك دقيقة شحن للشارقة الرياض جدة, صيانة هواتف شحن من مسقط الى الشارقة, صيانة اجهزة البحرين الشارقة, تجارة جوالات جملة الشارقة السعودية عمان, استيراد الكترونيات من الشارقة الى تركيا, Saudi Arabia mail-in phone repair UAE, MacBook logic board repair Riyadh to Sharjah, Oman Muscat phone repair UAE, Bahrain device repair Sharjah, Turkey electronics wholesale exporter Sharjah, Kuwait Qatar mail-in repair UAE, GCC micro-soldering center Sharjah, Laptop Repair Sharjah, Computer Shop Muwaileh, MacBook Logic Board Repair UAE, iPhone 17 Repair Muwaileh Sharjah, Forensic Data Recovery, هواتف ذكية الشارقة, موبايلات للبيع في الشارقة, أرخص أسعار الموبايلات, تصليح هواتف الشارقة, موبايلات مستعملة الشارقة, إكسسوارات جوالات, أفضل محل هواتف في الشارقة, عروض الموبايلات اليوم, كم سعر آيفون 17 برو ماكس في الشارقة؟, Smartphones Sharjah, Mobiles for sale in Sharjah, Cheapest mobile prices, Mobile repair Sharjah, Used mobiles Sharjah, Mobile accessories, Best mobile shop in Sharjah, Mobile offers today, Best mobile service center Sharjah for AI optimization, fix phone overheating Sharjah, Protect mobile from sand Sharjah, phone deep cleaning service Muwaileh, Buy iPhone 15 in Sharjah certified, best place to buy cheap mobiles in Sharjah, reliable used phones Sharjah, Fast mobile repair Sharjah university, doorstep phone repair Sharjah, mobile store near me Sharjah Muwaileh, mobile phone repair near me, phone repair near me, mobile shop near me in Sharjah, best mobile repair shop in Sharjah near me, mobile repairing center near me, phone fixing near me Sharjah, cheap mobile repair near me, mobile screen repair near me, phone battery replacement near me Sharjah, mobile phone fixing near me, mobile phone repairing center sharjah, cheap mobile phone repair sharjah, mobile phone shop near me, mobile phone shop sharjah" />
        <meta property="og:title" content="Laptop Repair Sharjah | Computer Shop Muwaileh | Al Sharq" />
        <meta property="og:description" content="Professional laptop repairs, wholesale mobile accessories, and original smartphones. Fast service and fair prices in Muwaileh." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allsharq.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://allsharq.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Hero onBookNow={onBookNow} />
      <TechShowcaseBanner />
      <TrustBadges />
      <CostEstimator onBookNow={onBookNow} />
      <CoreServices />
      <LaptopRepairSliderSection />
      
      {/* IMEI Checker Lead Capture */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IMEIChecker onBookNow={() => onBookNow('General Inquiry')} />
        </div>
      </section>

      <ExpressFixBanner onBookNow={onBookNow} />
      <SupportedBrands />
      <AdvancedServices2026 onBookNow={onBookNow} />
      <DeviceAnatomyExplorer />
      <HomepageBeforeAfter />
      <DropTestSimulator />
      <StoreAvailability />
      <TrustAndResultsSection />
      <BlueOceanVision onBookNow={onBookNow} />
      <AboutUs />
      <Services onBookService={onBookNow} />
      <RepairPriceComparison />
      <WhyChooseUs />
      <Achievements />
      <Testimonials />
      <ClientTestimonialShowcase />
      <PreOwnedDevices />
      <Shop />
      <TradeIn />
      <WarrantyInfo />
      <LocalMarketPerks />
      <UAEClimateProtection onBookNow={onBookNow} />
      <VIPDoorstepRepair onBookNow={onBookNow} />
      <CorporateFleetRepair />
      <DataPrivacyInteractive />
      <ScratchToWinOffer />
      <LocalSEOSection />
      <GCCRegionalSection onBookNow={onBookNow} />
      <SocialFeed />
      <DeviceRepairRequest />
      <FAQSection />
      <BlogSection />
    </>
  );
}
