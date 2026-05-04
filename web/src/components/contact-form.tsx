"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/actions/contact";

export function ContactForm() {
  const [state, action] = useActionState(submitContact, null);

  const labelClass =
    "mb-2 block font-label text-xs uppercase tracking-widest text-outline";
  const fieldClass =
    "w-full border-0 border-b border-outline-variant/30 bg-transparent px-0 py-2 font-body text-lg text-on-surface transition-all placeholder:text-stone-300 focus:border-primary focus:ring-0";

  return (
    <form action={action} className="space-y-8" data-testid="contact-form" noValidate>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className={fieldClass}
            placeholder="Your full name"
            data-testid="contact-name"
          />
          {state && "fieldErrors" in state && state.fieldErrors?.name ? (
            <p className="mt-1 text-sm text-red-700">{state.fieldErrors.name}</p>
          ) : null}
        </div>
        <div className="relative">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="your@email.com"
            data-testid="contact-email"
          />
          {state && "fieldErrors" in state && state.fieldErrors?.email ? (
            <p className="mt-1 text-sm text-red-700" data-testid="contact-email-error">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div className="relative">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="How can we assist you today?"
          data-testid="contact-message"
        />
        {state && "fieldErrors" in state && state.fieldErrors?.message ? (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      <button
        type="submit"
        className="editorial-gradient flex items-center gap-3 rounded-full px-12 py-4 font-label text-sm font-semibold uppercase tracking-widest text-on-primary transition-all hover:shadow-lg active:scale-95"
        data-testid="contact-submit"
      >
        Send message
        <span className="material-symbols-outlined text-lg">send</span>
      </button>
      {state && "ok" in state && state.ok ? (
        <p className="text-sm text-green-800" data-testid="contact-success">
          Thank you — we received your note.
        </p>
      ) : null}
    </form>
  );
}
