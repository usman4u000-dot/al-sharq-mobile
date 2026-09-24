import { Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Custom handler for rate-limited requests to return clean, actionable JSON responses
 */
const createRateLimitHandler = (formName: string) => {
  return (req: Request, res: Response, _next: NextFunction, options: any) => {
    const retryAfter = Math.ceil(options.windowMs / 1000 / 60);
    console.warn(`[SECURITY ALERT] Rate limit exceeded on ${formName} endpoint from IP: ${req.ip || req.headers['x-forwarded-for']}`);
    
    res.status(options.statusCode || 429).json({
      success: false,
      error: 'Too Many Requests',
      code: 'RATE_LIMIT_EXCEEDED',
      message: `Too many submissions for ${formName} from your IP address. Please wait ${retryAfter} minutes before trying again.`,
      retryAfterMinutes: retryAfter,
      endpoint: req.originalUrl
    });
  };
};

/**
 * Rate limiter for all public-facing form endpoints:
 * - Repair Booking (/api/send-booking-notification)
 * - Contact Inquiries (/api/contact-inquiry)
 * - Repair Estimates (/api/repair-estimate)
 * - Corporate Inquiries (/api/corporate-inquiry)
 *
 * Allows 10 submissions per 15-minute window per IP.
 */
export const publicFormLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Limit each IP to 10 form submissions per 15-minute window
  standardHeaders: 'draft-7', // Send standard RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  statusCode: 429,
  handler: createRateLimitHandler('Form Submissions'),
  validate: { trustProxy: false } // Prevent express proxy configuration warnings
});

/**
 * Stricter rate limiter specifically for instant Repair Estimates:
 * Allows 12 estimate requests per 15-minute window per IP.
 */
export const repairEstimateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 12, // Limit each IP to 12 estimate requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  handler: createRateLimitHandler('Repair Estimate Calculator'),
  validate: { trustProxy: false }
});

/**
 * Strict rate limiter for sensitive actions prone to brute-force and SMS toll fraud:
 * - SMS triggers (/api/send-sms)
 * - Stripe checkout sessions (/api/create-checkout-session)
 *
 * Strictly limited to 5 actions per 15 minutes.
 */
export const strictActionLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  handler: createRateLimitHandler('Sensitive Security Action'),
  validate: { trustProxy: false }
});

/**
 * Global API rate limiter to protect all `/api/*` routes against volumetric scraping and DDoS.
 * Allows 150 requests per 15 minutes per IP.
 */
export const globalApiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  handler: createRateLimitHandler('General API'),
  validate: { trustProxy: false }
});

/**
 * Anti-Spam Honeypot Middleware
 * Automated bots and scrapers routinely fill every input field found in DOM forms.
 * If hidden honeypot fields like '_hp_check' or 'website_url_hp' are filled with text,
 * the request is immediately dropped as automated bot spam.
 */
export const honeypotMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === 'object') {
    const honeypots = ['_hp_check', 'website_url_hp', 'fax_number_hp', 'bot_trap'];
    for (const field of honeypots) {
      if (req.body[field] && typeof req.body[field] === 'string' && req.body[field].trim() !== '') {
        console.warn(`[BOT DETECTED] Honeypot field "${field}" was filled with: "${req.body[field]}". Request rejected.`);
        // Return 400 Bad Request to stop spam bot
        res.status(400).json({
          success: false,
          error: 'Bot activity detected',
          code: 'AUTOMATED_SUBMISSION_REJECTED'
        });
        return;
      }
    }
  }
  next();
};
