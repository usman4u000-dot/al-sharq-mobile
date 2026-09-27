import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  BellRing, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Globe 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ShopBuyerGuideAndSEO() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      qEn: "How does Al Sharq offer brand-new smartphones at 20% below shopping mall prices?",
      qAr: "كيف يوفر متجر الشرق هواتف ذكية جديدة بخصم 20% أقل من أسعار المولات؟",
      aEn: "Al Sharq Mobile operates as a direct wholesale importer headquartered in Muwaileh, Sharjah. By clearing containerized batches directly through UAE ports and bypassing high retail mall overheads, we pass import savings directly to verified online buyers with official TDRA/TRA local warranty.",
      aAr: "يعمل متجر الشرق كمستورد مباشر بالجملة ومقره في منطقة مويلح بالشارقة. من خلال استيراد شحنات الحاويات مباشرة عبر موانئ الإمارات وتجنب الإيجارات الضخمة للمولات، نقدم وفورات الاستيراد مباشرة لعملاء الموقع الإلكتروني مع ضمان رسمي معتمد."
    },
    {
      qEn: "What does it mean when a model shows 'Stock: 0' and how does the incoming shipment work?",
      qAr: "ماذا يعني ظهور 'المخزون: 0' وكيف تعمل آلية الشحنة القادمة؟",
      aEn: "Due to high wholesale demand, we strictly allocate 4 to 5 units per model for each import batch. When current warehouse stock reaches 0, you can register for the incoming shipment arriving in 4 to 5 days. Your queue position is locked on a strict First-Come, First-Served basis at the locked discount price.",
      aAr: "نظراً للإقبال الشديد على أسعار الجملة، نخصص ما بين 4 إلى 5 قطع فقط لكل موديل في كل دفعة. عند نفاد المخزون (0)، يمكنك حجز أسبقيتك في الشحنة القادمة التي تصل خلال 4 إلى 5 أيام مع تثبيت سعر الخصم حسب أولوية الحجز."
    },
    {
      qEn: "How will I be contacted once the new batch arrives (Restock VIP Alert)?",
      qAr: "كيف سيتم التواصل معي فور وصول الشحنة الجديدة (تنبيه إعادة التوفر)؟",
      aEn: "Your Full Name, Phone/WhatsApp number, and Email are securely logged into our Sharjah warehouse system. The instant boxes unpack, pass quality inspection, and update in inventory, our sales desk automatically reaches out via WhatsApp and Email with your private collection ticket before the batch is released publicly.",
      aAr: "يتم تسجيل اسمك ورقم هاتفك/واتساب وإيميلك بأمان في نظام مستودع الشارقة. فور تفريغ الطرود وفحصها مخبرياً وتحديث المخزون، يقوم فريق المبيعات بمراسلتك فوراً عبر الواتساب والإيميل لتسليمك جهازك قبل طرحه للجمهور العام."
    },
    {
      qEn: "Do you ship to Saudi Arabia, Oman, Bahrain, Kuwait, Qatar, and Turkey?",
      qAr: "هل توفرون الشحن السريع إلى السعودية، عمان، البحرين، الكويت، قطر وتركيا؟",
      aEn: "Yes. Al Sharq provides direct insured air express courier dispatch via DHL, SMSA, and Aramex across all GCC countries within 24 to 48 hours. Devices are dispatched under personal-use transit customs protocols, ensuring a smooth and hassle-free delivery to your doorstep in Riyadh, Jeddah, Muscat, Manama, Kuwait City, or Doha.",
      aAr: "نعم، يوفر متجر الشرق شحناً جوياً مؤمناً وسريعاً عبر DHL و SMSA وآرامكس لكافة دول الخليج خلال 24 إلى 48 ساعة. يتم شحن الأجهزة وفق بروتوكولات الشحن الشخصي المعفى من التعقيدات الجمركية حتى باب منزلك في الرياض، جدة، مسقط، المنامة، الكويت، الدوحة، واسطنبول."
    },
    {
      qEn: "Why does the sale pause for 2-3 days between monthly flash waves?",
      qAr: "لماذا تتوقف العروض لمدة 2-3 أيام بين موجات الخصم الشهرية؟",
      aEn: "Our store follows a transparent 30-day rotating import calendar. Every 3 to 5 days of active flash drops are separated by 2 to 3 days of restock cooldown. During this window, our certified technical lab conducts component diagnostics, unpacks cargo, and prepares the next incoming flagship batch.",
      aAr: "يتبع متجرنا جدولاً زمنياً شفافاً لتدوير الشحنات كل 30 يوماً. كل 3 إلى 5 أيام من العروض تتبعها فترة هدوء مؤقتة (2 إلى 3 أيام) لإجراء الفحص الفني للطرود المستوردة وتجهيز الشحنة التالية بأعلى معايير الجودة."
    }
  ];

  return (
    <div className="mt-16 space-y-12">
      
      {/* Editorial Content: Authority & Trust Signals */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-black text-xs rounded-full uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4 text-brand-orange" />
            <span>{isAr ? 'دليل الشراء المعتمد • الشارقة ودول الخليج' : 'Official Buyers Guide • Direct Import Economics'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            {isAr 
              ? 'لماذا يقدم متجر الشرق أجهزة فلاج شيب أصلية بأقل بـ 20% من أسعار المولات؟'
              : 'Why Al Sharq Delivers Authentic Flagships at 20% Below Shopping Mall Retail'}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? 'تعتبر منطقة مويلح بالشارقة المركز اللوجستي الأبرز لتجارة وتوزيع الأجهزة الإلكترونية في دولة الإمارات ومنطقة الخليج. من خلال منظومة الاستيراد المباشر من المصانع والموانئ، نلغي هوامش الربح المتعددة للموزعين وتكاليف استئجار معارض المولات الفاخرة، مما يمكننا من تقديم أجهزة أصلية مختومة 100% بأسعار الاستيراد الفعلية.'
              : 'Located in the Muwaileh technological hub of Sharjah, Al Sharq Mobile operates at the primary crossroad of direct port electronics distribution in the UAE and GCC. By consolidating shipments directly from global manufacturers and eliminating expensive luxury mall retail overheads, we pass wholesale savings directly to verified consumers.'}
          </p>
        </div>

        {/* 3 Pillars of Al Sharq Trading Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white mb-1">
              {isAr ? 'أجهزة أصلية مختومة بالكامل' : '100% Factory Sealed & Certified'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {isAr
                ? 'جميع الهواتف، الساعات الذكية، والإيربودز مختومة بتغليف المصنع الأصلي مع فحص الرقم التسلسلي ورقم IMEI الرسمي.'
                : 'Every iPhone, Samsung, Huawei, smartwatch, and MacBook is factory sealed with verified IMEIs and official TDRA/TRA warranty documentation.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-brand-orange flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white mb-1">
              {isAr ? 'موجات دورية وفحص جمركي مخبري' : '30-Day Rotating Waves & Lab Audits'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {isAr
                ? 'تدوير منتظم لنسب الخصم كل 3 إلى 5 أيام مع فترات فحص تقني تضمن وصول كل دفعة بجودة لا تشوبها شائبة.'
                : 'Discounts rotate between 12%, 14%, 20%, and 23% drops with scheduled 2-3 day lab inspection pauses to verify cargo integrity.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white mb-1">
              {isAr ? 'شحن خليجي إكسبريس (24-48 ساعة)' : 'GCC Cross-Border Express (24-48h)'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {isAr
                ? 'شحن سريع ومؤمن إلى السعودية، عمان، الكويت، البحرين، قطر، وتركيا مع تسليم مباشر لباب المنزل.'
                : 'Direct air freight dispatch to Riyadh, Muscat, Manama, Doha, and Kuwait City via DHL and Aramex with zero personal customs duty hassle.'}
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions with Schema.org JSON-LD Matching */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 text-brand-blue dark:text-blue-300 font-black text-xs rounded-full uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
            <span>{isAr ? 'الأسئلة الشائعة حول العروض والشحن' : 'Wholesale Flash Deals & Restock FAQ'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {isAr ? 'إجابات شاملة لجميع استفساراتك' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-750/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-gray-900 dark:text-white hover:text-brand-orange transition-colors cursor-pointer"
                >
                  <span>{isAr ? faq.qAr : faq.qEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-orange shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 pt-3 animate-fadeIn">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
