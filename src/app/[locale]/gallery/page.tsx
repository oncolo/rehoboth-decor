"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Photo } from "@/lib/db";

const CATEGORIES = ["Weddings", "Cultural Holidays", "🎓 Graduation", "Corporate"];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const ts = useTranslations("services");
  const ui = useTranslations("ui");
  const locale = useLocale();
  
  const [dbPhotos, setDbPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<Photo | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (res.ok) {
          setDbPhotos(await res.json());
        }
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filters = [
    { key: "all", label: t("filter_all") },
    ...CATEGORIES.map(c => ({ key: c, label: c }))
  ];

  const filtered = activeFilter === "all" ? dbPhotos : dbPhotos.filter((i) => i.category === activeFilter);

  return (
    <div className="bg-cream dark:bg-[#0d0d0d] min-h-screen">
      <div className="bg-charcoal py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
        />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-3">
          <span className="text-4xl">📸</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl sm:text-5xl text-gold mb-3">
          {t("title")}
        </motion.h1>
        <p className="text-cream/50 text-sm max-w-md mx-auto mb-6">
          {ui("gallery_subtitle")}
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2 mb-2">
          {filters.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === key ? "bg-gold text-charcoal dark:text-cream" : "border border-gold/40 text-gold hover:bg-gold/10"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto py-12 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-gold/10 rounded-2xl bg-white/5">
            <p className="text-cream/40 mb-2">No photos available in this category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxItem(item)}
                >
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e => (e.currentTarget.src = "/images/placeholder.jpg")} />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-end p-3">
                    <p className="text-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-3xl w-full bg-charcoal rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={lightboxItem.url} alt={lightboxItem.caption} className="w-full h-full object-cover" onError={e => (e.currentTarget.src = "/images/placeholder.jpg")} />
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-gold text-lg font-semibold">{lightboxItem.caption || "Gallery Photo"}</h3>
                  <p className="text-cream/60 text-sm mt-1">{lightboxItem.category}</p>
                </div>
                <Link href={`/${locale}/booking`} onClick={() => setLightboxItem(null)}
                  className="shrink-0 bg-gold text-charcoal font-semibold px-5 py-2 rounded-full text-sm hover:bg-gold/80 transition-colors"
                >
                  {t("request_similar")}
                </Link>
              </div>
              <button onClick={() => setLightboxItem(null)}
                className="absolute top-3 right-3 text-cream bg-charcoal/60 rounded-full w-8 h-8 flex items-center justify-center hover:bg-charcoal transition-colors"
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
