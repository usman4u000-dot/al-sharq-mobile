import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Users, ShieldCheck, Clock, ArrowRight, CheckCircle2, Briefcase, Laptop, Smartphone, Package, HeadphonesIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CorporateServicesPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA not available in dev');
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA
      const token = (executeRecaptcha ? await executeRecaptcha('corporate_form') : 'dummy-token');
      console.log('reCAPTCHA token:', token);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Thank you for your interest! Our B2B team will contact you shortly.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('reCAPTCHA error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/corporate" />
        <title>B2B & Wholesale for Mobile Phones and Repair Service in UAE | Al Sharq Mobile Phone</title>
        <meta name="description" content="Bulk device repairs, corporate AMC, IT support, and wholesale supply of smartphones, laptops, and tablets for businesses across the UAE." />
        <meta name="keywords" content="B2B mobile phones UAE, Wholesale smartphones Dubai, Corporate laptop repair Sharjah, AMC IT support UAE, Bulk device supply" />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[
            { label: 'Services', path: '/' },
            { label: 'Corporate & Wholesale' }
          ]} />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center px-4 py-2 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full mb-6 text-brand-blue dark:text-blue-400 font-bold uppercase tracking-wider text-sm">
                B2B & Wholesale Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                Empowering Your Business Operations.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-8">
                Al Sharq Mobile Phone & Computer Trading LLC offers comprehensive solutions—from wholesale supply of premium smartphones and laptops, to dedicated Annual Maintenance Contracts (AMC) and priority bulk repairs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
                >
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group"
            >
              <img loading="lazy" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2000" 
                alt="Corporate tech fleet management" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Complete Fleet Coverage</h3>
                <p className="text-slate-200 font-medium">Wholesale supply & dedicated repair for enterprise devices.</p>
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <div id="services" className="mb-24 scroll-mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Our Corporate Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We provide a full spectrum of IT solutions tailored specifically for the rigorous demands of UAE businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Package, 
                  title: 'Wholesale Device Distribution', 
                  desc: 'Bulk supply of the latest smartphones, iPads, and corporate laptops at highly competitive wholesale rates. Perfect for outfitting new branches or field teams.' 
                },
                { 
                  icon: Laptop, 
                  title: 'Bulk Device Repair', 
                  desc: 'Priority repairs for fleets. Whether it is 5 broken delivery driver phones or 50 corporate laptops needing battery replacements, we handle it rapidly.' 
                },
                { 
                  icon: ShieldCheck, 
                  title: 'Annual Maintenance Contracts (AMC)', 
                  desc: 'Proactive IT support and maintenance. Keep your office network, workstations, and mobile devices running seamlessly with guaranteed SLAs.' 
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-brand-blue/10 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-brand-blue dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-24">
            <div className="bg-brand-blue rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
               {/* Abstract Background Element */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                   <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                     Why Choose Al Sharq for B2B?
                   </h2>
                   <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                     We understand that device downtime means lost revenue. Our corporate program is designed for speed, reliability, and transparency. Look forward to dedicated support designed around your business needs.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {[
                       { icon: Clock, title: 'Priority Fast-Track SLAs' },
                       { icon: Briefcase, title: 'Flexible Net-30 Terms' },
                       { icon: Users, title: 'Dedicated Account Manager' },
                       { icon: ShieldCheck, title: 'Strict Data Security' },
                     ].map((benefit, idx) => (
                       <div key={idx} className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <benefit.icon className="w-5 h-5 text-brand-orange" />
                         </div>
                         <span className="font-bold">{benefit.title}</span>
                       </div>
                     ))}
                   </div>
                 </div>
                 
                 <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-brand-orange" /> Industries We Serve</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Education & Schools', 'Healthcare & Clinics', 'Logistics & Delivery', 'Real Estate', 'Retail & POS', 'Corporate Offices', 'Hospitality'].map((industry, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-bold shadow-sm">
                          {industry}
                        </span>
                      ))}
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="max-w-3xl mx-auto scroll-mt-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Request a Corporate Account
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Fill out the form below. Whether you need wholesale devices or a maintenance contract, our B2B team will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Company Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder:text-slate-400" placeholder="Your Company LLC" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Contact Person *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder:text-slate-400" placeholder="John Doe" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder:text-slate-400" placeholder="john@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number *</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder:text-slate-400" placeholder="+971 50 000 0000" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Area of Interest *</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all">
                  <option>Wholesale Device Purchase (Phones/Laptops)</option>
                  <option>Bulk Device Repair Services</option>
                  <option>Annual Maintenance Contract (AMC)</option>
                  <option>IT Support & Networking</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Details / Specific Requirements</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all placeholder:text-slate-400" placeholder="Tell us about the volume of devices, specific models needed, or the scope of IT support required..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-colors shadow-sm hover:shadow-md disabled:opacity-70 flex items-center justify-center gap-2 text-lg">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  'Submit B2B Inquiry'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
