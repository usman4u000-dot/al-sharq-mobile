import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Bot, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Server, 
  Database, 
  Code, 
  Zap, 
  Send, 
  HelpCircle,
  TrendingUp,
  Award,
  Globe2,
  Workflow,
  Search,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../data/businessInfo';

export const AICloudSolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aip' | 'chatbot' | 'cloud' | 'google-ai'>('aip');
  
  // Interactive Chatbot Simulator State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'مرحباً بك في الشرق! Hello! I am your AI Business Assistant. How can I assist your enterprise today with AIP, WhatsApp Chatbots, Cloud Migration, or Google AI solutions?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Cost Estimator State
  const [selectedSolution, setSelectedSolution] = useState<'aip' | 'chatbot' | 'cloud' | 'google-ai'>('chatbot');
  const [scaleTier, setScaleTier] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [includeCloudSupport, setIncludeCloudSupport] = useState(true);

  const calculateEstimate = () => {
    let base = 0;
    if (selectedSolution === 'chatbot') {
      base = scaleTier === 'starter' ? 1200 : scaleTier === 'growth' ? 2400 : 4900;
    } else if (selectedSolution === 'aip') {
      base = scaleTier === 'starter' ? 2800 : scaleTier === 'growth' ? 5500 : 9800;
    } else if (selectedSolution === 'cloud') {
      base = scaleTier === 'starter' ? 1500 : scaleTier === 'growth' ? 3200 : 6500;
    } else if (selectedSolution === 'google-ai') {
      base = scaleTier === 'starter' ? 2200 : scaleTier === 'growth' ? 4400 : 8500;
    }
    if (includeCloudSupport) base += 450;
    return base;
  };

  const handleSimulateChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('سعر') || lower.includes('تغلفة')) {
        botReply = 'Our AI & Cloud implementations start from AED 1,200 for WhatsApp AI Chatbots and AED 2,800 for Enterprise AIP automation with full turnkey deployment.';
      } else if (lower.includes('whatsapp') || lower.includes('واتساب') || lower.includes('bot') || lower.includes('chat')) {
        botReply = 'We develop verified WhatsApp AI Chatbots with Green Tick approval, multilingual Arabic/English NLP, and automated booking/catalog browsing in 5-7 business days.';
      } else if (lower.includes('google') || lower.includes('gemini') || lower.includes('جوجل')) {
        botReply = 'Our Google AI stack utilizes Google Cloud Vertex AI and Gemini models for automated enterprise search, document extraction, and smart CRM orchestration.';
      } else if (lower.includes('cloud') || lower.includes('سحاب') || lower.includes('server') || lower.includes('migration')) {
        botReply = 'We deliver zero-downtime cloud migration to Google Cloud, AWS, or Azure with local UAE data sovereignty compliance and immutable disaster recovery backups.';
      } else {
        botReply = 'Thank you for your message! Our AI engineering team at Al Sharq (Muwaileh, Sharjah) can build this custom workflow for you. Tap below to chat directly with our Lead Architect on WhatsApp!';
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 600);
  };

  const structuredSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://allsharq.com/ai-cloud-solutions#service",
        "name": "Enterprise AIP, AI Chatbot, Cloud Computing & Google AI Solutions UAE",
        "serviceType": "Artificial Intelligence & Cloud Computing Services",
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS_INFO.name,
          "telephone": BUSINESS_INFO.telephone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": BUSINESS_INFO.address.streetAddress,
            "addressLocality": BUSINESS_INFO.address.addressLocality,
            "addressRegion": BUSINESS_INFO.address.addressRegion,
            "postalCode": BUSINESS_INFO.address.postalCode,
            "addressCountry": "AE"
          }
        },
        "areaServed": [
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "City", "name": "Sharjah" },
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Abu Dhabi" }
        ],
        "description": "Leading provider of AIP (AI Platform) development, WhatsApp AI Chatbots, Google AI & Gemini integration, and Cloud computing migration services in UAE.",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "AED",
          "lowPrice": "1200",
          "highPrice": "15000",
          "offerCount": "12"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://allsharq.com/ai-cloud-solutions#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AIP (Artificial Intelligence Platform) for UAE businesses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AIP is an enterprise software architecture that unifies machine learning models, autonomous AI agents, company data pipelines, and ERP systems into an automated intelligence engine compliant with UAE data protection laws."
            }
          },
          {
            "@type": "Question",
            "name": "Can you build an Arabic AI Chatbot for WhatsApp in UAE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Al Sharq develops official WhatsApp Business API chatbots with deep understanding of Emirati and Gulf Arabic dialects, instant lead qualification, catalog checkout, and live human agent escalation."
            }
          },
          {
            "@type": "Question",
            "name": "How does Google AI and Google Gemini integration work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We integrate Google Cloud Vertex AI and Gemini models directly into your business software, enabling document intelligence, contract summarization, enterprise knowledge search, and predictive analytics."
            }
          },
          {
            "@type": "Question",
            "name": "Where is your tech lab located in Sharjah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our engineering and customer support center is conveniently located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area, Sharjah, UAE."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Helmet>
        <title>AIP, AI Chatbot, Cloud & Google AI Solutions UAE | Al Sharq Sharjah & Dubai</title>
        <meta 
          name="description" 
          content="Enterprise AIP (AI Platform), WhatsApp AI Chatbot development, Cloud Migration, and Google AI & Gemini integration in UAE. Sharjah & Dubai certified architecture." 
        />
        <meta 
          name="keywords" 
          content="AIP UAE, AI Platform Dubai, AI Chatbot development UAE, WhatsApp AI bot Sharjah, Cloud computing UAE, Google AI solutions Dubai, Google Gemini business UAE, Cloud migration Sharjah, شركة ذكاء اصطناعي الإمارات, شات بوت واتساب" 
        />
        <link rel="canonical" href="https://allsharq.com/ai-cloud-solutions" />
        <script type="application/ld+json">
          {JSON.stringify(structuredSchema)}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Enterprise Tech Stack 2026 • UAE & GCC</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Muwaileh, Sharjah Lab • On-Site & Cloud Deployment</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">AIP, AI Chatbot, Cloud</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Google AI</span> Solutions
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Empower your organization with automated intelligence. From <strong>AIP (AI Platforms)</strong> and multilingual <strong>WhatsApp AI Chatbots</strong> to resilient <strong>Cloud Infrastructure</strong> and official <strong>Google AI / Gemini</strong> pipelines across Sharjah, Dubai, and the UAE.
              </p>

              {/* Key badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center">
                  <div className="text-xl font-bold text-cyan-400">AIP</div>
                  <div className="text-xs text-slate-400">AI Platform</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center">
                  <div className="text-xl font-bold text-emerald-400">Chatbot</div>
                  <div className="text-xs text-slate-400">WhatsApp & Web</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/30 text-center">
                  <div className="text-xl font-bold text-sky-400">Cloud</div>
                  <div className="text-xs text-slate-400">Migration & Backup</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-center">
                  <div className="text-xl font-bold text-indigo-400">Google AI</div>
                  <div className="text-xs text-slate-400">Vertex & Gemini</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20am%20inquiring%20about%20Enterprise%20AI,%20Chatbot,%20Cloud,%20or%20Google%20AI%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Consult an AI Architect (+971 50 711 7043)</span>
                </a>

                <button 
                  onClick={() => {
                    const el = document.getElementById('interactive-simulator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all"
                >
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span>Try Interactive Bot Simulator</span>
                </button>
              </div>
            </div>

            {/* Live Highlights Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-white text-sm">Al Sharq Tech Division • Live Status</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    24/7 Operations
                  </span>
                </div>

                <div className="space-y-4 pt-4 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">AIP Multi-Agent Workflows:</strong>
                      <span className="text-slate-400 text-xs">Autonomous task execution for finance, HR, inventory, and procurement in UAE.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Official WhatsApp API Chatbots:</strong>
                      <span className="text-slate-400 text-xs">Full conversational Arabic (Gulf/Emirati) & English with zero latency.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Enterprise Cloud & Migration:</strong>
                      <span className="text-slate-400 text-xs">Zero-downtime cutovers to Google Cloud, AWS, or Azure with local compliance.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Google AI & Gemini Integration:</strong>
                      <span className="text-slate-400 text-xs">High-accuracy document OCR, semantic vector search, and multimodal analysis.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <div>Headquarters & Tech Center:</div>
                    <div className="text-slate-200 font-medium">{BUSINESS_INFO.address.streetAddress}</div>
                  </div>
                  <Link to="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-bold inline-flex items-center gap-1">
                    Visit Lab <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs for 4 Pillars */}
      <section className="py-8 bg-slate-900/60 border-b border-slate-800 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('aip')}
              className={`p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                activeTab === 'aip'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>1. AIP (AI Platform)</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                activeTab === 'chatbot'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>2. AI Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('cloud')}
              className={`p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                activeTab === 'cloud'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>3. Cloud Services</span>
            </button>

            <button
              onClick={() => setActiveTab('google-ai')}
              className={`p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                activeTab === 'google-ai'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>4. Google AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Pillars Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'aip' && (
              <motion.div
                key="aip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="border border-cyan-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-cyan-950/20">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Enterprise Intelligence Engine</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      AIP (Artificial Intelligence Platform) & Cognitive Automation
                    </h2>
                    <p className="text-slate-300">
                      Unify disparate departmental software, ERP records, and customer streams into a single high-speed AI operational layer. We build, host, and fine-tune custom AIP architectures tailored to UAE regulatory standards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                        <Workflow className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Autonomous Multi-Agent Systems</h3>
                      <p className="text-sm text-slate-400">
                        Deploy specialized AI agents that collaborate: one extracts data from incoming supplier emails, another cross-references ERP stock, and a third generates verified purchase orders.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                        <Database className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Proprietary RAG & Vector Lake</h3>
                      <p className="text-sm text-slate-400">
                        Index millions of internal documents, trade records, and technical manuals. Query your entire business history in conversational natural language with citation guarantees.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">UAE Sovereign Compliance</h3>
                      <p className="text-sm text-slate-400">
                        Strict on-premise or UAE-cloud containment ensuring sensitive financial, medical, and governmental records remain within United Arab Emirates jurisdiction.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'chatbot' && (
              <motion.div
                key="chatbot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="border border-emerald-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-emerald-950/20">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Omnichannel Conversational AI</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Custom AI Chatbots: WhatsApp API & Website Conversion
                    </h2>
                    <p className="text-slate-300">
                      Over 80% of inbound customer queries can be resolved instantly without human delay. Our chatbots converse naturally in Gulf Arabic, Modern Standard Arabic, Urdu, and English.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Official WhatsApp Business Bot</h3>
                      <p className="text-sm text-slate-400">
                        Green Badge verification assistance, instant broadcast alerts, interactive carousels, and seamless automated booking directly through WhatsApp.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                        <Globe2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Bilingual Arabic & English NLP</h3>
                      <p className="text-sm text-slate-400">
                        Trained on regional Gulf nuances and local UAE colloquial terms, ensuring your local Arab and expatriate clientele feel completely understood.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">CRM & Payment Gateway Sync</h3>
                      <p className="text-sm text-slate-400">
                        Connect with HubSpot, Zoho, Salesforce, Stripe, and UAE local payment providers for instant checkout and automated lead qualification.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cloud' && (
              <motion.div
                key="cloud"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="border border-sky-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-sky-950/20">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-sky-400 font-bold text-sm uppercase tracking-wider">Enterprise Infrastructure & Reliability</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Enterprise Cloud Solutions, Migration & Disaster Recovery
                    </h2>
                    <p className="text-slate-300">
                      Modernize outdated on-premise hardware. Migrate legacy servers to resilient Google Cloud, AWS, or Azure architectures with 99.99% uptime guarantees and physical lab maintenance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-sky-500/10 text-sky-400 mb-4">
                        <Server className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Zero-Downtime Cloud Migration</h3>
                      <p className="text-sm text-slate-400">
                        Continuous live database replication ensuring business operations continue uninterrupted while your workload shifts to modern cloud tiers.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-sky-500/10 text-sky-400 mb-4">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Immutable Disaster Recovery</h3>
                      <p className="text-sm text-slate-400">
                        Protection against ransomware and server crashes. Automated daily snapshots stored in geo-redundant encrypted storage buckets.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-sky-500/10 text-sky-400 mb-4">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">FinOps & Cost Optimization</h3>
                      <p className="text-sm text-slate-400">
                        Audit cloud resource overprovisioning, eliminate idle compute cycles, and cut monthly cloud billing by 30% to 50%.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'google-ai' && (
              <motion.div
                key="google-ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="border border-indigo-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-indigo-950/20">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Google Cloud & Gemini Ecosystem</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Google AI, Vertex AI & Gemini Business Integrations
                    </h2>
                    <p className="text-slate-300">
                      Leverage Google's massive context window and industry-leading reasoning. We integrate Gemini models directly into your company's workflows, document parsing, and Google Workspace.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-indigo-500/10 text-indigo-400 mb-4">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Gemini Multimodal Processing</h3>
                      <p className="text-sm text-slate-400">
                        Extract tables from scanned Arabic invoices, verify identity documents, and analyze complex blueprints with state-of-the-art vision and text comprehension.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-indigo-500/10 text-indigo-400 mb-4">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Vertex AI Search & Conversation</h3>
                      <p className="text-sm text-slate-400">
                        Deploy enterprise-grade search that provides answers directly from your internal company data without exposing intellectual property to public models.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="p-3 w-fit rounded-lg bg-indigo-500/10 text-indigo-400 mb-4">
                        <Code className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Google Workspace AI Automation</h3>
                      <p className="text-sm text-slate-400">
                        Custom AppSheet, Google Apps Script, and Gemini integrations for Gmail, Google Drive, and Google Sheets to supercharge team velocity.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Chatbot Simulator & Live Demo */}
      <section id="interactive-simulator" className="py-12 bg-slate-900/50 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Live AI Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Test Our Conversational AI Simulator
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Experience the speed and intelligence of our custom NLP models. Type questions about AIP architecture, pricing, WhatsApp bot integration, or Google Cloud migration.
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-400">Quick Prompt Chips:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setChatInput("How much does a WhatsApp AI Chatbot cost?")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
                  >
                    💬 Chatbot Pricing?
                  </button>
                  <button
                    onClick={() => setChatInput("How does Google AI Gemini work for my company?")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition-colors"
                  >
                    🧠 Google AI Gemini?
                  </button>
                  <button
                    onClick={() => setChatInput("What is AIP enterprise automation?")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
                  >
                    ⚡ AIP Automation?
                  </button>
                  <button
                    onClick={() => setChatInput("هل توفرون شات بوت باللغة العربية للواتساب؟")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
                  >
                    🇦🇪 شات بوت عربي؟
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Ready to deploy a custom bot for your company?</div>
                <div>Our team sets up verified APIs and trains custom models in under 7 days.</div>
              </div>
            </div>

            {/* Chatbot Window */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden flex flex-col h-[460px]">
                {/* Header */}
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        Al Sharq Enterprise AI Bot
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-xs text-slate-400">Online • Bilingual UAE AI Engine</div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 px-2.5 py-1 rounded bg-slate-800">
                    Simulator Mode
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === 'user'
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block text-right">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2 text-xs text-cyan-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                        <span>Generating response...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSimulateChat} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about AI Chatbots, AIP, Cloud, or Google AI..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Price & Architecture Estimator */}
      <section className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Transparent UAE Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              AI & Cloud Solution Cost Estimator
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Select your requirements below to calculate an estimated implementation package with zero hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              {/* Select Service */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  1. Select Primary Technology Vertical
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSolution('chatbot')}
                    className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all ${
                      selectedSolution === 'chatbot'
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    AI Chatbot (WhatsApp/Web)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSolution('aip')}
                    className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all ${
                      selectedSolution === 'aip'
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    AIP Automation
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSolution('cloud')}
                    className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all ${
                      selectedSolution === 'cloud'
                        ? 'border-sky-500 bg-sky-950/40 text-sky-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Cloud Migration
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSolution('google-ai')}
                    className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all ${
                      selectedSolution === 'google-ai'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Google AI & Gemini
                  </button>
                </div>
              </div>

              {/* Select Scale Tier */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  2. Implementation Scale & Traffic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setScaleTier('starter')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scaleTier === 'starter'
                        ? 'border-cyan-500 bg-cyan-950/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white text-sm">Starter / SME</div>
                    <div className="text-xs text-slate-400 mt-1">Up to 2,500 monthly queries, single channel, standard response time.</div>
                  </div>

                  <div
                    onClick={() => setScaleTier('growth')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scaleTier === 'growth'
                        ? 'border-cyan-500 bg-cyan-950/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white text-sm">Growth & Business</div>
                    <div className="text-xs text-slate-400 mt-1">Up to 15,000 queries, multi-channel (WhatsApp + Web), CRM sync.</div>
                  </div>

                  <div
                    onClick={() => setScaleTier('enterprise')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scaleTier === 'enterprise'
                        ? 'border-cyan-500 bg-cyan-950/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white text-sm">Enterprise Multi-Brand</div>
                    <div className="text-xs text-slate-400 mt-1">Unlimited queries, custom fine-tuning, dedicated cloud cluster & SLA.</div>
                  </div>
                </div>
              </div>

              {/* Optional SLA */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  id="cloudSupport"
                  checked={includeCloudSupport}
                  onChange={(e) => setIncludeCloudSupport(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700"
                />
                <label htmlFor="cloudSupport" className="text-sm text-slate-300 cursor-pointer">
                  Include 24/7 Proactive Telemetry Monitoring & Prompt Maintenance (+AED 450/mo)
                </label>
              </div>
            </div>

            {/* Price Output */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 shadow-xl space-y-4">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">Estimated Investment</span>
              <div className="text-4xl font-extrabold text-white">
                AED {calculateEstimate().toLocaleString()}
                <span className="text-xs text-slate-400 font-normal block mt-1">VAT compliant invoice • Turnkey implementation</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Implementation Speed:</span>
                  <span className="text-white font-semibold">5 - 8 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages:</span>
                  <span className="text-white font-semibold">Arabic, English, Urdu</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Residency:</span>
                  <span className="text-emerald-400 font-semibold">UAE In-Country Cloud</span>
                </div>
              </div>

              <a
                href={`https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20used%20your%20cost%20estimator%20for%20${selectedSolution.toUpperCase()}%20(${scaleTier})%20estimated%20at%20AED%20${calculateEstimate()}.%20Let's%20discuss.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
              >
                <span>Confirm Estimate via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-slate-400 text-center">
                Physical lab consultation available in Muwaileh, Sharjah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related AI & Cloud Blogs & Ranking Guides */}
      <section className="py-12 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">In-Depth Technical Insights</span>
              <h2 className="text-2xl font-bold text-white mt-1">
                AI & Cloud Knowledge Base (UAE & GCC)
              </h2>
            </div>

            <Link to="/blog" className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              View All Technical Guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/blog/aip-enterprise-ai-platform-automation-uae-guide" 
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase">AIP & Enterprise Automation</span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  AIP (AI Platform) & Enterprise Automation in UAE: Complete 2026 Guide
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Architecture, ROI, local data compliance, and operational scaling for Dubai and Sharjah enterprises.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Eng. Tariq Al-Mansoor</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link 
              to="/blog/ai-chatbot-development-uae-whatsapp-web-arabic" 
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase">AI Chatbot Development</span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                  Custom AI Chatbot Development in UAE: WhatsApp & Multilingual Arabic Bots
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Learn how UAE businesses use WhatsApp AI bots, Gulf Arabic NLP, and CRM integrations to multiply sales.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Al Sharq AI Team</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link 
              to="/blog/google-ai-vertex-gemini-solutions-uae-dubai-sharjah" 
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase">Google AI & Gemini</span>
                <h3 className="text-lg font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                  Google AI & Vertex AI Solutions in UAE: Implementing Google Gemini for Business
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Multimodal reasoning, document intelligence, and enterprise search on Google Cloud Vertex AI.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Google AI Specialist Group</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Contact & Office Location */}
      <section className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Book In-Person Technical Assessment</span>
              <h3 className="text-2xl font-bold text-white">Visit Our Muwaileh Sharjah Technology Center</h3>
              <p className="text-slate-300 text-sm max-w-xl">
                {BUSINESS_INFO.address.streetAddress}, Sharjah, United Arab Emirates.
                Our senior AI engineers and cloud architects are available Saturday through Thursday.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href={`tel:${BUSINESS_INFO.telephone}`}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{BUSINESS_INFO.displayPhone}</span>
              </a>

              <a 
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20would%20like%20to%20schedule%20an%20in-person%20consultation%20for%20AI%20and%20Cloud."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AICloudSolutionsPage;
