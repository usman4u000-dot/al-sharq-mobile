import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Truck, 
  Plane, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Building2, 
  Zap, 
  Sparkles,
  Calculator,
  Search,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export interface GCCCountryData {
  id: string;
  countryEn: string;
  countryAr: string;
  flag: string;
  currency: string;
  currencyAr: string;
  rateVsAED: number;
  transitHours: string;
  courier: string;
  countyRegions: string[];
  primaryCities: { nameEn: string; nameAr: string; hubNote: string }[];
  popularServices: string[];
  customsNote: string;
  whyShipToSharjah: string;
}

export const GCC_EXTENDED_DATA: GCCCountryData[] = [
  {
    id: 'saudi',
    countryEn: 'Saudi Arabia (KSA)',
    countryAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currency: 'SAR',
    currencyAr: 'ر.س',
    rateVsAED: 1.02,
    transitHours: '24 - 48 Hours Express',
    courier: 'SMSA Express & DHL Express Worldwide',
    countyRegions: [
      'Riyadh Province (منطقة الرياض - Olaya, Malaz, KAFD, Diriyah, Kharj)',
      'Makkah Province (منطقة مكة - Jeddah, Makkah Al-Mukarramah, Taif, Rabigh)',
      'Eastern Province (المنطقة الشرقية - Dammam, Khobar, Dhahran, Jubail, Al Ahsa, Qatif)',
      'Al Madinah Province (منطقة المدينة - Madinah, Yanbu Industrial)',
      'Tabuk & NEOM Province (منطقة تبوك ونيوم - Neom Oxagon, Tabuk City, Sharma)',
      'Al Qassim Province (منطقة القصيم - Buraidah, Unaizah)',
      'Asir Province (منطقة عسير - Abha, Khamis Mushait)',
      'Jazan & Najran Provinces (منطقتا جازان ونجران)',
      'Hail & Al Jouf Provinces (منطقتا حائل والجوف)',
      'Northern Borders (منطقة الحدود الشمالية - Arar, Turaif)'
    ],
    primaryCities: [
      { nameEn: 'Riyadh (الرياض)', nameAr: 'الرياض', hubNote: 'Olaya, KAFD, Digital City corporate laptops & executive MacBooks' },
      { nameEn: 'Jeddah (جدة)', nameAr: 'جدة', hubNote: 'Corniche coastal humidity logic board recovery, iPads & MacBooks' },
      { nameEn: 'Dammam & Khobar (الدمام والخبر)', nameAr: 'الدمام والخبر', hubNote: 'Eastern Province express dispatch, Aramco corridor & oil sector' },
      { nameEn: 'Makkah & Madinah (مكة والمدينة)', nameAr: 'مكة المكرمة والمدينة', hubNote: 'Pilgrim emergency data recovery, broken screens & logic boards' },
      { nameEn: 'Neom & Tabuk (نيوم وتبوك)', nameAr: 'نيوم وتبوك', hubNote: 'Mega-project engineering laptops, CAD workstations & ruggedized gear' },
      { nameEn: 'Jubail & Yanbu (الجبيل وينبع)', nameAr: 'الجبيل وينبع', hubNote: 'Industrial petrochemical tablet & power management IC repairs' },
      { nameEn: 'Al Ahsa & Hofuf (الأحساء والهفوف)', nameAr: 'الأحساء', hubNote: 'Oasis region express mail-in devices & university laptops' },
      { nameEn: 'Abha & Khamis Mushait (أبها وخميس مشيط)', nameAr: 'أبها', hubNote: 'Southern highland university MacBooks & mobile device logic boards' }
    ],
    popularServices: [
      'MacBook Pro/Air M1/M2/M3/M4 Logic Board Micro-Soldering',
      'Dead iPhone 15/16/18 Pro NAND Forensic Data Recovery',
      'Wholesale Grade A+ Pre-Owned Phones & Logic Board ICs',
      'Liquid Damage Ultrasonic Chemical Cleaning (99.9% IPA)',
      'Samsung Galaxy S25/S26 Ultra Curved OLED Glass Restoration'
    ],
    customsNote: 'No GCC customs duty on personal electronic devices sent for temporary technical servicing under unified GCC tariff code HS 8471/8517.',
    whyShipToSharjah: 'Dealerships in Riyadh and Jeddah typically quote full motherboard swaps costing up to 3,500 SAR with zero data recovery. At Al Sharq, we repair individual shorted capacitor rails and power ICs from 450 to 950 SAR with 100% data preservation.'
  },
  {
    id: 'uae',
    countryEn: 'United Arab Emirates (Inter-Emirate)',
    countryAr: 'دولة الإمارات (بين الإمارات)',
    flag: '🇦🇪',
    currency: 'AED',
    currencyAr: 'د.إ',
    rateVsAED: 1.0,
    transitHours: '2 - 4 Hours Same-Day Express',
    courier: 'Al Sharq Express Van & Careem / Fetchr Inter-City Shuttle',
    countyRegions: [
      'Sharjah Emirate (إمارة الشارقة - Muwaileh, University City, Al Zahia, Aljada, Al Majaz, Al Nahda)',
      'Dubai Emirate (إمارة دبي - Al Qusais, Downtown, DIFC, Silicon Oasis, Marina, Business Bay)',
      'Abu Dhabi Emirate (إمارة أبوظبي - Al Maryah, Reem Island, Yas Island, Khalifa City, Mussafah)',
      'Al Ain Region (منطقة العين - University Campus, Zakher, Al Jimi)',
      'Ajman Emirate (إمارة عجمان - Al Nuaimiya, Al Rashidiya, Al Jurf, Corniche)',
      'Umm Al Quwain Emirate (إمارة أم القيوين - Salama, Free Zone)',
      'Ras Al Khaimah Emirate (إمارة رأس الخيمة - Al Hamra, Mina Al Arab, Nakheel)',
      'Fujairah & East Coast (إمارة الفجيرة وخورفكان - Port, City Center, Dibba)'
    ],
    primaryCities: [
      { nameEn: 'Sharjah Central (الشارقة)', nameAr: 'الشارقة', hubNote: 'Direct walk-in lab at BLDG#1017 - SHOP#2, Fire Station Rd, Muwaileh' },
      { nameEn: 'Dubai (دبي)', nameAr: 'دبي', hubNote: 'Downtown, Marina, DIFC, Silicon Oasis & Al Qusais same-day shuttle' },
      { nameEn: 'Abu Dhabi (أبوظبي)', nameAr: 'أبوظبي', hubNote: 'Al Maryah, Reem Island & Yas executive devices express van' },
      { nameEn: 'Al Ain (العين)', nameAr: 'العين', hubNote: 'Daily express university & hospital medical staff dispatch' },
      { nameEn: 'Ajman & UAQ (عجمان وأم القيوين)', nameAr: 'عجمان وأم القيوين', hubNote: '15-minute express courier shuttle via E311 highway' },
      { nameEn: 'RAK & Fujairah (رأس الخيمة والفجيرة)', nameAr: 'رأس الخيمة والفجيرة', hubNote: 'Same-day overland courier from Al Hamra & port zones' }
    ],
    popularServices: [
      '20-Minute Express Screen & Battery Replacement',
      'Level 4 Micro-soldering Motherboard Component Repair',
      'Cleanroom NVMe & iOS Forensic Data Extraction',
      'Corporate IT Equipment & Commercial Printer AMC',
      'DeviceLab™ Free In-Store Hardware Diagnostic Checks'
    ],
    customsNote: 'Domestic UAE territory — Zero customs, same-day insured courier pickup and delivery.',
    whyShipToSharjah: 'Avoid Dubai mall kiosk premiums of 200% to 300%. Our central wholesale laboratory provides genuine OEM parts with direct technician bench access at wholesale rates.'
  },
  {
    id: 'oman',
    countryEn: 'Oman (Muscat & Sohar)',
    countryAr: 'سلطنة عُمان',
    flag: '🇴🇲',
    currency: 'OMR',
    currencyAr: 'ر.ع',
    rateVsAED: 0.105,
    transitHours: '24 Hours (Daily Direct Shuttle)',
    courier: 'Oman Direct Line Cargo (Wajaja/Hatta) & DHL Express',
    countyRegions: [
      'Muscat Governorate (محافظة مسقط - Ruwi, Al Khuwair, Seeb, Bawshar, Qurum, Muttrah)',
      'North Al Batinah Governorate (محافظة شمال الباطنة - Sohar Industrial Port, Shinas, Saham, Liwa)',
      'South Al Batinah Governorate (محافظة جنوب الباطنة - Barka, Rustaq, Musannah)',
      'Al Buraimi Governorate (محافظة البريمي - Overland border crossing corridor via Hatta/Wajaja)',
      'Dhofar Governorate (محافظة ظفار - Salalah, Mirbat, Taqah, Thumrait)',
      'Al Dakhiliyah Governorate (محافظة الداخلية - Nizwa, Bahla, Izki, Sumail)',
      'Ash Sharqiyah Governorates (محافظتا الشرقية - Sur, Ibra, Jalan Bani Bu Ali)',
      'Al Wusta Governorate (محافظة الوسطى - Duqm Special Economic Zone)',
      'Musandam Governorate (محافظة مسندم - Khasab, Dibba Oman)'
    ],
    primaryCities: [
      { nameEn: 'Muscat (مسقط)', nameAr: 'مسقط', hubNote: 'Ruwi, Al Khuwair & Seeb client drop-offs & daily bus cargo' },
      { nameEn: 'Sohar (صحار)', nameAr: 'صحار', hubNote: 'Closest overland corridor (3 hours overland to Sharjah)' },
      { nameEn: 'Salalah (صلالة)', nameAr: 'صلالة', hubNote: 'Air cargo express freight dispatch for commercial laptops' },
      { nameEn: 'Nizwa & Sur (نزوى وصور)', nameAr: 'نزوى وصور', hubNote: 'Interior & regional courier drop points' },
      { nameEn: 'Buraimi (البريمي)', nameAr: 'البريمي', hubNote: 'Border-adjacent direct dispatch (under 2 hours overland)' },
      { nameEn: 'Duqm (الدقم)', nameAr: 'الدقم', hubNote: 'Special Economic Zone marine & engineering logic boards' }
    ],
    popularServices: [
      'Overland 24h Shuttle Repair for MacBooks & Laptops',
      'OLED Screen & Ceramic Glass Refurbishment',
      'Gaming Laptop GPU Reballing (Asus ROG, Alienware, Legion)',
      'Wholesale Bulk Device Consignments & OEM Parts',
      'Cleanroom Hard Drive & SSD Forensic Data Rescue'
    ],
    customsNote: 'Direct border clearance via Al Wajaja / Hatta crossing with automated transit manifest documentation.',
    whyShipToSharjah: 'Because of our proximity to the Oman border, devices sent from Muscat or Sohar arrive in our Muwaileh workshop in under 24 hours. You get UAE wholesale part pricing and Level 4 micro-soldering unavailable locally in regional wilayats.'
  },
  {
    id: 'kuwait',
    countryEn: 'Kuwait (الكويت)',
    countryAr: 'دولة الكويت',
    flag: '🇰🇼',
    currency: 'KWD',
    currencyAr: 'د.ك',
    rateVsAED: 0.084,
    transitHours: '24 - 48 Hours',
    courier: 'DHL Express & Aramex Priority Air',
    countyRegions: [
      'Capital Governorate / Al Asimah (محافظة العاصمة - Kuwait City, Sharq, Mirqab, Shuwaikh Industrial)',
      'Hawalli Governorate (محافظة حولي - Hawalli Ibn Khaldoun Computer St, Salmiya, Jabriya, Bayan)',
      'Al Ahmadi Governorate (محافظة الأحمدي - Fahaheel, Ahmadi, Mangaf, Mahboula, Egaila)',
      'Farwaniya Governorate (محافظة الفروانية - Farwaniya, Khaitan, Al Rai, Ishbilya, Jleeb)',
      'Al Jahra Governorate (محافظة الجهراء - Jahra, Sulaibiya, Mutlaa City)',
      'Mubarak Al-Kabeer Governorate (محافظة مبارك الكبير - Sabah Al Salem, Qurain, Adan)'
    ],
    primaryCities: [
      { nameEn: 'Kuwait City (العاصمة)', nameAr: 'مدينة الكويت', hubNote: 'Downtown financial & executive laptops' },
      { nameEn: 'Hawalli (حولي)', nameAr: 'حولي', hubNote: 'Ibn Khaldoun Computer Street B2B logic board outsourcing' },
      { nameEn: 'Salmiya (السالمية)', nameAr: 'السالمية', hubNote: 'High-end flagship smartphone screen & logic fixes' },
      { nameEn: 'Ahmadi & Fahaheel (الأحمدي والفحيحيل)', nameAr: 'الأحمدي', hubNote: 'Oil & gas ruggedized laptop recovery' },
      { nameEn: 'Farwaniya & Jahra (الفروانية والجهراء)', nameAr: 'الفروانية والجهراء', hubNote: 'Express residential priority air courier drop' },
      { nameEn: 'Sabah Al Salem (صباح السالم)', nameAr: 'صباح السالم', hubNote: 'Rapid residential door-to-door courier dispatch' }
    ],
    popularServices: [
      'B2B Logic Board Repair Outsourcing for Hawalli Computer Shops',
      'MacBook M-Series Power Management IC (PMIC) Fix',
      'Corrupted SSD & Encrypted iOS Forensic Data Recovery',
      'Bulk Grade A+ Refurbished Stock Supply',
      'iPad Pro FaceID & Laser Glass Restoration'
    ],
    customsNote: 'Air express courier handling with direct electronic commercial invoice & return tracking number.',
    whyShipToSharjah: 'Hawalli technicians frequently outsource complex BGA reballing and dead CPU swaps to Al Sharq Sharjah due to our specialized trinocular stereo microscopes and extensive micro-component reel inventory.'
  },
  {
    id: 'qatar',
    countryEn: 'Qatar (Doha & Lusail)',
    countryAr: 'دولة قطر',
    flag: '🇶🇦',
    currency: 'QAR',
    currencyAr: 'ر.ق',
    rateVsAED: 0.99,
    transitHours: '24 - 48 Hours Air Express',
    courier: 'Aramex Priority Air & DHL Worldwide',
    countyRegions: [
      'Doha Municipality (بلدية الدوحة - West Bay, The Pearl, Old Airport, Al Sadd, Najma)',
      'Al Daayen Municipality (بلدية الظعاين - Lusail City, Fox Hills, Marina Promenade)',
      'Al Rayyan Municipality (بلدية الريان - Education City, Al Waab, Muaither, Aspire Zone)',
      'Al Wakrah Municipality (بلدية الوكرة - Al Wakrah Heritage, Al Wukair)',
      'Al Khor & Al Thakhira (بلدية الخور والذخيرة - Ras Laffan industrial energy sector)',
      'Umm Salal & Al Shamal (بلديتا أم صلال والشمال - Umm Salal Ali, Ruwais)'
    ],
    primaryCities: [
      { nameEn: 'Doha (الدوحة)', nameAr: 'الدوحة', hubNote: 'West Bay & Pearl Qatar VIP devices & executive fleet' },
      { nameEn: 'Lusail (لوسيل)', nameAr: 'لوسيل', hubNote: 'Modern business hub MacBook fleets & creative workstations' },
      { nameEn: 'Al Rayyan (الريان)', nameAr: 'الريان', hubNote: 'Education City student laptops & residential pickups' },
      { nameEn: 'Al Wakrah (الوكرة)', nameAr: 'الوكرة', hubNote: 'Coastal area device water damage & chemical wash' },
      { nameEn: 'Al Khor (الخور)', nameAr: 'الخور', hubNote: 'Industrial & LNG energy sector field tablets' }
    ],
    popularServices: [
      'High-Priority VIP Courier Turnaround for Executives',
      'iPad Pro Liquid Damage & Digitizer Micro-Soldering',
      'Unbroken Data Extraction from Severely Crushed Devices',
      'Customs-Cleared Commercial Export Documentation',
      'Apple Silicon M1/M2/M3/M4 No-Power Recovery'
    ],
    customsNote: 'Pre-cleared airway bill generation with customs-exempt personal repair declarations.',
    whyShipToSharjah: 'Doha clients benefit from our 90-day international lab warranty and direct WhatsApp video reports showing microscope diagnosis before any soldering work begins.'
  },
  {
    id: 'bahrain',
    countryEn: 'Bahrain (Manama)',
    countryAr: 'مملكة البحرين',
    flag: '🇧🇭',
    currency: 'BHD',
    currencyAr: 'د.ب',
    rateVsAED: 0.103,
    transitHours: '24 - 48 Hours',
    courier: 'DHL Express & Aramex Priority',
    countyRegions: [
      'Capital Governorate (محافظة العاصمة - Manama, Seef District, Diplomatic Area, Juffair)',
      'Muharraq Governorate (محافظة المحرق - Muharraq City, Busaiteen, Amwaj Islands, Hidd)',
      'Northern Governorate (المحافظة الشمالية - Saar, Budaiya, Jasra, Janabiyah, Barbar)',
      'Southern Governorate (المحافظة الجنوبية - Riffa, Zallaq, Sakhir Circuit, Awali)',
      'Central Towns & Industrial (سترة الصناعية، مدينة عيسى، مدينة حمد)'
    ],
    primaryCities: [
      { nameEn: 'Manama (المنامة)', nameAr: 'المنامة', hubNote: 'Central business district logic boards & corporate IT' },
      { nameEn: 'Riffa (الرفاع)', nameAr: 'الرفاع', hubNote: 'Express door-to-door courier dispatch' },
      { nameEn: 'Muharraq (المحرق)', nameAr: 'المحرق', hubNote: 'Near Bahrain Airport rapid dispatch hub' },
      { nameEn: 'Sitra & Saar (سترة وسار)', nameAr: 'سترة وسار', hubNote: 'Residential & industrial tablet support' },
      { nameEn: 'Seef District (ضاحية السيف)', nameAr: 'السيف', hubNote: 'Commercial towers & shopping mall tech repairs' }
    ],
    popularServices: [
      'iPhone 13 to 18 Pro No-Power / Boot Loop Solutions',
      'MacBook Display Flex Gate & Backlight IC Repair',
      'Industrial Tablet & POS Terminal Component Servicing',
      'Certified Battery Health Replacements with No Warning Popups'
    ],
    customsNote: 'Simplified GCC electronic manifest with fast customs handover at Bahrain International Airport.',
    whyShipToSharjah: 'Avoid paying dealer replacement rates in Manama. We diagnose component short-circuits at fractional cost with certified parts.'
  },
  {
    id: 'jordan',
    countryEn: 'Jordan & Levant (Amman)',
    countryAr: 'الأردن وبلاد الشام',
    flag: '🇯🇴',
    currency: 'JOD',
    currencyAr: 'د.أ',
    rateVsAED: 0.193,
    transitHours: '48 - 72 Hours Air Express',
    courier: 'Aramex International Priority & DHL',
    countyRegions: [
      'Amman Governorate (محافظة العاصمة - Abdali, Sweifieh, 7th Circle, Shmeisani, Jabal Amman)',
      'Irbid Governorate (محافظة إربد - Yarmouk University tech corridor)',
      'Zarqa Governorate (محافظة الزرقاء - Industrial & commercial tech)',
      'Aqaba Special Economic Zone (منطقة العقبة الاقتصادية الخاصة ASEZA)',
      'Balqa Governorate (محافظة البلقاء - Salt & Fuheis)'
    ],
    primaryCities: [
      { nameEn: 'Amman (عمّان)', nameAr: 'عمّان', hubNote: '7th Circle & Abdali startup MacBook fleets' },
      { nameEn: 'Irbid (إربد)', nameAr: 'إربد', hubNote: 'University student laptop micro-soldering' },
      { nameEn: 'Aqaba (العقبة)', nameAr: 'العقبة', hubNote: 'Special economic zone electronics import & duty-free' }
    ],
    popularServices: [
      'Wholesale Grade A+ Certified iPhones Export',
      'Hard-to-Find Micro-Soldering ICs & Stencils',
      'Apple Silicon Dead Logic Board Diagnostics'
    ],
    customsNote: 'Commercial air express documentation with customs clearance manifests.',
    whyShipToSharjah: 'Sharjah provides direct wholesale access to spare parts unavailable in Levant local markets.'
  },
  {
    id: 'turkey',
    countryEn: 'Turkey (Istanbul & Ankara)',
    countryAr: 'تركيا',
    flag: '🇹🇷',
    currency: 'USD',
    currencyAr: '$',
    rateVsAED: 0.272,
    transitHours: '48 - 72 Hours Air Freight',
    courier: 'Turkish Cargo & FedEx International Priority',
    countyRegions: [
      'Istanbul Province (إسطنبول - Fatih, Kadıköy, Şişli, Beşiktaş, Levent)',
      'Ankara Province (أنقرة - Çankaya, Ostim Industrial tech)',
      'Izmir & Aegean (إزمير - Konak, Bornova, Alsancak)',
      'Bursa & Antalya (بورصة وأنطاليا - Nilüfer, Muratpaşa)'
    ],
    primaryCities: [
      { nameEn: 'Istanbul (إسطنبول)', nameAr: 'إسطنبول', hubNote: 'Fatih & Kadıköy tech trading districts' },
      { nameEn: 'Ankara (أنقرة)', nameAr: 'أنقرة', hubNote: 'Capital tech institutions & enterprise repairs' },
      { nameEn: 'Izmir (إزمير)', nameAr: 'إزمير', hubNote: 'Coastal electronics trade corridors' },
      { nameEn: 'Antalya (أنطاليا)', nameAr: 'أنطاليا', hubNote: 'Tourism sector tech & expat device care' }
    ],
    popularServices: [
      'Wholesale Grade A+ Certified iPhones & MacBooks Supply',
      'Hard-to-Find Logic Board IC Chips & Stencils Export',
      'Complex BGA Reballing for Dead M-Series Logic Boards'
    ],
    customsNote: 'Official commercial export invoices and customs declaration documentation included.',
    whyShipToSharjah: 'Sharjah is the Middle East wholesale hub for electronics. Turkish retailers and repair academies rely on Al Sharq for verified OEM parts and high-end micro-soldering solutions.'
  },
  {
    id: 'iraq',
    countryEn: 'Iraq & Kurdistan (Baghdad & Erbil)',
    countryAr: 'العراق وإقليم كردستان',
    flag: '🇮🇶',
    currency: 'USD',
    currencyAr: '$',
    rateVsAED: 0.272,
    transitHours: '48 - 72 Hours Air Cargo',
    courier: 'DHL Worldwide & Iraqi Airways Cargo',
    countyRegions: [
      'Baghdad Governorate (محافظة بغداد - Karrada, Mansour, Sina\'a Computer St, Jadriya)',
      'Erbil & Kurdistan (أربيل - Ankawa, Dream City, Empire World, Bakhtiyari)',
      'Basra Governorate (محافظة البصرة - Ashar, Corniche, Oil sector hardware)',
      'Sulaymaniyah & Najaf (السليمانية والنجف الأشرف)'
    ],
    primaryCities: [
      { nameEn: 'Baghdad (بغداد)', nameAr: 'بغداد', hubNote: 'Al-Sinaa Computer Street wholesale tech imports & logic boards' },
      { nameEn: 'Erbil (أربيل)', nameAr: 'أربيل', hubNote: 'Kurdistan enterprise MacBooks & mobile trade' },
      { nameEn: 'Basra (البصرة)', nameAr: 'البصرة', hubNote: 'Southern energy corridor ruggedized IT devices' }
    ],
    popularServices: [
      'Direct Wholesale Spare Parts Consignment from Sharjah Ports',
      'Corrupted NAND Flash Memory & Dead Android Data Recovery',
      'MacBook Apple Silicon Micro-Soldering Outsourcing'
    ],
    customsNote: 'Direct air cargo manifest handling with certified technical diagnostic reports.',
    whyShipToSharjah: 'Technicians on Al-Sinaa Street in Baghdad and in Erbil regularly send irreparable logic boards to Al Sharq for cleanroom component replacement.'
  },
  {
    id: 'egypt',
    countryEn: 'Egypt (Cairo & Alexandria)',
    countryAr: 'جمهورية مصر العربية',
    flag: '🇪🇬',
    currency: 'EGP',
    currencyAr: 'ج.م',
    rateVsAED: 13.5,
    transitHours: '48 - 72 Hours Air Express',
    courier: 'DHL Express & Aramex Priority',
    countyRegions: [
      'Cairo Governorate (محافظة القاهرة - New Cairo, 5th Settlement, Nasr City, Maadi, Zamalek)',
      'Giza Governorate (محافظة الجيزة - 6th of October City, Sheikh Zayed, Mohandessin, Dokki)',
      'Alexandria Governorate (محافظة الإسكندرية - Smouha, Roushdy, Sidi Gaber, Miami)',
      'New Administrative Capital (العاصمة الإدارية الجديدة - Financial District)'
    ],
    primaryCities: [
      { nameEn: 'Cairo (القاهرة)', nameAr: 'القاهرة', hubNote: 'New Cairo & Maadi corporate MacBooks & creative studios' },
      { nameEn: 'Giza / 6th October (الجيزة و٦ أكتوبر)', nameAr: 'الجيزة', hubNote: 'Tech parks & media production laptop motherboards' },
      { nameEn: 'Alexandria (الإسكندرية)', nameAr: 'الإسكندرية', hubNote: 'Coastal humidity corrosion treatment & forensic recovery' }
    ],
    popularServices: [
      'High-End Apple Silicon Logic Board Component Repair',
      'Micro-BGA Reballing for Dead iPhones & MacBooks',
      'Cleanroom Mechanical HDD & NVMe Data Rescue'
    ],
    customsNote: 'Express personal item courier declarations with non-commercial technical repair status.',
    whyShipToSharjah: 'Save up to 60% compared to local authorized dealer board replacements while enjoying Level 4 microscope repairs not available locally.'
  }
];

