import { Inter, Bodoni_Moda } from "next/font/google";
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

// Display face. A true Didone: very high stroke contrast, so it is used
// only at large sizes — its hairlines break up below roughly 20px.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
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
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
