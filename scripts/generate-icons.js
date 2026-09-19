import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 1. Generate favicon.svg (Vector)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
  </defs>

  <!-- Background Rounded Squircle -->
  <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#bgGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"/>
  
  <!-- Subtle border highlight -->
  <rect x="5" y="5" width="90" height="90" rx="23" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>

  <!-- Stylized Phone Chassis -->
  <rect x="25" y="16" width="50" height="68" rx="8" fill="url(#screenGrad)" stroke="#FFFFFF" stroke-width="2.5"/>

  <!-- Speaker / Earpiece Pill -->
  <rect x="42" y="20" width="16" height="3" rx="1.5" fill="#94A3B8"/>

  <!-- Screen Content: Glowing Circuit / Repair Tool Emblem -->
  <!-- Circuit tracks -->
  <path d="M 33 45 L 42 45 L 47 38 L 55 38" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="33" cy="45" r="2.5" fill="#F97316"/>
  
  <path d="M 67 55 L 58 55 L 53 62 L 45 62" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="67" cy="55" r="2.5" fill="#38BDF8"/>

  <!-- Center Chip / Core -->
  <rect x="43" y="44" width="14" height="14" rx="3" fill="url(#glowGrad)"/>
  <circle cx="50" cy="51" r="3.5" fill="#FFFFFF"/>

  <!-- Home Indicator Bar -->
  <rect x="41" y="78" width="18" height="2" rx="1" fill="#94A3B8"/>
</svg>
`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
console.log('Created favicon.svg');

// 2. Generate logo.svg
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="100%" height="100%">
  <defs>
    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
  </defs>

  <!-- Icon Symbol -->
  <g transform="translate(10, 10)">
    <rect x="0" y="0" width="60" height="60" rx="16" fill="url(#logoBg)"/>
    <!-- Phone outline -->
    <rect x="15" y="10" width="30" height="40" rx="5" fill="#0F172A" stroke="#FFFFFF" stroke-width="2"/>
    <!-- Center Wrench / Repair Bolt -->
    <path d="M 26 26 L 34 34 M 26 34 L 34 26" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="30" cy="30" r="2" fill="#38BDF8"/>
  </g>

  <!-- Typography -->
  <text x="85" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#1E3A8A">
    Al Sharq <tspan fill="#F97316">Mobile</tspan>
  </text>
  <text x="85" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" letter-spacing="1.5" fill="#64748B">
    PHONE &amp; COMPUTER TRADING LLC • SHARJAH
  </text>
</svg>
`;

fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg, 'utf8');
console.log('Created logo.svg');

// 3. Helper to generate standard PNG files
function generateBrandPNG(width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcVal = zlib.crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR: RGBA (color type 6, 8-bit depth)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = chunk('IHDR', ihdr);

  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  const cx = width / 2;
  const cy = height / 2;
  const outerR = width * 0.46;
  const cornerR = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const px = rowOffset + 1 + x * 4;
      
      // Rounded rectangle test
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const maxDx = width * 0.44;
      const maxDy = height * 0.44;
      
      let inside = false;
      if (dx <= maxDx - cornerR && dy <= maxDy) inside = true;
      else if (dx <= maxDx && dy <= maxDy - cornerR) inside = true;
      else {
        const cornerDist = Math.hypot(dx - (maxDx - cornerR), dy - (maxDy - cornerR));
        if (cornerDist <= cornerR) inside = true;
      }

      if (inside) {
        // Gradient from vibrant orange to deep navy blue
        const t = (x + y) / (width + height);
        const r = Math.round(249 * (1 - t) + 30 * t);
        const g = Math.round(115 * (1 - t) + 58 * t);
        const b = Math.round(22 * (1 - t) + 138 * t);

        // Draw smartphone silhouette in center
        const phoneW = width * 0.44;
        const phoneH = height * 0.62;
        const isPhone = (Math.abs(x - cx) <= phoneW / 2) && (Math.abs(y - cy) <= phoneH / 2);

        if (isPhone) {
          // Phone screen
          const screenW = width * 0.36;
          const screenH = height * 0.50;
          const isScreen = (Math.abs(x - cx) <= screenW / 2) && (Math.abs(y - cy) <= screenH / 2);

          if (isScreen) {
            // Chip emblem
            const chipSize = width * 0.14;
            if (Math.abs(x - cx) <= chipSize / 2 && Math.abs(y - cy) <= chipSize / 2) {
              rawData[px] = 249; // Orange
              rawData[px + 1] = 115;
              rawData[px + 2] = 22;
              rawData[px + 3] = 255;
            } else {
              rawData[px] = 15; // Dark Slate Screen
              rawData[px + 1] = 23;
              rawData[px + 2] = 42;
              rawData[px + 3] = 255;
            }
          } else {
            // Phone border
            rawData[px] = 255;
            rawData[px + 1] = 255;
            rawData[px + 2] = 255;
            rawData[px + 3] = 255;
          }
        } else {
          rawData[px] = r;
          rawData[px + 1] = g;
          rawData[px + 2] = b;
          rawData[px + 3] = 255;
        }
      } else {
        // Transparent
        rawData[px] = 0;
        rawData[px + 1] = 0;
        rawData[px + 2] = 0;
        rawData[px + 3] = 0;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = chunk('IDAT', compressed);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Write PNG files
const p192 = generateBrandPNG(192, 192);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), p192);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), p192);

const p512 = generateBrandPNG(512, 512);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), p512);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), p512);

const appleIcon = generateBrandPNG(180, 180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

const faviconPng = generateBrandPNG(48, 48);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), faviconPng);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconPng);

// Copy as logo.png for schema fallback
const logoPng = generateBrandPNG(512, 512);
fs.writeFileSync(path.join(publicDir, 'logo.png'), logoPng);

console.log('Created PNG icons: icon-192, icon-512, apple-touch-icon, favicon.png, favicon.ico, logo.png');

// 4. Generate manifest.json (PWA Web App Manifest)
const manifest = {
  name: "Al Sharq Mobile Phone & Computer Trading LLC",
  short_name: "Al Sharq Mobile",
  description: "Premier smartphone, laptop, and MacBook repair center in Sharjah. Same-day repair, screen replacement, and genuine parts.",
  start_url: "/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#0F172A",
  theme_color: "#F97316",
  lang: "en-AE",
  categories: ["business", "shopping", "utilities"],
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any maskable"
    },
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('Created manifest.json');