export interface LocalDistrictData {
  districtEn: string;
  districtAr: string;
  driveTimeMin: string;
  serviceType: string;
  highlight: string;
}

export const SHARJAH_LOCAL_DISTRICTS: LocalDistrictData[] = [
  {
    districtEn: 'Muwaileh Commercial Phase 1 & 2',
    districtAr: 'مويلح التجارية (المرحلة 1 و 2)',
    driveTimeMin: '0 - 1 Min',
    serviceType: 'Walk-In & 15-Min Express Bench',
    highlight: 'Our central physical lab is right on Fire Station Road (BLDG#1017 - SHOP#2). Instant counter microscope inspection.'
  },
  {
    districtEn: 'Muwaileh Industrial & Civil Defence Area',
    districtAr: 'صناعية مويلح والدفاع المدني',
    driveTimeMin: '0 Min (On-Site)',
    serviceType: 'Immediate Counter Walk-In',
    highlight: 'Directly on Fire Station Road opposite Civil Defence station. Free stereo microscope diagnostics for all walk-in devices.'
  },
  {
    districtEn: 'University City (AUS, UoS, Skyline, Police Academy)',
    districtAr: 'المدينة الجامعية (جامعة الشارقة، الأمريكية، سكاي لاين)',
    driveTimeMin: '2 - 3 Mins',
    serviceType: '15% Student Discount Bench',
    highlight: 'Campus-favorite tech center for student MacBooks, broken iPad screens, thermal repasting, and urgent thesis data recovery.'
  },
  {
    districtEn: 'Al Zahia & City Centre Al Zahia',
    districtAr: 'الزاهية وسيتي سنتر الزاهية',
    driveTimeMin: '3 - 4 Mins',
    serviceType: 'Doorstep Pickup & Free Delivery',
    highlight: 'Directly adjacent via University City Road. Fast same-day turnaround while you shop or relax at home.'
  },
  {
    districtEn: 'Aljada Community (Naseej, East Village, Madar)',
    districtAr: 'الجادة (مشروع أرادَا، نسيج، إيست فيليدج، مدار)',
    driveTimeMin: '3 Mins',
    serviceType: 'Same-Day Courier / Walk-In',
    highlight: 'Serving Aljada’s modern residential buildings, students, and tech professionals with 20-minute screen and battery fixes.'
  },
  {
    districtEn: 'Sharjah Research Technology & Innovation Park (SRTIP)',
    districtAr: 'مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTIP)',
    driveTimeMin: '4 Mins',
    serviceType: 'B2B Corporate & Startup Tech Support',
    highlight: 'Partnered IT hardware maintenance, 3D lab controller board repair, and enterprise laptop fleet servicing.'
  },
  {
    districtEn: 'Sharjah Industrial Areas 1 to 18',
    districtAr: 'المناطق الصناعية بالشارقة (1 إلى 18)',
    driveTimeMin: '2 - 5 Mins',
    serviceType: 'On-Site Pickup & Fleet AMC',
    highlight: 'Commercial printer servicing, ruggedized logistics tablets, warehouse barcode scanners, and fleet desktop repairs.'
  },
  {
    districtEn: 'Al Majaz 1, 2, 3 & Waterfront Corniche',
    districtAr: 'المجاز (1 و 2 و 3) وكورنيش بحيرة خالد',
    driveTimeMin: '8 Mins',
    serviceType: 'Doorstep Pickup & Return Van',
    highlight: 'Rapid courier dispatch via King Faisal Road or S116 for residential towers across Al Majaz waterfront.'
  },
  {
    districtEn: 'Sahara Centre & Al Nahda Sharjah',
    districtAr: 'مركز صحارى والنهدة الشارقة (الحدود مع دبي)',
    driveTimeMin: '7 Mins',
    serviceType: 'Express Courier & Counter Bench',
    highlight: 'High-density commuter hub bordering Dubai. Same-day drop-off before work and pickup in the evening.'
  },
  {
    districtEn: 'Al Taawun & Al Arab Mall Area',
    districtAr: 'التعاون ومنطقة العرب مول',
    driveTimeMin: '8 Mins',
    serviceType: 'Doorstep Tech Courier & Counter',
    highlight: 'Rapid access via Al Wahda St / E11. Broken screen replacements, battery renewals, and charging port repairs.'
  },
  {
    districtEn: 'Al Khan Beach & Sharjah Aquarium',
    districtAr: 'شاطئ الخان ومربى الشارقة للأحياء المائية',
    driveTimeMin: '9 Mins',
    serviceType: 'Liquid Spill Emergency Cleaning',
    highlight: 'Coastal humidity and beach water immersion emergency treatment with our 165Hz sonic purge and ultrasonic chemical bath.'
  },
  {
    districtEn: 'Al Mamzar Sharjah & Al Khan Lagoon',
    districtAr: 'الممزر الشارقة وبحيرة الخان',
    driveTimeMin: '8 Mins',
    serviceType: 'Emergency Saltwater De-Oxidation',
    highlight: 'Specialized 165Hz sonic purge and ultrasonic chemical wash for devices dropped in saltwater or swimming pools.'
  },
  {
    districtEn: 'Al Qasimia, Al Mahatta & King Abdul Aziz Rd',
    districtAr: 'القاسمية والمحطة وشارع الملك عبدالعزيز',
    driveTimeMin: '6 Mins',
    serviceType: 'Same-Day Express Counter Service',
    highlight: 'High-density commercial corridor with rapid turnaround on screen replacements and battery swaps.'
  },
  {
    districtEn: 'Abu Shagara & Bu Daniq Commercial Area',
    districtAr: 'أبو شغارة وبودانق التجارية',
    driveTimeMin: '5 Mins',
    serviceType: 'Express 20-Min Counter Repair',
    highlight: 'Centrally accessible automotive and family neighborhood. Quick battery changes, camera repairs, and microphone fixes.'
  },
  {
    districtEn: 'Al Rolla & Souq Al Shanasiyah Heritage Hub',
    districtAr: 'الرولة وسوق الشناصية وسوق الجبيل',
    driveTimeMin: '11 Mins',
    serviceType: 'B2B Wholesale & Consumer Fixes',
    highlight: 'Sharjah’s traditional mobile phone trading hub. Secondary market buyers test used phones using our DeviceLab™.'
  },
  {
    districtEn: 'Samnan, Halwan, Dasman & Ramtha',
    districtAr: 'سمنان وحلوان ودسمان والرمثاء',
    driveTimeMin: '6 Mins',
    serviceType: 'Fast Suburban Pickup & Delivery',
    highlight: 'Residential villa districts with on-demand van collection for family iPads, students\' MacBooks, and work laptops.'
  },
  {
    districtEn: 'Al Yarmook, Al Ghuwair & Al Manakh',
    districtAr: 'اليرموك والغوير والمناخ',
    driveTimeMin: '8 Mins',
    serviceType: 'Express Pickup & Return',
    highlight: 'High-density trading and residential streets. Swift logic board rescues and cracked rear glass laser renewals.'
  },
  {
    districtEn: 'Al Nasserya, Maysaloon & Al Mirgab',
    districtAr: 'الناصرية وميسلون والمرقاب',
    driveTimeMin: '9 Mins',
    serviceType: 'Doorstep Courier Dispatch',
    highlight: 'Serving traditional residential neighborhoods with guaranteed 90-day warranty on all genuine OEM parts.'
  },
  {
    districtEn: 'Al Rahmaniya (Sectors 1 to 10) & Shaghrafa',
    districtAr: 'الرحمانية (القطاعات 1 إلى 10) والشغرفة',
    driveTimeMin: '8 Mins',
    serviceType: 'Doorstep Tech Pickup & Delivery',
    highlight: 'Fast suburban collection for family devices, school iPads, and home office MacBooks along E88 / Airport Road.'
  },
  {
    districtEn: 'Al Suyoh (Sectors 1 to 12) & Al Noof',
    districtAr: 'السيوح (القطاعات 1 إلى 12) والنوف',
    driveTimeMin: '7 Mins',
    serviceType: 'Direct Suburban Van Dispatch',
    highlight: 'Rapid connection via Maliha Road and Emirates Road (E611). Modern family villa laptop and smartphone servicing.'
  },
  {
    districtEn: 'Tilal City & Tilal Mall Master District',
    districtAr: 'مدينة تلال ومول تلال (طريق الإمارات E611)',
    driveTimeMin: '7 Mins',
    serviceType: 'Express Doorstep Courier Pickup',
    highlight: 'Serving modern villa communities and master-planned green townships with on-demand insured van collection.'
  },
  {
    districtEn: 'Masaar by Arada & Barashi Green Spine',
    districtAr: 'مسار من أرادَا والبراشي',
    driveTimeMin: '7 Mins',
    serviceType: 'Doorstep Pickup & Return Van',
    highlight: 'Forest-community residences serviced with on-demand courier collection for Apple MacBooks and family smart devices.'
  },
  {
    districtEn: 'SAIF Zone (Sharjah Airport International Free Zone)',
    districtAr: 'المنطقة الحرة بمطار الشارقة الدولي (سيف زون)',
    driveTimeMin: '6 Mins',
    serviceType: 'Corporate B2B IT & Fleet AMC',
    highlight: 'Specialized enterprise hardware maintenance, ruggedized warehouse scanners, and logistics laptop repair.'
  },
  {
    districtEn: 'Hamriyah Free Zone & Sharjah Port Khalid',
    districtAr: 'منطقة الحمرية الحرة وميناء خالد بالشارقة',
    driveTimeMin: '15 Mins',
    serviceType: 'Industrial IT & Marine Tech Repairs',
    highlight: 'Port logistics tablets, commercial displays, shipping terminal computers, and waterproof device restorations.'
  },
  {
    districtEn: 'Al Dhaid, Madam & Maleha Interior',
    districtAr: 'الذيد والمدام ومليحة (المنطقة الوسطى)',
    driveTimeMin: '30 - 35 Mins',
    serviceType: 'Same-Day Overland Courier',
    highlight: 'Central agricultural and desert townships connecting to our Muwaileh workshop via Maliha Road (E102).'
  },
  {
    districtEn: 'Khor Fakkan, Kalba & Dibba Al Hisn (Eastern Enclaves)',
    districtAr: 'خورفكان وكلباء ودبا الحصن (الساحل الشرقي)',
    driveTimeMin: '45 - 55 Mins',
    serviceType: 'Inter-City Overnight Mail-In & Courier',
    highlight: 'Connecting Eastern Coast residents and marine enterprises with our central Level 4 micro-soldering Sharjah lab.'
  },
  {
    districtEn: 'Dubai Border (Al Qusais, Muhaisnah & Al Twar)',
    districtAr: 'حدود دبي (القصيص، محيصنة، الطوار)',
    driveTimeMin: '8 - 10 Mins',
    serviceType: 'Cross-Emirate Express Delivery',
    highlight: 'Directly reachable via Beirut St or E311 without central Dubai traffic. Up to 40% more affordable than Dubai mall kiosks.'
  },
  {
    districtEn: 'Dubai Silicon Oasis, Academic City & International City',
    districtAr: 'واحة دبي للسيليكون، المدينة الأكاديمية، والمدينة العالمية',
    driveTimeMin: '12 Mins',
    serviceType: 'Cross-Border Tech Courier',
    highlight: 'Direct route via Academic City Road. Student & startup developer laptop logic board repairs and screen renewals.'
  },
  {
    districtEn: 'Dubai Downtown, DIFC, Business Bay & Marina',
    districtAr: 'وسط مدينة دبي، مركز دبي المالي العالمي، الخليج التجاري',
    driveTimeMin: '20 - 25 Mins',
    serviceType: 'VIP Insured Van Shuttle',
    highlight: 'Avoid AED 3,500+ dealership logic board quote traps. We repair individual power rails for 450 to 950 AED with zero data loss.'
  },
  {
    districtEn: 'Ajman Downtown, Al Nuaimiya, Rashidiya & Al Jurf',
    districtAr: 'وسط عجمان، النعيمية، الراشدية، والجرف',
    driveTimeMin: '10 - 12 Mins',
    serviceType: 'Daily Direct Courier Shuttle',
    highlight: 'Fast connection via Sheikh Mohammed Bin Zayed Road (E311). Comprehensive motherboard repairs for Ajman residents.'
  },
  {
    districtEn: 'Umm Al Quwain & Salama Area',
    districtAr: 'أم القيوين ومنطقة السلمة',
    driveTimeMin: '20 Mins',
    serviceType: 'Same-Day Overland Dispatch',
    highlight: 'Overland courier collection for high-end smartphones, iPads, and gaming laptops via Sheikh Zayed Road (E311).'
  },
  {
    districtEn: 'Ras Al Khaimah & Fujairah (Northern Emirates)',
    districtAr: 'رأس الخيمة (الحمراء، النخيل) والفجيرة',
    driveTimeMin: '45 - 60 Mins',
    serviceType: 'Overnight Insured Courier Shuttle',
    highlight: 'Direct overland express connection from Al Hamra, RAK Ports, and Fujairah Oil Industry terminal devices.'
  },
  {
    districtEn: 'Abu Dhabi & Al Ain (Capital Region)',
    districtAr: 'أبوظبي والعين (العاصمة)',
    driveTimeMin: '75 - 90 Mins',
    serviceType: 'Same-Day VIP Insured Shuttle',
    highlight: 'Direct door-to-door courier service for corporate executive MacBooks and government forensic data recovery.'
  }
];

