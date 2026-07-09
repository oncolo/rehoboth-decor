"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const packages = [
  {
    icon: "💍",
    nameKey: "services.weddings",
    price: "$3,500 – $7,500",
    features: ["Floral arch & backdrop", "Table centerpieces", "Aisle decoration", "Lighting setup", "Bridal suite styling", "Cultural textile display"],
    color: "from-rose-900/40 to-charcoal",
    featured: false,
  },
  {
    icon: "🎓",
    nameKey: "services.graduation",
    price: "$3,500 – $7,500",
    features: ["Stage & backdrop setup", "Balloon arch", "Photo wall", "Table arrangements", "Personalized banners", "Lighting ambiance"],
    color: "from-gold/20 to-charcoal",
    featured: true,
  },
  {
    icon: "🎊",
    nameKey: "services.holidays",
    price: "$3,500 – $7,500",
    features: ["Cultural motif decor", "Floral arrangements", "Traditional Jebena corner", "Venue transformation", "Textile displays", "Custom color theme"],
    color: "from-emerald-900/30 to-charcoal",
    featured: false,
  },
];

export default function PackageCards() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const locale = useLocale();
  const t = useTranslations();
  const ui = useTranslations("ui");

  return (
    <section className="py-20 px-4 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #D4AF3708 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-3xl mb-2 block">🏆</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-gold mb-2">{ui("packages_title")}</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-3" />
          <p className="text-cream/50 text-sm">{ui("packages_subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative h-72 cursor-pointer"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flipped === i ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Front */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.color} border ${pkg.featured ? "border-gold" : "border-gold/20"} flex flex-col items-center justify-center p-6 text-center`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {pkg.featured && <span className="absolute top-3 right-3 bg-gold text-charcoal text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>}
                  <span className="text-5xl mb-4">{pkg.icon}</span>
                  <h3 className="font-serif text-gold text-xl font-semibold mb-2">{t(pkg.nameKey as Parameters<typeof t>[0])}</h3>
                  <p className="text-cream/80 text-lg font-bold">{pkg.price}</p>
                  <p className="text-cream/40 text-xs mt-3">→</p>
                </div>

                {/* Back */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.color} border ${pkg.featured ? "border-gold" : "border-gold/20"} p-6 flex flex-col justify-between`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div>
                    <p className="text-gold font-semibold text-sm mb-3">{t(pkg.nameKey as Parameters<typeof t>[0])}:</p>
                    <ul className="space-y-1">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="text-cream/70 text-xs flex items-center gap-2">
                          <span className="text-gold">✦</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/${locale}/booking`}
                    className="block text-center bg-gold text-charcoal text-xs font-bold py-2 rounded-full hover:bg-gold/80 transition-colors mt-2"
                  >
                    {ui("book_package")}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
