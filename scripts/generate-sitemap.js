import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://allsharq.com';
const TODAY = '2026-09-19';

// Static routes categorized by importance
const routes = [
  // Primary
  { path: '/', priority: '1.0', changefreq: 'daily' },
  
  // Core High-Intent Repair Services (0.9)
  { path: '/phone-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/mobile-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/iphone-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/samsung-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/macbook-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/screen-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/cracked-screen-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/laptop-screen-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/battery-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/battery-replacement', priority: '0.9', changefreq: 'weekly' },
  { path: '/logic-board-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/data-recovery', priority: '0.9', changefreq: 'weekly' },
  { path: '/laptop-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/computer-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/tablet-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/apple-watch-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/android-flagship-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/gaming-phone-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/liquid-damage-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/water-damage-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/charging-port-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/camera-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/audio-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/body-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/printer-repair', priority: '0.9', changefreq: 'weekly' },
  { path: '/software-issues', priority: '0.9', changefreq: 'weekly' },
  { path: '/screen-protector', priority: '0.9', changefreq: 'weekly' },

  // Commercial, Tools & Hubs (0.85)
  { path: '/services', priority: '0.85', changefreq: 'weekly' },
  { path: '/repairs', priority: '0.85', changefreq: 'weekly' },
  { path: '/estimate', priority: '0.85', changefreq: 'weekly' },
  { path: '/repair-estimate', priority: '0.85', changefreq: 'weekly' },
  { path: '/track-repair', priority: '0.85', changefreq: 'weekly' },
  { path: '/intake-form', priority: '0.85', changefreq: 'weekly' },
  { path: '/shop', priority: '0.85', changefreq: 'weekly' },
  { path: '/trade-in', priority: '0.85', changefreq: 'weekly' },
  { path: '/corporate', priority: '0.85', changefreq: 'weekly' },
  { path: '/troubleshoot', priority: '0.85', changefreq: 'weekly' },

  // Trust, Info, & FAQs (0.8)
  { path: '/faq', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.8', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/warranty', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
];

// Extract all unique blog post IDs from files
const blogIds = new Set();
const blogFiles = [
  'src/data/blogs.ts',
  'src/data/blogPosts.tsx',
  'src/data/seoBlogs1.tsx',
  'src/data/seoBlogs2.tsx',
  'src/data/seoBlogs3.tsx',
  'src/data/seoBlogs4.tsx',
  'src/data/seoBlogs5.tsx',
  'src/data/seoBlogsArabic.tsx'
];

blogFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const id = match[1].trim();
      if (id && !id.includes(' ') && !id.startsWith('http')) {
        blogIds.add(id);
      }
    }
  }
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Add static routes
routes.forEach(route => {
  const url = `${BASE_URL}${route.path}`;
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
});

// Add all blog posts
const sortedBlogIds = Array.from(blogIds).sort();
sortedBlogIds.forEach(id => {
  const url = `${BASE_URL}/blog/${id}`;
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

xml += `</urlset>\n`;

// Write to public/sitemap.xml
const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, xml, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${routes.length + sortedBlogIds.length} URLs.`);

// Write to dist/sitemap.xml if dist exists
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, xml, 'utf8');
  console.log(`Successfully copied to dist/sitemap.xml.`);
}
