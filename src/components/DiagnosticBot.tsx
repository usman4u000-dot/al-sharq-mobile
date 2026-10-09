import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Cpu, 
  Smartphone, 
  Zap, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  ArrowRight, 
  Sparkles,
  Phone,
  HelpCircle,
  Flame,
  Minus,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isActionable?: boolean;
  actionText?: string;
  actionUrl?: string;
  priceBadge?: string;
  timeEstimate?: string;
};

const DIAGNOSTIC_RULES = [
  {
    keywords: ['screen', 'glass', 'shattered', 'crack', 'cracked', 'display', 'شاشة', 'كسر', 'اسکرین'],
    response: "For screen and glass damage: If your OLED touch is working, we can replace just the outer glass via precision OCA optical lamination (saving up to 50%). If the display has black ink or vertical lines, a complete OEM panel replacement takes only 25 minutes with 1-Year Lab Warranty.",
    actionText: "Get Screen Estimate",
    actionUrl: "/estimate",
    priceBadge: "From AED 150",
    timeEstimate: "20 - 25 Mins"
  },
  {
    keywords: ['battery', 'charge', 'drain', 'die fast', 'turn off', 'power', 'بطارية', 'شحن', 'تفريغ', 'بیٹری'],
    response: "Battery degradation is accelerated in UAE's high ambient heat. We install high-density 0-cycle OEM grade battery cells with thermal circuit protection in 20 minutes.",
    actionText: "Check Battery Pricing",
    actionUrl: "/repair/battery",
    priceBadge: "From AED 100",
    timeEstimate: "20 Mins"
  },
  {
    keywords: ['water', 'liquid', 'coffee', 'tea', 'rain', 'swimming', 'pool', 'wet', 'ماء', 'سقوط بالماء', 'پانی'],
    response: "⚠️ CRITICAL EMERGENCY: Do NOT plug your device into a charger and do not turn it on! Bring it to our Muwaileh workshop immediately for ultrasonic chemical de-oxidation to prevent permanent motherboard corrosion.",
    actionText: "Liquid Emergency Guide",
    actionUrl: "/repair/liquid-damage",
    priceBadge: "Diagnostic AED 50",
    timeEstimate: "1 - 2 Hours"
  },
  {
    keywords: ['turn on', 'dead', 'black screen', 'logo', 'boot', 'apple logo', 'samsung logo', 'ميت', 'لا يعمل', 'مذربورد'],
    response: "If your device is completely dead, stuck on boot logo, or restarting in a loop, it indicates a Level 4 Logic Board or Power Management IC short circuit. Our micro-soldering engineers diagnose and repair micro-traces under microscope.",
    actionText: "Book Logic Board Diagnostic",
    actionUrl: "/repair/logic-board",
    priceBadge: "From AED 250",
    timeEstimate: "2 - 4 Hours"
  },
  {
    keywords: ['macbook', 'laptop', 'computer', 'keyboard', 'trackpad', 'ماك', 'لابتوب', 'ماك بوك'],
    response: "We service all Apple Silicon (M4, M3, M2, M1) and Intel MacBooks: logic board micro-soldering, liquid spill recovery, keyboard replacements, and screen flexgate repairs at direct wholesale rates.",
    actionText: "View MacBook Repairs",
    actionUrl: "/repair/macbook",
    priceBadge: "From AED 200",
    timeEstimate: "Same-Day"
  },
  {
    keywords: ['shop', 'buy', 'phone', '20%', 'discount', 'iphone 18', 'samsung s26', 'شراء', 'هواتف', 'خصم', 'اسعار'],
    response: "Al Sharq Mobile Store imports directly from port containers: buy brand-new factory-sealed iPhone 18, 17, 16 Pro Max and Samsung S26 Ultra at 20% below shopping mall retail! With rotating 30-day waves and express GCC shipping.",
    actionText: "View 20% OFF Flagships",
    actionUrl: "/shop",
    priceBadge: "Save up to AED 1,000+",
    timeEstimate: "In Stock / 4-5d Batch"
  },
  {
    keywords: ['location', 'where are you', 'address', 'visit', 'shop', 'store', 'مويلح', 'موقع', 'عنوان', 'لوکیشن'],
    response: "We are located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Industrial Area, Sharjah (near Sharjah University City, 5 mins from Sahara Centre). Open daily until 11:00 PM.",
    actionText: "Open in Google Maps",
    actionUrl: "https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
  },
  {
    keywords: ['gcc', 'saudi', 'oman', 'bahrain', 'kuwait', 'qatar', 'شحن', 'السعودية', 'عمان', 'سعودیہ'],
    response: "Yes! We provide express insured air delivery across Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar via DHL and Aramex in 24 to 48 hours with personal transit customs protocol.",
    actionText: "View GCC Services",
    actionUrl: "/gcc-services"
  },
  {
    keywords: ['aip', 'ai platform', 'automation', 'enterprise ai', 'ذكاء اصطناعي', 'أتمتة', 'منصة ذكاء', 'اے آئی پی'],
    response: "Al Sharq builds enterprise-grade AIP (AI Platforms) and autonomous agent workflows for UAE corporations. From custom ERP integration (SAP/Oracle) to local UAE sovereign data compliance, we automate critical operations with rapid ROI.",
    actionText: "Explore AIP Solutions",
    actionUrl: "/ai-cloud-solutions",
    priceBadge: "Enterprise Ready",
    timeEstimate: "5 - 8 Days Deployment"
  },
  {
    keywords: ['chatbot', 'chat bot', 'bot', 'whatsapp bot', 'واتساب بوت', 'شات بوت', 'چیٹ بوٹ', 'چٹ بوٹ'],
    response: "We engineer multilingual AI Chatbots for official WhatsApp Business API & websites in Emirati/Gulf Arabic and English. Features include 24/7 automated booking, instant customer conversion, catalog checkouts, and CRM synchronization.",
    actionText: "Build Your AI Chatbot",
    actionUrl: "/ai-cloud-solutions",
    priceBadge: "From AED 1,200",
    timeEstimate: "7 Days Delivery"
  },
  {
    keywords: ['cloud', 'cloud migration', 'server', 'aws', 'azure', 'backup', 'disaster recovery', 'سحابة', 'كلاود', 'کلاؤڈ'],
    response: "Our Cloud Infrastructure team provides zero-downtime server migrations, hybrid architectures, ransomware-proof daily backups, and FinOps cost optimization on Google Cloud, AWS, and Azure with 99.99% uptime guarantees.",
    actionText: "View Cloud Migration",
    actionUrl: "/ai-cloud-solutions",
    priceBadge: "Free Audit",
    timeEstimate: "Zero Downtime"
  },
  {
    keywords: ['google ai', 'gemini', 'vertex ai', 'جوجل', 'جوجل ai', 'جيميني', 'گوگل اے آئی'],
    response: "We implement official Google AI and Vertex AI Gemini integrations: multimodal document processing, enterprise neural search, and Google Workspace AI tools with local UAE data containment.",
    actionText: "Google AI & Gemini Integration",
    actionUrl: "/ai-cloud-solutions",
    priceBadge: "Certified Stack",
    timeEstimate: "Turnkey Setup"
  },
  {
    keywords: ['hotel', 'hotels', 'dubai hotel', 'burj khalifa', 'trip', 'فندق', 'فنادق', 'دبي', 'ہوٹل', 'ہوٹلز'],
    response: "Planning your stay in Dubai? Get exclusive rates up to 60% OFF on 4 & 5-star hotels near Burj Khalifa, Dubai Mall, Marina & Deira on Trip.com with free cancellation. Check our comprehensive Dubai tourist hotel guide!",
    actionText: "View Dubai Hotels (60% OFF)",
    actionUrl: "https://www.trip.com/hotels/list?city=220&display=Dubai&optionId=220&optionType=City&optionName=Dubai&Allianceid=10929626&SID=332911573&trip_sub1=&trip_sub3=D20154955",
    priceBadge: "Up to 60% OFF",
    timeEstimate: "Instant Booking"
  },
  {
    keywords: ['travel', 'tourist', 'dubai apps', 'careem', 'nol', 'esim', 'سياحة', 'تطبيقات', 'سیاحت', 'evonixtec'],
    response: "Visiting Dubai? You need 5 essentials: Careem app for rides, Nol card for Dubai Metro, local 5G eSIM, Type G UK plug adapter, and a heat-safe power bank. Detailed tech reviews are available on our tech partner Evonixtec.com!",
    actionText: "Dubai Travel Tech Guide",
    actionUrl: "/blog/5-best-apps-and-tech-you-need-before-traveling-to-dubai-2026",
    priceBadge: "Free Guide",
    timeEstimate: "5 Mins Read"
  }
];

