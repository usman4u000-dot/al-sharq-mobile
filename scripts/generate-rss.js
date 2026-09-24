import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://allsharq.com';
const BUILD_DATE = new Date().toUTCString();

// Extract all unique blog post metadata
const blogFiles = [
  'src/data/blogPosts.tsx',
  'src/data/blogs.ts',
  'src/data/seoBlogs1.tsx',
  'src/data/seoBlogs2.tsx',
  'src/data/seoBlogs3.tsx',
  'src/data/seoBlogs4.tsx',
  'src/data/seoBlogs5.tsx',
  'src/data/seoBlogsArabic.tsx'
];

const items = [];
const seenIds = new Set();

blogFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Match blog items
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    let idMatch;
    while ((idMatch = idRegex.exec(content)) !== null) {
      const id = idMatch[1].trim();
      if (id && !seenIds.has(id) && !id.includes(' ') && !id.startsWith('http')) {
        seenIds.add(id);

        // Try to extract title for this id block
        const blockStart = idMatch.index;
        const subBlock = content.slice(blockStart, blockStart + 1500);
        const titleMatch = subBlock.match(/title:\s*['"`]([^'"`]+)['"`]/);
        const excerptMatch = subBlock.match(/excerpt:\s*['"`]([^'"`]+)['"`]/);
        const dateMatch = subBlock.match(/date:\s*['"`]([^'"`]+)['"`]/);

        const title = titleMatch ? titleMatch[1].trim() : id.replace(/-/g, ' ');
        const excerpt = excerptMatch ? excerptMatch[1].trim() : 'Expert device repair and technical diagnostics in Muwaileh, Sharjah.';
        const date = dateMatch ? dateMatch[1].trim() : 'September 2026';

        items.push({ id, title, excerpt, date });
      }
    }
  }
});

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseTimestamp(dateStr) {
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.getTime();
    }
  } catch (_) {}
  return 0;
}

function parsePubDate(dateStr) {
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toUTCString();
    }
  } catch (_) {}
  return BUILD_DATE;
}

// Sort items chronologically descending (newest first)
items.sort((a, b) => parseTimestamp(b.date) - parseTimestamp(a.date));

// Google Search Central officially recommends max 60 items for RSS sitemap feeds
const feedItems = items.slice(0, 60);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Al Sharq Mobile Lab Sharjah - Tech &amp; Repair Updates</title>
    <link>${BASE_URL}</link>
    <description>Latest smartphone, MacBook, and laptop repair guides, pricing updates, and tech news from Al Sharq Mobile Lab in Muwaileh, Sharjah, UAE.</description>
    <language>en-ae</language>
    <lastBuildDate>${BUILD_DATE}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
`;

feedItems.forEach(item => {
  const url = `${BASE_URL}/blog/${item.id}`;
  xml += `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.excerpt)}</description>
      <pubDate>${parsePubDate(item.date)}</pubDate>
    </item>\n`;
});

xml += `  </channel>
</rss>\n`;

// Write to public/feed.xml & public/rss.xml
const publicFeedPath = path.join(rootDir, 'public', 'feed.xml');
const publicRssPath = path.join(rootDir, 'public', 'rss.xml');
fs.writeFileSync(publicFeedPath, xml, 'utf8');
fs.writeFileSync(publicRssPath, xml, 'utf8');
console.log(`Successfully generated public/feed.xml and public/rss.xml with ${feedItems.length} items (out of ${items.length} total posts).`);

const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'feed.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'rss.xml'), xml, 'utf8');
  console.log(`Successfully copied feeds to dist/ directory.`);
}
