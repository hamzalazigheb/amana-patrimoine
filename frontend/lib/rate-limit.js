/**
 * Simple in-memory rate limiter.
 * Suitable for single-instance deployments (Next.js standalone / PM2 single process).
 * For multi-instance / serverless, replace with Redis-backed solution (e.g. @upstash/ratelimit).
 */

const store = new Map(); // Map<ip, { count: number, resetAt: number }>

/**
 * @param {string} key       - Usually the client IP
 * @param {number} limit     - Max requests allowed in the window
 * @param {number} windowMs  - Window duration in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function rateLimit(key, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // First request or window expired — reset
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// Periodically clean up expired entries to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 5 * 60 * 1000); // clean every 5 min
}
