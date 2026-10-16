import React, { useState } from 'react';
import { Calendar, User, ArrowRight, BookOpen, Clock, RefreshCw, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost, calculateReadTime } from '../data/blogPosts';

interface BlogSectionProps {
  hideViewAll?: boolean;
  posts?: BlogPost[];
}

export default function BlogSection({ hideViewAll = false, posts = blogPosts }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Grab the 10 most recent posts
  const top10Posts = posts.slice(0, 10);

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
  const remainingPosts = filteredPosts.filter(p => p.id !== featuredPost?.id).slice(0, 9);

  if (!featuredPost) return null;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-orange-500/10 text-brand-orange dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Indexing &amp; Freshness Radar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Recently Published &amp; Updated Technical Guides
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Workbench-verified guides, failure analysis, and price benchmarks direct from our Muwaileh Sharjah electronics lab. Updated regularly for Google QDF and client transparency.
            </p>
          </motion.div>

          {!hideViewAll && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Explore All 246+ Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-bold scrollbar-none">
          <div className="flex items-center gap-1.5 text-slate-400 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter 10 Latest:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-orange text-white shadow-md shadow-orange-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Primary Featured Post (1 of 10) */}
        {featuredPost && (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 group cursor-pointer"
          >
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-all">
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden"></div>
                  <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-brand-orange text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-md">
                      {featuredPost.category}
                    </span>
                    <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>Updated {featuredPost.lastModified || 'Oct 16, 2026'}</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Published: {featuredPost.date}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{calculateReadTime(featuredPost)}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                        EU
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">{featuredPost.author || 'Eng. Usman Tariq'}</div>
                        <div className="text-[10px] text-slate-400">Lead Diagnostic Specialist</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* 9-Card Grid of Recent Posts (Completing the 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remainingPosts.map((post, index) => {
            const modifiedDate = post.lastModified || 'Oct 16, 2026';
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/70 dark:border-slate-800 transition-all"
              >
                <Link to={`/blog/${post.id}`} className="block relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-sm flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>{modifiedDate}</span>
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
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

                  <Link to={`/blog/${post.id}`} className="block mb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-[10px] font-black">
                        AS
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                        {post.author || 'Eng. Usman Tariq'}
                      </span>
                    </div>

                    <Link 
                      to={`/blog/${post.id}`} 
                      className="text-brand-orange font-bold text-xs flex items-center group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Rapid Navigation Banner at bottom of Blog section */}
        <div className="mt-16 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Sharjah Workbench Archive</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Looking for a specific device teardown or repair cost breakdown?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Browse our complete library of 246+ articles covering Apple Silicon micro-soldering, Samsung OLED crease repair, and GCC mail-in shipping protocols.
            </p>
          </div>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm whitespace-nowrap shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 shrink-0"
          >
            <span>View All 246+ Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
