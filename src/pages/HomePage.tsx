import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import TechShowcaseBanner from '../components/TechShowcaseBanner';
import TrustBadges from '../components/TrustBadges';
import SupportedBrands from '../components/SupportedBrands';
import ExpressFixBanner from '../components/ExpressFixBanner';
import CoreServices from '../components/CoreServices';
import FiveCoreSpecialtyBlocks from '../components/FiveCoreSpecialtyBlocks';
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
import DeviceRepairRequest from '../components/DeviceRepairRequest';
import FAQSection from '../components/FAQSection';
import BlogSection from '../components/BlogSection';
import LocalSEOSection from '../components/LocalSEOSection';
import LocalMarketPerks from '../components/LocalMarketPerks';
import UAEClimateProtection from '../components/UAEClimateProtection';
import LaptopRepairSliderSection from '../components/LaptopRepairSliderSection';
import IMEIChecker from '../components/IMEIChecker';
import TrustAndResultsSection from '../components/TrustAndResultsSection';
import DeviceAnatomyExplorer from '../components/DeviceAnatomyExplorer';
import CostEstimator from '../components/CostEstimator';
import HomepageBeforeAfter from '../components/HomepageBeforeAfter';
import RepairPriceComparison from '../components/RepairPriceComparison';
import DropTestSimulator from '../components/DropTestSimulator';
import StoreAvailability from '../components/StoreAvailability';
import GoogleReviewsTrustBadge from '../components/GoogleReviewsTrustBadge';
import InViewSection from '../components/InViewSection';

// Lazy load below-the-fold interactive modules to improve Performance & TBT
const ClientTestimonialShowcase = lazy(() => import('../components/ClientTestimonialShowcase'));
const MallVsAlSharqSavingsCalculator = lazy(() => import('../components/MallVsAlSharqSavingsCalculator'));
const DisplayVsMotherboardDiagnostic = lazy(() => import('../components/DisplayVsMotherboardDiagnostic'));
const BatteryThermalDiagnosticTool = lazy(() => import('../components/BatteryThermalDiagnosticTool'));
const ScratchToWinOffer = lazy(() => import('../components/ScratchToWinOffer'));
const DataPrivacyInteractive = lazy(() => import('../components/DataPrivacyInteractive'));
const CorporateFleetRepair = lazy(() => import('../components/CorporateFleetRepair'));
const VIPDoorstepRepair = lazy(() => import('../components/VIPDoorstepRepair'));
const SocialFeed = lazy(() => import('../components/SocialFeed'));
const NearMeLocalSearchHub = lazy(() => import('../components/NearMeLocalSearchHub'));
const GCCRegionalSection = lazy(() => import('../components/GCCRegionalSection'));

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
        <title>Fast Laptop & Mobile Repair Sharjah | MacBook Micro-Soldering | Al Sharq</title>
        <meta name="description" content="Certified electronics repair center on Fire Station Road, Muwaileh, Sharjah. Same-day iPhone and Samsung screen replacement, MacBook logic board micro-soldering, printer service, and data recovery backed by a 90-day warranty." />
        <meta property="og:title" content="Fast Laptop & Mobile Repair Sharjah | Al Sharq Lab" />
        <meta property="og:description" content="Certified electronics repair in Muwaileh, Sharjah. iPhone, Samsung, MacBook logic board micro-soldering, and printer repairs with 90-day warranty." />
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
      <FiveCoreSpecialtyBlocks onBookNow={onBookNow} />

      <InViewSection minHeight="500px">
        <LaptopRepairSliderSection />
        {/* IMEI Checker Lead Capture */}
        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <IMEIChecker onBookNow={() => onBookNow('General Inquiry')} />
          </div>
        </section>
        <ExpressFixBanner onBookNow={onBookNow} />
        <SupportedBrands />
      </InViewSection>

      <InViewSection minHeight="500px">
        <AdvancedServices2026 onBookNow={onBookNow} />
        <DeviceAnatomyExplorer />
        <HomepageBeforeAfter />
        <DropTestSimulator />
        <StoreAvailability />
        <TrustAndResultsSection />
      </InViewSection>

      <InViewSection minHeight="500px">
        <BlueOceanVision onBookNow={onBookNow} />
        <AboutUs />
        <Services onBookService={onBookNow} />
        <RepairPriceComparison />
        <WhyChooseUs />
        <Achievements />
        <Testimonials />
        <Suspense fallback={null}>
          <ClientTestimonialShowcase />
        </Suspense>
      </InViewSection>

      <InViewSection minHeight="500px">
        <PreOwnedDevices />
        <Shop />
        {/* Interactive Display vs Logic Board Diagnostic Tool */}
        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={null}>
              <DisplayVsMotherboardDiagnostic />
            </Suspense>
          </div>
        </section>
        {/* Mall Retail vs Direct Port Wholesale Savings Calculator */}
        <section className="py-12 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={null}>
              <MallVsAlSharqSavingsCalculator onReserveProduct={(name) => onBookNow(name)} />
            </Suspense>
          </div>
        </section>
      </InViewSection>

      <InViewSection minHeight="500px">
        {/* Verified Google Reviews Trust Badge */}
        <section className="py-4 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GoogleReviewsTrustBadge />
          </div>
        </section>
        <TradeIn />
        <WarrantyInfo />
        <LocalMarketPerks />
        <UAEClimateProtection onBookNow={onBookNow} />
      </InViewSection>

      <InViewSection minHeight="500px">
        {/* UAE & GCC Battery & Thermal Heat Health Audit Tool */}
        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={null}>
              <BatteryThermalDiagnosticTool />
            </Suspense>
          </div>
        </section>
        <Suspense fallback={null}>
          <VIPDoorstepRepair onBookNow={onBookNow} />
          <CorporateFleetRepair />
          <DataPrivacyInteractive />
          <ScratchToWinOffer />
        </Suspense>
        <LocalSEOSection />
      </InViewSection>

      <InViewSection minHeight="500px">
        <Suspense fallback={null}>
          <NearMeLocalSearchHub />
          <GCCRegionalSection onBookNow={onBookNow} />
          <SocialFeed />
        </Suspense>
        <DeviceRepairRequest />
        <FAQSection />
        <BlogSection />
      </InViewSection>
    </>
  );
}
