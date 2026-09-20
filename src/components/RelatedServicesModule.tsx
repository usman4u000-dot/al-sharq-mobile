import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Battery, 
  Plug, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  Layers, 
  Camera, 
  Droplet, 
  Laptop, 
  Watch, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export interface RelatedServiceItem {
  id: string;
  name: string;
  path: string;
  badge?: string;
  description: string;
  iconName?: string;
  actionText?: string;
  estimatedTime?: string;
  warranty?: string;
}

export interface DeviceDetectionResult {
  matchedKeywords: string[];
  primaryDeviceCategory: 'iphone' | 'samsung' | 'macbook' | 'laptop' | 'android' | 'gaming' | 'watch' | 'general';
  specificModel?: string;
  services: RelatedServiceItem[];
}

/**
 * Intelligent device & repair detection rule engine.
 * Scans article title, content, excerpt, category or passed query string
 * to dynamically extract the device family, exact model, and repair types.
 */
export function detectRelatedServices(textCorpus: string, category?: string): DeviceDetectionResult {
  const normalized = (textCorpus + ' ' + (category || '')).toLowerCase();

  // Keyword flags
  const hasIphone18 = /iphone\s*18|18\s*pro|18\s*pro\s*max/.test(normalized);
  const hasIphone16 = /iphone\s*16|16\s*pro|16\s*plus|16\s*pro\s*max/.test(normalized);
  const hasIphone15 = /iphone\s*15|15\s*pro|15\s*plus|15\s*pro\s*max/.test(normalized);
  const hasIphone14 = /iphone\s*14|14\s*pro|14\s*pro\s*max/.test(normalized);
  const hasIphoneGen = /iphone|ios|apple\s*phone|ceramic\s*shield/.test(normalized);

  const hasSamsungFold = /z\s*fold|z\s*flip|foldable|fold\s*6|flip\s*6|fold\s*5|utg|crease/.test(normalized);
  const hasSamsungS24S25 = /s24|s25|galaxy\s*s24|galaxy\s*s25|s24\s*ultra|s25\s*ultra/.test(normalized);
  const hasSamsungUltra = /ultra|s23\s*ultra|s22\s*ultra|s-pen|spen/.test(normalized);
  const hasSamsungGen = /samsung|galaxy|amoled|exynos|one\s*ui/.test(normalized);

  const hasMacBook = /macbook|mac\s*book|m1|m2|m3|m4|macos|apple\s*silicon/.test(normalized);
  const hasLaptop = /laptop|thinkpad|dell|hp|lenovo|asus|acer|gaming\s*pc|computer/.test(normalized);
  const hasWatch = /apple\s*watch|smartwatch|iwatch/.test(normalized);

  // Issue flags
  const mentionsScreen = /screen|display|oled|amoled|glass|crack|broken\s*display|green\s*line|digitizer|touch/.test(normalized);
  const mentionsBattery = /battery|drain|drainage|health|mah|swelling|charge\s*holding/.test(normalized);
  const mentionsPort = /charging\s*port|usb-c|usbc|type-c|lightning|loose\s*cable|won't\s*charge/.test(normalized);
  const mentionsBoard = /logic\s*board|motherboard|micro-soldering|soldering|short\s*circuit|pmic|ic\s*chip|dead\s*phone/.test(normalized);
  const mentionsWater = /water|liquid|dropped\s*in\s*water|corrosion|spill/.test(normalized);
  const mentionsData = /data\s*recovery|recover\s*photos|nand|files|storage/.test(normalized);

  const matchedKeywords: string[] = [];
  const services: RelatedServiceItem[] = [];

  // Categorization & Custom Service Mapping
  if (hasIphone18) {
    matchedKeywords.push('iPhone 18', 'iPhone 18 Pro Max', 'Ceramic Shield 2.0');
    services.push(
      {
        id: 'iphone-repair',
        name: 'iPhone 18 / 18 Pro Max Repair Center',
        path: '/iphone-repair',
        badge: 'New Flagship',
        description: 'Authorized-grade diagnostics, A20 Pro logic board inspection, and OEM-spec part installations.',
        estimatedTime: '30-45 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'Ceramic Shield & OLED Display Swap',
        path: '/screen-repair',
        badge: 'Same-Day Fix',
        description: 'Super Retina XDR OLED assembly calibration with full TrueTone & 120Hz ProMotion retention.',
        estimatedTime: '20-30 mins',
        warranty: 'Lifetime touch warranty'
      },
      {
        id: 'screen-protector',
        name: 'iPhone 18 9H Tempered & Privacy Armor',
        path: '/screen-protector',
        badge: 'Precision Fit',
        description: 'Custom oleophobic edge-to-edge curved screen protection applied in our dust-free booth.',
        estimatedTime: '5 mins',
        warranty: 'Bubble-free guarantee'
      },
      {
        id: 'battery-replacement',
        name: 'Graphene Thermal Battery Renewal',
        path: '/battery-replacement',
        badge: 'High Endurance',
        description: 'Original capacity cell replacement designed to withstand scorching UAE summer temperatures.',
        estimatedTime: '15-20 mins',
        warranty: '6-month warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'iphone',
      specificModel: 'iPhone 18 & 18 Pro Max',
      services
    };
  }

  if (hasIphone16) {
    matchedKeywords.push('iPhone 16', 'iPhone 16 Pro Max', 'Capture Button');
    services.push(
      {
        id: 'iphone-repair',
        name: 'iPhone 16 & 16 Pro Max Repair Sharjah',
        path: '/iphone-repair',
        badge: 'Specialized',
        description: 'Same-day servicing for bezel hairline fractures, Camera Control sensor, and MagSafe charging.',
        estimatedTime: '30 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'Ultra-Slim Bezel OLED Screen Replacement',
        path: '/screen-repair',
        badge: 'TrueTone Calibrated',
        description: 'Micro-bezel display renewal restoring full HDR brightness and capacitive sensitivity.',
        estimatedTime: '25 mins',
        warranty: 'Screen warranty included'
      },
      {
        id: 'battery-replacement',
        name: 'iPhone 16 Fast Battery Replacement',
        path: '/battery-replacement',
        badge: '0 Cycle Cells',
        description: 'Eliminates sudden battery drain and thermal throttling with 100% genuine health state.',
        estimatedTime: '15 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'charging-port-repair',
        name: 'iPhone USB-C High-Speed Port Repair',
        path: '/charging-port-repair',
        badge: 'Micro-Cleansed',
        description: 'Clearing compacted pocket lint or micro-soldering bent internal pins for 25W+ fast charging.',
        estimatedTime: '20 mins',
        warranty: '90-day warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'iphone',
      specificModel: 'iPhone 16 Series',
      services
    };
  }

  if (hasIphone15) {
    matchedKeywords.push('iPhone 15', 'iPhone 15 Pro Max', 'Titanium Frame', 'USB-C');
    services.push(
      {
        id: 'iphone-repair',
        name: 'iPhone 15 & 15 Pro Max Repair Services',
        path: '/iphone-repair',
        badge: 'Titanium Care',
        description: 'Comprehensive solutions for titanium chassis bends, back glass shattering, and board shorts.',
        estimatedTime: '30 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'charging-port-repair',
        name: 'iPhone 15 USB-C Port Diagnostics & Swap',
        path: '/charging-port-repair',
        badge: 'Common Issue',
        description: 'Fixing burnt or slow-charging Type-C connectors with original Apple-grade dock flex assemblies.',
        estimatedTime: '20 mins',
        warranty: '120-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'Super Retina XDR OLED Display Fix',
        path: '/screen-repair',
        badge: 'Precision Lab',
        description: 'Grade-A display swaps keeping Dynamic Island interactivity and 2000-nit peak outdoor brightness.',
        estimatedTime: '25 mins',
        warranty: 'Certified parts'
      },
      {
        id: 'trade-in',
        name: 'iPhone 15 Upgrade & Trade-In Valuation',
        path: '/trade-in',
        badge: 'Instant Cash',
        description: 'Get instant high valuation in Muwaileh toward upgrading to newer iPhone or Samsung flagships.',
        estimatedTime: '10 mins',
        warranty: 'Best market rate'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'iphone',
      specificModel: 'iPhone 15 Series',
      services
    };
  }

  if (hasSamsungFold) {
    matchedKeywords.push('Samsung Z Fold', 'Z Flip', 'UTG Crease', 'Hinge Repair');
    services.push(
      {
        id: 'samsung-repair',
        name: 'Samsung Galaxy Foldable Repair Hub',
        path: '/samsung-repair',
        badge: 'Foldable Certified',
        description: 'Specialized tooling for Z Fold 6, Z Flip 6, and earlier dual-axis hinge gear recalibration.',
        estimatedTime: '45-60 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'UTG Foldable Screen & Crease Repair',
        path: '/screen-repair',
        badge: 'Zero Bubbles',
        description: 'Replacing de-laminated factory protective films and micro-fine flexible AMOLED inner displays.',
        estimatedTime: '40 mins',
        warranty: 'Crease warranty'
      },
      {
        id: 'logic-board-repair',
        name: 'Dual-Rail Hinge Sand & Flex Cable Fix',
        path: '/logic-board-repair',
        badge: 'Micro-Soldering',
        description: 'Ultrasonic cleansing of UAE desert sand particles and flex ribbon cable micro-bridging.',
        estimatedTime: '60 mins',
        warranty: 'Smooth glide check'
      },
      {
        id: 'battery-replacement',
        name: 'Dual-Cell Galaxy Battery Replacement',
        path: '/battery-replacement',
        badge: 'Balanced Load',
        description: 'Matched twin-cell replacement for all Galaxy Z Fold and Z Flip series phones.',
        estimatedTime: '30 mins',
        warranty: '6-month warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'samsung',
      specificModel: 'Samsung Galaxy Z Fold / Z Flip',
      services
    };
  }

  if (hasSamsungS24S25 || hasSamsungUltra || hasSamsungGen) {
    matchedKeywords.push('Samsung Galaxy', 'Dynamic AMOLED 2X', 'S-Pen', 'Ultra');
    services.push(
      {
        id: 'samsung-repair',
        name: 'Samsung Galaxy S-Series Repair Sharjah',
        path: '/samsung-repair',
        badge: 'Galaxy Certified',
        description: 'Specialized repair for S25 Ultra, S24 Ultra, S23, and Galaxy A series devices.',
        estimatedTime: '30 mins',
        warranty: '180-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'Dynamic AMOLED 2X & Green Line Repair',
        path: '/screen-repair',
        badge: 'Anti-Reflective',
        description: 'Eliminating software update green lines and renewing Corning Gorilla Armor anti-glare glass.',
        estimatedTime: '25-35 mins',
        warranty: '100% genuine AMOLED'
      },
      {
        id: 'charging-port-repair',
        name: 'Galaxy 45W Super Fast Charging Port Fix',
        path: '/charging-port-repair',
        badge: '45W PPS Safe',
        description: 'Restores high-wattage power delivery and stable Samsung DeX PC connection.',
        estimatedTime: '20 mins',
        warranty: '90-day warranty'
      },
      {
        id: 'battery-replacement',
        name: '5,000mAh Extended Life Battery Swap',
        path: '/battery-replacement',
        badge: 'High Capacity',
        description: 'High-cycle OEM cells with integrated overcharge protection and cooling adhesive pads.',
        estimatedTime: '15 mins',
        warranty: '6-month warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'samsung',
      specificModel: hasSamsungS24S25 ? 'Samsung Galaxy S24/S25' : 'Samsung Galaxy Series',
      services
    };
  }

  if (hasMacBook) {
    matchedKeywords.push('MacBook Pro', 'MacBook Air', 'Apple Silicon M-Series');
    services.push(
      {
        id: 'macbook-repair',
        name: 'MacBook Pro & Air Repair Sharjah',
        path: '/macbook-repair',
        badge: 'Apple Silicon',
        description: 'Specialized lab repairs for M1, M2, M3, and M4 logic boards, liquid ingress, and displays.',
        estimatedTime: 'Same-day',
        warranty: '180-day warranty'
      },
      {
        id: 'logic-board-repair',
        name: 'Component-Level Logic Board Micro-Soldering',
        path: '/logic-board-repair',
        badge: 'Saves 60% vs Apple',
        description: 'Replacing burnt PMIC chips, USB-C controller chips (CD3217), and solving power cycling.',
        estimatedTime: '2-4 hours',
        warranty: 'Micro-soldering warranty'
      },
      {
        id: 'data-recovery',
        name: 'Encrypted NAND & Dead Board Data Recovery',
        path: '/data-recovery',
        badge: '98% Success Rate',
        description: 'Direct chip-off or circuit-bypass retrieval for unbootable Apple Silicon MacBooks.',
        estimatedTime: '24-48 hours',
        warranty: 'No data, no fee'
      },
      {
        id: 'battery-replacement',
        name: 'MacBook OEM Polymer Battery Replacement',
        path: '/battery-replacement',
        badge: 'Zero Swelling',
        description: 'Safe adhesive solvent extraction and installation of factory-spec multi-cell packs.',
        estimatedTime: '45 mins',
        warranty: '1-year warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'macbook',
      specificModel: 'Apple MacBook Pro & Air',
      services
    };
  }

  if (hasLaptop) {
    matchedKeywords.push('Laptop', 'Computer', 'Hardware Repair');
    services.push(
      {
        id: 'laptop-repair',
        name: 'Professional Laptop Repair Sharjah',
        path: '/laptop-repair',
        badge: 'All Brands',
        description: 'Dell, HP, Lenovo, ASUS, Acer hinge fixes, SSD upgrades, and thermal repasting.',
        estimatedTime: 'Same-day',
        warranty: '180-day warranty'
      },
      {
        id: 'laptop-screen-repair',
        name: 'Laptop Screen & IPS Panel Replacement',
        path: '/laptop-screen-repair',
        badge: 'FHD & 4K OLED',
        description: 'Replacement panels for cracked laptop screens, horizontal artifacts, and flickering hinges.',
        estimatedTime: '45 mins',
        warranty: 'Pixel-perfect guarantee'
      },
      {
        id: 'data-recovery',
        name: 'Hard Drive & NVMe SSD Data Extraction',
        path: '/data-recovery',
        badge: 'Cleanroom Recovery',
        description: 'Rescuing inaccessible coursework, corporate files, and databases from failed drives.',
        estimatedTime: '24 hours',
        warranty: 'Guaranteed confidentiality'
      },
      {
        id: 'logic-board-repair',
        name: 'Laptop Motherboard Short-Circuit Repair',
        path: '/logic-board-repair',
        badge: 'Component Level',
        description: 'Diagnosing shorted power rails, GPU reballing, and BIOS chip reprogramming.',
        estimatedTime: '1-2 days',
        warranty: '90-day warranty'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'laptop',
      specificModel: 'Windows & Gaming Laptop',
      services
    };
  }

  if (hasWatch) {
    matchedKeywords.push('Apple Watch', 'Smartwatch');
    services.push(
      {
        id: 'apple-watch-repair',
        name: 'Apple Watch Screen & Battery Service',
        path: '/apple-watch-repair',
        badge: 'Ultra & Series',
        description: 'Precision sapphire glass lamination, water seal re-application, and battery fixes.',
        estimatedTime: '45 mins',
        warranty: '90-day warranty'
      },
      {
        id: 'screen-repair',
        name: 'OLED Glass Re-lamination',
        path: '/screen-repair',
        badge: 'Waterproof Seal',
        description: 'Preserving original OLED panels by replacing only the shattered outer glass lens.',
        estimatedTime: '60 mins',
        warranty: 'Water resistant check'
      }
    );
    return {
      matchedKeywords,
      primaryDeviceCategory: 'watch',
      specificModel: 'Apple Watch',
      services
    };
  }

  // Fallback: Default smart device services based on issue context or general smartphone needs
  matchedKeywords.push('Smart Device', 'Mobile Phone Repair');
  const fallbackServices: RelatedServiceItem[] = [
    {
      id: 'phone-repair',
      name: 'Full Smartphone Diagnostics & Repair',
      path: '/phone-repair',
      badge: 'All Brands',
      description: 'Comprehensive 28-point multi-meter diagnostics and fast parts replacement in Sharjah.',
      estimatedTime: '20-30 mins',
      warranty: '180-day warranty'
    },
    {
      id: 'screen-repair',
      name: 'Cracked Glass & OLED Screen Replacement',
      path: '/screen-repair',
      badge: 'Most Popular',
      description: 'Same-day express screen replacement for Apple, Samsung, Xiaomi, OnePlus, and Google Pixel.',
      estimatedTime: '20 mins',
      warranty: 'Warranty on touch'
    },
    {
      id: 'battery-replacement',
      name: 'Mobile Phone Battery Replacement',
      path: '/battery-replacement',
      badge: 'Fast Swap',
      description: 'Instant installation of fresh high-density lithium-ion batteries with extended life.',
      estimatedTime: '15 mins',
      warranty: '6-month warranty'
    },
    {
      id: 'charging-port-repair',
      name: 'Charging Port & Microphone Repair',
      path: '/charging-port-repair',
      badge: 'Instant Fix',
      description: 'Ultrasonic micro-cleaning or complete dock flex replacement for loose charging cables.',
      estimatedTime: '20 mins',
      warranty: '90-day warranty'
    }
  ];

  if (mentionsBoard || mentionsWater || mentionsData) {
    fallbackServices[3] = {
      id: 'logic-board-repair',
      name: 'Logic Board Micro-Soldering & Water Fix',
      path: '/logic-board-repair',
      badge: 'Advanced Lab',
      description: 'Specialized microscope repair for water damaged, reboot looping, and dead devices.',
      estimatedTime: 'Same-day',
      warranty: '90-day warranty'
    };
  }

  return {
    matchedKeywords,
    primaryDeviceCategory: hasIphoneGen ? 'iphone' : 'general',
    specificModel: hasIphoneGen ? 'Apple iPhone' : 'Smartphones & Laptops',
    services: fallbackServices
  };
}

interface RelatedServicesModuleProps {
  /** The text to analyze (post content, title, excerpt, etc.) */
  contentToAnalyze: string;
  /** Optional post category */
  category?: string;
  /** Optional custom title override */
  customTitle?: string;
  /** Optional custom subtitle override */
  customSubtitle?: string;
  /** Layout style: 'grid' (default for full width), 'compact' (for sidebars), or 'banner' */
  variant?: 'grid' | 'compact' | 'banner';
  /** Callback for booking a service directly */
  onBookNow?: (serviceName?: string) => void;
  className?: string;
}

export default function RelatedServicesModule({
  contentToAnalyze,
  category,
  customTitle,
  customSubtitle,
  variant = 'grid',
  onBookNow,
  className = ''
}: RelatedServicesModuleProps) {
  const detection = React.useMemo(() => {
    return detectRelatedServices(contentToAnalyze, category);
  }, [contentToAnalyze, category]);

  const { primaryDeviceCategory, specificModel, services } = detection;

  // Icon mapping helper
  const getIcon = (id: string) => {
    switch (id) {
      case 'screen-repair':
      case 'laptop-screen-repair':
        return Smartphone;
      case 'battery-replacement':
        return Battery;
      case 'charging-port-repair':
        return Plug;
      case 'logic-board-repair':
        return Cpu;
      case 'data-recovery':
        return HardDrive;
      case 'macbook-repair':
      case 'laptop-repair':
        return Laptop;
      case 'apple-watch-repair':
        return Watch;
      case 'screen-protector':
        return Sparkles;
      default:
        return Smartphone;
    }
  };

  const title = customTitle || (
    specificModel 
      ? `Dedicated ${specificModel} Repair Services in Sharjah` 
      : 'Automated Related Repair Services'
  );

  const subtitle = customSubtitle || (
    `Based on the hardware topics covered in this article, our Muwaileh service center provides instant, certified solutions for your ${specificModel || 'device'}.`
  );

  if (variant === 'compact') {
    return (
      <div className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Matched Device Solutions
          </span>
        </div>
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1 leading-snug">
          {specificModel || 'Device'} Services
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Same-day walk-ins welcome in Muwaileh, Sharjah.
        </p>
        <div className="space-y-3">
          {services.slice(0, 3).map((item) => {
            const Icon = getIcon(item.id);
            return (
              <Link
                key={item.id}
                to={item.path}
                className="group flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-brand-orange flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors truncate">
                      {item.name}
                    </h4>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-brand-orange/10 text-brand-orange rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.estimatedTime} • {item.warranty}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Need instant quote?</span>
          <Link to="/repairs" className="text-brand-orange font-bold hover:underline flex items-center gap-1">
            All Services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-br from-brand-blue to-blue-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg ${className}`}>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-orange-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Dynamically Detected: {specificModel || 'Smart Device'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-white">
              Dealing with hardware issues on your {specificModel || 'device'}?
            </h3>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Get express same-day repair in Muwaileh Commercial, Sharjah. Genuine parts, verified warranty, and zero data loss guarantee.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onBookNow ? (
              <button
                onClick={() => onBookNow(services[0]?.name || specificModel)}
                className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-orange-500/20 active:scale-95"
              >
                Book Repair Now
              </button>
            ) : (
              <Link
                to={services[0]?.path || '/repairs'}
                className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-orange-500/20"
              >
                View Repair Pricing
              </Link>
            )}
            <a
              href="https://wa.me/+971507117043"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all border border-white/20"
            >
              WhatsApp Tech Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default 'grid' variant: Rich card section perfect for the bottom of blog articles or service hubs
  return (
    <section className={`my-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden ${className}`}>
      {/* Decorative ambient accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automated Related Services</span>
              {specificModel && (
                <span className="hidden sm:inline-block border-l border-brand-orange/30 pl-2">
                  Target: {specificModel}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              {subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/repairs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-orange-600 transition-colors"
            >
              View Full Price Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.id);
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-brand-orange/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-brand-orange flex items-center justify-center font-bold shadow-xs group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    {service.badge && (
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-brand-orange transition-colors mb-2">
                    {service.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-3">
                    <span>⏱ {service.estimatedTime || '30 mins'}</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {service.warranty || 'Warranty'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={service.path}
                      className="flex-1 py-2 px-3 text-center rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange text-slate-800 dark:text-slate-200 font-bold text-xs transition-all"
                    >
                      Learn More
                    </Link>
                    {onBookNow && (
                      <button
                        onClick={() => onBookNow(service.name)}
                        className="py-2 px-3 rounded-xl bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-bold text-xs transition-all"
                        title="Book This Service"
                      >
                        Book
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Localized Bottom Trust Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Walk-in Repairs (Muwaileh Commercial, Sharjah)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free 28-Point Computer Diagnostic
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct WhatsApp Consultation Available
            </span>
          </div>

          <a
            href="https://wa.me/+971507117043?text=Hi%20Al%20Sharq,%20I%20saw%20your%20blog%20post%20and%20need%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1"
          >
            Chat with Senior Technician <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
