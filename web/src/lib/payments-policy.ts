/**
 * Production (Vercel Production) and strict builds require real Square tokens.
 * Local/preview may use MOCK_PAYMENTS or missing Square when ALLOW_CHECKOUT_MOCK=true (default in non-Vercel-prod).
 */
export function isVercelProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function isMockCheckoutAllowed(): boolean {
  if (isVercelProduction()) return false;
  if (process.env.MOCK_PAYMENTS === "true") return true;
  if (process.env.ALLOW_CHECKOUT_MOCK === "false") return false;
  return !process.env.SQUARE_ACCESS_TOKEN;
}

export function mustUseSquareToken(): boolean {
  if (isVercelProduction()) return true;
  if (process.env.ALLOW_CHECKOUT_MOCK === "false") return true;
  if (process.env.MOCK_PAYMENTS === "true") return false;
  return Boolean(process.env.SQUARE_ACCESS_TOKEN);
}
