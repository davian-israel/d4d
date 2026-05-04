import Link from "next/link";

export function StorefrontHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#fff8f1]/90 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full p-2 text-[#762e00] transition-colors hover:bg-stone-100/50 active:opacity-70"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      <Link
        href="/"
        className="font-headline text-2xl italic tracking-tighter text-[#762e00]"
      >
        Destiny4Divine
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/cart"
          className="rounded-full p-2 text-[#762e00] transition-colors hover:bg-stone-100/50 active:opacity-70"
          aria-label="Cart"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
        </Link>
      </div>
    </header>
  );
}
