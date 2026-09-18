import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  CheckCircle, 
  Search, 
  FileText, 
  Wrench, 
  CheckSquare,
  MessageCircle,
  Laptop,
  Monitor,
  HardDrive,
  Thermometer,
  Smartphone,
  Headphones,
  Briefcase,
  Sparkles,
  Printer
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  return (
    <section id="services" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-brand-orange font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2">Our Expertise</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-blue dark:text-white mb-3 sm:mb-6">Professional Tech Solutions</h3>
          <p className="text-base sm:text-xl text-brand-blue/80 dark:text-gray-300 font-medium max-w-3xl mx-auto mb-3">
            Positioning Al Sharq Mobile as the high-end engineering alternative to expensive agency repairs in the UAE.
          </p>
          <p className="text-xs sm:text-base text-brand-grey dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you need an <strong>iPad repair</strong>, a <strong>MacBook repair</strong>, or a <strong>Samsung Galaxy repair</strong>, our technicians follow a rigorous diagnostic protocol. We handle everything from <strong>battery replacement</strong> and <strong>charging port repair</strong> to critical <strong><Link to="/data-recovery" className="hover:text-brand-orange transition-colors underline">data recovery</Link></strong> and <strong>water damage repair</strong>.
          </p>
        </div>

        {/* I. Specialized Technical Services */}
        <div className="mb-14 sm:mb-24">
          <div className="mb-8 sm:mb-12 text-center">
            <h4 className="text-2xl sm:text-3xl font-bold text-brand-blue dark:text-white mb-2 sm:mb-4">I. Specialized Technical Services</h4>
            <p className="text-sm sm:text-lg text-brand-grey dark:text-gray-400">Precision engineering for the modern professional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <ServiceDetailCard 
              icon={Laptop}
              title="1. Advanced MacBook & Logic Board Repair"
              service="Expert chip-level repairs for MacBook M1, M2, M3, and M4 series."
              edge="We specialize in Micro-Soldering. Instead of replacing the entire expensive motherboard like official agencies, we repair specific chips and circuits. This saves you up to 60% in costs and protects your data."
              onQuote={() => onBookService('MacBook Logic Board Repair')}
            />
            <ServiceDetailCard 
              icon={Printer}
              title="2. Expert Printer Maintenance (Noor’s Printer)"
              service="Specialized maintenance for HP, Canon, Epson, Samsung, Brother, and plotters across UAE."
              edge="We offer fast on-site repair, no hidden charges, and service warranties for homes and businesses."
              onQuote={() => onBookService('Printer Maintenance Inquiry')}
              badge="Added 2026"
            />
            <ServiceDetailCard 
              icon={Monitor}
              title="3. Express Laptop Screen Replacement"
              service="High-quality screen fixes for all major brands (Dell, HP, Lenovo, ASUS, and Apple)."
              edge="Same-Day Service for students in University City and residents in Muwaileh. We use Grade-A+ panels that match original brightness and color accuracy."
              onQuote={() => onBookService('Laptop Screen Replacement')}
            />
            <ServiceDetailCard 
              icon={HardDrive}
              title="4. Performance & Speed Optimization (SSD/RAM)"
              service="Upgrading slow Hard Drives to ultra-fast NVMe SSDs and increasing RAM capacity."
              edge="Don't buy a new laptop; make your current one faster than new. We handle the full data migration so you don't lose a single file."
              onQuote={() => onBookService('Performance Optimization')}
            />
            <ServiceDetailCard 
              icon={Thermometer}
              title="5. Gaming Laptop Thermal Management"
              service="Deep cleaning, fan repair, and professional thermal repasting for high-end rigs (MSI, Razer, Alienware, ROG)."
              edge="We use premium thermal compounds (like Liquid Metal or Thermal Grizzly) to stop overheating and fix FPS drops during heavy gaming."
              onQuote={() => onBookService('Gaming Laptop Thermal Management')}
              badge="Added 2026"
            />
          </div>
        </div>

        {/* II. Premium Product Range */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h4 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">II. Premium Product Range</h4>
            <p className="text-lg text-brand-grey dark:text-gray-400">Curated accessories and devices for the tech-savvy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              icon={Smartphone}
              title="1. Smartphones & Tablets"
              items={[
                "Original and factory-sealed units of the latest iPhone, Samsung Galaxy, and Huawei series.",
                "Professional-grade iPads and Tablets for education and business use."
              ]}
              onQuote={() => onBookService('Smartphones & Tablets Inquiry')}
            />
            <ProductCard 
              icon={ShieldCheck}
              title="2. Protection & Style Accessories"
              items={[
                "Durable Cases: From sleek silicon to heavy-duty military-grade drop protection.",
                "Screen Shields: Premium tempered glass with oleophobic coatings to resist fingerprints."
              ]}
              onQuote={() => onBookService('Accessories Inquiry')}
            />
            <ProductCard 
              icon={Zap}
              title="3. Charging & Power Solutions"
              items={[
                "Fast Chargers: Wall adapters supporting PD (Power Delivery) for laptops and phones.",
                "Premium Cables: Braided, high-durability USB-C and Lightning cables that won't fray."
              ]}
              onQuote={() => onBookService('Power Solutions Inquiry')}
            />
            <ProductCard 
              icon={Headphones}
              title="4. Audio & Connectivity"
              items={[
                "High-fidelity Headphones and portable Bluetooth speakers.",
                "Reliable storage solutions: High-speed Micro SD cards and USB 3.2 flash drives."
              ]}
              onQuote={() => onBookService('Audio & Connectivity Inquiry')}
            />
          </div>
        </div>

        {/* III. B2B & Wholesale Supply */}
        <div className="mb-24">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mb-6">
                  <Briefcase className="w-8 h-8 text-brand-blue dark:text-blue-400" />
                </div>
                <h4 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">III. B2B & Wholesale Supply</h4>
                <p className="text-xl text-brand-grey dark:text-gray-300 font-medium mb-6">Your partner in electronics distribution.</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  As a leading Wholesale Supplier in the UAE, we provide bulk quantities of mobile and computer accessories to retailers and corporate offices.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white">Competitive Pricing:</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">Tiered pricing for bulk orders.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white">Doorstep Delivery:</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">Fast logistics across Sharjah, Dubai, and Abu Dhabi.</span>
                    </div>
                  </li>
                </ul>
                <button 
                  onClick={() => onBookService('B2B Wholesale Inquiry')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors shadow-md"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2070&auto=format&fit=crop" 
                  alt="B2B Wholesale Electronics Supply" 
                  className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-video"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Repair Process */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700 mb-16 transition-colors overflow-hidden relative">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
             <div className="lg:w-1/2">
                <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-4">The Al Sharq Mobile Phone & Computer Trading LLC "4-Step Repair Process"</h4>
                <p className="text-brand-grey dark:text-gray-400 text-lg leading-relaxed">To ensure quality, every device that enters our lab goes through this journey. We believe in transparency and precision at every stage.</p>
             </div>
             <div className="lg:w-1/2 w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop" 
                  alt="Repair Process Workflow" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep 
              number="01"
              icon={Search}
              title="Diagnostic"
              description="A thorough test to identify the root cause (so you don't pay for parts you don't need)."
            />
            <ProcessStep 
              number="02"
              icon={FileText}
              title="Quote & Approval"
              description="We provide a transparent, upfront price. No hidden fees."
            />
            <ProcessStep 
              number="03"
              icon={Wrench}
              title="Precision Repair"
              description="Our techs perform the fix in an ESD-safe (Electrostatic Discharge) environment."
            />
            <ProcessStep 
              number="04"
              icon={CheckSquare}
              title="Quality Control (QC)"
              description="Every device is tested against a post-repair checklist before we hand it back to you."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-brand-blue dark:bg-slate-800 rounded-3xl p-12 relative overflow-hidden transition-colors">
          <div className="absolute inset-0 bg-brand-orange/10 pattern-grid-lg opacity-10"></div>
          <div className="relative z-10">
            <h4 className="text-3xl font-bold text-white mb-8">Need a fast quote for your repair?</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/971507117043" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with us on WhatsApp
              </a>
              <button 
                onClick={() => onBookService('General Inquiry')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ServiceDetailCard({ icon: Icon, title, service, edge, onQuote, badge }: { icon: any, title: string, service: string, edge: string, onQuote: () => void, badge?: string }) {
  return (
    <SpotlightCard 
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer"
    >
      <div className="relative z-10 flex-grow flex flex-col">
          {badge && (
            <div className="absolute top-0 right-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {badge}
            </div>
          )}
          <motion.div 
            variants={{
              hover: { scale: 1.15, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
              tap: { scale: 0.95 }
            }}
            whileHover="hover"
            whileTap="tap"
            className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors"
          >
            <Icon className="h-7 w-7 text-brand-blue dark:text-blue-400 group-hover:text-brand-orange transition-colors" />
          </motion.div>
          <h5 className="text-xl font-bold text-brand-blue dark:text-white mb-4">{title}</h5>
          <div className="mb-4 flex-grow">
            <p className="text-gray-900 dark:text-gray-200 font-medium mb-2">
              <span className="text-brand-orange font-bold mr-2">The Service:</span>
              {service}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="text-brand-blue dark:text-blue-400 font-bold mr-2">The Edge:</span>
              {edge}
            </p>
          </div>
          <button 
            onClick={onQuote}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-brand-blue hover:text-white dark:bg-slate-700 dark:hover:bg-brand-blue text-brand-blue dark:text-white rounded-xl font-semibold transition-colors border border-slate-200 dark:border-slate-600 hover:border-transparent cursor-pointer relative z-10"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4" />
          </button>
      </div>
    </SpotlightCard>
  );
}

function ProductCard({ icon: Icon, title, items, onQuote }: { icon: any, title: string, items: string[], onQuote: () => void }) {
  return (
    <SpotlightCard 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group flex flex-col h-full cursor-pointer"
    >
      <div className="relative z-10 flex-grow flex flex-col">
          <motion.div 
            variants={{
              hover: { scale: 1.15, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
              tap: { scale: 0.95 }
            }}
            whileHover="hover"
            whileTap="tap"
            className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue/5 dark:group-hover:bg-white/5 transition-colors"
          >
            <Icon className="h-6 w-6 text-brand-blue dark:text-blue-400 group-hover:text-brand-orange transition-colors" />
          </motion.div>
          <h5 className="text-lg font-bold text-brand-blue dark:text-white mb-4">{title}</h5>
          <ul className="space-y-3 mb-6 flex-grow">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button 
            onClick={onQuote}
            className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-brand-blue dark:text-white rounded-lg font-medium transition-colors text-sm relative z-10"
          >
            Get a Free Quote
          </button>
      </div>
    </SpotlightCard>
  );
}

function ProcessStep({ number, icon: Icon, title, description }: { number: string, icon: any, title: string, description: string }) {
  return (
    <motion.div 
      className="relative group cursor-pointer"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute -top-8 -left-4 select-none -z-10 transition-colors">
        {number}
      </div>
      <motion.div 
        variants={{
          hover: { scale: 1.15, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
          tap: { scale: 0.95 }
        }}
        className="mb-4 inline-block p-3 bg-brand-blue dark:bg-blue-600 rounded-xl text-white shadow-lg shadow-brand-blue/20"
      >
        <Icon className="h-6 w-6 group-hover:text-brand-orange transition-colors" />
      </motion.div>
      <h5 className="text-lg font-bold text-brand-blue dark:text-white mb-2">{title}</h5>
      <p className="text-brand-grey dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}