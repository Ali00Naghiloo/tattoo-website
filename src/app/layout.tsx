import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";

import Header from "@/components/layout/Header";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { site } from "@/content/site";
import { IntroProvider } from "@/providers/IntroProvider";
import SmoothScroll from "@/providers/SmoothScroll";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — Custom tattoos in ${site.city}`, template: `%s — ${site.name}` },
  description: `Mandala, traditional and fine line tattoos by ${site.artist}. A private studio in ${site.city}, tattooing since ${site.since}.`,
  openGraph: {
    title: site.name,
    description: `Custom tattoos by ${site.artist} in ${site.city}.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <IntroProvider>
            <Preloader />
            <Header />
            {children}
            <Cursor />
            <ScrollProgress />
            <div aria-hidden className="grain" />
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
