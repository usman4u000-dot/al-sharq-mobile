import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  Phone, 
  Mail, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Cpu, 
  Sparkles, 
  Truck, 
  Building2, 
  Printer, 
  Copy, 
  Check, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Breadcrumbs from '../components/Breadcrumbs';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import UAEDirhamSymbol from '../components/UAEDirhamSymbol';
import { useLanguage } from '../contexts/LanguageContext';
import AIProblemAnalyzer from '../components/AIProblemAnalyzer';
import AIImageDiagnosisScanner from '../components/AIImageDiagnosisScanner';

interface RepairEstimatePageProps {
  onBookNow?: (serviceName?: string) => void;
}

// Device Categories
const DEVICE_CATEGORIES = [
  { id: 'iphone', labelEn: 'iPhone & Apple', labelAr: 'آيفون وأبل', icon: Smartphone },
  { id: 'samsung', labelEn: 'Samsung Galaxy', labelAr: 'سامسونج جالاكسي', icon: Smartphone },
  { id: 'macbook', labelEn: 'MacBook & Laptop', labelAr: 'ماك بوك ولابتوب', icon: Laptop },
  { id: 'ipad', labelEn: 'iPad & Tablet', labelAr: 'آيباد وتابلت', icon: Tablet },
  { id: 'watch', labelEn: 'Smartwatch', labelAr: 'ساعة ذكية', icon: Watch },
  { id: 'other', labelEn: 'Huawei / Android', labelAr: 'هواوي وأندرويد', icon: Cpu }
];

// Models by Category
const MODELS_BY_CATEGORY: Record<string, string[]> = {
  iphone: [
    'iPhone 18 Pro Max (2026)', 'iPhone 18 Pro', 'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air',
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro Max', 'iPhone 12 / 11 Series'
  ],
  samsung: [
    'Samsung Galaxy S26 Ultra (2026)', 'Samsung Galaxy S26+', 'Samsung Galaxy S25 Ultra', 'Samsung Galaxy S25+',
    'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24+', 'Samsung Galaxy S23 Ultra',
    'Samsung Galaxy Z Fold 6', 'Samsung Galaxy Z Fold 5', 'Samsung Galaxy Z Flip 6', 'Samsung Galaxy A Series'
  ],
  macbook: [
    'MacBook Pro 16" (M4 Max / M4 Pro)', 'MacBook Pro 14" (M4)', 'MacBook Air 15" (M3)', 'MacBook Air 13" (M3 / M2)',
    'MacBook Pro 16" (M3 / M2 / M1)', 'MacBook Pro 13" / 15" (Intel)', 'Dell XPS 15 / 13', 'Lenovo ThinkPad X1', 'HP Spectre x360'
  ],
  ipad: [
    'iPad Pro 13" (M4 OLED)', 'iPad Pro 11" (M4 OLED)', 'iPad Air 13" (M2)', 'iPad Air 11" (M2)',
    'iPad Pro 12.9" (M2 / M1)', 'iPad 10th / 9th Gen', 'iPad mini 7 / 6', 'Samsung Galaxy Tab S9 Ultra'
  ],
  watch: [
    'Apple Watch Ultra 2 / Ultra', 'Apple Watch Series 10', 'Apple Watch Series 9 / 8', 'Apple Watch SE 2',
    'Samsung Galaxy Watch 7 / Ultra', 'Samsung Galaxy Watch 6 Classic'
  ],
  other: [
    'Huawei Mate 70 Pro / Mate 60', 'Huawei Pura 70 Ultra', 'Oppo Find X8 Pro / X7',
    'Xiaomi 14 Ultra / 13 Pro', 'Google Pixel 9 Pro / 8 Pro', 'Asus ROG Phone 8', 'Other Device'
  ]
};

