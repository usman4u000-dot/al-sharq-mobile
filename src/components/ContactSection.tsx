import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, FileText, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactSection() {
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
      const token = (executeRecaptcha ? await executeRecaptcha('contact_form') : 'dummy-token');
      console.log('reCAPTCHA token:', token);
      
      // Save directly to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          type: 'contact_message',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          notifyEmail: 'alsharqmobile@gmail.com',
          status: 'unread',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Firestore contact save warning:', dbErr);
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
        console.warn('Server contact inquiry error:', apiErr);
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });
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
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Have a question about a repair or need a quote? Send us a message and our team will get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Your trusted <strong>Sahara Centre Phone Repair</strong> alternative and premier <strong>Sharjah City Centre Tech Support</strong>. If you are searching for a reliable <strong>mobile shop near me</strong> or <strong>phone repair near me</strong>, we are the leading <strong>Sharjah Industrial Area Computer Trading</strong> center.
              </p>

              <div className="mb-8">
                <a 
                  href="https://wa.me/971507117043?text=Hello,%20I%20would%20like%20to%20ask%20about%20a%20repair%20quote."
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 focus:ring-2 focus:ring-[#25D366] focus:outline-none"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>Chat on WhatsApp for a Quote</span>
                </a>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Visit Our Repair Workshop</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      <strong>Al Sharq Mobile Phone & Computer Trading LLC</strong><br />
                      BLDG#1017 - SHOP#2 Fire Station Road<br />
                      Muwaileh - Industrial Area - Sharjah - United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Call Us</h4>
                    <div className="flex flex-col mt-1 gap-1">
                      <a href="tel:+971507117043" className="text-gray-600 dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">
                        Mobile: +971 50 711 7043
                      </a>
                      <a href="tel:+97165392120" className="text-gray-600 dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">
                        Landline: +971 6 539 2120
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Us</h4>
                    <a href="mailto:alsharqmobile@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors mt-1 block">
                      alsharqmobile@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-blue dark:bg-slate-950 p-8 rounded-2xl shadow-lg text-white transition-colors">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-3 text-white/80">
                <div className="flex justify-between">
                  <span>Saturday - Thursday</span>
                  <span>9:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>4:00 PM - 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Live Google Map */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 transition-colors overflow-hidden">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 px-4 pt-2">Find Us Here</h3>
              <div className="w-full h-[300px] rounded-xl overflow-hidden relative">
                <iframe
                  title="Al Sharq Mobile Location"
                  src="https://maps.google.com/maps?q=Al%20Sharq%20Mobile%20Phone%20%26%20Computer%20Trading%20LLC%20Muwailah%20Sharjah&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-4 px-2 pb-2">
                <a 
                  href="https://goo.gl/maps/search/Al+Sharq+Mobile+Phone+Sharjah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-brand-blue text-white font-semibold py-3 px-6 rounded-xl hover:bg-brand-blue/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 transition-colors"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-brand-orange font-semibold hover:text-brand-orange/80 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-600 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-600 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.subject ? 'text-red-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border rounded-xl focus:ring-2 transition-all outline-none text-gray-900 dark:text-white ${
                        errors.subject 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-600 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="How can we help?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${errors.message ? 'text-red-400' : 'text-gray-400'}`} />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border rounded-xl focus:ring-2 transition-all outline-none resize-none text-gray-900 dark:text-white ${
                        errors.message 
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                          : 'border-gray-200 dark:border-slate-600 focus:ring-brand-orange/20 focus:border-brand-orange'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange text-white font-semibold py-4 px-6 rounded-xl hover:bg-brand-orange/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/20"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
