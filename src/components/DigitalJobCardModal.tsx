import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, X, CheckCircle2, ShieldCheck, QrCode, MapPin, Phone, Calendar, Clock, Wrench } from 'lucide-react';
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

  const defaultJob = {
    jobId: jobData?.jobId || `SHQ-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: jobData?.customerName || 'Valued Client',
    phone: jobData?.phone || '+971 5X XXX XXXX',
    device: jobData?.device || 'Smartphone / Laptop',
    issue: jobData?.issue || 'Diagnostics & Hardware Repair',
    estimatedCost: jobData?.estimatedCost || 'TBD upon inspection',
    estimatedTime: jobData?.estimatedTime || '30 - 45 Minutes',
    date: jobData?.date || new Date().toLocaleDateString('en-GB')
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none print:max-w-full"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {/* Top Actions (Hidden in Print) */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-750 flex items-center justify-between print:hidden">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'بطاقة استلام الجهاز الرقمية' : 'Digital Job Intake Slip'}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isAr ? 'طباعة' : 'Print Slip'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

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
                  {defaultJob.jobId}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Date: {defaultJob.date}
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
                <span className="font-semibold block">{defaultJob.customerName}</span>
                <span className="text-slate-500 block mt-0.5">{defaultJob.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750">
                <span className="text-slate-400 block mb-1 font-bold uppercase">{isAr ? 'الجهاز' : 'Device'}</span>
                <span className="font-semibold block">{defaultJob.device}</span>
                <span className="text-brand-orange block font-bold mt-0.5">{defaultJob.estimatedTime}</span>
              </div>
            </div>

            {/* Reported Issue */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750 text-xs">
              <span className="text-slate-400 block mb-1 font-bold uppercase">{isAr ? 'العطل المسجل' : 'Reported Fault'}</span>
              <p className="font-medium text-slate-700 dark:text-slate-300 print:text-black">
                {defaultJob.issue}
              </p>
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
