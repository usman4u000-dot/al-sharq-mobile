import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const BASE_URL = 'https://allsharq.com';

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// 1. Service Route Metadata Map
const serviceMetadata = {
  '/phone-repair': {
    title: 'Expert Phone Repair Sharjah | Same-Day Smartphone Lab | Al Sharq Mobile',
    description: 'Premier phone repair shop in Muwaileh, Sharjah. Same-day Apple, Samsung, Xiaomi screen replacement, battery swap, and motherboard repair with 90-day warranty.'
  },
  '/mobile-repair': {
    title: 'Mobile Repair Near Me Sharjah | Certified Electronics Lab | Al Sharq',
    description: 'Fast mobile phone repair near University City Sharjah. Certified technicians for cracked screens, water damage, charging ports, and chip-level micro-soldering.'
  },
  '/iphone-repair': {
    title: 'iPhone Repair Sharjah | Official Specs & Logic Board Micro-Soldering | Al Sharq',
    description: 'Specialist iPhone 18, 17, 16 Pro Max repair in Sharjah. Original OLED screen replacement, battery health restoration, Face ID repair, and liquid damage recovery.'
  },
  '/samsung-repair': {
    title: 'Samsung Galaxy Repair Sharjah | S26 Ultra, Z Fold & Flip Screen Fix | Al Sharq',
    description: 'Expert Samsung repair in Sharjah. Genuine AMOLED screens, Z Fold 6/7 hinge repairs, camera sensor calibration, and battery replacements at 20% below mall retail.'
  },
  '/macbook-repair': {
    title: 'MacBook Repair Sharjah | M4, M3 Logic Board & Screen Replacement | Al Sharq',
    description: 'Sharjah premier MacBook Pro & Air repair laboratory. Component-level micro-soldering, liquid spill clean, keyboard replacement, and NAND SSD data recovery.'
  },
  '/laptop-repair': {
    title: 'Laptop Repair Sharjah | Dell, HP, Lenovo, ASUS Motherboard Repair | Al Sharq',
    description: 'Fast laptop repairs in Muwaileh, Sharjah. Hinge rebuilding, thermal repasting, GPU repair, Windows optimization, and high-speed NVMe SSD upgrades.'
  },
  '/screen-repair': {
    title: 'Cracked Phone Screen Repair Sharjah | 20-Minute Replacement | Al Sharq',
    description: 'Cracked phone screen replacement in Sharjah. OEM grade OLED and LCD displays for iPhone, Samsung, Google Pixel, and iPad with true-tone calibration.'
  },
  '/cracked-screen-repair': {
    title: 'Broken Glass & OLED Screen Repair Sharjah | Al Sharq Mobile Lab',
    description: 'Glass-only refurbishment and complete OLED display module replacements in Sharjah. Preserve original colors and touch sensitivity at half dealership cost.'
  },
  '/laptop-screen-repair': {
    title: 'Laptop Screen Replacement Sharjah | 144Hz, 4K & Retina Displays | Al Sharq',
    description: 'Same-day laptop display replacements in Sharjah for Dell, HP, MacBook, Lenovo, and gaming laptops. Matte, glossy, and high refresh-rate panels in stock.'
  },
  '/battery-repair': {
    title: 'Phone Battery Replacement Sharjah | Swollen & Degraded Cell Fix | Al Sharq',
    description: 'Stop rapid battery drain. High-capacity, heat-resistant lithium battery replacements in Muwaileh, Sharjah with 100% health calibration and warranty.'
  },
  '/battery-replacement': {
    title: 'Smartphone & Laptop Battery Replacement Sharjah | Al Sharq Mobile Lab',
    description: 'Genuine battery replacements for iPhone, MacBook, Samsung Galaxy, and iPads. Eliminates shutdown issues and thermal throttling under UAE heat.'
  },
  '/logic-board-repair': {
    title: 'Logic Board Micro-Soldering Sharjah | Chip-Level Motherboard Lab | Al Sharq',
    description: 'Advanced SMD micro-soldering in Sharjah. We fix no-power boards, short circuits, audio IC failures, and CPU/PMIC issues that other shops declare dead.'
  },
  '/data-recovery': {
    title: 'Emergency Data Recovery Sharjah | Dead Phone & Hard Drive Recovery | Al Sharq',
    description: 'Cleanroom NAND flash chip-off data recovery for dead iPhones, water-damaged laptops, and corrupted SSDs in Sharjah. Strict client privacy protocol.'
  },
  '/tablet-repair': {
    title: 'iPad & Tablet Repair Sharjah | Digitizer Glass & Charging Port Fix | Al Sharq',
    description: 'Fast iPad Pro, Air, Mini, and Android tablet repair in Sharjah. Screen glass separation, Apple Pencil digitizer calibration, and bent frame straightening.'
  },
  '/apple-watch-repair': {
    title: 'Apple Watch Repair Sharjah | Screen Glass & Battery Replacement | Al Sharq',
    description: 'Apple Watch Ultra, Series 10, 9, 8 glass replacement and water seal restoration in Sharjah. Sensor repair and battery replacement with express turnaround.'
  },
  '/android-flagship-repair': {
    title: 'Android Flagship Repair Sharjah | Pixel, OnePlus, Xiaomi, Vivo | Al Sharq',
    description: 'Official parts and specialized tools for Google Pixel 9/10, OnePlus 13, Xiaomi 15, and Vivo X100/X200 flagships in Sharjah with warranty.'
  },
  '/gaming-phone-repair': {
    title: 'Gaming Phone Repair Sharjah | ASUS ROG Phone & RedMagic Specialists | Al Sharq',
    description: 'Sharjah center for ASUS ROG Phone, Nubia RedMagic, and Black Shark repair. Vapor chamber cooling fix, shoulder trigger replacement, and 165Hz displays.'
  },
  '/liquid-damage-repair': {
    title: 'Water & Liquid Damage Phone Repair Sharjah | Ultrasonic Cleaning | Al Sharq',
    description: 'Emergency liquid spill treatment in Sharjah. Ultrasonic PCB descaling, corrosion removal, short circuit tracing, and data preservation.'
  },
  '/water-damage-repair': {
    title: 'Emergency Water Damage Repair Sharjah | Sea Water & Coffee Recovery | Al Sharq',
    description: 'Don’t use rice. Bring your water-damaged phone or laptop immediately to our Muwaileh Sharjah lab for chemical bath dehydration and board repair.'
  },
  '/charging-port-repair': {
    title: 'Charging Port Repair Sharjah | Loose USB-C & Lightning Fix | Al Sharq',
    description: 'Fix loose charging cables, slow charging, and moisture detected errors. Fast USB-C port cleaning, pin re-soldering, and flex replacement in Sharjah.'
  },
  '/camera-repair': {
    title: 'Phone Camera Repair Sharjah | Blurry Lens, OIS Shake & Glass Fix | Al Sharq',
    description: 'Fix shaky phone cameras, broken sapphire lens glass, and black screen camera app errors in Sharjah. Genuine camera modules for iPhone & Samsung.'
  },
  '/audio-repair': {
    title: 'Speaker & Earpiece Repair Sharjah | Muffled Calls & Mic Fix | Al Sharq',
    description: 'Fix low in-call volume, distorted loudspeaker audio, and failing microphones in Sharjah. Acoustic mesh ultrasonic cleaning and component replacement.'
  },
  '/body-repair': {
    title: 'Phone Housing & Back Glass Laser Replacement Sharjah | Al Sharq Mobile',
    description: 'Cracked back glass repair using specialized cold laser separation in Sharjah. Restores pristine look without damaging internal wireless charging coils.'
  },
  '/printer-repair': {
    title: 'Laser & Inkjet Printer Repair Sharjah | HP, Canon, Epson | Al Sharq',
    description: 'Office printer repair in Sharjah. Paper jam clearing, printhead unclogging, roller replacement, toner reset, and Wi-Fi network setup.'
  },
  '/software-issues': {
    title: 'Smartphone & PC Software Repair Sharjah | Bootloop & OS Recovery | Al Sharq',
    description: 'Fix bootloops, frozen Apple logo, Android bricking, malware removal, and Windows/macOS clean installs in Sharjah with data preservation.'
  },
  '/screen-protector': {
    title: 'UV Tempered Glass & Privacy Screen Protector Installation Sharjah | Al Sharq',
    description: 'Bubble-free precision UV tempered glass and anti-peep privacy protectors installed in Muwaileh Sharjah for curved screens and flagships.'
  },
  '/services': {
    title: 'Complete Electronics Repair Services Sharjah | Lab Price List | Al Sharq',
    description: 'Full directory of smartphone, laptop, tablet, and logic board engineering services in Muwaileh Sharjah. Transparent pricing and 90-day warranty.'
  },
  '/repairs': {
    title: 'All Repair Services Sharjah | Certified Hardware Lab | Al Sharq Mobile',
    description: 'Browse all repair options for Apple, Samsung, Dell, HP, ASUS, and gaming devices in Sharjah. Express 30-minute walk-in service.'
  },
  '/estimate': {
    title: 'Instant 3-Click Repair Price Estimator Sharjah | Al Sharq Mobile',
    description: 'Calculate your exact repair cost for screens, batteries, water damage, and logic boards in Sharjah with no hidden fees.'
  },
  '/repair-estimate': {
    title: 'Get Instant Device Repair Quote Sharjah | Al Sharq Mobile Lab',
    description: 'Transparent repair estimates for smartphones, tablets, and laptops in Sharjah. Save 20% compared to mall retail centers.'
  },
  '/track-repair': {
    title: 'Live Repair Status Tracker | Digital Job Card Portal | Al Sharq Mobile',
    description: 'Track your device repair progress in real time. Enter your job card number to see technician diagnostic notes, photos, and readiness.'
  },
  '/intake-form': {
    title: 'Device Repair Intake Form | Fast-Track Check-In | Al Sharq Mobile Sharjah',
    description: 'Pre-book your repair online for priority workbench access at our Muwaileh Sharjah laboratory. Instant WhatsApp confirmation.'
  },
  '/shop': {
    title: 'Buy Phones & Accessories Sharjah | 20% Below Retail | Al Sharq Mobile',
    description: 'Shop brand-new and certified pre-owned iPhone 18, 17, 16, Samsung Galaxy S26, tablets, GaN chargers, and shockproof cases in Sharjah.'
  },
  '/product-category/tablet-accessories': {
    title: 'Tablet Accessories & Protection Hub Sharjah | Cases & Stylus | Al Sharq',
    description: 'Premium shockproof cases, paper-feel screen protectors, Apple Pencil tips, and Bluetooth keyboards for iPad, Samsung Tab, and Huion in Sharjah.'
  },
  '/tablet-accessories': {
    title: 'iPad & Tablet Accessories Guide Sharjah 2026 | Al Sharq Mobile',
    description: 'Complete guide to durable iPad cases, drop protection, fast chargers, and stylus accessories in Sharjah with express UAE delivery.'
  },
  '/trade-in': {
    title: 'Phone Trade-In Sharjah | Instant Cash for Used Phones & MacBooks | Al Sharq',
    description: 'Trade in your old phone, tablet, or laptop in Sharjah. Get instant cash or store credit towards the latest flagship with zero hassle.'
  },
  '/corporate': {
    title: 'Corporate B2B Device Maintenance & IT AMC Sharjah | Al Sharq Mobile',
    description: 'Enterprise fleet maintenance for corporate laptops, tablets, and employee smartphones across Sharjah and Dubai. Dedicated account manager.'
  },
  '/troubleshoot': {
    title: 'Interactive Hardware Diagnostic & Troubleshooting Tool | Al Sharq Mobile',
    description: 'Free self-diagnostic tool to test your screen, battery, speakers, sensors, and charging port before visiting a repair shop in Sharjah.'
  },
  '/faq': {
    title: 'Frequently Asked Questions | Device Repair & Warranty | Al Sharq Mobile Sharjah',
    description: 'Everything you need to know about repair timelines, genuine parts, data security, 90-day warranty, and payment options in Sharjah.'
  },
  '/about': {
    title: 'About Al Sharq Mobile | 12+ Years of Engineering Excellence in Sharjah',
    description: 'Learn about Al Sharq Mobile Phone & Computer Trading LLC. Over 12 years in Muwaileh Sharjah with 18,000+ satisfied clients and certified engineers.'
  },
  '/contact': {
    title: 'Contact Al Sharq Mobile Lab Sharjah | Location, WhatsApp & Hours',
    description: 'Visit our repair center on Fire Station Road, Muwaileh, Sharjah. Open Saturday to Thursday 9am-11pm. WhatsApp: +971 50 711 7043.'
  },
  '/reviews': {
    title: 'Customer Reviews & Workbench Testimonials | Al Sharq Mobile Sharjah',
    description: 'Read real verified customer reviews from Sharjah, Dubai, Abu Dhabi, Saudi Arabia, and Oman for our smartphone and MacBook repairs.'
  },
  '/gallery': {
    title: 'Electronics Lab & Micro-Soldering Gallery | Al Sharq Mobile Sharjah',
    description: 'Take a look inside our cleanroom repair laboratory, SMD micro-soldering workstations, and before-and-after device restorations in Sharjah.'
  },
  '/warranty': {
    title: '90-Day Comprehensive Repair Warranty Policy | Al Sharq Mobile Sharjah',
    description: 'Our promise to you: 90 days of complete warranty on replacement screens, batteries, charging ports, and motherboard micro-soldering.'
  },
  '/privacy': {
    title: 'Data Privacy & Strict Non-Disclosure Policy | Al Sharq Mobile Lab',
    description: 'Your photos, messages, and files remain 100% confidential. Read our strict zero-access data privacy protocol for device repairs.'
  },
  '/gcc-services': {
    title: 'GCC Regional Express Shipping & Mail-In Repair | Saudi Arabia, Oman | Al Sharq',
    description: 'Mail-in phone and MacBook repair service for Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar. Fast DHL shipping and wholesale electronics export.'
  },
  '/international-repair': {
    title: 'International Mail-In Logic Board Repair Hub Sharjah | Al Sharq Mobile',
    description: 'Global electronics repair hub in Sharjah. International clients in Turkey, GCC, and North Africa ship advanced logic board repairs to our lab.'
  },
  '/arabic-services': {
    title: 'خدمات تصليح الهواتف والكمبيوتر في الشارقة | شركة الشرق للهواتف المتحركة',
    description: 'أفضل مركز صيانة هواتف واجهزة كمبيوتر في مويلح، الشارقة. تصليح فوري لشاشات الايفون والسامسونج، صيانة المذربورد، واستعادة البيانات بضمان 90 يوماً.'
  },
  '/student-discount': {
    title: 'Sharjah University City Student & Faculty Tech Discount Pass | Al Sharq',
    description: 'Exclusive 15% discount on device repairs and screen protectors for students of University of Sharjah, AUS, and Skyline University.'
  },
  '/students': {
    title: 'University City Student Tech Hub Sharjah | Fast Phone & Laptop Fix',
    description: 'Emergency same-day laptop and phone repairs for university students in Sharjah. Fast turnaround between classes.'
  },
  '/blog': {
    title: 'Electronics Lab Blog & UAE Hardware Guides | Al Sharq Mobile Sharjah',
    description: 'Expert repair guides, device teardowns, summer heat protection tips, and buyer guides by certified electronics technicians in Sharjah.'
  }
};

