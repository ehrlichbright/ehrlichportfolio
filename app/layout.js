import { Inter, Arimo } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/content/site";

/**
 * Fonts are loaded through next/font, which self-hosts the files at build
 * time. A plain `@import` in globals.css does NOT work — Next strips it
 * out of the compiled stylesheet, and every face silently falls back.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Fallback for Helvetica Neue, which only ships on macOS/iOS and can't be
// self-hosted. Arimo is metrically compatible, so Windows and Android get
// the same measure rather than Arial or Roboto.
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-arimo",
  display: "swap",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: site.metaTitle,
  description: site.metaDescription,
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    url: siteUrl,
    siteName: site.name,
    type: "website",
    // Add /public/og.jpg (1200x630) for link previews
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${arimo.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
