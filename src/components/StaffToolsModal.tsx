import React, { useState, useEffect } from 'react';
import { X, Copy, MessageCircle, Check, LogOut, Plus, Search, Save, Loader2, Printer, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, serverTimestamp, getDoc, updateDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

import Barcode from 'react-barcode';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StaffToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'whatsapp' | 'tickets' | 'admin';

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

const DEVICE_LIST = Object.values(DEVICES_BY_TYPE).flat();

const ISSUE_LIST = [
  'Screen Replacement',
  'Battery Replacement',
  'Charging Port Repair',
  'Water/Liquid Damage',
  'Logic Board Repair',
  'Camera Repair',
  'Camera Not Focusing',
  'Back Glass Replacement',
  'Software/Firmware Issue',
  'Data Recovery',
  'Speaker/Microphone Issue',
  'Overheating',
  'Cracked Trackpad',
  'Keyboard Malfunction',
  'Wi-Fi/Bluetooth Connectivity',
  'System Not Booting',
  'Other (Please specify)'
];

const ISSUE_WARRANTY_MAP: Record<string, string> = {
  'Screen Replacement': 'Check Warranty',
  'Battery Replacement': '14 Days',
  'Charging Port Repair': '14 Days',
  'Water/Liquid Damage': 'Check Warranty',
  'Logic Board Repair': '30 Days',
  'Camera Repair': '14 Days',
  'Camera Not Focusing': '14 Days',
  'Back Glass Replacement': 'Check Warranty',
  'Software/Firmware Issue': '7 Days',
  'Data Recovery': '1 Day',
  'Speaker/Microphone Issue': '14 Days',
  'Overheating': '7 Days',
  'Cracked Trackpad': 'Check Warranty',
  'Keyboard Malfunction': '14 Days',
  'Wi-Fi/Bluetooth Connectivity': '30 Days',
  'System Not Booting': '30 Days'
};

const CITY_LIST = [
  'Sharjah',
  'Dubai',
  'Ajman',
  'Abu Dhabi',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah'
];

export default function StaffToolsModal({ isOpen, onClose }: StaffToolsModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [activeTab, setActiveTab] = useState<Tab>('whatsapp');
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'technician' | 'customer' | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');

  // WhatsApp State
  const [customerName, setCustomerName] = useState('');
  const [reviewLink, setReviewLink] = useState('https://g.page/r/placeholder/review');
  const [copied, setCopied] = useState(false);

  // Ticket State
  const [ticketMode, setTicketMode] = useState<'create' | 'update' | 'queue'>('create');
  const [newTicket, setNewTicket] = useState({ customerName: '', mobileNumber: '', city: 'Sharjah', deviceType: 'Mobile Phones', device: '', imei: '', issue: '', price: '', advance: '', warranty: 'None', notes: '' });
  const [searchId, setSearchId] = useState('');
  const [foundTicket, setFoundTicket] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateAdvance, setUpdateAdvance] = useState('');
  const [updateWarranty, setUpdateWarranty] = useState('');
  const [updateImei, setUpdateImei] = useState('');
  const [updateServicesPerformed, setUpdateServicesPerformed] = useState('');
  const [updatePartsUsed, setUpdatePartsUsed] = useState('');
  const [updateTechnicianId, setUpdateTechnicianId] = useState('');
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState('');
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  
  // Admin State
  const [adminTab, setAdminTab] = useState<'dashboard' | 'inventory'>('dashboard');
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [isSavingPart, setIsSavingPart] = useState(false);
  const [addPartMode, setAddPartMode] = useState(false);
  const [newPart, setNewPart] = useState({ name: '', supplier: '', cost: '', quantity: '', minThreshold: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role as any);
          } else {
            setUserRole('customer');
          }
        } catch (err) {
          console.error("Error fetching role:", err);
          setUserRole('customer');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (ticketMode === 'queue') {
      fetchQueue();
    }
  }, [ticketMode]);

  useEffect(() => {
    if (activeTab === 'admin' && userRole === 'admin') {
      fetchAdminData();
    }
  }, [activeTab, userRole]);

  const fetchAdminData = async () => {
    setAdminLoading(true);
    try {
      // Fetch Tickets for Analytics
      const ticketsSnap = await getDocs(query(collection(db, 'tickets'), orderBy('createdAt', 'desc')));
      setAllTickets(ticketsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
      // Fetch Inventory
      const invSnap = await getDocs(collection(db, 'inventory'));
      setInventory(invSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPart.name || !newPart.quantity || !newPart.cost) return;
    
    setIsSavingPart(true);
    try {
      const docRef = await addDoc(collection(db, 'inventory'), {
        name: newPart.name,
        supplier: newPart.supplier,
        cost: Number(newPart.cost),
        quantity: Number(newPart.quantity),
        minThreshold: Number(newPart.minThreshold || 5),
        createdAt: serverTimestamp()
      });
      
      setInventory([{ ...newPart, id: docRef.id, cost: Number(newPart.cost), quantity: Number(newPart.quantity), minThreshold: Number(newPart.minThreshold || 5) }, ...inventory]);
      setAddPartMode(false);
      setNewPart({ name: '', supplier: '', cost: '', quantity: '', minThreshold: '' });
    } catch (err) {
      console.error('Error adding part', err);
    } finally {
      setIsSavingPart(false);
    }
  };

  const fetchQueue = async () => {
    setQueueLoading(true);
    try {
      const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'), limit(50));
      const snap = await getDocs(q);
      setRecentTickets(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching queue:", err);
    } finally {
      setQueueLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    setLoading(true);
    try {
      // Execute reCAPTCHA if available
      if (executeRecaptcha) {
        const token = await executeRecaptcha('staff_auth');
        console.log('reCAPTCHA token:', token);
      } else {
        console.warn('reCAPTCHA is not configured or available. Skipping assessment.');
      }

      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        let assignedRole = 'customer';
        if (secretCode === 'admin123') {
          assignedRole = 'admin';
        } else if (secretCode === 'tech123') {
          assignedRole = 'technician';
        } else if (secretCode === 'customer123' || secretCode === '') {
          assignedRole = 'customer';
        } else {
          throw new Error('Invalid secret code');
        }
        
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document
        await setDoc(doc(db, 'users', cred.user.uid), {
          email: email,
          role: assignedRole,
          createdAt: serverTimestamp()
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setFoundTicket(null);
    setNewTicket({ customerName: '', mobileNumber: '', city: 'Sharjah', deviceType: 'Phone', device: '', imei: '', issue: '', price: '', advance: '', warranty: 'None', notes: '' });
    setUserRole(null);
  };

  const generateTicketId = () => {
    const prefix = 'REP';
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${random}`;
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketLoading(true);
    setError('');
    setTicketSuccess('');
    
    // Cross-category validation
    let isValidDevice = true;
    for (const [category, devices] of Object.entries(DEVICES_BY_TYPE)) {
      if (category !== newTicket.deviceType && devices.includes(newTicket.device) && newTicket.device !== 'Others') {
        setError(`Wait! '${newTicket.device}' is a recognized ${category}, but you selected Device Type: '${newTicket.deviceType}'. Please select the correct Device Type.`);
        setTicketLoading(false);
        return;
      }
    }
    
    try {
      const ticketId = generateTicketId();
      await setDoc(doc(db, 'tickets', ticketId), {
        ticketId,
        ...newTicket,
        status: 'pending',
        history: [{
          status: 'pending',
          notes: 'Ticket created',
          date: new Date().toISOString(),
          updatedBy: user?.uid || 'system',
          updatedByEmail: user?.email || 'unknown'
        }],
        createdAt: new Date().toISOString(), // Use ISO string for easier client handling
        updatedAt: new Date().toISOString(),
        createdBy: user?.uid
      });
      setTicketSuccess(`Ticket created! ID: ${ticketId}`);
      setNewTicket({ customerName: '', mobileNumber: '', city: 'Sharjah', deviceType: 'Mobile Phones', device: '', imei: '', issue: '', price: '', advance: '', warranty: 'None', notes: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  const handleSearchTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketLoading(true);
    setError('');
    setFoundTicket(null);
    
    try {
      const docRef = doc(db, 'tickets', searchId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFoundTicket({ ...data, id: docSnap.id });
        setUpdateStatus(data.status);
        setUpdateNotes(data.notes || '');
        setUpdatePrice(data.price || '');
        setUpdateAdvance(data.advance || '');
        setUpdateWarranty(data.warranty || 'None');
        setUpdateImei(data.imei || '');
        setUpdateServicesPerformed('');
        setUpdatePartsUsed('');
        setUpdateTechnicianId('');
      } else {
        setError('Ticket not found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  const handleUpdateTicket = async () => {
    if (!foundTicket) return;
    setTicketLoading(true);
    setError('');
    setTicketSuccess('');
    
    try {
      const historyEntry = {
        status: updateStatus,
        notes: updateNotes,
        price: updatePrice,
        advance: updateAdvance,
        warranty: updateWarranty,
        imei: updateImei,
        servicesPerformed: updateServicesPerformed,
        partsUsed: updatePartsUsed,
        technicianId: updateTechnicianId,
        date: new Date().toISOString(),
        updatedBy: user?.uid || 'system',
        updatedByEmail: user?.email || 'unknown'
      };

      await updateDoc(doc(db, 'tickets', foundTicket.id), {
        status: updateStatus,
        notes: updateNotes,
        price: updatePrice,
        advance: updateAdvance,
        warranty: updateWarranty,
        imei: updateImei,
        history: [...(foundTicket.history || []), historyEntry],
        updatedAt: new Date().toISOString()
      });
      
      // Auto-SMS Trigger Strategy for Twilio
      if (updateStatus === 'ready-for-pickup' && foundTicket.status !== 'ready-for-pickup' && foundTicket.mobileNumber) {
        try {
          const smsText = `Hi ${foundTicket.customerName}, your ${foundTicket.device} is ready for pickup at AL SHARQ MOBILE REPAIR! Return to check out: ${window.location.origin}/repair-tracker?ticketId=${foundTicket.id}`;
          const cleanedNumber = foundTicket.mobileNumber.replace(/[^0-9+]/g, ''); // leave + for intl format
          
          await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: cleanedNumber.startsWith('+') ? cleanedNumber : `+971${cleanedNumber.replace(/^0/, '')}`, // Default to UAE code if none added
              message: smsText
            })
          });
          setTicketSuccess('Ticket updated and Customer notified via SMS!');
        } catch (smsErr) {
          console.error("SMS notification failed. Set up keys in .env", smsErr);
          setTicketSuccess('Ticket updated successfully (SMS skipped - Twilio keys missing).');
        }
      } else {
        setTicketSuccess('Ticket updated successfully');
      }

      setFoundTicket({ ...foundTicket, status: updateStatus, notes: updateNotes, price: updatePrice, advance: updateAdvance, warranty: updateWarranty, imei: updateImei, history: [...(foundTicket.history || []), historyEntry] });
      setUpdateServicesPerformed('');
      setUpdatePartsUsed('');
      setUpdateTechnicianId('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  const handleSendStatusWhatsApp = () => {
    if (!foundTicket || !foundTicket.mobileNumber) return;
    
    const message = `Hi ${foundTicket.customerName},\n\nUpdate regarding your ${foundTicket.device} (Ticket ID: ${foundTicket.ticketId || foundTicket.id}):\n\nCurrent Status: ${updateStatus.toUpperCase()}\n\nThank you for choosing Al Sharq Mobile!`;
    const cleanedNumber = foundTicket.mobileNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    setPrintMode(true);
  };

  const confirmDownloadPdf = async () => {
    const element = document.getElementById('receipt-print-area');
    if (element) {
      try {
        const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        // Calculate height based on A4 width maintaining aspect ratio
        const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Receipt_${foundTicket?.ticketId || foundTicket?.id || 'Doc'}.pdf`);
      } catch (error) {
        console.error("Failed to generate PDF", error);
      }
    }
    setPrintMode(false);
  };

  // WhatsApp Logic
  const template = `Hi ${customerName || '[Customer Name]'}! It was a pleasure serving you at Al Sharq Mobile Phone & Computer Trading LLC (Techfix & Gidgets) today. 📱💻

As a local business serving the community since 2014, your feedback means the world to us. Would you mind taking 30 seconds to rate our service on Google?

Click here to share your experience: ${reviewLink}

Thank you for your continued trust!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const encodedText = encodeURIComponent(template);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <datalist id="device-list">
        {DEVICE_LIST.map((device) => (
          <option key={device} value={device} />
        ))}
      </datalist>
      <datalist id="issue-list">
        {ISSUE_LIST.map((issue) => (
          <option key={issue} value={issue} />
        ))}
      </datalist>
      
      <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Staff Tools</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
              </div>
            ) : !user ? (
              // Auth Form
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {authMode === 'login' ? 'Staff Login' : 'Register Staff Account'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Please authenticate to access staff tools.
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secret Code</label>
                      <input
                        type="password"
                        required
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        placeholder="Ask admin for code"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {authMode === 'login' ? (loading ? 'Logging in...' : 'Login') : (loading ? 'Registering...' : 'Register')}
                  </button>
                </form>

                <div className="text-center text-sm">
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-brand-orange hover:underline"
                  >
                    {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
                  </button>
                </div>
              </div>
            ) : userRole === 'customer' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Access Denied</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You do not have staff permissions to access these tools.
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-6 px-6 py-2 bg-gray-900 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Authenticated View
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab('whatsapp')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
                      activeTab === 'whatsapp' ? 'text-brand-orange' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    WhatsApp Templates
                    {activeTab === 'whatsapp' && (
                      <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
                      activeTab === 'tickets' ? 'text-brand-orange' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    Manage Tickets
                    {activeTab === 'tickets' && (
                      <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                    )}
                  </button>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => setActiveTab('admin')}
                      className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
                        activeTab === 'admin' ? 'text-brand-orange' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      Admin Panel
                      {activeTab === 'admin' && (
                        <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                      )}
                    </button>
                  )}
                  <div className="ml-auto">
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center gap-1"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'whatsapp' ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter customer name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Review Link</label>
                      <input
                        type="text"
                        value={reviewLink}
                        onChange={(e) => setReviewLink(e.target.value)}
                        placeholder="https://g.page/..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Preview</h3>
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm font-medium leading-relaxed">{template}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all"
                      >
                        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        {copied ? 'Copied!' : 'Copy Text'}
                      </button>
                      <button
                        onClick={handleWhatsApp}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-500/20"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Open WhatsApp
                      </button>
                    </div>
                  </div>
                ) : activeTab === 'tickets' ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setTicketMode('create')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                          ticketMode === 'create'
                            ? 'bg-brand-orange text-white border-brand-orange'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setTicketMode('queue')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                          ticketMode === 'queue'
                            ? 'bg-brand-orange text-white border-brand-orange'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        Queue
                      </button>
                      <button
                        onClick={() => setTicketMode('update')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                          ticketMode === 'update'
                            ? 'bg-brand-orange text-white border-brand-orange'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        Update
                      </button>
                    </div>

                    {ticketMode === 'create' ? (
                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name</label>
                            <input
                              type="text"
                              required
                              value={newTicket.customerName}
                              onChange={(e) => setNewTicket({ ...newTicket, customerName: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                            <input
                              type="tel"
                              required
                              value={newTicket.mobileNumber}
                              onChange={(e) => setNewTicket({ ...newTicket, mobileNumber: e.target.value })}
                              placeholder="+971 50 XXXXXX"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Type</label>
                            <select
                              required
                              value={newTicket.deviceType}
                              onChange={(e) => setNewTicket({ ...newTicket, deviceType: e.target.value, device: '' })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                              <option value="Mobile Phones">Mobile Phones</option>
                              <option value="Tablets">Tablets</option>
                              <option value="Laptops & PCs">Laptops & PCs</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                            <select
                              required
                              value={newTicket.city}
                              onChange={(e) => setNewTicket({ ...newTicket, city: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                              {CITY_LIST.map(city => (
                                <option key={city} value={city}>{city}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Model</label>
                            <select
                              required
                              value={newTicket.device}
                              onChange={(e) => setNewTicket({ ...newTicket, device: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                              <option value="" disabled>Select a model</option>
                              {DEVICES_BY_TYPE[newTicket.deviceType as keyof typeof DEVICES_BY_TYPE]?.map(device => (
                                <option key={device} value={device}>{device}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Description</label>
                            <input
                              type="text"
                              list="issue-list"
                              required
                              value={newTicket.issue}
                              onChange={(e) => {
                                const newIssue = e.target.value;
                                const defaultWarranty = ISSUE_WARRANTY_MAP[newIssue];
                                setNewTicket({ 
                                  ...newTicket, 
                                  issue: newIssue,
                                  ...(defaultWarranty ? { warranty: defaultWarranty } : {})
                                });
                              }}
                              placeholder="e.g. Screen Replacement"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IMEI/Serial Number</label>
                            <input
                              type="text"
                              value={newTicket.imei}
                              onChange={(e) => setNewTicket({ ...newTicket, imei: e.target.value })}
                              placeholder="Optional"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-mono"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Price (AED)</label>
                            <input
                              type="number"
                              value={newTicket.price}
                              onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
                              placeholder="0.00"
                              disabled={userRole !== 'admin'}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Advance (AED)</label>
                            <input
                              type="number"
                              value={newTicket.advance}
                              onChange={(e) => setNewTicket({ ...newTicket, advance: e.target.value })}
                              placeholder="0.00"
                              disabled={userRole !== 'admin'}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warranty</label>
                            <select
                              value={newTicket.warranty}
                              onChange={(e) => setNewTicket({ ...newTicket, warranty: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                              <option value="None">None</option>
                              <option value="Check Warranty">Check Warranty</option>
                              <option value="1 Day">1 Day</option>
                              <option value="7 Days">7 Days</option>
                              <option value="14 Days">14 Days</option>
                              <option value="30 Days">30 Days</option>
                              <option value="3 Months">3 Months</option>
                              <option value="6 Months">6 Months</option>
                              <option value="1 Year">1 Year</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Internal Notes</label>
                          <textarea
                            value={newTicket.notes}
                            onChange={(e) => setNewTicket({ ...newTicket, notes: e.target.value })}
                            placeholder="Optional staff notes"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none h-20 resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        
                        {ticketSuccess && (
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-2">
                            <Check className="h-4 w-4" /> {ticketSuccess}
                          </div>
                        )}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                          type="submit"
                          disabled={ticketLoading}
                          className="w-full py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2"
                        >
                          {ticketLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                          Create Ticket
                        </button>
                      </form>
                    ) : ticketMode === 'queue' ? (
                      <div className="space-y-4">
                        {queueLoading ? (
                          <div className="space-y-3">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 animate-pulse flex justify-between items-start">
                                <div className="space-y-2 w-2/3">
                                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                                </div>
                                <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-20"></div>
                              </div>
                            ))}
                          </div>
                        ) : recentTickets.length === 0 ? (
                          <p className="text-center text-gray-500 py-8">No tickets found in the queue.</p>
                        ) : (
                          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {recentTickets.map(ticket => (
                              <button 
                                key={ticket.id} 
                                className="w-full text-left p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-brand-orange dark:hover:border-brand-orange cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                onClick={() => {
                                  setSearchId(ticket.id || ticket.ticketId);
                                  setTicketMode('update');
                                  // Trigger the search automatically
                                  setFoundTicket({ id: ticket.id, ...ticket });
                                  setUpdateStatus(ticket.status || 'pending');
                                  setUpdateNotes(ticket.notes || '');
                                  setUpdatePrice(ticket.price || '');
                                  setUpdateAdvance(ticket.advance || '');
                                }}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                      {ticket.customerName}
                                      <span className="text-xs font-mono bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                        {ticket.ticketId || ticket.id}
                                      </span>
                                    </h4>
                                  </div>
                                  <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${ticket.status === 'completed' || ticket.status === 'ready-for-pickup' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300'}`}>
                                    {ticket.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {ticket.deviceType && <span className="font-semibold text-brand-orange">[{ticket.deviceType}] </span>}
                                  {ticket.device} - {ticket.issue}
                                </p>
                                <div className="flex gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                                  {ticket.mobileNumber && <span>📞 {ticket.mobileNumber}</span>}
                                  <span>📅 {new Date(ticket.createdAt).toLocaleDateString()}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <form onSubmit={handleSearchTicket} className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Enter Ticket ID (e.g. REP-1234)"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          />
                          <button
                            type="submit"
                            disabled={ticketLoading}
                            className="px-4 py-2 bg-gray-900 dark:bg-slate-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors disabled:opacity-70 flex justify-center items-center"
                          >
                            {ticketLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                          </button>
                        </form>

                        {foundTicket && (
                          <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{foundTicket.customerName}</h4>
                                {foundTicket.mobileNumber && <p className="text-sm font-medium text-gray-700 dark:text-gray-300">📞 {foundTicket.mobileNumber}</p>}
                                {foundTicket.city && <p className="text-sm font-medium text-gray-700 dark:text-gray-300">📍 {foundTicket.city}</p>}
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {foundTicket.deviceType && <span className="font-semibold text-brand-orange">[{foundTicket.deviceType}] </span>}
                                  {foundTicket.device} - {foundTicket.issue}
                                </p>
                              </div>
                              <span className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded uppercase">
                                {foundTicket.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Status</label>
                                <select
                                  value={updateStatus}
                                  onChange={(e) => setUpdateStatus(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="diagnosing">Diagnosing</option>
                                  <option value="waiting-for-parts">Waiting for Parts</option>
                                  <option value="repairing">Repairing</option>
                                  <option value="quality-check">Quality Check</option>
                                  <option value="ready-for-pickup">Ready for Pickup</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Price</label>
                                <input
                                  type="number"
                                  value={updatePrice}
                                  onChange={(e) => setUpdatePrice(e.target.value)}
                                  disabled={userRole !== 'admin'}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white disabled:opacity-50"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Advance Payment</label>
                                <input
                                  type="number"
                                  value={updateAdvance}
                                  onChange={(e) => setUpdateAdvance(e.target.value)}
                                  disabled={userRole !== 'admin'} // Admin can adjust advance later if needed
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white disabled:opacity-50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IMEI/SN</label>
                                <input
                                  type="text"
                                  value={updateImei}
                                  onChange={(e) => setUpdateImei(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warranty</label>
                                <select
                                  value={updateWarranty}
                                  onChange={(e) => setUpdateWarranty(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                >
                                  <option value="None">None</option>
                                  <option value="Check Warranty">Check Warranty</option>
                                  <option value="1 Day">1 Day</option>
                                  <option value="7 Days">7 Days</option>
                                  <option value="14 Days">14 Days</option>
                                  <option value="30 Days">30 Days</option>
                                  <option value="3 Months">3 Months</option>
                                  <option value="6 Months">6 Months</option>
                                  <option value="1 Year">1 Year</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Notes</label>
                              <textarea
                                value={updateNotes}
                                onChange={(e) => setUpdateNotes(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none h-20 resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                              />
                            </div>

                            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-2">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Add Repair Log (Optional)</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Services Performed</label>
                                  <input
                                    type="text"
                                    value={updateServicesPerformed}
                                    onChange={(e) => setUpdateServicesPerformed(e.target.value)}
                                    placeholder="e.g. Replaced display assembly, cleaned internals"
                                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Parts Used</label>
                                    <input
                                      type="text"
                                      value={updatePartsUsed}
                                      onChange={(e) => setUpdatePartsUsed(e.target.value)}
                                      placeholder="e.g. OEM Screen, Tesa tape"
                                      className="w-full px-3 py-1.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Technician ID/Name</label>
                                    <input
                                      type="text"
                                      value={updateTechnicianId}
                                      onChange={(e) => setUpdateTechnicianId(e.target.value)}
                                      placeholder="e.g. Tech 02"
                                      className="w-full px-3 py-1.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={handleUpdateTicket}
                                disabled={ticketLoading}
                                className="flex-[2] py-2 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2"
                              >
                                {ticketLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                                Save Changes
                              </button>
                              
                              <button
                                onClick={handlePrint}
                                className="flex-1 py-2 bg-gray-900 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
                              >
                                <Printer className="h-5 w-5" />
                                Download PDF
                              </button>

                              {foundTicket.mobileNumber && (
                                <button
                                  onClick={handleSendStatusWhatsApp}
                                  className="flex-1 py-2 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                                >
                                  <MessageCircle className="h-5 w-5" />
                                  WhatsApp
                                </button>
                              )}
                            </div>

                            {foundTicket.history && foundTicket.history.length > 0 && (
                              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Ticket History</h4>
                                  <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                      type="text"
                                      placeholder="Filter history..."
                                      value={historySearch}
                                      onChange={(e) => setHistorySearch(e.target.value)}
                                      className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                    />
                                  </div>
                                </div>
                                <div className="max-h-64 overflow-y-auto pr-2 relative">
                                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-slate-700"></div>
                                  <div className="space-y-6">
                                    {[...foundTicket.history]
                                      .reverse()
                                      .filter((entry: any) => 
                                        entry.status.toLowerCase().includes(historySearch.toLowerCase()) || 
                                        (entry.notes && entry.notes.toLowerCase().includes(historySearch.toLowerCase())) ||
                                        (entry.updatedByEmail && entry.updatedByEmail.toLowerCase().includes(historySearch.toLowerCase()))
                                      )
                                      .map((entry: any, index: number) => (
                                      <div key={`${entry.date}-${index}`} className="relative pl-8">
                                        <div className="absolute left-[4px] top-1.5 w-3 h-3 bg-brand-orange rounded-full shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#334155] dark:bg-brand-orange"></div>
                                        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-gray-100 dark:border-slate-600/50 shadow-sm">
                                          <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-brand-orange uppercase text-[10px] tracking-wider bg-brand-orange/10 px-2 py-1 rounded-md">{entry.status}</span>
                                            <span className="text-xs font-medium text-gray-500 shrink-0 ml-2 bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-gray-200 dark:border-slate-600">{new Date(entry.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                          </div>
                                          {entry.notes && <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 mb-3 leading-relaxed">{entry.notes}</p>}
                                          
                                          {entry.servicesPerformed && (
                                            <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 mt-3 mb-2 text-xs text-gray-700 dark:text-gray-300 border border-brand-orange/20 dark:border-brand-orange/20 relative overflow-hidden">
                                              <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
                                              <div className="font-semibold text-brand-orange mb-1.5 flex items-center gap-1.5">
                                                Repair Log
                                              </div>
                                              <div className="space-y-1">
                                                <div><span className="font-medium">Services:</span> {entry.servicesPerformed}</div>
                                                {entry.partsUsed && <div><span className="font-medium">Parts:</span> {entry.partsUsed}</div>}
                                                {entry.technicianId && <div><span className="font-medium">Technician:</span> {entry.technicianId}</div>}
                                              </div>
                                            </div>
                                          )}

                                          <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-200 dark:border-slate-700/50 w-full text-xs">
                                            <span className="text-gray-400">Updated by:</span>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{entry.updatedByEmail || 'System'}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {ticketSuccess && (
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-2">
                                <Check className="h-4 w-4" /> {ticketSuccess}
                              </div>
                            )}
                          </div>
                        )}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                      </div>
                    )}
                  </div>
                ) : activeTab === 'admin' && userRole === 'admin' ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex bg-gray-100 dark:bg-slate-700/50 p-1 rounded-xl">
                      <button 
                        onClick={() => setAdminTab('dashboard')} 
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-colors ${adminTab === 'dashboard' ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                      >
                        Analytics
                      </button>
                      <button 
                        onClick={() => setAdminTab('inventory')} 
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-colors ${adminTab === 'inventory' ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                      >
                        Inventory Manager
                      </button>
                    </div>

                    {adminLoading ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 animate-pulse">
                              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-3"></div>
                              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                            </div>
                          ))}
                        </div>
                        <div className="h-64 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl animate-pulse"></div>
                      </div>
                    ) : adminTab === 'dashboard' ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Tickets</h4>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{allTickets.length}</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Completed</h4>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {allTickets.filter(t => t.status === 'completed' || t.status === 'ready-for-pickup').length}
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">In Progress</h4>
                            <div className="text-2xl font-bold text-brand-orange hidden sm:block">
                              {allTickets.filter(t => !['completed', 'ready-for-pickup', 'cancelled'].includes(t.status)).length}
                            </div>
                            <div className="text-2xl font-bold text-brand-orange sm:hidden">
                              {allTickets.filter(t => !['completed', 'ready-for-pickup', 'cancelled'].includes(t.status)).length}
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Revenue</h4>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {allTickets.reduce((sum, t) => sum + (Number(t.price) || 0), 0)}<span className="text-sm">AED</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 h-64">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Tickets by Device Type</h4>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(
                              allTickets.reduce((acc, ticket) => {
                                const type = ticket.deviceType || 'Other';
                                acc[type] = (acc[type] || 0) + 1;
                                return acc;
                              }, {} as Record<string, number>)
                            ).map(([name, count]) => ({ name, count }))}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis dataKey="name" tick={{fontSize: 10}} />
                              <YAxis tick={{fontSize: 10}} />
                              <RechartsTooltip />
                              <Bar dataKey="count" fill="#ff6b00" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Part Inventory</h3>
                          <button onClick={() => setAddPartMode(!addPartMode)} className="px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-lg hover:bg-brand-orange/90 flex items-center gap-1">
                            {addPartMode ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />} {addPartMode ? 'Cancel' : 'Add Part'}
                          </button>
                        </div>
                        
                        {addPartMode && (
                          <form onSubmit={handleAddPart} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600 mb-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Part Name</label>
                              <input required type="text" value={newPart.name} onChange={e => setNewPart({...newPart, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="e.g. iPhone 15 Pro Max Screen" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Supplier</label>
                              <input type="text" value={newPart.supplier} onChange={e => setNewPart({...newPart, supplier: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="e.g. Ali Baba" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Cost (AED)</label>
                              <input required type="number" value={newPart.cost} onChange={e => setNewPart({...newPart, cost: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="0.00" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity in Stock</label>
                              <input required type="number" value={newPart.quantity} onChange={e => setNewPart({...newPart, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="0" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Low Stock Threshold</label>
                              <input type="number" value={newPart.minThreshold} onChange={e => setNewPart({...newPart, minThreshold: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" placeholder="5" />
                            </div>
                            <div className="col-span-2 pt-2">
                              <button disabled={isSavingPart} type="submit" className="w-full px-4 py-2 bg-slate-900 dark:bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-brand-orange/90 flex justify-center items-center gap-2 disabled:opacity-70">
                                {isSavingPart ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSavingPart ? 'Saving...' : 'Save Part'}
                              </button>
                            </div>
                          </form>
                        )}

                        {inventory.length > 0 ? (
                          <div className="space-y-2">
                            {inventory.map((item, idx) => (
                              <div key={item.id || idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{item.name}</div>
                                  <div className="text-xs text-slate-500">{item.supplier} • {item.cost} AED</div>
                                </div>
                                <div className="text-right">
                                  <div className={`font-bold ${item.quantity < (item.minThreshold || 5) ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                                    {item.quantity} in stock
                                  </div>
                                  {item.quantity < (item.minThreshold || 5) && <div className="text-[10px] text-red-500 uppercase tracking-wider font-bold">Low Stock</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-8 text-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                            <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No inventory imported yet.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Hidden Print Wrapper -> Now Print Preview Wrapper */}
      {printMode && foundTicket && (
        <div className="fixed inset-0 z-[9999] bg-gray-500/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center py-10">
          
          <div className="bg-white rounded-xl shadow-2xl p-4 w-full flex flex-col max-w-4xl mb-6 relative">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Printer className="h-6 w-6 text-brand-orange" /> Print Preview
              </h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPrintMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDownloadPdf}
                  className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 font-bold transition-colors shadow-sm"
                >
                  Confirm & Download PDF
                </button>
              </div>
            </div>

            <div className="flex justify-center w-full bg-gray-100 rounded-lg p-8 overflow-hidden">
              <div id="receipt-print-area" className="w-[760px] p-8 text-black bg-white shadow-md border border-gray-100 shrink-0">
                <div className="flex justify-between items-start border-b-2 border-gray-200 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <Printer className="w-8 h-8 text-gray-800" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AL SHARQ</h1>
                  <p className="text-sm font-semibold tracking-widest text-gray-500 mt-1">MOBILE & REPAIR LLC</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Al Muwaileh Commercial, Sharjah, UAE</p>
                    <p>Tel: +971 50 711 7043</p>
                    <p>Email: support@allsharq.com</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">REPAIR TICKET</h2>
                <div className="bg-white rounded overflow-hidden">
                  <Barcode value={foundTicket.ticketId || foundTicket.id} height={35} width={1.5} fontSize={14} background="#ffffff" margin={0} displayValue={true} />
                </div>
                <p className="text-sm text-gray-500 mt-4">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-sm font-bold text-brand-orange mt-1">Status: {updateStatus.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Details</h3>
                <p className="font-semibold text-gray-900">{foundTicket.customerName}</p>
                {foundTicket.mobileNumber && <p className="text-gray-600">{foundTicket.mobileNumber}</p>}
                {foundTicket.city && <p className="text-gray-600">{foundTicket.city}</p>}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Device Details</h3>
                {foundTicket.deviceType && <p className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-1">{foundTicket.deviceType}</p>}
                <p className="font-semibold text-gray-900">{foundTicket.device}</p>
                {updateImei && <p className="text-gray-600 font-mono">IMEI/SN: {updateImei}</p>}
                <p className="text-gray-600 mt-1">Issue: {foundTicket.issue}</p>
                {updateWarranty !== 'None' && <p className="text-green-600 font-semibold mt-1">Warranty: {updateWarranty}</p>}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-right w-32">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-4 text-gray-700">Repair / Service: {foundTicket.issue}</td>
                    <td className="px-4 py-4 text-gray-900 text-right font-medium">{updatePrice || '0.00'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-500 text-right">Advance Paid</td>
                    <td className="px-4 py-3 text-gray-900 text-right font-medium">-{updateAdvance || '0.00'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-gray-900 font-bold text-right uppercase tracking-wider text-xs">Balance Due</td>
                    <td className="px-4 py-4 text-brand-orange text-right font-bold text-lg">
                      {Math.max(0, (Number(updatePrice) || 0) - (Number(updateAdvance) || 0)).toFixed(2)}
                    </td >
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 pt-6 text-xs text-gray-500 space-y-2">
              <h4 className="font-bold text-gray-900 uppercase">Terms & Conditions</h4>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Goods left for repair are at the owner's risk. We are not liable for any data loss, so please ensure your device is backed up.</li>
                <li>Devices must be collected within 30 days of the repair completion date. Unclaimed devices may be recycled or sold to recover costs.</li>
                <li>The quoted price is an estimate. If additional internal damage is found, you will be contacted before we proceed.</li>
                <li>Warranty covers the specific repaired part only and is voided by physical damage, water damage, or third-party tampering.</li>
              </ol>
            </div>
            
            <div className="mt-16 flex justify-between items-end">
              <div className="w-48 border-t border-gray-400 pt-2 text-center text-sm text-gray-600">
                Customer Signature
              </div>
              <div className="w-48 border-t border-gray-400 pt-2 text-center text-sm text-gray-600">
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</AnimatePresence>
</>
);
}
