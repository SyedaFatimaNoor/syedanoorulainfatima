// A bounded, per-process limiter. Use platform/edge abuse protection for a distributed deployment.
// Entries expire and contain only an opaque hash, count, and timestamp — never an enquiry or raw IP.
export function createRateLimiter(
  limit = 5,
  windowMs = 15 * 60 * 1000,
  maxEntries = 5000,
) {
  const buckets = new Map<string, { count: number; expires: number }>();
  return {
    check(key: string, now = Date.now()) {
      for (const [id, entry] of buckets)
        if (entry.expires <= now) buckets.delete(id);
      const entry = buckets.get(key);
      if (entry) {
        if (entry.count >= limit)
          return {
            allowed: false,
            retryAfter: Math.max(1, Math.ceil((entry.expires - now) / 1000)),
          };
        entry.count++;
        return { allowed: true, retryAfter: 0 };
      }
      // Fail closed rather than evicting active buckets under sustained load.
      if (buckets.size >= maxEntries) return { allowed: false, retryAfter: 60 };
      buckets.set(key, { count: 1, expires: now + windowMs });
      return { allowed: true, retryAfter: 0 };
    },
    get size() {
      return buckets.size;
    },
  };
}
