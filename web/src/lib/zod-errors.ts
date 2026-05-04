import type { ZodError } from "zod";

export function zodFieldErrors(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.length ? issue.path.join(".") : "_root";
    if (!out[path]) out[path] = issue.message;
  }
  return out;
}

export type FieldErrorBag = Record<string, string>;
