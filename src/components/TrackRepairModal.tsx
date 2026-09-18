import React, { useState } from 'react';
import { X, Search, Activity, User, Hash, Package, Clock, Wrench, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Barcode from 'react-barcode';

type RepairStatus = 'received' | 'diagnosing' | 'waiting-for-parts' | 'repairing' | 'ready-for-pickup' | 'cancelled';

interface TrackRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackRepairModal({ isOpen, onClose }: TrackRepairModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [ticketId, setTicketId] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | 'not_found' | 'network_error' | RepairStatus>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId || !identifier) return;
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setIsSearching(true);
    setResult(null);
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('track_repair_modal') : 'dummy-token');
      console.log('reCAPTCHA token:', token);

      const docRef = doc(db, 'tickets', ticketId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.customerName?.toLowerCase().includes(identifier.toLowerCase()) || 
            data.customerPhone?.includes(identifier) ||
            data.mobileNumber?.includes(identifier)) {
          
          let repairStatus = data.status || 'received';
          if (repairStatus === 'pending') repairStatus = 'received';
          if (repairStatus === 'completed') repairStatus = 'ready-for-pickup';
          
          setResult(repairStatus as RepairStatus);
        } else {
          setResult('not_found');
        }
      } else {
        setResult('not_found');
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setResult('network_error');
    } finally {
      setIsSearching(false);
    }
  };

  const resetAndClose = () => {
    setTicketId('');
    setIdentifier('');
    setResult(null);
    onClose();
  };

  const renderStatus = (status: RepairStatus) => {
    const steps = [
      { id: 'received', label: 'Received', icon: Package, desc: 'Device dropped off' },
      { id: 'diagnosing', label: 'Diagnosing', icon: Search, desc: 'Identifying the issue' },
      { id: 'repairing', label: 'Repairing', icon: Wrench, desc: 'Fixing your device' },
      { id: 'ready-for-pickup', label: 'Ready for Pickup', icon: CheckCircle, desc: 'Repair complete' },
    ];

    if (status === 'cancelled') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
        >
          <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-red-800 dark:text-red-300 font-semibold">Repair Cancelled</h4>
            <p className="text-red-700 dark:text-red-400 text-sm mt-1">This repair ticket has been cancelled. Please contact support for more information.</p>
          </div>
        </motion.div>
      );
    }

    if (status === 'waiting-for-parts') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3"
        >
          <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-800 dark:text-amber-300 font-semibold">Waiting for Parts</h4>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">We are currently waiting for replacement parts to arrive to continue the repair.</p>
          </div>
        </motion.div>
      );
    }

    const currentStepIndex = steps.findIndex(s => s.id === status);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Repair Progress</h4>
        </div>
        
        <div className="mb-8 p-3 bg-white rounded-lg flex justify-center border border-gray-100">
          <Barcode value={ticketId} height={30} width={1.5} fontSize={12} background="#ffffff" margin={0} displayValue={true} />
        </div>

        <div className="relative">
          {/* Background Vertical Line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-slate-700" />
          
          {/* Active Animated Vertical Line */}
          <motion.div 
            className="absolute left-[23px] top-6 w-0.5 bg-brand-orange origin-top z-0"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: currentStepIndex > 0 ? (currentStepIndex / (steps.length - 1)) : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            style={{ height: 'calc(100% - 48px)' }}
          />
          
          <div className="space-y-6 relative">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-slate-900 transition-colors duration-300 ${
                    isCompleted ? 'bg-brand-blue text-white' : 
                    isCurrent ? 'bg-brand-orange text-white' : 
                    'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="pt-2">
                    <h5 className={`font-semibold ${
                      isCompleted || isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>{step.label}</h5>
                    <p className={`text-sm mt-0.5 ${
                      isCurrent ? 'text-brand-orange font-medium' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {isCurrent ? 'Currently in progress...' : step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden transition-colors duration-300"
          >
            <div className="relative p-6 sm:p-8">
              <button
                onClick={resetAndClose}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <div className="w-12 h-12 bg-brand-blue/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Track Repair Status</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Enter your ticket ID and phone number or last name to check the real-time status of your device.
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="ticketId" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Ticket ID
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      id="ticketId"
                      required
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-gray-900 dark:text-white transition-all outline-none"
                      placeholder="e.g., T-12345"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="identifier" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Phone Number or Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      id="identifier"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-gray-900 dark:text-white transition-all outline-none"
                      placeholder="Enter your details"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching || !ticketId || !identifier}
                  className="w-full bg-brand-blue text-white font-semibold py-3 px-6 rounded-xl hover:bg-brand-blue/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-blue/20"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Check Status</span>
                    </>
                  )}
                </button>
              </form>

              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  <div className="flex items-start gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-3 pt-1">
                      <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-2/3"></div>
                      
                      <div className="mt-8 relative">
                        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-slate-800" />
                        <div className="space-y-6">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shrink-0 z-10" />
                              <div className="pt-2 flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
                                <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isSearching && result && result !== 'not_found' && result !== 'network_error' && renderStatus(result)}

              {!isSearching && result === 'not_found' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <h4 className="text-red-800 dark:text-red-300 font-semibold">Ticket Not Found</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm mt-1">
                    We couldn't find a repair ticket matching those details. Please check your information and try again.
                  </p>
                </motion.div>
              )}
              
              {!isSearching && result === 'network_error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-800 dark:text-amber-300 font-semibold">Connection Error</h4>
                    <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                      Unable to connect to the server. Please check your internet connection and try again.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
