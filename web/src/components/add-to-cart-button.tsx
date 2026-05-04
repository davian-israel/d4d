"use client";

import { useFormStatus } from "react-dom";
import { addToCartForm } from "@/lib/actions/cart";

interface AddToCartButtonProps {
  productId: string;
  variant?: "default" | "icon" | "hero";
  disabled?: boolean;
  /** Called after the server action completes (e.g. router.refresh on listing cards). */
  onAfterAdd?: () => void;
  /** Overrides default aria-label on the submit button. */
  submitAriaLabel?: string;
}

function PendingLabel({ children, pendingText }: { children: React.ReactNode; pendingText: string }) {
  const { pending } = useFormStatus();
  return <>{pending ? pendingText : children}</>;
}

export function AddToCartButton({
  productId,
  variant = "default",
  disabled = false,
  onAfterAdd,
  submitAriaLabel,
}: AddToCartButtonProps) {
  const runAdd = onAfterAdd
    ? async (formData: FormData) => {
        await addToCartForm(formData);
        onAfterAdd();
      }
    : addToCartForm;

  if (variant === "hero") {
    return (
      <form action={runAdd} className="w-full">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value="1" />
        <button
          type="submit"
          disabled={disabled}
          data-testid="add-to-cart"
          aria-label={submitAriaLabel}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container py-5 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          <PendingLabel pendingText="Adding…">Add to sanctuary cart</PendingLabel>
        </button>
      </form>
    );
  }

  if (variant === "icon") {
    return (
      <form action={runAdd} className="inline">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value="1" />
        <button
          type="submit"
          disabled={disabled}
          data-testid="add-to-cart"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform active:scale-90 disabled:opacity-50"
          aria-label={submitAriaLabel ?? "Add to cart"}
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </form>
    );
  }

  return (
    <form action={runAdd} className="inline">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={disabled}
        data-testid="add-to-cart"
        aria-label={submitAriaLabel}
        className="rounded-full bg-secondary-container px-5 py-2.5 text-sm font-medium text-on-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <PendingLabel pendingText="Adding…">Add to cart</PendingLabel>
      </button>
    </form>
  );
}
