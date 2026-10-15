import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, X, CheckCircle2, ShieldCheck, QrCode, MapPin, Phone, Calendar, Clock, Wrench, MessageCircle, Edit3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DigitalJobCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData?: {
    jobId?: string;
    customerName?: string;
    phone?: string;
    device?: string;
    issue?: string;
    estimatedCost?: string;
    estimatedTime?: string;
    date?: string;
  };
}

export default function DigitalJobCardModal({ isOpen, onClose, jobData }: DigitalJobCardModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const printRef = useRef<HTMLDivElement>(null);

  const [customerName, setCustomerName] = useState(jobData?.customerName || 'Ahmed Al-Mansoor');
  const [customerPhone, setCustomerPhone] = useState(jobData?.phone || '+971 50 123 4567');
  const [deviceModel, setDeviceModel] = useState(jobData?.device || 'iPad Pro 11" (M2) / iPhone 15 Pro');
  const [issueDesc, setIssueDesc] = useState(jobData?.issue || 'Cracked Front Glass Replacement + 9H Tempered Glass Fitting');
  const [costAED, setCostAED] = useState(jobData?.estimatedCost || '280');
  const [timeEst, setTimeEst] = useState(jobData?.estimatedTime || '35 Minutes');
  const [isEditing, setIsEditing] = useState(false);

  const jobId = jobData?.jobId || 'SHQ-849201';
  const dateStr = jobData?.date || new Date().toLocaleDateString('en-GB');

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const formattedReceipt = `*AL SHARQ TECHNOLOGY - DIGITAL REPAIR RECEIPT*\n` +
      `-----------------------------------------\n` +
      `🎫 *Ticket ID:* ${jobId}\n` +
      `📅 *Date:* ${dateStr}\n` +
      `👤 *Customer:* ${customerName}\n` +
      `📱 *Device:* ${deviceModel}\n` +
      `🔧 *Service / Issue:* ${issueDesc}\n` +
      `💰 *Estimated Bench Price:* AED ${costAED}\n` +
      `⏱ *Turnaround:* ${timeEst}\n` +
      `🛡 *Warranty:* 90-Day Lab Guarantee on Parts\n` +
      `📍 *Workshop:* BLDG#1017 Fire Station Rd, Muwaileh Commercial, Sharjah\n` +
      `📞 *Contact:* +971 50 711 7043\n` +
      `-----------------------------------------\n` +
      `Track your real-time status: https://allsharq.com/track-repair`;

    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    const targetUrl = cleanPhone.length >= 9
      ? `https://wa.me/${cleanPhone.startsWith('971') ? cleanPhone : '971' + cleanPhone.replace(/^0+/, '')}?text=${encodeURIComponent(formattedReceipt)}`
      : `https://wa.me/971507117043?text=${encodeURIComponent(formattedReceipt)}`;

    window.open(targetUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:p-0 print:bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none print:max-w-full my-8"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {/* Top Actions (Hidden in Print) */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-750 flex items-center justify-between print:hidden">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'بطاقة استلام الجهاز الرقمية' : 'Digital Job Sheet & Receipt'}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Edit Details"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? (isAr ? 'إغلاق التعديل' : 'Done') : (isAr ? 'تعديل' : 'Edit')}</span>
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                title="Send to WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isAr ? 'طباعة' : 'Print'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Editing Form if Active */}
          {isEditing && (
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-xs space-y-2.5 print:hidden">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Customer WhatsApp</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Device Model</label>
                  <input
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400">Estimated Price (AED)</label>
                  <input
                    type="text"
                    value={costAED}
                    onChange={(e) => setCostAED(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400">Reported Issue / Work</label>
                <input
                  type="text"
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Printable Job Slip Area */}
          <div ref={printRef} className="p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 print:text-black print:p-8">
            
            {/* Store Header */}
            <div className="text-center pb-4 border-b-2 border-dashed border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-black uppercase tracking-wider text-brand-blue dark:text-white print:text-black">
                Al Sharq Mobile Phone & Computer Trading LLC
              </h2>
              <p className="text-[11px] text-slate-500 print:text-gray-600 mt-1">
                BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh Commercial, Sharjah, UAE
              </p>
              <p className="text-[11px] text-slate-500 print:text-gray-600">
                Tel: +971 6 539 2120 | Mob/WhatsApp: +971 50 711 7043 | TRN: 100412389100003
              </p>
            </div>

            {/* Job Number & Barcode Area */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 print:bg-gray-100 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {isAr ? 'رقم التذكرة / جاب كارد' : 'Job Card Ticket'}
                </span>
                <span className="text-xl font-mono font-black text-brand-orange">
                  {jobId}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Date: {dateStr}
                </span>
              </div>
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-900">
                <QrCode className="w-14 h-14" />
              </div>
            </div>

            {/* Device & Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750">
                <span className="text-slate-400 block mb-1 font-bold uppercase">{isAr ? 'العميل' : 'Customer'}</span>
                <span className="font-semibold block">{customerName}</span>
                <span className="text-slate-500 block mt-0.5">{customerPhone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750">
                <span className="text-slate-400 block mb-1 font-bold uppercase">{isAr ? 'الجهاز' : 'Device'}</span>
                <span className="font-semibold block">{deviceModel}</span>
                <span className="text-brand-orange block font-bold mt-0.5">{timeEst}</span>
              </div>
            </div>

            {/* Reported Issue & Bench Price */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750 text-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-slate-400 block mb-1 font-bold uppercase">{isAr ? 'العطل والخدمة' : 'Reported Service / Fault'}</span>
                <p className="font-medium text-slate-700 dark:text-slate-300 print:text-black">
                  {issueDesc}
                </p>
              </div>
              <div className="text-end shrink-0">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Estimated</span>
                <span className="text-lg font-black text-brand-orange">AED {costAED}</span>
              </div>
            </div>

            {/* Terms & Warranty Note */}
            <div className="text-[10px] text-slate-500 print:text-gray-500 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-4">
              <p>
                • All hardware repairs carry a 90-day warranty on replaced parts.
              </p>
              <p>
                • Devices not collected within 60 days are subject to storage disposal as per Sharjah economic regulations.
              </p>
              <p className="font-bold text-slate-700 dark:text-slate-300 print:text-black mt-1">
                Scan QR code on counter to track real-time repair status online at allsharq.com/track-repair
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
