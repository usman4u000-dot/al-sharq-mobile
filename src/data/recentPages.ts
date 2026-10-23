export interface RecentPageItem {
  id: string;
  title: string;
  url: string;
  image: string;
  category: string;
  description: string;
  dateAdded: string; // YYYY-MM-DD format
  badge?: string;
  priority?: string;
}

/**
 * Helper to calculate how many days ago an item was added or modified.
 * Reference date defaults to today.
 */
export function getDaysAgo(dateStr: string): number {
  try {
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return 999;
    const now = new Date();
    const diffMs = now.getTime() - target.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  } catch (e) {
    return 999;
  }
}

/**
 * Filter items within the active 5 to 7 day freshness window.
 * Items older than maxDays (default: 7 days) automatically rotate out!
 */
export function filterWithinDays<T extends { dateAdded?: string; lastModified?: string; date?: string }>(
  items: T[], 
  maxDays: number = 7
): T[] {
  return items.filter(item => {
    const dateToCheck = item.lastModified || item.dateAdded || item.date;
    if (!dateToCheck) return false;
    const days = getDaysAgo(dateToCheck);
    return days <= maxDays;
  });
}

/**
 * Registry of newly launched pages, service hubs, and interactive tools.
 * When you create a new page, add it here with its dateAdded (YYYY-MM-DD).
 * It will automatically appear on the Homepage for 5 to 7 days to give Googlebot
 * maximum crawl priority and domain authority, then auto-expire off the homepage.
 */
export const recentPages: RecentPageItem[] = [
  {
    id: 'tablet-accessories',
    title: 'Tablet & iPad Accessories Protection Hub Sharjah',
    url: '/product-category/tablet-accessories',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    category: 'Protection Hub',
    description: 'Shockproof heavy-duty cases, matte paper-feel films, and alloy stylus tips benchmarked against ceramic tile drops.',
    dateAdded: '2026-10-23',
    badge: 'Newly Launched',
    priority: '0.95'
  },
  {
    id: 'google-trends-radar',
    title: 'Google Trends Live UAE Hardware Failure Radar',
    url: '/blog/google-trends-uae-hardware-device-failures-sharjah-guide',
    image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b805337?auto=format&fit=crop&w=800&q=80',
    category: 'Breakout Intel',
    description: 'Real-time laboratory analysis of heat degradation, swollen batteries, and ceramic tile impact across Sharjah and Dubai.',
    dateAdded: '2026-10-23',
    badge: 'QDF Breakout',
    priority: '0.95'
  },
  {
    id: 'logic-board-lab',
    title: 'Logic Board SMD Micro-Soldering Cleanroom Lab',
    url: '/logic-board-repair',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
    category: 'Hardware Lab',
    description: 'Level 4 component-level diagnostics for short circuits, power management ICs, and unbootable logic boards in Muwaileh.',
    dateAdded: '2026-10-22',
    badge: 'Level 4 Lab',
    priority: '0.90'
  },
  {
    id: 'emergency-water-recovery',
    title: 'Emergency Water Damage Chemical Dehydration Lab',
    url: '/water-damage-repair',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Emergency Lab',
    description: 'Ultrasonic chemical baths to eliminate corrosion and restore power to water-logged smartphones and laptops.',
    dateAdded: '2026-10-21',
    badge: '20-Min Intake',
    priority: '0.90'
  },
  {
    id: 'price-estimator',
    title: 'Instant 3-Click Device Repair Price Estimator',
    url: '/estimate',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    category: 'Interactive Suite',
    description: 'Live transparent cost breakdown for original OLED displays, batteries, and motherboard repairs in Sharjah.',
    dateAdded: '2026-10-20',
    badge: 'Instant Quote',
    priority: '0.85'
  },
  {
    id: 'student-pass',
    title: 'Sharjah University City Student & Faculty Tech Pass',
    url: '/students',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    category: 'Community Hub',
    description: 'Exclusive 15% discount on device repairs, thermal maintenance, and screen protectors for University of Sharjah and AUS students.',
    dateAdded: '2026-10-19',
    badge: 'Student Pass',
    priority: '0.85'
  },
  {
    id: 'gcc-express',
    title: 'GCC Regional Express Mail-In Repair Service',
    url: '/gcc-services',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    category: 'Regional Logistics',
    description: 'Express door-to-door mail-in service for advanced motherboards across Riyadh, Muscat, Manama, Kuwait, and Doha.',
    dateAdded: '2026-10-18',
    badge: 'GCC Express',
    priority: '0.90'
  },
  {
    id: 'data-recovery',
    title: 'Cleanroom NAND Flash Forensic Data Recovery Lab',
    url: '/data-recovery',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    category: 'Data Security',
    description: 'Direct chip-off memory extraction for unbootable iPhones, waterlogged MacBooks, and physically damaged SSDs.',
    dateAdded: '2026-10-17',
    badge: 'Forensic Lab',
    priority: '0.90'
  }
];
