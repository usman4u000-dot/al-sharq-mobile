import React, { useState } from 'react';
import { X, Send, Mail, User, MessageSquare, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Full Name is required';
    }
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email Address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    if (name === 'subject' && !value.trim()) {
      error = 'Subject is required';
    }
    if (name === 'message' && !value.trim()) {
      error = 'Message is required';
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(err => err !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('contact_modal') : 'dummy-token');
      console.log('reCAPTCHA token:', token);
      
      // Save directly to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          type: 'contact_modal',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          notifyEmail: 'alsharqmobile@gmail.com',
          status: 'unread',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Firestore contact modal save warning:', dbErr);
      }

      // Notify backend server targeting alsharqmobile@gmail.com
      try {
        await fetch('/api/contact-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            targetEmail: 'alsharqmobile@gmail.com'
          })
        });
      } catch (apiErr) {
        console.warn('Server contact modal error:', apiErr);
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-700 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs ml-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-700 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs ml-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.subject ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      id="modal-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.subject 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-700 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="How can we help?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-xs ml-1">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-message" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${errors.message ? 'text-red-400' : 'text-gray-400'}`} />
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:ring-2 transition-all outline-none resize-none text-gray-900 dark:text-white ${
                        errors.message 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-700 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs ml-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-brand-orange/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/20 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