// 2. Extract all Blog Posts from src/data
const blogMap = new Map();
const dataDir = path.join(rootDir, 'src/data');
const blogFiles = fs.readdirSync(dataDir)
  .filter(f => (f.startsWith('seoBlogs') || f.startsWith('blog')) && (f.endsWith('.tsx') || f.endsWith('.ts')));

for (const file of blogFiles) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  for (const m of idMatches) {
    const id = m[1].trim();
    if (id && !id.includes(' ') && !id.startsWith('http')) {
      const sub = content.substring(m.index, m.index + 2000);
      const titleMatch = sub.match(/title:\s*['"]([^'"]+)['"]/);
      const excerptMatch = sub.match(/excerpt:\s*['"]([^'"]+)['"]/);
      const dateMatch = sub.match(/date:\s*['"]([^'"]+)['"]/);
      const categoryMatch = sub.match(/category:\s*['"]([^'"]+)['"]/);
      const authorMatch = sub.match(/author:\s*['"]([^'"]+)['"]/);
      const lastModifiedMatch = sub.match(/lastModified:\s*['"]([^'"]+)['"]/);
      blogMap.set(id, {
        id,
        title: titleMatch ? titleMatch[1] : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        excerpt: excerptMatch ? excerptMatch[1] : 'Detailed technical breakdown and device repair guide from Al Sharq Mobile Lab on Fire Station Road, Muwaileh, Sharjah.',
        date: dateMatch ? dateMatch[1] : '2026-10-15',
        lastModified: lastModifiedMatch ? lastModifiedMatch[1] : 'October 16, 2026',
        author: authorMatch ? authorMatch[1] : 'Eng. Usman Tariq – Master Hardware Diagnostic Specialist',
        category: categoryMatch ? categoryMatch[1] : 'Repair Guide'
      });
    }
  }
}

