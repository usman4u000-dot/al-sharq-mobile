import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ArrowRight, Image as ImageIcon, Sparkles, Shield, Cpu, Zap, CheckCircle2, MapPin, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ImageCarousel from '../components/ImageCarousel';
import iphone18LaunchImg from '../assets/images/iphone_18_launch_1789772590090.jpg';
import iphone18ColorsImg from '../assets/images/iphone_18_colors_1789772602359.jpg';

export default function GalleryPage() {
  const [selectedColor, setSelectedColor] = useState('cosmic-titanium');
  const [activeVisualTab, setActiveVisualTab] = useState<'launch' | 'lineup'>('launch');

  const iphone18Variants = [
    {
      id: 'cosmic-titanium',
      name: 'Cosmic Titanium',
      hex: '#3E4146',
      accentColor: 'from-slate-700 to-zinc-900',
      description: 'Aerospace-grade grade 5 polished titanium with micro-crystalline vapor deposition.',
      tag: 'Flagship Signature'
    },
    {
      id: 'desert-bronze',
      name: 'Desert Bronze Gold',
      hex: '#B88A58',
      accentColor: 'from-amber-600 to-stone-800',
      description: 'Lustrous warm dunes finish crafted specifically for Middle Eastern luxury elegance.',
      tag: 'Regional Best Seller'
    },
    {
      id: 'liquid-silver',
      name: 'Liquid Silver',
      hex: '#D9DCE3',
      accentColor: 'from-slate-200 to-slate-400',
      description: 'Hyper-reflective polished mirror alloy with anti-fingerprint oleophobic coating.',
      tag: 'Pure Elegance'
    },
    {
      id: 'midnight-emerald',
      name: 'Midnight Emerald',
      hex: '#18362D',
      accentColor: 'from-emerald-900 to-teal-950',
      description: 'Deep jewel-tone matte frosted glass with emerald crystal refraction.',
      tag: 'New Edition'
    },
    {
      id: 'deep-amber',
      name: 'Deep Amber',
      hex: '#BA4E19',
      accentColor: 'from-orange-600 to-amber-950',
      description: 'Dynamic volcanic ceramic tone with shifting sunset undertones.',
      tag: 'Special Collector'
    }
  ];

  const currentVariant = iphone18Variants.find(v => v.id === selectedColor) || iphone18Variants[0];
  const repairs = [
    {
      title: 'iPad Pro Smashed Screen',
      description: 'Complete display assembly replacement and frame straightening.',
      before: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=1000',
      after: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'MacBook Liquid Damage',
      description: 'Logic board ultrasonic cleaning and component-level micro-soldering.',
      before: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
      after: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'iPhone 14 Pro Back Glass',
      description: 'Laser back glass removal and OEM-quality replacement.',
      before: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=1000',
      after: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=1600',
      alt: 'Technician working on a logic board',
      caption: 'Precision micro-soldering under a digital trinocular microscope.'
    },
    {
      url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1600',
      alt: 'Disassembled smartphone on a repair mat',
      caption: 'Careful disassembly and organization of internal components.'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1600',
      alt: 'Testing electronic components',
      caption: 'Advanced diagnostic testing to pinpoint hardware failures.'
    },
    {
      url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1600',
      alt: 'Clean workspace with tools',
      caption: 'Our state-of-the-art, anti-static repair laboratory.'
    }
  ];

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/gallery" />
        <title>iPhone 18 Colors & Repair Gallery | Al Sharq Mobile Sharjah</title>
        <meta name="description" content="Explore the newly launched iPhone 18 and iPhone 18 Pro in Sharjah. High-resolution gallery, official color variants, specifications, and certified repairs at BLDG#1017 Fire Station Rd, Muwaileh." />
        <meta name="keywords" content="iPhone 18 launch UAE, iPhone 18 colors, iPhone 18 Pro Sharjah, iPhone 18 screen repair Muwaileh, Al Sharq Mobile Phone Fire Station Road" />
      </Helmet>
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* New iPhone 18 Dedicated Flagship Showcase */}
          <section className="mb-20">
            <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
              {/* Background ambient glow */}
              <div 
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] opacity-30 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: currentVariant.hex }}
              />

              <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-4 h-4" />
                  Newly Launched • Official UAE Showcase
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
                  The All-New <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white">iPhone 18 & 18 Pro</span>
                </h1>
                <p className="text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                  Now arrived in Sharjah. Explore all official colorways, groundbreaking architecture, and genuine repair & protective armor services available at <strong>Al Sharq Mobile Phone & Computer Trading LLC</strong> on Fire Station Road, Muwaileh.
                </p>

                {/* View switcher tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <button
                    onClick={() => setActiveVisualTab('launch')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeVisualTab === 'launch'
                        ? 'bg-brand-orange text-white shadow-lg'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Flagship Studio View
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('lineup')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeVisualTab === 'lineup'
                        ? 'bg-brand-orange text-white shadow-lg'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    All Colors Lineup
                  </button>
                </div>
              </div>

              {/* Main Visual Display & Interactive Selector Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Interactive Image Showcase */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 aspect-[16/10] flex items-center justify-center group">
                    <AnimatePresence mode="wait">
                      {activeVisualTab === 'launch' ? (
                        <motion.img
                          key="launch-img"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.4 }}
                          src={iphone18LaunchImg}
                          alt="New iPhone 18 Pro flagship smartphone launch"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <motion.img
                          key="colors-img"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.4 }}
                          src={iphone18ColorsImg}
                          alt="iPhone 18 Pro color variants lineup"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </AnimatePresence>

                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-black/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner shrink-0" 
                          style={{ backgroundColor: currentVariant.hex }}
                        />
                        <span className="font-semibold text-white truncate">{currentVariant.name}</span>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/15 text-[11px] text-amber-300 font-medium">
                          {currentVariant.tag}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px] sm:text-xs">Ceramic Shield 3.0</span>
                    </div>
                  </div>

                  {/* Quick specs pill row */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <Cpu className="w-4 h-4 text-brand-orange mx-auto mb-1" />
                      <div className="text-xs text-slate-400">Processor</div>
                      <div className="text-xs sm:text-sm font-bold text-white">A20 Pro (2nm)</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <Camera className="w-4 h-4 text-brand-orange mx-auto mb-1" />
                      <div className="text-xs text-slate-400">Optics</div>
                      <div className="text-xs sm:text-sm font-bold text-white">200MP Fusion</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <Zap className="w-4 h-4 text-brand-orange mx-auto mb-1" />
                      <div className="text-xs text-slate-400">Charging</div>
                      <div className="text-xs sm:text-sm font-bold text-white">45W Fast Charge</div>
                    </div>
                  </div>
                </div>

                {/* Right: Dynamic Color Selector & Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <span className="text-xs font-bold text-brand-orange tracking-wider uppercase">Choose Color Finish</span>
                    <h3 className="text-2xl font-bold text-white mt-1 mb-2">{currentVariant.name}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {currentVariant.description}
                    </p>

                    {/* Color Swatch Picker */}
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400 font-medium">Available Official Finishes:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {iphone18Variants.map((variant) => {
                          const isSelected = variant.id === selectedColor;
                          return (
                            <button
                              key={variant.id}
                              onClick={() => setSelectedColor(variant.id)}
                              className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'bg-white/15 border-brand-orange shadow-md shadow-brand-orange/20 scale-[1.02]'
                                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                                  isSelected ? 'border-white ring-2 ring-brand-orange' : 'border-white/30'
                                }`}
                                style={{ backgroundColor: variant.hex }}
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-white truncate">{variant.name}</div>
                                <div className="text-[10px] text-slate-400 truncate">{variant.tag}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Shop & Service Guarantee Box */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                      <Shield className="w-4 h-4" />
                      Sharjah iPhone 18 Dedicated Support:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span>iPhone 18 9H Ceramic Screen Protectors installed in 5 mins</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span>Same-day display & back-glass laser restoration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span>Data migration from old iPhone to iPhone 18</span>
                      </li>
                    </ul>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <Link
                        to="/iphone-repair"
                        className="flex-1 bg-brand-orange hover:bg-orange-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>iPhone 18 Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href="https://maps.app.goo.gl/WRjUv6FxCVTtZCEk8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/15 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Visit Muwaileh Shop</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-2xl mb-6">
              <Camera className="w-8 h-8 text-brand-blue dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6">
              Before & After Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Drag the slider to see the transformation. We take pride in restoring devices that others say are "unfixable."
            </p>
          </div>

          <div className="space-y-20 mb-24">
            {repairs.map((repair, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{repair.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{repair.description}</p>
                </div>
                <BeforeAfterSlider beforeImage={repair.before} afterImage={repair.after} />
              </motion.div>
            ))}
          </div>

          <div className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-6">
                <ImageIcon className="w-8 h-8 text-brand-orange" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Inside Our Lab
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Take a look at our state-of-the-art repair facility and the precision work we do every day.
              </p>
            </div>
            
            <ImageCarousel images={carouselImages} autoPlayInterval={4000} />
          </div>

          <div className="mt-20 text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1">
              Book Your Repair
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
