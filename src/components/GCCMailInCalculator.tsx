import React, { useState } from 'react';
import { 
  Truck, 
  Plane, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  Globe,
  ArrowRight,
  Package
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CountryDetail {
  id: string;
  nameEn: string;
  nameAr: string;
  courier: string;
  transitHours: string;
  pickupWindow: string;
  dutyStatus: string;
  typicalCostAED: number;
}

const GCC_COUNTRIES: CountryDetail[] = [
  {
    id: 'sa',
    nameEn: 'Saudi Arabia (Riyadh, Jeddah, Dammam)',
    nameAr: 'المملكة العربية السعودية (الرياض، جدة، الدمام)',
    courier: 'DHL Express & SMSA Priority Air',
    transitHours: '24 - 48 Hours Door-to-Door',
    pickupWindow: 'Same-day home/office courier collection',
    dutyStatus: 'Pre-cleared with personal gadget repair customs protocol',
    typicalCostAED: 90
  },
  {
    id: 'om',
    nameEn: 'Oman (Muscat, Salalah, Sohar)',
    nameAr: 'سلطنة عمان (مسقط، صلالة، صحار)',
    courier: 'Aramex & Express Land/Air Cargo',
    transitHours: '24 - 36 Hours',
    pickupWindow: 'Direct border express logistics',
    dutyStatus: 'GCC Free Trade personal property exemption',
    typicalCostAED: 70
  },
  {
    id: 'kw',
    nameEn: 'Kuwait (Kuwait City, Hawalli)',
    nameAr: 'دولة الكويت (مدينة الكويت، حولي)',
    courier: 'DHL Express Direct Air',
    transitHours: '24 - 48 Hours',
    pickupWindow: 'Daily flight courier dispatch',
    dutyStatus: 'Zero import duty on temporary repair declaration',
    typicalCostAED: 95
  },
  {
    id: 'qa',
    nameEn: 'Qatar (Doha, Al Rayyan)',
    nameAr: 'دولة قطر (الدوحة، الريان)',
    courier: 'FedEx Priority Air',
    transitHours: '24 Hours Next-Flight-Out',
    pickupWindow: 'Rapid pickup and return flight schedule',
    dutyStatus: 'Pre-inspected return guarantee',
    typicalCostAED: 85
  },
  {
    id: 'bh',
    nameEn: 'Bahrain (Manama, Riffa)',
    nameAr: 'مملكة البحرين (المنامة، الرفاع)',
    courier: 'DHL Express Flight Service',
    transitHours: '24 - 48 Hours',
    pickupWindow: 'Next morning customs transit',
    dutyStatus: 'GCC Personal Gadget Protocol',
    typicalCostAED: 75
  }
];

export default function GCCMailInCalculator() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedCountryId, setSelectedCountryId] = useState<string>('sa');

  const country = GCC_COUNTRIES.find(c => c.id === selectedCountryId) || GCC_COUNTRIES[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Al Sharq GCC Mail-In Desk! I am located in ${country.nameEn}. I have a device that needs lab repair/micro-soldering. Please provide me the courier pickup schedule and shipping instructions.`
  );

  return (
    <div className="bg-slate-900 border border-brand-orange/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden my-8">
      <div className="flex items-center gap-2 mb-3">
        <Plane className="w-4 h-4 text-brand-orange" />
        <span className="text-xs font-mono uppercase font-bold text-brand-orange tracking-wider">
          {isAr ? 'حاسبة الشحن الإقليمي السريع لدول الخليج' : 'GCC Regional Express Mail-In Calculator'}
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
        {isAr ? 'احسب مدة وتكلفة الشحن من دولتك إلى ورشة الشارقة' : 'Calculate Courier Transit Time & Bench Turnaround'}
      </h3>

      <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-2xl leading-relaxed">
        {isAr 
          ? 'نوفر خدمة استلام وتسليم من الباب إلى الباب عبر دي إتش إل وأرامكس لصيانة المذربورد واستعادة البيانات لجميع دول مجلس التعاون الخليجي.'
          : 'Door-to-door insured air courier pickup for high-end micro-soldering, MacBook logic boards, and data recovery across the GCC.'}
      </p>

      {/* Country Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {GCC_COUNTRIES.map(c => {
          const isSelected = c.id === selectedCountryId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCountryId(c.id)}
              className={`p-3 rounded-2xl text-xs font-bold transition-all border text-center cursor-pointer ${
                isSelected
                  ? 'bg-brand-orange text-white border-orange-400 shadow-md'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="block truncate">{isAr ? c.nameAr.split('(')[0] : c.nameEn.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Country Transit Card */}
      <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Air Courier: {country.courier}</span>
          </div>

          <h4 className="text-lg font-black text-white">
            {isAr ? country.nameAr : country.nameEn}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
            <div>
              <span className="text-slate-400 block text-[11px]">Courier Transit:</span>
              <strong className="text-white">{country.transitHours}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Estimated Air Shipping:</span>
              <strong className="text-brand-orange">~AED {country.typicalCostAED} (Door-to-Door)</strong>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block text-[11px]">Customs & Protocol:</span>
              <strong className="text-slate-200">{country.dutyStatus}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/971507117043?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{isAr ? 'طلب بوليصة الشحن عبر واتساب' : 'Request Courier Waybill'}</span>
          </a>

          <div className="text-[11px] text-center text-slate-400">
            Includes anti-static tamper-proof safety packaging box
          </div>
        </div>
      </div>
    </div>
  );
}
