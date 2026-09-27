import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  User, 
  MessageSquare, 
  FileText, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Navigation, 
  ExternalLink, 
  Building2, 
  Globe, 
  Truck, 
  Sparkles, 
  Wrench, 
  Smartphone, 
  ShieldCheck, 
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactSection() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [inquiryType, setInquiryType] = useState<string>('repair');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    countryOrCity: 'Sharjah, UAE',
    preferredContact: 'whatsapp',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string>('');
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const INQUIRY_CATEGORIES = [
    { id: 'repair', labelEn: '🔧 Urgent Device Repair / Diagnostic', labelAr: '🔧 صيانة أجهزة وفحص تشخيصي فوري' },
    { id: 'shop_deal', labelEn: '📱 20% OFF Flagship Phone Purchase', labelAr: '📱 شراء أجهزة جديدة بخصم 20%' },
    { id: 'trade_in', labelEn: '🔄 Trade-In & Cash Valuation', labelAr: '🔄 استبدال جهاز قديم وتقييم كاش' },
    { id: 'gcc_shipping', labelEn: '✈️ GCC Express Shipping (KSA/Oman)', labelAr: '✈️ شحن دولي إكسبريس لدول الخليج' },
    { id: 'corporate', labelEn: '🏢 Corporate / Bulk B2B Service', labelAr: '🏢 عقود صيانة للشركات والمدارس' }
  ];

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? (isAr ? 'الاسم مطلوب' : 'Full Name is required') : '',
      phone: !formData.phone.trim() ? (isAr ? 'رقم الهاتف مطلوب' : 'Phone / WhatsApp is required') : '',
      email: formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? (isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format') : '',
      message: !formData.message.trim() ? (isAr ? 'يرجى كتابة رسالتك' : 'Message is required') : ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(err => err !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setRateLimitError(null);
    const generatedRef = 'ALSHARQ-INQ-' + Math.floor(1000 + Math.random() * 9000);
    setInquiryRef(generatedRef);

    try {
      const token = executeRecaptcha ? await executeRecaptcha('contact_form') : 'dummy-token';

      // 1. Save directly to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          type: 'location_contact_inquiry',
          inquiryRef: generatedRef,
          category: inquiryType,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'N/A',
          countryOrCity: formData.countryOrCity,
          preferredContact: formData.preferredContact,
          message: formData.message,
          status: 'unread',
          createdAt: serverTimestamp(),
          targetEmail: 'alsharqmobile@gmail.com'
        });
      } catch (dbErr) {
        console.warn('Firestore contact save notice:', dbErr);
      }

      // 2. Notify backend
      try {
        const response = await fetch('/api/contact-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ref: generatedRef,
            category: inquiryType,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            location: formData.countryOrCity,
            preferredContact: formData.preferredContact,
            message: formData.message,
            targetEmail: 'alsharqmobile@gmail.com'
          })
        });

        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          setRateLimitError(data.message || 'Rate limit reached. Please wait a few moments.');
          setIsSubmitting(false);
          return;
        }
      } catch (apiErr) {
        console.warn('Backend contact inquiry warning:', apiErr);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      setRateLimitError('An unexpected error occurred. Please reach us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const categoryLabel = INQUIRY_CATEGORIES.find(c => c.id === inquiryType)?.labelEn || inquiryType;
    const text = isAr
      ? `مرحباً متجر ومركز الشرق! أنا ${formData.name || 'عميل'}، أود الاستفسار بخصوص [${categoryLabel}]:\n📍 موقعي: ${formData.countryOrCity}\n📝 التفاصيل: ${formData.message || 'أرجو تزويدي بالأسعار والخدمات.'}`
      : `Hello Al Sharq Team! My name is ${formData.name || 'Customer'}.\nCategory: ${categoryLabel}\nLocation: ${formData.countryOrCity}\nInquiry: ${formData.message || 'I would like to inquire about services / device availability.'}`;

    window.open(`https://wa.me/971507117043?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(inquiryRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/10 text-brand-orange font-black text-xs rounded-full uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4" />
            <span>{isAr ? 'المقر الرئيسي وخدمة العملاء' : 'Sharjah Headquarters & Regional Concierge'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue dark:text-white mb-4 tracking-tight">
            {isAr ? 'تفضل بزيارتنا أو تواصل مع فريقنا الفني' : 'Visit Our Technical Lab or Connect Instantly'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'موقع استراتيجي في مويلح بالشارقة بالقرب من المدينة الجامعية، مع دعم مباشر لدول الخليج (السعودية، عمان، البحرين، الكويت، قطر) عبر الواتساب وخدمة الشحن السريع.'
              : 'Conveniently located in Muwaileh Sharjah near University City, with dedicated 24-48h express logistics across Saudi Arabia, Oman, Bahrain, Kuwait & Qatar.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================== */}
          {/* LEFT COLUMN: LIVE LOCATION HUBS & MAP (5 COLS) */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Muwaileh Workshop Card */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>{isAr ? 'مفتوح الآن • الفنيون في الخدمة' : 'OPEN NOW • Technicians On Duty'}</span>
                </span>
                <span className="text-xs font-mono text-gray-400">Muwaileh Lab</span>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                Al Sharq Mobile Phone &amp; Computer Trading LLC
              </h3>
              
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2 mb-6 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>
                    <strong>BLDG#1017 - SHOP#2 Fire Station Road</strong><br />
                    Muwaileh Industrial Area, Sharjah, United Arab Emirates.<br />
                    <span className="text-gray-400 text-[11px]">(3 Mins from Sharjah University City • 7 Mins from Sahara Centre)</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>
                    <strong>Sat - Thu:</strong> 9:00 AM - 11:00 PM | <strong>Fri:</strong> 4:00 PM - 11:00 PM
                  </span>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                <a
                  href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-brand-blue hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Google Maps GPS</span>
                </a>

                <a
                  href="https://waze.com/ul?ll=25.3048,55.4326&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open in Waze</span>
                </a>
              </div>

              {/* Instant Contact Links */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                <a 
                  href="tel:+971507117043" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span className="font-bold">Technical Mobile Hotline:</span>
                  </div>
                  <span className="font-mono font-black text-brand-blue dark:text-white">+971 50 711 7043</span>
                </a>

                <a 
                  href="tel:+97165392120" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span className="font-bold">Workshop Landline:</span>
                  </div>
                  <span className="font-mono font-black text-brand-blue dark:text-white">+971 6 539 2120</span>
                </a>

                <a 
                  href="mailto:alsharqmobile@gmail.com" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span className="font-bold">Official Email:</span>
                  </div>
                  <span className="font-mono text-gray-500 dark:text-gray-400 text-[11px]">alsharqmobile@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Regional GCC & Express Courier Hub Card */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-indigo-900/60">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider mb-2">
                <Globe className="w-4 h-4" />
                <span>{isAr ? 'مركز الشحن والتوزيع الإقليمي للخليج' : 'GCC Cross-Border Logistics Desk'}</span>
              </div>
              <h4 className="text-lg font-black mb-2">
                Express Cargo to KSA, Oman, Bahrain, Kuwait &amp; Qatar
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Air express courier transit within 24 to 48 hours with DHL, SMSA &amp; Aramex. Personal devices exempt from commercial customs duties.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold text-gray-400">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">🇸🇦 Riyadh / Jeddah (24-48h)</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">🇴🇲 Muscat (24h)</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">🇧🇭 Manama (24h)</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">🇰🇼 Kuwait City</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">🇶🇦 Doha</span>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white dark:bg-slate-800 p-3 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="w-full h-[220px] rounded-2xl overflow-hidden relative">
                <iframe
                  title="Al Sharq Mobile Phone Repair Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.283151838634!2d55.4326!3d25.3048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f3e00000001%3A0x0!2sFire+Station+Rd+-+Muwaileh+Commercial+-+Industrial+Area+-+Sharjah!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: HIGH-CONVERTING INQUIRY & DISPATCH FORM (7 COLS) */}
          {/* ========================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form_body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                        {isAr ? 'نموذج التواصل السريع والاستفسار' : 'Priority Contact & Inquiry Form'}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isAr
                          ? 'اختر نوع استفسارك وسيتم توجيه طلبك مباشرة إلى القسم الفني المختص خلال أقل من 15 دقيقة:'
                          : 'Select your inquiry category to route your message to our specialized technician or sales desk:'}
                      </p>
                    </div>

                    {/* Category Selector Pills */}
                    <div className="space-y-2 mb-6">
                      <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        {isAr ? 'موضوع الاستفسار *:' : 'Inquiry Topic *:'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {INQUIRY_CATEGORIES.map(cat => {
                          const isSelected = inquiryType === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setInquiryType(cat.id)}
                              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'border-brand-orange bg-orange-50/50 dark:bg-orange-950/30 text-brand-orange shadow-sm'
                                  : 'border-slate-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-brand-orange/40 bg-white dark:bg-slate-900'
                              }`}
                            >
                              <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* WhatsApp 1-Tap Quick Action */}
                    <div className="mb-6 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-[#25D366]" />
                          <span>{isAr ? 'تحتاج رداً فورياً الآن؟' : 'Need an Instant Answer in 60 Seconds?'}</span>
                        </div>
                        <div className="text-[11px] text-gray-600 dark:text-gray-300">
                          {isAr ? 'تحدث مباشرة مع مهندس الصيانة عبر الواتساب' : 'Chat directly with our on-duty technician on WhatsApp'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-black text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isAr ? 'محادثة واتساب سريعة' : 'Instant WhatsApp'}</span>
                      </button>
                    </div>

                    {/* The Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {rateLimitError && (
                        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{rateLimitError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                            {isAr ? 'الاسم الكامل *:' : 'Your Name *:'}
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Sultan Al Qasimi"
                            className={`w-full px-3.5 py-3 rounded-xl border text-xs font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-orange ${
                              errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                            }`}
                          />
                          {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                            {isAr ? 'رقم الهاتف والواتساب *:' : 'Phone / WhatsApp *:'}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+971 50 711 7043"
                            className={`w-full px-3.5 py-3 rounded-xl border text-xs font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-orange ${
                              errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                            }`}
                          />
                          {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                            {isAr ? 'البريد الإلكتروني:' : 'Email Address (Optional):'}
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="user@domain.com"
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-orange"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                            {isAr ? 'المدينة / الدولة:' : 'Location / Country:'}
                          </label>
                          <input
                            type="text"
                            value={formData.countryOrCity}
                            onChange={(e) => setFormData({ ...formData, countryOrCity: e.target.value })}
                            placeholder="Sharjah, Dubai, Riyadh, Muscat..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1.5">
                          {isAr ? 'طريقة التواصل المفضلة لديك:' : 'Preferred Response Channel:'}
                        </label>
                        <div className="flex gap-3 text-xs font-bold">
                          {[
                            { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                            { id: 'phone', label: 'Phone Call', icon: Phone },
                            { id: 'email', label: 'Email', icon: Mail }
                          ].map(method => (
                            <label 
                              key={method.id} 
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer ${
                                formData.preferredContact === method.id
                                  ? 'border-brand-orange bg-orange-50 dark:bg-orange-950/30 text-brand-orange'
                                  : 'border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              <input
                                type="radio"
                                name="preferredContact"
                                checked={formData.preferredContact === method.id}
                                onChange={() => setFormData({ ...formData, preferredContact: method.id })}
                                className="hidden"
                              />
                              <span>{method.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                          {isAr ? 'تفاصيل طلبك أو رسالتك *:' : 'Message / Device Specifications *:'}
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={isAr ? 'اكتب موديل الجهاز والعطل أو نوع الاستفسار...' : 'Specify device model, issue, or question...'}
                          className={`w-full px-3.5 py-3 rounded-xl border text-xs bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-orange ${
                            errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                          }`}
                        />
                        {errors.message && <span className="text-[10px] text-red-500 mt-1 block">{errors.message}</span>}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-brand-orange hover:bg-orange-600 disabled:opacity-50 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{isAr ? 'جاري إرسال الطلب وحفظ التذكرة...' : 'Submitting to Dispatch Desk...'}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{isAr ? 'إرسال الرسالة إلى مكتب الاستقبال' : 'Submit Priority Inquiry'}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success_view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-black text-xs rounded-full inline-block">
                      {isAr ? 'تم استلام رسالتك وحفظها بنجاح!' : 'Inquiry Received & Logged in System!'}
                    </span>

                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {isAr ? 'شكراً لتواصلك مع مركز الشرق' : 'Thank You, ' + (formData.name || 'Valued Client')}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                      {isAr
                        ? 'تم تسجيل طلبك برقم مرجعي رسمي في سجلات الورشة. سيقوم فريقنا بالتواصل معك عبر الواتساب أو الهاتف خلال دقائق.'
                        : 'Your inquiry has been filed directly with our Muwaileh technical desk. Our team will contact you shortly via your preferred channel.'}
                    </p>

                    {/* Digital Reference Ticket */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-emerald-500/50 max-w-sm mx-auto text-left text-xs space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">INQUIRY REF:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                            #{inquiryRef}
                          </span>
                          <button
                            onClick={copyRefToClipboard}
                            className="p-1 rounded text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-gray-400 block text-[10px]">NAME:</span>
                          <span className="font-bold text-gray-900 dark:text-white truncate block">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">PHONE:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">TOPIC:</span>
                          <span className="font-bold text-brand-orange uppercase">{inquiryType}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">STATUS:</span>
                          <span className="font-bold text-emerald-600">● Queued for Dispatch</span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Instant Forward */}
                    <div className="pt-2 max-w-sm mx-auto space-y-2">
                      <button
                        onClick={handleWhatsAppDirect}
                        className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{isAr ? 'متابعة المحادثة عبر الواتساب فوراً' : 'Continue on WhatsApp Instantly'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({ name: '', phone: '', email: '', countryOrCity: 'Sharjah, UAE', preferredContact: 'whatsapp', message: '' });
                        }}
                        className="text-xs text-gray-400 hover:text-brand-orange font-bold transition-colors cursor-pointer"
                      >
                        {isAr ? 'إرسال رسالة أخرى' : 'Submit Another Inquiry'}
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