console.log(`Loaded ${blogMap.size} blog articles for static generation.`);

// 3. Helper to build customized HTML
function buildPageHtml(routePath, title, description, schemaJson = null) {
  const canonicalUrl = `${BASE_URL}${routePath}`;
  let html = templateHtml;

  // Replace canonical tag
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace hreflang tags to match exact page
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en-ae"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en-ae" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`
  );

  // Replace twitter:url or insert
  if (html.includes('twitter:url')) {
    html = html.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:url" content="${canonicalUrl}" />`
    );
  }

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Replace og:title & og:description
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );

  // Replace twitter:title & twitter:description
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  // Inject Dedicated Schema if available
  if (schemaJson) {
    const schemaTag = `\n    <!-- Dedicated Route Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n    </script>\n`;
    html = html.replace('</head>', `${schemaTag}</head>`);
  }

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let generatedCount = 0;

// 4. Generate Service Routes
for (const [routePath, meta] of Object.entries(serviceMetadata)) {
  const targetDir = path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": meta.title,
    "description": meta.description,
    "url": `${BASE_URL}${routePath}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "telephone": "+971507117043",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BLDG#1017 - SHOP#2 Fire Station Road, Muwaileh - Industrial Area",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Dubai" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ]
  };

  const html = buildPageHtml(routePath, meta.title, meta.description, serviceSchema);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  generatedCount++;
}

// 5. Generate Blog Routes
for (const [id, post] of blogMap.entries()) {
  const routePath = `/blog/${id}`;
  const targetDir = path.join(distDir, 'blog', id);
  fs.mkdirSync(targetDir, { recursive: true });

  const blogTitle = `${post.title} | Al Sharq Mobile Sharjah`;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}${routePath}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.lastModified || new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author || "Eng. Usman Tariq",
      "jobTitle": "Lead Hardware Diagnostic Engineer",
      "worksFor": {
        "@type": "LocalBusiness",
        "name": "Al Sharq Mobile Phone & Computer Trading LLC",
        "url": BASE_URL
      }
    },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Al Sharq Mobile Phone & Computer Trading LLC",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    }
  };

  const html = buildPageHtml(routePath, blogTitle, post.excerpt, blogSchema);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  generatedCount++;
}

console.log(`✅ Successfully prerendered ${generatedCount} static pages into dist/ with self-referencing canonicals, titles, and schema!`);
