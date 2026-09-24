import React, { useState } from 'react';
import { X, Smartphone, Tablet, Laptop, Monitor, MapPin, Clock, CheckCircle, Loader2, ChevronLeft, ChevronRight, Truck, Store, User, Phone, Wrench, Mail, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logger } from '../utils/logger';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const deviceCategories = {
  'Mobile Phones': ['iPhone 18 / 18 Pro Series', 'iPhone (All Series)', 'Samsung Galaxy (S/Z/A)', 'Google Pixel', 'Huawei / Xiaomi'],
  'Tablets': ['iPad (Pro/Air/Mini)', 'Samsung Galaxy Tab', 'Microsoft Surface', 'Graphic Tablets'],
  'Laptops & PCs': ['MacBook (M1/M2/M3/M4)', 'Windows Laptops (Dell/HP)', 'Custom Gaming PCs', 'iMac / Mac Mini'],
  'Others': ['Other Device']
};

const damages = [
  { id: 'screen', label: 'Cracked or Broken Screen', priceRange: 'From AED 150' },
  { id: 'battery', label: 'Battery Issues', priceRange: 'From AED 100' },
  { id: 'water', label: 'Water/Liquid Damage', priceRange: 'Diagnostic: AED 50' },
  { id: 'charging', label: 'Charging Port Problems', priceRange: 'From AED 150' },
  { id: 'camera', label: 'Camera Repair', priceRange: 'From AED 150' },
  { id: 'audio', label: 'Audio Issues', priceRange: 'From AED 100' },
  { id: 'body', label: 'Button/Body Damage', priceRange: 'From AED 150' },
  { id: 'software', label: 'Software Issues', priceRange: 'From AED 100' },
  { id: 'data', label: 'Data Recovery', priceRange: 'From AED 250' },
  { id: 'other', label: 'Other Issue', priceRange: 'Variable (Depends on diagnosis)' }
];

const cities = [
  'Sharjah (Main Lab - Muwaileh)',
  'Dubai',
  'Ajman',
  'Abu Dhabi',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah'
];

const getTravelFee = (city: string) => {
  if (['Sharjah (Main Lab - Muwaileh)', 'Dubai', 'Ajman'].includes(city)) return 'Free';
  return 'AED 30';
};

const serviceMethods = [
  { 
    id: 'In-Shop Repair', 
    title: '🏢 In-Shop Repair (Muwaileh Lab)', 
    icon: Store,
    description: 'Fastest turnaround. Visit our engineering lab in Sharjah.',
    bestFor: 'Screen replacements, battery swaps, and micro-soldering.',
    timing: '10:00 AM – 11:45 PM (Open Late).',
    benefit: 'Repairs completed in 30–60 minutes while you wait.'
  },
  { 
    id: 'Courier Pickup', 
    title: '🚚 Courier Pickup (Doorstep Collection)', 
    icon: Truck,
    description: 'Available across all Emirates (Sharjah, Dubai, Ajman, Abu Dhabi, etc.).',
    howItWorks: 'Our logistics partner collects your device from your home/office.',
    turnaround: '24–48 Hours (Pickup ➔ Repair ➔ Return).',
    benefit: 'Safe, insured transport for high-end MacBooks and flagship phones.'
  },
  { 
    id: 'Onsite Repair', 
    title: '🛠️ Onsite Repair (Anywhere in UAE)', 
    icon: Wrench,
    description: 'Our "Mobile Lab" comes to you. Premium convenience.',
    availability: 'Home or Office visits in all 7 Emirates.',
    services: 'Screen and battery repairs only (Complex logic board work requires the lab).',
    benefit: 'No travel required. Your device is fixed in front of you.'
  }
];

