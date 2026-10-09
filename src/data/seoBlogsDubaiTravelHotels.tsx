import React from 'react';
import { BlogPost } from './blogPosts';
import { Link } from 'react-router-dom';
import { 
  Hotel, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Globe, 
  Compass, 
  Tag, 
  Clock, 
  BatteryCharging, 
  Wifi,
  Navigation
} from 'lucide-react';

const TRIP_COM_DUBAI_HOTELS_URL = "https://www.trip.com/hotels/list?city=220&display=Dubai&optionId=220&optionType=City&optionName=Dubai&Allianceid=10929626&SID=332911573&trip_sub1=&trip_sub3=D20154955";
const EVONIXTEC_URL = "https://evonixtec.com";

export const seoBlogsDubaiTravelHotels: BlogPost[] = [
  {
    id: 'best-hotels-in-dubai-2026-luxury-budget-burj-khalifa-guide',
    title: 'Best Hotels in Dubai 2026: Luxury & Budget Stays Near Burj Khalifa & Smart Tourist Guide',
    excerpt: 'Planning your trip to Dubai? Find the best hotels near Burj Khalifa, Dubai Mall, Marina, and Deira. Exclusive deals up to 60% OFF with free cancellation, plus essential travel tech advice.',
    date: 'October 9, 2026',
    author: 'Dubai Travel & Gadget Editorial Desk',
    category: 'Dubai Travel & Smart Tourism',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200&h=630',
    metaTitle: 'Best Hotels in Dubai 2026 - Luxury & Budget Near Burj Khalifa | Trip Deals',
    metaDescription: 'Find the top Dubai hotels near Burj Khalifa, Downtown, Marina & Deira. Exclusive Trip.com rates up to 60% OFF with free cancellation. Essential travel tech & gadget guide.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed font-sans">
        {/* Special Offer Alert Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-orange-950/50 to-slate-900 border border-amber-500/40 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Special 2026 Dubai Hotel Deals • Up to 60% OFF</span>
              </span>
              <h2 className="text-xl font-extrabold text-white">
                Best Hotels in Dubai 2026 — Luxury & Budget Stays Near Burj Khalifa
              </h2>
              <p className="text-slate-300 text-sm">
                Instant confirmation, verified guest reviews, best price guarantee & free cancellation.
              </p>
            </div>

            <a
              href={TRIP_COM_DUBAI_HOTELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wide transition-all shadow-lg shadow-orange-500/20 shrink-0"
            >
              <span>👉 Check Dubai Hotel Prices</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-200">
          Planning your dream trip to Dubai in 2026? Whether you are craving ultra-luxury penthouse suites overlooking the dancing Dubai Fountain at Downtown Dubai or affordable family-friendly stays in historic Deira, Dubai offers world-class hospitality for every budget.
        </p>

        {/* Why Book Section */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-amber-400" /> Why Book Your Dubai Stay Through Trip.com?
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Up to 60% OFF:</strong> Exclusive promotional discounts on 4-star & 5-star properties.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Prime Locations:</strong> Footsteps from Burj Khalifa, Dubai Mall, Palm Jumeirah & Marina.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Free Cancellation:</strong> Flexible booking plans with zero cancellation penalty on select rooms.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>24/7 Global Support:</strong> Multilingual reservation assistance in English, Arabic, and Urdu.</span>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <a
              href={TRIP_COM_DUBAI_HOTELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Browse All Dubai Hotels on Trip.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Neighborhood Guide */}
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 pt-2">
          <MapPin className="w-6 h-6 text-orange-400" />
          Where to Stay in Dubai: Top Neighborhoods by Traveler Style
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">1. Downtown Dubai & Burj Khalifa</h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Luxury & Sightseeing</span>
            </div>
            <p className="text-xs text-slate-300">
              The beating heart of Dubai. Home to Burj Khalifa, Dubai Opera, and The Dubai Mall. Ideal for first-timers, luxury honeymooners, and shopping enthusiasts who want iconic skyline views.
            </p>
            <div className="text-xs text-slate-400 font-mono">Metro: Burj Khalifa / Dubai Mall Station (Red Line)</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">2. Dubai Marina & JBR</h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Beach & Nightlife</span>
            </div>
            <p className="text-xs text-slate-300">
              Famous for waterfront promenades, beach clubs, yachts, and alfresco dining. Perfect for beach lovers, digital nomads, and young couples.
            </p>
            <div className="text-xs text-slate-400 font-mono">Metro & Tram: DMCC / Sobha Realty Station</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">3. Deira & Bur Dubai (Old Dubai)</h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Budget & Authentic Culture</span>
            </div>
            <p className="text-xs text-slate-300">
              Traditional spice and gold souks, abra water taxi boat rides across Dubai Creek, and highly affordable 3-to-4-star hotel rooms starting under AED 150/night.
            </p>
            <div className="text-xs text-slate-400 font-mono">Metro: Al Fahidi / Union / Al Rigga Stations</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">4. Palm Jumeirah</h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Iconic Island Resorts</span>
            </div>
            <p className="text-xs text-slate-300">
              Home to Atlantis The Palm and Atlantis The Royal. Unmatched private beaches, infinity pools, Michelin-starred dining, and luxury water parks.
            </p>
            <div className="text-xs text-slate-400 font-mono">Transit: Palm Monorail connecting to Dubai Tram</div>
          </div>
        </div>

        {/* Cross-Link Bridge to Evonixtec.com */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/40 border border-blue-500/30 my-6">
          <div className="flex items-center gap-3 text-cyan-400 font-bold mb-2">
            <Globe className="w-5 h-5" />
            <span>Essential Travel Tech Checklist for Dubai Tourists</span>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Dubai is a futuristic smart city where taxis, metro fares, restaurant menus, and tourist visas operate digitally. Before packing your bags, you need the right smartphone gear, power banks, and essential apps.
          </p>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm space-y-2">
            <p className="text-slate-300">
              For comprehensive hardware benchmarking, travel gadget reviews, and power adapter safety guides, visit our partner tech publication <strong>Evonixtec.com</strong>:
            </p>
            <div className="pt-1">
              <a 
                href={EVONIXTEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold underline decoration-cyan-500/50 underline-offset-4"
              >
                <span>Read Full Travel Gadget & Tech Guide on Evonixtec.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Tech Support for Tourists at Al Sharq */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-orange-500/30">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-orange-400" />
            Accidental Drop or Dead Battery While in UAE?
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            If your iPhone or Samsung screen cracks at Dubai Mall, or your battery dies rapidly in the desert heat, don't pay exorbitant mall prices! <strong>Al Sharq Mobile Lab</strong> is situated right on the Sharjah-Dubai border in Muwaileh (15 mins from Dubai Airport / Sahara Centre), offering express 20-minute screen and battery repairs with genuine parts and warranty.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/estimate" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs transition-all"
            >
              <span>Instant Repair Price Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a 
              href="https://wa.me/971507117043?text=Hello%20Al%20Sharq,%20I%20am%20a%20tourist%20in%20Dubai/UAE%20and%20need%20urgent%20phone%20support."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
            >
              <span>WhatsApp Emergency Tourist Support (+971 50 711 7043)</span>
            </a>
          </div>
        </div>

        {/* Final CTA Button */}
        <div className="text-center pt-4">
          <a
            href={TRIP_COM_DUBAI_HOTELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30 transition-all transform hover:scale-[1.02]"
          >
            <span>👉 Click Here to Check Best Dubai Hotel Prices on Trip.com (Up to 60% OFF)</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    )
  },
  {
    id: '5-best-apps-and-tech-you-need-before-traveling-to-dubai-2026',
    title: '5 Best Apps & Tech You Need Before Traveling to Dubai in 2026: The Ultimate Tourist Tech Guide',
    excerpt: 'Dubai is the world’s leading smart city. Before you land, discover the 5 must-have apps, eSIM secrets, power adapter tips, and battery protection for seamless UAE travel.',
    date: 'October 9, 2026',
    author: 'Tech & Mobility Desk, Evonixtec & Al Sharq',
    category: 'Travel Gadgets & Apps',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200&h=630',
    metaTitle: '5 Best Apps & Tech You Need Before Traveling to Dubai 2026 | Tourist Guide',
    metaDescription: 'Essential tech guide for Dubai tourists in 2026. Top apps (Careem, Nol, Dubai Now), Type G plug adapters, heat-safe power banks, and hotel booking deals.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed font-sans">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-500/30">
          <div className="flex items-center gap-3 text-cyan-400 font-bold mb-2">
            <Compass className="w-6 h-6" />
            <span>Smart City Readiness: Everything You Need on Your Phone for Dubai</span>
          </div>
          <p className="text-slate-300 text-sm md:text-base">
            Dubai is a cashless, app-powered metropolis where everything from airport e-gates and public transit to food delivery and beach umbrellas runs on digital platforms. Arriving with the right apps and hardware ensures zero stress upon landing at DXB or DWC airports.
          </p>
        </div>

        {/* 5 Apps Section */}
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-cyan-400" />
          The 5 Indispensable Apps & Tech Gear for Dubai
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 font-black text-lg shrink-0">01</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Careem & Uber (Smart Transport & Food Delivery)</h3>
              <p className="text-sm text-slate-300">
                While standard Dubai taxis are hailed on the street, the <strong>Careem Super App</strong> allows you to book official Hala Taxis, luxury rides, food delivery, and bicycle rentals with upfront fixed pricing.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 font-black text-lg shrink-0">02</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Nol Card App & RTA Dubai (Metro, Tram & Water Bus)</h3>
              <p className="text-sm text-slate-300">
                Dubai Metro is fully driverless and world-class. You cannot pay cash on the bus or metro; you must use a Nol Card. Download the Nol Pay app or buy a Silver Nol Card at any station for seamless contactless travel.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 font-black text-lg shrink-0">03</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">eSIM with High-Speed 5G Data (e& / du / Virgin Mobile)</h3>
              <p className="text-sm text-slate-300">
                Avoid costly roaming charges. Modern iPhones and Androids support instant digital eSIM activation before departure or free tourist SIM cards upon passing passport control.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 font-black text-lg shrink-0">04</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Type G (British 3-Pin) Plug Adapter & Fast Charger</h3>
              <p className="text-sm text-slate-300">
                The UAE operates on 230V 50Hz with <strong>Type G plugs</strong> (three rectangular pins, British style). While luxury 5-star hotels often have multi-plugs, having your own GaN USB-C fast charger ensures rapid charging between adventures.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-rose-500/10 text-rose-400 font-black text-lg shrink-0">05</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">High-Capacity Thermal-Protected Power Bank</h3>
              <p className="text-sm text-slate-300">
                Using GPS navigation, 4K camera recording at Burj Khalifa, and high outdoor ambient temperatures drains phone batteries twice as fast. A 10,000mAh to 20,000mAh airline-approved power bank with thermal cut-off is an absolute lifeline.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Link Box to Evonixtec.com */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-blue-950/50 border border-cyan-500/40 my-6">
          <div className="flex items-center gap-3 text-cyan-400 font-bold mb-2">
            <Globe className="w-5 h-5" />
            <span>Looking for In-Depth Tech Reviews & Gadget Guides?</span>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            For detailed hardware teardowns, travel adapter safety tests, and power bank performance benchmarks, check out the full guide published on our tech portal <strong>Evonixtec.com</strong>:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={EVONIXTEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg"
            >
              <span>Read Full Tech Guide on Evonixtec.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hotel Booking Call-to-Action */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 to-orange-950/50 border border-amber-500/40 my-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Haven't Booked Your Stay Yet?</span>
              <h3 className="text-xl font-bold text-white">Check Best Dubai Hotel Deals — Up to 60% OFF</h3>
              <p className="text-slate-300 text-xs">
                Luxury & budget stays near Burj Khalifa, Dubai Mall & Marina with free cancellation.
              </p>
            </div>

            <a
              href={TRIP_COM_DUBAI_HOTELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wide transition-all shadow-xl shadow-orange-500/20 shrink-0"
            >
              <span>👉 Check Dubai Hotels Here</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Local Tech Lab Anchor */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
          <p>
            <strong>Note for Tourists in UAE:</strong> Need a quick phone battery replacement, broken screen repair, or genuine Apple/Samsung cables during your Dubai stay? Visit <Link to="/" className="text-orange-400 font-semibold hover:underline">Al Sharq Mobile Lab</Link> located in Muwaileh, Sharjah (just minutes from Dubai).
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'arabic-best-hotels-in-dubai-2026-travel-apps-tech-guide',
    title: 'دليل فنادق دبي 2026 وأهم 5 تطبيقات وتقنيات يحتاجها السائح عند السفر إلى الإمارات',
    excerpt: 'تخطط لرحلتك إلى دبي؟ اكتشف أفضل عروض الفنادق قرب برج خليفة ودبي مول ومارينا بخصومات تصل حتى 60% مع إلغاء مجاني، بالإضافة إلى أهم التطبيقات وبطاقات الشحن الذكية.',
    date: 'October 9, 2026',
    author: 'قسم السياحة الذكية والتقنية - شركة الشرق و Evonixtec',
    category: 'سياحة دبي والتقنية (عربي)',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=1200&h=630',
    metaTitle: 'أفضل فنادق دبي 2026 قرب برج خليفة | عروض حصرية حتى 60% وأهم تطبيقات السفر',
    metaDescription: 'دليل السفر إلى دبي 2026: حجز أفضل الفنادق في وسط دبي ومارينا وديرة بأسعار مخفضة حتى 60% عبر Trip.com، وأهم 5 تطبيقات ذكية وتجهيزات تقنية يحتاجها السائح.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed font-sans text-right" dir="rtl">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-orange-950/50 to-slate-900 border border-amber-500/40 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a
              href={TRIP_COM_DUBAI_HOTELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wide transition-all shadow-lg"
            >
              <span>👉 اضغط هنا لمعرفة أفضل أسعار فنادق دبي</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="space-y-1 text-right">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-end gap-1.5">
                <span>عروض فنادق دبي 2026 • خصومات حتى 60%</span>
                <Tag className="w-4 h-4 text-amber-400" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                أفضل فنادق دبي 2026 - إقامات فاخرة واقتصادية قرب برج خليفة
              </h2>
              <p className="text-slate-300 text-sm">
                تأكيد فوري، تقييمات موثوقة، ضمان أفضل سعر وإلغاء مجاني.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg text-slate-200">
          هل تخطط لزيارة دبي في عام 2026؟ سواء كنت تبحث عن فخامة الإطلالة المباشرة على نافورة دبي وبرج خليفة، أو إقامة اقتصادية مريحة في ديرة وخور دبي، جمعنا لك أفضل الصفقات الفندقية الحصرية والتجهيزات التقنية الذكية.
        </p>

        {/* Why Book */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-end gap-2">
            <span>لماذا تحجز إقامتك في دبي عبر Trip.com؟</span>
            <Hotel className="w-5 h-5 text-amber-400" />
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li className="flex items-start justify-end gap-2 text-right">
              <span><strong>خصومات تصل حتى 60%:</strong> على فنادق 4 و 5 نجوم المختارة.</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            </li>
            <li className="flex items-start justify-end gap-2 text-right">
              <span><strong>مواقع ممتازة:</strong> خطوات من برج خليفة ودبي مول ونخلة جميرا ودبي مارينا.</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            </li>
            <li className="flex items-start justify-end gap-2 text-right">
              <span><strong>إلغاء مجاني:</strong> خيارات مرنة تضمن عدم خسارة أموالك في حال تغيرت خططك.</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            </li>
            <li className="flex items-start justify-end gap-2 text-right">
              <span><strong>دعم باللغة العربية:</strong> خدمة عملاء 24 ساعة للإجابة على جميع الاستفسارات.</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            </li>
          </ul>
        </div>

        {/* Apps & Tech */}
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-end gap-2 pt-2">
          <span>أهم التطبيقات والأجهزة التي يحتاجها السائح في دبي</span>
          <Smartphone className="w-6 h-6 text-cyan-400" />
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white block mb-1">1. تطبيق كريم (Careem) وأوبر:</strong>
            <span className="text-sm text-slate-300">لحجز تاكسي هلا الرسمي وتوصيل الطعام والطلبات بأسعار شفافة ومحددة مسبقاً.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white block mb-1">2. بطاقة نول (Nol Card):</strong>
            <span className="text-sm text-slate-300">للتنقل السريع في مترو دبي وترام دبي والباصات المائية، حيث لا يتم قبول الدفع النقدي في المواصلات.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white block mb-1">3. محول كهرباء بريطاني ثلاثي (Type G) وباور بانك آمن:</strong>
            <span className="text-sm text-slate-300">تعمل المقابس في الإمارات بالنظام البريطاني الثلاثي (Type G)، كما يُفضل حمل شاحن متنقل ذو حماية حرارية لتحمل التصوير المتواصل في حرارة الجو.</span>
          </div>
        </div>

        {/* Cross link */}
        <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 my-6 text-right">
          <h3 className="text-lg font-bold text-white mb-2">مراجعات تقنية متقدمة لأجهزة السفر</h3>
          <p className="text-sm text-slate-300 mb-4">
            للاطلاع على التقييمات الشاملة لمحولات الطاقة والبطاريات وبطاقات eSIM قبل السفر، يمكنك زيارة موقعنا التقني الشريك <strong>Evonixtec.com</strong>:
          </p>
          <div className="flex justify-end">
            <a
              href={EVONIXTEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
            >
              <span>قراءة الدليل التقني الكامل على Evonixtec.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Al Sharq Repair mention */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-orange-500/30 text-right">
          <h3 className="text-base font-bold text-white mb-1">خدمة صيانة الهواتف الفورية للسياح في الإمارات</h3>
          <p className="text-xs text-slate-300 mb-3">
            في حال انكسار شاشة هاتفك أو تعطل البطارية أثناء تواجدك في دبي، يوفر مختبر <strong>الشرق للهواتف والكمبيوتر</strong> في مويلح (على حدود دبي والشارقة) صيانة سريعة خلال 20 دقيقة بقطع غيار أصلية وضمان شامل وبأسعار أقل بكثير من مراكز التسوق.
          </p>
          <div className="flex justify-end gap-2">
            <Link to="/arabic-services" className="px-3.5 py-1.5 rounded-lg bg-orange-500 text-slate-950 font-bold text-xs">
              خدمات الصيانة بالعربية
            </Link>
          </div>
        </div>

        {/* Final Hotel CTA */}
        <div className="text-center pt-4">
          <a
            href={TRIP_COM_DUBAI_HOTELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30 transition-all"
          >
            <span>👉 احجز الآن أفضل عروض فنادق دبي بخصم حتى 60% عبر Trip.com</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    )
  }
];
