



















"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import PackageCards from "@/components/ui/PackageCards";
import { AwardsBanner, WhatsAppButton } from "@/components/ui/MarketingComponents";
import { GoogleReviews, AvailabilityCalendar } from "@/components/ui/ReviewsAndCalendar";

declare global {
  interface Window { openChatWidget?: () => void; }
}

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

/* ── floating petal config ── */
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5) % 100}%`,
  delay: `${(i * 0.7) % 9}s`,
  duration: `${7 + (i % 5)}s`,
  size: i % 3 === 0 ? "w-3 h-4" : "w-2 h-3",
  color: i % 2 === 0 ? "bg-gold/60" : "bg-gold/30",
}));

/* ── sparkle positions ── */
const SPARKLES = [
  { top: "18%", left: "8%",  delay: "0s",    size: "text-xl" },
  { top: "35%", left: "92%", delay: "0.6s",  size: "text-sm" },
  { top: "60%", left: "5%",  delay: "1.2s",  size: "text-lg" },
  { top: "75%", left: "88%", delay: "0.3s",  size: "text-base" },
  { top: "20%", left: "50%", delay: "1.8s",  size: "text-xs" },
  { top: "80%", left: "45%", delay: "0.9s",  size: "text-sm" },
];

const testimonials = [
  { name: "Sara T.",   city: "Philadelphia, PA", text: "Absolutely stunning setup for our wedding. They captured every cultural detail perfectly." },
  { name: "Dawit M.", city: "Washington, DC",    text: "The Enkutatash decoration was breathtaking — exactly what our family dreamed of." },
  { name: "Maryam A.", city: "Philadelphia, PA", text: "Professional, creative, and deeply rooted in our culture. Highly recommended!" },
];

export default function HomePage() {
  const t = useTranslations();
  const th = useTranslations("home");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cultureCards = [
    {
      key: "traditional",
      icon: (
        <svg className="w-10 h-10 text-gold mx-auto mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8-9h1M3 12H2m15.364-6.364l.707.707M5.636 18.364l-.707.707M18.364 18.364l.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
        </svg>
      ),
    },
    {
      key: "modern",
      icon: (
        <svg className="w-10 h-10 text-gold mx-auto mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 4.068 2 6.5 2 8.796 2 10.907 3.33 12 5.125 13.093 3.33 15.204 2 17.5 2 19.932 2 23 3.759 23 7.191c0 4.105-5.369 8.863-11 14.402z" />
        </svg>
      ),
    },
    {
      key: "cultural",
      icon: (
        <svg className="w-10 h-10 text-gold mx-auto mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.04 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
  ] as const;

  const serviceCards = [
    {
      key: "weddings",
      href: `/${locale}/services#weddings`,
      icon: (
        <svg className="w-10 h-10 text-gold mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      key: "holidays",
      href: `/${locale}/services#holidays`,
      icon: (
        <svg className="w-10 h-10 text-gold mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
    },
    {
      key: "corporate",
      href: `/${locale}/services#corporate`,
      icon: (
        <svg className="w-10 h-10 text-gold mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
  ] as const;

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Video */}
        <video autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

        {/* Floating petals */}
        {mounted && PETALS.map((p) => (
          <div
            key={p.id}
            className={`petal ${p.size} ${p.color} z-[2]`}
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}

        {/* Sparkles */}
        {mounted && SPARKLES.map((s, i) => (
          <span
            key={i}
            className={`sparkle z-[2] ${s.size}`}
            style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: "2.5s" }}
          >
            ✦
          </span>
        ))}

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            {/* Candle left */}
            <svg className="w-5 h-8 text-gold flicker" fill="currentColor" viewBox="0 0 24 40">
              <rect x="9" y="14" width="6" height="22" rx="1" />
              <path d="M12 14 C10 8 14 2 12 0 C10 2 8 8 12 14Z" opacity="0.9" />
            </svg>
            <span className="text-gold/40 tracking-[0.4em] text-sm">✦ ✦ ✦</span>
            {/* Candle right */}
            <svg className="w-5 h-8 text-gold flicker" style={{ animationDelay: "0.4s" }} fill="currentColor" viewBox="0 0 24 40">
              <rect x="9" y="14" width="6" height="22" rx="1" />
              <path d="M12 14 C10 8 14 2 12 0 C10 2 8 8 12 14Z" opacity="0.9" />
            </svg>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight mb-6 text-shimmer"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-cream/70 text-sm sm:text-lg mb-10 max-w-2xl mx-auto"
          >
            {t("hero.subheadline")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/booking`}
              className="relative overflow-hidden bg-gold text-charcoal font-semibold px-8 py-3 rounded-full text-sm sm:text-base group"
            >
              <span className="relative z-10">{t("hero.cta_book")}</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
            <button
              onClick={() => window.openChatWidget?.()}
              className="border border-gold text-gold font-semibold px-8 py-3 rounded-full hover:bg-gold/10 transition-colors text-sm sm:text-base"
            >
              {t("hero.cta_chat")}
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
          >
            <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center pt-2">
              <div className="w-1.5 h-2.5 rounded-full bg-gold animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ AWARDS BANNER ══════════ */}
      <AwardsBanner />

      {/* ══════════ CULTURE GATEWAYS ══════════ */}
      <section className="py-24 px-4 bg-cream dark:bg-[#0d0d0d] relative overflow-hidden">
        {/* Decorative background petals */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gold/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-4xl text-charcoal text-center mb-3"
          >
            {t("culture.title")}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-0.5 bg-gold mx-auto mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {cultureCards.map(({ key, icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow text-center border border-gold/10 card-pulse relative overflow-hidden group"
              >
                {/* Corner decoration */}
                <div className="absolute top-3 right-3 text-gold/20 text-xs">✦</div>
                <div className="absolute bottom-3 left-3 text-gold/20 text-xs">✦</div>

                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {icon}
                </motion.div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  {t(`culture.${key}`)}
                </h3>
                <p className="text-charcoal dark:text-cream/60 text-sm leading-relaxed">
                  {t(`culture.${key}_desc`)}
                </p>
                {/* Hover gold underline */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section className="py-24 px-4 bg-charcoal relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/8 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-4xl text-gold text-center mb-3 glow-title"
          >
            {t("services.title")}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-0.5 bg-gold mx-auto mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {serviceCards.map(({ key, icon, href }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="group relative bg-charcoal border border-gold/20 rounded-2xl p-8 hover:border-gold transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="relative z-10"
                >
                  {icon}
                </motion.div>
                <h3 className="font-serif text-gold text-lg font-semibold mb-2 relative z-10">
                  {t(`services.${key}`)}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed mb-5 relative z-10">
                  {t(`services.${key}_desc`)}
                </p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1 text-gold text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all relative z-10"
                >
                  {th("learn_more")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </Link>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BEFORE & AFTER ══════════ */}
      <BeforeAfterSlider />

      {/* ══════════ PACKAGES ══════════ */}
      <PackageCards />

      {/* ══════════ GOOGLE REVIEWS ══════════ */}
      <GoogleReviews />

      {/* ══════════ AVAILABILITY CALENDAR ══════════ */}
      <AvailabilityCalendar />

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-24 px-4 bg-cream dark:bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF3710 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-4xl text-charcoal text-center mb-3"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-0.5 bg-gold mx-auto mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gold/10 relative overflow-hidden"
              >
                <div className="text-gold/20 font-serif text-6xl absolute -top-2 left-4 leading-none select-none">"</div>
                <p className="text-charcoal dark:text-cream/70 text-sm leading-relaxed mb-4 mt-4 relative z-10">
                  {item.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{item.name}</p>
                    <p className="text-gold text-xs">{item.city}</p>
                  </div>
                  {/* Star rating */}
                  <div className="ml-auto text-gold text-xs">★★★★★</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DECORATION IDEAS ══════════ */}
      <section className="py-24 px-4 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF3708 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-4xl mb-3 block">🌸</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-gold mb-3">{th("design_title")}</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-cream/50 text-sm max-w-xl mx-auto">{th("design_desc")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(th.raw("design_items") as {icon:string;title:string;desc:string}[]).map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white/5 rounded-2xl p-6 border border-gold/20 hover:border-gold transition-all group relative overflow-hidden text-center"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-serif text-gold text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-cream/50 text-xs leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Beauty quote */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-16 text-center border border-gold/20 rounded-2xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 pointer-events-none" />
            <span className="text-gold/30 font-serif text-8xl absolute -top-4 left-6 leading-none select-none">❝</span>
            <p className="font-serif text-cream/80 text-lg sm:text-2xl italic relative z-10 max-w-3xl mx-auto leading-relaxed">
              "{th("quote")}"
            </p>
            <p className="text-gold text-sm mt-4 relative z-10">— Rehoboth Decor</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #121212 0%, #1a1500 50%, #121212 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
        />
        {mounted && SPARKLES.slice(0, 4).map((s, i) => (
          <span key={i} className={`sparkle ${s.size} z-[1]`}
            style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: "3s" }}>
            ✦
          </span>
        ))}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-4xl text-shimmer mb-4"
          >
            {th("cta_title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-cream/50 text-sm mb-8"
          >
            {th("cta_desc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={`/${locale}/booking`}
              className="inline-block relative overflow-hidden bg-gold text-charcoal font-bold px-10 py-4 rounded-full text-sm group"
            >
              <span className="relative z-10">{th("cta_button")}</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
          </motion.div>
        </div>
      </section>
      <WhatsAppButton />
    </>
  );
}
