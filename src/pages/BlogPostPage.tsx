import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  Navigation, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench,
  ChevronRight,
  Home,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { blogPosts, calculateReadTime } from '../data/blogPosts';
import RelatedServicesModule from '../components/RelatedServicesModule';
import { TOPICAL_PILLARS } from '../components/TopicalAuthorityClusterHub';

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

  // Dynamic Topical Pillar matching for Topical Authority Cluster Model
  const matchingPillar = (() => {
    const text = `${post.title} ${post.category} ${post.id}`.toLowerCase();
    if (text.includes('macbook') || text.includes('logic board') || text.includes('laptop') || text.includes('soldering')) {
      return TOPICAL_PILLARS.find(p => p.id === 'macbook-logic-board');
    }
    if (text.includes('samsung') || text.includes('fold') || text.includes('snapdragon')) {
      return TOPICAL_PILLARS.find(p => p.id === 'samsung-android');
    }
    if (text.includes('data recovery') || text.includes('nand') || text.includes('ssd') || text.includes('drive')) {
      return TOPICAL_PILLARS.find(p => p.id === 'forensic-data-recovery');
    }
    if (text.includes('printer') || text.includes('laserjet') || text.includes('ecotank') || text.includes('barcode')) {
      return TOPICAL_PILLARS.find(p => p.id === 'commercial-printers');
    }
    if (text.includes('wholesale') || text.includes('saudi') || text.includes('oman') || text.includes('bahrain') || text.includes('kuwait') || text.includes('qatar') || text.includes('turkey') || text.includes('gcc')) {
      return TOPICAL_PILLARS.find(p => p.id === 'wholesale-gcc-commerce');
    }
    if (text.includes('near me') || text.includes('muwaileh') || text.includes('sharjah')) {
      return TOPICAL_PILLARS.find(p => p.id === 'hyper-local-sharjah');
    }
    return TOPICAL_PILLARS[0]; // Apple Ecosystem
  })();

  // Safe ISO Date resolution
  const safePublishedDate = (() => {
    try {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) return parsed.toISOString();
    } catch (e) {}
    return '2026-09-30T12:00:00.000Z';
  })();

  // Comprehensive Local SEO Schema Graph (BlogPosting + LocalBusiness + Breadcrumbs)
  const localSeoSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BlogPosting", "TechArticle"],
        "@id": `https://allsharq.com/blog/${post.id}#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://allsharq.com/#website",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC",
          "url": "https://allsharq.com"
        },
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "image": [post.image],
        "datePublished": safePublishedDate,
        "dateModified": "2026-09-30T12:00:00.000Z",
        "mainEntityOfPage": `https://allsharq.com/blog/${post.id}`,
        "inLanguage": "en-AE",
        "author": {
          "@type": "Person",
          "name": post.author,
          "jobTitle": "Master Hardware Diagnostic Specialist",
          "worksFor": {
            "@type": "LocalBusiness",
            "@id": "https://allsharq.com/#localbusiness"
          }
        },
        "publisher": {
          "@type": "LocalBusiness",
          "@id": "https://allsharq.com/#localbusiness",
          "name": "Al Sharq Mobile Phone & Computer Trading LLC",
          "legalName": "Al Sharq Mobile Phone & Computer Trading LLC",
          "url": "https://allsharq.com",
          "telephone": "+971507117043",
          "priceRange": "AED 50 - AED 4500",
          "image": "https://allsharq.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Commercial",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "postalCode": "00000",
            "addressCountry": "AE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.3048,
            "longitude": 55.4326
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
              "opens": "09:00",
              "closes": "23:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Friday",
              "opens": "16:00",
              "closes": "23:00"
            }
          ]
        },
        "contentLocation": {
          "@type": "Place",
          "name": "Muwaileh Commercial, Sharjah, United Arab Emirates",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.3048,
            "longitude": 55.4326
          }
        },
        "about": {
          "@type": "Service",
          "name": post.category || "Electronics Repair",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://allsharq.com/#localbusiness"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://allsharq.com/blog/${post.id}#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://allsharq.com/blog/${post.id}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-24 pb-32 md:pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 relative">
      <Helmet>
        <title>{post.metaTitle || `${post.title} | Al Sharq Mobile Lab Sharjah`}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://allsharq.com/blog/${post.id}`} />
        <meta property="og:site_name" content="Al Sharq Mobile Phone & Computer Trading LLC" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={`https://allsharq.com/blog/${post.id}`} />

        {/* Local SEO Geo-Targeting Tags */}
        <meta name="geo.region" content="AE-SH" />
        <meta name="geo.placename" content="Muwaileh, Sharjah, United Arab Emirates" />
        <meta name="geo.position" content="25.3048;55.4326" />
        <meta name="ICBM" content="25.3048, 55.4326" />

        <script type="application/ld+json">
          {JSON.stringify(localSeoSchema)}
        </script>
      </Helmet>

      {/* Hero Header Area with Local Breadcrumbs */}
      <div className="w-full bg-slate-100 dark:bg-slate-900/60 pt-6 pb-14 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-brand-orange transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <Link to="/blog" className="hover:text-brand-orange transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-brand-orange font-bold truncate max-w-xs">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4 shrink-0 space-y-8 hidden lg:block">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange font-semibold transition-colors mb-4 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
            </Link>

            {/* Proximity / Local Bench Badge */}
            <div className="bg-gradient-to-br from-brand-blue to-slate-900 text-white p-6 rounded-3xl shadow-md border border-brand-orange/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm">Muwaileh Lab Bench</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Need on-site diagnostics or same-day repair? Visit our central lab on Fire Station Road, Muwaileh Commercial, Sharjah.
              </p>
              <div className="space-y-2 text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2 Mins from University City</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>7 Mins from Sahara Centre</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10 Mins from Dubai Border</span>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Maps)</span>
              </a>
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
                    <Link
                      key={category}
                      to="/blog"
                      className={`flex items-center justify-between py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                        category === post.category
                          ? 'bg-brand-orange/10 text-brand-orange font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-orange'
                      }`}
                    >
                      <span className="truncate">{category}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-500 shrink-0">
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Latest Guides</h3>
              <div className="flex flex-col gap-6">
                {recentPosts.map(recent => (
                  <Link 
                    key={recent.id}
                    to={`/blog/${recent.id}`}
                    className="group flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                      <img 
                        loading="lazy"
                        src={recent.image} 
                        alt={recent.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider block mb-1">
                        {recent.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                        {recent.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Banner Callout for Estimate */}
            <div className="bg-gradient-to-br from-brand-orange to-orange-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <Wrench className="w-10 h-10 mx-auto mb-4 text-orange-200" />
              <h3 className="text-xl font-extrabold mb-2">Need a Device Fixed?</h3>
              <p className="text-orange-100 text-xs mb-6 leading-relaxed">
                Get an instant quote with genuine OEM parts and our 1-year lab warranty.
              </p>
              <Link 
                to="/repair-estimate" 
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-brand-orange rounded-xl font-bold text-xs hover:bg-orange-50 transition-colors shadow-sm"
              >
                Instant Estimate <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
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
                <div className="p-6 sm:p-10 md:p-12 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3.5 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-full inline-block">
                      {post.category}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold rounded-full">
                      📍 Sharjah Lab Verified
                    </span>
                  </div>
                  <h1 dir="auto" className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {readTime}</span>
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 dark:bg-white/10 flex items-center justify-center text-brand-blue dark:text-white text-[10px] font-bold">
                        AS
                      </div>
                      {post.author}
                    </span>
                  </div>
                </div>

                <div className="relative bg-slate-100 dark:bg-slate-800 overflow-hidden min-h-[260px] flex items-center justify-center">
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

                <div className="p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row gap-10">
                  {/* Social Share Sidebar (Desktop in article) */}
                  <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit shrink-0">
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: post.title, url: window.location.href });
                        }
                      }}
                      className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors cursor-pointer" 
                      title="Share Article"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => alert('Article bookmarked in browser')}
                      className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors cursor-pointer" 
                      title="Bookmark"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-slate dark:prose-invert max-w-none flex-grow">
                    {typeof post.content === 'string' ? (
                      <Markdown 
                        components={{
                          h1: ({children}) => <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4">{children}</h1>,
                          h2: ({children}) => <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{children}</h2>,
                          h3: ({children}) => <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{children}</h3>,
                          p: ({children}) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">{children}</p>,
                          ul: ({children}) => <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base">{children}</ol>,
                          li: ({children}) => <li className="text-slate-600 dark:text-slate-300">{children}</li>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-brand-orange pl-4 italic my-6 text-slate-700 dark:text-slate-300">{children}</blockquote>,
                          a: ({href, children, ...props}) => {
                            if (href?.startsWith('/')) {
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

                {/* Local SEO In-Article Proximity & Fast-Contact Module */}
                <div className="m-6 sm:m-10 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-orange-50/40 dark:from-slate-800 dark:to-slate-850 border border-brand-orange/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-orange block mb-1">
                      📍 Local Repair Bench in Sharjah
                    </span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                      Experiencing this device issue right now?
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                      Walk into our Muwaileh laboratory for a 20-minute express diagnostic, or ship your device from Saudi Arabia, Oman, Bahrain, Kuwait, Qatar or Turkey.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 shrink-0">
                    <a
                      href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href="tel:+971507117043"
                      className="px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+971 50 711 7043</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Topical Authority Pillar Anchor (Cluster to Pillar Link) */}
              {matchingPillar && (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border-2 border-brand-orange/40 mb-12 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${matchingPillar.colorClass} flex items-center justify-center text-white shadow-md`}>
                        <matchingPillar.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-brand-orange font-bold tracking-wider block">
                          Topical Authority Knowledge Silo • {matchingPillar.pillarBadge}
                        </span>
                        <h4 className="text-base font-black text-white">
                          {matchingPillar.pillarNameEn}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-emerald-400 font-bold w-fit">
                      E-E-A-T Verified Pillar
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {matchingPillar.descriptionEn}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {matchingPillar.coreAuthorityServices.map((srv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{srv}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">
                      Looking for the comprehensive parent service?
                    </span>
                    <Link
                      to={matchingPillar.pillarUrl}
                      className="px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <span>Explore {matchingPillar.pillarNameEn} Pillar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Automated Device-Specific Related Services Module */}
              <RelatedServicesModule 
                contentToAnalyze={`${post.title} ${post.category} ${typeof post.content === 'string' ? post.content : ''}`}
                category={post.category}
                variant="grid"
              />

              {/* Author Bio Footer */}
              <div className="p-8 bg-white dark:bg-slate-900 shadow-sm rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-blue dark:text-white font-bold text-3xl shrink-0 border-2 border-brand-orange/40">
                  AS
                </div>
                <div className="text-center md:text-start flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Al Sharq Mobile Phone & Computer Trading LLC</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mb-2">
                    Established in Muwaileh Commercial, Sharjah. Serving all of Sharjah, Dubai, Ajman and the GCC with Level 4 micro-soldering, data recovery, and 20% discount wholesale electronics.
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    📍 BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh • 📞 +971 50 711 7043
                  </p>
                </div>
                <div className="shrink-0">
                   <a 
                     href="https://wa.me/971507117043" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-bold transition-colors shadow-sm"
                   >
                     <MessageCircle className="w-5 h-5 fill-current" />
                     WhatsApp Lab
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
            <p className="font-bold text-sm">Need Expert Repair in Sharjah?</p>
            <p className="text-xs text-blue-200">Free diagnostic evaluation on bench</p>
          </div>
          <a
            href="https://wa.me/971507117043"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat Live</span>
          </a>
        </div>
      </div>
    </div>
  );
}
