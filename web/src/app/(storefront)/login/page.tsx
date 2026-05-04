import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-headline text-3xl text-primary">Sign in</h1>
      <p className="mt-2 text-sm text-on-surface-variant">
        Use seeded credentials from <code className="rounded bg-surface-high px-1">prisma/seed.ts</code>{" "}
        in development.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-on-surface-variant">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
