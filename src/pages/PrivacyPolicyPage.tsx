import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Al Sharq Mobile</title>
        <meta name="description" content="Privacy Policy for Al Sharq Mobile Phone & Computer Trading LLC. Learn how we handle your data during device repairs." />
        <link rel="canonical" href="https://allsharq.com/privacy" />
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
                <Lock className="w-10 h-10 text-brand-orange" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                How we protect your data and respect your privacy.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <h2>Introduction</h2>
            <p>
              Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our repair services.
            </p>

            <h3>1. Data We Collect</h3>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Device Data:</strong> includes IMEI numbers, serial numbers, device passcodes (only when necessary for testing repairs), and diagnostic information.</li>
            </ul>

            <h3>2. How We Use Your Data</h3>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., repairing your device).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h3>3. Data Security During Repairs</h3>
            <p>
              We understand that your devices contain sensitive personal information. Our technicians are strictly prohibited from accessing personal files, photos, or messages unless explicitly required to verify a repair (e.g., testing the camera or microphone), and only with your prior consent. We highly recommend backing up your data and removing sensitive information before handing over your device.
            </p>

            <h3>4. Data Retention</h3>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
            </p>

            <h3>5. Your Legal Rights</h3>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful basis of processing is consent) to withdraw consent.
            </p>

            <div className="mt-12 p-6 bg-brand-blue/5 dark:bg-slate-700/50 rounded-2xl border border-brand-blue/10 dark:border-slate-600">
              <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-2">Contact Us About Privacy</h4>
              <p className="mb-0">
                If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>alsharqmobile@gmail.com</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
