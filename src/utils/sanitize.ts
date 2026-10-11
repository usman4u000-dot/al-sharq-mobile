/**
 * Comprehensive input sanitization & XSS protection utilities
 */

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /data:text\/html/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi, // onerror=, onclick=, onload=
];

/**
 * Strips script tags, malicious event handlers, javascript pseudo-protocols, and control chars
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') {
    if (input === null || input === undefined) return '';
    return String(input);
  }

  let sanitized = input;

  // Remove null bytes and invisible control characters
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip known dangerous XSS patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  // HTML entity encode remaining angle brackets & quotes for safe text handling
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized.trim();
}

/**
 * Deep sanitization of objects to prevent XSS and Prototype Pollution
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return sanitizeString(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cleanObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      // Prototype Pollution Prevention
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        console.warn(`[SECURITY WARNING] Dropped prototype pollution key: "${key}"`);
        continue;
      }
      cleanObj[key] = sanitizeObject(value);
    }
    return cleanObj as T;
  }

  return obj;
}

/**
 * Validates and sanitizes email strings
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : '';
}

/**
 * Sanitizes phone numbers by allowing only valid international dial characters
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  // Keep +, numbers, spaces, hyphens, and brackets
  return phone.replace(/[^\d+()-\s]/g, '').trim();
}
