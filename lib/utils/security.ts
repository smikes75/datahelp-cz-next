/**
 * Security utility funkce
 * Rate limiting, CSRF protection, input validace, security headers
 */

// Rate limiting konfigurace
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuta
const MAX_REQUESTS = 30;

interface RateLimit {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimit>();

/**
 * Kontrola rate limitu pro daný identifikátor (např. IP adresa)
 * @param identifier - Unikátní identifikátor (IP, user ID, atd.)
 * @returns true pokud je request povolen, false pokud je limit překročen
 */
export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const limit = rateLimits.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimits.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (limit.count >= MAX_REQUESTS) {
    return false;
  }

  limit.count++;
  return true;
};

// CSRF Protection
let csrfToken: string | null = null;

/**
 * Generuje nový CSRF token
 */
export const generateCSRFToken = (): string => {
  const token = crypto.randomUUID();
  csrfToken = token;
  return token;
};

/**
 * Validuje CSRF token
 */
export const validateCSRFToken = (token: string): boolean => {
  return token === csrfToken;
};

// Input validace

/**
 * Validuje email formát
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validuje telefonní číslo
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{9,}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitizuje input - odstraní potenciálně nebezpečné znaky
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Odstraň < a >
    .trim();
};

/**
 * Security headers pro API routes a middleware
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self' https:; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;"
};
