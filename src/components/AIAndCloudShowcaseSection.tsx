import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bot, 
  Cloud, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Server,
  Layers
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AIAndCloudShowcaseSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-b border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'قسم التقنيات المتقدمة 2026' : 'Enterprise Technology Division 2026'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {isAr ? (
                <>
                  حلول <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">منصات الذكاء الاصطناعي (AIP)، روبوتات الدردشة، السحابة وجوجل AI</span>
                </>
              ) : (
                <>
                  Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">AIP, AI Chatbot, Cloud</span> & Google AI
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isAr 
                ? 'نمكن الشركات والمؤسسات في الشارقة ودبي والإمارات من أتمتة العمليات، وتطوير شات بوت واتساب ذكي باللغة العربية، والتحول السحابي الآمن مع جوجل كلاود.'
                : 'Turnkey intelligence for UAE enterprises. Deploy custom AIP automation, official WhatsApp AI chatbots, robust cloud migrations, and Google Gemini reasoning with local UAE data residency.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/ai-cloud-solutions"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>{isAr ? 'عرض حلول الذكاء الاصطناعي والسحابة' : 'Explore AI & Cloud Hub'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20am%20interested%20in%20AIP,%20Chatbots,%20Cloud,%20or%20Google%20AI%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'استشارة واتساب فورية' : 'WhatsApp AI Team'}</span>
            </a>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. AIP Card */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-500/70 transition-all flex flex-col justify-between group">
            <div>
              <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                {isAr ? 'منصات الأتمتة' : 'Enterprise Automation'}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'منصات AIP الذكية' : 'AIP (AI Platforms)'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr
                  ? 'بناء وكلاء ذكاء اصطناعي ذاتية للربط مع أنظمة الشركات (ERP/CRM) وأتمتة الفواتير وسلاسل الإمداد.'
                  : 'Multi-agent orchestration and private enterprise vector lakes connected to ERPs, reducing manual workflows by 70%.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">{isAr ? 'امتثال محلي كامل' : 'UAE Sovereign'}</span>
              <Link to="/ai-cloud-solutions" className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {isAr ? 'التفاصيل' : 'Learn'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Chatbot Card */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 hover:border-emerald-500/70 transition-all flex flex-col justify-between group">
            <div>
              <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {isAr ? 'روبوتات الواتساب' : 'WhatsApp & Web Bots'}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'شات بوت ذكي ثنائي اللغة' : 'AI Chatbot Development'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr
                  ? 'روبوتات محادثة للواتساب والمواقع تفهم اللهجات الخليجية والإماراتية والإنجليزية مع حجز وتأكيد آلي 24/7.'
                  : 'Official WhatsApp Business API bots with Gulf Arabic and English NLP, appointment booking, and instant lead capture.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">{isAr ? 'تسليم خلال 7 أيام' : '7-Day Turnkey'}</span>
              <Link to="/ai-cloud-solutions" className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {isAr ? 'التفاصيل' : 'Learn'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Cloud Card */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-sky-500/30 hover:border-sky-500/70 transition-all flex flex-col justify-between group">
            <div>
              <div className="p-3 w-fit rounded-xl bg-sky-500/10 text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                <Cloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                {isAr ? 'الحوسبة السحابية' : 'Cloud Infrastructure'}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'ترحيل الخوادم والنسخ الاحتياطي' : 'Cloud Migration & Backup'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr
                  ? 'نقل سلس للخوادم إلى Google Cloud وAWS وAzure بدون توقف، مع خطط طوارئ ونسخ احتياطي مشفر ضد الفدية.'
                  : 'Zero-downtime database and server migration, ransomware-proof daily backups, and up to 40% FinOps cost reduction.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-sky-400 font-semibold">{isAr ? 'ضمان 99.99%' : '99.99% Uptime'}</span>
              <Link to="/ai-cloud-solutions" className="text-sky-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {isAr ? 'التفاصيل' : 'Learn'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4. Google AI Card */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-indigo-500/30 hover:border-indigo-500/70 transition-all flex flex-col justify-between group">
            <div>
              <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                {isAr ? 'محركات جوجل الذكية' : 'Google Cloud AI'}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'حلول Google AI & Gemini' : 'Google AI & Gemini'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr
                  ? 'تكامل رسمي مع Google Vertex AI ونماذج Gemini لفهم المستندات والبحث فائق السرعة وتطبيقات Workspace.'
                  : 'Multimodal processing, Google Vertex AI enterprise search, and automated Google Workspace workflows.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-indigo-400 font-semibold">{isAr ? 'نماذج Gemini المتقدمة' : 'Gemini Models'}</span>
              <Link to="/ai-cloud-solutions" className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {isAr ? 'التفاصيل' : 'Learn'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAndCloudShowcaseSection;
