import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Smartphone,
  Tablet,
  Laptop,
  Compass,
  FileCode,
  Globe2
} from 'lucide-react';

interface IndexedPageItem {
  title: string;
  url: string;
  category: string;
  badge: string;
  description: string;
  priority: string;
  updatedDate: string;
  isNew?: boolean;
}

export default function RapidPageIndexingHub() {
  const newlyIndexedPages: IndexedPageItem[] = [
    {
      title: 'Google Trends UAE Hardware Failures & Lab Diagnostics',
      url: '/blog/google-trends-uae-hardware-device-failures-sharjah-guide',
      category: 'Market Intelligence & QDF',
      badge: 'Breakout +5000%',
      description: 'Real-time analysis of heat degradation, tile drops, and charger damage across Dubai and Sharjah.',
      priority: '0.95',
      updatedDate: 'October 16, 2026',
      isNew: true
    },
    {
      title: 'Tablet & iPad Accessories Protection Hub Sharjah',
      url: '/product-category/tablet-accessories',
      category: 'E-Commerce & Protection',
      badge: 'High Intent',
      description: 'Shockproof drop cases, paper-feel screen films, and stylus tips tested against ceramic tiles.',
      priority: '0.90',
      updatedDate: 'October 16, 2026',
      isNew: true
    },
    {
      title: 'Logic Board SMD Micro-Soldering Laboratory',
      url: '/logic-board-repair',
      category: 'Hardware Engineering',
      badge: 'Level 4 Lab',
      description: 'Chip-level repair for dead motherboards, shorted power ICs, and failed audio chips in Muwaileh.',
      priority: '0.90',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Emergency Water Damage Chemical Dehydration Lab',
      url: '/water-damage-repair',
      category: 'Emergency First-Aid',
      badge: '20-Min Intake',
      description: 'Ultrasonic mineral descaling and microscopic corrosion cleaning for liquid-submerged devices.',
      priority: '0.90',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Instant 3-Click Device Repair Price Estimator',
      url: '/estimate',
      category: 'Interactive Tools',
      badge: 'Instant Quote',
      description: 'Transparent pricing comparison with mall retail centers for screens, batteries, and charging ports.',
      priority: '0.85',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Live Digital Job Card & Workbench Status Tracker',
      url: '/track-repair',
      category: 'Client Portal',
      badge: 'Real-Time Telemetry',
      description: 'Check microscope diagnostic logs, technician notes, and device pickup readiness live.',
      priority: '0.85',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'GCC Regional Express Mail-In Repair (Saudi & Oman)',
      url: '/gcc-services',
      category: 'Regional Logistics',
      badge: 'KSA • OMN • QAT',
      description: 'Express door-to-door mail-in service for advanced motherboards across Riyadh, Jeddah, and Muscat.',
      priority: '0.95',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'University City Student & Faculty Tech Pass',
      url: '/students',
      category: 'Local Community Hub',
      badge: '15% Off Pass',
      description: 'Fast-track screen and battery replacements for students of University of Sharjah and AUS.',
      priority: '0.85',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Cleanroom NAND Flash Forensic Data Recovery',
      url: '/data-recovery',
      category: 'Data Security',
      badge: 'Zero-Leak Protocol',
      description: 'Direct chip-off memory extraction for unbootable iPhones, waterlogged laptops, and broken SSDs.',
      priority: '0.90',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Precision UV Tempered Glass & Privacy Protectors',
      url: '/screen-protector',
      category: 'Screen Protection',
      badge: 'Curved Screen Fit',
      description: 'Bubble-free UV curved glass installation and anti-peep 28° privacy filters for flagships.',
      priority: '0.90',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Interactive 9-Point Hardware Diagnostic Tool',
      url: '/hardware-test',
      category: 'Diagnostic Suite',
      badge: 'Self-Test',
      description: 'Test display touch matrix, speakers, vibration motor, and charging draw before workbench check-in.',
      priority: '0.85',
      updatedDate: 'October 16, 2026'
    },
    {
      title: 'Corporate B2B Fleet Maintenance & IT AMC Sharjah',
      url: '/corporate',
      category: 'Enterprise Services',
      badge: 'B2B Fleet',
      description: 'Dedicated account maintenance for corporate laptops, MacBooks, and staff mobile devices.',
      priority: '0.85',
      updatedDate: 'October 16, 2026'
    }
  ];

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Rapid Indexing &amp; High-Authority Page Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Recently Added Service Hubs &amp; Direct Indexing Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Direct homepage links to our newest service pages, hardware diagnostic modules, and technical guides for instant Googlebot discovery and zero-depth indexing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>296 URLs Verified in Sitemap</span>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newlyIndexedPages.map((page, idx) => (
            <Link
              key={idx}
              to={page.url}
              className="group p-5 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-750 hover:border-brand-orange/50 dark:hover:border-brand-orange/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-[120px]">
                    {page.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    page.isNew 
                      ? 'bg-brand-orange text-white' 
                      : 'bg-slate-150 dark:bg-slate-750 text-slate-700 dark:text-slate-300'
                  }`}>
                    {page.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors line-clamp-2 mb-2 leading-snug">
                  {page.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {page.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono text-[10px]">
                  Priority {page.priority}
                </span>
                <span className="text-brand-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Visit Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Googlebot Crawler Assistance Badge */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-brand-orange" />
            <span>Structured Data Verified: <strong>@type: Service</strong> &amp; <strong>@type: LocalBusiness</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Last Sitemap Update: <strong className="text-slate-700 dark:text-slate-300">October 16, 2026</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
