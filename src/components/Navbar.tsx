"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const localeLabels: Record<string, string> = {
  en: "English",
  am: "አማርኛ",
  om: "Afaan Oromoo",
  ti: "ትግርኛ",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/rentals`, label: "Rentals" },
    { href: `/${locale}/booking`, label: t("booking") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="Rehoboth Decor" width={52} height={52} className="rounded-full object-cover" />
          <span className="text-gold font-serif text-xl font-bold tracking-wide hidden sm:inline">Rehoboth Decor</span>
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-cream/80 hover:text-gold transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            className="text-gold border border-gold/40 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors text-sm"
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <select
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="bg-charcoal border border-gold/40 text-gold text-sm rounded px-2 py-1 cursor-pointer focus:outline-none"
          >
            {Object.entries(localeLabels).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </div>

        
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-gold border border-gold/40 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors text-sm"
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="text-cream p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-charcoal border-t border-gold/20 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-cream/80 hover:text-gold text-sm py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <select
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="bg-charcoal border border-gold/40 text-gold text-sm rounded px-2 py-1 w-fit"
          >
            {Object.entries(localeLabels).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
}
