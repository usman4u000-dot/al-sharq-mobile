import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Ticket, Plus, Search, LogOut, Edit, Trash2, X, Activity, User as UserIcon, Settings, Settings2, CheckCircle2 } from 'lucide-react';

interface RepairTicket {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  issue: string;
  status: string;
  createdAt: number;
}

const DEVICES_BY_TYPE = {
  'Mobile Phones': [
    'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro Max', 'iPhone 12 Pro Max',
    'Samsung Galaxy S26 Ultra', 'Samsung Galaxy S25 Edge', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy Z Fold 8', 'Samsung Galaxy Z Flip 8', 'Samsung Galaxy Z Fold 5',
    'Oppo Find X9 Ultra', 'Xiaomi 17 Ultra', 'Vivo V50', 'OnePlus 13R'
  ],
  'Laptops & PCs': [
    'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air M3', 'MacBook Air M2'
  ],
  'Tablets': [
    'iPad Pro 13"', 'iPad Pro 11"', 'iPad Air', 'iPad Mini'
  ],
  'Others': [
    'Apple Watch Ultra 2', 'Apple Watch Series 9', 'Apple Watch SE', 'Others'
  ]
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<RepairTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<RepairTicket | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deviceType: 'Mobile Phones',
    deviceModel: '',
    issue: '',
    status: 'received'
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const t: RepairTicket[] = [];
      snapshot.forEach(docSnap => {
        t.push({ id: docSnap.id, ...docSnap.data() } as RepairTicket);
      });
      setTickets(t);
    }, (error) => {
      console.error("Error fetching tickets. You may not be an admin.", error);
    });
    
    return () => unsub();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleOpenModal = (ticket?: RepairTicket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData({
        customerName: ticket.customerName || '',
        customerPhone: ticket.customerPhone || '',
        deviceType: (ticket as any).deviceType || 'Mobile Phones',
        deviceModel: ticket.deviceModel || '',
        issue: ticket.issue || '',
        status: ticket.status || 'received'
      });
    } else {
      setEditingTicket(null);
      setFormData({
        customerName: '',
        customerPhone: '',
        deviceType: 'Mobile Phones',
        deviceModel: '',
        issue: '',
        status: 'received'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTicket) {
        await updateDoc(doc(db, 'tickets', editingTicket.id), {
          ...formData
        });
      } else {
        const newId = `T-${Math.floor(10000 + Math.random() * 90000)}`;
        await setDoc(doc(db, 'tickets', newId), {
          ...formData,
          createdAt: Date.now()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving ticket", error);
      alert("Failed to save ticket. Are you sure you have admin/staff access?");
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteDoc(doc(db, 'tickets', id));
      } catch (error) {
        console.error("Error deleting ticket", error);
        alert("Failed to delete ticket. You may need full admin rights.");
      }
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.customerPhone?.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'diagnosing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'waiting-for-parts': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'repairing': return 'bg-brand-orange/20 text-brand-orange';
      case 'ready-for-pickup': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
        <link rel="canonical" href="https://allsharq.com/admin" />
          <title>Admin Dashboard Login | Al Sharq Mobile</title>
        </Helmet>
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-brand-blue/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings2 className="w-8 h-8 text-brand-blue dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Staff & Admin Access</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please sign in with your staff Google account to access the repair dashboard.</p>
            <button 
              onClick={handleLogin}
              className="w-full py-3.5 px-4 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-brand-blue/20 transition-all flex items-center justify-center gap-2"
            >
              Sign In with Google
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Repair Admin Dashboard | Al Sharq Mobile</title>
      </Helmet>
      
      <div className="min-h-[calc(100vh-60px)] pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Repair Operations</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage active tickets, updates, and statuses.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="p-2.5 bg-white dark:bg-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-brand-blue/20"
              >
                <Plus className="w-5 h-5" />
                New Ticket
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex items-center gap-3 mb-6 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search by ticket ID, name, or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-4 pt-2 px-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Ticket ID</th>
                    <th className="pb-4 pt-2 px-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Customer</th>
                    <th className="pb-4 pt-2 px-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Device & Issue</th>
                    <th className="pb-4 pt-2 px-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Status</th>
                    <th className="pb-4 pt-2 px-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {filteredTickets.map(ticket => (
                    <motion.tr 
                      key={ticket.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-750/30 transition-colors"
                    >
                      <td className="py-4 px-2">
                        <span className="font-bold text-gray-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg text-sm">{ticket.id}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-gray-900 dark:text-white">{ticket.customerName}</div>
                        <div className="text-sm text-gray-500">{ticket.customerPhone}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-gray-900 dark:text-white">{ticket.deviceModel}</div>
                        <div className="text-sm text-gray-500">{ticket.issue || 'No details'}</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border border-current bg-opacity-10 dark:bg-opacity-20 ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace(/-/g, ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(ticket)}
                            className="p-2 text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-gray-400">
                        No tickets found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingTicket ? `Edit Ticket ${editingTicket.id}` : 'Create New Ticket'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSaveTicket} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.customerPhone}
                    onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Type</label>
                  <select 
                    value={formData.deviceType}
                    onChange={e => setFormData({...formData, deviceType: e.target.value, deviceModel: ''})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  >
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Laptops & PCs">Laptops & PCs</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Model</label>
                  <select 
                    required
                    value={formData.deviceModel}
                    onChange={e => setFormData({...formData, deviceModel: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  >
                    <option value="" disabled>Select a model</option>
                    {DEVICES_BY_TYPE[formData.deviceType as keyof typeof DEVICES_BY_TYPE]?.map(device => (
                      <option key={device} value={device}>{device}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  >
                    <option value="received">Received</option>
                    <option value="diagnosing">Diagnosing</option>
                    <option value="waiting-for-parts">Waiting for Parts</option>
                    <option value="repairing">Repairing</option>
                    <option value="ready-for-pickup">Ready for Pickup</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.issue}
                    onChange={e => setFormData({...formData, issue: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-brand-blue" 
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-brand-blue/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

// Add the missing imports correctly up there? Wait, `CheckCircle2` is missing in imports.
