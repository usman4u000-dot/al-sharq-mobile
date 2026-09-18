import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle, AlertCircle, Clock, Wrench, Package, XCircle, Phone, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Barcode from 'react-barcode';

export default function RepairTracker() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [ticketId, setTicketId] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error' | 'not_found' | 'network_error'>('idle');
  const [ticketData, setTicketData] = useState<any>(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    // Check URL parameters for Stripe callbacks
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');
    const returnedTicketId = params.get('ticketId');
    
    if (paymentStatus === 'success' && returnedTicketId) {
      setTicketId(returnedTicketId);
      setPaymentMessage({ type: 'success', text: 'Payment successful! Your balance is now clear.' });
      setTimeout(() => setPaymentMessage(null), 8000);
      
      // Clean up URL without reloading page
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'cancelled' && returnedTicketId) {
      setTicketId(returnedTicketId);
      setPaymentMessage({ type: 'error', text: 'Payment was cancelled. You can try again below.' });
      setTimeout(() => setPaymentMessage(null), 8000);
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    let unsubscribe: () => void;

    if (status === 'found' && ticketId) {
      const docRef = doc(db, 'tickets', ticketId.trim());
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const newData = docSnap.data();
          setTicketData((prevData: any) => {
            if (prevData && prevData.status !== newData.status) {
              setStatusChanged(true);
              setTimeout(() => setStatusChanged(false), 3000);
            }
            return newData;
          });
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [status, ticketId]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId || !identifier) return;
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setStatus('loading');
    setTicketData(null);
    setStatusChanged(false);
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('track_repair') : 'dummy-token');
      console.log('reCAPTCHA token:', token);

      const docRef = doc(db, 'tickets', ticketId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Basic verification
        if (data.customerName?.toLowerCase().includes(identifier.toLowerCase()) || 
            data.customerPhone?.includes(identifier) ||
            data.mobileNumber?.includes(identifier)) {
          setTicketData(data);
          setStatus('found');
        } else {
          setStatus('not_found');
        }
      } else {
        setStatus('not_found');
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setStatus('network_error');
    }
  };

  const handleCheckout = async () => {
    if (!ticketData || !ticketId) return;
    setIsPaying(true);
    setPaymentMessage(null);
    
    const balance = Math.max(0, (Number(ticketData.price) || 0) - (Number(ticketData.advance) || 0));
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticketId.trim(),
          amount: balance,
          customerName: ticketData.customerName,
          deviceType: ticketData.device
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setPaymentMessage({ type: 'error', text: error.message || 'Payment system is currently unavailable.' });
      setIsPaying(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
      case 'received':
        return { label: 'Received', description: 'Device safely logged at Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets).', icon: Package, color: 'text-gray-500', bg: 'bg-gray-500', border: 'border-gray-500/30', bgLight: 'bg-gray-500/20' };
      case 'diagnosing':
        return { label: 'Diagnosing', description: 'Our senior technician is identifying the fault.', icon: Search, color: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500/30', bgLight: 'bg-blue-500/20' };
      case 'waiting-for-parts':
        return { label: 'Waiting for Parts', description: 'Genuine parts are being pulled from our trading inventory.', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500/30', bgLight: 'bg-purple-500/20' };
      case 'repairing':
        return { label: 'Repairing', description: 'The fix is currently underway.', icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500/30', bgLight: 'bg-orange-500/20' };
      case 'quality-check':
        return { label: 'Quality Check', description: 'Testing screen touch, battery cycles, and sensors.', icon: CheckCircle, color: 'text-teal-500', bg: 'bg-teal-500', border: 'border-teal-500/30', bgLight: 'bg-teal-500/20' };
      case 'ready-for-pickup':
        return { label: 'Ready for Pickup', description: 'Your device is revived! Visit us in Sharjah.', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500/30', bgLight: 'bg-green-500/20' };
      case 'completed':
        return { label: 'Completed', description: 'Repair finished and device returned.', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-600', border: 'border-green-600/30', bgLight: 'bg-green-600/20' };
      case 'cancelled':
        return { label: 'Cancelled', description: 'Repair was cancelled.', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500/30', bgLight: 'bg-red-500/20' };
      default:
        return { label: status, description: 'Status unknown.', icon: Clock, color: 'text-gray-500', bg: 'bg-gray-500', border: 'border-gray-500/30', bgLight: 'bg-gray-500/20' };
    }
  };

  const statusConfig = ticketData ? getStatusInfo(ticketData.status) : null;
  const StatusIcon = statusConfig ? statusConfig.icon : Clock;

  return (
    <section id="track" className="py-24 bg-brand-blue dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Track My Repair</h2>
        <p className="text-gray-300 mb-10 max-w-xl mx-auto">
          Enter your repair ticket ID and your last name or phone number to check the real-time status of your device.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleTrack} className="flex flex-col gap-4 max-w-lg mx-auto">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Ticket ID (e.g., AS-2026-884)"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Last Name or Phone Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center w-full"
            >
              {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Check Status'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 text-left"
              >
                <div className="flex items-start gap-4 animate-pulse">
                  <div className="p-2 bg-white/10 rounded-full h-10 w-10 shrink-0"></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="h-6 bg-white/10 rounded w-1/3"></div>
                      <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                      <div className="h-4 bg-white/10 rounded w-2/3"></div>
                    </div>
                    
                    {/* Skeleton Progress Bar */}
                    <div className="mt-6 w-full bg-white/10 rounded-full h-2"></div>
                    <div className="flex justify-between text-xs text-white/40 mt-2">
                      <div className="h-3 bg-white/10 rounded w-12"></div>
                      <div className="h-3 bg-white/10 rounded w-16"></div>
                      <div className="h-3 bg-white/10 rounded w-14"></div>
                      <div className="h-3 bg-white/10 rounded w-10"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'found' && ticketData && statusConfig && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-8 ${statusConfig.bgLight} border ${statusConfig.border} rounded-xl p-6 text-left relative overflow-hidden`}
              >
                <AnimatePresence>
                  {statusChanged && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-brand-orange/90 z-50 flex items-center justify-center backdrop-blur-sm rounded-xl pointer-events-none"
                    >
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Status Updated!
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    key={statusConfig.label}
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className={`p-2 ${statusConfig.bg} rounded-full`}
                  >
                    <StatusIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <motion.h4 
                        key={statusConfig.label + "-text"}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white font-bold text-lg"
                      >
                        {statusConfig.label}
                      </motion.h4>
                      <span className="text-xs text-white/50 font-mono">{ticketId}</span>
                    </div>
                    <motion.p 
                      key={statusConfig.description}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-white/80 mt-1 italic"
                    >
                      "{statusConfig.description}"
                    </motion.p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/80">
                        Device: <span className="font-semibold text-white">{ticketData.device}</span>
                      </p>
                      <p className="text-white/80">
                        Issue: <span className="text-white">{ticketData.issue}</span>
                      </p>
                    </div>

                    <div className="mt-6 p-3 bg-white rounded-lg flex justify-center">
                      <Barcode value={ticketId} height={40} width={1.8} fontSize={14} background="#ffffff" margin={0} displayValue={true} />
                    </div>
                    
                    {Math.max(0, (Number(ticketData.price) || 0) - (Number(ticketData.advance) || 0)) > 0 && ticketData.status !== 'cancelled' && (
                      <div className="mt-8 bg-white/10 dark:bg-slate-800/50 rounded-xl p-6 border border-white/20 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h4 className="text-white font-bold text-lg">Balance Due</h4>
                            <p className="text-white/70 text-sm mt-1">Pay safely via Stripe</p>
                          </div>
                          <div className="text-2xl font-black text-brand-orange">
                            {Math.max(0, (Number(ticketData.price) || 0) - (Number(ticketData.advance) || 0)).toFixed(2)} AED
                          </div>
                        </div>
                        
                        {paymentMessage && (
                          <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${paymentMessage.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {paymentMessage.text}
                          </div>
                        )}
                        
                        <button
                          onClick={handleCheckout}
                          disabled={isPaying}
                          className="w-full bg-[#635BFF] hover:bg-[#5249ea] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                        >
                          {isPaying ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5" />
                              Pay Balance Now
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    {/* Enhanced Visual Progress Bar */}
                    <div className="mt-10 mb-6 w-full">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-white font-medium text-sm">Overall Progress</span>
                        <span className="text-brand-orange font-bold">
                          {Math.max(0, (['received', 'diagnosing', 'repairing', 'quality-check', 'ready-for-pickup'].indexOf(
                            ticketData.status === 'waiting-for-parts' ? 'diagnosing' : 
                            ticketData.status === 'completed' ? 'ready-for-pickup' : 
                            ticketData.status
                          )) / 4) * 100}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange to-yellow-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(0, (['received', 'diagnosing', 'repairing', 'quality-check', 'ready-for-pickup'].indexOf(
                            ticketData.status === 'waiting-for-parts' ? 'diagnosing' : 
                            ticketData.status === 'completed' ? 'ready-for-pickup' : 
                            ticketData.status
                          )) / 4) * 100}%` }}
                          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
                        />
                      </div>
                      
                      {/* Stepper Details */}
                      <div className="relative mt-6 px-1">
                        <div className="absolute top-2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full hidden sm:block"></div>
                        <motion.div 
                          className="absolute top-2 left-0 h-1 bg-brand-orange -translate-y-1/2 rounded-full hidden sm:block"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(0, (['received', 'diagnosing', 'repairing', 'quality-check', 'ready-for-pickup'].indexOf(
                            ticketData.status === 'waiting-for-parts' ? 'diagnosing' : 
                            ticketData.status === 'completed' ? 'ready-for-pickup' : 
                            ticketData.status
                          )) / 4) * 100}%` }}
                          transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        />
                        <div className="relative flex justify-between space-x-2">
                        {[
                          { key: 'received', label: 'Received' },
                          { key: 'diagnosing', label: 'Diagnosing' },
                          { key: 'repairing', label: 'Repairing' },
                          { key: 'quality-check', label: 'Quality Check' },
                          { key: 'ready-for-pickup', label: 'Ready' }
                        ].map((step, index) => {
                          const currentIndex = ['received', 'diagnosing', 'repairing', 'quality-check', 'ready-for-pickup'].indexOf(
                            ticketData.status === 'pending' ? 'received' :
                            ticketData.status === 'waiting-for-parts' ? 'diagnosing' : 
                            ticketData.status === 'completed' ? 'ready-for-pickup' : 
                            ticketData.status
                          );
                          const isActive = currentIndex === index;
                          const isCompleted = currentIndex > index;
                          return (
                            <div key={step.key} className="flex flex-col items-center relative">
                              <motion.div 
                                initial={false}
                                animate={{ 
                                  backgroundColor: isActive || isCompleted ? '#f97316' : '#1e293b',
                                  borderColor: isActive || isCompleted ? '#f97316' : '#334155',
                                  scale: isActive ? 1.3 : 1
                                }}
                                className={`w-4 h-4 rounded-full border-2 z-10 ${isActive || isCompleted ? 'bg-brand-orange border-brand-orange' : 'bg-slate-800 border-slate-700'}`}
                              />
                              <span className={`text-[10px] sm:text-xs mt-3 font-medium ${isActive ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/40'} absolute top-4 text-center w-20 -ml-10 left-1/2`}>
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'not_found' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-left flex items-center gap-4"
              >
                <div className="p-2 bg-red-500 rounded-full">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Ticket Not Found</h4>
                  <p className="text-red-100 mt-1">We couldn't find a repair ticket matching those details. Please check and try again.</p>
                </div>
              </motion.div>
            )}

            {status === 'network_error' && (
              <motion.div
                key="network_error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 bg-amber-500/20 border border-amber-500/30 rounded-xl p-6 text-left flex items-center gap-4"
              >
                <div className="p-2 bg-amber-500 rounded-full">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Connection Error</h4>
                  <p className="text-amber-100 mt-1">Unable to connect to the repair database. Please check your internet connection and try again.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400 italic mb-2">
              "Every repair tracked here is backed by 12 years of technical excellence."
            </p>
            <p className="text-sm text-gray-300 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              If you have questions about your status, our Sharjah team is available at <a href="tel:+971507117043" className="text-brand-orange hover:underline">+971-50 7117043</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
