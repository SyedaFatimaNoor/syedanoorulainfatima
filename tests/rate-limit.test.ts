import test from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../src/lib/rate-limit";

test("enforces limits independently for each opaque key", () => {
  const limiter = createRateLimiter(2, 1000);
  assert.equal(limiter.check("one", 0).allowed, true);
  assert.equal(limiter.check("one", 100).allowed, true);
  assert.deepEqual(limiter.check("one", 200), {
    allowed: false,
    retryAfter: 1,
  });
  assert.equal(limiter.check("two", 200).allowed, true);
});

test("expires old entries rather than retaining identifiers indefinitely", () => {
  const limiter = createRateLimiter(1, 1000);
  limiter.check("one", 0);
  assert.equal(limiter.check("one", 999).allowed, false);
  assert.equal(limiter.check("one", 1000).allowed, true);
  assert.equal(limiter.size, 1);
});

test("bounds memory and fails closed when active buckets fill the capacity", () => {
  const limiter = createRateLimiter(1, 1000, 2);
  limiter.check("one", 0);
  limiter.check("two", 0);
  assert.equal(limiter.check("three", 1).allowed, false);
  assert.equal(limiter.size, 2);
  assert.equal(limiter.check("three", 1001).allowed, true);
  assert.equal(limiter.size, 1);
});
