import type { Metadata } from "next";
import { Noto_Serif, Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Destiny4Divine | Sacred Earth & Grace",
  description: "Editorial commerce — Destiny4Divine",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${workSans.variable} light h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-full bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
