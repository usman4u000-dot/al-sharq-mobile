import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Shield, Database, Lightbulb, Users, Wrench, ShoppingBag, Award, Clock, Network, Home } from 'lucide-react';
import CompanyHistory from '../components/CompanyHistory';
import BehindTheScenesVideo from '../components/BehindTheScenesVideo';

export default function AboutUsPage() {
  const values = [
    {
      icon: Target,
      title: "Precision Over \"Quick Fixes\"",
      description: "We don't believe in temporary solutions. Whether it is a microscopic solder joint on an M4 logic board or a screen calibration for a Samsung S26, we follow exact manufacturer specifications. If a job isn't done perfectly, it isn't done at Al Sharq."
    },
    {
      icon: Shield,
      title: "Radical Transparency",
      description: "The \"black box\" of tech repair ends here. We provide clear, upfront diagnostics and explain the why behind every repair. We believe a customer who understands the process is a customer who trusts the result. No hidden costs, no unnecessary part swaps."
    },
    {
      icon: Database,
      title: "Data Sanctity",
      description: "We recognize that your device is a vessel for your life's work and memories. We treat every byte of data with the highest level of privacy and security. Our data recovery protocols are designed to protect your information as if it were our own."
    },
    {
      icon: Lightbulb,
      title: "Innovation-Led Craftsmanship",
      description: "The tech world moves fast, and we move faster. We consistently reinvest in the latest 2026 laboratory equipment—from ultrasonic chemical baths to thermal imaging cameras—ensuring that our Muwaileh lab remains at the absolute cutting edge of the industry."
    },
    {
      icon: Users,
      title: "Community Dedication",
      description: "We aren't just a business; we are a neighbor. Since 2014, we have grown alongside the students of University City and the families of Muwaileh. We are committed to supporting local growth by offering fair pricing and expert advice that keeps Sharjah connected."
    }
  ];

  const coreServices = [
    {
      icon: Wrench,
      title: "Repair Services",
      description: "Expert technicians handle broken screens, battery replacements, water damage, charging ports, and camera repairs."
    },
    {
      icon: ShoppingBag,
      title: "Sales & Trade-ins",
      description: "Sale of the latest models (iPhone, Pixel, Samsung) and purchasing used or broken phones."
    },
    {
      icon: Award,
      title: "Warranty & Quality",
      description: "High-quality, genuine spare parts are used, often backed by a solid warranty to ensure customer satisfaction."
    },
    {
      icon: Clock,
      title: "Convenience",
      description: "We offer door-to-door service and quick turnaround times for repairs across Dubai and Sharjah."
    },
    {
      icon: Network,
      title: "IT Infrastructure & Networking",
      description: "Network planning, Wi-Fi optimization, server setup and cloud migration support. We design resilient networks for small offices and branch deployments across Sharjah and Dubai."
    },
    {
      icon: Home,
      title: "Home & Office Smart Setup",
      description: "CCTV setup, controlled Wi-Fi for offices and multi-apartment residences, and smart home IoT installation. We guarantee optimal positioning for coverage and safe device provisioning. Onsite installation available."
    }
  ];

  return (
    <div className="pt-20">
      <Helmet>
        <title>About Us | Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</title>
        <meta name="description" content="Learn about the history, mission, and values of Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), Sharjah's trusted technical authority." />
        <link rel="canonical" href="https://allsharq.com/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-brand-blue dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-blue-200 leading-relaxed">
              Dedicated to excellence in electronic repair and sales since 2014. We are Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Mobile phones and computers sit at the center of our daily lives. When they stop working, your day stops too. That is exactly why we built Al Sharq Mobile.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We serve the UAE market as a complete technology partner. On the retail side, we provide everything from original factory sealed iPhones and Samsung devices to the specific accessories you need every day, like durable cases, fast chargers, and high quality audio gear.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                On the repair side, our engineering lab handles complex laptop fixes that other shops simply turn away. Whether you need a MacBook logic board repaired, a gaming PC cooled down, or a bulk wholesale order of accessories for your own business, our team delivers high quality solutions without the ridiculous price tags.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img loading="lazy" src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2070&auto=format&fit=crop" 
                  alt="Technician working" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-orange text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-2">12+</p>
                <p className="text-sm font-medium uppercase tracking-wider">Years of Trust</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The principles that guide every repair, every sale, and every interaction.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 mx-auto bg-brand-blue/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-brand-blue dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-4">
                Our Core Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive tech solutions tailored for individuals and businesses across the UAE.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BehindTheScenesVideo />
      <CompanyHistory />
    </div>
  );
}
