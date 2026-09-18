import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Camera, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ImageCarousel from '../components/ImageCarousel';

export default function GalleryPage() {
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
        <title>Repair Gallery | Al Sharq Mobile Phone</title>
        <meta name="description" content="See our before and after repair gallery. We bring dead devices back to life with precision micro-soldering and OEM parts." />
      </Helmet>
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
