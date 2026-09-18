import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.corporate': 'Corporate',
    'nav.gallery': 'Gallery',
    'nav.shop': 'Shop',
    'nav.track': 'Track Repair',
    'nav.book': 'Book Now',
    'hero.title': 'Sharjah\'s Premier Device Repair Center',
    'hero.subtitle': 'Expert micro-soldering, screen replacements, and data recovery for all your devices. Fast, reliable, and guaranteed.',
    'hero.book': 'Book a Repair',
    'hero.estimate': 'Get an Estimate',
  },
  ar: {
    'nav.about': 'معلومات عنا',
    'nav.services': 'خدماتنا',
    'nav.corporate': 'للشركات',
    'nav.gallery': 'المعرض',
    'nav.shop': 'المتجر',
    'nav.track': 'تتبع الإصلاح',
    'nav.book': 'احجز الآن',
    'hero.title': 'المركز الأول لإصلاح الأجهزة في الشارقة',
    'hero.subtitle': 'لحام دقيق، استبدال الشاشات، واستعادة البيانات لجميع أجهزتك. سريع وموثوق ومضمون.',
    'hero.book': 'احجز إصلاحاً',
    'hero.estimate': 'احصل على تقدير',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
