import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface CustomerSessionData {
  visitorId: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  claimedProductIds: Record<number, {
    claimedAt: string;
    ticketId?: string;
    productName: string;
  }>;
}

const STORAGE_KEY = 'alsharq_customer_session_v1';

// Generate or retrieve persistent unique visitor ID
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'server_render';
  let session = getStoredSession();
  if (!session.visitorId) {
    session.visitorId = 'vis_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    saveStoredSession(session);
  }
  return session.visitorId;
}

export function getStoredSession(): CustomerSessionData {
  if (typeof window === 'undefined') {
    return { visitorId: '', fullName: '', phone: '', email: '', city: 'Sharjah', claimedProductIds: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading customer session', e);
  }
  return {
    visitorId: '',
    fullName: '',
    phone: '',
    email: '',
    city: 'Sharjah',
    claimedProductIds: {}
  };
}

export function saveStoredSession(session: CustomerSessionData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Error saving customer session', e);
  }
}

// Check if visitor has already claimed / seen stock 0 for a product
export function getEffectiveStock(productId: number, baseStock: number): number {
  if (baseStock === 0) return 0;
  const session = getStoredSession();
  if (session.claimedProductIds && session.claimedProductIds[productId]) {
    // Already claimed or dropped to 0 for this visitor! Never show 1 or 2 again on refresh.
    return 0;
  }
  return baseStock;
}

// Mark product as locked / stock 0 for this visitor session
export function recordProductClaim(productId: number, productName: string, ticketId?: string) {
  const session = getStoredSession();
  if (!session.claimedProductIds) {
    session.claimedProductIds = {};
  }
  session.claimedProductIds[productId] = {
    claimedAt: new Date().toISOString(),
    ticketId,
    productName
  };
  saveStoredSession(session);
}

// Save customer profile data
export function updateCustomerProfile(data: { fullName?: string; phone?: string; email?: string; city?: string }) {
  const session = getStoredSession();
  if (data.fullName !== undefined) session.fullName = data.fullName;
  if (data.phone !== undefined) session.phone = data.phone;
  if (data.email !== undefined) session.email = data.email;
  if (data.city !== undefined) session.city = data.city;
  saveStoredSession(session);
}

// Persist the full reservation into Firebase Firestore
export async function persistReservationToFirestore(data: {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  productId: number;
  productName: string;
  color: string;
  discountPrice: number;
  marketPrice: number;
  ticketId: string;
}) {
  const visitorId = getOrCreateVisitorId();

  // Save to local storage first for instant reflection
  updateCustomerProfile({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    city: data.city
  });
  recordProductClaim(data.productId, data.productName, data.ticketId);

  // Payload for Firestore
  const payload = {
    fullName: data.fullName,
    phone: data.phone,
    email: data.email || '',
    city: data.city,
    productId: data.productId,
    productName: data.productName,
    color: data.color || 'Standard',
    discountPrice: data.discountPrice,
    marketPrice: data.marketPrice,
    ticketId: data.ticketId,
    visitorId,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    channel: '20%_online_flash_scarcity',
    status: 'queued',
    createdAt: new Date().toISOString(),
    serverTimestamp: serverTimestamp()
  };

  try {
    const docRef = await addDoc(collection(db, 'flash_sale_reservations'), payload);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Firestore reservation save error, fallback to local persistence:', error);
    return { success: false, error };
  }
}
