import React from 'react';
import { motion } from 'motion/react';
import { History, Award, Users, TrendingUp } from 'lucide-react';

export default function CompanyHistory() {
  const milestones = [
    {
      year: "2014",
      title: "The Foundation in Sharjah",
      description: "Al Sharq Mobile Phone & Computer Trading LLC opened its doors in Sharjah with a simple mission: to provide the Muwaileh community with honest, transparent, and reliable tech support."
    },
    {
      year: "2018",
      title: "Major Service Expansions",
      description: "As technology evolved, so did we. We invested in professional diagnostic tools and began our transition into Component-Level Repair, adding Logic Board Repair to our core services, saving our customers thousands of Dirhams by fixing what others couldn't."
    },
    {
      year: "2021",
      title: "Expanding Horizons",
      description: "During the global shift toward remote work and digital learning, the demand for high-end MacBook and Laptop repair skyrocketed. We upgraded our facility to include a Micro-Soldering Lab and expanded our reach across Sharjah and Dubai, becoming a key partner for students and professionals."
    },
    {
      year: "2024",
      title: "Significant Achievements",
      description: "Today, we are recognized as a premier technical authority in the region. We specialize in the most complex repairs of the modern era, including M-Series MacBook Logic Boards, Flagship Smartphone Recovery, and Forensic Data Recovery, cementing our reputation for technical excellence."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-brand-blue dark:text-white mb-4">
              The Al Sharq Journey: 12 Years of Technical Excellence in Sharjah
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a small repair shop to Sharjah's premier technical lab, our commitment to quality and innovation has driven our growth.
            </p>
          </motion.div>
        </div>

        <div className="relative mb-24">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-blue/10 dark:bg-slate-800"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full md:w-5/12"></div>
                
                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange text-white shadow-lg border-4 border-white dark:border-slate-950 my-4 md:my-0">
                  <span className="font-bold text-sm">{milestone.year}</span>
                </div>
                
                <div className="w-full md:w-5/12">
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-blue dark:bg-slate-950 rounded-3xl p-8 md:p-12 text-center shadow-xl"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Why Our History Matters to You</h3>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Twelve years in the same location isn't just a milestone—it's a promise. It means we have seen every tech trend, survived every hardware challenge, and consistently put the needs of the Sharjah community first. When you bring your device to Al Sharq Mobile Phone & Computer Trading LLC you aren't just getting a repair; you are getting over a decade of specialized expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
