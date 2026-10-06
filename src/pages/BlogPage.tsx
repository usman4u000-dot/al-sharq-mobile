import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost, calculateReadTime } from '../data/blogPosts';
import { Calendar, Clock, ArrowRight, BookOpen, Search, Sparkles, Droplets, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import RelatedServicesModule from '../components/RelatedServicesModule';
import TopicalAuthorityClusterHub from '../components/TopicalAuthorityClusterHub';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract unique categories from blogPosts
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured marquee post (first post)
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Tech Insights &amp; Repair Guides | أفضل محل هواتف في الشارقة | Al Sharq Blog</title>
        <meta name="description" content="Expert tech insights, hardware diagnostics, and mobile repair guides from Al Sharq Mobile Lab in Muwaileh Commercial, Sharjah. Learn water damage rescue, screen testing, and board diagnostics." />
        <link rel="canonical" href="https://allsharq.com/blog" />
        <meta property="og:title" content="Tech Insights &amp; Local Repair Guides | Al Sharq Mobile Lab" />
        <meta property="og:description" content="Official knowledge base for smartphone screen fixes, MacBook micro-soldering, and hardware diagnostics in Sharjah." />
        <meta property="og:url" content="https://allsharq.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="AE-SH" />
        <meta name="geo.placename" content="Muwaileh, Sharjah, United Arab Emirates" />
        <meta name="geo.position" content="25.3048;55.4326" />
        <meta name="ICBM" content="25.3048, 55.4326" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://allsharq.com/blog#webpage",
                "url": "https://allsharq.com/blog",
                "name": "Al Sharq Tech Insights & Local Repair Knowledge Base",
                "description": "Comprehensive hardware guides, mobile diagnostics, micro-soldering teardowns, and GCC electronics import guides by Al Sharq Mobile Lab Sharjah.",
                "publisher": {
                  "@type": "LocalBusiness",
                  "@id": "https://allsharq.com/#localbusiness",
                  "name": "Al Sharq Mobile Phone & Computer Trading LLC",
                  "telephone": "+971507117043",
                  "priceRange": "AED 50 - AED 4500",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
                    "addressLocality": "Sharjah",
                    "addressRegion": "Sharjah",
                    "addressCountry": "AE"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 25.3048,
                    "longitude": 55.4326
                  }
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://allsharq.com/blog#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://allsharq.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog & Tech Guides",
                    "item": "https://allsharq.com/blog"
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>
      
      {/* Blog Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="text-left md:text-center max-w-3xl md:mx-auto mb-10"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-[#C2410C] dark:text-orange-400 mb-2">
            Sharjah Engineering &amp; Hardware Editorial
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 [text-wrap:balance]">
            Al Sharq Technical Knowledge Base
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real bench diagnostics, micro-soldering schematics, emergency liquid rescue guides, and UAE secondary market inspection insights.
          </p>
        </motion.div>

        {/* Interactive In-Blog DeviceLab Banner */}
        <div className="mb-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-orange-950/70 to-slate-900 border border-orange-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-brand-orange animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                Al Sharq DeviceLab™ • 100% Free In-Browser Tool
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Test Water Ejection, Screen Touch Matrix &amp; OLED Burn-In
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                No app installation required. Run 165Hz acoustic sonic wave and digitizer tests immediately.
              </p>
            </div>
          </div>
          <Link
            to="/hardware-test"
            className="px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-lg transition-all active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>Launch DeviceLab™</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 7 Engineering Pillars & Topical Authority Cluster Hub */}
        <TopicalAuthorityClusterHub />

        {/* Featured Story Marquee (When not searching) */}
        {!searchQuery && activeCategory === 'All' && featuredPost && (
          <motion.article 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative overflow-hidden min-h-[300px] sm:min-h-[380px]">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 tracking-wide">
                    <span className="text-[#C2410C] dark:text-orange-400 font-bold uppercase">{featuredPost.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Lead Story</span>
                    <span aria-hidden="true">·</span>
                    <span>{calculateReadTime(featuredPost)}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`} className="block group-hover:text-brand-orange transition-colors">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4 [text-wrap:balance]">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-slate-800 flex items-center justify-center text-[#C2410C] dark:text-orange-400 text-xs font-bold">
                      AS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{featuredPost.author}</div>
                      <div className="text-[11px] text-slate-400">{featuredPost.date}</div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C2410C] dark:text-orange-400 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4 shrink-0 space-y-6">
            {/* Search */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles & guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange dark:text-white placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </div>
              )}
            </div>

            {/* Categories as Functional Segmented Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Filter by Category
              </div>
              <div className="flex flex-col gap-1">
                {categories.map(category => {
                  const count = category === 'All' 
                    ? blogPosts.length 
                    : blogPosts.filter(p => p.category === category).length;
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`group flex items-center justify-between w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#C2410C] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate mr-2">{category}</span>
                      <span className={`text-[11px] font-mono tabular-nums ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5 hidden lg:block">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Recent Dispatches
              </div>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-3 items-start">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-14 h-14 rounded-lg object-cover shrink-0 transition-transform duration-300 group-hover:scale-105" 
                      loading="lazy" 
                    />
                    <div className="flex flex-col justify-center min-w-0">
                      <h3 dir="auto" className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-orange leading-snug line-clamp-2 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 mt-1">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dynamic Matched Services */}
            <RelatedServicesModule 
              contentToAnalyze={`${activeCategory} ${searchQuery} iPhone Samsung MacBook`}
              category={activeCategory}
              variant="compact"
            />
          </aside>

          {/* Main Grid Content */}
          <main className="w-full lg:w-3/4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(searchQuery || activeCategory !== 'All' ? filteredPosts : gridPosts).map((post, index) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                  >
                    <Link to={`/blog/${post.id}`} className="block relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-[#C2410C] dark:text-orange-400 font-bold truncate max-w-[130px]">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{calculateReadTime(post)}</span>
                      </div>

                      <Link to={`/blog/${post.id}`} className="block mb-2 group-hover:text-brand-orange transition-colors">
                        <h2 dir="auto" className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 [text-wrap:balance]">
                          {post.title}
                        </h2>
                      </Link>

                      <p dir="auto" className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium text-[11px]">
                          {post.date}
                        </span>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-[#C2410C] dark:text-orange-400 font-bold flex items-center gap-1 group-hover:underline"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">No articles matched your search query.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#C2410C] text-white font-bold text-xs rounded-xl hover:bg-[#9A3412] transition-colors"
                >
                   Reset Filters
                </button>
              </div>
            )}

            {/* Dynamic Related Services Banner/Grid at Bottom */}
            <div className="mt-16">
              <RelatedServicesModule 
                contentToAnalyze={`${activeCategory} ${searchQuery} iPhone 18 Samsung Galaxy S24 S25 MacBook screen battery charging port`}
                category={activeCategory}
                variant="grid"
                customTitle="In-Store Hardware Repairs & Screen Fixes (Sharjah)"
                customSubtitle="Need immediate hardware repair for an iPhone, Samsung Galaxy, or MacBook featured in our blog? Walk into our Muwaileh center or book a service online."
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
