"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BookingPage() {
  const t = useTranslations("booking");
  const budgetOptions = t.raw("budget_options") as string[];
  const eventOptions = t.raw("event_options") as string[];
  const [state, handleSubmit] = useForm("xojoonej");

  const inputClass = "w-full border border-charcoal/20 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-white/5 text-charcoal dark:text-cream focus:outline-none focus:border-gold transition-colors";
  const labelClass = "block text-sm font-medium text-charcoal dark:text-cream/80 mb-1";

  return (
    <div className="bg-cream dark:bg-[#0d0d0d] min-h-screen">
      <div className="bg-charcoal py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
        />
        <span className="text-4xl mb-3 block">📅</span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl sm:text-5xl text-gold mb-3">
          {t("title")}
        </motion.h1>
        <p className="text-cream/50 text-sm max-w-md mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {(t.raw("tags") as string[]).map((t) => (
            <span key={t} className="text-xs text-gold/70 border border-gold/20 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <span className="text-5xl mb-4">✅</span>
              <h2 className="font-serif text-2xl text-charcoal mb-2">{t("success_title")}</h2>
              <p className="text-charcoal dark:text-cream/60 text-sm">{t("success_body")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {(["name", "phone", "date", "location"] as const).map((field) => (
                <div key={field}>
                  <label className={labelClass}>{t(field as "name" | "phone" | "date" | "location")}</label>
                  <input
                    type={field === "date" ? "date" : field === "phone" ? "tel" : "text"}
                    name={field} required className={inputClass}
                  />
                  <ValidationError field={field} errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
              ))}
              <div>
                <label className={labelClass}>{t("event_type")}</label>
                <select name="event_type" required className={inputClass}>
                  <option value="">{t("select_placeholder")}</option>
                  {eventOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t("budget")}</label>
                <select name="budget" required className={inputClass}>
                  <option value="">{t("select_placeholder")}</option>
                  {budgetOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t("message")}</label>
                <textarea name="message" rows={4} className={`${inputClass} resize-none`} />
              </div>
              <ValidationError errors={state.errors} className="text-red-500 text-sm text-center" />
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gold text-charcoal font-semibold py-3 rounded-full hover:bg-gold/80 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state.submitting ? t("sending") : t("submit")}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-auto min-h-[400px]"
        >
          <iframe
            title="Philadelphia Service Area"
            src="https://maps.google.com/maps?q=Philadelphia,PA,USA&t=&z=12&ie=UTF8&iwloc=&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}
