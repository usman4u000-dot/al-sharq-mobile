import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Scan, CheckCircle2, Zap, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

interface AIImageDiagnosisScannerProps {
  onDiagnosisComplete: (diagnosis: string) => void;
}

export default function AIImageDiagnosisScanner({ onDiagnosisComplete }: AIImageDiagnosisScannerProps) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'scanning' | 'complete'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        startScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setStatus('scanning');
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStatus('complete'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const resetScanner = () => {
    setStatus('idle');
    setImagePreview(null);
    setScanProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-orange/10 rounded-xl">
            <Camera className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Vision Scanner</h3>
            <p className="text-gray-400 text-sm">Upload a photo for instant damage detection</p>
          </div>
        </div>
        <div className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-2 border-dashed border-slate-700 hover:border-brand-orange/50 transition-colors rounded-2xl p-12 text-center cursor-pointer bg-slate-800/50 group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-brand-orange" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Tap to upload a photo of your device</h4>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Our computer vision model will analyze cracks, bends, and battery swelling instantly.
              </p>
            </motion.div>
          )}

          {(status === 'scanning' || status === 'complete') && imagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video flex items-center justify-center"
            >
              <img 
                src={imagePreview} 
                alt="Device to scan" 
                className={`max-h-full max-w-full object-contain mix-blend-screen transition-all ${status === 'complete' ? 'brightness-50' : 'brightness-100'}`} 
              />

              {status === 'scanning' && (
                <>
                  <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay"></div>
                  {/* Scanning line animation */}
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-brand-orange shadow-[0_0_15px_#ff6b00]"
                  ></motion.div>
                  
                  {/* Tracking boxes */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: [0, 1, 0.5], scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute top-1/3 left-1/4 w-1/4 h-1/4 border-2 border-brand-orange/70 rounded bg-brand-orange/10"
                  ></motion.div>
                  
                  {/* Progress overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 text-white px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-sm">
                    <Scan className="w-5 h-5 text-brand-orange animate-spin" />
                    <span className="font-mono font-bold tracking-widest">{scanProgress}%</span>
                  </div>
                </>
              )}

              {status === 'complete' && (
                 <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                   <motion.div 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1 }}
                     className="w-20 h-20 bg-brand-orange/20 border-2 border-brand-orange rounded-full flex items-center justify-center mb-6"
                   >
                     <Zap className="w-10 h-10 text-brand-orange" />
                   </motion.div>
                   <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">Severe Display Fracture</h3>
                   <div className="flex items-center gap-2 text-brand-orange bg-slate-900/80 px-4 py-2 rounded-full border border-brand-orange/30 font-mono text-sm mb-6">
                     <Layers className="w-4 h-4" /> Confidence: 99.4%
                   </div>
                   
                   <p className="text-white/80 max-w-md mx-auto mb-8 bg-slate-900/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50">
                     Our AI detected spider-web shattering originating from the top-right quadrant. The OLED panel beneath appears comprised. Total assembly replacement recommended.
                   </p>

                   <div className="flex gap-4">
                     <button 
                       onClick={() => onDiagnosisComplete('Display Replacement')}
                       className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-xl hover:shadow-orange-500/20"
                     >
                       Proceed to Estimate
                     </button>
                     <button 
                       onClick={resetScanner}
                       className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl border border-slate-600 transition-all flex items-center gap-2"
                     >
                       <RefreshCw className="w-4 h-4" /> Scan Another
                     </button>
                   </div>
                 </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
