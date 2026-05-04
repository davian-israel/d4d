import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/profile-form";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="font-headline text-3xl text-primary">Your profile</h1>
      <p className="mt-2 text-sm text-on-surface-variant">{user.email}</p>
      <div className="mt-8">
        <ProfileForm defaultName={user.name ?? ""} />
      </div>
    </div>
  );
}
