import { Request, Response, NextFunction } from 'express';

/**
 * Intelligent device/brand keyword mapping to modern repair service routes
 */
export function resolveTargetRepairRoute(path: string): string {
  const p = path.toLowerCase();

  // Laptops / Computers / PC
  if (
    p.includes('acer') ||
    p.includes('laptop') ||
    p.includes('computer') ||
    p.includes('notebook') ||
    p.includes('thinkpad') ||
    p.includes('dell') ||
    p.includes('asus') ||
    p.includes('hp-') ||
    p.includes('lenovo') ||
    p.includes('msi')
  ) {
    return '/laptop-repair';
  }

  // Apple iPhone
  if (
    p.includes('iphone') ||
    p.includes('apple-iphone') ||
    p.includes('ios')
  ) {
    return '/iphone-repair';
  }

  // Apple Mac
  if (
    p.includes('macbook') ||
    p.includes('imac') ||
    p.includes('mac-mini') ||
    p.includes('mac-pro')
  ) {
    return '/macbook-repair';
  }

  // Samsung Galaxy
  if (
    p.includes('samsung') ||
    p.includes('galaxy') ||
    p.includes('s24') ||
    p.includes('s23') ||
    p.includes('s25')
  ) {
    return '/samsung-repair';
  }

  // Tablets / iPads
  if (
    p.includes('tablet') ||
    p.includes('ipad') ||
    p.includes('wintouch') ||
    p.includes('tab-') ||
    p.includes('tab_') ||
    p.includes('kindle')
  ) {
    return '/tablet-repair';
  }

  // Smartwatches / Wearables
  if (
    p.includes('watch') ||
    p.includes('tiab09') ||
    p.includes('smartwatch') ||
    p.includes('fit-') ||
    p.includes('fit_') ||
    p.includes('band')
  ) {
    return '/apple-watch-repair';
  }

  // Android & Other Smartphone Brands
  if (
    p.includes('vivo') ||
    p.includes('huawei') ||
    p.includes('xiaomi') ||
    p.includes('oppo') ||
    p.includes('redmi') ||
    p.includes('realme') ||
    p.includes('oneplus') ||
    p.includes('nokia') ||
    p.includes('motorola') ||
    p.includes('pixel') ||
    p.includes('phone') ||
    p.includes('mobile')
  ) {
    return '/phone-repair';
  }

  // Screens / Displays
  if (p.includes('screen') || p.includes('display') || p.includes('lcd') || p.includes('oled')) {
    return '/screen-repair';
  }

  // Batteries
  if (p.includes('battery')) {
    return '/battery-repair';
  }

  // Default fallback for any legacy e-commerce product / category
  return '/services';
}

/**
 * Middleware to handle legacy WooCommerce URLs, query parameter pollution,
 * and old WordPress spam URLs to completely resolve Google Search Console errors:
 * - 301 Permanent Redirects for old WooCommerce products/categories with query params stripped
 * - 410 Gone for legacy WordPress spam/probe paths
 * - Preserves search equity and clears Soft 404, 403, and 5xx errors in Google Search Console
 */
export function legacySeoRedirectMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Only process GET and HEAD requests for SEO indexing
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  const rawUrl = req.originalUrl || req.url;
  const pathOnly = req.path;
  const pathLower = pathOnly.toLowerCase();

  // 1. Detect WordPress spam comment links and legacy CMS exploit probes
  const isWpSpamOrProbe =
    pathLower.includes('wp-login') ||
    pathLower.includes('wp-admin') ||
    pathLower.includes('xmlrpc.php') ||
    pathLower.includes('wp-comments-post') ||
    pathLower.includes('wp-trackback') ||
    pathLower.includes('wp-content') ||
    pathLower.includes('wp-includes') ||
    pathLower.includes('/author/') ||
    rawUrl.includes('replytocom=') ||
    'replytocom' in req.query;

  if (isWpSpamOrProbe) {
    // Return HTTP 410 Gone with explicit noindex so search engines immediately drop them permanently
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.setHeader('Cache-Control', 'public, max-age=604800'); // Cache 410 for 7 days
    res.status(410).type('text/html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>410 Gone | Al Sharq Mobile Lab</title>
  <meta name="robots" content="noindex, nofollow" />
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 60px 20px; color: #1e293b;">
  <h1 style="font-size: 32px; margin-bottom: 12px; color: #0f172a;">410 - Resource Permanently Removed</h1>
  <p style="font-size: 16px; max-width: 500px; margin: 0 auto 24px; color: #64748b;">
    This legacy URL is no longer available. The service has moved to our dedicated electronics engineering lab in Sharjah.
  </p>
  <a href="/" style="display: inline-block; padding: 10px 24px; background: #f97316; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">
    Return to Homepage
  </a>
</body>
</html>`);
    return;
  }

  // 2. Detect legacy WooCommerce product, category, and add-to-cart query URLs
  const isWooProduct = 
    pathLower.startsWith('/product/') || 
    pathLower.startsWith('/product-category/') || 
    pathLower.startsWith('/shop/') || 
    pathLower.startsWith('/item/');
    
  const hasAddToCart = 'add-to-cart' in req.query || rawUrl.includes('add-to-cart=');

  if (isWooProduct) {
    const targetRoute = resolveTargetRepairRoute(pathOnly);
    // Send 301 Permanent Redirect (strip all query parameters like add-to-cart)
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, targetRoute);
  }

  // 3. Clean any other URL that has `add-to-cart` parameter pollution
  if (hasAddToCart) {
    // Strip add-to-cart from query parameters
    const cleanUrl = pathOnly;
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, cleanUrl);
  }

  next();
}
