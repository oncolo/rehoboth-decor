"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  const navLinks = [
    { slug: "about", label: nav("about") },
    { slug: "services", label: nav("services") },
    { slug: "gallery", label: nav("gallery") },
    { slug: "booking", label: nav("booking") },
  ];

  return (
    <footer className="bg-charcoal text-cream/70 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="text-gold font-serif text-lg font-bold mb-2">Habesha Decor</p>
          <p className="text-sm">{t("tagline")}</p>
          <p className="text-sm mt-1">{t("address")}</p>
        </div>
        <div>
          <p className="text-gold font-semibold mb-2 text-sm uppercase tracking-wider">Pages</p>
          <ul className="space-y-1 text-sm">
            {navLinks.map(({ slug, label }) => (
              <li key={slug}>
                <Link href={`/${locale}/${slug}`} className="hover:text-gold transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-gold font-semibold mb-2 text-sm uppercase tracking-wider">Contact</p>
          <p className="text-sm">Philadelphia, PA & Greater Tristate Area</p>
          <p className="text-sm mt-1">info@habeshadecor.com</p>
          <a href="tel:+14848406162" className="text-sm mt-1 block hover:text-gold transition-colors">+1 (484) 840-6162</a>
        </div>
      </div>
      <div className="mt-8 border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Habesha Decor — {t("rights")}
        </p>
        <p className="text-xs text-cream/30">
          Developed by <span className="text-gold/70 font-semibold">Daniel Abera</span>
        </p>
      </div>
    </footer>
  );
}
