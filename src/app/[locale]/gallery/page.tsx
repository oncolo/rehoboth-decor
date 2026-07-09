"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Category = "all" | "weddings" | "holidays" | "corporate" | "graduation";
interface GalleryItem { src: string; alt: string; category: Exclude<Category, "all">; description: string; }

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/wedding-1.jpg", alt: "Traditional Mels Ceremony", category: "weddings", description: "Authentic Mels ceremony with traditional Ethiopian textile decor." },
  { src: "/images/gallery/wedding-2.jpg", alt: "White Wedding Setup", category: "weddings", description: "Grand white wedding with floral arch and draped ceiling." },
  { src: "/images/gallery/wedding-3.jpg", alt: "Nikaah Ceremony Decor", category: "weddings", description: "Elegant Islamic-inspired Nikaah ceremony arrangement." },
  { src: "/images/gallery/wedding-4.jpg", alt: "Wedding Reception", category: "weddings", description: "Elegant wedding reception with gold and white theme." },
  { src: "/images/gallery/wedding-5.jpg", alt: "Bridal Table Setup", category: "weddings", description: "Luxurious bridal table with floral centerpieces." },
  { src: "/images/gallery/wedding-6.jpg", alt: "Wedding Ceremony Decor", category: "weddings", description: "Beautiful ceremony aisle with petal arrangements." },
  { src: "/images/gallery/wedding-7.jpg", alt: "Traditional Wedding", category: "weddings", description: "Traditional Ethiopian wedding with cultural fabric displays." },
  { src: "/images/gallery/wedding-8.jpg", alt: "Wedding Floral Arch", category: "weddings", description: "Grand floral arch entrance for wedding ceremony." },
  { src: "/images/gallery/wedding-9.jpg", alt: "Wedding Table Setting", category: "weddings", description: "Refined table setting with gold candelabras and florals." },
  { src: "/images/gallery/wedding-10.jpg", alt: "Wedding Stage Decor", category: "weddings", description: "Stunning wedding stage with draped fabric and lighting." },
  { src: "/images/gallery/holiday-1.jpg", alt: "Enkutatash Setup", category: "holidays", description: "Ethiopian New Year celebration with Adey Abeba flowers." },
  { src: "/images/gallery/holiday-2.jpg", alt: "Meskel Decoration", category: "holidays", description: "Meskel cross display with yellow wildflower arrangements." },
  { src: "/images/gallery/holiday-3.jpg", alt: "Eid Celebration", category: "holidays", description: "Luxurious Eid banquet table setup with gold accents." },
  { src: "/images/gallery/holiday-4.jpg", alt: "Genna Decoration", category: "holidays", description: "Warm Genna holiday setup with traditional candles and ornaments." },
  { src: "/images/gallery/holiday-5.jpg", alt: "Fasika Setup", category: "holidays", description: "Elegant Fasika Easter floral arrangements celebrating renewal." },
  { src: "/images/gallery/holiday-6.jpg", alt: "Timkat Ceremony", category: "holidays", description: "Sacred Timkat ceremonial layout with vibrant colors." },
  { src: "/images/gallery/holiday-7.jpg", alt: "Cultural Festival Decor", category: "holidays", description: "Vibrant festival setup honoring Ethiopian cultural heritage." },
  { src: "/images/gallery/holiday-8.jpg", alt: "Holiday Banquet", category: "holidays", description: "Grand banquet hall setup for cultural holiday celebration." },
  { src: "/images/gallery/holiday-9.jpg", alt: "Traditional Holiday Setup", category: "holidays", description: "Traditional holiday decor with cultural textile and florals." },
  { src: "/images/gallery/holiday-10.jpg", alt: "Festive Table Arrangement", category: "holidays", description: "Festive table with gold accents and cultural motifs." },
  { src: "/images/gallery/corporate-1.jpg", alt: "Graduation Gala", category: "corporate", description: "Custom graduation milestone decor with personalized elements." },
  { src: "/images/gallery/corporate-2.jpg", alt: "Baby Shower", category: "corporate", description: "Whimsical pastel baby shower with floral balloon wall." },
  { src: "/images/gallery/corporate-3.jpg", alt: "Community Event", category: "corporate", description: "Large-scale diaspora community gathering setup." },
  { src: "/images/gallery/corporate-4.jpg", alt: "Corporate Gala", category: "corporate", description: "Sleek corporate gala with elegant black and gold theme." },
  { src: "/images/gallery/corporate-5.jpg", alt: "Birthday Celebration", category: "corporate", description: "Milestone birthday party with custom balloon installations." },
  { src: "/images/gallery/corporate-6.jpg", alt: "Private Event Setup", category: "corporate", description: "Intimate private event with curated floral centerpieces." },
  { src: "/images/gallery/corporate-7.jpg", alt: "Banquet Hall Decor", category: "corporate", description: "Full banquet hall transformation for a gala dinner." },
  { src: "/images/gallery/corporate-8.jpg", alt: "Award Ceremony", category: "corporate", description: "Professional award ceremony stage and table decor." },
  { src: "/images/gallery/corporate-9.jpg", alt: "Community Gathering", category: "corporate", description: "Colorful community diaspora gathering with cultural touches." },
  { src: "/images/gallery/corporate-10.jpg", alt: "Milestone Event", category: "corporate", description: "Special milestone celebration with personalized decor." },
  { src: "/images/gallery/corporate-11.jpg", alt: "VIP Event Setup", category: "corporate", description: "VIP lounge-style setup with luxury gold and cream accents." },
  { src: "/images/gallery/corporate-1.jpg", alt: "Graduation Stage Setup", category: "graduation", description: "Custom graduation stage with personalized banners and gold balloon arch." },
  { src: "/images/gallery/corporate-2.jpg", alt: "Graduation Photo Wall", category: "graduation", description: "Stunning floral photo wall for graduate family portraits." },
  { src: "/images/gallery/corporate-3.jpg", alt: "Graduation Balloon Arch", category: "graduation", description: "Grand balloon arch in school colors with gold accents." },
  { src: "/images/gallery/corporate-4.jpg", alt: "Graduation Banquet Table", category: "graduation", description: "Elegant banquet table setting for graduation reception dinner." },
  { src: "/images/gallery/corporate-5.jpg", alt: "Graduation Centerpiece", category: "graduation", description: "Premium floral centerpieces with graduation cap motifs." },
  { src: "/images/gallery/corporate-6.jpg", alt: "Graduation Ceremony Decor", category: "graduation", description: "Full ceremony hall transformation with lighting and drapery." },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const ts = useTranslations("services");
  const ui = useTranslations("ui");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filters = [
    { key: "all" as Category,        label: t("filter_all") },
    { key: "weddings" as Category,   label: t("filter_weddings") },
    { key: "holidays" as Category,   label: t("filter_holidays") },
    { key: "graduation" as Category, label: `🎓 ${ts("graduation")}` },
    { key: "corporate" as Category,  label: t("filter_corporate") },
  ];

  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

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
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item.src} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxItem(item)}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-end p-3">
                  <p className="text-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
                <Image src={lightboxItem.src} alt={lightboxItem.alt} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-gold text-lg font-semibold">{lightboxItem.alt}</h3>
                  <p className="text-cream/60 text-sm mt-1">{lightboxItem.description}</p>
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
