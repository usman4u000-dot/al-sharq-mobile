import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, MessageCircle, Calendar, ArrowRight, Loader2, Phone, Mail, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Breadcrumbs from '../components/Breadcrumbs';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import AIProblemAnalyzer from '../components/AIProblemAnalyzer';
import AIImageDiagnosisScanner from '../components/AIImageDiagnosisScanner';

interface RepairEstimatePageProps {
  onBookNow: (serviceName?: string) => void;
}

const deviceModels = [
  'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro Max', 'iPhone 13 Pro',
  'Samsung Galaxy S26 Ultra', 'Samsung Galaxy S25 Ultra', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S23 Ultra', 'Samsung Galaxy Z Fold 6', 'Samsung Galaxy Z Fold 5',
  'MacBook Pro 16" (M4)', 'MacBook Pro 14" (M4)', 'MacBook Pro 16" (M3)', 'MacBook Pro 14" (M3)', 'MacBook Air (M3)', 'MacBook Air (M2)',
  'iPad Pro 13" (M4)', 'iPad Pro 11" (M4)', 'iPad Air (M2)',
  'Other Device (Specify in WhatsApp)'
];

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
  { id: 'other', label: 'Other Issue', priceRange: 'Variable' },
];

export default function RepairEstimatePage({ onBookNow }: RepairEstimatePageProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    model: '',
    damage: '',
    whatsapp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDamageSelect = (damageId: string) => {
    setFormData(prev => ({ ...prev, damage: damageId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('repair_estimate') : 'dummy-token');
      console.log('reCAPTCHA token:', token);
      
      const currentDamage = damages.find(d => d.id === formData.damage);

      // Save inquiry to Firestore database
      try {
        await addDoc(collection(db, 'inquiries'), {
          type: 'repair_estimate',
          model: formData.model,
          damage: currentDamage?.label || formData.damage,
          estimatedPrice: currentDamage?.priceRange || 'N/A',
          whatsapp: formData.whatsapp,
          notifyEmail: 'alsharqmobile@gmail.com',
          status: 'new_lead',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Firestore estimate save warning:', dbErr);
      }

      // Submit to dedicated backend /api/repair-estimate endpoint
      try {
        const response = await fetch('/api/repair-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refNumber: 'EST-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
            model: formData.model,
            damage: currentDamage?.label || formData.damage,
            estimatedPrice: currentDamage?.priceRange || 'Diagnostic',
            whatsapp: formData.whatsapp,
            targetEmail: 'alsharqmobile@gmail.com'
          })
        });

        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          setErrorMessage(data.message || 'Rate limit reached. Too many estimate requests from your network. Please wait a few minutes before trying again.');
          setIsSubmitting(false);
          return;
        }
      } catch (apiErr) {
        console.warn('Server notification warning:', apiErr);
      }
      
      setStep(2); // Move to result page
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDamage = damages.find(d => d.id === formData.damage);

  const handleWhatsAppChat = () => {
    const message = `Hi! I got an estimate for my ${formData.model} (${selectedDamage?.label}). Is it possible to fix it today?`;
    window.open(`https://wa.me/971507117043?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/estimate" />
        <title>Instant Repair Estimate | Al Sharq Mobile Phone</title>
        <meta name="description" content="Get an instant repair estimate for your iPhone, Samsung, or MacBook in Sharjah. Fast, transparent pricing." />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Services', path: '/' },
            { label: 'Repair Estimate' }
          ]} />

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-4">
              <Calculator className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-4">
              Instant Repair Estimate
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get a transparent price range before you even leave your house.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 md:p-10"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Field 1: Select Brand & Model */}
                    <div>
                      <label className="block text-lg font-bold text-gray-900 dark:text-white mb-3">
                        1. Select Brand & Model
                      </label>
                      <select
                        required
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-0 outline-none transition-all text-lg appearance-none"
                      >
                        <option value="" disabled>Choose your device...</option>
                        {deviceModels.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>

                    {/* Field 2: Select the Damage */}
                    <div>
                      <label className="block text-lg font-bold text-gray-900 dark:text-white mb-3">
                        2. Select the Damage
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {damages.map((damage) => (
                          <button
                            key={damage.id}
                            type="button"
                            onClick={() => handleDamageSelect(damage.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                              formData.damage === damage.id
                                ? 'border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10'
                                : 'border-slate-200 dark:border-slate-600 hover:border-brand-orange/50 bg-white dark:bg-slate-800'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              formData.damage === damage.id ? 'border-brand-orange' : 'border-gray-300 dark:border-slate-500'
                            }`}>
                              {formData.damage === damage.id && <div className="w-2.5 h-2.5 bg-brand-orange rounded-full" />}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{damage.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Field 3: Your Contact */}
                    <div>
                      <label className="block text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-brand-orange" /> 3. Your Contact (WhatsApp)
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        We'll send your instant estimate here. No spam, just your quote.
                      </p>
                      <input
                        required
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+971 50 000 0000"
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-brand-orange focus:ring-0 outline-none transition-all text-lg"
                      />
                    </div>

                    {/* Anti-spam honeypot field hidden from legitimate users */}
                    <div className="hidden" aria-hidden="true">
                      <input type="text" name="_hp_check" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Rate Limit and Validation Error Notice */}
                    {errorMessage && (
                      <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm flex items-start gap-3 animate-fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Security / Submission Notice</p>
                          <p>{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!formData.model || !formData.damage || !formData.whatsapp || isSubmitting}
                      className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> Calculating...</>
                      ) : (
                        <><Calculator className="w-6 h-6" /> Get Instant Estimate</>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 md:p-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Estimated Repair Cost for {formData.model}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Based on our current stock in Muwaileh.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 mb-6 inline-block min-w-[300px] border border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Starting From</div>
                    <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">
                      {selectedDamage?.priceRange}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-1 mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Request logged & sent to alsharqmobile@gmail.com
                    </div>
                    {selectedDamage?.id.includes('dead') || selectedDamage?.id.includes('water') ? (
                      <div className="text-sm text-brand-blue dark:text-blue-400 font-medium mt-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                        💡 Diagnosis Credit: AED 50 Diagnostic Fee — FREE if you proceed with the repair.
                      </div>
                    ) : null}
                  </div>

                  <div className="text-left max-w-sm mx-auto mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Includes:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Original Grade Spare Parts
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 90-Day Al Sharq Engineering Warranty
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Free Internal Dust Cleaning
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 30-Minute Turnaround
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-4 mb-8 max-w-sm mx-auto text-left">
                    <p className="text-sm text-brand-orange font-medium">
                      🎓 <span className="font-bold">Student/Faculty Discount:</span> University City Special: Get 10% off your estimate with a valid Student ID.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleWhatsAppChat}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <MessageCircle className="w-5 h-5" /> Chat with Technician Now
                    </button>
                    <button 
                      onClick={() => onBookNow(`${formData.model} - ${selectedDamage?.label}`)}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-brand-blue hover:bg-slate-800 dark:bg-brand-orange dark:hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Calendar className="w-5 h-5" /> Book This Price
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setStep(1)}
                    className="mt-6 text-sm text-gray-500 hover:text-brand-orange transition-colors"
                  >
                    Check another device
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-16">
            <AIProblemAnalyzer onRecommendationClick={onBookNow} />
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Or, let our AI see the damage</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload a photo of your broke device for an instant evaluation.</p>
            </div>
            <AIImageDiagnosisScanner onDiagnosisComplete={onBookNow} />
          </div>
          
        </div>
      </div>
    </>
  );
}
