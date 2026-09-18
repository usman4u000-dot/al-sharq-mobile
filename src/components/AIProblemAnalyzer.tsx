import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Scan, CheckCircle2, AlertTriangle, ArrowRight, Activity, Smartphone, Wrench } from 'lucide-react';

interface AIProblemAnalyzerProps {
  onRecommendationClick: (service: string) => void;
}

export default function AIProblemAnalyzer({ onRecommendationClick }: AIProblemAnalyzerProps) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [results, setResults] = useState<{
    primaryIssue: string;
    confidence: number;
    recommendedAction: string;
    estimatedTime: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  } | null>(null);

  const performAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length < 10) return;

    setStatus('analyzing');
    setAnalysisSteps([]);

    const steps = [
      "Processing natural language description...",
      "Cross-referencing with 2026 failure databases...",
      "Analyzing component fault probability...",
      "Generating diagnostic report..."
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setAnalysisSteps((prev) => [...prev, steps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        
        const desc = description.toLowerCase();
        let result: {
          primaryIssue: string;
          confidence: number;
          recommendedAction: string;
          estimatedTime: string;
          urgency: 'Low' | 'Medium' | 'High' | 'Critical';
        } = {
          primaryIssue: "Hardware Anomaly Detected",
          confidence: 76,
          recommendedAction: "General Diagnostic Check",
          estimatedTime: "2-4 Hours",
          urgency: "Medium"
        };

        if (desc.includes('water') || desc.includes('drop') || desc.includes('liquid') || desc.includes('tea')) {
          result = {
            primaryIssue: "Liquid Damage / Short Circuit Risk",
            confidence: 94,
            recommendedAction: "Ultrasonic Cleaning & Micro-Soldering Diagnosis",
            estimatedTime: "24-48 Hours",
            urgency: "Critical"
          };
        } else if (desc.includes('screen') || desc.includes('glass') || desc.includes('display') || desc.includes('cracked')) {
           result = {
            primaryIssue: "Display Panel / Digitizer Failure",
            confidence: 98,
            recommendedAction: "OEM Screen Replacement",
            estimatedTime: "30 Minutes",
            urgency: "Medium"
          };
        } else if (desc.includes('battery') || desc.includes('charge') || desc.includes('dying') || desc.includes('percent')) {
           result = {
            primaryIssue: "Battery Cell Degradation",
            confidence: 91,
            recommendedAction: "Battery Replacement & Cycle Reset",
            estimatedTime: "20 Minutes",
            urgency: "High"
          };
        } else if (desc.includes('turn on') || desc.includes('logo') || desc.includes('boot') || desc.includes('dead')) {
           result = {
            primaryIssue: "Logic Board / Power IC Failure",
            confidence: 85,
            recommendedAction: "Level 4 Logic Board Diagnosis",
            estimatedTime: "2-3 Days",
            urgency: "High"
          };
        }

        setResults(result);
        setStatus('complete');
      }
    }, 800);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Input Side */}
        <div className="flex-1 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6 border border-brand-orange/20">
            <Cpu className="w-4 h-4" /> AI Diagnostics System
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Describe the problem. Let our AI analyze it.
          </h2>
          <p className="text-gray-400 mb-8">
            Our 2026 diagnostic neural net can instantly assess the probable cause of failure and estimate repair timelines just from a detailed description.
          </p>

          {(status === 'idle' || status === 'analyzing') && (
            <form onSubmit={performAnalysis}>
              <div className="relative mb-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., I dropped my phone in the pool yesterday. Now it's stuck on the Apple logo and getting really hot..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-brand-orange outline-none transition-all placeholder-gray-600 resize-none"
                  disabled={status === 'analyzing'}
                />
              </div>
              <button 
                type="submit"
                disabled={description.length < 10 || status === 'analyzing'}
                className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                {status === 'analyzing' ? (
                  <><Scan className="w-5 h-5 animate-pulse" /> Running Analysis...</>
                ) : (
                  <><Activity className="w-5 h-5" /> Start AI Analysis</>
                )}
              </button>
            </form>
          )}

          {status === 'complete' && (
             <button 
               onClick={() => {
                 setStatus('idle');
                 setDescription('');
                 setResults(null);
               }}
               className="text-gray-400 hover:text-white transition-colors"
             >
               Reset & analyze another device
             </button>
          )}
        </div>

        {/* Output Side */}
        <div className="flex-1 w-full max-w-md">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[300px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-slate-900/50"
              >
                <Smartphone className="w-16 h-16 text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">Awaiting input description to generate diagnostics overlay.</p>
              </motion.div>
            )}

            {status === 'analyzing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[300px] bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center"
              >
                 <div className="flex justify-center mb-8">
                   <div className="relative">
                      <div className="absolute inset-0 bg-brand-orange/30 rounded-full blur-xl animate-pulse"></div>
                      <Scan className="w-16 h-16 text-brand-orange relative z-10 animate-[spin_3s_linear_infinite]" />
                   </div>
                 </div>
                 <div className="space-y-3 font-mono text-xs text-brand-orange/80">
                   {analysisSteps.map((step, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={idx}
                        className="flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                        {step}
                      </motion.div>
                   ))}
                   <motion.div 
                     animate={{ opacity: [1, 0, 1] }} 
                     transition={{ repeat: Infinity, duration: 1 }}
                     className="text-white mt-4"
                   >
                     _
                   </motion.div>
                 </div>
              </motion.div>
            )}

            {status === 'complete' && results && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 rounded-3xl border border-slate-700 p-8 shadow-2xl relative"
              >
                {/* Urgent indicator */}
                <div className={`absolute top-0 right-0 translate-x-2 -translate-y-2 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getUrgencyColor(results.urgency)}`}>
                   {results.urgency === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                   Urgency: {results.urgency}
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Detected Fault Mode</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{results.primaryIssue}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-800 rounded-full h-2">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${results.confidence}%` }}
                         transition={{ delay: 0.5, duration: 1 }}
                         className="bg-brand-blue h-2 rounded-full"
                       ></motion.div>
                    </div>
                    <span className="text-brand-blue font-bold text-sm min-w-[3rem]">{results.confidence}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">Hypothesis Confidence</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Recommended Execution</p>
                    <p className="text-lg font-semibold text-white flex items-center gap-2">
                       <Wrench className="w-4 h-4 text-brand-orange" /> {results.recommendedAction}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Projected Repair SLA</p>
                    <p className="text-lg font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-500" /> {results.estimatedTime}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => onRecommendationClick(results.recommendedAction)}
                  className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Schedule this Service <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
