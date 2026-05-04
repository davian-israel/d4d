import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth({
  ...authConfig,
  providers: [],
});

const CART_COOKIE = "cart_session";

function newCartSessionKey(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const role = req.auth?.user?.role;
    if (role !== "ADMIN") {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  const hasCart = Boolean(req.cookies.get(CART_COOKIE)?.value);
  if (!hasCart) {
    const res = NextResponse.next();
    const secure = req.nextUrl.protocol === "https:";
    res.cookies.set(CART_COOKIE, newCartSessionKey(), {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
    });
    return res;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
