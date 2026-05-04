import type { NextAuthConfig } from "next-auth";

const trustHost =
  process.env.AUTH_TRUST_HOST === "true" ||
  process.env.VERCEL === "1" ||
  process.env.NODE_ENV !== "production" ||
  process.env.AUTH_URL?.startsWith("http");

/**
 * Edge-safe auth config (no Prisma / bcrypt). Used by middleware only.
 * Full providers live in `auth.ts`.
 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost,
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user && user.role) {
        token.role = user.role as "CUSTOMER" | "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as "CUSTOMER" | "ADMIN") ?? "CUSTOMER";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