const QUICK_DIAGNOSTIC_CHIPS = [
  { label: '🏨 Dubai Hotels (60% OFF)', query: 'Where can I find the best hotel deals in Dubai near Burj Khalifa?' },
  { label: '✈️ Dubai Travel Apps & Tech', query: 'What apps and tech gadgets do I need before traveling to Dubai?' },
  { label: '🤖 AI Chatbot (WhatsApp)', query: 'I want to build an AI Chatbot for WhatsApp and website' },
  { label: '⚡ Enterprise AIP', query: 'Tell me about AIP AI Platform and automation' },
  { label: '🧠 Google AI / Gemini', query: 'How can we implement Google AI and Gemini in our business?' },
  { label: '📱 Broken Screen', query: 'My screen is cracked' },
  { label: '🔋 Battery Drain', query: 'Battery draining fast' },
  { label: '🛍️ 20% OFF Phones', query: 'Buy phones at 20% discount' },
  { label: '📍 Store Location', query: 'Where is your shop located?' }
];

interface DiagnosticBotProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export default function DiagnosticBot({ isOpenExternal, onCloseExternal }: DiagnosticBotProps = {}) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;
  
  const setIsOpen = (val: boolean) => {
    if (onCloseExternal && !val) {
      onCloseExternal();
    }
    setInternalIsOpen(val);
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-diagnostic-bot', handleOpen);
    return () => window.removeEventListener('open-diagnostic-bot', handleOpen);
  }, []);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll on small screens when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "👋 Welcome to Al Sharq AI Diagnostic Desk! I'm trained on 15,000+ repair cases. What device issue are you experiencing today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let foundMatch = false;

    setTimeout(() => {
      for (const rule of DIAGNOSTIC_RULES) {
        if (rule.keywords.some(kw => lowerInput.includes(kw))) {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'bot',
            text: rule.response,
            isActionable: true,
            actionText: rule.actionText,
            actionUrl: rule.actionUrl,
            priceBadge: rule.priceBadge,
            timeEstimate: rule.timeEstimate
          }]);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: "I've analyzed your description. For this specific fault, let me connect you directly with our Master Technician on WhatsApp for an exact diagnostic quote!",
          isActionable: true,
          actionText: "Chat with Master Technician",
          actionUrl: "https://wa.me/971507117043"
        }]);
      }
      setIsTyping(false);
    }, 600);
  };

  const handleSend = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || inputValue).trim();
    if (!query) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: query }]);
    setInputValue('');
    setIsTyping(true);
    processUserInput(query);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 bg-gradient-to-r from-brand-blue via-indigo-900 to-slate-900 text-white px-3.5 py-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-brand-orange/70 cursor-pointer group"
          title="Open AI Diagnostic Assistant"
          aria-label="Open AI Diagnostic Assistant"
        >
          <div className="relative">
            <Cpu className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <span className="font-black text-xs uppercase tracking-wide">
            {isAr ? 'فحص الأعطال الذكي' : 'AI Diagnostic Desk'}
          </span>
        </button>
      )}

      {/* Interactive AI Diagnostic Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay to Click-to-Close (Guarantees user can always close by tapping outside) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99990] transition-opacity"
              aria-hidden="true"
            />

            {/* Chat Box Container: Responsive, Safe Viewport Height, Top-Level Z-Index */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-[99999] inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[430px] h-[88dvh] sm:h-[560px] max-h-[88dvh] sm:max-h-[580px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border-t-2 sm:border-2 border-brand-orange/40 dark:border-slate-700 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="diagnostic-desk-title"
            >
              {/* Mobile Drag Indicator Bar */}
              <div 
                onClick={() => setIsOpen(false)}
                className="w-full pt-2 pb-1 flex justify-center bg-brand-blue sm:hidden cursor-pointer"
                title="Tap to close"
              >
                <div className="w-12 h-1.5 bg-white/40 rounded-full hover:bg-white/80 transition-colors" />
              </div>

              {/* Main Sticky Header */}
              <div className="p-3.5 sm:p-4 bg-gradient-to-r from-brand-blue via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-orange/20 border border-brand-orange/50 flex items-center justify-center text-amber-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="diagnostic-desk-title" className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                      <span>{isAr ? 'مساعد الفحص والتشخيص الذكي' : 'Al Sharq AI Diagnostic Desk'}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-mono">v2.6</span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Muwaileh Lab Knowledge Base Active</span>
                    </div>
                  </div>
                </div>

                {/* Big, High-Contrast Close Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs rounded-xl flex items-center gap-1 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                    title="Close Chat (Esc)"
                    aria-label="Close Chat"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                    <span className="text-[11px]">{isAr ? 'إغلاق' : 'Close'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Diagnostic Chips Bar */}
              <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/60 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                {QUICK_DIAGNOSTIC_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(undefined, chip.query)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange text-gray-700 dark:text-gray-200 font-bold text-[11px] border border-slate-200 dark:border-slate-600 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-brand-orange text-white rounded-br-none shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                      {/* Metadata Badges if Available */}
                      {(msg.priceBadge || msg.timeEstimate) && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] font-bold">
                          {msg.priceBadge && (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              💰 {msg.priceBadge}
                            </span>
                          )}
                          {msg.timeEstimate && (
                            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              <span>{msg.timeEstimate}</span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Button */}
                      {msg.isActionable && msg.actionText && msg.actionUrl && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                          {msg.actionUrl.startsWith('http') ? (
                            <a
                              href={msg.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue hover:bg-blue-900 text-white font-bold rounded-xl text-[11px] shadow-sm transition-all"
                            >
                              <span>{msg.actionText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          ) : (
                            <Link
                              to={msg.actionUrl}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-[11px] shadow-sm transition-all"
                            >
                              <span>{msg.actionText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none text-gray-500 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[10px] font-mono ml-1">Analyzing Lab Data...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Sticky Action / Close Bar */}
              <div className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
                <span className="flex items-center gap-1 text-[10px]">
                  <span>⚡ 24/7 Muwaileh Live Support</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-red-600 dark:text-red-400 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>{isAr ? 'إغلاق النافذة' : 'Close Window'}</span>
                </button>
              </div>

              {/* Input Form at Bottom */}
              <form onSubmit={handleSend} className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isAr ? "صف العطل (مثلاً: كسر شاشة، ماء، بطارية)..." : "Describe issue (e.g. S24 screen, water, battery)..."}
                  className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-brand-orange"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 bg-brand-orange hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl transition-transform active:scale-95 cursor-pointer shrink-0"
                  title="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
