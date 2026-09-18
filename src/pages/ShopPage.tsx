import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ShoppingCart, Smartphone, Star, Shield, Zap, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreOwnedDevices from '../components/PreOwnedDevices';

export default function ShopPage() {
  const [filter, setFilter] = useState('All');

  const products = [
    {
      id: 1,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      price: "AED 4,699",
      condition: "Brand New",
      specs: ["256GB Storage", "A19 Pro Chip", "48MP Triple Camera"],
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      badge: "Top Suggestion",
      category: "Phones"
    },
    {
      id: 2,
      name: "Samsung Galaxy S26 Ultra",
      brand: "Samsung",
      price: "AED 4,899",
      condition: "Brand New",
      specs: ["512GB Storage", "Snapdragon 8 Gen 4", "200MP Camera"],
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
      badge: "Best for Photography",
      category: "Phones"
    },
    {
      id: 3,
      name: "MacBook Pro 16\"",
      brand: "Apple",
      price: "AED 9,499",
      condition: "Brand New",
      specs: ["M4 Max Chip", "32GB RAM", "1TB SSD"],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
      badge: "Powerhouse",
      category: "Laptops"
    },
    {
      id: 4,
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      price: "AED 3,899",
      condition: "Refurbished - Pristine",
      specs: ["256GB Storage", "A18 Pro Chip", "98% Battery Health"],
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
      badge: "Great Value",
      category: "Refurbished"
    },
    {
      id: 5,
      name: "Samsung Galaxy Z Fold 7",
      brand: "Samsung",
      price: "AED 5,499",
      condition: "Brand New",
      specs: ["512GB Storage", "Foldable OLED", "S-Pen Support"],
      image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800",
      badge: "Productivity King",
      category: "Phones"
    },
    {
      id: 6,
      name: "iPad Pro 13\"",
      brand: "Apple",
      price: "AED 4,299",
      condition: "Brand New",
      specs: ["M4 Chip", "OLED Display", "256GB Storage"],
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      badge: "Creative Pro",
      category: "Tablets"
    },
    {
      id: 7,
      name: "Samsung Galaxy S25 Ultra",
      brand: "Samsung",
      price: "AED 3,499",
      condition: "Refurbished - Excellent",
      specs: ["256GB Storage", "Snapdragon 8 Gen 3", "100% Battery Health"],
      image: "https://images.unsplash.com/photo-1610945265064-320109515029?auto=format&fit=crop&q=80&w=800",
      badge: "Bestseller",
      category: "Refurbished"
    },
    {
      id: 8,
      name: "Custom Gaming PC",
      brand: "Custom Build",
      price: "AED 8,999",
      condition: "Brand New",
      specs: ["RTX 4080 Super", "Intel i9 14900K", "32GB DDR5"],
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800",
      badge: "Ultimate Gaming",
      category: "Computers"
    },
    {
      id: 9,
      name: "iPhone 15 Pro",
      brand: "Apple",
      price: "AED 2,899",
      condition: "Refurbished - Good",
      specs: ["128GB Storage", "A17 Pro Chip", "90% Battery Health"],
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      badge: "Budget Friendly",
      category: "Refurbished"
    },
    {
      id: 10,
      name: "Sony Xperia 1 VIII 5G",
      brand: "Sony",
      price: "AED 4,899",
      condition: "Brand New",
      specs: ["256GB Storage", "4K OLED", "Continuous Optical Zoom"],
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d6?auto=format&fit=crop&q=80&w=800",
      badge: "Creator Choice",
      category: "Phones"
    },
    {
      id: 11,
      name: "Samsung Galaxy A57 5G",
      brand: "Samsung",
      price: "AED 1,699",
      condition: "Brand New",
      specs: ["256GB Storage", "Super AMOLED", "Awesome Camera"],
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
      badge: "Mid-Range King",
      category: "Phones"
    },
    {
      id: 12,
      name: "Honor 600 Pro 5G",
      brand: "Honor",
      price: "AED 3,299",
      condition: "Brand New",
      specs: ["512GB Storage", "Silicon-Carbon Battery", "100W Charging"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Flagship Killer",
      category: "Phones"
    },
    {
      id: 13,
      name: "Samsung Galaxy A17 5G",
      brand: "Samsung",
      price: "AED 899",
      condition: "Brand New",
      specs: ["128GB Storage", "90Hz Display", "5000mAh Battery"],
      image: "https://images.unsplash.com/photo-1610945265064-320109515029?auto=format&fit=crop&q=80&w=800",
      badge: "Budget Hero",
      category: "Phones"
    },
    {
      id: 14,
      name: "Xiaomi Redmi Note 15 5G (Global)",
      brand: "Xiaomi",
      price: "AED 1,099",
      condition: "Brand New",
      specs: ["256GB Storage", "120Hz AMOLED", "108MP Camera"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Great Value",
      category: "Phones"
    },
    {
      id: 15,
      name: "OnePlus Nord CE6 5G",
      brand: "OnePlus",
      price: "AED 1,299",
      condition: "Brand New",
      specs: ["256GB Storage", "OxygenOS", "Smooth 120Hz"],
      image: "https://images.unsplash.com/photo-1574719859265-25ac2dd3beaf?auto=format&fit=crop&q=80&w=800",
      badge: "Smooth UI",
      category: "Phones"
    },
    {
      id: 16,
      name: "vivo X300 FE 5G",
      brand: "vivo",
      price: "AED 2,499",
      condition: "Brand New",
      specs: ["256GB Storage", "Zeiss Optics", "Dimensity Chip"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Fan Edition",
      category: "Phones"
    },
    {
      id: 17,
      name: "Samsung Galaxy A56",
      brand: "Samsung",
      price: "AED 1,399",
      condition: "Brand New",
      specs: ["128GB Storage", "Great Battery", "Versatile Camera"],
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
      badge: "Balanced",
      category: "Phones"
    },
    {
      id: 18,
      name: "Honor Magic8 Pro 5G",
      brand: "Honor",
      price: "AED 3,999",
      condition: "Brand New",
      specs: ["512GB Storage", "Triple 50MP Cameras", "Silicon-Carbon Battery"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Flagship",
      category: "Phones"
    },
    {
      id: 19,
      name: "Honor 600 5G",
      brand: "Honor",
      price: "AED 2,499",
      condition: "Brand New",
      specs: ["256GB Storage", "Ultra-thin Design", "Vlog Camera"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Premium Mid-Range",
      category: "Phones"
    },
    {
      id: 20,
      name: "Honor X9d 5G",
      brand: "Honor",
      price: "AED 1,299",
      condition: "Brand New",
      specs: ["256GB Storage", "Drop-resistant Display", "5800mAh Battery"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Durable Choice",
      category: "Phones"
    },
    {
      id: 21,
      name: "Honor 600 Lite 5G",
      brand: "Honor",
      price: "AED 999",
      condition: "Brand New",
      specs: ["128GB Storage", "Featherweight", "High-res Camera"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Budget Friendly",
      category: "Phones"
    },
    {
      id: 22,
      name: "Honor Play11 Plus 5G",
      brand: "Honor",
      price: "AED 899",
      condition: "Brand New",
      specs: ["128GB Storage", "Large Display", "Gaming Focus"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "Budget Gaming",
      category: "Phones"
    }
  ];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <>
      <Helmet>
        <title>Shop Devices | Al Sharq Mobile Phone | أفضل محل هواتف في الشارقة</title>
        <meta name="description" content="Browse our curated selection of the latest smartphones, laptops, tablets, and premium refurbished devices. Trade-in your old device for the best value in Sharjah. موبايلات للبيع في الشارقة، أرخص أسعار الموبايلات، عروض الموبايلات اليوم." />
        <meta name="keywords" content="هواتف ذكية الشارقة, موبايلات للبيع في الشارقة, أرخص أسعار الموبايلات, موبايلات مستعملة الشارقة, إكسسوارات جوالات, أفضل محل هواتف في الشارقة, عروض الموبايلات اليوم, كم سعر آيفون 17 برو ماكس في الشارقة؟" />
        <link rel="canonical" href="https://allsharq.com/shop" />
      </Helmet>
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-2xl mb-6">
              <ShoppingCart className="w-8 h-8 text-brand-blue dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6">
              Suggested Devices
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Looking for an upgrade? We offer the latest flagship devices, laptops, and premium refurbished tech, all backed by our Al Sharq quality guarantee.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <Shield className="w-8 h-8 text-brand-orange" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">1-Year Warranty</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">On all new devices</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <Tag className="w-8 h-8 text-brand-orange" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Trade-In Offers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get cash for your old phone</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-brand-orange" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Quality Checked</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rigorous 40-point inspection</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Phones', 'Laptops', 'Tablets', 'Computers', 'Refurbished'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === cat 
                    ? 'bg-brand-blue text-white' 
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img loading="lazy" src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full shadow-md">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md backdrop-blur-md ${
                      product.category !== 'Refurbished' 
                        ? 'bg-white/90 text-brand-blue dark:bg-slate-800/90 dark:text-blue-400' 
                        : 'bg-green-500/90 text-white'
                    }`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{product.brand}</p>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-brand-blue dark:text-blue-400">{product.price}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-8 flex-1">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Zap className="w-4 h-4 text-brand-orange shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-sm">
                      Buy Now
                    </button>
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                      Trade-In
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pre-Owned Devices Section */}
          <div className="mt-20">
            <PreOwnedDevices />
          </div>

          {/* Trade-in CTA */}
          <div className="mt-20 bg-brand-blue dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Have an old phone to trade?</h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                We offer the best market rates for your used or broken devices. Trade it in and get an instant discount on your new purchase.
              </p>
              <Link to="/estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1">
                Get Trade-In Value
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
