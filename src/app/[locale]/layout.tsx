import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ChatWidget from "@/components/ChatWidget";

const locales = ["en", "am", "om", "ti"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const localeTitles: Record<string, string> = {
  en: "Rehoboth Decor | Ethiopian Event Decoration Philadelphia",
  am: "ሀበሻ ዲኮር | የኢትዮጵያ ዝግጅት ማስዋቢያ ፊላደልፊያ",
  om: "Rehoboth Decor | Miidhagina Ayyaana Itoophiyaa Philadelphia",
  ti: "ሃበሻ ዲኮር | ናይ ኢትዮጵያ ዝግጅት ምስሕ ፊላደልፊያ",
};

const localeDescriptions: Record<string, string> = {
  en: "Philadelphia's premier Ethiopian & international event decoration studio. Weddings, Enkutatash, Mels, Nikaah, corporate events.",
  am: "በፊላደልፊያ ውስጥ ምርጥ የኢትዮጵያ እና አለምአቀፍ ዝግጅት ማስዋቢያ። ሰርግ፣ እንቁጣጣሽ፣ መልስ፣ ኒካህ እና ሌሎች።",
  om: "Mana miidhagina ayyaanaa Itoophiyaa fi idil-addunyaa Philadelphia keessatti. Ciyoo, Enkutatash, Mels, Nikaah fi kanneen biroo.",
  ti: "ኣብ ፊላደልፊያ ዝርከብ ቀዳማይ ናይ ኢትዮጵያን ኣህጉራዊን ዝግጅት ምስሕ። ሰርሒ፣ እንቁጣጣሽ፣ መልሲ፣ ኒካህን ካልኦትን።",
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: localeTitles[locale] ?? localeTitles.en,
    description: localeDescriptions[locale] ?? localeDescriptions.en,
    alternates: {
      languages: { en: "/en", am: "/am", om: "/om", ti: "/ti" },
    },
    openGraph: {
      url: `https://rehobothdecor.com/${locale}`,
      title: localeTitles[locale] ?? localeTitles.en,
      description: localeDescriptions[locale] ?? localeDescriptions.en,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rehoboth Decor",
  description: "Ethiopian & international event decoration studio in Philadelphia, PA.",
  url: "https://rehobothdecor.com",
  telephone: "+1-484-840-6162",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 39.9526, longitude: -75.1652 },
  image: "https://rehobothdecor.com/images/og-image.jpg",
  priceRange: "$$",
  servesCuisine: "Ethiopian",
  sameAs: [],
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();
  const isEthiopic = locale === "am" || locale === "ti";

  return (
    <div lang={locale} className={isEthiopic ? "font-ethiopic" : ""}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </NextIntlClientProvider>
      <ChatWidget locale={locale} />
    </div>
  );
}
