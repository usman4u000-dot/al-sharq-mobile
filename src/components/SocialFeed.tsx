import React from 'react';
import { Instagram, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const posts = [
  {
    id: 1,
    title: 'The "Expert vs. Amateur"',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    caption: '🛠️ Not just a parts-swapper. While others offer basic "van repairs," Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) provides industrial-grade Specialist Tech Support in our fully equipped Sharjah lab. Complex motherboard issues and micro-soldering require a static-free environment and precision tools. Trust the experts who have been fixing Sharjah’s tech since 2014.\n\n📍 Visit us in Muwaileh for a professional diagnostic.\n#SharjahTech #MotherboardRepair #AlSharqMobilephoneLLC',
    link: 'https://wa.me/971507117043'
  },
  {
    id: 2,
    title: 'The "Hyper-Local" Authority',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop',
    caption: '📍 Your Neighborhood Tech Partner. Skip the wait for a technician to drive from Dubai. We are right here in the heart of Sharjah! Whether you need a Same-day Screen Repair or a high-speed SSD Upgrade for Laptops, our team is ready to help. Supporting the local Muwaileh and Al Jada community with honest pricing and expert care for over 12 years.\n\n💬 Message us for a free quote!\n#Muwaileh #SharjahBusiness #LaptopRepairSharjah',
    link: 'https://wa.me/971507117043'
  },
  {
    id: 3,
    title: 'The "Resale Value"',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop',
    caption: '🔄 Upgrade the Smart Way. Looking to engage in Smartphone Trading in the UAE? Don’t settle for "app estimates." Bring your device to Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) for a certified physical valuation. We offer competitive rates and certified pre-owned devices. Fast, transparent, and trusted since 2014.\n\n📞 Call today to check our latest stock!\n#SmartphoneTrading #UAEUsedPhones #AlSharqTrading',
    link: 'https://wa.me/971507117043'
  },
  {
    id: 4,
    title: 'The "Warranty & Trust"',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2071&auto=format&fit=crop',
    caption: '✅ Peace of Mind, Guaranteed. When you book a repair through a general app, you don’t always know who is opening your device. At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), every repair is performed by our in-house Skilled Technicians and backed by a solid 90-Day Service Warranty. Real people, real accountability, and 12 years of Sharjah trust.\n\n🛡️ Quality you can see.\n#TrustedRepair #SharjahMobileRepair #TechWarranty',
    link: 'https://wa.me/971507117043'
  },
  {
    id: 5,
    title: 'The "Technical Speed"',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2070&auto=format&fit=crop',
    caption: '⚡ Back Online in Hours, Not Days. Cracked your screen this morning? Don\'t wait for a booking slot. We offer Same-day Screen Repair in Sharjah using premium Genuine Parts. From the latest 2026 models to your trusty older devices, we get you back to work fast.\n\n👇 Click the \'Book\' button to secure your repair slot today!\n#iPhoneRepairSharjah #SamsungRepair #FastFix',
    link: '/phone-repair'
  }
];

export default function SocialFeed() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Follow our latest repairs, tech tips, and community updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 transition-transform hover:-translate-y-1 duration-300 flex flex-col"
            >
              <div className="relative h-64 shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-full">
                  <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), Sharjah</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm mb-6 flex-grow">
                  {post.caption}
                </p>
                <a 
                  href={post.link}
                  target={post.link.startsWith('http') ? "_blank" : "_self"}
                  rel={post.link.startsWith('http') ? "noopener noreferrer" : ""}
                  className="inline-flex items-center justify-center w-full gap-2 bg-brand-blue hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-medium transition-colors mt-auto"
                >
                  {post.link.includes('wa.me') ? (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Message Us
                    </>
                  ) : (
                    <>
                      Book Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
