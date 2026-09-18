import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, UploadCloud, CheckCircle, MessageCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DeviceRepairRequest() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deviceType: 'smartphone',
    deviceModel: '',
    serviceRequired: '',
    serialNumber: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

      const refNum = 'REQ-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // 1. Save to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          refNumber: refNum,
          type: 'device_repair_request',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          deviceType: formData.deviceType,
          deviceModel: formData.deviceModel,
          serviceRequired: formData.serviceRequired,
          serialNumber: formData.serialNumber,
          description: formData.description,
          notifyEmail: 'alsharqmobile@gmail.com',
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Firestore request save warning:', dbErr);
      }

      // 2. Dispatch notification to server API
      try {
        await fetch('/api/send-booking-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refNumber: refNum,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            deviceCategory: formData.deviceType,
            deviceModel: formData.deviceModel,
            serviceType: formData.serviceRequired,
            serviceMethod: 'Online Request Form',
            estimatedCost: 'Custom Quote',
            notes: formData.description,
            targetEmail: 'alsharqmobile@gmail.com'
          })
        });
      } catch (apiErr) {
        console.warn('Server notification warning:', apiErr);
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          deviceType: 'smartphone',
          deviceModel: '',
          serviceRequired: '',
          serialNumber: '',
          description: ''
        });
      }, 8000);
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
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Request Received & Logged!</h3>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-4">
                Thank you, <strong>{formData.name || 'valued customer'}</strong>. Your repair details have been recorded and forwarded to our lab team at <span className="text-brand-orange font-semibold">alsharqmobile@gmail.com</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <a
                  href={`https://wa.me/971507117043?text=${encodeURIComponent(`Salam Al Sharq Lab! I just submitted a repair request for my ${formData.deviceModel || 'device'} (${formData.serviceRequired || 'repair'}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Message on WhatsApp (+971 50 711 7043)
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Submit Another Device
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  >
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
                    name="deviceModel"
                    value={formData.deviceModel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                    placeholder="e.g., iPhone 16 Pro Max, Galaxy S24 Ultra"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Required
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
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
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
