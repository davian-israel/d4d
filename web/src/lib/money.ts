const localeByCurrency: Record<string, string> = {
  CAD: "en-CA",
  USD: "en-US",
};

/** Formats minor units (e.g. cents) using ISO 4217 currency code. Defaults to CAD for Destiny4Divine. */
export function formatCents(cents: number, currencyCode = "CAD") {
  const locale = localeByCurrency[currencyCode] ?? "en-CA";
  return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(cents / 100);
}
