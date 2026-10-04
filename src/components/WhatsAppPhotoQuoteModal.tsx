import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, MessageCircle, Upload, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Laptop, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatsAppPhotoQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevice?: string;
}

export default function WhatsAppPhotoQuoteModal({ isOpen, onClose, defaultDevice = '' }: WhatsAppPhotoQuoteModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [deviceType, setDeviceType] = useState(defaultDevice || 'iPhone');
  const [modelName, setModelName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const deviceCategories = [
    'iPhone / iPad',
    'Samsung Galaxy',
    'MacBook / Apple Mac',
    'Windows Laptop / PC',
    'Pakistan Variant (Infinix/Vivo/itel/Tecno/Oppo)',
    'Commercial Printer',
    'Other Gadget'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendToWhatsApp = () => {
    const model = modelName.trim() || 'Unspecified Model';
    const issue = issueDescription.trim() || 'Cracked Screen / Hardware Diagnostics';
    
    const message = `*📸 PHOTO QUOTE INQUIRY - AL SHARQ MOBILE SHARJAH*\n\n` +
      `*Device Category:* ${deviceType}\n` +
      `*Device Model:* ${model}\n` +
      `*Reported Issue:* ${issue}\n\n` +
      `_I am attaching the photo of my device in this chat for an instant price estimate & part availability in Muwaileh._`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/971507117043?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-md">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black">
                  {isAr ? 'إرسال صورة الجهاز عبر واتساب' : '1-Click WhatsApp Photo Quote'}
                </h3>
                <p className="text-xs text-emerald-100">
                  {isAr ? 'أرسل صورة الكسر أو العطل واحصل على السعر فوراً' : 'Snap a photo of your broken device for an instant price'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Device Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {isAr ? 'نوع الجهاز' : 'Device Category'}
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {deviceCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Model Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {isAr ? 'موديل الجهاز' : 'Device Model (e.g. iPhone 15 Pro, S24 Ultra, Dell XPS)'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'مثال: آيفون 15 برو، سامسونج S24، ماك بوك M2' : 'e.g. iPhone 15 Pro Max, Infinix Hot 50, HP Pavilion'}
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {isAr ? 'وصف المشكلة' : 'Issue / Symptoms'}
              </label>
              <textarea
                rows={2}
                placeholder={isAr ? 'مثال: الشاشة مكسورة بالكامل، الجهاز لا يشحن، سكب قهوة...' : 'e.g. Shattered screen, flickering green lines, no charging, water spilled...'}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Photo Preview / Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {isAr ? 'معاينة صورة الجهاز' : 'Upload / Snap Device Photo'}
              </label>
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-400/60 hover:border-emerald-500 rounded-2xl bg-emerald-50/40 dark:bg-slate-800/50 cursor-pointer transition-colors">
                {previewImage ? (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden">
                    <img src={previewImage} alt="Device Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Camera className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                      {isAr ? 'اضغط لاختيار صورة من جهازك' : 'Click to select or capture device photo'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {isAr ? 'سيتم إرفاقها وتجهيز الرسالة في واتساب فوراً' : 'Will be pre-formatted and ready to send via WhatsApp'}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Guarantee Callout */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {isAr ? 'رد فوري خلال 5 دقائق • تسعيرة شفافة • ضمان 90 يوماً' : 'Instant reply in <5 mins • Zero hidden fees • 90-day warranty'}
              </span>
            </div>

            {/* Submit to WhatsApp */}
            <button
              onClick={handleSendToWhatsApp}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{isAr ? 'فتح المحادثة وإرسال الصورة على واتساب' : 'Open WhatsApp & Send Device Details'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
