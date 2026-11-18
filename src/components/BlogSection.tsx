import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Clock, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Zap 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost, calculateReadTime } from '../data/blogPosts';
import { getDaysAgo } from '../data/recentPages';

interface BlogSectionProps {
  hideViewAll?: boolean;
  posts?: BlogPost[];
}

export default function BlogSection({ hideViewAll = false, posts = blogPosts }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'allRecent' | 'sevenDayBoost'>('allRecent');

  // Compute freshness metadata for all posts
  const postsWithFreshness = useMemo(() => {
    return posts.map(post => {
      const dateToCheck = post.lastModified || post.date;
      const daysAgo = getDaysAgo(dateToCheck);
      const isWithin7Days = daysAgo <= 7;
      return {
        ...post,
        daysAgo,
        isWithin7Days,
        displayModifiedDate: post.lastModified || post.date || 'October 26, 2026'
      };
    });
  }, [posts]);

  // Posts inside the 7-day fast-track Google indexing boost window
  const activeBoostPosts = useMemo(() => {
    return postsWithFreshness.filter(p => p.isWithin7Days);
  }, [postsWithFreshness]);

  // Top 10 posts for Homepage display:
  // Prioritizes active 7-day boost posts first, then seamlessly fills up to 10 with recent verified guides
  const top10Posts = useMemo(() => {
    if (filterMode === 'sevenDayBoost' && activeBoostPosts.length > 0) {
      return activeBoostPosts.slice(0, 10);
    }
    const sorted = [...postsWithFreshness].sort((a, b) => a.daysAgo - b.daysAgo);
    return sorted.slice(0, 10);
  }, [postsWithFreshness, activeBoostPosts, filterMode]);

  const categories = ['All', 'Hardware & Trends', 'Phone Announcements', 'Batteries & Heat', 'Repairs & Protection'];

  const filteredPosts = top10Posts.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Hardware & Trends') {
      return p.category.includes('Hardware') || p.category.includes('Logic Board') || p.category.includes('Tech');
    }
    if (selectedCategory === 'Phone Announcements') {
      return p.category.includes('Announcement') || p.category.includes('Launch') || p.title.includes('iPhone 18') || p.title.includes('Samsung S26');
    }
    if (selectedCategory === 'Batteries & Heat') {
      return p.category.includes('Battery') || p.category.includes('Heat') || p.title.includes('Battery') || p.title.includes('Summer');
    }
    if (selectedCategory === 'Repairs & Protection') {
      return p.category.includes('Repair') || p.category.includes('Accessory') || p.category.includes('Protection');
    }
    return true;
  });

  const featuredPost = filteredPosts[0] || top10Posts[0];
  const remainingPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  if (!featuredPost) return null;

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-slate-950 transition-colors duration-300" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Apple Crystal White & Red styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            {/* Pill Badge: Outer 24px, Padding 8px, Inner text/icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200 dark:border-red-900/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Indexing Radar • 7-Day Auto-Freshness Boost</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E1E1E] dark:text-white tracking-tight mb-4 text-left">
              Recently Published &amp; Updated Technical Guides
            </h2>
            
            {/* Rule 1: Left-aligned body paragraph with 1.55 line height and #1E1E1E soft near-black text */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[1.55] text-left">
              Workbench-verified guides, failure analysis, and price benchmarks direct from our Muwaileh Sharjah electronics lab. Newly added guides stay featured on the homepage for <strong>5 to 7 days</strong> for rapid Google indexation, then archive gracefully.
            </p>
          </motion.div>

          {/* Single Primary Action for Section */}
          {!hideViewAll && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="shrink-0 flex items-center"
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-500/20 active:scale-95 transition-all"
              >
                <span>Explore All 246+ Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* 7-Day Freshness Filter & Counter Bar: Outer 24px, Padding 16px (p-4), Inner 8px (rounded-lg) -> 16+8=24px */}
        <div className="p-4 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div className="text-xs text-left">
              <span className="font-bold text-[#1E1E1E] dark:text-white">Active Crawl Boost Protocol: </span>
              <span className="text-slate-600 dark:text-slate-400">
                {activeBoostPosts.length} article{activeBoostPosts.length !== 1 ? 's' : ''} currently within the 7-day priority indexing window
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setFilterMode('allRecent')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'allRecent'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Top 10 Latest
            </button>
            <button
              onClick={() => setFilterMode('sevenDayBoost')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                filterMode === 'sevenDayBoost'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>7-Day Active Boost ({activeBoostPosts.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar (8pt spacing: gap-2, pb-4, mb-8) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-bold scrollbar-none">
          <div className="flex items-center gap-1.5 text-slate-500 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Primary Featured Post (1 of 10)
            Nested Radius Formula: Outer Card Radius = 32px (rounded-[32px])
            Padding = 24px (p-6) / 32px (sm:p-8)
            Inner Image Radius = 20px (rounded-[20px])
            Mathematical check: 20px + 12px = 32px
        */}
        {featuredPost && (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-2xl border border-slate-200/90 dark:border-slate-800 transition-all">
              <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Link to={`/blog/${featuredPost.id}`} className="block w-full h-full">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden pointer-events-none"></div>
                
                {/* Badges on Featured Card: Padding 16px (p-4), Inner radius 8px (rounded-lg) */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                    {featuredPost.category}
                  </span>
                  {featuredPost.isWithin7Days ? (
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 animate-pulse">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Active 7-Day Crawl Boost (Day {featuredPost.daysAgo + 1} of 7)</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-emerald-400" />
                      <span>Verified Lab Guide</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                  <span className="text-xs font-semibold text-emerald-300">
                    Last Updated: {featuredPost.displayModifiedDate}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Timestamp & Metadata Header (8pt spacing: gap-2, mb-4) */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Published: {featuredPost.date}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                      <RefreshCw className="w-3 h-3" />
                      <span>Last Updated: {featuredPost.displayModifiedDate}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{calculateReadTime(featuredPost)}</span>
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.id}`} className="block group/title">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1E1E] dark:text-white mb-4 leading-tight group-hover/title:text-red-600 transition-colors text-left">
                      {featuredPost.title}
                    </h3>
                  </Link>

                  {/* Rule 1: Left-aligned body excerpt with 1.55 line height and #1E1E1E soft near-black text */}
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-[1.55] mb-6 line-clamp-3 text-left">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white text-xs font-black shadow-xs">
                      EU
                    </div>
                    <div className="text-xs text-left">
                      <div className="font-bold text-[#1E1E1E] dark:text-white flex items-center gap-1.5">
                        <span>{featuredPost.author || 'Eng. Usman Tariq'}</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">Author</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Senior Hardware Diagnostic Specialist</div>
                    </div>
                  </div>

                  {/* Rule 2: Single Primary Action Button in Vibrant Apple Red */}
                  <Link 
                    to={`/blog/${featuredPost.id}`} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 active:scale-95 transition-all shrink-0"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* 9-Card Grid of Recent Posts (Completing the 10 Posts)
            Nested Radius Formula: Outer Card Radius = 28px (rounded-[28px])
            Padding = 24px (p-6)
            Inner Image = 16px (rounded-2xl)
            Inner CTA Button = 12px (rounded-xl)
            Formula: 16px inner + 12px ~ 28px outer
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remainingPosts.map((post, index) => {
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl border border-slate-200/90 dark:border-slate-800 transition-all"
              >
                {/* Image Top Card: padding 16px (p-4), Inner badge 8px (rounded-lg) */}
                <Link to={`/blog/${post.id}`} className="block relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-xs">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Top-Right Badge: Active 7-day boost or Verified */}
                  <div className="absolute top-4 right-4">
                    {post.isWithin7Days ? (
                      <span className="px-2.5 py-1 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1 animate-pulse">
                        <Zap className="w-3 h-3 text-amber-300" />
                        <span>Day {post.daysAgo + 1} of 7</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-950/75 backdrop-blur-md text-slate-300 text-[10px] font-medium rounded-lg shadow-xs">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Bottom overlay with Last Updated Date */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[10px] font-bold rounded-md shadow-xs flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Updated: {post.displayModifiedDate}</span>
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{calculateReadTime(post)}</span>
                    </span>
                  </div>

                  <Link to={`/blog/${post.id}`} className="block mb-3 group/link">
                    <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-white leading-snug group-hover/link:text-red-600 transition-colors line-clamp-2 text-left">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Rule 1: Left-aligned body excerpt with 1.55 line height and #1E1E1E soft near-black text */}
                  <p className="text-slate-700 dark:text-slate-300 leading-[1.55] text-xs sm:text-sm mb-6 line-clamp-2 text-left">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-[10px] font-black">
                        AS
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                          {post.author || 'Eng. Usman Tariq'}
                        </span>
                        <span className="text-[9px] text-slate-400">Author</span>
                      </div>
                    </div>

                    {/* Rule 2: Single Primary Action Button in Vibrant Apple Red */}
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Rapid Navigation Banner at bottom of Blog section: Outer 32px, Padding 24px/32px */}
        <div className="mt-16 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-[32px] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Sharjah Workbench Archive • 7-Day Auto-Rotation Protocol</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white text-left">
              Looking for a specific device teardown or repair cost breakdown?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-[1.55] text-left">
              Browse our complete library of 246+ articles covering Apple Silicon micro-soldering, Samsung OLED crease repair, and GCC mail-in shipping protocols.
            </p>
          </div>
          
          {/* Single Primary Action */}
          <Link
            to="/blog"
            className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm whitespace-nowrap shadow-lg shadow-red-500/20 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <span>View All 246+ Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
