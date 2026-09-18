import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, CheckCircle, Smartphone, Laptop, Tablet, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const devices = [
  {
    id: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    category: 'Smartphone',
    price: 2499,
    condition: 'Excellent',
    storage: '256GB',
    color: 'Sierra Blue',
    batteryHealth: '92%',
    warranty: '6 Months',
    stock: 2,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=2070&auto=format&fit=crop',
    features: ['ProMotion 120Hz Display', 'A15 Bionic Chip', 'Pro Camera System']
  },
  {
    id: 'macbook-air-m1',
    name: 'MacBook Air M1',
    category: 'Laptop',
    price: 2899,
    condition: 'Like New',
    storage: '256GB SSD',
    ram: '8GB Unified Memory',
    color: 'Space Gray',
    batteryHealth: '98%',
    warranty: '6 Months',
    stock: 1,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop',
    features: ['Apple M1 Chip', 'Retina Display', 'Up to 18 hours battery']
  },
  {
    id: 'ipad-pro-11',
    name: 'iPad Pro 11" (M1)',
    category: 'Tablet',
    price: 2199,
    condition: 'Very Good',
    storage: '128GB',
    color: 'Silver',
    batteryHealth: '89%',
    warranty: '6 Months',
    stock: 4,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2027&auto=format&fit=crop',
    features: ['Apple M1 Chip', 'Liquid Retina Display', 'Face ID']
  },
  {
    id: 'samsung-s22-ultra',
    name: 'Samsung Galaxy S22 Ultra',
    category: 'Smartphone',
    price: 2299,
    condition: 'Excellent',
    storage: '256GB',
    color: 'Phantom Black',
    batteryHealth: '95%',
    warranty: '6 Months',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?q=80&w=1974&auto=format&fit=crop',
    features: ['S Pen Included', '108MP Camera', 'Dynamic AMOLED 2X']
  }
];

export default function PreOwnedDevices() {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id]);
      } else {
        alert("You can only compare up to 3 devices at a time.");
      }
    }
  };

  const comparedDevices = devices.filter(d => compareList.includes(d.id));

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-semibold">
                <CheckCircle className="w-4 h-4" /> 50-Point Inspection
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-brand-blue dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold">
                <CheckCircle className="w-4 h-4" /> Shop Warranty Included
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-brand-blue dark:text-white mb-4 flex items-center gap-3">
              "Al Sharq Certified" Pre-Owned Devices
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Inventory
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Looking for the best place to buy cheap mobiles in Sharjah? Every "Al Sharq Certified" device undergoes a rigorous 50-point inspection and comes complete with our comprehensive shop warranty.
            </p>
          </motion.div>
          
          {compareList.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsCompareModalOpen(true)}
              className="mt-6 md:mt-0 px-6 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2"
            >
              Compare ({compareList.length}) Devices
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src={device.image} 
                  alt={device.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {device.condition}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-brand-orange text-xs font-bold px-3 py-1 rounded-full shadow-md border border-brand-orange/20">
                  {device.stock} in stock
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-brand-blue dark:text-white">
                    {device.name}
                  </h3>
                  <span className="text-lg font-bold text-brand-orange">
                    AED {device.price}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex gap-2 flex-wrap">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{device.storage}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{device.color}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Batt: {device.batteryHealth}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {device.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 mt-auto">
                  <button 
                    className="flex-1 bg-brand-blue text-white py-2 rounded-xl font-medium hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy
                  </button>
                  <button 
                    onClick={() => toggleCompare(device.id)}
                    className={`px-4 py-2 rounded-xl font-medium border transition-colors ${
                      compareList.includes(device.id) 
                        ? 'bg-brand-orange border-brand-orange text-white' 
                        : 'border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-brand-orange hover:text-brand-orange'
                    }`}
                  >
                    {compareList.includes(device.id) ? 'Added' : 'Compare'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-brand-blue dark:text-white">Device Comparison</h3>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-slate-200 dark:border-slate-700 w-1/4">Feature</th>
                    {comparedDevices.map(device => (
                      <th key={device.id} className="p-4 border-b border-slate-200 dark:border-slate-700 w-1/4">
                        <div className="text-center">
                          <img src={device.image} alt={device.name} className="w-24 h-24 object-cover rounded-lg mx-auto mb-2" loading="lazy" />
                          <h4 className="font-bold text-brand-blue dark:text-white">{device.name}</h4>
                          <p className="text-brand-orange font-bold">AED {device.price}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300">
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Category</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.category}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Condition</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.condition}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Storage</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.storage}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Color</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.color}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Battery Health</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.batteryHealth}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Warranty</td>
                    {comparedDevices.map(device => <td key={device.id} className="p-4 border-b border-slate-100 dark:border-slate-800 text-center">{device.warranty}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Key Features</td>
                    {comparedDevices.map(device => (
                      <td key={device.id} className="p-4 text-center">
                        <ul className="text-sm space-y-1 inline-block text-left">
                          {device.features.map((f, i) => <li key={i}>• {f}</li>)}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
