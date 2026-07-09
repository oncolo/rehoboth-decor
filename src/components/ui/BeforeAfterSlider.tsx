"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const slides = [
  {
    before: "/images/gallery/corporate-1.jpg",
    after: "/images/gallery/wedding-1.jpg",
    labelKey: "services.weddings",
  },
  {
    before: "/images/gallery/corporate-3.jpg",
    after: "/images/gallery/holiday-1.jpg",
    labelKey: "services.holidays",
  },
];

export default function BeforeAfterSlider() {
  const [current, setCurrent] = useState(0);
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const ui = useTranslations("ui");
  const t = useTranslations();

  const move = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <section className="py-20 px-4 bg-cream dark:bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-3xl mb-2 block">✨</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-charcoal dark:text-cream mb-2">{ui("before_after_title")}</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-3" />
          <p className="text-charcoal/60 text-sm">{ui("before_after_subtitle")}</p>
        </motion.div>

        <div className="flex gap-3 justify-center mb-6">
          {slides.map((s, i) => (
            <button key={i} onClick={() => { setCurrent(i); setPos(50); }}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${i === current ? "bg-gold text-charcoal border-gold" : "border-gold/40 text-gold"}`}
            >
              {t(s.labelKey as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
          onMouseMove={(e) => move(e.clientX)}
          onTouchMove={(e) => move(e.touches[0].clientX)}
        >
          <Image src={slides[current].after} alt="After" fill className="object-cover" sizes="800px" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <Image src={slides[current].before} alt="Before" fill className="object-cover" sizes="800px" />
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
              <span className="text-charcoal text-xs font-bold">⇔</span>
            </div>
          </div>
          <span className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{ui("before")}</span>
          <span className="absolute top-3 right-3 bg-gold text-charcoal text-xs px-2 py-1 rounded-full font-semibold">{ui("after")} ✦</span>
        </div>
      </div>
    </section>
  );
}
