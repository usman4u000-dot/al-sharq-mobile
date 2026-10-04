import React from 'react';
import { BlogPost } from './blogPosts';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Cpu, 
  Smartphone, 
  Battery, 
  Sparkles, 
  Wrench, 
  Zap, 
  ArrowRight,
  Globe,
  Radio,
  HelpCircle
} from 'lucide-react';

export const seoBlogsPakistaniVariants: BlogPost[] = [
  // 1. Infinix & Tecno Pakistan Variant Repair
  {
    id: 'infinix-hot-note-tecno-pakistan-variant-repair-sharjah-dubai-2026',
    title: 'Infinix & Tecno Repair in Sharjah: Fixing Pakistan-Variant Hot 50, Note 40 Pro & Camon 30 in UAE',
    excerpt: 'Bought your Infinix Hot 50, Note 40 Pro, or Tecno Camon in Karachi, Lahore, or Islamabad and now facing screen or charging issues in Dubai or Sharjah? Discover how Al Sharq Mobile stocks authentic Transsion spare parts that official UAE agencies decline to service.',
    date: 'October 2, 2026',
    author: 'Transsion & MediaTek Hardware Specialist – Al Sharq Lab',
    category: 'Smartphone & iPhone Expertise',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1200',
    metaTitle: 'Infinix & Tecno Repair Sharjah | Pakistan Variant Screens & Parts | Al Sharq',
    metaDescription: 'Expert repair for Pakistan-imported Infinix Hot, Note 40, and Tecno Camon phones in Sharjah and Dubai. Same-day screen, battery, and charging port repair in Muwaileh.',
    content: (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="bg-orange-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-brand-orange/40 mb-8 not-prose">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AEO Direct Answer • Pakistan Variant Smartphone Servicing UAE</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">
            Can Pakistan-purchased Infinix and Tecno phones be repaired same-day in Sharjah and Dubai?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Yes. While authorized UAE agency service centers often reject Pakistan-region Infinix and Tecno models (citing non-GCC regional warranty restrictions), Al Sharq Mobile on Fire Station Road, Muwaileh Commercial, Sharjah stocks original 120Hz displays, fast-charging daughterboards, and MediaTek power ICs for 30 to 45 minute express walk-in repairs.
          </p>
          <div className="mt-4 pt-4 border-t border-orange-200/60 dark:border-slate-700 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-orange" /> 30 - 45 Min Turnaround</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 90-Day Lab Warranty</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-500" /> Muwaileh Commercial, Sharjah</span>
          </div>
        </div>

        <h2>The Dilemma: "Not Supported in UAE Regional Service Centers"</h2>
        <p>
          Every month, hundreds of Pakistani expats, university students, and business travelers land at Dubai International Airport (DXB) and Sharjah International Airport (SHJ) carrying their trusted Infinix Hot 50, Hot 40 Pro, Note 40, or Tecno Camon 30.
        </p>
        <p>
          Unfortunately, when an accidental drop occurs on a construction site, university campus, or metro station, local dealership repair desks refuse to service them because their model numbers (such as X6836 or CL7) are tagged as South Asian variants with parts not listed in the UAE GCC parts catalog.
        </p>
        <p>
          At <strong>Al Sharq Mobile Phone & Computer Trading LLC</strong>, we bridge this gap. Our supply network imports original OEM Transsion display modules, sub-charging boards, and 5000mAh high-drain battery packs directly, restoring your device within an hour.
        </p>

        {/* Machine-Parseable Diagnostic Table */}
        <div className="overflow-x-auto my-8 not-prose">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-3.5 border border-slate-200 dark:border-slate-700">Phone Model (Pakistan Variant)</th>
                <th className="p-3.5 border border-slate-200 dark:border-slate-700">Frequent Failure in UAE</th>
                <th className="p-3.5 border border-slate-200 dark:border-slate-700">Al Sharq Muwaileh Solution</th>
                <th className="p-3.5 border border-slate-200 dark:border-slate-700">Average Turnaround</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3.5 font-semibold">Infinix Note 40 Pro / 30 Pro</td>
                <td className="p-3.5">Curved AMOLED shattered & 70W All-Round FastCharge failure</td>
                <td className="p-3.5">OEM 120Hz Curved AMOLED & sub-board replacement</td>
                <td className="p-3.5 font-bold text-emerald-600">45 Minutes</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Infinix Hot 50 / 40 / 30</td>
                <td className="p-3.5">Slow charging / Loose Type-C port & black screen after drop</td>
                <td className="p-3.5">Daughterboard mic-dock swap & original 90Hz LCD</td>
                <td className="p-3.5 font-bold text-emerald-600">30 Minutes</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold">Tecno Camon 30 / 20 Premier</td>
                <td className="p-3.5">OIS camera vibration & MediaTek Helio power rail short</td>
                <td className="p-3.5">Optics realignment & thermal paste reapplication</td>
                <td className="p-3.5 font-bold text-emerald-600">1 Hour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>MediaTek Helio & Dimensity Charging Port Circuit Repairs</h2>
        <p>
          Due to the intense ambient summer temperatures in the UAE, high-wattage fast charging (such as Infinix 45W or 70W FastCharge) generates extra thermal load. If the charging pin accumulates lint or moisture from high humidity, the CC line protection diode blows on the lower sub-board.
        </p>
        <p>
          Rather than charging customers for costly motherboard replacements, we swap the lower charging flex module or micro-solder a fresh Type-C receptacle in under 30 minutes. You can check your charging port and battery status using our <Link to="/mobile-tools" className="text-brand-orange font-bold hover:underline">free mobile hardware diagnostic tool</Link> or visit our <Link to="/charging-port-repair" className="text-brand-orange font-bold hover:underline">charging port repair page</Link>.
        </p>

        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl my-8 not-prose border border-brand-orange/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-black mb-1">
              Have an Infinix or Tecno Phone Brought From Pakistan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Visit our workshop on Fire Station Road, Muwaileh Commercial, Sharjah for same-day repair with authentic parts.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/repair-estimate"
              className="px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              Get Repair Quote
            </Link>
            <Link
              to="/screen-repair"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm transition-all border border-white/20"
            >
              Screen Services
            </Link>
          </div>
        </div>
      </article>
    )
  },

  // 2. itel Mobile Pakistan Variant Repair
  {
    id: 'itel-mobile-pakistan-imported-repair-screen-battery-sharjah-2026',
    title: 'itel Mobile Repair in Sharjah: Pakistan-Imported itel S24, Color Pro & A70 Screen, Battery & Charging Solutions',
    excerpt: 'Comprehensive repair guide for budget itel smartphones brought to the UAE by workers, drivers, and students. Discover affordable same-day screen replacements, battery renewals, and low-call-volume microphone cleaning at Al Sharq Mobile in Sharjah.',
    date: 'September 29, 2026',
    author: 'Budget Smartphone Specialist – Al Sharq Lab',
    category: 'Smartphone & iPhone Expertise',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200',
    metaTitle: 'itel Mobile Repair Sharjah | Pakistan itel S24, A70 Screen & Battery | Al Sharq',
    metaDescription: 'Affordable same-day repair for Pakistan itel S24, Color Pro, and A70 phones in Sharjah Industrial Area & Muwaileh. Screens, batteries, and charging ports from 45 AED.',
    content: (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="bg-emerald-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-emerald-500/40 mb-8 not-prose">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Budget Smartphone Benchmark • itel Servicing Sharjah</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">
            Where can you get Pakistan-imported itel smartphones repaired quickly and cheaply in Sharjah?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            At Al Sharq Mobile Phone & Computer Trading on Fire Station Road, Muwaileh Commercial, Sharjah. We maintain high-volume inventory for itel S24, itel Color Pro 5G, A70, and Vision series, offering screen replacements, battery renewals, and microphone cleaning starting from just 45 to 85 AED.
          </p>
        </div>

        <h2>itel Mobile: The Working Professional’s Reliable Workhorse</h2>
        <p>
          itel smartphones have captured immense popularity in Pakistan for their unbeatable price-to-performance ratio and long-lasting 5000mAh batteries. When Pakistani workers, taxi drivers, and delivery riders bring their itel handsets to the UAE, their devices face tough physical working conditions in Sharjah Industrial Area 1–18 and across Dubai.
        </p>
        <p>
          Common issues we resolve daily include:
        </p>
        <ul>
          <li>
            <strong>Muffled Call Audio:</strong> Fine desert sand accumulating inside the microphone acoustic canal. We perform 15-minute ultrasonic mesh cleaning.
          </li>
          <li>
            <strong>Shattered Front Glass:</strong> Same-day grade-A IPS LCD replacements that preserve vivid color reproduction and smooth touch response.
          </li>
          <li>
            <strong>Worn Charging Ports:</strong> Micro-USB and Type-C charging port soldering for phones that only charge when the cable is held at an angle.
          </li>
        </ul>

        <p>
          Check your microphone and speaker health with our <Link to="/mobile-tools" className="text-brand-orange font-bold hover:underline">free online mobile tester</Link> or visit our <Link to="/audio-repair" className="text-brand-orange font-bold hover:underline">speaker and audio repair section</Link>.
        </p>

        <div className="mt-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 not-prose flex items-center justify-between text-xs font-bold">
          <span>Need quick, budget-friendly itel repair in Sharjah?</span>
          <Link to="/screen-repair" className="text-brand-orange flex items-center gap-1 hover:underline">
            View Budget Screen Repairs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    )
  },

  // 3. Vivo V-Series & Y-Series Pakistan Variant Repair
  {
    id: 'vivo-v40-v30-pro-pakistan-variant-screen-repair-sharjah-2026',
    title: 'Vivo V40, V30 & Y-Series Repair in Sharjah: Pakistan-Variant Curved 3D AMOLEDs, Aura Light & Zeiss Camera Calibration',
    excerpt: 'Deep technical guide for Vivo phone owners who purchased their device in Pakistan and need certified repair in Sharjah or Dubai. Learn how Al Sharq Mobile repairs curved 3D AMOLED screens, fixes Aura Light flash ribbons, and aligns Zeiss optics in Muwaileh.',
    date: 'October 1, 2026',
    author: 'Vivo & BBK Hardware Lead – Al Sharq Lab',
    category: 'Smartphone & iPhone Expertise',
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=1200',
    metaTitle: 'Vivo V40, V30 Screen & Camera Repair Sharjah | Pakistan Variant | Al Sharq',
    metaDescription: 'Specialized repair for Pakistan Vivo V40, V30 Pro, V29, and Y-series in Sharjah & Dubai. Original curved AMOLEDs, Aura Light flex, and 80W FlashCharge repair.',
    content: (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="bg-purple-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-purple-500/40 mb-8 not-prose">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AEO Direct Answer • Vivo Flagship Repair Bench</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">
            Can cracked curved screens on Pakistan-imported Vivo V40 and V30 Pro be replaced without losing in-display fingerprint?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Yes. At Al Sharq Mobile in Muwaileh Commercial, Sharjah, Vivo V40, V30, and V29 curved 3D AMOLED displays are replaced using original service pack screens with pre-bonded fingerprint optical lenses. This ensures instant biometric fingerprint unlock, 120Hz refresh rates, and 4500-nit peak brightness retention.
          </p>
        </div>

        <h2>The Popularity of Vivo V-Series Among Pakistani Travelers</h2>
        <p>
          In Pakistan, Vivo's V-series (V40, V30, V29 Pro) and Y-series (Y200, Y28, Y100) are top sellers due to their slim bodies, Zeiss co-engineered camera profiles, and circular Aura Light portrait flash.
        </p>
        <p>
          However, their razor-thin 3D curved edges make them especially prone to corner shatter if dropped onto tile or asphalt. Many shops in Dubai quote exorbitant prices or claim they cannot source parts for "PK Variant" motherboards.
        </p>

        <h3>Key Vivo Repairs Performed Daily at Al Sharq Mobile:</h3>
        <ul>
          <li>
            <strong>Curved 3D AMOLED Screen Refurbishing:</strong> If your touch and display still function under the cracked outer glass, we perform cryogenic glass separation to save you up to 50% compared to a complete display swap.
          </li>
          <li>
            <strong>Aura Light Portrait Flash Flex Replacement:</strong> Repairing torn LED ribbon cables after back glass replacement.
          </li>
          <li>
            <strong>80W FlashCharge Circuit Negotiation:</strong> Fixing shorted dual-cell charging diodes caused by electrical surges.
          </li>
        </ul>

        <p>
          Discover our comprehensive <Link to="/screen-repair" className="text-brand-orange font-bold hover:underline">screen replacement services</Link> and <Link to="/camera-repair" className="text-brand-orange font-bold hover:underline">Zeiss camera alignment lab</Link>.
        </p>

        <div className="mt-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 not-prose flex items-center justify-between text-xs font-bold">
          <span>Need fast repair for your Vivo V-Series or Y-Series in Sharjah?</span>
          <Link to="/repair-estimate" className="text-brand-orange flex items-center gap-1 hover:underline">
            Get an Instant Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    )
  },

  // 4. Oppo Reno & A-Series Pakistan Imported Repair
  {
    id: 'oppo-reno-12-a78-pakistan-imported-repair-sharjah-dubai-2026',
    title: 'Oppo Reno 12, 11 & A-Series Repair in Sharjah: SuperVOOC 80W Charging Port & du/e& Network Reception Fix',
    excerpt: 'Facing hardware breakdown or weak network reception on your Pakistan-bought Oppo Reno 12, Reno 11, or Oppo A78 in the UAE? Discover how Al Sharq Mobile repairs melted 80W SuperVOOC charging ports and tunes RF antenna bands in Muwaileh.',
    date: 'September 27, 2026',
    author: 'Oppo & RF Communications Specialist – Al Sharq Lab',
    category: 'Smartphone & iPhone Expertise',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=1200',
    metaTitle: 'Oppo Reno 12 & A-Series Repair Sharjah | Pakistan Variant | Al Sharq',
    metaDescription: 'Reliable repair for Pakistan-purchased Oppo Reno 12, 11, and A-series in Sharjah & Dubai. SuperVOOC 80W charging ports, curved screens, and antenna repairs in Muwaileh.',
    content: (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Resolving SuperVOOC 80W Port Overheating in UAE Climates</h2>
        <p>
          Oppo’s proprietary SuperVOOC fast charging relies on extreme electrical current (up to 8A or 10A). In the scorching UAE climate, car chargers operating inside sun-baked vehicles can cause thermal pin oxidation inside the Type-C port, causing the phone to drop from fast charging down to a sluggish 5W trickle.
        </p>
        <p>
          At our Muwaileh bench, we replace degraded SuperVOOC charging sub-boards with genuine thermal-barrier protected components, restoring 0 to 100% full battery replenishment in under 35 minutes.
        </p>

        <h3>Antenna Band & SIM Card Carrier Optimization</h3>
        <p>
          Some Pakistan variant Oppo devices experience weak 5G or 4G LTE signal reception when switching from Pakistani carriers (Jazz, Zong, Ufone) to UAE network providers (e& Etisalat or du). Our technicians inspect internal RF coaxial cables and calibrate baseband modem settings, ensuring crystal-clear VoLTE calling and full-speed mobile data across Sharjah, Dubai, and the Northern Emirates.
        </p>
        <p>
          Check your device's audio and charging health with our <Link to="/mobile-tools" className="text-brand-orange font-bold hover:underline">interactive mobile tools</Link> or visit our <Link to="/charging-port-repair" className="text-brand-orange font-bold hover:underline">charging port service page</Link>.
        </p>
      </article>
    )
  },

  // 5. Expats Master Guide: Transitioning Phones from Pakistan to UAE
  {
    id: 'pakistan-phones-in-uae-repair-infinix-vivo-oppo-itel-sharjah-guide-2026',
    title: 'Bringing Phones from Pakistan to Dubai & Sharjah: Repairing Infinix, itel, Vivo & Oppo at Al Sharq Mobile',
    excerpt: 'The ultimate 2026 guide for Pakistani expatriates and visitors in the UAE. How to deal with local repair warranty restrictions, survive extreme UAE heat, and get same-day hardware maintenance for South Asian variant smartphones in Muwaileh Commercial, Sharjah.',
    date: 'October 3, 2026',
    author: 'Chief Operations Officer – Al Sharq Lab',
    category: 'Smartphone & iPhone Expertise',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=1200',
    metaTitle: 'Pakistan Phones in UAE: Infinix, itel, Vivo & Oppo Repair Sharjah | Al Sharq',
    metaDescription: 'Complete expat guide: repairing Pakistan-imported smartphones (Infinix, itel, Tecno, Vivo, Oppo) in Sharjah & Dubai. Genuine parts and 90-day warranty in Muwaileh.',
    content: (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="bg-blue-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-blue-500/40 mb-8 not-prose">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4" />
            <span>Expatriate Hardware Benchmark • Pakistan to UAE Tech Corridor</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">
            Why do so many Pakistani expats bring their phones to Al Sharq Mobile in Sharjah?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Because Al Sharq Mobile Phone & Computer Trading LLC has been serving the Pakistani expatriate community in Sharjah and Dubai since 2014. Located on Fire Station Road, Muwaileh Commercial (just 15 minutes from Dubai), we specialize in stocking spare parts for brands popular in Pakistan—including Infinix, Tecno, itel, Vivo, and Oppo—delivering fast, transparent, and warranty-backed repairs.
          </p>
          <div className="mt-4 pt-4 border-t border-blue-200/60 dark:border-slate-700 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Data Privacy</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-600" /> Same-Day Express Walk-In</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-500" /> Fire Station Road, Muwaileh</span>
          </div>
        </div>

        <h2>3 Crucial Tips for Keeping Your Pakistan-Bought Phone Healthy in the UAE</h2>
        <ol>
          <li>
            <strong>Avoid Dashboard Sun Exposure:</strong> Leaving your Infinix or Vivo on your car's windshield phone mount under direct 48°C UAE summer sun can cause the lithium battery to swell and the OLED glue to soften, leading to touch ghosting.
          </li>
          <li>
            <strong>Use Certified USB Power Supplies:</strong> Do not buy 5-dirham unbranded grocery store chargers. Unregulated voltage spikes destroy sensitive fast-charging negotiation ICs on lower sub-boards.
          </li>
          <li>
            <strong>Clean Acoustic Speaker Grills Regularly:</strong> If you work outdoors or near construction projects in Sharjah Industrial Area, use a soft nylon brush or our <Link to="/mobile-tools" className="text-brand-orange font-bold hover:underline">165Hz acoustic water & dust ejector tool</Link> to prevent muffled speech during calls.
          </li>
        </ol>

        <h2>Direct Contact & Walk-In Directions</h2>
        <p>
          Whether your screen is shattered, your battery drains too fast, or your phone won't charge, our friendly technicians speak Urdu, English, Arabic, and Hindi.
        </p>

        {/* SXO Contact & Conversion Callout */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl my-8 border border-brand-orange/40 not-prose flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-mono uppercase text-brand-orange font-bold block mb-1">
              Al Sharq Mobile Lab • Muwaileh Commercial, Sharjah
            </span>
            <h3 className="text-lg sm:text-xl font-black mb-2">
              Need Help With Your Pakistan-Variant Phone in the UAE?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Visit our shop on Fire Station Road, Muwaileh Commercial, Sharjah, or chat with our master technician directly on WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20have%20a%20phone%20from%20Pakistan%20and%20need%20repair%20in%20Sharjah."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              WhatsApp Us Now
            </a>
            <Link
              to="/repair-estimate"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm transition-all border border-white/20"
            >
              Instant Estimate
            </Link>
          </div>
        </div>
      </article>
    )
  }
];
