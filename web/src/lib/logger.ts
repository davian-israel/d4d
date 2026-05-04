type LogLevel = "info" | "warn" | "error";

const REDACT_KEYS = new Set([
  "password",
  "passwordHash",
  "authorization",
  "accessToken",
  "squareAccessToken",
  "SQUARE_ACCESS_TOKEN",
  "cardNumber",
  "cvv",
]);

function redactMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return undefined;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (REDACT_KEYS.has(key)) next[key] = "[redacted]";
    else next[key] = value;
  }
  return next;
}

export function logStructured(level: LogLevel, event: string, meta?: Record<string, unknown>) {
  const payload = { level, event, ...redactMeta(meta), ts: new Date().toISOString() };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
