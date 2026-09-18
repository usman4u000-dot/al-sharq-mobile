import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WarrantyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Warranty Policy | Al Sharq Mobile</title>
        <meta name="description" content="View the repair and service warranty conditions for Al Sharq Mobile Phone & Computer Trading LLC." />
        <link rel="canonical" href="https://allsharq.com/warranty" />
      </Helmet>
      <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700"
        >
          <div className="bg-brand-blue dark:bg-slate-950 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                <Shield className="w-10 h-10 text-brand-orange" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Warranty Policy</h1>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                Your peace of mind is guaranteed. Read about our 90-Day Service Warranty.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <h2>Our Commitment to Quality</h2>
            <p>
              At Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets), we stand behind the quality of our repairs and the parts we use. Every repair is performed by our in-house Skilled Technicians and backed by a solid <strong>90-Day Service Warranty</strong>.
            </p>

            <h3>What is Covered?</h3>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                <span><strong>Defective Parts:</strong> Any parts installed by our technicians that malfunction due to manufacturing defects.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                <span><strong>Workmanship:</strong> Any issues arising directly from the repair service provided by our team.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                <span><strong>Screen Repairs:</strong> Touch sensitivity issues, dead pixels, or display anomalies not caused by physical damage.</span>
              </li>
            </ul>

            <h3>What is NOT Covered?</h3>
            <p>Our warranty does not cover the following situations:</p>
            <ul>
              <li>Subsequent physical damage (e.g., cracked screens, bent frames) after the device has been returned to you.</li>
              <li>Liquid damage of any kind, even if the device was previously repaired for liquid damage.</li>
              <li>Software issues, jailbreaking, rooting, or operating system modifications.</li>
              <li>Issues unrelated to the original repair.</li>
              <li>Repairs or modifications performed by third parties after our service.</li>
            </ul>

            <h3>How to Claim Your Warranty</h3>
            <p>
              If you experience an issue covered by this warranty, simply bring your device back to our service center in Muwailah, Sharjah, along with your original receipt or repair ticket ID. Our technicians will inspect the device and resolve the issue at no additional cost if it falls under warranty guidelines.
            </p>

            <div className="mt-12 p-6 bg-brand-blue/5 dark:bg-slate-700/50 rounded-2xl border border-brand-blue/10 dark:border-slate-600">
              <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-2">Need to track a repair or file a claim?</h4>
              <p className="mb-0">
                Use our Track Repair feature or contact us directly at <strong>+971 50 711 7043</strong>. We're here to help!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
