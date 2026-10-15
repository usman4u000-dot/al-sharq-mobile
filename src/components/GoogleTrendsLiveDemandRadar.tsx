import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Flame, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  AlertTriangle,
  GraduationCap,
  Cpu,
  Droplets,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UAE_TRENDING_QUERIES, getCurrentSeasonalTrend, TrendingQuery } from '../services/googleTrendsService';

export default function GoogleTrendsLiveDemandRadar() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<'all' | 'breakout' | 'seasonal' | 'student' | 'hardware'>('all');
  const [selectedQueryId, setSelectedQueryId] = useState<string>(UAE_TRENDING_QUERIES[0]?.id || '');
  const [livePulse, setLivePulse] = useState(true);

  const seasonalTrend = getCurrentSeasonalTrend();

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const filteredQueries = activeCategory === 'all' 
    ? UAE_TRENDING_QUERIES 
    : UAE_TRENDING_QUERIES.filter(q => q.category === activeCategory);

  const selectedQuery = UAE_TRENDING_QUERIES.find(q => q.id === selectedQueryId) || filteredQueries[0] || UAE_TRENDING_QUERIES[0];

  const handleWhatsAppAction = (query: TrendingQuery) => {
    const phone = '971507117043';
    const msg = isAr
      ? `مرحباً الشارق، رأيت مؤشر الطلب المتصاعد في جوجل بخصوص: "${query.queryAr}". هل القطعة / الخدمة متوفرة فوراً بسعر ${query.priceAED} درهم؟`
      : `Hello Al Sharq, I saw the Google Trends alert for: "${query.queryEn}". Is this available for same-day service at AED ${query.priceAED}?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Structured Data Schema for Google QDF (Query Deserved Freshness) & AI Overviews
  const qdfSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "UAE Real-Time Google Trends Hardware & Device Repair Demand Index",
    "description": "Live verified breakout search queries and micro-climate device failure benchmarks across Sharjah, Dubai, and UAE.",
    "numberOfItems": UAE_TRENDING_QUERIES.length,
    "itemListElement": UAE_TRENDING_QUERIES.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": item.queryEn,
        "alternateName": item.queryAr,
        "description": item.issueDiagnosis,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC",
          "telephone": "+971507117043",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Muwaileh Commercial Area",
            "addressLocality": "Sharjah",
            "addressCountry": "AE"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": item.priceAED,
          "priceCurrency": "AED",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative my-8">
      {/* Dynamic Structured Data for Search Engine Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qdfSchema) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-b border-slate-800/80 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className={`w-3.5 h-3.5 rounded-full block transition-colors duration-500 ${livePulse ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
              <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-orange/20 text-brand-orange border border-brand-orange/30 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Google Trends UAE Radar
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {isAr ? 'بيانات البحث المباشرة بالشارقة ودبي' : 'Sharjah & Dubai Real-Time Hardware Velocity'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1">
                {isAr ? 'مؤشر جوجل لطلبات الصيانة وقطع الغيار المتصاعدة' : 'Real-Time UAE Hardware Trends & Breakout Demands'}
              </h2>
            </div>
          </div>

          {/* Seasonal Alert Badge */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3 flex items-center gap-3 max-w-md">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {isAr ? seasonalTrend.titleAr : seasonalTrend.titleEn}
              </p>
              <p className="text-xs text-slate-300 mt-0.5 leading-tight">
                {isAr ? seasonalTrend.alertAr : seasonalTrend.alertEn}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'all', labelEn: 'All Breakouts', labelAr: 'كل الطلبات الصاعدة', icon: Sparkles },
            { id: 'breakout', labelEn: 'Breakout (+5,000%)', labelAr: 'طفرات قياسية', icon: Flame },
            { id: 'student', labelEn: 'University City', labelAr: 'المدينة الجامعية', icon: GraduationCap },
            { id: 'seasonal', labelEn: 'Climate & Heat', labelAr: 'المناخ والحرارة', icon: Droplets },
            { id: 'hardware', labelEn: 'Micro-Soldering', labelAr: 'صيانة البورد المتقدمة', icon: Cpu },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Trend List, Right Deep Workbench Solution Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800 relative z-10">
        {/* Left Column: Trending Query Cards */}
        <div className="lg:col-span-5 p-4 sm:p-6 space-y-3 max-h-[520px] overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{isAr ? 'الاستفسارات الأكثر بحثاً هذا الأسبوع' : 'Top Trending Queries This Week'}</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              {isAr ? 'محدث تلقائياً' : 'Auto-Refreshed'}
            </span>
          </p>

          {filteredQueries.map((item) => {
            const isSelected = item.id === selectedQuery.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedQueryId(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-slate-800 to-slate-800/70 border-brand-orange/60 shadow-md ring-1 ring-brand-orange/40'
                    : 'bg-slate-850/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.growthTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Score:</span>
                    <span className="font-extrabold text-white">{item.interestIndex}/100</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {isAr ? item.queryAr : item.queryEn}
                </h3>

                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {item.affectedDevices}
                </p>

                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
                  <span className="text-emerald-400 font-bold">
                    AED {item.priceAED}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {item.timeEstimate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Trend Workbench Diagnosis & Direct Solution */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/40">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {isAr ? selectedQuery.categoryLabelAr : selectedQuery.categoryLabelEn}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{isAr ? 'مؤشر الاهتمام:' : 'Search Velocity:'}</span>
                <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-brand-orange h-full rounded-full transition-all duration-500" 
                    style={{ width: `${selectedQuery.interestIndex}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white">{selectedQuery.interestIndex}%</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {isAr ? selectedQuery.queryAr : selectedQuery.queryEn}
            </h3>

            {/* Affected Hardware Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {isAr ? 'الأجهزة المتأثرة بهذه المشكلة في الإمارات' : 'Affected Hardware in UAE'}
                </p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">
                  {selectedQuery.affectedDevices}
                </p>
              </div>
            </div>

            {/* Deep Technical Workbench Diagnosis */}
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {isAr ? 'التشخيص الهندسي لسبب العطل' : 'Technical Root Cause Analysis'}
                </h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {selectedQuery.issueDiagnosis}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isAr ? 'الحل الفعلي المعتمد في ورشة مويلح' : 'Certified Workbench Protocol & Fix'}
                </h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {selectedQuery.benchSolution}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing, In-Stock Guarantee & Immediate WhatsApp Dispatch */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">{isAr ? 'التكلفة الشفافة' : 'Fixed Cost'}</span>
                <span className="text-lg font-black text-white">AED {selectedQuery.priceAED}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">{isAr ? 'زمن الإنجاز' : 'Turnaround'}</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedQuery.timeEstimate}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block">{isAr ? 'توفر القطعة' : 'Muwaileh Stock'}</span>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  {isAr ? 'متوفر فوراً' : 'In-Stock Today'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleWhatsAppAction(selectedQuery)}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isAr ? 'حجز القطعة / الصيانة عبر واتساب' : 'Reserve on WhatsApp Immediately'}</span>
              </button>

              <a
                href={selectedQuery.targetUrl}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{isAr ? 'تفاصيل الخدمة' : 'View Service'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
              📍 {isAr 
                ? 'ورشة الشرق للتقنية - مويلح الصناعية، الشارقة. بالقرب من محطة الإطفاء والمدينة الجامعية.'
                : 'Al Sharq Technology Lab: Muwaileh Industrial Area, Sharjah. 5 minutes from University City.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