export default function BookingModal({ isOpen, onClose, initialService = '' }: BookingModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    deviceCategory: 'Mobile Phones',
    deviceModel: '',
    city: '',
    serviceType: initialService || 'General Inquiry',
    serviceMethod: '',
    preferredTime: '',
    name: '',
    email: '',
    phone: ''
  });

  // Update serviceType when initialService changes
  React.useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRefNumber = () => {
    return 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setIsSubmitting(true);
    setErrorDetails(null);
    const newRefNumber = generateRefNumber();
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('booking_modal') : 'dummy-token');
      console.log('reCAPTCHA token:', token);
      
      const estimatedCost = damages.find(d => d.label === formData.serviceType)?.priceRange || 'Variable (Depends on diagnosis)';

      // 1. Save directly to Firestore DB under bookings collection
      try {
        await addDoc(collection(db, 'bookings'), {
          refNumber: newRefNumber,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          city: formData.city,
          deviceCategory: formData.deviceCategory,
          deviceModel: formData.deviceModel,
          serviceType: formData.serviceType,
          serviceMethod: formData.serviceMethod,
          preferredTime: formData.preferredTime,
          estimatedCost,
          notifyEmail: 'alsharqmobile@gmail.com',
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Firestore booking save error:', dbErr);
      }

      // 2. Dispatch notification to server API for alsharqmobile@gmail.com
      try {
        const response = await fetch('/api/send-booking-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refNumber: newRefNumber,
            targetEmail: 'alsharqmobile@gmail.com',
            ...formData,
            estimatedCost
          })
        });

        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          setErrorDetails(data.message || 'Too many booking requests from your network. Please wait a few minutes before submitting again.');
          setIsSubmitting(false);
          return;
        }
      } catch (apiErr) {
        console.warn('Backend notification API error:', apiErr);
      }

      // 3. Dispatch via EmailJS if credentials exist, targeting alsharqmobile@gmail.com
      try {
        if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              to_name: 'Al Sharq Mobile Lab',
              to_email: 'alsharqmobile@gmail.com',
              business_email: 'alsharqmobile@gmail.com',
              customer_name: formData.name,
              customer_email: formData.email,
              reply_to: formData.email,
              ref_number: newRefNumber,
              device_model: formData.deviceModel,
              service_type: formData.serviceType,
              service_method: formData.serviceMethod,
              estimated_cost: estimatedCost,
              city: formData.city,
              phone: formData.phone
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } else {
          console.log('[BOOKING LOGGED] Target notification recipient: alsharqmobile@gmail.com');
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      } catch (emailError) {
        logger.error("Failed to send email via EmailJS", emailError);
      }
      
      setRefNumber(newRefNumber);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setStep(1);
        setRefNumber(null);
        setFormData({
          deviceCategory: 'Mobile Phones',
          deviceModel: '',
          city: '',
          serviceType: initialService || 'General Inquiry',
          serviceMethod: '',
          preferredTime: '',
          name: '',
          email: '',
          phone: ''
        });
      }, 7000);
    } catch (error) {
      logger.error("Error submitting booking form", error, { formData });
      setIsSubmitting(false);
      setErrorDetails("Unable to connect to the booking service. Please check your network connection and try again.");
    }
  };

  const isSharjah = formData.city === 'Sharjah (Main Lab - Muwaileh)';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto relative transition-colors duration-300">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-6 md:p-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                     <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-2">Booking Confirmed!</h3>
                     <p className="text-gray-500 dark:text-gray-400 mb-6">
                       Thank you, {formData.name}. A technician will contact you via WhatsApp at {formData.phone} within 15 minutes.
                     </p>
                     
                     {refNumber && (
                       <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 inline-block text-left w-full max-w-md">
                         <div className="flex items-center justify-between mb-1">
                           <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                             <Hash className="w-3.5 h-3.5" /> Booking Reference
                           </span>
                           <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-2 py-0.5 rounded-full">
                             Dispatched to Lab
                           </span>
                         </div>
                         <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-wider mb-2">
                           {refNumber}
                         </div>
                         <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mb-3">
                           <p><strong>Device:</strong> {formData.deviceCategory} - {formData.deviceModel}</p>
                           <p><strong>Service:</strong> {formData.serviceType} ({formData.serviceMethod})</p>
                           <p><strong>Notification:</strong> <span className="text-brand-orange font-semibold">alsharqmobile@gmail.com</span></p>
                         </div>
                         <hr className="my-3 border-gray-200 dark:border-slate-700" />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                           <a
                             href={`https://wa.me/971507117043?text=${encodeURIComponent(`Salam Al Sharq Lab! I submitted booking:\nRef: ${refNumber}\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nDevice: ${formData.deviceModel}\nService: ${formData.serviceType}`)}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors"
                           >
                             <span>📱 WhatsApp Lab</span>
                           </a>
                           <a
                             href={`mailto:alsharqmobile@gmail.com?subject=${encodeURIComponent(`Booking Ref: ${refNumber} - ${formData.deviceModel}`)}&body=${encodeURIComponent(`Hi Al Sharq Team,\n\nI submitted booking Ref: ${refNumber}\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nDevice: ${formData.deviceModel}\nService: ${formData.serviceType}`)}`}
                             className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg text-xs font-semibold transition-colors"
                           >
                             <Mail className="w-3.5 h-3.5 text-brand-orange" />
                             <span>Email to Shop</span>
                           </a>
                         </div>
                       </div>
                     )}

                     {isSharjah && (
                       <a 
                         href="https://maps.google.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all w-full sm:w-auto"
                       >
                         <MapPin className="w-5 h-5" /> Get Directions to our Lab
                       </a>
                     )}
                   </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-brand-blue dark:text-white">Book Repair & Get Estimate</h2>
                        <span className="text-sm font-medium text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                          Step {step} of 4
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                        <div 
                          className="bg-brand-orange h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Select Your Device</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose your device category to begin diagnostics.</p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                              {Object.keys(deviceCategories).map((cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, deviceCategory: cat, deviceModel: '' }))}
                                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    formData.deviceCategory === cat
                                      ? 'bg-brand-blue text-white dark:bg-brand-orange'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                              {deviceCategories[formData.deviceCategory as keyof typeof deviceCategories].map((model) => (
                                <button
                                  key={model}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, deviceModel: model }))}
                                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                                    formData.deviceModel === model
                                      ? 'border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10 ring-1 ring-brand-orange'
                                      : 'border-gray-200 dark:border-slate-600 hover:border-brand-orange/50 bg-white dark:bg-slate-800'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    formData.deviceModel === model ? 'border-brand-orange' : 'border-gray-300 dark:border-slate-500'
                                  }`}>
                                    {formData.deviceModel === model && <div className="w-2 h-2 bg-brand-orange rounded-full" />}
                                  </div>
                                  <span className="font-medium text-gray-900 dark:text-white">{model}</span>
                                </button>
                              ))}
                            </div>

                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Select the Damage / Service Required</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose the issue to get an instant estimate and book a repair.</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                {damages.map(damage => {
                                  const isSelected = formData.serviceType === damage.label || (damage.id === 'other' && (!damages.some(d => d.label === formData.serviceType) || formData.serviceType === 'Other Issue'));
                                  return (
                                  <button
                                    key={damage.id}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, serviceType: damage.label }))}
                                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                                      isSelected
                                        ? 'border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10 ring-1 ring-brand-orange'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-brand-orange/50 bg-white dark:bg-slate-800'
                                    }`}
                                  >
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                      isSelected ? 'border-brand-orange' : 'border-gray-300 dark:border-slate-500'
                                    }`}>
                                      {isSelected && <div className="w-2 h-2 bg-brand-orange rounded-full" />}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-medium text-gray-900 dark:text-white text-sm">{damage.label}</span>
                                    </div>
                                  </button>
                                )})}
                              </div>

                              {(!damages.some(d => d.label === formData.serviceType) || formData.serviceType === 'Other Issue') && (
                                <input
                                  type="text"
                                  name="serviceType"
                                  value={formData.serviceType === 'Other Issue' ? '' : formData.serviceType}
                                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                                  className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                                  placeholder="Please specify the issue"
                                />
                              )}

                              {damages.some(d => d.label === formData.serviceType) && formData.serviceType !== 'Other Issue' && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mt-2">
                                  <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Estimated Cost:</p>
                                  <p className="text-xl font-bold text-brand-orange">{
                                    damages.find(d => d.label === formData.serviceType)?.priceRange || 'Variable (Depends on diagnosis)'
                                  }</p>
                                  <p className="text-xs text-brand-blue dark:text-blue-400 mt-2 font-medium">Continue to securely book this repair estimate</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={!formData.deviceModel || !formData.serviceType}
                            onClick={() => setStep(2)}
                            className="w-full bg-brand-blue hover:bg-slate-800 dark:bg-brand-orange dark:hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            Next: Location <ChevronRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Select Your City (UAE Service Area)</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Where are you located? We offer in-shop repair and courier pickup across the Emirates.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {cities.map((city) => (
                                <button
                                  key={city}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, city }))}
                                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                                    formData.city === city
                                      ? 'border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10 ring-1 ring-brand-orange'
                                      : 'border-gray-200 dark:border-slate-600 hover:border-brand-orange/50 bg-white dark:bg-slate-800'
                                  }`}
                                >
                                  <MapPin className={`w-5 h-5 ${formData.city === city ? 'text-brand-orange' : 'text-gray-400'}`} />
                                  <span className="font-medium text-gray-900 dark:text-white">{city}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                              <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                            <button
                              type="button"
                              disabled={!formData.city}
                              onClick={() => setStep(3)}
                              className="flex-[2] bg-brand-blue hover:bg-slate-800 dark:bg-brand-orange dark:hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              Next: Appointment Details <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Select Your Service Method</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose how you want us to handle your repair.</p>
                            
                            <div className="space-y-3 mb-6">
                              {serviceMethods.map((type) => (
                                <label
                                  key={type.id}
                                  className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all ${
                                    formData.serviceMethod === type.id
                                      ? 'border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10 ring-1 ring-brand-orange'
                                      : 'border-gray-200 dark:border-slate-600 hover:border-brand-orange/50 bg-white dark:bg-slate-800'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="serviceMethod"
                                    value={type.id}
                                    checked={formData.serviceMethod === type.id}
                                    onChange={(e) => setFormData(prev => ({ ...prev, serviceMethod: e.target.value }))}
                                    className="sr-only"
                                  />
                                  <span className="flex flex-1">
                                    <span className="flex flex-col">
                                      <span className="block text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <type.icon className="w-5 h-5 text-brand-orange" />
                                        {type.title}
                                      </span>
                                      <span className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        {type.description}
                                      </span>
                                      {type.id === 'Onsite Repair' && formData.city && (
                                        <span className="mt-2 text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-md inline-block w-fit">
                                          Travel Fee to {formData.city.split(' ')[0]}: {getTravelFee(formData.city)}
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                  <CheckCircle
                                    className={`h-5 w-5 text-brand-orange ${
                                      formData.serviceMethod === type.id ? 'visible' : 'invisible'
                                    }`}
                                    aria-hidden="true"
                                  />
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                              <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                            <button
                              type="button"
                              disabled={!formData.serviceMethod}
                              onClick={() => setStep(4)}
                              className="flex-[2] bg-brand-blue hover:bg-slate-800 dark:bg-brand-orange dark:hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              Next: Confirm <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confirm Appointment</h3>
                            
                            {/* Smart Choice Confirmation Message */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
                              <h4 className="font-bold text-brand-blue dark:text-white mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" /> Review Your Selection:
                              </h4>
                              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li><span className="font-semibold">Device:</span> {formData.deviceModel}</li>
                                <li><span className="font-semibold">Issue:</span> {formData.serviceType}</li>
                                <li>
                                  <span className="font-semibold">Estimated Cost:</span>{' '}
                                  <span className="text-brand-orange font-bold">
                                    {damages.find(d => d.label === formData.serviceType)?.priceRange || 'Variable (Depends on diagnosis)'}
                                  </span>
                                </li>
                                <li><span className="font-semibold">Method:</span> {formData.serviceMethod}</li>
                                <li>
                                  <span className="font-semibold">Estimated Start:</span>{' '}
                                  {formData.serviceMethod === 'In-Shop Repair' ? 'Immediate' : 
                                   formData.serviceMethod === 'Onsite Repair' ? 'Within 4 hours' : 'Pickup within 24 hours'}
                                </li>
                                <li><span className="font-semibold">Location:</span> {formData.city}</li>
                                {formData.serviceMethod === 'Onsite Repair' && (
                                  <li className="text-brand-orange font-medium mt-2">
                                    * Travel Fee: {getTravelFee(formData.city)}
                                  </li>
                                )}
                              </ul>
                              
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm flex items-center gap-2">
                                  Accepted Payment Methods:
                                </h5>
                                <div className="flex flex-wrap gap-3 items-center text-sm font-medium">
                                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">Cash</span>
                                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">Credit/Debit Card</span>
                                  <span className="px-3 py-1 bg-[#EEFDF4] text-[#1D9968] border border-[#1D9968]/20 rounded-lg font-black tracking-tight text-lg">tabby</span>
                                  <span className="px-3 py-1 bg-[#FFF4F0] text-[#E58869] border border-[#E58869]/20 rounded-lg font-black tracking-tight text-lg">tamara</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {errorDetails && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                                >
                                  <div className="p-1 bg-red-100 dark:bg-red-900/50 rounded-full shrink-0">
                                    <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-red-800 dark:text-red-300 font-semibold text-sm">Booking Failed</h4>
                                    <p className="text-red-700 dark:text-red-400 text-sm mt-0.5">{errorDetails}</p>
                                  </div>
                                </motion.div>
                              )}
                              
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                                  <User className="h-4 w-4 text-brand-orange" /> Full Name *
                                </label>
                                <input
                                  required
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                                  <Mail className="h-4 w-4 text-brand-orange" /> Email Address *
                                </label>
                                <input
                                  required
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                                  <Phone className="h-4 w-4 text-brand-orange" /> WhatsApp Number *
                                </label>
                                <input
                                  required
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                                  placeholder="+971 50 000 0000"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setStep(3)}
                              className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                              <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting || !formData.name || !formData.phone}
                              className="flex-[2] bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 px-2 rounded-xl shadow-lg shadow-orange-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                  Confirming...
                                </>
                              ) : (
                                '✅ CONFIRM APPOINTMENT'
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
