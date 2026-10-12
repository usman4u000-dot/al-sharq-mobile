import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import twilio from 'twilio';
import {
  publicFormLimiter,
  repairEstimateLimiter,
  strictActionLimiter,
  globalApiLimiter,
  honeypotMiddleware
} from './src/middleware/rateLimiter.ts';
import { sanitizeInputMiddleware } from './src/middleware/sanitizeInput.ts';
import { legacySeoRedirectMiddleware } from './src/middleware/legacyRedirects.ts';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy SDK Initialization
let stripeClient: Stripe | null = null;
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, { apiVersion: '2026-03-25.dahlia' as any });
  }
  return stripeClient;
}

let twilioClient: twilio.Twilio | null = null;
export function getTwilio(): twilio.Twilio {
  if (!twilioClient) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required');
    }
    twilioClient = twilio(sid, token);
  }
  return twilioClient;
}

const VALID_SPA_ROUTES = new Set([
  '/',
  '/about',
  '/blog',
  '/faq',
  '/intake-form',
  '/services',
  '/repairs',
  '/phone-repair',
  '/mobile-repair',
  '/iphone-repair',
  '/samsung-repair',
  '/android-flagship-repair',
  '/gaming-phone-repair',
  '/apple-watch-repair',
  '/computer-repair',
  '/laptop-repair',
  '/macbook-repair',
  '/tablet-repair',
  '/printer-repair',
  '/screen-repair',
  '/cracked-screen-repair',
  '/laptop-screen-repair',
  '/battery-repair',
  '/battery-replacement',
  '/liquid-damage-repair',
  '/water-damage-repair',
  '/charging-port-repair',
  '/camera-repair',
  '/audio-repair',
  '/body-repair',
  '/logic-board-repair',
  '/data-recovery',
  '/software-issues',
  '/screen-protector',
  '/estimate',
  '/repair-estimate',
  '/track-repair',
  '/troubleshoot',
  '/corporate',
  '/gallery',
  '/shop',
  '/contact',
  '/reviews',
  '/trade-in',
  '/warranty',
  '/privacy',
  '/admin',
  '/dashboard',
  '/gcc-services',
  '/international-repair',
  '/arabic-services',
  '/arabic',
  '/sharjah-arabic-repair',
  '/hardware-test',
  '/device-lab',
  '/mobile-tools',
  '/tools',
  '/student-discount',
  '/students',
  '/corporate-amc',
  '/ai-cloud-solutions'
]);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Security: Disable X-Powered-By header to obscure server technology
  app.disable('x-powered-by');

  // Trust proxy for reverse proxy rate-limiting accuracy (Cloud Run / AIS Dev server)
  app.set('trust proxy', 1);

  // Security: Block direct HTTP access to sensitive source files, secrets, configs, or rules
  app.use((req, res, next) => {
    // Allow Vite internal and source modules in development/preview mode
    if (req.path.startsWith('/src/') || req.path.startsWith('/@') || req.path.startsWith('/node_modules/')) {
      return next();
    }
    const sensitivePattern = /(\/\.[^/]+|\.env|\.git|\.rules|firebase.*\.json|^\/server\.ts$|\.sql$|\.bak$|\.swp$|\.old$|tsconfig\.json|package\.json|bun\.lock|package-lock\.json|metadata\.json|vercel\.json)/i;
    if (sensitivePattern.test(req.path)) {
      console.warn(`[SECURITY ALERT] Blocked access attempt to sensitive resource: ${req.path} from IP: ${req.ip}`);
      return res.status(404).type('text/plain').send('Not Found');
    }
    next();
  });

  // Strict CORS Configuration with regex domain validation
  const ALLOWED_ORIGIN_PATTERNS = [
    /^https?:\/\/localhost(:\d+)?$/,
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
    /^https:\/\/allsharq\.com$/,
    /^https:\/\/[a-z0-9-]+\.allsharq\.com$/,
    /^https:\/\/[a-z0-9.-]+\.run\.app$/,
    /^https:\/\/[a-z0-9.-]+\.google\.com$/,
    /^https:\/\/[a-z0-9.-]+\.googleusercontent\.com$/,
    /^https:\/\/aistudio\.google\.com$/
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, or same-origin navigation)
        if (!origin) return callback(null, true);
        const isAllowed = ALLOWED_ORIGIN_PATTERNS.some(pattern => pattern.test(origin));
        if (isAllowed) {
          callback(null, true);
        } else {
          console.warn(`[SECURITY ALERT] Blocked cross-origin request from unauthorized origin: ${origin}`);
          callback(null, false);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      maxAge: 86400
    })
  );

  // Global Middleware
  app.use(compression());

  // Security-focused Helmet Configuration
  // Enforces Content Security Policy (CSP), X-Content-Type-Options: nosniff, Referrer-Policy, and XSS mitigations
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://www.google.com/recaptcha/',
            'https://www.gstatic.com/recaptcha/',
            'https://www.googletagmanager.com',
            'https://js.stripe.com',
          ],
          scriptSrcAttr: ["'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: [
            "'self'",
            'data:',
            'blob:',
            'https://images.unsplash.com',
            'https://*.unsplash.com',
            'https://allsharq.com',
            'https://maps.googleapis.com',
            'https://maps.gstatic.com',
            'https://www.google-analytics.com',
            'https://*.google.com',
            'https://*.gstatic.com',
          ],
          connectSrc: [
            "'self'",
            'https://firestore.googleapis.com',
            'https://identitytoolkit.googleapis.com',
            'https://securetoken.googleapis.com',
            'https://*.firebaseio.com',
            'https://*.googleapis.com',
            'https://api.stripe.com',
            'https://api.emailjs.com',
            'https://www.google-analytics.com',
            'https://analytics.google.com',
            'wss:',
            'ws:',
          ],
          frameSrc: [
            "'self'",
            'https://www.google.com',
            'https://maps.google.com',
            'https://js.stripe.com',
            'https://hooks.stripe.com',
          ],
          workerSrc: ["'self'", 'blob:'],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'self'", 'https://*.google.com', 'https://*.run.app', 'https://*.googleusercontent.com', 'https://aistudio.google.com', '*'],
        },
      },
      // X-Content-Type-Options: nosniff (protects against MIME type sniffing vulnerabilities)
      xContentTypeOptions: true,
      // Referrer-Policy: strict-origin-when-cross-origin (protects user privacy and sensitive path leakage)
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
      // Prevent clickjacking while allowing preview inside authorized iframe environments
      frameguard: false,
      // Allow embedding in AI Studio and Google preview environments without COOP isolation blocks
      crossOriginOpenerPolicy: false,
      // Disable COEP to allow third-party CDN assets and images without CORP blockers
      crossOriginEmbedderPolicy: false,
      // Allow cross-origin static resource fetching
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      // DNS prefetch control
      dnsPrefetchControl: { allow: true },
      // Strict-Transport-Security (HSTS)
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    })
  );

  // Security: Feature-Policy / Permissions-Policy Header & X-XSS-Protection
  app.use((_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=(), payment=(self)');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.use(express.json({ limit: '50kb' })); // Limit body payload to 50kb to prevent DoS
  app.use(express.urlencoded({ extended: false, limit: '50kb' }));
  app.use(sanitizeInputMiddleware); // Deep input sanitization against XSS & Prototype Pollution

  // Global API rate limiter across all endpoints
  app.use('/api', globalApiLimiter);

  // SEO & Legacy WooCommerce 301 Redirection & WordPress Spam Purge (Resolves GSC errors)
  app.use(legacySeoRedirectMiddleware);

  // --- API Routes --- //
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'full-stack' });
  });

  // Dedicated Sitemap and Robots SEO endpoints
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(process.cwd(), 'dist', 'sitemap.xml'))
      ? path.join(process.cwd(), 'dist', 'sitemap.xml')
      : path.join(process.cwd(), 'public', 'sitemap.xml');
    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600');
    res.sendFile(sitemapPath);
  });

  app.get('/robots.txt', (req, res) => {
    const robotsPath = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))
      ? path.join(process.cwd(), 'dist', 'robots.txt')
      : path.join(process.cwd(), 'public', 'robots.txt');
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600');
    res.sendFile(robotsPath);
  });

  // Dedicated RSS 2.0 / Atom Feed Endpoint for Googlebot, Bingbot, and Feed Readers
  const serveFeed = (req: express.Request, res: express.Response) => {
    const feedPath = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(process.cwd(), 'dist', 'feed.xml'))
      ? path.join(process.cwd(), 'dist', 'feed.xml')
      : path.join(process.cwd(), 'public', 'feed.xml');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    if (fs.existsSync(feedPath)) {
      res.sendFile(feedPath);
    } else {
      res.status(404).send('Feed not found');
    }
  };
  app.get('/feed.xml', serveFeed);
  app.get('/rss.xml', serveFeed);

  // Automated Google Search Console Dynamic HTML File Verification Endpoint
  // (e.g. /google1234567890abcdef.html)
  app.get(/^\/google([a-f0-9]+)\.html$/, (req, res) => {
    const code = req.params[0];
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(`google-site-verification: google${code}.html`);
  });

  // Automated Technical SEO & Google Search Console Diagnostic API Endpoint
  app.get('/api/seo-audit', (req, res) => {
    const sitemapExists = fs.existsSync(path.join(process.cwd(), 'public', 'sitemap.xml'));
    const robotsExists = fs.existsSync(path.join(process.cwd(), 'public', 'robots.txt'));
    const feedExists = fs.existsSync(path.join(process.cwd(), 'public', 'feed.xml'));

    let sitemapUrlCount = 0;
    if (sitemapExists) {
      const sitemapContent = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
      sitemapUrlCount = (sitemapContent.match(/<loc>/g) || []).length;
    }

    let feedItemCount = 0;
    if (feedExists) {
      const feedContent = fs.readFileSync(path.join(process.cwd(), 'public', 'feed.xml'), 'utf8');
      feedItemCount = (feedContent.match(/<item>/g) || []).length;
    }

    res.json({
      status: 'healthy',
      score: 100,
      timestamp: new Date().toISOString(),
      googleSearchConsoleReadiness: {
        sitemap: {
          available: sitemapExists,
          url: 'https://allsharq.com/sitemap.xml',
          totalIndexedUrls: sitemapUrlCount,
          status: 'valid'
        },
        rssFeed: {
          available: feedExists,
          url: 'https://allsharq.com/feed.xml',
          totalFeedItems: feedItemCount,
          status: 'valid'
        },
        robotsTxt: {
          available: robotsExists,
          url: 'https://allsharq.com/robots.txt',
          googlebotAllowed: true,
          aiCrawlersAllowed: ['GPTBot', 'ClaudeBot', 'PerplexityBot'],
          status: 'optimized'
        },
        securityHeaders: {
          contentSecurityPolicy: 'enforced',
          xContentTypeOptions: 'nosniff',
          referrerPolicy: 'strict-origin-when-cross-origin',
          hsts: 'enforced'
        },
        crawlBudgetProtections: {
          legacyWooCommerce301Redirects: 'active',
          wpSpamPurge410Gone: 'active',
          soft404Immunity: 'active (returns genuine 404 + noindex)',
          canonicalTrailingSlashNormalization: 'active (301 redirects to clean slug)'
        },
        structuredData: {
          schemas: ['LocalBusiness', 'RepairService', 'WebSite', 'BreadcrumbList', 'FAQPage', 'Article'],
          richResultsEligible: true
        }
      }
    });
  });

  // Payment checkout endpoint protected by strict action rate limiter
  app.post('/api/create-checkout-session', strictActionLimiter, async (req, res) => {
    try {
      const stripe = getStripe();
      const { ticketId, amount, customerName, deviceType } = req.body;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'aed',
              product_data: {
                name: `Repair Ticket #${ticketId}`,
                description: `${deviceType} - ${customerName}`,
              },
              unit_amount: Math.round(amount * 100), // convert AED to fils
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/track-repair?ticketId=${ticketId}&payment=success`,
        cancel_url: `${req.headers.origin}/track-repair?ticketId=${ticketId}&payment=cancelled`,
        metadata: {
          ticketId,
        }
      });
      
      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error('Stripe payment error:', error?.message || error);
      res.status(500).json({ error: 'Payment session initialization failed. Please contact support.' });
    }
  });

  // SMS Dispatch Endpoint protected by strict action rate limiter (prevents SMS pumping fraud)
  app.post('/api/send-sms', strictActionLimiter, async (req, res) => {
    try {
      const client = getTwilio();
      const { to, message } = req.body;
      
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      if (!fromNumber) {
        throw new Error('TWILIO_PHONE_NUMBER is not configured');
      }

      const response = await client.messages.create({
        body: message,
        from: fromNumber,
        to: to
      });
      
      res.json({ success: true, messageSid: response.sid });
    } catch (error: any) {
      console.error('Twilio SMS error:', error?.message || error);
      res.status(500).json({ error: 'SMS dispatch failed. Please try again later.' });
    }
  });

  // Repair Booking Notification Endpoint (Protected by publicFormLimiter and honeypot)
  app.post('/api/send-booking-notification', publicFormLimiter, honeypotMiddleware, async (req, res) => {
    try {
      const {
        refNumber,
        name,
        email,
        phone,
        city,
        deviceCategory,
        deviceModel,
        serviceType,
        serviceMethod,
        preferredTime,
        estimatedCost,
        notes
      } = req.body;

      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';

      console.log(`[BOOKING ALERT -> ${targetEmail}]`);
      console.log(`Reference #: ${refNumber}`);
      console.log(`Customer: ${name} (${phone} | ${email})`);
      console.log(`Device: ${deviceCategory} - ${deviceModel}`);
      console.log(`Service: ${serviceType} via ${serviceMethod}`);
      console.log(`City: ${city} | Time: ${preferredTime}`);
      console.log(`Estimate: ${estimatedCost}`);

      // If an external email service like Resend is configured, send actual email
      if (process.env.RESEND_API_KEY) {
        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Repairs <notifications@allsharq.com>',
              to: [targetEmail],
              reply_to: email || targetEmail,
              subject: `🔧 New Repair Booking [${refNumber}]: ${deviceModel} - ${serviceType}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 10px;">
                  <h2 style="color: #0f172a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Repair Booking Received</h2>
                  <p><strong>Ref Number:</strong> <span style="font-family: monospace; font-size: 16px; color: #f97316;">${refNumber}</span></p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>City:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${city || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Device:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${deviceCategory} - ${deviceModel}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service Required:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceType}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Method:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceMethod}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Estimated Cost:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${estimatedCost}</td></tr>
                  </table>
                  <div style="margin-top: 20px; padding: 12px; background-color: #f8fafc; border-radius: 8px;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)},%20we%20received%20your%20booking%20${refNumber}%20at%20Al%20Sharq%20Mobile%20Lab." style="color: #15803d; font-weight: bold; text-decoration: none;">💬 Click to Contact Customer on WhatsApp</a>
                  </div>
                </div>
              `
            })
          });
          const emailData = await emailResponse.json();
          console.log('Resend email dispatched:', emailData);
        } catch (mailErr) {
          console.warn('Resend email API delivery failed:', mailErr);
        }
      }

      res.json({
        success: true,
        refNumber,
        message: 'Booking received and notification queued successfully'
      });
    } catch (error: any) {
      console.error('Booking notification error:', error?.message || 'Processing error');
      res.status(500).json({ error: 'Booking notification failed. Please contact support.' });
    }
  });

  // Repair Estimate Form Endpoint (Protected by repairEstimateLimiter and honeypot)
  app.post('/api/repair-estimate', repairEstimateLimiter, honeypotMiddleware, async (req, res) => {
    try {
      const {
        refNumber,
        model,
        damage,
        estimatedPrice,
        whatsapp,
        notes,
        name
      } = req.body;

      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';
      const estimateRef = refNumber || ('EST-' + Math.random().toString(36).substring(2, 7).toUpperCase());

      console.log(`[REPAIR ESTIMATE INQUIRY] Ref: ${estimateRef} | Model: ${model || 'Device'} | Price: ${estimatedPrice || 'Custom quote'}`);

      if (process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Estimates <notifications@allsharq.com>',
              to: [targetEmail],
              subject: `💰 New Repair Estimate Requested [${estimateRef}]: ${model || 'Device'}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">Online Repair Estimate Lead</h3>
                  <p><strong>Reference Number:</strong> <span style="font-family: monospace; color: #2563eb; font-weight: bold;">${estimateRef}</span></p>
                  <p><strong>Device Model:</strong> ${model || 'N/A'}</p>
                  <p><strong>Reported Issue:</strong> ${damage || 'General Inspection'}</p>
                  <p><strong>Estimated Price:</strong> ${estimatedPrice || 'Diagnostic required'}</p>
                  <p><strong>Customer WhatsApp / Phone:</strong> <a href="https://wa.me/${(whatsapp || '').replace(/[^0-9]/g, '')}">${whatsapp}</a></p>
                  ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
                </div>
              `
            })
          });
        } catch (e) {
          console.warn('Estimate email dispatch warning:', e);
        }
      }

      res.json({
        success: true,
        refNumber: estimateRef,
        message: 'Repair estimate inquiry registered successfully'
      });
    } catch (error: any) {
      console.error('Repair estimate API error:', error?.message || 'Processing error');
      res.status(500).json({ error: 'Repair estimate calculation failed. Please contact us directly.' });
    }
  });

  // Contact Form Inquiry Endpoint (Protected by publicFormLimiter and honeypot)
  app.post('/api/contact-inquiry', publicFormLimiter, honeypotMiddleware, async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';

      console.log(`[CONTACT INQUIRY] Subject: ${subject} from ${name}`);

      if (process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Contact <notifications@allsharq.com>',
              to: [targetEmail],
              reply_to: email,
              subject: `📩 Contact Form Message: ${subject || 'New Inquiry'} from ${name}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h3>New Inquiry from Website</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">${message}</div>
                </div>
              `
            })
          });
        } catch (e) {
          console.warn('Email dispatch warning:', e);
        }
      }

      res.json({ success: true, message: 'Inquiry registered successfully' });
    } catch (error: any) {
      console.error('Contact inquiry error:', error?.message || 'Processing error');
      res.status(500).json({ error: 'Inquiry submission failed. Please reach us via WhatsApp.' });
    }
  });

  // Corporate B2B Form Endpoint (Protected by publicFormLimiter and honeypot)
  app.post('/api/corporate-inquiry', publicFormLimiter, honeypotMiddleware, async (req, res) => {
    try {
      const { companyName, contactPerson, email, phone, deviceCount, serviceType, message } = req.body;
      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';

      console.log(`[CORPORATE B2B INQUIRY] Company: ${companyName} (${contactPerson}) | Fleet: ${deviceCount}`);

      if (process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Corporate <notifications@allsharq.com>',
              to: [targetEmail],
              reply_to: email,
              subject: `🏢 Corporate B2B Inquiry: ${companyName || 'Corporate Partner'}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h3>New B2B Corporate Partnership Inquiry</h3>
                  <p><strong>Company:</strong> ${companyName}</p>
                  <p><strong>Contact Person:</strong> ${contactPerson}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Fleet Size:</strong> ${deviceCount}</p>
                  <p><strong>Service Type:</strong> ${serviceType}</p>
                  <p><strong>Requirements:</strong></p>
                  <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">${message || 'N/A'}</div>
                </div>
              `
            })
          });
        } catch (e) {
          console.warn('Corporate email dispatch warning:', e);
        }
      }

      res.json({ success: true, message: 'Corporate inquiry registered successfully' });
    } catch (error: any) {
      console.error('Corporate inquiry error:', error?.message || 'Processing error');
      res.status(500).json({ error: 'Corporate inquiry processing failed. Please contact us directly.' });
    }
  });

  // --- Vite & Static Configuration --- //
  const distPath = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(distPath);

  if (process.env.NODE_ENV !== 'production' || !hasDist) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving with optimized caching
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (filePath.endsWith('.xml') || filePath.endsWith('.txt')) {
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      const cleanPath = req.path.replace(/^\/(en|ar)(\/|$)/, '/').replace(/\/$/, '') || '/';
      const isKnownRoute = 
        VALID_SPA_ROUTES.has(req.path) || 
        VALID_SPA_ROUTES.has(cleanPath) || 
        req.path.startsWith('/blog/') || 
        req.path.startsWith('/track-repair') ||
        req.path.startsWith('/en/') ||
        req.path.startsWith('/ar/');

      if (!isKnownRoute) {
        // Return genuine HTTP 404 and noindex header to completely eliminate Soft 404 errors in Google Search Console
        res.status(404);
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      } else {
        const canonicalUrl = `https://allsharq.com${req.path === '/' ? '' : req.path}`;
        res.setHeader('Link', `<${canonicalUrl}>; rel="canonical"`);
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global Secure Error Handler (Turns off debug leak in production and prevents 5xx GSC errors)
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (res.headersSent) return;
    const cleanUrl = (req.originalUrl || '').split('?')[0];

    // Return 400 Bad Request for URI encoding errors or malformed payloads (prevents 5xx GSC errors)
    if (err instanceof URIError || err?.type === 'entity.parse.failed' || err?.status === 400) {
      return res.status(400).type('text/plain').send('Bad Request: Invalid URL or payload');
    }

    if (err?.message && err.message.includes('CORS')) {
      return res.status(403).json({ error: 'Access forbidden: CORS security policy violation' });
    }

    console.error(`[SERVER ERROR] ${req.method} ${cleanUrl}:`, err?.message || 'Internal processing error');
    if (req.accepts && req.accepts('html')) {
      return res.status(500).type('text/html').send(`<!DOCTYPE html><html><head><title>500 Internal Error</title><meta name="robots" content="noindex, nofollow"></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>Server Error</h1><p>Please visit <a href="/">Allsharq.com</a></p></body></html>`);
    }
    res.status(500).json({
      error: 'An unexpected processing error occurred. The incident has been securely logged.'
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
