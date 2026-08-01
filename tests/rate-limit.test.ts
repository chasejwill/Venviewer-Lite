import { beforeEach, describe, expect, it } from "vitest";
import {
  checkLoginRateLimit,
  clearLoginFailures,
  recordLoginFailure,
  resetRateLimitsForTests,
} from "@/lib/rate-limit";

describe("login rate limiting", () => {
  beforeEach(resetRateLimitsForTests);

  it("blocks an address after five failures and can clear it on login", () => {
    for (let count = 0; count < 5; count += 1) {
      recordLoginFailure("127.0.0.1", 100);
    }
    expect(checkLoginRateLimit("127.0.0.1", 100).allowed).toBe(false);
    clearLoginFailures("127.0.0.1");
    expect(checkLoginRateLimit("127.0.0.1", 100).allowed).toBe(true);
  });
});
