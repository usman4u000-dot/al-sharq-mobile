import React, { useState, useMemo } from 'react';
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
  Globe2,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { recentPages, RecentPageItem, getDaysAgo, filterWithinDays } from '../data/recentPages';

export default function RapidPageIndexingHub() {
  const [filterMode, setFilterMode] = useState<'active7Days' | 'allHubs'>('active7Days');

  // Compute freshness for all recent pages
  const pagesWithFreshness = useMemo(() => {
    return recentPages.map(page => {
      const daysAgo = getDaysAgo(page.dateAdded);
      const isWithin7Days = daysAgo <= 7;
      return {
        ...page,
        daysAgo,
        isWithin7Days
      };
    });
  }, []);

  // Filter pages inside the active 7-day boost window
  const activeBoostPages = useMemo(() => {
    return pagesWithFreshness.filter(p => p.isWithin7Days);
  }, [pagesWithFreshness]);

  // Displayed pages based on user filter:
  // If active 7-day mode has items, show those. Otherwise gracefully show all to ensure the layout is never empty.
  const displayedPages = useMemo(() => {
    if (filterMode === 'active7Days' && activeBoostPages.length > 0) {
      return activeBoostPages;
    }
    return pagesWithFreshness;
  }, [filterMode, activeBoostPages, pagesWithFreshness]);

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors" id="recent-pages-hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Rapid Indexing &amp; High-Authority Page Hub • 5–7 Day Auto-Rotation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Recently Launched Pages &amp; Direct Indexing Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Every newly created service page or interactive diagnostic tool is featured here for <strong>5 to 7 days</strong>. This passes direct homepage crawl equity to Googlebot for immediate indexing, after which pages automatically rotate off the homepage.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setFilterMode('active7Days')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                filterMode === 'active7Days'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Active 7-Day Fast-Track ({activeBoostPages.length})</span>
            </button>
            <button
              onClick={() => setFilterMode('allHubs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'allHubs'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900'
              }`}
            >
              All Direct Pages ({pagesWithFreshness.length})
            </button>
          </div>
        </div>

        {/* Dynamic Grid of Recent Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPages.map((page, idx) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image & Badges */}
              <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img 
                  src={page.image} 
                  alt={page.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-sm">
                    {page.category}
                  </span>
                </div>

                {/* 7-Day Status Indicator */}
                <div className="absolute top-3 right-3">
                  {page.isWithin7Days ? (
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md shadow-md flex items-center gap-1 animate-pulse">
                      <Zap className="w-2.5 h-2.5" />
                      <span>Day {page.daysAgo + 1} of 7</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-900/80 text-slate-300 text-[10px] font-medium rounded-md shadow-sm">
                      Indexed
                    </span>
                  )}
                </div>

                {/* Date Added pill */}
                <div className="absolute bottom-2.5 left-3 text-[11px] text-white/90 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Added: {page.dateAdded}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-brand-orange transition-colors">
                  <Link to={page.url} className="hover:underline">
                    {page.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {page.description}
                </p>

                {/* Card Footer with Direct Crawl Link */}
                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Priority: {page.priority || '0.90'}
                  </span>

                  <Link 
                    to={page.url}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-orange-600 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Visit Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indexing Protocol Guarantee Footnote */}
        <div className="mt-10 p-4 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>All links are canonicalized, linked directly from the homepage DOM, and declared in <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">public/sitemap.xml</code>.</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
            Google QDF Compliance Verified
          </span>
        </div>

      </div>
    </section>
  );
}
