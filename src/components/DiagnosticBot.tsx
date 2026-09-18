import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Cpu, Smartphone, Zap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isActionable?: boolean;
  actionText?: string;
  actionUrl?: string;
};

const DIAGNOSTIC_RULES = [
  {
    keywords: ['screen', 'glass', 'shattered', 'crack', 'cracked', 'display'],
    response: "It sounds like you need a Screen or Glass replacement. We use OEM-quality panels. Would you like to get a precise estimate?",
    actionText: "Get Screen Estimate",
    actionUrl: "/repair-estimate"
  },
  {
    keywords: ['battery', 'charge', 'drain', 'die fast', 'turn off', 'power'],
    response: "Battery issues are very common, especially in Sharjah's heat. A battery replacement takes about 30 minutes. Should we check the prices?",
    actionText: "View Battery Pricing",
    actionUrl: "/repair/battery"
  },
  {
    keywords: ['water', 'liquid', 'coffee', 'tea', 'rain', 'swimming', 'pool', 'wet'],
    response: "Liquid damage requires immediate attention! Do NOT attempt to turn the device on or charge it. Bring it to our Muwaileh shop immediately for ultrasonic cleaning.",
    actionText: "Liquid Damage Info",
    actionUrl: "/repair/liquid-damage"
  },
  {
    keywords: ['turn on', 'dead', 'black screen', 'logo', 'boot', 'apple logo', 'samsung logo'],
    response: "If the device is completely dead or stuck on the logo, it could be a Logic Board or IC chip issue. Our Level 4 micro-soldering technicians can diagnose this. Book a free diagnostic.",
    actionText: "Book Logic Board Diagnostic",
    actionUrl: "/repair/logic-board"
  },
  {
    keywords: ['macbook', 'laptop', 'computer', 'keyboard', 'trackpad'],
    response: "We handle all laptop and MacBook repairs, from logic board microsoldering to battery replacements. Let's get that fixed.",
    actionText: "View Laptop Repairs",
    actionUrl: "/repair/macbook"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
    response: "Hello! I'm TechBot, the AI assistant for Al Sharq Mobile. How can I help you with your device today?"
  },
  {
    keywords: ['how are you', 'how do you do', "what's up", 'whats up'],
    response: "I'm functioning perfectly at 100% efficiency! Thanks for asking. What can I fix for you today?"
  },
  {
    keywords: ['your name', 'who are you', 'what are you'],
    response: "I am TechBot Diagnostic AI, a highly advanced digital assistant created for Al Sharq Mobile. I can help diagnose device issues and give you repair estimates."
  },
  {
    keywords: ['location', 'where are you', 'address', 'visit', 'shop', 'store'],
    response: "We are located in Muwaileh, Sharjah, UAE. You can find our exact location on Google Maps by searching for 'Al Sharq Mobile Phone Repair'.",
    actionText: "Open in Maps",
    actionUrl: "https://maps.google.com/?q=Al+Sharq+Mobile+Phone+Repair+Sharjah"
  },
  {
    keywords: ['phone number', 'contact', 'call you', 'number'],
    response: "You can reach us anytime at +971 50 711 7043. We're also available on WhatsApp on the same number!",
    actionText: "Chat on WhatsApp",
    actionUrl: "https://wa.me/971507117043"
  },
  {
    keywords: ['hours', 'open', 'close', 'timing', 'time'],
    response: "We are open Saturday to Thursday from 9:00 AM to 11:00 PM, and Friday from 2:00 PM to 11:00 PM."
  }
];

interface DiagnosticBotProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export default function DiagnosticBot({ isOpenExternal, onCloseExternal }: DiagnosticBotProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    if (onCloseExternal && !val) {
      onCloseExternal();
    }
    setInternalIsOpen(val);
  };

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-diagnostic-bot', handleOpen);
    return () => window.removeEventListener('open-diagnostic-bot', handleOpen);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Hi! I'm the Al Sharq AI Diagnostic Assistant. Describe what's wrong with your device (e.g., 'My iPhone 14 screen is cracked'), and I'll tell you how we can fix it!"
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

    // Simulate AI thinking delay
    setTimeout(() => {
      for (const rule of DIAGNOSTIC_RULES) {
        if (rule.keywords.some(kw => lowerInput.includes(kw))) {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'bot',
            text: rule.response,
            isActionable: true,
            actionText: rule.actionText,
            actionUrl: rule.actionUrl
          }]);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: "I might need our human technician to look at that. You can chat with us directly on WhatsApp for an immediate quote!",
          isActionable: true,
          actionText: "Chat on WhatsApp",
          actionUrl: "https://wa.me/971507117043"
        }]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);
    processUserInput(userMsg);
  };

  return (
    <>
      <div className="z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="hidden md:flex fixed bottom-6 left-6 z-50 bg-brand-orange hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl items-center justify-center transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/30 group"
              aria-label="Open AI Diagnostic Bot"
            >
              <Cpu className="w-7 h-7 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-brand-orange"></span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-20 left-3 right-3 sm:right-auto sm:left-6 sm:bottom-6 sm:w-96 max-w-[calc(100vw-1.5rem)] z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-[480px] max-h-[75vh]"
            >
              {/* Header */}
              <div className="bg-brand-blue dark:bg-slate-950 p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">TechBot Diagnostic AI</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white p-2 transition-colors rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 custom-scrollbar">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-brand-orange text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.isActionable && msg.actionUrl && (
                      <a 
                        href={msg.actionUrl}
                        className="mt-2 text-xs font-bold bg-brand-blue text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm inline-flex items-center gap-1"
                      >
                        {msg.actionText} <Zap className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="E.g. My screen is completely black..."
                    className="flex-1 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 rounded-xl px-4 py-3 text-sm transition-all text-gray-900 dark:text-white"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-brand-orange text-white p-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
