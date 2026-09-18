import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Printer, FileText, AlertTriangle, Lightbulb } from 'lucide-react';

export default function IntakeFormPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Device Intake Form | Al Sharq</title>
        <meta name="description" content="Download or print our device intake form prior to your repair appointment at Al Sharq Mobile Phone & Computer Trading LLC." />
        <link rel="canonical" href="https://allsharq.com/intake-form" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Print Button - Hidden when printing */}
        <div className="flex justify-end mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-blue hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            <Printer className="w-5 h-5" />
            Print Form
          </button>
        </div>

        {/* Printable Form Container */}
        <div className="bg-white text-black p-8 md:p-12 rounded-2xl shadow-xl print:shadow-none print:p-0 print:rounded-none">
          
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">Service Intake & Authorization Form</h1>
            <h2 className="text-xl font-semibold text-gray-700">Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets)</h2>
            <p className="text-gray-600">Established 2014 | Sharjah, UAE</p>
          </div>

          <div className="space-y-8">
            {/* Section 1: Customer & Ticket Info */}
            <section>
              <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5" />
                1. Customer & Ticket Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="font-semibold text-sm text-gray-600">Service Ticket # (e.g., AS-2026-001)</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm text-gray-600">Date</label>
                  <div className="border-b border-gray-400 h-8 mt-1 flex items-end pb-1 text-gray-400">__ / __ / 2026</div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600">Customer Name</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm text-gray-600">Phone Number (Primary for WhatsApp updates)</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm text-gray-600">Email</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
              </div>
            </section>

            {/* Section 2: Device Details */}
            <section>
              <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5" />
                2. Device Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600">Brand/Model (e.g., iPhone 17 Pro / MacBook Air M3)</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600">IMEI/Serial Number</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600 mb-2">Passcode/Pattern</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                      <span>Provided:</span>
                      <div className="border-b border-gray-400 w-32 h-6"></div>
                    </label>
                    <label className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                      <span>Customer will unlock on-site</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600 mb-2">Physical Condition</label>
                  <div className="flex flex-wrap gap-6">
                    {['Scratches', 'Dents', 'Cracked Glass', 'Liquid Damage'].map((condition) => (
                      <label key={condition} className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Reported Issue & Diagnostic Checklist */}
            <section>
              <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5" />
                3. Reported Issue & Diagnostic Checklist
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <label className="font-semibold text-sm text-gray-600">Customer Complaint</label>
                  <div className="border-b border-gray-400 h-8 mt-1"></div>
                  <div className="border-b border-gray-400 h-8 mt-4"></div>
                </div>
                
                <div>
                  <label className="font-semibold text-sm text-gray-600 mb-3 block">Initial Bench Test (Technician to tick):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Power On/Off', 'Touch/Display', 'Front/Back Camera', 'Wi-Fi/Bluetooth', 'Mic/Speaker', 'FaceID/TouchID'].map((test) => (
                      <label key={test} className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                        <span>{test}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Estimated Cost & Time */}
            <section>
              <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5" />
                4. Estimated Cost & Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-end gap-2">
                  <label className="font-semibold text-sm text-gray-600">Estimated Total: AED</label>
                  <div className="border-b border-gray-400 flex-1 h-6"></div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-sm text-gray-600 mb-2">Estimated Completion</label>
                  <div className="flex flex-wrap gap-6">
                    {['Same Day', '24-48 Hours', 'Subject to parts arrival'].map((time) => (
                      <label key={time} className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section className="border-2 border-gray-200 p-6 rounded-xl mt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Terms & Conditions (Summary)
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li><strong>Data Responsibility:</strong> The customer is responsible for backing up all data. Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) is not liable for data loss during repair.</li>
                <li><strong>Abandoned Items:</strong> Devices not collected within 60 days of completion will be considered abandoned and may be sold to recover repair costs.</li>
                <li><strong>Warranty:</strong> All repairs carry a 90-day hardware warranty. This excludes new physical or liquid damage.</li>
                <li><strong>Diagnostic Fee:</strong> A fee of AED 50 applies if the repair is declined after a full diagnostic has been performed.</li>
              </ul>
            </section>

            {/* Signatures */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="flex flex-col">
                <div className="border-b-2 border-gray-800 h-16"></div>
                <label className="font-semibold text-sm text-gray-600 mt-2 text-center">Customer Signature</label>
              </div>
              <div className="flex flex-col">
                <div className="border-b-2 border-gray-800 h-16"></div>
                <label className="font-semibold text-sm text-gray-600 mt-2 text-center">Staff Initial</label>
              </div>
            </section>

            {/* Pro-Tip (Hidden in print) */}
            <section className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-8 print:hidden">
              <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Pro-Tip for 2026 UAE Compliance:
              </h4>
              <p className="text-sm text-blue-900">
                Under UAE Federal Decree Law No. 5 of 2023, you are required to provide a dated invoice in Arabic (English can be added as a second language). Ensure your final printed receipt includes your trade name, address, and the specific repair price as declared.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
