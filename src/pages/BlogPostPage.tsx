import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, MessageCircle, Share2, Bookmark, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { blogPosts, calculateReadTime } from '../data/blogPosts';
import RelatedServicesModule from '../components/RelatedServicesModule';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <Helmet>
          <title>Article Not Found | Al Sharq Mobile Lab</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Post Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The article you are looking for does not exist or has been moved.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-brand-orange text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Calculate read time
  const readTime = calculateReadTime(post);

  // Get categories and recent posts for sidebar
  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category).filter(Boolean)))];
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 5);

  // Generate Schema Markup for the Article
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": new Date(post.date).toISOString(),
    "author": [{
        "@type": "Organization",
        "name": post.author,
        "url": "https://allsharq.com"
      }],
    "publisher": {
      "@type": "Organization",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://allsharq.com/logo.png"
      }
    },
    "description": post.metaDescription || post.excerpt
  };

  return (
    <div className="pt-24 pb-32 md:pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 relative">
      <Helmet>
        <title>{post.metaTitle || `${post.title} | Al Sharq Mobile Phone & Computer Trading LLC`}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://allsharq.com/blog/${post.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={`https://allsharq.com/blog/${post.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero Header Area */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-800 dark:text-slate-200">
           {/* Can put breadcrumb here if wanted */}
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4 shrink-0 space-y-8 hidden lg:block">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange font-semibold transition-colors mb-4 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
            </Link>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map(category => {
                  const count = category === 'All' 
                    ? blogPosts.length 
                    : blogPosts.filter(p => p.category === category).length;
                  return (
                    <Link
                      key={category}
                      to="/blog"
                      className="group flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <span className="truncate mr-4">{category}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600">
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Recent Posts</h3>
              <div className="space-y-6">
                {recentPosts.map(recentPost => (
                  <Link key={recentPost.id} to={`/blog/${recentPost.id}`} className="group flex gap-4 items-start">
                    <img 
                      src={recentPost.image} 
                      alt={recentPost.title} 
                      className="w-20 h-20 rounded-xl object-cover shrink-0 transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy" 
                    />
                    <div className="flex flex-col justify-center min-h-[5rem]">
                      <h4 dir="auto" className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-orange leading-tight line-clamp-2 mb-2 transition-colors">
                        {recentPost.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Calendar className="w-3 h-3" />{recentPost.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Automated Device Repair Matches */}
            <RelatedServicesModule 
              contentToAnalyze={`${post.title} ${post.category} ${typeof post.content === 'string' ? post.content.substring(0, 800) : ''}`}
              category={post.category}
              variant="compact"
            />
          </aside>

          {/* Main Article Content */}
          <main className="w-full lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Back to blog for Mobile */}
              <Link 
                to="/blog" 
                className="lg:hidden inline-flex items-center text-slate-500 hover:text-brand-orange font-semibold transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
              </Link>
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-12">
                <div className="p-8 md:p-12 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <span className="px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
                    {post.category}
                  </span>
                  <h1 dir="auto" className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {readTime}</span>
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 dark:bg-white/10 flex items-center justify-center text-brand-blue dark:text-white text-[10px] font-bold">
                        AS
                      </div>
                      {post.author}
                    </span>
                  </div>
                </div>

                <div className="relative bg-slate-100 dark:bg-slate-800 overflow-hidden min-h-[280px] flex items-center justify-center">
                  <img 
                    loading="lazy"
                    decoding="async"
                    src={post.image} 
                    alt={post.title} 
                    width={1200}
                    height={630}
                    className="w-full h-auto max-h-[500px] object-cover transition-opacity duration-300"
                  />
                </div>

                <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
                  {/* Social Share Sidebar (Desktop in article) */}
                  <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit shrink-0">
                    <button className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors" title="Share Article">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors" title="Bookmark">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Article Body */}
                  <div dir="auto" className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-orange hover:prose-a:text-orange-600 prose-img:rounded-2xl">
                    {typeof post.content === 'string' ? (
                      <Markdown
                        components={{
                          img: ({ node, src, alt, ...props }) => (
                            <figure className="my-8 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-800">
                              <img
                                src={src}
                                alt={alt || post.title}
                                loading="lazy"
                                decoding="async"
                                width={1200}
                                height={675}
                                className="w-full h-auto max-h-[500px] object-cover m-0"
                                {...props}
                              />
                              {alt && (
                                <figcaption className="p-3 text-center text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
                                  {alt}
                                </figcaption>
                              )}
                            </figure>
                          ),
                          a: ({ node, href, children, ...props }) => {
                            const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
                            if (isInternal) {
                              return (
                                <Link 
                                  to={href} 
                                  className="text-brand-orange hover:text-orange-600 font-semibold underline decoration-brand-orange/40 hover:decoration-brand-orange transition-colors"
                                >
                                  {children}
                                </Link>
                              );
                            }
                            return (
                              <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-brand-orange hover:text-orange-600 font-semibold underline decoration-brand-orange/40 hover:decoration-brand-orange transition-colors" 
                                {...props}
                              >
                                {children}
                              </a>
                            );
                          }
                        }}
                      >
                        {post.content}
                      </Markdown>
                    ) : (
                      post.content
                    )}
                  </div>
                </div>
              </div>

              {/* Automated Device-Specific Related Services Module */}
              <RelatedServicesModule 
                contentToAnalyze={`${post.title} ${post.category} ${typeof post.content === 'string' ? post.content : ''}`}
                category={post.category}
                variant="grid"
              />

              {/* Author Bio Footer */}
              <div className="p-8 bg-white dark:bg-slate-900 shadow-sm rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-blue dark:text-white font-bold text-3xl shrink-0">
                  AS
                </div>
                <div className="text-center md:text-start flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Al Sharq Mobile Phone & Computer Trading LLC</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Trusted Tech Experts in Sharjah Since 2014. We specialize in micro-soldering, data recovery, and premium device restoration.
                  </p>
                </div>
                <div className="shrink-0">
                   <a 
                     href="https://wa.me/+971507117043" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-sm"
                   >
                     <MessageCircle className="w-5 h-5" />
                     Chat with Us
                   </a>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Sticky Mobile WhatsApp Banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-brand-blue p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div className="text-white">
            <p className="font-bold text-sm">Need Expert Help?</p>
            <p className="text-xs text-blue-200">Chat with our technicians</p>
          </div>
          <a 
            href="https://wa.me/+971507117043" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
