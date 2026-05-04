/**
 * Credentials for live site tests — never commit real values.
 * Defaults: admin email matches seed; password must be supplied per environment.
 */
export function getProdAdminCredentials(): { email: string; password: string } | null {
  const email = process.env.PLAYWRIGHT_PROD_ADMIN_EMAIL ?? "admin@destiny4divine.test";
  const password = process.env.PLAYWRIGHT_PROD_ADMIN_PASSWORD?.trim() ?? "";
  if (!password) return null;
  return { email, password };
}

export function getProdCustomerCredentials(): { email: string; password: string } | null {
  const email = process.env.PLAYWRIGHT_PROD_CUSTOMER_EMAIL?.trim() ?? "";
  const password = process.env.PLAYWRIGHT_PROD_CUSTOMER_PASSWORD?.trim() ?? "";
  if (!email || !password) return null;
  return { email, password };
}
