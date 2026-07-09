"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function ServiceSection({ id, title, items, dark }: {
  id: string; title: string;
  items: { title: string; desc: string; icon?: string }[];
  dark?: boolean;
}) {
  return (
    <section id={id} className={`py-20 px-4 ${dark ? "bg-charcoal" : "bg-cream dark:bg-[#0d0d0d]"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`font-serif text-2xl sm:text-4xl text-center mb-12 ${dark ? "text-gold" : "text-charcoal dark:text-cream"}`}
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className={`rounded-2xl p-6 border transition-shadow hover:shadow-lg ${
                dark
                  ? "bg-charcoal border-gold/20 hover:border-gold"
                  : "bg-white dark:bg-white/5 border-gold/10 hover:border-gold/40"
              }`}
            >
              {item.icon && <span className="text-3xl mb-3 block">{item.icon}</span>}
              <h3 className={`font-serif font-semibold text-lg mb-2 ${dark ? "text-gold" : "text-charcoal dark:text-cream"}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-cream/60" : "text-charcoal dark:text-cream/60"}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();

  const weddingItems = t.raw("wedding_items") as { title: string; desc: string }[];
  const holidayItems = t.raw("holiday_items") as { title: string; desc: string }[];
  const graduationItems = t.raw("graduation_items") as { icon: string; title: string; desc: string }[];
  const corporateItems = t.raw("corporate_items") as { title: string; desc: string }[];

  return (
    <div className="dark:bg-charcoal">
      <div className="bg-charcoal py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-5xl text-gold mb-6"
        >
          {t("title")}
        </motion.h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {(["weddings", "holidays", "graduation", "corporate"] as const).map((anchor) => (
            <a key={anchor} href={`#${anchor}`}
              className="border border-gold/40 text-gold px-5 py-2 rounded-full text-sm hover:bg-gold hover:text-charcoal transition-colors capitalize"
            >
              {anchor === "graduation" ? `🎓 ${t("graduation")}` : t(anchor as "weddings" | "holidays" | "corporate")}
            </a>
          ))}
        </div>
      </div>

      <ServiceSection id="weddings" title={t("weddings")} items={weddingItems} />
      <ServiceSection id="holidays" title={t("holidays")} items={holidayItems} dark />

      {/* Graduation */}
      <section id="graduation" className="py-20 px-4 bg-cream dark:bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF3715 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-5xl mb-4 block">🎓</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal mb-3">{t("graduation_title")}</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-charcoal dark:text-cream/60 text-sm max-w-2xl mx-auto">{t("graduation_subtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {graduationItems.map((item, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gold/10 hover:border-gold/40 hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-serif font-semibold text-lg mb-2 text-charcoal dark:text-cream">{item.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal dark:text-cream/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href={`/${locale}/booking`}
              className="inline-block bg-gold text-charcoal font-bold px-10 py-3 rounded-full hover:bg-gold/80 transition-colors"
            >
              {t("book_graduation")}
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceSection id="corporate" title={t("corporate")} items={corporateItems} dark />

      <div className="bg-gold py-16 px-4 text-center">
        <h2 className="font-serif text-charcoal text-2xl sm:text-3xl font-bold mb-4">{t("vision_title")}</h2>
        <p className="text-charcoal/70 text-sm mb-6 max-w-xl mx-auto">{t("vision_desc")}</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {(t.raw("vision_tags") as string[]).map((tag) => (
            <span key={tag} className="bg-charcoal/10 text-charcoal text-xs font-medium px-4 py-1.5 rounded-full border border-charcoal/20">{tag}</span>
          ))}
        </div>
        <Link href={`/${locale}/booking`}
          className="inline-block bg-charcoal text-gold font-semibold px-8 py-3 rounded-full hover:bg-charcoal/80 transition-colors"
        >
          {t("book_consultation")}
        </Link>
      </div>
    </div>
  );
}