export default function GCCAndLocationStrategyHub() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'gcc' | 'sharjah'>('gcc');
  const [selectedGCC, setSelectedGCC] = useState<GCCCountryData>(GCC_EXTENDED_DATA[0]);
  const [searchFilter, setSearchFilter] = useState('');

  // GCC Shipping & Customs Calculator state
  const [calcCountryId, setCalcCountryId] = useState('saudi');
  const [calcDevice, setCalcDevice] = useState('macbook');
  const [calcIssue, setCalcIssue] = useState('logic-board');

  const calcCountry = GCC_EXTENDED_DATA.find(c => c.id === calcCountryId) || selectedGCC;

  const getServicePriceAED = (device: string, issue: string): number => {
    let base = 450;
    if (device === 'macbook') base = 650;
    if (device === 'iphone') base = 380;
    if (device === 'samsung') base = 420;
    if (device === 'ipad') base = 350;

    if (issue === 'liquid') base = Math.round(base * 0.7);
    if (issue === 'data-recovery') base = Math.round(base * 1.4);
    if (issue === 'screen') base = Math.round(base * 1.1);
    return base;
  };

  const currentPriceAED = getServicePriceAED(calcDevice, calcIssue);
  const currentPriceLocal = Math.round(currentPriceAED * calcCountry.rateVsAED);

  const filteredDistricts = SHARJAH_LOCAL_DISTRICTS.filter(d => 
    d.districtEn.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.districtAr.includes(searchFilter)
  );

  return (
    <div className="py-12 bg-slate-900 text-white rounded-3xl border border-slate-800 overflow-hidden shadow-2xl my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
              <Globe className="w-4 h-4" />
              <span>{isAr ? 'شبكة التغطية الجغرافية واللوجستية' : 'Geographic Reach & Logistics Network'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? 'تغطية متكاملة للشارقة ودول الخليج العربي' : 'Comprehensive GCC & Sharjah Location Coverage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {isAr
                ? 'سواء كنت في مويلح أو الزاهية بالشارقة، أو ترسل جهازك بالبريد السريع من الرياض أو مسقط أو الدوحة، نوفر لك أسرع مسارات الصيانة والخدمة.'
                : 'Whether you are next door in Muwaileh or Al Zahia, or dispatching an insured device from Riyadh, Muscat, or Doha, here is our full SLA matrix.'}
            </p>
          </div>

          {/* Segmented Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-800 rounded-2xl border border-slate-700 shrink-0">
            <button
              onClick={() => setActiveTab('gcc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'gcc' 
                  ? 'bg-[#C2410C] text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{isAr ? 'دول الخليج (KSA / Oman / etc.)' : 'GCC Countries Hub'}</span>
            </button>
            <button
              onClick={() => setActiveTab('sharjah')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'sharjah' 
                  ? 'bg-[#C2410C] text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'مناطق الشارقة ودبي (Near Me)' : 'Sharjah & UAE Local Districts'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: GCC Countries Hub */}
        {activeTab === 'gcc' && (
          <div className="space-y-8">
            {/* Quick County & Major Hub Suggestion Chips */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{isAr ? 'اقتراحات سريعة للمحافظات والمدن الخليجية الأكثر طلباً:' : 'Popular GCC Counties, Provinces & Major Hub Suggestions:'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '🇸🇦 Riyadh KAFD & Olaya', countryId: 'saudi' },
                  { label: '🇸🇦 Jeddah Corniche & Port', countryId: 'saudi' },
                  { label: '🇸🇦 Dammam & Khobar (Eastern)', countryId: 'saudi' },
                  { label: '🇸🇦 Neom & Tabuk Mega-Projects', countryId: 'saudi' },
                  { label: '🇴🇲 Muscat (Ruwi & Seeb)', countryId: 'oman' },
                  { label: '🇴🇲 Sohar Overland Corridor (3h)', countryId: 'oman' },
                  { label: '🇰🇼 Hawalli Computer Street', countryId: 'kuwait' },
                  { label: '🇰🇼 Kuwait City Financial', countryId: 'kuwait' },
                  { label: '🇶🇦 Doha West Bay & Pearl', countryId: 'qatar' },
                  { label: '🇶🇦 Lusail Tech Hub', countryId: 'qatar' },
                  { label: '🇧🇭 Manama Seef & Diplomatic', countryId: 'bahrain' },
                  { label: '🇧🇭 Saar & Riffa Residential', countryId: 'bahrain' },
                  { label: '🇹🇷 Istanbul Tech Corridors', countryId: 'turkey' },
                  { label: '🇮🇶 Baghdad Al-Sinaa Street', countryId: 'iraq' },
                  { label: '🇮🇶 Erbil Tech Corridor', countryId: 'iraq' },
                  { label: '🇪🇬 Cairo & New Capital', countryId: 'egypt' }
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const target = GCC_EXTENDED_DATA.find(c => c.id === chip.countryId);
                      if (target) {
                        setSelectedGCC(target);
                        setCalcCountryId(target.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all border ${
                      selectedGCC.id === chip.countryId
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold shadow-sm'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {GCC_EXTENDED_DATA.map((country) => {
                const isSelected = selectedGCC.id === country.id;
                return (
                  <button
                    key={country.id}
                    onClick={() => {
                      setSelectedGCC(country);
                      setCalcCountryId(country.id);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-orange-950/80 to-slate-800 border-orange-500 shadow-lg shadow-orange-950/30 ring-1 ring-orange-500/50'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{country.flag}</span>
                      <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {country.currency}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate">
                        {isAr ? country.countryAr : country.countryEn}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {country.transitHours}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Country Deep-Dive Dossier */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Logistics & City Hubs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedGCC.flag}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {isAr ? selectedGCC.countryAr : selectedGCC.countryEn}
                      </h3>
                      <div className="text-xs text-orange-400 font-medium">
                        Courier: {selectedGCC.courier} • Transit: {selectedGCC.transitHours}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Currency</div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {selectedGCC.currency}
                    </div>
                  </div>
                </div>

                {/* City Corridors */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Primary Metropolitan Dispatches &amp; City Hubs:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedGCC.primaryCities.map((city, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs">
                        <div className="font-bold text-white mb-0.5">{city.nameEn}</div>
                        <div className="text-slate-400 text-[11px]">{city.hubNote}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Counties & Governorates Covered */}
                {selectedGCC.countyRegions && selectedGCC.countyRegions.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{isAr ? 'المحافظات والأقاليم المشمولة بالتغطية:' : `Provinces, Governorates & County Coverage (${selectedGCC.countryEn}):`}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedGCC.countyRegions.map((region, rIdx) => (
                        <div key={rIdx} className="px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                          <span className="truncate">{region}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Services for this country */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Most Requested Technical Services from {selectedGCC.countryEn}:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedGCC.popularServices.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Strategic Advantage & Instant Dispatch */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                    Why Clients in {selectedGCC.countryEn} Ship to Al Sharq:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedGCC.whyShipToSharjah}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 text-xs space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5 text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Customs &amp; Duty Guarantee</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {selectedGCC.customsNote}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/971507117043?text=${encodeURIComponent(
                      `Hello Al Sharq Sharjah Lab, I am inquiring from ${selectedGCC.countryEn} about insured mail-in repair for my device.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp from {selectedGCC.countryEn}</span>
                  </a>
                  <Link
                    to="/gcc-services"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <span>View Full GCC Mail-In Logistics Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

            {/* GCC Shipping, Transit & Customs Calculator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
                    <Calculator className="w-4 h-4 text-brand-orange" />
                    <span>{isAr ? 'حاسبة الشحن والتكلفة الجمركية التفاعلية' : 'Interactive GCC Courier & Customs Calculator'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isAr ? 'احسب تكلفة ووقت الصيانة لبلدك فوراً' : 'Instant Mail-In Transit & Cost Estimator'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 w-fit">
                  <ShieldCheck className="w-4 h-4" />
                  <span>0% Duty Tariff Code HS 8471/8517</span>
                </div>
              </div>

              {/* Selector Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">
                    {isAr ? 'دولة الإرسال' : 'Origin Country / Territory'}
                  </label>
                  <select
                    value={calcCountryId}
                    onChange={(e) => setCalcCountryId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {GCC_EXTENDED_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.flag} {c.countryEn} ({c.currency})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">
                    {isAr ? 'نوع الجهاز' : 'Device Category'}
                  </label>
                  <select
                    value={calcDevice}
                    onChange={(e) => setCalcDevice(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="macbook">Apple MacBook Pro / Air (Apple Silicon)</option>
                    <option value="iphone">Apple iPhone 18 / 17 / 16 / 15 Pro</option>
                    <option value="samsung">Samsung Galaxy S26 / S25 Ultra / Fold</option>
                    <option value="ipad">iPad Pro / Surface / Corporate Tablet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">
                    {isAr ? 'نوع العطل المطلوب' : 'Target Technical Service'}
                  </label>
                  <select
                    value={calcIssue}
                    onChange={(e) => setCalcIssue(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="logic-board">Level 4 Micro-Soldering (Power IC / PMIC / No Boot)</option>
                    <option value="liquid">Ultrasonic De-Oxidation & Liquid Spill Rescue</option>
                    <option value="data-recovery">Forensic NVMe SSD / Encrypted iOS Data Extraction</option>
                    <option value="screen">Original Display & Ceramic Glass Restoration</option>
                  </select>
                </div>
              </div>

              {/* Live Calculation Output Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center sm:text-left">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Estimated Lab Rate</span>
                  <div className="text-xl sm:text-2xl font-black text-orange-400 mt-1">
                    {currentPriceLocal} {calcCountry.currency}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">(approx AED {currentPriceAED})</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Transit Door-to-Door</span>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                    {calcCountry.transitHours}
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block">{calcCountry.courier}</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Customs Duty Status</span>
                  <div className="text-base sm:text-lg font-bold text-white mt-1">
                    Exempt (0% VAT/Tariff)
                  </div>
                  <span className="text-[10px] text-slate-400 block">Personal Item Repair Declaration</span>
                </div>

                <div className="flex flex-col justify-center">
                  <a
                    href={`https://wa.me/971507117043?text=${encodeURIComponent(
                      `Hello Al Sharq Sharjah Lab! I am in ${calcCountry.countryEn}. I need mail-in repair for my ${calcDevice} (${calcIssue}). The calculator shows approx ${currentPriceLocal} ${calcCountry.currency}. Please issue an airway bill label.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Get Courier Label</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Sharjah & UAE Local Districts Hub */}
        {activeTab === 'sharjah' && (
          <div className="space-y-6">
            
            {/* Search and Address Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-800 via-orange-950/40 to-slate-800 border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Central Lab Facility</span>
                </div>
                <div className="text-base sm:text-lg font-black text-white">
                  BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area, Sharjah
                </div>
                <div className="text-xs text-slate-400">
                  Open Daily: Sat - Thu: 9:00 AM - 11:00 PM | Fri: 4:00 PM - 11:00 PM
                </div>
              </div>

              {/* Search District Input */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter district (e.g. Al Zahia, Aljada, Majaz)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Quick District Suggestion Pills */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{isAr ? 'اقتراحات سريعة للمناطق والأحياء القريبة (انقر للتصفية المباشرة):' : 'Instant Near-Me Location Suggestions (Click to Filter):'}</span>
                </div>
                {searchFilter && (
                  <button
                    onClick={() => setSearchFilter('')}
                    className="text-xs text-brand-orange hover:underline font-bold w-fit"
                  >
                    {isAr ? 'إعادة ضبط وعرض كل المناطق (33)' : 'Reset & Show All (33 Districts)'}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '⚡ Muwaileh Commercial (0m)', filter: 'Muwaileh' },
                  { label: '🎓 University City (AUS/UoS)', filter: 'University City' },
                  { label: '🛍️ Al Zahia & City Centre', filter: 'Al Zahia' },
                  { label: '🏡 Aljada Community', filter: 'Aljada' },
                  { label: '🔬 SRTIP Innovation Park', filter: 'SRTIP' },
                  { label: '🌊 Al Majaz Waterfront', filter: 'Al Majaz' },
                  { label: '🏢 Sahara Centre / Al Nahda', filter: 'Sahara' },
                  { label: '🏖️ Al Taawun & Al Khan', filter: 'Al Taawun' },
                  { label: '🚗 Dubai Border (Al Qusais)', filter: 'Al Qusais' },
                  { label: '💻 Dubai Silicon Oasis', filter: 'Silicon Oasis' },
                  { label: '🏙️ Dubai Downtown & DIFC', filter: 'Downtown' },
                  { label: '🌴 Ajman Downtown & Jurf', filter: 'Ajman' },
                  { label: '🌿 Tilal City & Masaar', filter: 'Tilal' },
                  { label: '✈️ SAIF Airport Free Zone', filter: 'SAIF' },
                  { label: '⚓ Khor Fakkan & Kalba', filter: 'Khor Fakkan' },
                  { label: '🏛️ Abu Dhabi & Al Ain', filter: 'Abu Dhabi' }
                ].map((pill, pIdx) => {
                  const isActive = searchFilter.toLowerCase() === pill.filter.toLowerCase();
                  return (
                    <button
                      key={pIdx}
                      onClick={() => setSearchFilter(isActive ? '' : pill.filter)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all border ${
                        isActive
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold shadow-sm'
                          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Districts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDistricts.map((item, dIdx) => (
                <div 
                  key={dIdx} 
                  className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-brand-orange/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-white">{item.districtEn}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        {item.driveTimeMin}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-brand-orange mb-2">
                      {item.serviceType}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.highlight}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                    <a
                      href={`https://wa.me/971507117043?text=${encodeURIComponent(
                        `Hello Al Sharq Mobile, I need pickup or directions from ${item.districtEn}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Request Pickup</span>
                    </a>
                    <a
                      href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Directions</span>
                      <Navigation className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Doorstep Van Pickup Callout */}
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-0.5">
                  Doorstep Pickup Available
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  Can't visit our Muwaileh workshop during busy hours?
                </div>
                <div className="text-xs text-slate-400">
                  We send our insured courier van to pick up your phone or laptop anywhere in Sharjah, Ajman, or Dubai within 90 minutes.
                </div>
              </div>
              <a
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20would%20like%20to%20book%20a%20doorstep%20courier%20pickup%20in%20Sharjah."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-lg transition-all"
              >
                Book Doorstep Pickup
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
