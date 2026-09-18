import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, UploadCloud, CheckCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function DeviceRepairRequest() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('device_repair_request') : 'dummy-token');
      console.log('reCAPTCHA token:', token);

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('reCAPTCHA error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-brand-blue dark:bg-slate-950 text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Device Repair Request
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Tell us about your device and the issue you're experiencing. We'll get back to you with a quote and repair options.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl text-slate-900 dark:text-white"
        >
          {isSubmitted ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Received!</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Thank you for reaching out. Our technicians will review your request and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Device Type
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Device Type</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="tablet">Tablet</option>
                    <option value="laptop">Laptop / MacBook</option>
                    <option value="desktop">Desktop PC</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Device Model
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="e.g., iPhone 13 Pro, Galaxy S22"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Required
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Service Required</option>
                    <option value="Cracked or Broken Screen">Cracked or Broken Screen</option>
                    <option value="Battery Issues">Battery Issues</option>
                    <option value="Water/Liquid Damage">Water/Liquid Damage</option>
                    <option value="Charging Port Problems">Charging Port Problems</option>
                    <option value="Camera Repair">Camera Repair</option>
                    <option value="Audio Issues">Audio Issues</option>
                    <option value="Button/Body Damage">Button/Body Damage</option>
                    <option value="Software Issues">Software Issues</option>
                    <option value="Data Recovery">Data Recovery</option>
                    <option value="Other Issue">Other Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Serial Number (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="Enter serial number if known"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Please describe the problem in detail..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Photo of Damage (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-700 border-dashed rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-orange hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-orange">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed border-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Repair Request
                  </>
                )}
              </button>

              <div className="mt-6 flex flex-col items-center justify-center pt-2">
                <span className="text-sm text-gray-500 mb-3 font-medium cursor-default">Accepted Payment Options</span>
                <div className="flex flex-wrap justify-center gap-2 items-center">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-400 font-medium text-xs">Cash</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-400 font-medium text-xs">Credit/Debit Card</span>
                  <span className="px-3 py-1 bg-[#EEFDF4] text-[#1D9968] border border-[#1D9968]/20 rounded-lg font-black tracking-tight text-sm">tabby</span>
                  <span className="px-3 py-1 bg-[#FFF4F0] text-[#E58869] border border-[#E58869]/20 rounded-lg font-black tracking-tight text-sm">tamara</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
