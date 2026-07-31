const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type Entry = { attempts: number; resetAt: number };
const attempts = new Map<string, Entry>();

export function checkLoginRateLimit(
  key: string,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { attempts: 0, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  return {
    allowed: current.attempts < MAX_ATTEMPTS,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function recordLoginFailure(key: string, now = Date.now()): void {
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { attempts: 1, resetAt: now + WINDOW_MS });
  } else {
    current.attempts += 1;
  }
}

export function clearLoginFailures(key: string): void {
  attempts.delete(key);
}

export function resetRateLimitsForTests(): void {
  attempts.clear();
}
