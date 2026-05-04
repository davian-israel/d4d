"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile";

interface ProfileFormProps {
  defaultName: string;
}

export function ProfileForm({ defaultName }: ProfileFormProps) {
  const [state, action] = useActionState(updateProfile, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={defaultName}
          required
          className="mt-1 w-full rounded-sm bg-surface-highest px-3 py-2 outline outline-1 outline-outline-variant/30"
        />
        {state && "fieldErrors" in state && state.fieldErrors?.name ? (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.name}</p>
        ) : null}
      </div>
      <button
        type="submit"
        className="rounded-full bg-secondary-container px-6 py-2 text-sm font-medium text-on-surface"
      >
        Save
      </button>
      {state && "ok" in state && state.ok ? (
        <p className="text-sm text-green-800">Profile updated.</p>
      ) : null}
    </form>
  );
}
