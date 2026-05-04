"use client";

import { useTransition } from "react";
import { setCartItemQuantity } from "@/lib/actions/cart";

interface CartLineQuantityProps {
  itemId: string;
  quantity: number;
}

export function CartLineQuantity({ itemId, quantity }: CartLineQuantityProps) {
  const [pending, startTransition] = useTransition();

  function adjust(delta: number) {
    const next = quantity + delta;
    if (next < 1) return;
    startTransition(async () => {
      await setCartItemQuantity(itemId, next);
    });
  }

  return (
    <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-1">
      <button
        type="button"
        disabled={pending || quantity <= 1}
        onClick={() => adjust(-1)}
        className="transition-colors hover:text-primary disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <span className="material-symbols-outlined text-sm">remove</span>
      </button>
      <span className="w-4 text-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => adjust(1)}
        className="transition-colors hover:text-primary disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <span className="material-symbols-outlined text-sm">add</span>
      </button>
    </div>
  );
}
