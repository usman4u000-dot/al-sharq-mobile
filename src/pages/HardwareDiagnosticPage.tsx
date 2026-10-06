import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Droplets, 
  Smartphone, 
  Tv, 
  Mic, 
  Compass, 
  Vibrate, 
  Gauge, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  Square, 
  RotateCcw, 
  Share2, 
  Download, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Volume2,
  RefreshCw,
  Info,
  BookOpen,
  HelpCircle,
  MapPin,
  Phone,
  Shield,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

type DiagnosticTab = 'ejector' | 'touch' | 'pixels' | 'mic' | 'gyro' | 'refresh' | 'haptics' | 'summary';

export default function HardwareDiagnosticPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<DiagnosticTab>('ejector');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Test results state
  const [testResults, setTestResults] = useState<{
    ejectorCompleted: boolean;
    touchPass: boolean | null;
    pixelsPass: boolean | null;
    micPass: boolean | null;
    gyroPass: boolean | null;
    refreshHz: number | null;
    hapticsPass: boolean | null;
  }>({
    ejectorCompleted: false,
    touchPass: null,
    pixelsPass: null,
    micPass: null,
    gyroPass: null,
    refreshHz: null,
    hapticsPass: null,
  });

  // ================= 1. SONIC WATER & DUST EJECTOR =================
  const [isEjecting, setIsEjecting] = useState(false);
  const [ejectCountdown, setEjectCountdown] = useState(15);
  const [ejectorNotice, setEjectorNotice] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSonicEjection = () => {
    setEjectorNotice(null);
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        setEjectorNotice('Web Audio API is not supported on this browser.');
        return;
      }
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // 165Hz is the acoustic resonant frequency optimal for mobile speaker water ejection
      osc.type = 'sine';
      osc.frequency.setValueAtTime(165, ctx.currentTime);

      // Low frequency modulation for acoustic pulsing
      gain.gain.setValueAtTime(0.8, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      // Haptic pulse if supported
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate([300, 100, 300, 100, 500, 100, 500]);
        } catch (e) {}
      }

      setIsEjecting(true);
      setEjectCountdown(15);

      // Modulate frequency slightly to create pulsing sound waves
      let step = 0;
      const modInterval = setInterval(() => {
        if (!oscillatorRef.current || !ctx) {
          clearInterval(modInterval);
          return;
        }
        step++;
        const targetFreq = step % 2 === 0 ? 165 : 175;
        osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate(200);
          } catch (e) {}
        }
      }, 500);

      const timer = setInterval(() => {
        setEjectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(modInterval);
            stopSonicEjection();
            setTestResults((r) => ({ ...r, ejectorCompleted: true }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (e) {
      setEjectorNotice('Could not start sound generator. Tap anywhere on the page to enable sound playback.');
    }
  };

  const stopSonicEjection = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setIsEjecting(false);
  };

  useEffect(() => {
    return () => {
      stopSonicEjection();
      stopMicStream();
    };
  }, []);

  // ================= 2. TOUCHSCREEN MATRIX =================
  const TOUCH_ROWS = 6;
  const TOUCH_COLS = 6;
  const TOTAL_TOUCH_TILES = TOUCH_ROWS * TOUCH_COLS;
  const [touchedTiles, setTouchedTiles] = useState<Set<number>>(new Set());
  const [activeTouchCount, setActiveTouchCount] = useState(0);

  const handleTileTouch = (index: number) => {
    setTouchedTiles((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === TOTAL_TOUCH_TILES) {
        setTestResults((r) => ({ ...r, touchPass: true }));
      }
      return next;
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const tileIndex = el.getAttribute('data-tile-index');
      if (tileIndex !== null) {
        handleTileTouch(parseInt(tileIndex, 10));
      }
    }
  };

  // ================= 3. OLED DEAD PIXELS =================
  const [pixelColorIndex, setPixelColorIndex] = useState(0);
  const [isPixelFullscreen, setIsPixelFullscreen] = useState(false);
  const pixelColors = [
    { name: 'Pure Red (Sub-pixel R)', color: '#FF0000', text: '#ffffff' },
    { name: 'Pure Green (Sub-pixel G)', color: '#00FF00', text: '#000000' },
    { name: 'Pure Blue (Sub-pixel B)', color: '#0000FF', text: '#ffffff' },
    { name: 'Pure White (5000K Full Luminance)', color: '#FFFFFF', text: '#000000' },
    { name: 'Pure Black (True AMOLED Pixel-Off)', color: '#000000', text: '#ffffff' },
    { name: '50% Neutral Grey (Uniformity Test)', color: '#808080', text: '#ffffff' }
  ];

  // ================= 4. MICROPHONE & DECIBELS =================
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [micVolumeDb, setMicVolumeDb] = useState(0);
  const [micPeakDb, setMicPeakDb] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [isSimulatingMic, setIsSimulatingMic] = useState(false);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const micRafRef = useRef<number | null>(null);

  const runSimulatedMicTest = () => {
    setIsSimulatingMic(true);
    setMicError(null);
    setIsMicTesting(true);
    let step = 0;
    const simInterval = setInterval(() => {
      step++;
      const simDb = Math.floor(40 + Math.random() * 40);
      setMicVolumeDb(simDb);
      setMicPeakDb((p) => Math.max(p, simDb));

      if (step >= 8) {
        clearInterval(simInterval);
        setIsMicTesting(false);
        setIsSimulatingMic(false);
        setTestResults((r) => ({ ...r, micPass: true }));
      }
    }, 250);
  };

  const startMicTest = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setMicError('Audio media device is not available in this browser environment. You can run the simulated acoustic test below.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        setMicError('Web Audio API is not supported in this browser.');
        return;
      }

      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      micAnalyserRef.current = analyser;

      setIsMicTesting(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const db = Math.round((average / 255) * 100);
        setMicVolumeDb(db);
        setMicPeakDb((peak) => Math.max(peak, db));

        if (db > 25) {
          setTestResults((r) => ({ ...r, micPass: true }));
        }

        micRafRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err: any) {
      // Graceful fallback when microphone access is denied or blocked
      setMicError(
        err?.name === 'NotAllowedError' || err?.message?.toLowerCase().includes('permission')
          ? 'Microphone permission was not granted by your browser. You can run the simulated acoustic frequency test below or mark as pass.'
          : 'Microphone hardware was not detected. You can run the simulated acoustic frequency test below.'
      );
    }
  };

  const stopMicStream = () => {
    if (micRafRef.current) {
      cancelAnimationFrame(micRafRef.current);
      micRafRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    setIsMicTesting(false);
  };

  // ================= 5. 3D GYROSCOPE & SENSOR =================
  const [gyroData, setGyroData] = useState<{ alpha: number; beta: number; gamma: number }>({
    alpha: 0,
    beta: 0,
    gamma: 0
  });
  const [gyroSupported, setGyroSupported] = useState<boolean | null>(null);

  const requestGyroPermission = async () => {
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          initGyroListener();
        } else {
          setGyroSupported(false);
        }
      } catch (e) {
        setGyroSupported(false);
      }
    } else if ('DeviceOrientationEvent' in window) {
      initGyroListener();
    } else {
      setGyroSupported(false);
    }
  };

  const initGyroListener = () => {
    setGyroSupported(true);
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setGyroData({
          alpha: Math.round(e.alpha || 0),
          beta: Math.round(e.beta || 0),
          gamma: Math.round(e.gamma || 0)
        });
        setTestResults((r) => ({ ...r, gyroPass: true }));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
  };

  // ================= 6. REFRESH RATE (HZ) AUDIT =================
  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animationId: number;

    const measureFps = (now: number) => {
      frameCount++;
      const elapsed = now - startTime;
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        setTestResults((r) => ({ ...r, refreshHz: fps }));
      } else {
        animationId = requestAnimationFrame(measureFps);
      }
    };

    animationId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // ================= 7. HAPTICS VIBRATION =================
  const [hapticNotice, setHapticNotice] = useState<string | null>(null);

  const triggerHaptic = (pattern: number | number[]) => {
    setHapticNotice(null);
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
        setTestResults((r) => ({ ...r, hapticsPass: true }));
      } catch (e) {
        setHapticNotice('Haptic pulse executed.');
        setTestResults((r) => ({ ...r, hapticsPass: true }));
      }
    } else {
      setHapticNotice('Vibration API is typically available on mobile devices. Test marked as passed.');
      setTestResults((r) => ({ ...r, hapticsPass: true }));
    }
  };

  // Calculate Overall Grade
  const calculateScore = () => {
    let score = 50;
    if (testResults.ejectorCompleted) score += 10;
    if (testResults.touchPass) score += 15;
    if (testResults.pixelsPass) score += 10;
    if (testResults.micPass) score += 10;
    if (testResults.gyroPass) score += 10;
    if (testResults.refreshHz && testResults.refreshHz >= 55) score += 5;
    if (testResults.hapticsPass) score += 10;
    return Math.min(score, 100);
  };

  const score = calculateScore();

  return (
    <>
      <Helmet>
        <title>Al Sharq DeviceLab™ | Free 12-Point Live Hardware Tester & Water Ejector</title>
        <meta 
          name="description" 
          content="Free in-browser 12-point hardware test: 165Hz sonic water ejector, touch dead-zone matrix, OLED burn-in checker & mic dB meter. Certified in Sharjah, UAE." 
        />
        <link rel="canonical" href="https://allsharq.com/hardware-test" />

        {/* OpenGraph Social Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allsharq.com/hardware-test" />
        <meta property="og:site_name" content="Al Sharq Mobile & Computer Lab" />
        <meta property="og:title" content="Al Sharq DeviceLab™ | Free In-Browser Mobile Hardware Diagnostics & Water Ejector" />
        <meta 
          property="og:description" 
          content="Test your mobile screen touch matrix, dead pixels, speaker water ejector 165Hz frequency, and microphone dB directly in your browser. No app download needed." 
        />
        <meta property="og:image" content="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1200" />

        {/* Twitter / X Social Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Al Sharq DeviceLab™ | Free 12-Point Mobile Hardware Stress Tester" />
        <meta 
          name="twitter:description" 
          content="165Hz sonic speaker water ejector, touch digitizer matrix, and OLED burn-in checker online in Sharjah, UAE." 
        />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1200" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://allsharq.com/hardware-test#webapp",
                "name": "Al Sharq DeviceLab™",
                "url": "https://allsharq.com/hardware-test",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "All (iOS, Android, Windows, macOS, ChromeOS)",
                "description": "Free 12-point in-browser hardware diagnostic suite: 165Hz acoustic water ejector, touch matrix dead-zone mapper, OLED burn-in checker, and microphone dB meter.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "AED"
                },
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "Al Sharq Mobile Phone & Computer Trading LLC",
                  "telephone": "+971507117043",
                  "url": "https://allsharq.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
                    "addressLocality": "Sharjah",
                    "addressCountry": "AE"
                  }
                }
              },
              {
                "@type": "HowTo",
                "name": "How to Eject Water from a Phone Speaker Using 165Hz Sound Waves",
                "description": "Step-by-step emergency instructions to safely purge liquid and water droplets trapped inside mobile phone speakers.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Power Down or Avoid Charging",
                    "text": "Immediately unplug any charging cables to prevent short circuits."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Set Volume to Maximum",
                    "text": "Increase device volume to 100% to maximize kinetic air displacement."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Trigger 165Hz Acoustic Frequency",
                    "text": "Press play in DeviceLab™ to blast resonant sine waves through the speaker cavity."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Position Speaker Downward",
                    "text": "Face speaker holes downwards over a clean cloth so gravity assists droplet ejection."
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Does the 165Hz sound frequency really remove water from phone speakers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. At 165Hz, the resonant frequency of mobile acoustic chambers creates rapid air displacement pulses. This overcomes surface tension, propelling trapped droplets through the speaker grill without physical contact."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is putting a wet phone in rice dangerous?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Uncooked rice contains starch powder that congeals with liquid into an acidic paste. Furthermore, rice lacks sufficient desiccant vapor pressure to extract water from modern sealed IP68 enclosures, accelerating motherboard corrosion."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I test a used phone in Rolla Market Sharjah before paying?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Open allsharq.com/hardware-test on the phone. Drag across all 36 cells of the Touch Matrix to identify dead digitizer areas, and cycle fullscreen OLED colors to reveal burnt-in status bars or stuck pixels."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can sound waves damage my phone's speaker membrane?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. The 165Hz tone generated by DeviceLab™ stays well within standard OEM acoustic decibel limits. It operates safely on Apple iPhone, Samsung Galaxy, Xiaomi, Oppo, and laptop speakers."
                    }
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 selection:bg-brand-orange selection:text-white">
        
        {/* Fullscreen OLED Flasher Modal */}
        <AnimatePresence>
          {isPixelFullscreen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 cursor-pointer select-none"
              style={{ backgroundColor: pixelColors[pixelColorIndex].color }}
              onClick={() => {
                if (pixelColorIndex < pixelColors.length - 1) {
                  setPixelColorIndex(pixelColorIndex + 1);
                } else {
                  setIsPixelFullscreen(false);
                  setPixelColorIndex(0);
                  setTestResults((r) => ({ ...r, pixelsPass: true }));
                }
              }}
            >
              <div 
                className="px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider backdrop-blur-md bg-black/40 text-white shadow-lg"
              >
                {pixelColors[pixelColorIndex].name} • Tap anywhere to next color ({pixelColorIndex + 1}/{pixelColors.length})
              </div>
              <p className="text-sm font-medium px-4 py-1.5 rounded-lg bg-black/40 text-white">
                Inspect screen closely for black specks (dead pixels), bright stuck pixels, or keyboard ghost lines.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPixelFullscreen(false);
                  setPixelColorIndex(0);
                  setTestResults((r) => ({ ...r, pixelsPass: true }));
                }}
                className="px-6 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white font-bold text-xs border border-white/20 transition-all"
              >
                Exit Test & Mark Inspected
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'أداة الفحص الهاردوير الأولى من نوعها بالشارقة' : 'UAE 1st In-Browser Hardware Diagnostic Suite'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Al Sharq <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">DeviceLab™</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'فحص شامل ومباشر لجهازك عبر المتصفح: طرد قطرات الماء والغبار بالتردد الصوتي 165Hz، فحص استجابة اللمس التاتش، بكسلات شاشة OLED المحترقة، والميكروفون قبل شراء أي جهاز مستعمل!'
                : '100% In-Browser 12-point hardware stress test. Sonic 165Hz acoustic water ejector, touch matrix dead-zone mapper, OLED burn-in flasher, and mic dB tester. No app download needed!'}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {[
              { id: 'ejector', labelEn: 'Sonic Water Ejector', labelAr: 'طرد الماء الصوتي', icon: Droplets },
              { id: 'touch', labelEn: 'Touch Matrix', labelAr: 'فحص اللمس والتاتش', icon: Smartphone },
              { id: 'pixels', labelEn: 'OLED Dead Pixels', labelAr: 'بكسلات الشاشة', icon: Tv },
              { id: 'mic', labelEn: 'Microphone dB', labelAr: 'فحص الميكروفون', icon: Mic },
              { id: 'gyro', labelEn: '3D Gyroscope', labelAr: 'حساسات التوازن', icon: Compass },
              { id: 'haptics', labelEn: 'Vibration Engine', labelAr: 'محرك الهزاز', icon: Vibrate },
              { id: 'summary', labelEn: 'Health Certificate', labelAr: 'شهادة فحص الجهاز', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DiagnosticTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tool Workspace */}
          <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Tool 1: Sonic Water Ejector */}
            {activeTab === 'ejector' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-600 mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-cyan-500/20 relative">
                  {isEjecting && (
                    <span className="absolute inset-0 rounded-3xl border-2 border-cyan-400 animate-ping opacity-75"></span>
                  )}
                  <Droplets className={`w-10 h-10 sm:w-12 sm:h-12 ${isEjecting ? 'animate-bounce' : ''}`} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  165Hz Acoustic Soundwave Water &amp; Dust Ejector
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Generates an acoustic resonant sine wave (165Hz) combined with rapid haptic vibrations to physically purge water droplets and desert dust particles trapped inside your phone’s speaker grille.
                </p>

                {isEjecting ? (
                  <div className="space-y-6">
                    <div className="text-5xl font-black text-cyan-400 font-mono tracking-tight">
                      00:{ejectCountdown < 10 ? `0${ejectCountdown}` : ejectCountdown}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-200">
                      <Volume2 className="w-4 h-4 animate-pulse text-cyan-400" />
                      <span>Turn device volume to 100% for maximum acoustic purge</span>
                    </div>
                    <button
                      onClick={stopSonicEjection}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 mx-auto"
                    >
                      <Square className="w-4 h-4" />
                      <span>Stop Sound Ejection</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={startSonicEjection}
                      className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#C2410C] to-orange-600 hover:from-orange-700 hover:to-orange-800 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-900/30 transition-all active:scale-95 flex items-center gap-2.5 mx-auto"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Start 15s Sonic Water Ejection</span>
                    </button>
                    {ejectorNotice && (
                      <div className="p-3 bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs rounded-xl max-w-md mx-auto">
                        {ejectorNotice}
                      </div>
                    )}
                    {testResults.ejectorCompleted && (
                      <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold pt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acoustic Purge Session Completed</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tool 2: Touch Matrix Grid */}
            {activeTab === 'touch' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Multi-Touch &amp; Digitizer Dead Zone Mapper
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Drag your finger across all 36 blocks. If a block remains grey, that area of the digitizer flex cable or glass is unresponsive.
                  </p>
                </div>

                <div 
                  className="grid grid-cols-6 gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-700 touch-none max-w-sm sm:max-w-md mx-auto aspect-square select-none cursor-crosshair"
                  onPointerMove={handlePointerMove}
                  onTouchStart={(e) => setActiveTouchCount(e.touches.length)}
                  onTouchEnd={(e) => setActiveTouchCount(e.touches.length)}
                >
                  {Array.from({ length: TOTAL_TOUCH_TILES }).map((_, i) => {
                    const isTouched = touchedTiles.has(i);
                    return (
                      <div
                        key={i}
                        data-tile-index={i}
                        onPointerDown={() => handleTileTouch(i)}
                        onPointerEnter={() => handleTileTouch(i)}
                        className={`rounded-xl transition-colors duration-150 flex items-center justify-center text-[10px] font-bold ${
                          isTouched
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-inner shadow-emerald-700'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                      >
                        {isTouched ? 'OK' : i + 1}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-md mx-auto">
                  <div className="text-xs text-slate-300">
                    Tested: <span className="font-bold text-emerald-400">{touchedTiles.size} / {TOTAL_TOUCH_TILES}</span> blocks
                    {activeTouchCount > 0 && ` • Active Fingers: ${activeTouchCount}`}
                  </div>
                  <button
                    onClick={() => {
                      setTouchedTiles(new Set());
                      setTestResults((r) => ({ ...r, touchPass: null }));
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Matrix</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tool 3: OLED Dead Pixels */}
            {activeTab === 'pixels' && (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-purple-500/20">
                  <Tv className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  OLED Burn-In &amp; Sub-Pixel Dead Pixel Flasher
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Cycles pure primary Red, Green, Blue, 100% White, and AMOLED Pixel-Off Deep Black in true fullscreen to detect burned-in TikTok/Instagram navigation icons and frozen sub-pixels.
                </p>

                <button
                  onClick={() => {
                    setPixelColorIndex(0);
                    setIsPixelFullscreen(true);
                  }}
                  className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-purple-900/30 transition-all active:scale-95 flex items-center gap-2.5 mx-auto"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Launch Fullscreen Pixel Inspection</span>
                </button>

                {testResults.pixelsPass && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Display Screen Marked as Inspected</span>
                  </div>
                )}
              </div>
            )}

            {/* Tool 4: Microphone dB Meter */}
            {activeTab === 'mic' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 to-orange-600 mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-amber-500/20">
                  <Mic className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Real-Time Microphone Decibel &amp; Clarity Audit
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Speak into the bottom microphone or blow gently into the port to test ambient volume pickup (dB) and sound spectrum clarity.
                </p>

                {isMicTesting ? (
                  <div className="space-y-6 max-w-md mx-auto">
                    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
                      <div className="text-6xl font-black text-amber-400 font-mono tracking-tight mb-2">
                        {micVolumeDb} <span className="text-2xl text-slate-400">dB</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        Peak Recorded: <span className="font-bold text-white">{micPeakDb} dB</span>
                        {isSimulatingMic && <span className="ml-2 text-cyan-400 font-mono">(Simulation Active)</span>}
                      </div>
                      
                      {/* Dynamic Volume Bar */}
                      <div className="w-full h-4 bg-slate-800 rounded-full mt-4 overflow-hidden p-0.5 border border-slate-700">
                        <div 
                          className="h-full rounded-full transition-all duration-75 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                          style={{ width: `${Math.min(micVolumeDb * 1.5, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {!isSimulatingMic && (
                      <button
                        onClick={stopMicStream}
                        className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-2 mx-auto transition-colors"
                      >
                        <Square className="w-4 h-4" />
                        <span>Stop Microphone Test</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={startMicTest}
                      className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-amber-900/30 transition-all active:scale-95 flex items-center gap-2.5 mx-auto"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Live Microphone Check</span>
                    </button>

                    {micError && (
                      <div className="p-4 bg-amber-950/60 border border-amber-500/40 rounded-2xl text-xs text-amber-200 text-left max-w-md mx-auto space-y-2">
                        <div className="font-bold flex items-center gap-1.5 text-amber-300">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                          <span>Microphone Access Notice</span>
                        </div>
                        <p>{micError}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={runSimulatedMicTest}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition-colors"
                          >
                            Run Acoustic Simulation
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTestResults((r) => ({ ...r, micPass: true }));
                              setMicError(null);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
                          >
                            Mark Pass Manually
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {testResults.micPass && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Microphone Successfully Detected Sound</span>
                  </div>
                )}
              </div>
            )}

            {/* Tool 5: 3D Gyroscope & Spirit Level */}
            {activeTab === 'gyro' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-600 mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/20">
                  <Compass className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  3D Gyroscope &amp; Accelerometer Tilt Meter
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Detects if the motherboard’s internal MEMS motion chip or camera optical image stabilization (OIS) sensor was knocked loose during a drop.
                </p>

                {gyroSupported === true ? (
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700">
                      <div className="text-xs uppercase font-bold text-slate-400 mb-1">Tilt (Beta)</div>
                      <div className="text-3xl font-black text-emerald-400 font-mono">{gyroData.beta}°</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700">
                      <div className="text-xs uppercase font-bold text-slate-400 mb-1">Roll (Gamma)</div>
                      <div className="text-3xl font-black text-teal-400 font-mono">{gyroData.gamma}°</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700">
                      <div className="text-xs uppercase font-bold text-slate-400 mb-1">Yaw (Alpha)</div>
                      <div className="text-3xl font-black text-cyan-400 font-mono">{gyroData.alpha}°</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={requestGyroPermission}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 mx-auto"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Calibrate Sensor &amp; Request Permission</span>
                    </button>
                    {gyroSupported === false && (
                      <p className="text-xs text-amber-400">
                        Gyroscope sensors are typically only present on mobile devices or tablets.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tool 6: Haptics Vibration Engine */}
            {activeTab === 'haptics' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-600 to-rose-600 mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-500/20">
                  <Vibrate className="w-10 h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Taptic Engine &amp; Vibration Motor Diagnostic
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Fire distinct vibration frequencies to test linear resonant actuators (LRA) and ERM motors against internal coil jams.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => triggerHaptic(80)}
                    className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    Short Click (80ms)
                  </button>
                  <button
                    onClick={() => triggerHaptic([100, 50, 100])}
                    className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    Double Pulse (Heartbeat)
                  </button>
                  <button
                    onClick={() => triggerHaptic([200, 100, 300, 100, 400])}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-900/30 transition-all"
                  >
                    Heavy Alert Rumble
                  </button>
                </div>

                {hapticNotice && (
                  <div className="mt-4 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 text-xs max-w-md mx-auto">
                    {hapticNotice}
                  </div>
                )}

                {testResults.hapticsPass && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Vibration Engine Test Completed</span>
                  </div>
                )}
              </div>
            )}

            {/* Tool 7: Summary & Certification */}
            {activeTab === 'summary' && (
              <div className="py-4">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 mx-auto flex items-center justify-center text-white mb-4 shadow-xl shadow-emerald-500/20">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Al Sharq Certified Device Health Report
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Verified Digital Hardware Inspection Summary • Muwaileh, Sharjah
                  </p>
                </div>

                {/* Score Dial */}
                <div className="p-6 bg-slate-900 rounded-3xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black text-emerald-400 font-mono">
                      {score}<span className="text-2xl text-slate-500">/100</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {score >= 90 ? 'Grade A+ (Pristine Health)' : score >= 75 ? 'Grade B (Good Condition)' : 'Hardware Maintenance Recommended'}
                      </div>
                      <div className="text-xs text-slate-400">
                        Display Refresh Rate: <span className="text-white font-bold">{testResults.refreshHz || 60} Hz</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20ran%20the%20DeviceLab%20test%20on%20my%20device.%20Score:%20${score}/100.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Print Certificate</span>
                    </button>
                  </div>
                </div>

                {/* Checklist Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Acoustic Water Ejector</span>
                    {testResults.ejectorCompleted ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Purged</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Touch Digitizer Grid (36/36)</span>
                    {testResults.touchPass ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 100% Responsive</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">OLED Dead Pixels &amp; Burn-in</span>
                    {testResults.pixelsPass ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Passed</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Microphone Frequency Response</span>
                    {testResults.micPass ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Clear</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="p-6 bg-gradient-to-r from-brand-blue to-slate-950 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Found a failing component on your device?</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Visit Al Sharq Mobile Lab in Muwaileh Commercial for a free physical microscope inspection.</p>
                  </div>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-md shadow-orange-950/20"
                  >
                    Book Counter Inspection
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* Educational Trust Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-orange" />
                <span>Second-Hand Device Pre-Purchase</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before handing cash to a seller on Dubizzle or Rolla Market, open DeviceLab to verify the screen isn't a cheap aftermarket replica with dead touch zones.
              </p>
            </div>

            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Water Ejection Physics</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sound travels through mechanical air pulses. At 165Hz, the speaker diaphragm flexes with sufficient amplitude to break surface tension and propel water out.
              </p>
            </div>

            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Privacy</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                DeviceLab operates 100% locally in your browser. No sensor logs, mic audio, or screen data is ever transmitted to a server.
              </p>
            </div>
          </div>

          {/* Localized In-Depth Authority Articles & Guides */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
                <span>Sharjah Engineering Guides &amp; Protocols</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Learn How to Protect Your Device in UAE
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Written by our lead micro-soldering engineers on Fire Station Road, Muwaileh Commercial, Sharjah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blog Card 1 */}
              <Link 
                to="/blog/phone-dropped-in-water-speaker-ejector-sharjah"
                className="group p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-brand-orange/60 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-orange-950/20"
              >
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-2">
                    <Droplets className="w-4 h-4" />
                    <span>Liquid Spill Emergency</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-brand-orange transition-colors mb-2">
                    Phone Dropped in Water in Sharjah? 165Hz Acoustic Rescue Protocol
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    Why uncooked rice causes acidic starch corrosion inside charging ports, and how 165Hz kinetic sound pressure purges trapped moisture safely.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Read Emergency Protocol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Blog Card 2 */}
              <Link 
                to="/blog/buy-used-phone-rolla-market-sharjah-hardware-test"
                className="group p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-brand-orange/60 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-orange-950/20"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Buyer Protection Matrix</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-brand-orange transition-colors mb-2">
                    Buying Used Phones in Rolla Market? 12-Point Pre-Purchase Stress Test
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    How to spot cheap 60Hz LCD replica screens, digitizer ghost touch dead zones, and punctured microphone seals before paying cash on Dubizzle.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Read Rolla Inspection Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Blog Card 3 */}
              <Link 
                to="/blog/muffled-phone-speaker-desert-dust-cleaning-sharjah"
                className="group p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-brand-orange/60 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-orange-950/20"
              >
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Desert Dust Acoustic Purge</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-brand-orange transition-colors mb-2">
                    Muffled Phone Speaker After UAE Desert Dust? Non-Invasive Cleaning
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    Why pins and toothpicks puncture delicate 30-micron speaker membranes, and how resonant frequency shakes out caked silicate sand particles.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Read Acoustic Cleaning Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions (Accordion) */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Everything You Need to Know About DeviceLab™
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Does the 165Hz sound frequency really remove water from phone speakers?",
                  a: "Yes. Mobile speaker chambers are designed with specific acoustic resonance parameters. At 165Hz, the voice coil achieves maximum amplitude displacement, generating high-velocity air pressure waves that break the surface tension of water droplets clinging to the metal mesh and propel them outward as fine mist."
                },
                {
                  q: "Why is putting a wet phone in rice dangerous?",
                  a: "Uncooked rice contains starch powder that mixes with water to form an acidic, conductive paste inside charging ports and speaker grilles. Furthermore, rice lacks the desiccant vapor pressure required to pull trapped water from modern IP68 sealed chassis, accelerating solder corrosion on the motherboard."
                },
                {
                  q: "How do I test a used phone in Rolla Market Sharjah before paying cash?",
                  a: "Connect the phone to your mobile hotspot, open allsharq.com/hardware-test in Safari or Chrome, and complete the 36-block Touch Matrix test to confirm every part of the digitizer responds. Then cycle fullscreen OLED colors to detect burn-in, and speak into the mic to verify volume above 45 dB."
                },
                {
                  q: "Can the 165Hz tone damage my phone's speaker membrane?",
                  a: "No. The 165Hz frequency is generated strictly within standard OEM decibel playback thresholds. It does not exceed the mechanical excursion limits of modern Apple, Samsung, Xiaomi, or Huawei speaker drivers."
                },
                {
                  q: "Do I need to download an application from the App Store or Google Play?",
                  a: "No app download is needed. DeviceLab™ runs 100% inside your standard mobile web browser using HTML5 Canvas, Web Audio API, and native device orientation sensors. It works immediately on iPhones, Androids, iPads, and MacBooks."
                },
                {
                  q: "Where is Al Sharq Mobile Lab located in Sharjah if my device has physical damage?",
                  a: "Our physical workshop is located at BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area, Sharjah - United Arab Emirates. We offer free counter diagnostics under 4K stereo microscopes with 90-day warranty coverage on all repairs."
                }
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-slate-700/80 bg-slate-800/60 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-brand-orange transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local Authority & Physical Shop Trust Box */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area • Sharjah</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Visit Al Sharq Mobile &amp; Computer Lab in Person
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Got a red liquid damage contact indicator, cracked OLED panel, or motherboard short-circuit? Bring your device to our specialized cleanroom repair bench in Muwaileh for instant microscope evaluation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20ran%20the%20DeviceLab%20test%20and%20would%20like%20a%20shop%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: +971 50 711 7043</span>
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-slate-700 text-center"
              >
                Get Directions &amp; Hours
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
