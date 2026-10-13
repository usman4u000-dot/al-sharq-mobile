import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  Tablet, 
  Shield, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Wrench, 
  ArrowRight, 
  Zap, 
  Truck, 
  HelpCircle,
  MapPin,
  Clock,
  Filter,
  Layers,
  Cpu,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import UAEDirhamSymbol from '../components/UAEDirhamSymbol';
import { useLanguage } from '../contexts/LanguageContext';
import { BUSINESS_PROVIDER_SCHEMA } from '../data/businessInfo';

interface TabletAccessoriesPageProps {
  onBookNow: (serviceName?: string) => void;
}

interface AccessoryItem {
  id: string;
  name: string;
  category: 'cases' | 'screen-protection' | 'stylus' | 'chargers' | 'keyboards' | 'stands';
  categoryLabel: string;
  compatibleWith: string;
  priceAED: number;
  originalPriceAED: number;
  rating: number;
  reviewsCount: number;
  tag: string;
  image: string;
  features: string[];
  inStock: boolean;
}

export default function TabletAccessoriesPage({ onBookNow }: TabletAccessoriesPageProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const accessoriesList: AccessoryItem[] = [
    {
      id: 'eva-kids-case',
      name: 'Shockproof Kids EVA Foam Case with Handle & Kickstand',
      category: 'cases',
      categoryLabel: 'Shockproof Cases',
      compatibleWith: 'iPad 10th Gen, iPad 9th/8th, Galaxy Tab A9/A8, Lenovo M10',
      priceAED: 45,
      originalPriceAED: 79,
      rating: 5.0,
      reviewsCount: 142,
      tag: 'Best Seller for Kids',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
      features: ['Drop-tested from 2 meters', 'Non-toxic kid-safe EVA material', 'Convertible handle stand', 'Precise port cutouts'],
      inStock: true
    },
    {
      id: 'tempered-glass-ipad',
      name: '9H Military-Grade Ultra-Clear Tempered Glass Protector',
      category: 'screen-protection',
      categoryLabel: 'Screen Protectors',
      compatibleWith: 'iPad Pro 13"/11", iPad Air 13"/11", iPad 10th/9th Gen, Galaxy Tab S10/S9',
      priceAED: 35,
      originalPriceAED: 65,
      rating: 4.9,
      reviewsCount: 280,
      tag: 'Free Installation Included',
      image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800',
      features: ['0.33mm ultra-thin with 9H hardness', 'Oleophobic anti-fingerprint coating', 'Zero touch latency', 'Free bubble-free fitting in store'],
      inStock: true
    },
    {
      id: 'paperfeel-artist-film',
      name: 'Paper-Feel Matte Screen Film for Drawing & Note-Taking',
      category: 'screen-protection',
      categoryLabel: 'Screen Protectors',
      compatibleWith: 'iPad Pro (M4/M2), iPad Air (M2), Galaxy Tab S9/S10 Series',
      priceAED: 49,
      originalPriceAED: 89,
      rating: 5.0,
      reviewsCount: 95,
      tag: 'Artists & Students Pick',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800',
      features: ['Natural pencil-on-paper friction', 'Anti-glare anti-reflective finish', 'Protects Apple Pencil nibs', 'Ideal for Procreate & GoodNotes'],
      inStock: true
    },
    {
      id: 'smart-magic-keyboard',
      name: 'Magnetic Smart Magic Keyboard Folio with Multi-Touch Trackpad',
      category: 'keyboards',
      categoryLabel: 'Smart Keyboards',
      compatibleWith: 'iPad Pro 11"/13", iPad Air 11"/13" (M2/M4/M1)',
      priceAED: 199,
      originalPriceAED: 399,
      rating: 4.9,
      reviewsCount: 68,
      tag: '50% Below Apple Store',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
      features: ['Cantilever magnetic floating hinge', '7-Color backlit scissor keys', 'Smooth glass trackpad with gestures', 'Type-C pass-through charging'],
      inStock: true
    },
    {
      id: 'palm-rejection-stylus',
      name: 'Active Stylus Pen with Palm Rejection & Tilt Sensitivity',
      category: 'stylus',
      categoryLabel: 'Stylus & Tips',
      compatibleWith: 'All iPads 2018-2026, Galaxy Tab, Huawei MatePad',
      priceAED: 69,
      originalPriceAED: 149,
      rating: 4.9,
      reviewsCount: 114,
      tag: 'Apple Pencil Alternative',
      image: 'https://images.unsplash.com/photo-1585792180666-f75a7c6fe29b?auto=format&fit=crop&q=80&w=800',
      features: ['Pixel-perfect precision without lag', 'Magnetic wireless / Type-C charging', 'Tilt sensitivity for shading', '3 extra replacement nibs included'],
      inStock: true
    },
    {
      id: 'apple-pencil-tips-pack',
      name: 'OEM Fine Point Replacement Nibs Pack for Apple Pencil (4-Pack)',
      category: 'stylus',
      categoryLabel: 'Stylus & Tips',
      compatibleWith: 'Apple Pencil Pro, Apple Pencil USB-C, Apple Pencil 1st & 2nd Gen',
      priceAED: 30,
      originalPriceAED: 60,
      rating: 5.0,
      reviewsCount: 88,
      tag: 'Genuine Feel Pack',
      image: 'https://images.unsplash.com/photo-1585792180666-f75a7c6fe29b?auto=format&fit=crop&q=80&w=800',
      features: ['Wear-resistant copper & polymer tip', 'Smooth silent gliding on glass', 'Zero delay pressure response', 'Easy twist-on installation'],
      inStock: true
    },
    {
      id: 'gan-fast-charger-65w',
      name: '65W GaN Dual USB-C + USB-A Super Fast Tablet Charger',
      category: 'chargers',
      categoryLabel: 'Chargers & Cables',
      compatibleWith: 'iPad Pro/Air, Galaxy Tab S9/S10, Surface Pro, MacBook Air',
      priceAED: 59,
      originalPriceAED: 110,
      rating: 5.0,
      reviewsCount: 172,
      tag: 'Ultra-Compact GaN',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      features: ['Charges iPad Pro to 70% in 40 mins', 'Thermal protection against UAE heat', 'Dual port simultaneous charging', 'UAE 3-pin safety certified'],
      inStock: true
    },
    {
      id: 'braided-typec-cable-2m',
      name: 'Heavy-Duty 100W 2-Meter Braided USB-C to USB-C Cable',
      category: 'chargers',
      categoryLabel: 'Chargers & Cables',
      compatibleWith: 'All Type-C Tablets, iPads, Laptops & Phones',
      priceAED: 25,
      originalPriceAED: 49,
      rating: 4.8,
      reviewsCount: 210,
      tag: 'Unbreakable Nylon',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      features: ['10,000+ bend lifespan test', 'E-Marker chip for stable 100W PD', 'Tangle-free military nylon braid', '480Mbps fast data sync'],
      inStock: true
    },
    {
      id: 'aluminum-desk-stand',
      name: '360° Rotating Aluminum Tablet Desk Stand for Study & POS',
      category: 'stands',
      categoryLabel: 'Stands & Mounts',
      compatibleWith: 'Tablets 7" to 14.6" (iPad Mini to Tab S10 Ultra)',
      priceAED: 55,
      originalPriceAED: 99,
      rating: 4.9,
      reviewsCount: 76,
      tag: 'Ergonomic Choice',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
      features: ['Heavy weighted anti-slip base', 'Dual-axis height & angle adjustment', 'Cable routing cutouts', 'Folds flat for backpack travel'],
      inStock: true
    }
  ];

  const filteredAccessories = selectedCategory === 'all'
    ? accessoriesList
    : accessoriesList.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: isAr ? 'جميع الملحقات' : 'All Accessories' },
    { id: 'cases', label: isAr ? 'كفرات وحماية ضد الصدمات' : 'Shockproof Cases' },
    { id: 'screen-protection', label: isAr ? 'حماية الشاشة وزجاج 9H' : 'Screen Protectors' },
    { id: 'stylus', label: isAr ? 'أقلام ذكية ورؤوس بديلة' : 'Stylus Pens & Nibs' },
    { id: 'keyboards', label: isAr ? 'لوحات مفاتيح مغناطيسية' : 'Smart Keyboards' },
    { id: 'chargers', label: isAr ? 'شواحن سريعة وكابلات' : 'Fast Chargers & Cables' },
    { id: 'stands', label: isAr ? 'حوامل مكتبية وقواعد' : 'Desk Stands' },
  ];

  const tabletAccessoriesFaqs = [
    {
      q: "Where can I buy iPad and tablet accessories in Muwaileh, Sharjah?",
      qAr: "أين يمكنني شراء ملحقات الآيباد والتابلت في مويلح، الشارقة؟",
      a: "You can purchase high-quality tablet accessories at Al Sharq Mobile Phone & Computer Trading LLC, located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Industrial Area, Sharjah. We offer wholesale and retail pricing with huge savings compared to shopping malls, located just 5 minutes from Sharjah University City.",
      aAr: "يمكنك شراء أفضل ملحقات الأجهزة اللوحية من الشرق للهواتف والكمبيوتر في شارع مركز الدفاع المدني بمويلح، الشارقة (بالقرب من المدينة الجامعية)، بأسعار الجملة والتجزئة المباشرة."
    },
    {
      q: "Do you install tablet tempered glass screen protectors for free in your shop?",
      qAr: "هل تقومون بتركيب حماية الشاشة للتابلت مجاناً في المحل؟",
      a: "Yes! Every tablet screen protector purchased at our Sharjah workshop includes 100% free professional installation by certified technicians. We apply it in a dust-controlled station ensuring zero bubbles, perfect alignment, and edge-to-edge touch responsiveness.",
      aAr: "نعم، يشمل كل واقي شاشة تشتريه من محلنا في الشارقة تركيباً احترافياً مجانياً بدون أي فقاعات هواء وبدقة متناهية."
    },
    {
      q: "Do you stock shockproof cases for kids' school iPads and Lenovo tablets?",
      qAr: "هل يتوفر لديكم كفرات قوية ضد السقوط لأجهزة الأطفال والمدارس؟",
      a: "Yes, we stock high-density EVA foam and dual-layer armor cases designed specifically for kids and students. These feature heavy-duty shock absorption, built-in handles, kickstands, and Apple Pencil holders for iPad 10th/9th Gen, Galaxy Tab A9/A8, and Lenovo Tab series.",
      aAr: "نعم، لدينا كفرات رغوية سميكة ومقاومة للصدمات مخصصة للأطفال وطلاب المدارس لحماية الآيباد وأجهزة سامسونج ولينوفو من السقوط القوي."
    },
    {
      q: "Can I find Apple Pencil replacement tips and active styluses at your store?",
      qAr: "هل تتوفر لديكم رؤوس بديلة لقلم آبل (Apple Pencil) وأقلام ذكية؟",
      a: "Yes, we sell fine-point OEM replacement nibs compatible with Apple Pencil Pro, USB-C, 1st & 2nd Gen, as well as Samsung S-Pen nibs. We also offer active palm-rejection stylus pens that work flawlessly on all modern iPad and Android tablets at half the official price.",
      aAr: "نعم، يتوفر لدينا رؤوس قلم آبل الأصلية وحزم الرؤوس الدقيقة، بالإضافة إلى أقلام لمس ذكية تدعم عزل راحة اليد وحساسية الميل وبأسعار مناسبة جداً."
    },
    {
      q: "Are tablet prices cheaper at your Muwaileh store than city shopping malls?",
      qAr: "هل أسعار ملحقات التابلت لديكم أرخص من المولات؟",
      a: "Yes, our tablet accessories and devices are priced 20% to 40% below typical shopping mall retail stores because we source factory-direct port batches with low operational overheads, passing the savings directly to customers and university students.",
      aAr: "نعم، أسعارنا أقل بنسبة 20% إلى 40% مقارنة بالمولات الكبرى لأننا نستورد مباشرة من الموانئ بدون تكاليف تشغيلية مبالغ فيها."
    },
    {
      q: "What if my tablet screen is already cracked or broken?",
      qAr: "ماذا لو كانت شاشة جهازي اللوحي مكسورة بالفعل؟",
      a: "We provide same-day tablet and iPad screen replacements, battery renewals, and charging port repairs in only 20 to 45 minutes right in our Muwaileh lab. All hardware repairs include our standard 90-day warranty.",
      aAr: "نقدم خدمة استبدال شاشات الآيباد والتابلت وصيانة البطاريات في نفس اليوم خلال 20 إلى 45 دقيقة مع ضمان معتمد لمدة 90 يوماً."
    }
  ];

  const handleWhatsAppInquiry = (accessoryName: string, price: number) => {
    const text = `Hello Al Sharq Mobile, I am interested in purchasing "${accessoryName}" (AED ${price}) from your Tablet Accessories page. Is it available in stock today?`;
    const url = `https://wa.me/971507117043?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tablet & iPad Accessories in Sharjah | Al Sharq Mobile",
    "description": "Premium tablet and iPad accessories in Sharjah. Heavy-duty kids cases, 9H tempered glass, Apple Pencil tips, smart keyboards and fast chargers at wholesale prices in Muwaileh.",
    "url": "https://allsharq.com/product-category/tablet-accessories/",
    "provider": BUSINESS_PROVIDER_SCHEMA,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": accessoriesList.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": item.name,
          "category": item.categoryLabel,
          "description": `${item.name} compatible with ${item.compatibleWith}. Features: ${item.features.join(', ')}.`,
          "image": item.image,
          "offers": {
            "@type": "Offer",
            "price": item.priceAED,
            "priceCurrency": "AED",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "seller": {
              "@type": "LocalBusiness",
              "name": "Al Sharq Mobile Phone & Computer Trading LLC"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": item.rating,
            "reviewCount": item.reviewsCount,
            "bestRating": "5"
          }
        }
      }))
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tabletAccessoriesFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Tablet & iPad Accessories Sharjah | Heavy-Duty Cases, Glass & Stylus | Al Sharq</title>
        <meta 
          name="description" 
          content="Buy tablet & iPad accessories in Sharjah: shockproof kids cases, 9H tempered glass, Apple Pencil tips, smart keyboards & 65W GaN chargers at direct wholesale prices in Muwaileh." 
        />
        <meta name="keywords" content="tablet accessories sharjah, ipad accessories sharjah, ipad cases muwaileh, tablet screen protectors sharjah, apple pencil tips sharjah, samsung tab cover uae, shockproof kids tablet case, tablet chargers sharjah" />
        <link rel="canonical" href="https://allsharq.com/product-category/tablet-accessories/" />
        
        {/* OpenGraph Social Card */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tablet & iPad Accessories in Sharjah | Al Sharq Mobile" />
        <meta property="og:description" content="Shop premium tablet and iPad accessories: heavy-duty cases, screen protectors with free installation, stylus pens, smart keyboards and fast chargers in Muwaileh, Sharjah." />
        <meta property="og:url" content="https://allsharq.com/product-category/tablet-accessories/" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tablet & iPad Accessories Sharjah | Al Sharq" />
        <meta name="twitter:description" content="Save 20-40% on tablet accessories in Sharjah: iPad cases, tempered glass, Apple Pencil tips & GaN chargers." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200" />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div className="pt-20 sm:pt-24 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumbs 
            items={[
              { label: 'Shop', path: '/shop' },
              { label: 'Tablet & iPad Accessories' }
            ]} 
          />

          {/* Hero Header Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-blue to-slate-950 text-white p-6 sm:p-10 lg:p-12 mb-10 shadow-2xl border border-white/10">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'مركز ملحقات التابلت والآيباد في الشارقة' : 'Sharjah Tablet & iPad Accessories Hub'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {isAr ? (
                  <>ملحقات التابلت والآيباد في الشارقة <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">كفرات صدمات، زجاج 9H، أقلام وشواحن سريعة</span></>
                ) : (
                  <>Premium Tablet &amp; iPad Accessories <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Heavy-Duty Cases, Glass, Styluses &amp; Fast Docks</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {isAr 
                  ? 'تسوق أرقى إكسسوارات الأجهزة اللوحية بأسعار الجملة المباشرة في مويلح، الشارقة. حماية كاملة للأطفال وطلاب الجامعات، واقيات شاشة أصلية مع تركيب مجاني فوري في المحل، وأقلام ذكية تدعم أدق التفاصيل.'
                  : 'Factory-direct wholesale & retail tablet accessories on Fire Station Road, Muwaileh. Heavy-duty kids shockproof cases, 9H tempered glass with FREE bubble-free installation, active styluses, Apple Pencil replacement nibs, and smart magic keyboards 20-40% below shopping mall retail.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20am%20inquiring%20about%20Tablet%20and%20iPad%20Accessories%20in%20Sharjah."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'استفسر عبر واتساب' : 'WhatsApp Price Inquiry'}</span>
                </a>

                <a
                  href="tel:+971507117043"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+971 50 711 7043</span>
                </a>

                <Link
                  to="/tablet-repair"
                  className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{isAr ? 'شاشتك مكسورة؟ صيانة فورية ←' : 'Need Screen Repair? Click Here →'}</span>
                </Link>
              </div>

              {/* Value Badges */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free In-Store Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>20% to 40% Below Malls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Open Daily till 11 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>15% Student Discount</span>
                </div>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
              <Tablet className="w-96 h-96 text-white" />
            </div>
          </section>

          {/* Quick Cross-Link Notice: Broken Screen / Battery Repair */}
          <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isAr ? 'هل تعاني من كسر في شاشة الآيباد أو انتفاخ البطارية؟' : 'Looking for Tablet Screen Replacement or Battery Repair?'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isAr 
                    ? 'نوفر صيانة فورية لكافة أجهزة آيباد وسامسونج تاب ولينوفو خلال 25 دقيقة مع ضمان 90 يوماً.'
                    : 'Our Muwaileh lab repairs cracked iPad touch screens, bloated batteries, and damaged charging ports in 25-45 minutes.'}
                </p>
              </div>
            </div>
            <Link
              to="/tablet-repair"
              className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
            >
              <span>{isAr ? 'عرض خدمات إصلاح التابلت' : 'View Tablet Repair Hub'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isAr ? 'تصفية حسب نوع الملحق:' : 'Filter by Accessory Type:'}
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-orange text-white shadow-md shadow-orange-950/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-brand-orange'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredAccessories.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-orange/40 transition-all flex flex-col group"
              >
                {/* Product Header / Badges */}
                <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-brand-orange border border-orange-200 dark:border-orange-800">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-[11px] text-slate-400">({item.reviewsCount})</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] backdrop-blur-xs font-semibold">
                    {item.categoryLabel}
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5 leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-tight font-medium">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Compatible: </span>
                      {item.compatibleWith}
                    </p>

                    {/* Features Bullet List */}
                    <ul className="space-y-1 mb-4 text-xs text-slate-600 dark:text-slate-300">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and WhatsApp Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-brand-orange">
                          AED {item.priceAED}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          AED {item.originalPriceAED}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Save AED {item.originalPriceAED - item.priceAED} (Wholesale)
                      </span>
                    </div>

                    <button
                      onClick={() => handleWhatsAppInquiry(item.name, item.priceAED)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#25D366] hover:text-white text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                      title="Reserve on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{isAr ? 'طلب' : 'Reserve'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Free In-Store Screen Fitting Guarantee */}
          <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-16 border border-emerald-500/30 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Free Professional Installation Service</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-2">
                  Never Worry About Bubbles or Misaligned Glass Again
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Installing a large 11" or 13" iPad screen protector at home usually traps dust and air bubbles. When you purchase any tempered glass or paper-feel protector at Al Sharq Mobile in Muwaileh, our technician cleans the screen with optical de-greaser and applies it with laser alignment tools inside our dust-controlled workbench — completely free of charge.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                <p className="text-xs text-slate-400 mb-1">Muwaileh Workshop Location</p>
                <p className="font-extrabold text-sm text-white mb-2">BLDG#1017 Fire Station Road, Sharjah</p>
                <a
                  href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions (FAQ) Section for Search Snippets */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-brand-orange text-xs font-bold mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {isAr ? 'الأسئلة الشائعة حول ملحقات التابلت' : 'Tablet & iPad Accessories FAQ'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Everything you need to know about compatibility, pricing, and warranties in Sharjah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {tabletAccessoriesFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="text-brand-orange font-black">Q:</span>
                    <span>{isAr ? faq.qAr : faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pl-5">
                    {isAr ? faq.aAr : faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking & Related Repair Specialties */}
          <section className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-4">
              Explore Related Hardware Services &amp; Tech Hubs in Sharjah:
            </h2>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <Link 
                to="/tablet-repair" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                iPad &amp; Tablet Repair Sharjah (Screen &amp; Battery)
              </Link>
              <Link 
                to="/screen-protector" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                9H Tempered Glass Screen Protectors
              </Link>
              <Link 
                to="/shop" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                Direct Port Wholesale Electronics Shop
              </Link>
              <Link 
                to="/iphone-repair" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                iPhone Screen &amp; Battery Replacement
              </Link>
              <Link 
                to="/macbook-repair" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                MacBook Logic Board &amp; Screen Repair
              </Link>
              <Link 
                to="/students" 
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 font-bold transition-all"
              >
                15% University Student Discount (AUS &amp; UoS)
              </Link>
              <Link 
                to="/estimate" 
                className="px-3.5 py-2 rounded-xl bg-brand-orange text-white font-bold transition-all"
              >
                Instant Repair Cost Estimator →
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
