import React, { useState } from 'react';
import { Star, ShoppingBag, Phone, MessageCircle, Sparkles, Tag, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlashSaleReservationModal, { FlashSaleItem } from './FlashSaleReservationModal';
import UAEDirhamSymbol from './UAEDirhamSymbol';
import { useLanguage } from '../contexts/LanguageContext';

const products = [
  {
    id: 1,
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    marketPrice: 5299,
    price: 4240,
    savingsAED: 1059,
    savings: 'Save AED 1,059 (20% OFF)',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: '20% OFF Flagship',
    description: '256GB, 2nm A20 Pro Bionic, 200MP Quad Camera. Sealed with Apple warranty.',
    color: 'Cosmic Titanium'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S26 Ultra',
    brand: 'Samsung',
    marketPrice: 4999,
    price: 3999,
    savingsAED: 1000,
    savings: 'Save AED 1,000 (20% OFF)',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: '20% Below Mall',
    description: '512GB, Snapdragon 8 Gen 5, 200MP ISOCELL Zoom, Embedded S-Pen.',
    color: 'Titanium Silver'
  },
  {
    id: 3,
    name: 'Huawei Mate 70 Pro 5G',
    brand: 'Huawei',
    marketPrice: 3999,
    price: 3199,
    savingsAED: 800,
    savings: 'Save AED 800 (20% OFF)',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Special Deal',
    description: '512GB, Kunlun Glass 3, XMAGE Camera, HarmonyOS Global Edition.',
    color: 'Obsidian Black'
  },
  {
    id: 4,
    name: 'MacBook Pro 16" (M4 Max)',
    brand: 'Apple',
    marketPrice: 11999,
    price: 9599,
    savingsAED: 2400,
    savings: 'Save AED 2,400 (20% OFF)',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Powerhouse Deal',
    description: 'M4 Max (16-Core CPU), 36GB RAM, 1TB SSD. Factory sealed with 1-Year Apple warranty.',
    color: 'Space Black'
  }
];

export default function Shop() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [modalProduct, setModalProduct] = useState<FlashSaleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenFlashScarcity = (p: typeof products[0]) => {
    setModalProduct({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      marketPrice: p.marketPrice,
      savingsAED: p.savingsAED,
      selectedColor: p.color,
      image: p.image
    });
    setIsModalOpen(true);
  };

  return (
    <section id="shop" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/10 text-red-600 dark:text-red-400 font-extrabold text-xs rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'بيع بالجملة للمستهلك • خصم 20% حصري أونلاين' : 'Wholesale To Consumer • 20% Below Mall Prices'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue dark:text-white mb-3">
              {isAr ? 'متجر الشرق للهواتف: خصم 20% على أحدث الموديلات' : 'Al Sharq Mobile Store: 20% Off Flagships'}
            </h2>
            <p className="text-brand-grey dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'اشترِ أحدث الهواتف وأجهزة ماك بوك الأصلية المختومة بأسعار الاستيراد المباشر. عرض الـ 20% مخصص حصرياً للطلبات عبر الموقع.'
                : 'Buy brand new sealed smartphones and MacBooks directly at wholesale prices. Al Sharq passes direct import savings to customers in Sharjah and across the GCC with our 20% online exclusive discount.'}
            </p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white font-bold hover:bg-orange-600 transition-colors whitespace-nowrap shadow-sm">
            <span>{isAr ? 'عرض جميع هواتف الـ 20%' : 'View All 20% OFF Deals'}</span>
            <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-700 mb-4 relative">
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full z-10 shadow-md">
                    {product.tag}
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-base font-black text-brand-blue dark:text-white group-hover:text-brand-orange transition-colors line-clamp-1 mb-1">
                  {product.name}
                </h3>
                
                {/* 20% Discounted Pricing Box with Dirham Symbol */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700 mb-3">
                  <div className="text-xs text-gray-400 line-through font-semibold">
                    Mall Price: AED {product.marketPrice}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="flex items-center gap-1 text-xl font-black text-emerald-600 dark:text-emerald-400">
                      <UAEDirhamSymbol size={18} className="text-emerald-600 dark:text-emerald-400" />
                      <span>{product.price}</span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">AED</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                      -20%
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-bold">
                    <span className="text-amber-800 dark:text-amber-300">⚡ Online Only</span>
                    <span className="text-red-600 dark:text-red-400 flex items-center gap-1 font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                      Stock: 1 left
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 font-semibold ml-1">(5.0 Rating • Sealed)</span>
                </div>

                {/* Primary Button Triggering The Scarcity Booking System */}
                <button
                  onClick={() => handleOpenFlashScarcity(product)}
                  className="w-full py-2.5 mb-2 bg-gradient-to-r from-red-600 via-brand-orange to-amber-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition-transform active:scale-95 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حجز القطعة بالخصم (20%)' : 'Claim 20% Online Deal'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+971507117043"
                    className="py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors text-center"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Store</span>
                  </a>
                  <button
                    onClick={() => handleOpenFlashScarcity(product)}
                    className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-md">
            <span>{isAr ? 'عرض جميع المنتجات (خصم 20%)' : 'View All Products (20% OFF)'}</span>
            <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Global Flash Scarcity & Priority Allocation Modal */}
      <FlashSaleReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={modalProduct}
      />
    </section>
  );
}
