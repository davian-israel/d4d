"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { completeCheckout } from "@/lib/actions/checkout";
import { formatCents } from "@/lib/money";

interface LineItem {
  productId: string;
  quantity: number;
}

interface CheckoutFormProps {
  lineItems: LineItem[];
  subtotalCents: number;
  defaultEmail: string;
  isLoggedIn: boolean;
  allowMock: boolean;
  editorial?: boolean;
  showInlineTotal?: boolean;
  submitLabel?: string;
}

function squareScriptUrl(): string {
  return process.env.NEXT_PUBLIC_SQUARE_ENV === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";
}

const inputEditorial =
  "w-full border-0 border-b border-outline-variant/30 bg-transparent px-1 py-3 transition-colors placeholder:text-outline-variant/50 focus:border-primary focus:ring-0";
const labelEditorial =
  "mb-2 ml-1 block text-[10px] font-semibold uppercase tracking-widest text-secondary";

export function CheckoutForm({
  lineItems,
  subtotalCents,
  defaultEmail,
  isLoggedIn,
  allowMock,
  editorial = false,
  showInlineTotal = true,
  submitLabel,
}: CheckoutFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [squareReady, setSquareReady] = useState(false);
  const [squareInitError, setSquareInitError] = useState<string | null>(null);
  const cardRef = useRef<{
    tokenize: () => Promise<{ status: string; token?: string; errors?: unknown }>;
    destroy: () => Promise<void>;
  } | null>(null);

  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
  const useSquareUi = Boolean(appId && locationId) && !allowMock;

  const initCard = useCallback(async () => {
    if (!appId || !locationId || typeof window === "undefined" || !window.Square) return;
    try {
      const payments = await window.Square.payments(appId, locationId);
      const card = await payments.card();
      await card.attach("#sq-card");
      cardRef.current = card;
      setSquareReady(true);
      setSquareInitError(null);
    } catch (e) {
      setSquareInitError(String(e));
      setSquareReady(false);
    }
  }, [appId, locationId]);

  useEffect(() => {
    if (!useSquareUi) return;

    const existing = document.querySelector('script[data-square-sdk="1"]');
    if (existing && window.Square) {
      void initCard();
      return;
    }

    const script = document.createElement("script");
    script.src = squareScriptUrl();
    script.async = true;
    script.dataset.squareSdk = "1";
    script.onload = () => void initCard();
    script.onerror = () => setSquareInitError("Failed to load Square.js");
    document.body.appendChild(script);

    return () => {
      void cardRef.current?.destroy().catch(() => {});
      cardRef.current = null;
    };
  }, [useSquareUi, initCard]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    let sourceId: string | undefined;
    if (useSquareUi) {
      if (!cardRef.current) {
        setPending(false);
        setError("Payment form is still loading.");
        return;
      }
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== "OK" || !tokenResult.token) {
        setPending(false);
        setError("Could not tokenize card. Check details and try again.");
        return;
      }
      sourceId = tokenResult.token;
    } else {
      const manual = String(new FormData(form).get("sourceId") ?? "").trim();
      sourceId = manual || undefined;
    }

    const res = await completeCheckout({
      email,
      lineItems,
      sourceId,
    });
    setPending(false);
    if (!res.ok) {
      if ("fieldErrors" in res && res.fieldErrors) {
        setError(Object.values(res.fieldErrors).join(" "));
      } else if ("error" in res) {
        setError(res.error);
      }
      return;
    }
    if (isLoggedIn) {
      await router.push(`/account/orders?thanks=${res.orderId}`);
    } else {
      await router.push(`/thank-you?orderId=${res.orderId}`);
    }
  }

  const defaultSubmit =
    submitLabel ?? (editorial ? "Complete purchase" : "Pay securely");

  return (
    <form onSubmit={onSubmit} className="space-y-6" data-testid="checkout-form">
      <div>
        <label
          htmlFor="email"
          className={
            editorial ? labelEditorial : "block text-sm font-medium text-on-surface"
          }
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={defaultEmail}
          className={
            editorial
              ? `${inputEditorial} mt-0`
              : "mt-2 w-full rounded-sm border-0 bg-surface-highest px-3 py-2 text-on-surface outline outline-1 outline-outline-variant/30 focus:outline-2 focus:outline-primary/40"
          }
          data-testid="checkout-email"
        />
      </div>

      {useSquareUi ? (
        <div
          className={
            editorial
              ? "rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm"
              : ""
          }
        >
          {editorial ? (
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">security</span>
                <span className="font-medium">Secure checkout via Square</span>
              </div>
              <div className="flex gap-2">
                <div className="flex h-6 w-10 items-center justify-center rounded bg-surface-container text-[8px] font-bold text-stone-400">
                  VISA
                </div>
                <div className="flex h-6 w-10 items-center justify-center rounded bg-surface-container text-[8px] font-bold text-stone-400">
                  MC
                </div>
                <div className="flex h-6 w-10 items-center justify-center rounded bg-surface-container text-[8px] font-bold text-stone-400">
                  AMEX
                </div>
              </div>
            </div>
          ) : (
            <p className="mb-2 text-sm font-medium text-on-surface">Card</p>
          )}
          <div
            id="sq-card"
            className={
              editorial
                ? "min-h-[90px] rounded-sm border-0 border-b border-outline-variant/30 bg-transparent px-1 py-2"
                : "min-h-[90px] rounded-sm bg-surface-highest px-2 py-2 outline outline-1 outline-outline-variant/30"
            }
          />
          {squareInitError ? (
            <p className="mt-2 text-sm text-red-700">{squareInitError}</p>
          ) : null}
          {!squareReady && !squareInitError ? (
            <p className="mt-2 text-xs text-on-surface-variant">Loading secure payment field…</p>
          ) : null}
        </div>
      ) : (
        <div>
          <label
            htmlFor="sourceId"
            className={
              editorial ? labelEditorial : "block text-sm font-medium text-on-surface"
            }
          >
            Square source id (dev / mock only)
          </label>
          <input
            id="sourceId"
            name="sourceId"
            className={
              editorial
                ? `${inputEditorial} mt-0`
                : "mt-2 w-full rounded-sm border-0 bg-surface-highest px-3 py-2 text-on-surface outline outline-1 outline-outline-variant/30"
            }
            placeholder="cnon:... or leave empty if mock is allowed"
            data-testid="checkout-source"
          />
        </div>
      )}

      {showInlineTotal ? (
        <div className="rounded-2xl bg-surface-low p-4">
          <p className="flex justify-between text-lg">
            <span>Total due</span>
            <span>{formatCents(subtotalCents)}</span>
          </p>
          <p className="mt-2 text-xs text-on-surface-variant">
            Totals are recomputed on the server from current catalog prices.
          </p>
        </div>
      ) : null}
      {error ? (
        <p className="text-sm text-red-700" role="alert" data-testid="checkout-error">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending || (useSquareUi && !squareReady)}
        className={
          editorial
            ? "w-full rounded-full bg-gradient-to-r from-primary to-primary-container py-5 font-label text-sm font-bold uppercase tracking-[0.2em] text-on-primary shadow-xl transition-all hover:shadow-2xl active:scale-95 disabled:opacity-50"
            : "w-full rounded-full bg-gradient-to-br from-primary to-primary-container py-3 text-sm font-medium text-on-primary disabled:opacity-50"
        }
        data-testid="checkout-submit"
      >
        {pending ? "Processing…" : defaultSubmit}
      </button>
      {editorial ? (
        <p className="mt-4 flex items-center justify-center gap-1 text-center text-[10px] text-outline">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          Encrypted &amp; secured transaction
        </p>
      ) : (
        <p className="text-xs text-on-surface-variant">
          Vercel Production uses the card field when Square is configured. See{" "}
          <code className="rounded bg-surface-high px-1">docs/VERCEL.md</code>.
        </p>
      )}
    </form>
  );
}