// Detailed Damages & Symptoms
const DAMAGE_TYPES = [
  {
    id: 'screen_glass',
    labelEn: 'Cracked Outer Glass (OLED Display Working)',
    labelAr: 'كسر الزجاج الخارجي فقط (الشاشة واللمس سليم)',
    basePriceAED: 180,
    timeMins: '30 Mins',
    descEn: 'Precision OCA optical glass lamination preserving your original factory OLED panel.'
  },
  {
    id: 'screen_full',
    labelEn: 'Broken Screen & Touch / Black Lines / Dead Pixels',
    labelAr: 'كسر الشاشة الداخلية / خطوط سوداء أو عطل اللمس',
    basePriceAED: 290,
    timeMins: '25 Mins',
    descEn: 'Full OLED display assembly replacement with TrueTone & high refresh rate calibration.'
  },
  {
    id: 'battery',
    labelEn: 'Battery Degradation / Fast Drain / Swollen',
    labelAr: 'ضعف البطارية / تفريغ سريع أو انتفاخ',
    basePriceAED: 120,
    timeMins: '20 Mins',
    descEn: 'High-density grade-A battery cell with 0-cycle health and heat-resistant protection.'
  },
  {
    id: 'logic_board',
    labelEn: 'Dead Device / No Power / Stuck on Logo / Micro-Soldering',
    labelAr: 'الجهاز ميت تماماً / لا يعمل / فحص المذربورد والميكروسولدرنغ',
    basePriceAED: 350,
    timeMins: '2 - 4 Hours',
    descEn: 'Level 4 micro-soldering, short-circuit thermal diagnostic, and IC power chip replacement.'
  },
  {
    id: 'water_damage',
    labelEn: 'Liquid / Water Damage Emergency Treatment',
    labelAr: 'سقوط في الماء / تنظيف بالألتراسونيك وإزالة الصدأ',
    basePriceAED: 150,
    timeMins: '1 - 2 Hours',
    descEn: 'Ultrasonic chemical deoxidation, circuit corrosion clearing, and component drying.'
  },
  {
    id: 'charging_port',
    labelEn: 'Charging Port Loose / Slow Charging / No Connection',
    labelAr: 'منفذ الشحن تالف / شحن بطيء أو مقطوع',
    basePriceAED: 130,
    timeMins: '25 Mins',
    descEn: 'Type-C / Lightning flex cable module replacement with fast-charge testing.'
  },
  {
    id: 'camera',
    labelEn: 'Camera Blurry / Shaking / Cracked Lens Glass',
    labelAr: 'اهتزاز الكاميرا / ضبابية أو كسر زجاج العدسة',
    basePriceAED: 140,
    timeMins: '30 Mins',
    descEn: 'Optical stabilization calibration or sapphire camera lens glass replacement.'
  },
  {
    id: 'back_glass',
    labelEn: 'Back Glass Shattered / Housing Frame Bent',
    labelAr: 'كسر الزجاج الخلفي / انحناء الهيكل والمعدن',
    basePriceAED: 150,
    timeMins: '45 Mins',
    descEn: 'Cold laser separation of shattered back glass and precision rear panel fitting.'
  },
  {
    id: 'audio_mic',
    labelEn: 'Ear Speaker Muffled / Microphone Not Working',
    labelAr: 'صوت السماعة ضعيف / عطل المايك أو الصوتيات',
    basePriceAED: 110,
    timeMins: '20 Mins',
    descEn: 'Acoustic mesh acoustic cleaning, transducer or audio IC amplifier replacement.'
  },
  {
    id: 'data_recovery',
    labelEn: 'Urgent Forensic Data Recovery from Broken Device',
    labelAr: 'استعادة البيانات والصور من جهاز ميت أو مكسور',
    basePriceAED: 390,
    timeMins: 'Same-Day',
    descEn: 'NAND flash chip direct reading, encrypted partition extraction, and backup to SSD.'
  }
];

