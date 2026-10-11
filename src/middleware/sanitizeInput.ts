import type { Request, Response, NextFunction } from 'express';
import { sanitizeObject } from '../utils/sanitize.ts';

/**
 * Express middleware to sanitize all incoming request bodies, queries, and parameters.
 * Automatically cleans inputs against XSS and prototype pollution attacks.
 */
export function sanitizeInputMiddleware(req: Request, _res: Response, next: NextFunction): void {
  try {
    if (req.body && typeof req.body === 'object') {
      req.body = sanitizeObject(req.body);
    }
    if (req.query && typeof req.query === 'object') {
      req.query = sanitizeObject(req.query);
    }
    if (req.params && typeof req.params === 'object') {
      req.params = sanitizeObject(req.params);
    }
    next();
  } catch (err) {
    console.error('[SECURITY ERROR] Input sanitization failed:', err);
    next();
  }
}
