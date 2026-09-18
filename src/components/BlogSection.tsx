import React from 'react';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost, calculateReadTime } from '../data/blogPosts';

interface BlogSectionProps {
  hideViewAll?: boolean;
  posts?: BlogPost[];
}

export default function BlogSection({ hideViewAll = false, posts = blogPosts }: BlogSectionProps) {
  const featuredPost = posts[0];
  const remainingPosts = hideViewAll ? posts.slice(1) : posts.slice(1, 4);

  if (!featuredPost) return null;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 dark:bg-white/5 text-brand-blue dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Tech Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Industry News & Guides
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Stay updated with the latest tech insights, expert repair guides, and industry news from Al Sharq Mobile Phone & Computer Trading LLC. Your trusted source for device maintenance in Sharjah.
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
                className="inline-flex items-center gap-2 text-brand-orange font-bold hover:text-orange-600 transition-colors"
              >
                View All Articles <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 group cursor-pointer"
          >
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl">
                <div className="relative h-72 lg:h-full overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden"></div>
                  <div className="absolute bottom-6 left-6 lg:top-6 lg:bottom-auto lg:left-6">
                    <span className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {calculateReadTime(featuredPost)}</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {featuredPost.author}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight group-hover:text-brand-orange transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-auto flex items-center text-brand-orange font-bold">
                    Read Full Article <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
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
      </div>
    </section>
  );
}