export default function RepairEstimatePage({ onBookNow }: RepairEstimatePageProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Wizard Steps: 1: Device -> 2: Fault & Quality -> 3: Fulfillment & Contact -> 4: Ticket Confirmed
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ticketRef, setTicketRef] = useState<string>('');
  const [copiedTicket, setCopiedTicket] = useState<boolean>(false);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('iphone');
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 17 Pro Max');
  const [selectedDamageId, setSelectedDamageId] = useState<string>('screen_glass');
  const [qualityGrade, setQualityGrade] = useState<'oem_genuine' | 'premium_high_spec'>('oem_genuine');
  const [fulfillmentType, setFulfillmentType] = useState<'walk_in' | 'uae_doorstep' | 'gcc_mail_in'>('walk_in');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cityOrEmirate: 'Sharjah (Muwaileh)',
    passcodeOptional: '',
    notes: '',
    preferredDate: 'Today'
  });

  const selectedDamage = DAMAGE_TYPES.find(d => d.id === selectedDamageId) || DAMAGE_TYPES[0];

  // Dynamic price calculation based on grade
  const estimatedCost = qualityGrade === 'oem_genuine' 
    ? Math.round(selectedDamage.basePriceAED * 1.35) 
    : selectedDamage.basePriceAED;

  const handleNextStep = () => {
    window.scrollTo({ top: 300, behavior: 'smooth' });
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    window.scrollTo({ top: 300, behavior: 'smooth' });
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage(isAr ? 'يرجى كتابة الاسم ورقم الهاتف للتواصل' : 'Please provide your Full Name and WhatsApp phone number');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedRef = 'ALSHARQ-FIX-' + Math.floor(1000 + Math.random() * 9000);
    setTicketRef(generatedRef);

    try {
      // Execute reCAPTCHA if available
      const token = executeRecaptcha ? await executeRecaptcha('repair_estimate_wizard') : 'dummy-token';

      // 1. Save officially to Firestore database in 'repair_tickets' and 'inquiries'
      try {
        await addDoc(collection(db, 'inquiries'), {
          type: 'official_repair_job_sheet',
          ticketRef: generatedRef,
          category: selectedCategory,
          model: selectedModel,
          damageId: selectedDamage.id,
          damageLabel: selectedDamage.labelEn,
          qualityGrade: qualityGrade,
          estimatedCostAED: estimatedCost,
          estimatedTime: selectedDamage.timeMins,
          fulfillmentType: fulfillmentType,
          customerName: formData.fullName,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          cityOrEmirate: formData.cityOrEmirate,
          preferredDate: formData.preferredDate,
          notes: formData.notes,
          status: 'pending_intake',
          createdAt: serverTimestamp(),
          source: 'repair_estimate_wizard'
        });
      } catch (dbErr) {
        console.warn('Firestore repair ticket save notice:', dbErr);
      }

      // 2. Submit to backend notification endpoint
      try {
        await fetch('/api/repair-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refNumber: generatedRef,
            model: selectedModel,
            damage: selectedDamage.labelEn,
            quality: qualityGrade,
            estimatedPrice: `AED ${estimatedCost}`,
            whatsapp: formData.phone,
            name: formData.fullName,
            fulfillment: fulfillmentType,
            targetEmail: 'alsharqmobile@gmail.com'
          })
        });
      } catch (apiErr) {
        console.warn('Backend notification notice:', apiErr);
      }

      setStep(4); // Move to confirmed Job Sheet page
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(isAr ? 'حدث خطأ في النظام. يرجى المحاولة أو مراسلتنا عبر الواتساب.' : 'An error occurred. Please try again or chat with us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = isAr
      ? `مرحباً مركز الشرق للصيانة! لقد قمت بإنشاء تذكرة صيانة رقم #${ticketRef || 'ALSHARQ-FIX'}:\n📱 الجهاز: ${selectedModel}\n🔧 العطل: ${selectedDamage.labelAr}\n💎 نوع القطعة: ${qualityGrade === 'oem_genuine' ? 'أصلية معتمدة' : 'درجة أولى هاي كواليتي'}\n💰 التكلفة التقديرية: ${estimatedCost} درهم\n📍 الاستلام: ${fulfillmentType === 'walk_in' ? 'زيارة المحل بالشارقة' : 'استلام منزلي'}\n👤 الاسم: ${formData.fullName}\n📞 الهاتف: ${formData.phone}\nيرجى تأكيد موعد فحص جهازي الآن.`
      : `Hello Al Sharq Lab! I booked repair job ticket #${ticketRef || 'ALSHARQ-FIX'}:\n📱 Device: ${selectedModel}\n🔧 Issue: ${selectedDamage.labelEn}\n💎 Quality Grade: ${qualityGrade === 'oem_genuine' ? 'OEM Genuine Certified (1-Yr Warranty)' : 'Premium High-Spec (6-Mo Warranty)'}\n💰 Estimated: AED ${estimatedCost}\n📍 Service Mode: ${fulfillmentType === 'walk_in' ? 'Walk-In at Muwaileh Lab' : 'Doorstep Pickup'}\n👤 Name: ${formData.fullName}\n📞 Phone: ${formData.phone}\nPlease confirm my technician bench slot!`;

    window.open(`https://wa.me/971507117043?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyTicketNumber = () => {
    navigator.clipboard.writeText(ticketRef);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const handleAIRecommendation = (service: string) => {
    setStep(2);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleAIDiagnosisComplete = (diagnosis: string) => {
    setStep(2);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Professional Device Repair Diagnostic Desk &amp; Instant Estimate | Al Sharq Mobile Sharjah</title>
        <meta 
          name="description" 
          content="Calculate exact repair costs for iPhone 18, 17, 16, Samsung S26 Ultra, and MacBooks in Sharjah. Certified OEM parts, 1-Year Lab Warranty, 20-minute express walk-in or GCC express shipping." 
        />
        <meta 
          name="keywords" 
          content="iPhone repair cost Sharjah, Samsung screen replacement price, MacBook logic board estimate, phone repair Muwaileh, same day mobile repair UAE, تصليح ايفون الشارقة, اسعار تصليح الشاشات" 
        />
        <link rel="canonical" href="https://allsharq.com/estimate" />
      </Helmet>

      <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: isAr ? 'الرئيسية' : 'Home', path: '/' },
            { label: isAr ? 'خدمات الصيانة' : 'Services', path: '/services' },
            { label: isAr ? 'حاسبة التكلفة وتذكرة الصيانة' : 'Repair Estimate & Job Sheet' }
          ]} />

          {/* Header Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full uppercase tracking-wider mb-3">
              <Wrench className="w-4 h-4" />
              <span>{isAr ? 'نظام التشخيص الفني الذكي • مختبر الشارقة الرئيسي' : 'Certified Technical Intake & Price Calculator'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue dark:text-white mb-3 tracking-tight">
              {isAr ? 'احسب تكلفة تصليح جهازك واحجز دورك فوراً' : 'Instant Device Repair Estimate & Digital Job Sheet'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isAr
                ? 'أسعار شفافة لقطع الغيار الأصلية مع ضمان مختبر معتمد، إنجاز فوري خلال 20-30 دقيقة داخل المحل بمويلح أو خدمة الاستلام المنزلي في الإمارات والخليج.'
                : 'Transparent pricing with genuine OEM parts, 1-Year Lab Warranty, and 20-30 minute express turnaround at our Muwaileh technical facility.'}
            </p>
          </div>

          {/* Multi-Step Progress Indicator */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
              {[
                { s: 1, labelEn: '1. Device', labelAr: '1. الجهاز' },
                { s: 2, labelEn: '2. Issue & Parts', labelAr: '2. العطل والقطع' },
                { s: 3, labelEn: '3. Booking', labelAr: '3. طريقة الاستلام' },
                { s: 4, labelEn: '4. Job Ticket', labelAr: '4. تذكرة الصيانة' }
              ].map(item => (
                <div key={item.s} className="text-center">
                  <div className={`h-2 rounded-full mb-2 transition-all ${
                    step >= item.s ? 'bg-brand-orange' : 'bg-slate-200 dark:bg-slate-700'
                  }`} />
                  <span className={`text-[11px] sm:text-xs font-black truncate block ${
                    step >= item.s ? 'text-brand-orange' : 'text-gray-400'
                  }`}>
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Card Container */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <AnimatePresence mode="wait">

              {/* ========================================================== */}
              {/* STEP 1: SELECT DEVICE CATEGORY & MODEL */}
              {/* ========================================================== */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 sm:p-10"
                >
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-brand-orange" />
                    <span>{isAr ? 'الخطوة 1: حدد نوع وموديل جهازك' : 'Step 1: Choose Your Device Category & Model'}</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    {isAr ? 'اختر فئة الجهاز لمعاينة الأسعار المحدثة لقطع الغيار المعتمدة:' : 'Select device category to display verified component inventory and diagnostic benchmarks:'}
                  </p>

                  {/* Device Category Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {DEVICE_CATEGORIES.map(cat => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedModel(MODELS_BY_CATEGORY[cat.id][0]);
                          }}
                          className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'border-brand-orange bg-orange-50/50 dark:bg-orange-950/20 text-brand-blue dark:text-white shadow-md'
                              : 'border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-brand-orange text-white' : 'bg-slate-100 dark:bg-slate-700 text-gray-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm">{isAr ? cat.labelAr : cat.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Model Dropdown */}
                  <div className="mb-8">
                    <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      {isAr ? 'الموديل الدقيق:' : 'Exact Model:'}
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-bold text-sm sm:text-base focus:border-brand-orange outline-none transition-all cursor-pointer"
                    >
                      {MODELS_BY_CATEGORY[selectedCategory]?.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-black rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>{isAr ? 'متابعة لتحديد العطل' : 'Proceed to Fault Diagnosis'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ========================================================== */}
              {/* STEP 2: ISSUE & QUALITY GRADE */}
              {/* ========================================================== */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 sm:p-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-brand-orange" />
                        <span>{isAr ? 'الخطوة 2: حدد العطل ومستوى القطع المطلوبة' : 'Step 2: Select Symptom & Component Grade'}</span>
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isAr ? `الجهاز المحدد: ${selectedModel}` : `Selected Device: ${selectedModel}`}
                      </p>
                    </div>

                    <span className="hidden sm:inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-black text-xs rounded-full">
                      ✓ Lab Certified
                    </span>
                  </div>

                  {/* Damages Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {DAMAGE_TYPES.map(damage => {
                      const isSelected = selectedDamageId === damage.id;
                      return (
                        <button
                          key={damage.id}
                          type="button"
                          onClick={() => setSelectedDamageId(damage.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-brand-orange bg-orange-50/40 dark:bg-orange-950/20 shadow-md'
                              : 'border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 bg-white dark:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <span className="font-black text-xs sm:text-sm text-gray-900 dark:text-white leading-tight">
                                {isAr ? damage.labelAr : damage.labelEn}
                              </span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'border-brand-orange bg-brand-orange' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                            </div>

                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                              {damage.descEn}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px]">
                            <span className="text-gray-400 flex items-center gap-1 font-semibold">
                              <Clock className="w-3 h-3 text-brand-orange" />
                              <span>{damage.timeMins}</span>
                            </span>
                            <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono">
                              From AED {damage.basePriceAED}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quality Tier Selector */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 mb-8">
                    <label className="block text-xs font-black text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-3">
                      {isAr ? 'اختر فئة وجودة قطع الغيار والضمان:' : 'Select Parts Tier & Warranty Coverage:'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setQualityGrade('oem_genuine')}
                        className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          qualityGrade === 'oem_genuine'
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                            : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-xs sm:text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span>{isAr ? 'أصلي معتمد 100% (OEM)' : '100% Original OEM Certified'}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                            1-Year Warranty
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {isAr ? 'قطع مصنعية أصلية مختومة مع معايرة TrueTone وأعلى دقة ألوان.' : 'Genuine factory parts with TrueTone programming and official factory color calibration.'}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQualityGrade('premium_high_spec')}
                        className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          qualityGrade === 'premium_high_spec'
                            ? 'border-brand-blue bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                            : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-xs sm:text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-brand-blue" />
                            <span>{isAr ? 'درجة أولى ممتازة (Grade A+)' : 'Premium Grade-A+ High Spec'}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                            6-Month Warranty
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {isAr ? 'أعلى فئة بديلة بمعدل استجابة 120Hz وتوفير ممتاز في التكلفة.' : 'High refresh-rate calibrated aftermarket panel with supreme durability and budget savings.'}
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {isAr ? '← رجوع' : '← Back'}
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-black rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>{isAr ? 'متابعة لاختيار موعد وطريقة الاستلام' : 'Continue to Fulfilment & Contact'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ========================================================== */}
              {/* STEP 3: FULFILLMENT & CONTACT DETAILS */}
              {/* ========================================================== */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 sm:p-10"
                >
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-orange" />
                    <span>{isAr ? 'الخطوة 3: اختر طريقة الاستلام وبيانات الاتصال' : 'Step 3: Fulfilment Method & Contact Details'}</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    {isAr ? 'حدد إن كنت تفضل زيارة الورشة مباشرة أو استلام جهازك من موقعك في الإمارات أو دول الخليج:' : 'Select whether you prefer express walk-in or insured doorstep pickup in UAE or GCC:'}
                  </p>

                  {/* Fulfilment Method Radio Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      {
                        id: 'walk_in',
                        icon: Building2,
                        titleEn: 'Express Walk-In',
                        titleAr: 'زيارة الورشة مباشرة',
                        time: '20 - 30 Mins',
                        descEn: 'Muwaileh Main Lab, Sharjah. Free coffee & Wi-Fi lounge.'
                      },
                      {
                        id: 'uae_doorstep',
                        icon: Truck,
                        titleEn: 'UAE Doorstep Pickup',
                        titleAr: 'استلام وتوصيل منزلي',
                        time: 'Same-Day Courier',
                        descEn: 'Dubai, Sharjah & Ajman doorstep collection by dedicated van.'
                      },
                      {
                        id: 'gcc_mail_in',
                        icon: ShieldCheck,
                        titleEn: 'GCC Mail-In Express',
                        titleAr: 'شحن من دول الخليج',
                        time: '24 - 48 Hours',
                        descEn: 'Insured DHL shipment from KSA, Oman, Bahrain, Kuwait, Qatar.'
                      }
                    ].map(f => {
                      const Icon = f.icon;
                      const isSelected = fulfillmentType === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFulfillmentType(f.id as any)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-brand-orange bg-orange-50/40 dark:bg-orange-950/20 shadow-md'
                              : 'border-slate-200 dark:border-slate-700 hover:border-brand-orange/40 bg-white dark:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-orange text-white' : 'bg-slate-100 dark:bg-slate-700 text-gray-500'}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="font-black text-xs sm:text-sm text-gray-900 dark:text-white">
                                {isAr ? f.titleAr : f.titleEn}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                              {f.descEn}
                            </p>
                          </div>
                          <span className="mt-3 text-[10px] font-mono font-bold text-brand-orange">
                            ⚡ {f.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Summary Box with Estimated Price */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white mb-6 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                        {isAr ? 'ملخص التكلفة التقديرية للطلب:' : 'ESTIMATED LAB REPAIR COST:'}
                      </div>
                      <div className="text-xs text-gray-300 mt-0.5">
                        {selectedModel} • {selectedDamage.labelEn}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
                        ✓ {qualityGrade === 'oem_genuine' ? '1-Year Warranty Included' : '6-Month Warranty Included'}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 text-2xl font-black text-amber-400">
                      <UAEDirhamSymbol size={20} className="text-amber-400" />
                      <span>{estimatedCost}</span>
                      <span className="text-xs font-mono text-gray-300 uppercase">AED</span>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 rounded-xl text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                          {isAr ? 'الاسم الكامل *:' : 'Full Name *:'}
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Tariq Al Nuaimi"
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold focus:border-brand-orange outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                          {isAr ? 'رقم الواتساب / الهاتف *:' : 'WhatsApp / Mobile Number *:'}
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 000 0000"
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold focus:border-brand-orange outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                          {isAr ? 'البريد الإلكتروني (اختياري للإشعار):' : 'Email (For Job Sheet):'}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@domain.com"
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold focus:border-brand-orange outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                          {isAr ? 'الإمارة / المدينة:' : 'City / Emirate / Country:'}
                        </label>
                        <input
                          type="text"
                          value={formData.cityOrEmirate}
                          onChange={(e) => setFormData({ ...formData, cityOrEmirate: e.target.value })}
                          placeholder="Sharjah, Dubai, Riyadh, etc."
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold focus:border-brand-orange outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                        {isAr ? 'ملاحظات إضافية أو وصف خاص بالعطل:' : 'Additional Symptoms / Diagnostics Notes (Optional):'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Device fell from balcony, speaker cracking..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {isAr ? '← رجوع' : '← Back'}
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{isAr ? 'جاري إنشاء تذكرة الصيانة...' : 'Generating Job Sheet...'}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                            <span>{isAr ? 'تأكيد الحجز وإنشاء بطاقة الصيانة الرسمية' : 'Generate Official Job Sheet Ticket'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ========================================================== */}
              {/* STEP 4: DIGITAL JOB SHEET & CONFIRMED TICKET */}
              {/* ========================================================== */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-10 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-black text-xs rounded-full inline-block mb-2">
                    {isAr ? 'تم تسجيل بطاقة الصيانة رسمياً بنجاح!' : 'Official Repair Job Sheet Registered!'}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {isAr ? 'تذكرة الصيانة جاهزة للمتابعة الفورية' : 'Your Digital Job Sheet is Ready'}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                    {isAr
                      ? 'تم إرسال نسخة إلى سجلات ورشة الشارقة. أرسل التذكرة عبر الواتساب لتأكيد طاولة الفحص الفوري.'
                      : 'A digital record has been logged in our Muwaileh workshop queue. Click below to verify your slot on WhatsApp.'}
                  </p>

                  {/* High-Authority Digital Job Sheet / Passport */}
                  <div className="max-w-xl mx-auto rounded-3xl border-2 border-dashed border-emerald-500/60 bg-slate-50 dark:bg-slate-900 p-6 text-left shadow-lg mb-8 relative overflow-hidden">
                    {/* Watermark / Header */}
                    <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                      <div>
                        <div className="text-[10px] font-black uppercase text-brand-orange tracking-widest">
                          AL SHARQ LAB DIAGNOSTICS
                        </div>
                        <div className="text-base font-black text-gray-900 dark:text-white">
                          Electronic Repair Job Sheet
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block">JOB REF:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                            #{ticketRef}
                          </span>
                          <button
                            onClick={copyTicketNumber}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-500 cursor-pointer"
                            title="Copy Ref"
                          >
                            {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div>
                        <span className="text-gray-400 block text-[10px]">CLIENT NAME:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{formData.fullName || 'Registered Client'}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px]">CONTACT PHONE:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{formData.phone}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px]">DEVICE & MODEL:</span>
                        <span className="font-bold text-gray-900 dark:text-white truncate block">{selectedModel}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px]">DIAGNOSED FAULT:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400 truncate block">{selectedDamage.labelEn}</span>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px]">PARTS QUALITY TIER:</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">
                          {qualityGrade === 'oem_genuine' ? 'OEM Genuine (1-Yr Warranty)' : 'Grade-A+ (6-Mo Warranty)'}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block text-[10px]">SERVICE TYPE:</span>
                        <span className="font-bold text-brand-orange uppercase">
                          {fulfillmentType === 'walk_in' ? 'Walk-In (20-30m)' : fulfillmentType === 'uae_doorstep' ? 'Doorstep Van' : 'GCC Express Mail-In'}
                        </span>
                      </div>
                    </div>

                    {/* Price and Barcode Ribbon */}
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-bold">ESTIMATED TOTAL:</span>
                        <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                          AED {estimatedCost}
                        </span>
                      </div>

                      {/* Mock Barcode Graphic */}
                      <div className="text-right">
                        <div className="font-mono text-[9px] text-gray-400 tracking-widest">||||| | |||| |||| ||| ||</div>
                        <span className="text-[9px] text-gray-500 font-mono">LAB-INSPECTION-PASS</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-gray-400">
                      <span>✓ Official TDRA Registered Facility</span>
                      <span>Muwaileh, Sharjah, UAE</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 max-w-md mx-auto">
                    <button
                      onClick={handleWhatsAppInstant}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{isAr ? 'إرسال التذكرة للواتساب وتأكيد موعد الفحص' : 'Send Job Ticket to WhatsApp (Lock Slot)'}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:+971507117043"
                        className="py-3 px-3 rounded-xl bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{isAr ? 'اتصال مباشر' : 'Call Workshop'}</span>
                      </a>

                      <button
                        onClick={() => window.print()}
                        className="py-3 px-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>{isAr ? 'طباعة التذكرة' : 'Print Job Sheet'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Additional AI Diagnostics & Image Scanner Sections */}
          <div className="mt-16 space-y-12">
            <div className="text-center">
              <span className="px-3.5 py-1 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full uppercase tracking-wider">
                {isAr ? 'الذكاء الاصطناعي لفحص الأعطال' : 'Advanced AI Diagnostic Suite'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2">
                {isAr ? 'لست متأكداً من نوع العطل؟ دع الذكاء الاصطناعي يشخصه' : 'Uncertain About the Cause? Let Our AI Inspect It'}
              </h2>
            </div>

            <AIProblemAnalyzer onRecommendationClick={handleAIRecommendation} />
            <AIImageDiagnosisScanner onDiagnosisComplete={handleAIDiagnosisComplete} />
          </div>

        </div>
      </div>
    </>
  );
}
