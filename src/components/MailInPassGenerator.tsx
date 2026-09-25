import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  MessageCircle, 
  Package, 
  QrCode, 
  AlertCircle, 
  ShieldCheck,
  Download,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MailInPassGenerator() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    whatsapp: '',
    deviceModel: '',
    serialOrIMEI: '',
    passcode: '',
    problemDescription: '',
    includeDataRecovery: true,
  });

  const [generatedPass, setGeneratedPass] = useState<{
    passId: string;
    date: string;
  } | null>(null);

  const countries = [
    { nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', cities: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Makkah', 'Madinah'] },
    { nameEn: 'Oman', nameAr: 'سلطنة عُمان', cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'] },
    { nameEn: 'Bahrain', nameAr: 'مملكة البحرين', cities: ['Manama', 'Riffa', 'Muharraq'] },
    { nameEn: 'Kuwait', nameAr: 'دولة الكويت', cities: ['Kuwait City', 'Hawally', 'Salmiya'] },
    { nameEn: 'Qatar', nameAr: 'دولة قطر', cities: ['Doha', 'Al Rayyan', 'Al Wakrah'] },
    { nameEn: 'Turkey', nameAr: 'الجمهورية التركية', cities: ['Istanbul', 'Ankara', 'Izmir'] },
  ];

  const currentCountry = countries.find(c => c.nameEn === formData.country) || countries[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp || !formData.deviceModel) {
      alert(isAr ? 'يرجى إكمال الاسم ورقم الواتساب ونوع الجهاز' : 'Please fill in your name, WhatsApp number, and device model.');
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const passCode = `AS-GCC-${randomNum}`;
    const today = new Date().toLocaleDateString(isAr ? 'ar-AE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    setGeneratedPass({
      passId: passCode,
      date: today
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    if (!generatedPass) return;
    const msg = encodeURIComponent(
      `Hello Al Sharq Lab Sharjah! I generated a Digital Mail-In Repair Pass:
Ticket: ${generatedPass.passId}
Name: ${formData.fullName}
From: ${formData.city}, ${formData.country}
WhatsApp: ${formData.whatsapp}
Device: ${formData.deviceModel}
Serial/IMEI: ${formData.serialOrIMEI || 'N/A'}
Issue: ${formData.problemDescription || 'Inspection requested'}
Data Recovery Needed: ${formData.includeDataRecovery ? 'YES' : 'NO'}

Please register this ticket in your inbound receiving queue.`
    );
    window.open(`https://wa.me/971507117043?text=${msg}`, '_blank');
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs sm:text-sm rounded-full mb-4">
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'بوليصة واستمارة إدخال الطرد الرقمية' : 'Digital Mail-In Intake Pass Generator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            {isAr ? 'أنشئ بوليصة إرسال جهازك لطرد الشحن' : 'Generate Your Official In-Box Repair Pass'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {isAr
              ? 'اطبع هذه الاستمارة وضعها داخل الصندوق مع جهازك قبل تسليمه لشركة الشحن (DHL / Aramex). يضمن ذلك تسجيل طردك فور وصوله مويلح بالشارقة دون أي تأخير.'
              : 'Print or save this digital slip to place inside your package before handing it to DHL/Aramex. It guarantees instant QR ingestion upon arrival at our Sharjah lab.'}
          </p>
        </div>

        {!generatedPass ? (
          /* Intake Form */
          <div className="bg-white dark:bg-slate-850 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isAr ? 'محمد العتيبي / خالد المعمري' : 'e.g. Abdullah Al-Otaibi'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'رقم الواتساب مع المفتاح الدولي *' : 'WhatsApp Number (with Country Code) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+966 50 123 4567 / +968 9123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'الدولة' : 'Country'}
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => {
                      const newCountry = e.target.value;
                      const matched = countries.find(c => c.nameEn === newCountry);
                      setFormData({ 
                        ...formData, 
                        country: newCountry,
                        city: matched ? matched.cities[0] : 'Riyadh'
                      });
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  >
                    {countries.map((c) => (
                      <option key={c.nameEn} value={c.nameEn}>
                        {isAr ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'المدينة' : 'City'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  >
                    {currentCountry.cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'نوع وموديل الجهاز *' : 'Device Model *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deviceModel}
                    onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                    placeholder="e.g. MacBook Pro 16 M2 Max / iPhone 16 Pro Max"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    {isAr ? 'الرقم التسلسلي أو IMEI (اختياري)' : 'Serial Number or IMEI (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={formData.serialOrIMEI}
                    onChange={(e) => setFormData({ ...formData, serialOrIMEI: e.target.value })}
                    placeholder="e.g. C02ABCDEFGH or 351234567890123"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-orange outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  {isAr ? 'شرح العطل أو المشكلة' : 'Fault Symptoms & Problem Description'}
                </label>
                <textarea
                  rows={3}
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  placeholder={isAr ? 'انطفأ فجأة بعد انسكاب القهوة، أو لا يقبل الشحن بعد ارتفاع الكهرباء...' : 'e.g. Spilled liquid, completely dead, does not boot or charge...'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-orange outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-blue/5 dark:bg-blue-950/20 border border-brand-blue/15">
                <input
                  type="checkbox"
                  id="data-recovery-check"
                  checked={formData.includeDataRecovery}
                  onChange={(e) => setFormData({ ...formData, includeDataRecovery: e.target.checked })}
                  className="w-5 h-5 rounded text-brand-orange focus:ring-brand-orange accent-brand-orange"
                />
                <label htmlFor="data-recovery-check" className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white cursor-pointer">
                  {isAr 
                    ? 'أحتاج الحفاظ على البيانات الشخصية واستخراجها (Data Recovery Priority)' 
                    : 'Priority Data Recovery: Keep all photos, files & SSD data safe (Do not wipe)'}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-extrabold rounded-2xl shadow-xl shadow-orange-500/25 transition-all text-base flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isAr ? 'إنشاء بوليصة الإدخال الرقمية الآن' : 'Generate Digital Mail-In Pass'}</span>
              </button>

            </form>
          </div>
        ) : (
          /* Rendered Digital Pass */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* The Printable Card */}
            <div id="printable-intake-pass" className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-dashed border-brand-orange shadow-2xl relative">
              
              {/* Top Bar of Pass */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="text-xs font-black text-brand-orange uppercase tracking-widest">
                    AL SHARQ MOBILE LAB • SHARJAH UAE
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    OFFICIAL MAIL-IN REPAIR PASS
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    Place this slip inside the parcel box with the device
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="px-3.5 py-1.5 bg-slate-100 rounded-xl font-mono text-base font-black text-brand-blue inline-block">
                    {generatedPass.passId}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 sm:justify-end">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{generatedPass.date}</span>
                  </div>
                </div>
              </div>

              {/* Two-Column Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Customer / Sender</div>
                  <div className="font-extrabold text-slate-900 text-base">{formData.fullName}</div>
                  <div className="text-slate-600 mt-0.5">{formData.city}, {formData.country}</div>
                  <div className="text-slate-600 font-mono mt-0.5">{formData.whatsapp}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Target Device Details</div>
                  <div className="font-extrabold text-slate-900 text-base">{formData.deviceModel}</div>
                  <div className="text-slate-600 font-mono text-xs mt-0.5">SN/IMEI: {formData.serialOrIMEI || 'Not Provided'}</div>
                  <div className="text-emerald-700 font-bold text-xs mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{formData.includeDataRecovery ? 'Data Sanctity Flag: KEEP SAFE' : 'Standard Inspection'}</span>
                  </div>
                </div>
              </div>

              {/* Problem notes */}
              <div className="py-4 border-b border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Reported Symptoms:</span>
                <p className="text-slate-600 italic">"{formData.problemDescription || 'Full microscopic lab diagnosis requested.'}"</p>
              </div>

              {/* Lab Receiving Destination */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <strong className="block text-slate-900 font-bold mb-1">Destination Address for Courier (DHL / Aramex):</strong>
                  <p className="text-slate-600 leading-relaxed font-mono">
                    Al Sharq Mobile Phone & Computer Trading LLC<br />
                    BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh, Sharjah, UAE<br />
                    Phone: +971 50 711 7043
                  </p>
                </div>

                <div className="shrink-0 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Courier Declaration</div>
                  <div className="text-xs font-black text-slate-900">Personal Item / Repair</div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setGeneratedPass(null)}
                className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors"
              >
                {isAr ? '← تعديل البيانات' : '← Edit Information'}
              </button>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePrint}
                  className="px-6 py-3.5 bg-slate-900 dark:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة الاستمارة' : 'Print Pass (PDF)'}</span>
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'إرسال للمختبر عبر واتساب' : 'Notify Lab on WhatsApp'}</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
}
