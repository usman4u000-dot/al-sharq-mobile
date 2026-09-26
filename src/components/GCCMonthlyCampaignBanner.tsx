import React, { useState } from 'react';
import { 
  Flame, 
  Calendar, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  CheckCircle2, 
  Package,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  GCC_REGIONS, 
  GCCRegionConfig, 
  MONTHLY_CAMPAIGN_WAVES, 
  CampaignWave, 
  getCurrentCampaignWave, 
  getDaysRemainingInWave 
} from '../services/campaignScheduleService';
import { useLanguage } from '../contexts/LanguageContext';

interface GCCMonthlyCampaignBannerProps {
  selectedRegionCode: string;
  onSelectRegion: (regionCode: string) => void;
}

export default function GCCMonthlyCampaignBanner({
  selectedRegionCode,
  onSelectRegion
}: GCCMonthlyCampaignBannerProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  const currentWave = getCurrentCampaignWave();
  const daysRemaining = getDaysRemainingInWave(currentWave);
  const currentRegion = GCC_REGIONS[selectedRegionCode] || GCC_REGIONS.ae;
  const currentDay = new Date().getDate();

  return (
    <div className="mb-10 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all">
      {/* Top Banner Ribbon */}
      <div className={`px-5 py-3 text-white flex flex-wrap items-center justify-between gap-3 ${
        currentWave.isDealActive 
          ? 'bg-gradient-to-r from-red-600 via-brand-orange to-amber-600' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-amber-500/30'
      }`}>
        <div className="flex items-center gap-2">
          {currentWave.isDealActive ? (
            <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
          ) : (
            <Package className="w-5 h-5 text-amber-400 animate-pulse" />
          )}
          <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
            {isAr ? currentWave.nameAr : currentWave.nameEn}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {isAr 
                ? `متبقي ${daysRemaining} أيام في هذه المرحلة` 
                : `${daysRemaining} Days Left in this Wave`}
            </span>
          </div>

          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isAr ? 'جدول العروض الشهري' : 'Month Schedule'}</span>
            {showFullSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Bar: GCC Regional Switcher & Express Delivery Route */}
      <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-850/60 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left: Region Pills */}
          <div>
            <div className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-brand-orange" />
              <span>{isAr ? 'اختر دولتك لعرض الأسعار والعملة وتوقيت الشحن:' : 'Select Your Country for Local Currency & Express Shipping:'}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.values(GCC_REGIONS).map((reg) => {
                const isSelected = reg.code === selectedRegionCode;
                return (
                  <button
                    key={reg.code}
                    onClick={() => onSelectRegion(reg.code)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-blue text-white shadow-md shadow-blue-900/25 scale-105 border-2 border-brand-orange'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 hover:border-brand-orange/60'
                    }`}
                  >
                    <span className="text-base">{reg.flag}</span>
                    <span>{reg.nameEn.split(' ')[0]}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300'
                    }`}>
                      {reg.currency}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Regional Delivery & Duty Exemption Assurance */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md shrink-0 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 mb-1">
              <Truck className="w-4 h-4 shrink-0" />
              <span>{currentRegion.flag} {currentRegion.nameEn} Dispatch Route</span>
            </div>
            <div className="text-xs font-extrabold text-gray-900 dark:text-white mb-0.5">
              Courier: <span className="text-brand-orange">{currentRegion.courierName}</span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
              Estimated Delivery: <strong>{currentRegion.deliveryHours}</strong> from Sharjah Hub.
              <span className="block text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                ✓ Personal Device Transit: Excluded from commercial import duties.
              </span>
            </div>
          </div>

        </div>

        {/* Dynamic Month Schedule Timeline Accordion */}
        {showFullSchedule && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span>{isAr ? 'الجدول الزمني الشهري لموجات الخصم وفترات فحص الشحنات' : 'Monthly Flash Wave & Restock Inspection Calendar'}</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {isAr 
                    ? 'تدوير منتظم للخصومات كل 3 إلى 5 أيام مع فترات راحة وتفتيش جمركي (2-3 أيام) لضمان جودة الأجهزة المستوردة.'
                    : 'Transparent 30-day rotating calendar: 3-5 days active discount drops separated by 2-3 days restock & quality inspection windows.'}
                </p>
              </div>

              <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                Today: Day {currentDay} of the Month
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MONTHLY_CAMPAIGN_WAVES.map((wave) => {
                const isCurrent = currentDay >= wave.startDay && currentDay <= wave.endDay;
                return (
                  <div
                    key={wave.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-2 border-brand-orange shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-90'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black mb-1.5">
                      <span className="text-gray-500 dark:text-gray-400 font-mono">
                        Days {wave.startDay} - {wave.endDay}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        wave.isDealActive 
                          ? 'bg-red-100 text-red-600 dark:bg-red-950/70 dark:text-red-400' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-gray-300'
                      }`}>
                        {wave.isDealActive ? `${wave.discountPercent}% OFF` : 'Restock / Cooldown'}
                      </span>
                    </div>

                    <div className="font-extrabold text-xs text-gray-900 dark:text-white line-clamp-1 mb-1">
                      {isAr ? wave.nameAr : wave.nameEn}
                    </div>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                      {isAr ? wave.descriptionAr : wave.descriptionEn}
                    </p>

                    {isCurrent && (
                      <div className="mt-2 text-[10px] font-black text-brand-orange flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
                        <span>{isAr ? 'المرحلة النشطة حالياً' : 'Currently Active'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
