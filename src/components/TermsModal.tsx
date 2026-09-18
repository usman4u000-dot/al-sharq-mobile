import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, AlertTriangle, Database, Droplets, Clock, Search } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-gray-900 dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 transition-colors">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                  Repair Terms & Warranty Policy
                </h2>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
              
              {/* Introduction */}
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors">
                <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                  Trusted Tech Solutions Since 2014
                </p>
              </div>

              {/* Warranty Period */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                  Warranty Period
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 transition-colors">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Standard Repairs</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      All hardware repairs (e.g., screen, battery, charging port) come with a <span className="font-bold">90-day limited warranty</span> from the date of collection.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 transition-colors">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Parts Only</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Accessories and retail parts carry a <span className="font-bold">14-day replacement warranty</span> for manufacturing defects only.
                    </p>
                  </div>
                </div>
              </section>

              {/* Warranty Coverage */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                  Warranty Coverage
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p>The warranty covers manufacturing defects in the parts replaced and the labor associated with that specific repair.</p>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800 transition-colors">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      What is NOT covered:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-200 ml-1">
                      <li>Accidental damage (drops, cracks, or pressure damage) after the device leaves the shop.</li>
                      <li>Liquid/water damage (even if the device was originally water-resistant).</li>
                      <li>Issues unrelated to the original repair.</li>
                      <li>Software issues or OS corruption caused by the user.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Responsibility */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                  Data Responsibility
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Customer Backup</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      While we take every precaution, Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) is not responsible for any data loss during the repair process. Customers are strongly advised to back up their data (iCloud, Google Drive, or Hard Drive) before submitting a device.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Privacy</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We respect your privacy and will only access the areas of your device necessary to perform and test the repair.
                    </p>
                  </div>
                </div>
              </section>

              {/* Specific Conditions */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Liquid Damage */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                    Liquid Damage Repairs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Due to the unpredictable nature of corrosion, repairs on liquid-damaged devices are performed on a "Best Effort" basis and do not carry a standard warranty unless specifically stated in writing by our technician.
                  </p>
                </section>

                {/* Diagnosis Fee */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5 text-brand-blue dark:text-blue-400" />
                    Diagnosis Fee
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    A standard inspection fee may apply if a device is diagnosed but the customer chooses not to proceed with the repair. This fee is waived if the repair is authorized.
                  </p>
                </section>
              </div>

              {/* Unclaimed Devices */}
              <section className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Unclaimed Devices</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Any device not collected within 60 days of the "Ready for Collection" notification will be considered abandoned. Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) reserves the right to recycle or sell the device to recover repair and storage costs.
                </p>
              </section>

            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-end shrink-0 transition-colors">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 dark:bg-slate-800 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
