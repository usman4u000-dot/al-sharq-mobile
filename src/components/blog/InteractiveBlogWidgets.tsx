import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  Wrench, 
  Cpu, 
  Eye, 
  ZoomIn, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  Copy,
  ChevronDown,
  Activity,
  Calculator,
  Search,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* =========================================================================
   1. TABLE OF CONTENTS WITH ACTIVE SCROLLSPY
   ========================================================================= */
export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Table of contents"
      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        <Activity className="w-3.5 h-3.5 text-[#C2410C] dark:text-orange-400" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 px-2 rounded-lg transition-all ${
                  isActive 
                    ? 'font-bold text-[#C2410C] dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-l-2 border-[#C2410C]' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* =========================================================================
   2. AUDIO READ-ALOUD BAR WITH SPEECH SYNTHESIS / PLAYBACK
   ========================================================================= */
export function AudioReadAloudBar({ 
  articleTitle, 
  readDurationMinutes = 4 
}: { 
  articleTitle: string; 
  readDurationMinutes?: number; 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Al Sharq Tech Briefing. Summary of: ${articleTitle}. Verified by Level 4 micro-soldering laboratory in Muwaileh, Sharjah.`
      );
      utterance.rate = speed;
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, (readDurationMinutes * 600) / 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, readDurationMinutes]);

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setSpeed(nextSpeed);
    if (isPlaying && synthRef.current) {
      window.speechSynthesis.cancel();
      synthRef.current.rate = nextSpeed;
      window.speechSynthesis.speak(synthRef.current);
    }
  };

  return (
    <div className="my-6 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <button
          onClick={toggleAudio}
          className="w-11 h-11 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
          aria-label={isPlaying ? "Pause audio narration" : "Listen to article audio narration"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span className="text-orange-400 font-bold uppercase tracking-wide">Audio Briefing</span>
            <span aria-hidden="true">·</span>
            <span>~{readDurationMinutes} min listen</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-white truncate">
            {isPlaying ? "Playing: " + articleTitle : "Listen to this technical guide"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Progress bar */}
        <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors"
          title="Change playback speed"
        >
          {speed}x
        </button>

        <span className="text-[11px] text-slate-400 font-mono">
          {isPlaying ? `${progress}%` : `${readDurationMinutes}:00`}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   3. INTERACTIVE EMERGENCY CHECKLIST (e.g. Water Damage or Phone Inspection)
   ========================================================================= */
export interface ChecklistStep {
  id: string;
  label: string;
  urgency: 'critical' | 'important' | 'recommended';
  tip: string;
}

export function InteractiveEmergencyChecklist({
  title = "Emergency Water Damage First-Aid Protocol",
  steps = [
    {
      id: "power-off",
      label: "Power OFF the phone immediately (Do not test buttons)",
      urgency: "critical",
      tip: "Electricity + liquid creates electrolysis that eats motherboard traces in minutes."
    },
    {
      id: "no-charge",
      label: "NEVER plug in a lightning or Type-C charging cable",
      urgency: "critical",
      tip: "Sending 5V to 20V through a wet charging port blows the VDD_MAIN power management IC."
    },
    {
      id: "remove-sim",
      label: "Eject the SIM tray & wipe exterior with microfiber",
      urgency: "important",
      tip: "The SIM slot acts as an air vent for moisture escape. Check the red Liquid Contact Indicator inside."
    },
    {
      id: "sonic-purge",
      label: "Run 165Hz Acoustic Water Purge via Al Sharq DeviceLab™",
      urgency: "important",
      tip: "Low-frequency sound resonance vibrates speaker mesh diaphragms to expel trapped droplets."
    },
    {
      id: "avoid-rice",
      label: "Do NOT place phone in uncooked rice (Dangerous starch dust)",
      urgency: "recommended",
      tip: "Rice starch clogs the mic mesh and accelerates internal copper oxidation without absorbing deep moisture."
    }
  ]
}: {
  title?: string;
  steps?: ChecklistStep[];
}) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="my-8 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
            <AlertTriangle className="w-4 h-4 text-brand-orange" />
            <span>Interactive Safety Checklist</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">{title}</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-slate-400">
              {completedCount} of {steps.length} completed
            </div>
            <div className="text-sm font-black text-emerald-400">{progressPercent}% Protected</div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
            {completedCount}/{steps.length}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map(step => {
          const isChecked = !!checkedIds[step.id];
          return (
            <div 
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                isChecked 
                  ? 'bg-slate-800/80 border-emerald-500/50' 
                  : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked 
                      ? 'bg-emerald-500 text-slate-950 font-bold' 
                      : 'border-2 border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="flex-grow min-w-0">
                  <div className={`text-sm font-bold transition-all ${
                    isChecked ? 'line-through text-slate-400' : 'text-white'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.tip}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {progressPercent === 100 && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Excellent! You have executed all immediate first-aid containment steps. If liquid was corrosive (saltwater, soup, coffee), bring the device to BLDG#1017 - SHOP#2, Fire Station Rd, Muwaileh for ultrasonic IPA de-oxidation.
          </span>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   4. IN-ARTICLE ACOUSTIC FREQUENCY SPEAKER EJECTOR SOUND WIDGET
   ========================================================================= */
export function InArticleSpeakerEjectorWidget() {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(165, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      setIsPlayingSound(true);
    } catch {
      setIsPlayingSound(true);
    }
  };

  const stopSound = () => {
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    setIsPlayingSound(false);
  };

  return (
    <div className="my-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-orange-950/80 to-slate-900 text-white border border-orange-500/40 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Droplets className="w-4 h-4 text-brand-orange animate-bounce" />
            <span>Live Hardware Audio Tool</span>
          </div>
          <h4 className="text-lg sm:text-xl font-black text-white">
            165Hz Acoustic Sonic Water &amp; Dust Ejector
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Emit a calibrated kinetic acoustic tone directly through your smartphone or laptop speaker chamber to force out water droplets and loose dust particles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {isPlayingSound ? (
            <button
              onClick={stopSound}
              className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 animate-pulse"
            >
              <VolumeX className="w-4 h-4" />
              <span>Stop 165Hz Tone</span>
            </button>
          ) : (
            <button
              onClick={startSound}
              className="px-6 py-3 rounded-2xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play 165Hz Ejection Tone</span>
            </button>
          )}

          <Link
            to="/hardware-test"
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>Full DeviceLab™ Suite</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. MICROSCOPE ENGINEERING INSPECTION CARD (Deep E-E-A-T Credibility)
   ========================================================================= */
export function MicroscopeInspectionCard({
  deviceName = "Apple iPhone 18 / Samsung S26 Ultra",
  faultName = "PP_VDD_MAIN Short to Ground (0.02Ω)",
  technician = "Eng. Tariq Al-Sharq",
  steps = [
    { label: "Trinocular Stereo Microscope Zoom", value: "45x Optical Magnification" },
    { label: "Thermal Imaging Flir Cam", value: "Hotspot detected at Capacitor C3204 (82°C)" },
    { label: "Power Rail Voltage", value: "PP_VDD_MAIN restored to 3.82V nominal" },
    { label: "Solder Protocol", value: "Sn63Pb37 Leaded Micro-Reballing @ 360°C" }
  ]
}: {
  deviceName?: string;
  faultName?: string;
  technician?: string;
  steps?: { label: string; value: string }[];
}) {
  const [zoomLevel, setZoomLevel] = useState<number>(45);

  return (
    <div className="my-8 p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Al Sharq Level 4 Micro-Soldering Telemetry</span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white">{deviceName}</h4>
          <div className="text-xs text-red-400 font-mono mt-0.5">Isolated Fault: {faultName}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">Microscope:</span>
          <button 
            onClick={() => setZoomLevel(zoomLevel === 45 ? 90 : 45)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 font-bold flex items-center gap-1 transition-colors"
          >
            <ZoomIn className="w-3 h-3" />
            <span>{zoomLevel}x Zoom</span>
          </button>
        </div>
      </div>

      {/* Diagnostic data grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {steps.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-medium">{item.label}</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Technician verification stamp */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Bench Verification: <strong className="text-white">{technician}</strong> (Muwaileh Lab)</span>
        </div>
        <span className="text-slate-500 font-mono text-[11px]">
          100% Data Preserved • 90-Day Warranty
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   6. IN-ARTICLE REPAIR COST & TIME ESTIMATOR WIDGET
   ========================================================================= */
export function InArticleRepairCostEstimator() {
  const [device, setDevice] = useState('iphone-18');
  const [issue, setIssue] = useState('screen');

  const repairPrices: Record<string, Record<string, { costAED: string; time: string; warranty: string }>> = {
    'iphone-18': {
      screen: { costAED: 'AED 380 - 580', time: '30 Mins', warranty: '90 Days' },
      battery: { costAED: 'AED 180 - 240', time: '20 Mins', warranty: '180 Days' },
      water: { costAED: 'AED 250 - 450', time: 'Same Day', warranty: '90 Days' },
      logic: { costAED: 'AED 450 - 750', time: '2 - 4 Hours', warranty: '90 Days' }
    },
    'macbook-m4': {
      screen: { costAED: 'AED 850 - 1,450', time: '1 - 2 Hours', warranty: '90 Days' },
      battery: { costAED: 'AED 350 - 480', time: '45 Mins', warranty: '180 Days' },
      water: { costAED: 'AED 450 - 850', time: 'Same Day', warranty: '90 Days' },
      logic: { costAED: 'AED 650 - 1,200', time: '3 - 6 Hours', warranty: '90 Days' }
    },
    'samsung-s26': {
      screen: { costAED: 'AED 450 - 720', time: '35 Mins', warranty: '90 Days' },
      battery: { costAED: 'AED 160 - 220', time: '25 Mins', warranty: '180 Days' },
      water: { costAED: 'AED 240 - 400', time: 'Same Day', warranty: '90 Days' },
      logic: { costAED: 'AED 380 - 680', time: '2 - 4 Hours', warranty: '90 Days' }
    }
  };

  const selectedData = repairPrices[device]?.[issue] || repairPrices['iphone-18']['screen'];

  return (
    <div className="my-8 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
        <Calculator className="w-4 h-4 text-brand-orange" />
        <span>Instant Repair Cost &amp; Turnaround Estimator</span>
      </div>
      <h4 className="text-lg sm:text-xl font-black text-white mb-4">
        Calculate Bench Price in Muwaileh
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 font-medium">Select Device Model</label>
          <select 
            value={device} 
            onChange={(e) => setDevice(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="iphone-18">Apple iPhone 18 / 18 Pro Max</option>
            <option value="macbook-m4">Apple MacBook Pro / Air (M1-M4)</option>
            <option value="samsung-s26">Samsung Galaxy S26 Ultra / Fold</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5 font-medium">Select Reported Fault</label>
          <select 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="screen">Cracked OLED / Front Glass</option>
            <option value="battery">Battery Health &lt; 80% / Quick Drain</option>
            <option value="water">Liquid Spill / Saltwater Ingress</option>
            <option value="logic">Dead Motherboard / No Power / Bootloop</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center mb-5">
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Estimated Price</div>
          <div className="text-sm sm:text-base font-black text-orange-400 mt-0.5">{selectedData.costAED}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Bench Turnaround</div>
          <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">{selectedData.time}</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Lab Warranty</div>
          <div className="text-sm sm:text-base font-black text-white mt-0.5">{selectedData.warranty}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 text-center sm:text-left">
          Includes free counter microscope diagnosis at BLDG#1017 - SHOP#2 Fire Station Road.
        </span>
        <a
          href={`https://wa.me/971507117043?text=${encodeURIComponent(`Hello Al Sharq Lab! I am checking repair for ${device} with ${issue}. The estimate shows ${selectedData.costAED}. Please book a bench slot.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center gap-1.5 transition-colors shadow-md w-full sm:w-auto justify-center"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Book via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

/* =========================================================================
   7. VERIFIED CUSTOMER SENTIMENT & REVIEWS CARD
   ========================================================================= */
export function VerifiedCustomerSentimentCard() {
  const reviews = [
    {
      author: "Dr. Rashid A.",
      loc: "University of Sharjah",
      stars: 5,
      quote: "Dealership quoted AED 4,600 and said my entire 2TB PhD dissertation dataset was lost. Eng. Tariq isolated the corroded capacitor in 2 hours and saved 100% of my files for AED 650."
    },
    {
      author: "Hassan Al-Nuaimi",
      loc: "Riyadh, Saudi Arabia (Mail-In)",
      stars: 5,
      quote: "Sent my dead MacBook via SMSA Express from Riyadh. They sent me a WhatsApp video under the microscope within 24 hours showing the burnt chip. Shipped back working perfectly in 3 days."
    },
    {
      author: "Maryam K.",
      loc: "Al Zahia, Sharjah",
      stars: 5,
      quote: "Dropped my iPhone in the beach water. Used their sonic water ejector first, then brought it to Shop #2 on Fire Station Rd. Cleaned and saved with zero data loss in 30 minutes."
    }
  ];

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  return (
    <div className="my-8 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {"★★★★★"}
          </div>
          <span className="text-xs font-bold text-slate-300">4.9 / 5.0 (850+ Verified Reviews)</span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 font-semibold">Google Verified</span>
      </div>

      <div className="min-h-[90px]">
        <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-3">
          "{reviews[activeReviewIdx].quote}"
        </p>
        <div className="text-xs font-bold text-white flex items-center justify-between">
          <span>{reviews[activeReviewIdx].author} • <span className="text-slate-400 font-normal">{reviews[activeReviewIdx].loc}</span></span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveReviewIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeReviewIdx === idx ? 'bg-orange-500 w-6' : 'bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`View review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
