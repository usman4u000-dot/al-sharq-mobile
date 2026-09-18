import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost, calculateReadTime } from '../data/blogPosts';
import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import { motion } from 'motion/react';

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

  // Get recent posts for sidebar
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Tech Insights & Repair Guides | أفضل محل هواتف في الشارقة | Al Sharq Blog</title>
        <meta name="description" content="Discover expert tech insights, repair guides, and industry news from Al Sharq Mobile Phone & Computer Trading LLC. Your trusted destination for laptop and mobile repairs in Sharjah. هواتف ذكية الشارقة، تصليح هواتف الشارقة، موبايلات مستعملة الشارقة." />
        <meta name="keywords" content="هواتف ذكية الشارقة, تصليح هواتف الشارقة, موبايلات مستعملة الشارقة, أفضل محل هواتف في الشارقة, عروض الموبايلات اليوم, Mobile repair Sharjah, Used mobiles Sharjah, Best mobile shop in Sharjah" />
        <link rel="canonical" href="https://allsharq.com/blog" />
      </Helmet>
      
      {/* Blog Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-start md:text-center max-w-3xl md:mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 dark:bg-white/5 text-brand-blue dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
             <BookOpen className="w-4 h-4" />
             <span>Tech Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
             Stay updated with the latest tech insights, expert repair guides, and industry news.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4 shrink-0 space-y-8">
            {/* Search */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-blue/20 dark:text-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map(category => {
                  const count = category === 'All' 
                    ? blogPosts.length 
                    : blogPosts.filter(p => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`group flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeCategory === category
                          ? 'bg-brand-orange text-white shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate mr-4">{category}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeCategory === category 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-shadow hidden lg:block">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Recent Posts</h3>
              <div className="space-y-6">
                {recentPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-4 items-start">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-20 h-20 rounded-xl object-cover shrink-0 transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy" 
                    />
                    <div className="flex flex-col justify-center min-h-[5rem]">
                      <h4 dir="auto" className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-orange leading-tight line-clamp-2 mb-2 transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid Content */}
          <main className="w-full lg:w-3/4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all"
                  >
                    <Link to={`/blog/${post.id}`} className="block relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-brand-blue dark:text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(post)}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="block mb-4">
                        <h3 dir="auto" className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p dir="auto" className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-blue/10 dark:bg-white/10 flex items-center justify-center text-brand-blue dark:text-white text-[10px]">
                            AS
                          </div>
                          {post.author}
                        </span>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-brand-orange font-bold text-sm flex items-center group-hover:underline"
                        >
                          Read <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No posts found.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-6 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors"
                >
                   Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
