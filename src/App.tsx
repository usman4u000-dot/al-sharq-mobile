import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import StaffToolsModal from './components/StaffToolsModal';
import TermsModal from './components/TermsModal';
import MobileBottomNav from './components/MobileBottomNav';
import TrackRepairModal from './components/TrackRepairModal';
import StickyContactButton from './components/StickyContactButton';
import LaunchBanner from './components/LaunchBanner';
import WhatsAppWidget from './components/WhatsAppWidget';
import CookieConsent from './components/CookieConsent';
import ScrollToTopButton from './components/ScrollToTopButton';
import ExitIntentPopup from './components/ExitIntentPopup';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics, initGA } from './components/Analytics';
import PageTransition from './components/PageTransition';
import DiagnosticBot from './components/DiagnosticBot';
import RecentActivityToast from './components/RecentActivityToast';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgressBar from './components/ScrollProgressBar';
import NetworkStatus from './components/NetworkStatus';
import CustomCursor from './components/CustomCursor';
import EasterEggConsole from './components/EasterEggConsole';
import SmartBatteryBanner from './components/SmartBatteryBanner';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const IntakeFormPage = React.lazy(() => import('./pages/IntakeFormPage'));
const PhoneRepairPage = React.lazy(() => import('./pages/PhoneRepairPage'));
const IPhoneRepairPage = React.lazy(() => import('./pages/IPhoneRepairPage'));
const SamsungRepairPage = React.lazy(() => import('./pages/SamsungRepairPage'));
const AndroidFlagshipRepairPage = React.lazy(() => import('./pages/AndroidFlagshipRepairPage'));
const GamingPhoneRepairPage = React.lazy(() => import('./pages/GamingPhoneRepairPage'));
const AppleWatchRepairPage = React.lazy(() => import('./pages/AppleWatchRepairPage'));
const LiquidDamageRepairPage = React.lazy(() => import('./pages/LiquidDamageRepairPage'));
const ComputerRepairPage = React.lazy(() => import('./pages/ComputerRepairPage'));
const LaptopRepairPage = React.lazy(() => import('./pages/LaptopRepairPage'));
const MacBookRepairPage = React.lazy(() => import('./pages/MacBookRepairPage'));
const ScreenRepairPage = React.lazy(() => import('./pages/ScreenRepairPage'));
const LaptopScreenRepairPage = React.lazy(() => import('./pages/LaptopScreenRepairPage'));
const BatteryRepairPage = React.lazy(() => import('./pages/BatteryRepairPage'));
const ChargingPortRepairPage = React.lazy(() => import('./pages/ChargingPortRepairPage'));
const LogicBoardRepairPage = React.lazy(() => import('./pages/LogicBoardRepairPage'));
const PrinterRepairPage = React.lazy(() => import('./pages/PrinterRepairPage'));
const TabletRepairPage = React.lazy(() => import('./pages/TabletRepairPage'));
const DataRecoveryPage = React.lazy(() => import('./pages/DataRecoveryPage'));
const TrackRepairPage = React.lazy(() => import('./pages/TrackRepairPage'));
const WarrantyPolicyPage = React.lazy(() => import('./pages/WarrantyPolicyPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const ScreenProtectorPage = React.lazy(() => import('./pages/ScreenProtectorPage'));
const RepairEstimatePage = React.lazy(() => import('./pages/RepairEstimatePage'));
const CorporateServicesPage = React.lazy(() => import('./pages/CorporateServicesPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const TroubleshootingPage = React.lazy(() => import('./pages/TroubleshootingPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const SoftwareIssuesPage = React.lazy(() => import('./pages/SoftwareIssuesPage'));
const CameraRepairPage = React.lazy(() => import('./pages/CameraRepairPage'));
const AudioRepairPage = React.lazy(() => import('./pages/AudioRepairPage'));
const BodyRepairPage = React.lazy(() => import('./pages/BodyRepairPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const TradeInPage = React.lazy(() => import('./pages/TradeInPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Initialize Google Analytics
initGA();

function LanguagePathHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const pathname = location.pathname;
    // Check if the URL starts with /en or /ar
    if (pathname === '/en' || pathname === '/en/') {
      if (language !== 'en') setLanguage('en');
      navigate('/' + location.search + location.hash, { replace: true });
    } else if (pathname === '/ar' || pathname === '/ar/') {
      if (language !== 'ar') setLanguage('ar');
      navigate('/' + location.search + location.hash, { replace: true });
    } else if (pathname.startsWith('/en/')) {
      if (language !== 'en') setLanguage('en');
      const cleanPath = pathname.replace(/^\/en/, '');
      navigate(cleanPath + location.search + location.hash, { replace: true });
    } else if (pathname.startsWith('/ar/')) {
      if (language !== 'ar') setLanguage('ar');
      const cleanPath = pathname.replace(/^\/ar/, '');
      navigate(cleanPath + location.search + location.hash, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, language, setLanguage, navigate]);

  return null;
}

function AppRoutes() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isStaffToolsOpen, setIsStaffToolsOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTrackRepairOpen, setIsTrackRepairOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const [isBookingLoading, setIsBookingLoading] = useState(false);
  
  const location = useLocation();

  // Normalize path if prefixed by /en or /ar so routes match immediately
  const rawPath = location.pathname;
  const strippedPath = rawPath.replace(/^\/(en|ar)(\/|$)/, '/');
  const normalizedPath = strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`;
  const effectiveLocation = {
    ...location,
    pathname: normalizedPath
  };

  const openBooking = (serviceName?: string | any) => {
    setIsBookingLoading(true);
    setSelectedService(typeof serviceName === 'string' ? serviceName : '');
    
    // Simulate a brief loading state before opening the modal
    setTimeout(() => {
      setIsBookingLoading(false);
      setIsBookingOpen(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20 md:pb-0 transition-colors duration-300">
      <CustomCursor />
      <ScrollProgressBar />
      <LaunchBanner />
      <TopBar />
      <Navbar 
        onBookNow={() => openBooking()} 
        onTrackRepair={() => setIsTrackRepairOpen(true)}
        isBookingOpen={isBookingLoading}
      />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={effectiveLocation} key={effectiveLocation.pathname}>
              {/* Primary Pages */}
              <Route path="/" element={<PageTransition><HomePage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutUsPage /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
              <Route path="/blog/:id" element={<PageTransition><BlogPostPage /></PageTransition>} />
              <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
              <Route path="/intake-form" element={<PageTransition><IntakeFormPage /></PageTransition>} />
              
              {/* Services Hub & Repairs Catalog */}
              <Route path="/services" element={<PageTransition><ServicesPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/repairs" element={<PageTransition><ServicesPage onBookNow={openBooking} /></PageTransition>} />
              
              {/* Device Category Repair Routes */}
              <Route path="/phone-repair" element={<PageTransition><PhoneRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/mobile-repair" element={<PageTransition><PhoneRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/iphone-repair" element={<PageTransition><IPhoneRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/samsung-repair" element={<PageTransition><SamsungRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/android-flagship-repair" element={<PageTransition><AndroidFlagshipRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/gaming-phone-repair" element={<PageTransition><GamingPhoneRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/apple-watch-repair" element={<PageTransition><AppleWatchRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/computer-repair" element={<PageTransition><ComputerRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/laptop-repair" element={<PageTransition><LaptopRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/macbook-repair" element={<PageTransition><MacBookRepairPage /></PageTransition>} />
              <Route path="/tablet-repair" element={<PageTransition><TabletRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/printer-repair" element={<PageTransition><PrinterRepairPage onBookNow={openBooking} /></PageTransition>} />

              {/* Specific Hardware Component & Issue Repairs */}
              <Route path="/screen-repair" element={<PageTransition><ScreenRepairPage /></PageTransition>} />
              <Route path="/cracked-screen-repair" element={<PageTransition><ScreenRepairPage /></PageTransition>} />
              <Route path="/laptop-screen-repair" element={<PageTransition><LaptopScreenRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/battery-repair" element={<PageTransition><BatteryRepairPage /></PageTransition>} />
              <Route path="/battery-replacement" element={<PageTransition><BatteryRepairPage /></PageTransition>} />
              <Route path="/liquid-damage-repair" element={<PageTransition><LiquidDamageRepairPage /></PageTransition>} />
              <Route path="/water-damage-repair" element={<PageTransition><LiquidDamageRepairPage /></PageTransition>} />
              <Route path="/charging-port-repair" element={<PageTransition><ChargingPortRepairPage /></PageTransition>} />
              <Route path="/camera-repair" element={<PageTransition><CameraRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/audio-repair" element={<PageTransition><AudioRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/body-repair" element={<PageTransition><BodyRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/logic-board-repair" element={<PageTransition><LogicBoardRepairPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/data-recovery" element={<PageTransition><DataRecoveryPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/software-issues" element={<PageTransition><SoftwareIssuesPage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/screen-protector" element={<PageTransition><ScreenProtectorPage onBookNow={openBooking} /></PageTransition>} />

              {/* Estimation, Tracking, Commercial & User Utility Routes */}
              <Route path="/estimate" element={<PageTransition><RepairEstimatePage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/repair-estimate" element={<PageTransition><RepairEstimatePage onBookNow={openBooking} /></PageTransition>} />
              <Route path="/track-repair" element={<PageTransition><TrackRepairPage /></PageTransition>} />
              <Route path="/troubleshoot" element={<PageTransition><TroubleshootingPage /></PageTransition>} />
              <Route path="/corporate" element={<PageTransition><CorporateServicesPage /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
              <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/reviews" element={<PageTransition><ReviewsPage /></PageTransition>} />
              <Route path="/trade-in" element={<PageTransition><TradeInPage /></PageTransition>} />
              <Route path="/warranty" element={<PageTransition><WarrantyPolicyPage /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><AdminDashboardPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer 
        onOpenTerms={() => setIsTermsOpen(true)}
      />
      <WhatsAppWidget />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialService={selectedService}
      />
      <StaffToolsModal
        isOpen={isStaffToolsOpen}
        onClose={() => setIsStaffToolsOpen(false)}
      />
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <TrackRepairModal
        isOpen={isTrackRepairOpen}
        onClose={() => setIsTrackRepairOpen(false)}
      />
      <MobileBottomNav 
        onBookNow={() => openBooking()}
        onOpenDiagnostic={() => window.dispatchEvent(new CustomEvent('open-diagnostic-bot'))}
      />
      <StickyContactButton onClick={() => setIsStaffToolsOpen(true)} />
      <CookieConsent />
      <ScrollToTopButton />
      <DiagnosticBot />
      <RecentActivityToast />
      <ExitIntentPopup onBookNow={() => openBooking('15% Exit Discount Offer')} />
      <NetworkStatus />
      <EasterEggConsole />
      <SmartBatteryBanner />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}>
          <Router>
            <Analytics />
            <LanguagePathHandler />
            <AppRoutes />
          </Router>
        </GoogleReCaptchaProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
