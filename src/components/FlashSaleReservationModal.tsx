import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Flame, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Users, 
  BellRing,
  ArrowRight,
  Package,
  Lock,
  RefreshCw,
  Ticket,
  Mail,
  User,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import UAEDirhamSymbol from './UAEDirhamSymbol';
import { 
  getStoredSession, 
  updateCustomerProfile, 
  recordProductClaim, 
  persistReservationToFirestore 
} from '../services/customerTrackingService';

export interface FlashSaleItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  marketPrice: number;
  savingsAED: number;
  selectedColor?: string;
  image: string;
  stock: number;
}

interface FlashSaleReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FlashSaleItem | null;
  onStockZero?: (productId: number) => void;
}

export default function FlashSaleReservationModal({
  isOpen,
  onClose,
  product,
  onStockZero
}: FlashSaleReservationModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [phase, setPhase] = useState<'initial_form' | 'stock_dropped_zero' | 'inbound_confirmed'>('initial_form');
  const [currentStock, setCurrentStock] = useState<number>(1);
  const [activeViewers, setActiveViewers] = useState<number>(14);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(165);
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alreadyClaimedBefore, setAlreadyClaimedBefore] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Sharjah',
    color: ''
  });

  // Reset and initialize when modal opens
  useEffect(() => {
    if (isOpen && product) {
      // 1. Retrieve persistent customer session data from local storage
      const session = getStoredSession();
      setFormData({
        fullName: session.fullName || '',
        phone: session.phone || '',
        email: session.email || '',
        city: session.city || 'Sharjah',
        color: product.selectedColor || ''
      });

      // 2. Check if visitor already claimed / caused stock 0 for this specific product before
      const hasClaimed = Boolean(session.claimedProductIds && session.claimedProductIds[product.id]);
      setAlreadyClaimedBefore(hasClaimed);

      const effectiveStock = (hasClaimed || product.stock === 0) ? 0 : product.stock;
      setCurrentStock(effectiveStock);

      // If already 0 (or already claimed by this visitor), show the incoming 4-5 days shipment pre-order phase
      if (effectiveStock === 0) {
        setPhase('stock_dropped_zero');
        if (session.claimedProductIds?.[product.id]?.ticketId) {
          setTicketNumber(session.claimedProductIds[product.id].ticketId!);
        } else {
          setTicketNumber('ALSHARQ-' + Math.floor(1000 + Math.random() * 9000));
        }
      } else {
        setPhase('initial_form');
        setTicketNumber('ALSHARQ-' + Math.floor(1000 + Math.random() * 9000));
      }

      setCountdownSeconds(170);
      setActiveViewers(Math.floor(Math.random() * 8) + 12);
    }
  }, [isOpen, product]);

  // Countdown timer for FOMO
  useEffect(() => {
    if (!isOpen || phase !== 'initial_form') return;
    const timer = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, phase]);

  // Dynamic random viewers count fluctuation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveViewers(prev => Math.floor(Math.random() * 9) + 13);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Format timer MM:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // THE TRICK TRIGGER: When customer attempts to book the available unit
  const handleAttemptInitialBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(isAr ? 'يرجى كتابة الاسم ورقم الهاتف/الواتساب' : 'Please provide your Full Name and WhatsApp number');
      return;
    }

    // Save profile and lock this product's stock to 0 in persistent storage
    updateCustomerProfile({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city
    });
    recordProductClaim(product.id, product.name, ticketNumber);

    if (onStockZero) {
      onStockZero(product.id);
    }

    // Trigger the dynamic stock drop to 0 trick!
    setCurrentStock(0);
    setPhase('stock_dropped_zero');
  };

  // Final Priority Spot Lock for the incoming batch (4 to 5 units in 4-5 days)
  const handleLockInboundPriority = async () => {
    setIsSubmitting(true);

    // Save to persistent Firestore database as requested by user
    await persistReservationToFirestore({
      fullName: formData.fullName || 'Anonymous Registered Buyer',
      phone: formData.phone || '',
      email: formData.email || '',
      city: formData.city,
      productId: product.id,
      productName: product.name,
      color: formData.color || product.selectedColor || 'Standard Edition',
      discountPrice: product.price,
      marketPrice: product.marketPrice,
      ticketId: ticketNumber
    });

    if (onStockZero) {
      onStockZero(product.id);
    }

    setIsSubmitting(false);
    setPhase('inbound_confirmed');
  };

  // WhatsApp Priority Message sender
  const handleWhatsAppPriority = () => {
    const message = encodeURIComponent(
      `🔥 *URGENT 20% ONLINE FLASH SALE RESERVATION*\n` +
      `Ticket ID: #${ticketNumber}\n` +
      `Device: ${product.name} (${formData.color || product.selectedColor || 'Standard Edition'})\n` +
      `Online Deal Price: AED ${product.price} (Normal Mall Price: AED ${product.marketPrice} - 20% OFF)\n` +
      `Customer: ${formData.fullName || 'Valued Buyer'}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Email: ${formData.email || 'N/A'}\n` +
      `Location: ${formData.city}\n\n` +
      `⚠️ *STATUS:* Current batch stock is 0 (Sold Out). Please register my PRIORITY #1 spot for the incoming shipment arriving in 4 to 5 days (strictly 4-5 units allocation, First-Come, First-Served).\n\n` +
      `*Notice:* I understand this 20% discount is valid exclusively for online pre-reservations and not for standard in-store walk-ins.`
    );
    window.open(`https://wa.me/971507117043?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-red-500/40 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Scarcity Alert Ribbon */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-5 py-3 flex items-center justify-between text-xs font-black uppercase tracking-wider shrink-0 shadow-md">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 animate-bounce text-amber-200" />
            <span className="truncate">
              {isAr ? 'عرض أونلاين حصري • خصم 20% • غير متاح بالفرع دون حجز' : 'Online Exclusive • 20% OFF • Not Sold In-Store'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white ml-2 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">

          {/* ========================================================== */}
          {/* PHASE 1: CUSTOMER SEES UNITS LEFT & ENTERS BOOKING FORM    */}
          {/* ========================================================== */}
          {phase === 'initial_form' && (
            <div>
              {/* Live Scarcity Ticker */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <div className="text-xs font-black text-red-700 dark:text-red-300">
                    {isAr 
                      ? `المخزون الفعلي: متبقي ${currentStock} ${currentStock === 1 ? 'قطعة فقط!' : 'قطع فقط!'}` 
                      : `LIVE STOCK: ONLY ${currentStock} ${currentStock === 1 ? 'UNIT' : 'UNITS'} LEFT!`}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>{formatTimer(countdownSeconds)}</span>
                </div>
              </div>

              {/* Product Info Bar */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-brand-orange uppercase">{product.brand}</span>
                  <h4 className="font-black text-base text-gray-900 dark:text-white truncate">{product.name}</h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      AED {product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      AED {product.marketPrice}
                    </span>
                    <span className="text-[10px] font-black text-red-600 bg-red-100 dark:bg-red-950/60 px-1.5 py-0.5 rounded">
                      -20% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Viewers Social Proof */}
              <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300 font-medium mb-4 px-1">
                <Users className="w-3.5 h-3.5 text-brand-orange shrink-0 animate-pulse" />
                <span>
                  {isAr 
                    ? `يتصفح هذا الموديل حالياً ${activeViewers} شخصاً من الشارقة ودبي والسعودية`
                    : `${activeViewers} shoppers are currently viewing this deal from UAE & GCC`}
                </span>
              </div>

              {/* Online-Only Warning Banner */}
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-200 font-bold mb-4">
                🔒 {isAr
                  ? 'شرط الاستفادة: هذا السعر (خصم 20%) مخصص للطلب والحجز الإلكتروني عبر الموقع فقط، ولا يمكن شراؤه مباشرة من المحل دون تأكيد الحجز أونلاين.'
                  : 'Important Rule: This 20% discount is strictly valid for pre-registered online orders. Standard walk-in visitors at the shop counter pay normal mall prices.'}
              </div>

              {/* Booking Intake Form with Persistent Fields */}
              <form onSubmit={handleAttemptInitialBooking} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isAr ? 'مثال: محمد الشامسی' : 'e.g. Abdullah Al-Ketbi'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    {isAr ? 'رقم الهاتف والواتساب *' : 'Phone / WhatsApp Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    {isAr ? 'البريد الإلكتروني (لحفظ سجل التذكرة)' : 'Email Address (For Ticket Record)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-orange outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      {isAr ? 'الإمارة / الدولة' : 'Location / City'}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-brand-orange outline-none"
                    >
                      <option value="Sharjah">Sharjah (الشارقة)</option>
                      <option value="Dubai">Dubai (دبي)</option>
                      <option value="Abu Dhabi">Abu Dhabi (أبوظبي)</option>
                      <option value="Ajman">Ajman (عجمان)</option>
                      <option value="Saudi Arabia">Saudi Arabia (السعودية)</option>
                      <option value="Oman">Oman (عمان)</option>
                      <option value="Other">Other Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      {isAr ? 'اللون المطلوب' : 'Chosen Color'}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.color || product.selectedColor || 'Standard Edition'}
                      className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-750 text-gray-600 dark:text-gray-300 text-xs font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 via-brand-orange to-amber-600 hover:from-red-700 hover:to-orange-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer mt-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isAr 
                      ? `حجز القطعة بالخصم 20% (المتبقي: ${currentStock})` 
                      : `Claim Unit at 20% OFF (Stock: ${currentStock})`}
                  </span>
                </button>
              </form>

              {/* Direct Call & WhatsApp buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="tel:+971507117043"
                  className="py-2.5 px-3 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'اتصال مباشر' : 'Call Desk'}</span>
                </a>

                <button
                  onClick={handleAttemptInitialBooking}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تأكيد الحجز' : 'Lock on WhatsApp'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* PHASE 2: STOCK IS 0 (JUST DROPPED OR PERSISTENTLY FINISHED) */}
          {/* BUT 4-5 PIECES ARRIVING IN 4-5 DAYS EXCLUSIVE ONLINE       */}
          {/* ========================================================== */}
          {phase === 'stock_dropped_zero' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Sold Out Red Shock Banner */}
              <div className="p-4 rounded-2xl bg-red-600 text-white text-center shadow-lg shadow-red-600/30 relative overflow-hidden">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-red-600 mb-2 shadow-inner">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-xl sm:text-2xl font-black tracking-tight">
                  {alreadyClaimedBefore || product.stock === 0
                    ? (isAr ? 'المخزون الحالي: 0 (نفدت الكمية بالكامل)' : 'CURRENT STOCK: 0 (SOLD OUT!)')
                    : (isAr ? 'عفواً! تم حجز آخر قطعة للتو (المخزون: 0)' : 'STOCK: 0 — JUST FINISHED!')}
                </div>
                <p className="text-xs text-red-100 font-semibold mt-1 max-w-sm mx-auto">
                  {alreadyClaimedBefore || product.stock === 0
                    ? (isAr
                        ? 'هذا الموديل غير متوفر حالياً في مستودع الشارقة بسبب الإقبال الشديد، ولكن تم تسجيل بياناتك لحجز الشحنة القادمة.'
                        : 'All current warehouse units of this model are sold out. Your session is recognized for priority reservation in the incoming batch.')
                    : (isAr
                        ? 'أثناء قيامك بتعبئة البيانات، تم تأكيد شراء القطعة الأخيرة من قبل عميل آخر قبل 18 ثانية فقط.'
                        : 'While you were completing the reservation, the final remaining piece was claimed by another customer 18 seconds ago.')}
                </p>
              </div>

              {/* Product Snapshot */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-sm text-gray-900 dark:text-white truncate">{product.name}</h4>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-black">
                    AED {product.price} <span className="text-[10px] text-gray-400 line-through">AED {product.marketPrice}</span> (-20% OFF)
                  </div>
                </div>
              </div>

              {/* Incoming Shipment Batch Announcement (The Golden Solution) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:bg-amber-950/30 border-2 border-amber-500/40">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-black text-sm mb-1.5">
                  <Package className="w-5 h-5 text-amber-600 animate-bounce" />
                  <span>{isAr ? 'شحنة استيراد جديدة تصل خلال 4 إلى 5 أيام' : 'NEW BATCH ARRIVING IN 4 TO 5 DAYS!'}</span>
                </div>
                
                <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                  {isAr
                    ? `ستصل شحنة رسمية جديدة من ميناء دبي خلال 4 إلى 5 أيام. الكمية محدودة جداً وتصل بمعدل (4 إلى 5 قطع فقط لكل موديل).`
                    : `Our next direct import batch reaches our Sharjah hub in 4 to 5 days. Due to high international demand, strictly 4 to 5 units per model will be released.`}
                </p>

                {/* The 20% Online-Only First-Come Rule */}
                <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-300 dark:border-amber-700/60">
                  <div className="text-xs font-black text-red-600 dark:text-red-400 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'شرط البيع: أونلاين فقط وبأولوية الحجز المسبق' : 'RULE: Online Only & First-Come, First-Served'}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-normal">
                    {isAr
                      ? `هذه الشحنة مخصصة للبيع أونلاين عبر الموقع بسعر الجملة (خصم 20%). لن يتم بيعها داخل المحل بالشارقة بنفس السعر دون حجز مسبق. من يحجز أولاً يستلم أولاً!`
                      : `These incoming 4-5 units are 100% reserved for online website customers at 20% OFF. They will NOT be sold in physical store counters at this price. Lock your queue position now!`}
                  </p>
                </div>
              </div>

              {/* Verified Contact Details Section */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                  <span>{isAr ? 'بيانات المسجل للحجز (محفوظة في السجل):' : 'Customer Record (Persistently Saved):'}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">● System Saved</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400 block text-[10px]">NAME:</span>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Name"
                      className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">PHONE / WHATSAPP:</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971..."
                      className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons to Lock Priority Spot */}
              <div className="space-y-2.5 pt-1">
                <button
                  disabled={isSubmitting}
                  onClick={handleLockInboundPriority}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <Ticket className="w-5 h-5 text-emerald-200" />
                  <span>
                    {isSubmitting 
                      ? (isAr ? 'جاري حفظ السجل...' : 'Saving to System Database...') 
                      : (isAr ? 'احجز أسبقيتك في الشحنة القادمة (رقم 1)' : 'Lock Priority #1 in Incoming Batch (4-5 Pcs)')}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsAppPriority}
                    className="py-3 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'حجز فوري بالواتساب' : 'WhatsApp Priority'}</span>
                  </button>

                  <a
                    href="tel:+971507117043"
                    className="py-3 px-3 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isAr ? 'اتصال عاجل' : 'Call Desk'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================== */}
          {/* PHASE 3: CONFIRMED QUEUE TICKET & IMMEDIATE WHATSAPP/CALL */}
          {/* ========================================================== */}
          {phase === 'inbound_confirmed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-2 space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-black text-xs rounded-full inline-block mb-1.5">
                  {isAr ? 'تم حفظ بياناتك بنجاح في قاعدة البيانات!' : 'Saved to System Records & Priority Reserved!'}
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  {isAr ? 'تذكرتك مسجلة برقم أولوية #1' : 'Priority Ticket #1 Confirmed'}
                </h3>
              </div>

              {/* Digital Priority Boarding Ticket */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/50 text-left space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">TICKET REF:</span>
                  <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">#{ticketNumber}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">CUSTOMER:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{formData.fullName || 'Registered Buyer'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">DEVICE & COLOR:</span>
                    <span className="font-bold text-gray-900 dark:text-white truncate block">{product.name} ({formData.color || 'Selected'})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">LOCKED PRICE (20% OFF):</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">AED {product.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">SHIPMENT ARRIVAL:</span>
                    <span className="font-black text-amber-600 dark:text-amber-400">4 to 5 Days (4-5 units)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>⚡ First-Come, First-Served Policy.</span>
                  <span className="text-emerald-600 font-bold">✓ Cloud Saved</span>
                </div>
              </div>

              {/* Restock Notification Guarantee Alert Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                  <BellRing className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span>{isAr ? 'تنبيه إعادة التوفر التلقائي (Restock VIP Alert)' : 'AUTOMATED RESTOCK NOTIFICATION ACTIVE'}</span>
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {isAr
                    ? `✅ تم تسجيل بياناتك (رقم الهاتف والواتساب: ${formData.phone || 'مسجل'}، والبريد الإلكتروني: ${formData.email || 'مسجل'}) في نظام مستودع الشارقة. فور وصول الشحنة الجديدة وتحديث المخزون (Restock Update)، سيقوم فريقنا بالتواصل معك فوراً عبر الواتساب والإيميل لتسليمك جهازك بسعر الخصم الحصري قبل إتاحته للجمهور العام!`
                    : `✅ Your contact details (Phone/WhatsApp: ${formData.phone || 'Saved'}, Email: ${formData.email || 'Saved'}) are safely recorded in our Sharjah warehouse system. The moment the incoming batch arrives and inventory restocks, our sales desk will instantly contact you via WhatsApp and Email to release your reserved piece with the guaranteed discount before general public access!`}
                </p>
                <div className="flex items-center gap-4 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-emerald-200 dark:border-emerald-800/50">
                  <span className="flex items-center gap-1">📱 WhatsApp Alert: Active</span>
                  <span className="flex items-center gap-1">✉️ Email Notice: Scheduled</span>
                  <span className="flex items-center gap-1">✈️ GCC 24-48h Delivery</span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleWhatsAppPriority}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{isAr ? 'إرسال التذكرة وتثبيت الدور عبر الواتساب' : 'Send Ticket via WhatsApp (Lock Spot)'}</span>
                </button>

                <a
                  href="tel:+971507117043"
                  className="w-full py-3 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Store Desk: +971 50 711 7043</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
