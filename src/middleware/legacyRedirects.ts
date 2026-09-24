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

  // Audio / Headphones / Earbuds
  if (
    p.includes('audio') ||
    p.includes('sound') ||
    p.includes('speaker') ||
    p.includes('headphone') ||
    p.includes('earbuds') ||
    p.includes('airpods')
  ) {
    return '/audio-repair';
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

  // Samsung Galaxy & Wearables
  if (
    p.includes('samsung') ||
    p.includes('galaxy') ||
    p.includes('s24') ||
    p.includes('s23') ||
    p.includes('s25')
  ) {
    return '/samsung-repair';
  }

  // Tablets / iPads / Huion Digitizers
  if (
    p.includes('tablet') ||
    p.includes('ipad') ||
    p.includes('huion') ||
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
    p.includes('wearable') ||
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

  // 1. Detect WordPress spam comment links, movie/player injection spam, and legacy CMS exploit probes
  const isWpSpamOrProbe =
    pathLower.startsWith('/player') ||
    pathLower.startsWith('/movie') ||
    pathLower.startsWith('/stream') ||
    pathLower.startsWith('/video') ||
    pathLower.startsWith('/embed') ||
    rawUrl.includes('stream=') ||
    rawUrl.includes('player?') ||
    pathLower.includes('wp-login') ||
    pathLower.includes('wp-admin') ||
    pathLower.includes('xmlrpc.php') ||
    pathLower.includes('wp-comments-post') ||
    pathLower.includes('wp-trackback') ||
    pathLower.includes('wp-content') ||
    pathLower.includes('wp-includes') ||
    pathLower.includes('/author/') ||
    pathLower === '/feed' ||
    pathLower.startsWith('/feed/') ||
    pathLower.includes('/comments/feed') ||
    rawUrl.includes('replytocom=') ||
    'replytocom' in req.query ||
    'stream' in req.query;

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
    This legacy URL or spam query is no longer available. The service has moved to our dedicated electronics engineering lab in Sharjah.
  </p>
  <a href="/" style="display: inline-block; padding: 10px 24px; background: #f97316; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">
    Return to Homepage
  </a>
</body>
</html>`);
    return;
  }

  // 2. Detect legacy WooCommerce cart, checkout, user accounts, and wishlist
  const isLegacyCartOrCheckout =
    pathLower === '/cart' ||
    pathLower.startsWith('/cart/') ||
    pathLower === '/checkout' ||
    pathLower.startsWith('/checkout/') ||
    pathLower === '/wishlist' ||
    pathLower.startsWith('/wishlist/');

  if (isLegacyCartOrCheckout) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, '/shop');
  }

  const isLegacyAccount =
    pathLower === '/my-account' ||
    pathLower.startsWith('/my-account/');

  if (isLegacyAccount) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, '/track-repair');
  }

  // 3. Detect legacy WooCommerce product, category, taxonomy, and add-to-cart query URLs
  const isWooProduct = 
    pathLower.startsWith('/product/') || 
    pathLower.startsWith('/product-category/') || 
    pathLower.startsWith('/product-tag/') || 
    pathLower.startsWith('/brand/') || 
    pathLower.startsWith('/brands/') || 
    pathLower.startsWith('/item/') ||
    pathLower.startsWith('/items/') ||
    (pathLower.startsWith('/shop/') && pathLower !== '/shop');
    
  const hasLegacyParams = 
    'add-to-cart' in req.query || 
    'orderby' in req.query || 
    'min_price' in req.query || 
    'max_price' in req.query || 
    'rating_filter' in req.query ||
    'wc-ajax' in req.query ||
    rawUrl.includes('add-to-cart=') ||
    rawUrl.includes('orderby=');

  if (isWooProduct) {
    const targetRoute = resolveTargetRepairRoute(pathOnly);
    // Send 301 Permanent Redirect (strip all query parameters like add-to-cart, orderby)
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, targetRoute);
  }

  // 4. Clean any other URL that has legacy query parameter pollution (e.g. `/?add-to-cart=1410` or `/?orderby=rating`)
  if (hasLegacyParams) {
    // Strip query parameters and redirect to canonical clean path
    const cleanUrl = pathOnly;
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.redirect(301, cleanUrl);
  }

  next();
}
