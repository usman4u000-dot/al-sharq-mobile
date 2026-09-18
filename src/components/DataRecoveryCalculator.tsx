import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HardDrive, CheckCircle2, AlertCircle, ArrowRight, XCircle } from 'lucide-react';

export default function DataRecoveryCalculator({ onBookNow }: { onBookNow: (s?: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const questions = [
    {
      question: "What happened to the device?",
      options: [
        { label: "Dropped in Water / Liquid Damage", weight: -20 },
        { label: "Smashed / Physical Impact", weight: -10 },
        { label: "Sudden Power Loss / Won't Turn On", weight: 0 },
        { label: "Stuck on Logo / Bootloop", weight: 10 },
        { label: "Accidentally Deleted Files", weight: 20 },
      ]
    },
    {
      question: "Does the device show any signs of life?",
      options: [
        { label: "Yes, vibrates or makes sounds", weight: 30 },
        { label: "Screen lights up faintly", weight: 20 },
        { label: "Recognized by computer but inaccessible", weight: 40 },
        { label: "Completely dead", weight: -15 },
      ]
    },
    {
      question: "What type of data is most important?",
      options: [
        { label: "Photos & Videos", weight: 0 },
        { label: "WhatsApp Chats", weight: -5 },
        { label: "Contacts & Notes", weight: 5 },
        { label: "Documents", weight: 0 },
      ]
    }
  ];

  const handleSelect = (optionLabel: string, weight: number) => {
    setAnswers({ ...answers, [step]: ({ label: optionLabel, weight } as any) });
    setTimeout(() => {
      setStep(s => s + 1);
    }, 400);
  };

  const calculateProbability = () => {
    let base = 60; // Base probability 60%
    let totalWeight = Object.values(answers).reduce((acc, curr: any) => acc + curr.weight, 0);
    let finalProb = base + totalWeight;
    
    // Clamp between 5% and 98%
    if (finalProb > 98) finalProb = 98;
    if (finalProb < 5) finalProb = 5;
    
    return finalProb;
  };

  const getAssessment = (prob: number) => {
    if (prob >= 80) return { text: "High Probability of Recovery", color: "text-green-500", bg: "bg-green-100", icon: CheckCircle2 };
    if (prob >= 40) return { text: "Moderate Probability", color: "text-yellow-500", bg: "bg-yellow-100", icon: AlertCircle };
    return { text: "Complex Recovery Required", color: "text-red-500", bg: "bg-red-100", icon: XCircle };
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HardDrive className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Data Recovery Probability Calculator</h3>
        <p className="text-slate-600 dark:text-slate-400">Answer 3 quick questions to check if we can save your data.</p>
      </div>

      <div className="min-h-[250px] relative">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div 
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0"
            >
              <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center">
                {step + 1}. {questions[step].question}
              </h4>
              <div className="flex flex-col gap-3">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.label, opt.weight)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all text-left font-medium text-slate-700 dark:text-slate-300"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {(() => {
                const prob = calculateProbability();
                const assessment = getAssessment(prob);
                const Icon = assessment.icon;
                
                return (
                  <>
                    <div className="relative mb-6">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-700" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={`${prob * 2.827} 282.7`} strokeDashoffset="0" className={`${assessment.color} transition-all duration-1000 ease-out`} transform="rotate(-90 50 50)" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">{prob}%</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 ${assessment.bg} ${assessment.color} rounded-full font-bold mb-6`}>
                      <Icon className="w-5 h-5" />
                      {assessment.text}
                    </div>

                    <p className="text-center text-slate-600 dark:text-slate-400 mb-6 text-sm">
                      *This is an estimate. Our Level-3 engineers need physical access for a microscopic examination and logic board diagnosis.
                    </p>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(0)}
                        className="px-6 py-3 rounded-xl font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                      >
                        Recalculate
                      </button>
                      <button 
                        onClick={() => onBookNow('Advanced Data Recovery')}
                        className="px-6 py-3 rounded-xl font-bold bg-brand-orange text-white hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2"
                      >
                        Book Diagnosis <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
