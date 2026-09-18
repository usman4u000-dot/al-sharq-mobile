import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { LayoutDashboard, Ticket, History, FileText, Settings, LogOut, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/dashboard" />
        <title>Client Portal | Al Sharq Mobile Phone</title>
        <meta name="description" content="Manage your repairs, view invoices, and track tickets in the Al Sharq Client Portal." />
      </Helmet>
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 sticky top-28">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                    AC
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Acme Corp IT</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Corporate Account</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {[
                    { id: 'active', icon: Ticket, label: 'Active Repairs' },
                    { id: 'history', icon: History, label: 'Repair History' },
                    { id: 'invoices', icon: FileText, label: 'Invoices & Quotes' },
                    { id: 'settings', icon: Settings, label: 'Account Settings' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 min-h-[600px]">
                
                {activeTab === 'active' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Repairs</h2>
                      <Link to="/" className="px-4 py-2 bg-brand-orange text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">
                        + New Repair
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-blue transition-colors">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold">Ticket #1042</span>
                            <span className="text-sm text-gray-500">Dropped off: Oct 24, 2026</span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">MacBook Pro M2 (2023)</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Liquid Damage Diagnostics</p>
                        </div>
                        <div className="flex items-center gap-2 text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 rounded-xl font-medium">
                          <Clock className="w-5 h-5" />
                          In Progress
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Repair History</h2>
                    <div className="space-y-4">
                      {[
                        { id: '#0988', device: 'iPhone 14 Pro Max', issue: 'Screen Replacement', date: 'Sep 12, 2026' },
                        { id: '#0845', device: 'iPad Air (5th Gen)', issue: 'Battery Replacement', date: 'Aug 05, 2026' },
                      ].map((item, i) => (
                        <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold">Ticket {item.id}</span>
                              <span className="text-sm text-gray-500">{item.date}</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.device}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.issue}</p>
                          </div>
                          <div className="flex items-center gap-2 text-green-500 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-xl font-medium">
                            <CheckCircle2 className="w-5 h-5" />
                            Completed
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'invoices' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Invoices & Quotes</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="pb-4 font-semibold text-gray-500 dark:text-gray-400">Invoice ID</th>
                            <th className="pb-4 font-semibold text-gray-500 dark:text-gray-400">Date</th>
                            <th className="pb-4 font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                            <th className="pb-4 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                            <th className="pb-4 font-semibold text-gray-500 dark:text-gray-400">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-4 font-medium text-gray-900 dark:text-white">INV-2026-001</td>
                            <td className="py-4 text-gray-600 dark:text-gray-400">Sep 12, 2026</td>
                            <td className="py-4 text-gray-900 dark:text-white font-medium">AED 850</td>
                            <td className="py-4"><span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold">PAID</span></td>
                            <td className="py-4"><button className="text-brand-blue dark:text-blue-400 hover:underline text-sm font-medium">Download PDF</button></td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-4 font-medium text-gray-900 dark:text-white">QTE-2026-042</td>
                            <td className="py-4 text-gray-600 dark:text-gray-400">Oct 25, 2026</td>
                            <td className="py-4 text-gray-900 dark:text-white font-medium">AED 1,200</td>
                            <td className="py-4"><span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs font-bold">PENDING APPROVAL</span></td>
                            <td className="py-4"><button className="text-brand-orange hover:underline text-sm font-medium">Review Quote</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your corporate account details and notification preferences.</p>
                    
                    <div className="space-y-6 max-w-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                        <input type="text" defaultValue="Acme Corp IT" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none" disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                        <input type="email" defaultValue="it@acmecorp.com" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all" />
                      </div>
                      <button className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
