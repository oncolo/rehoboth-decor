import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rehoboth Decor | Ethiopian Event Decoration Philadelphia",
    template: "%s | Rehoboth Decor Philadelphia",
  },
  description:
    "Philadelphia's premier Ethiopian & international event decoration studio. Weddings, Enkutatash, Mels, Nikaah, corporate events. Serving the Ethiopian Diaspora in PA, DC, MD & beyond.",
  keywords: [
    "Ethiopian event decoration Philadelphia",
    "Habesha wedding decoration",
    "Mels Melse decoration",
    "Enkutatash decoration",
    "Ethiopian wedding Philadelphia",
    "Nikaah decoration",
    "Timkat Genna Fasika decoration",
    "event decoration Philadelphia PA",
    "Ethiopian diaspora events",
    "Habesha decor",
  ],
  authors: [{ name: "Rehoboth Decor", url: "https://habeshadecor.com" }],
  creator: "Rehoboth Decor",
  metadataBase: new URL("https://habeshadecor.com"),
  alternates: {
    canonical: "/",
    languages: { en: "/en", am: "/am", om: "/om", ti: "/ti" },
  },
  openGraph: {
    type: "website",
    siteName: "Rehoboth Decor",
    title: "Rehoboth Decor | Ethiopian Event Decoration Philadelphia",
    description:
      "Philadelphia's premier Ethiopian & international event decoration studio. Weddings, Enkutatash, Mels, Nikaah & more.",
    url: "https://habeshadecor.com",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Rehoboth Decor - Ethiopian Event Decoration Philadelphia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehoboth Decor | Ethiopian Event Decoration Philadelphia",
    description: "Philadelphia's premier Ethiopian & international event decoration studio.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

