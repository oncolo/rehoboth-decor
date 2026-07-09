"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  const values = t.raw("values") as { icon: string; title: string; desc: string }[];
  const decorIdeas = t.raw("decor_ideas") as { icon: string; title: string; desc: string }[];
  const stats = t.raw("stats") as { num: string; label: string }[];

  return (
    <div className="bg-cream dark:bg-[#0d0d0d] min-h-screen">

      {/* Hero */}
      <div className="relative bg-charcoal py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)" }}
        />
        {["10%", "50%", "90%"].map((left, i) => (
          <span key={i} className="sparkle text-sm z-0" style={{ top: "20%", left, animationDelay: `${i * 0.6}s`, animationDuration: "3s" }}>✦</span>
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mb-4">
          <span className="text-4xl">🌸</span>
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" className="font-serif text-3xl sm:text-5xl text-gold mb-3 relative z-10">
          {t("title")}
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="w-24 h-0.5 bg-gold mx-auto mt-4"
        />
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto py-20 px-4 text-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gold/10 text-[120px] font-serif leading-none select-none pointer-events-none">"</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gold/10 text-[120px] font-serif leading-none select-none pointer-events-none rotate-180">"</div>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-charcoal dark:text-cream/80 text-base sm:text-xl leading-loose relative z-10 italic"
        >
          {t("story")}
        </motion.p>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 max-w-2xl mx-auto px-4 mb-0">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold text-lg">✦</span>
        <span className="text-gold/60 text-sm">✦</span>
        <span className="text-gold text-lg">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      {/* Values */}
      <section className="bg-white dark:bg-white/5 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {values.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg transition-all"
            >
              <span className="text-5xl mb-4 block">{item.icon}</span>
              <h3 className="font-serif text-charcoal text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-charcoal dark:text-cream/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Decor Ideas */}
      <section className="py-20 px-4 bg-cream dark:bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF3712 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-4xl mb-3 block">💡</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal mb-3">{t("decor_ideas_title")}</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-charcoal dark:text-cream/60 text-sm max-w-xl mx-auto">{t("decor_ideas_subtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decorIdeas.map((idea, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gold/10 hover:border-gold/40 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full pointer-events-none" />
                <span className="text-4xl mb-4 block">{idea.icon}</span>
                <h3 className="font-serif text-charcoal font-semibold text-lg mb-2">{idea.title}</h3>
                <p className="text-charcoal dark:text-cream/60 text-sm leading-relaxed">{idea.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link href={`/${locale}/gallery`}
              className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-charcoal transition-colors font-semibold text-sm"
            >
              {t("view_portfolio")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <p className="font-serif text-gold text-3xl sm:text-4xl font-bold mb-1">{stat.num}</p>
              <p className="text-cream/60 text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto py-20 px-4 text-center">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-serif text-2xl sm:text-3xl text-charcoal mb-4"
        >
          {t("team_title")}
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-charcoal dark:text-cream/60 text-sm sm:text-base mb-10"
        >
          {t("team_desc")}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link href={`/${locale}/booking`}
            className="inline-block bg-gold text-charcoal font-bold px-10 py-3 rounded-full hover:bg-gold/80 transition-colors"
          >
            {t("book_consultation")}
          </Link>
        </motion.div>
      </section>

      {/* Developer credit */}
      <section className="py-10 px-4 border-t border-gold/10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-lg">D</div>
          <div>
            <p className="text-charcoal text-sm font-semibold">Developed by <span className="text-gold">Daniel Abera</span></p>
            <p className="text-charcoal dark:text-cream/50 text-xs">Full-Stack Developer · Next.js · Tailwind CSS</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
