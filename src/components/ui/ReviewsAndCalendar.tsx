"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const reviews = [
  { name: "Tigist B.",    rating: 5, date: "2 weeks ago",  text: "Absolutely magical! Our Enkutatash party was beyond beautiful. Rehoboth Decor understood our culture perfectly." },
  { name: "Mohammed A.", rating: 5, date: "1 month ago",  text: "Best decorator in Philadelphia! Our Nikaah ceremony was breathtaking. Every detail was perfect." },
  { name: "Hiwot G.",    rating: 5, date: "1 month ago",  text: "They transformed our daughter's graduation into a royal celebration. Worth every penny!" },
  { name: "Yohannes T.", rating: 5, date: "2 months ago", text: "Our Mels ceremony was stunning. The cultural details were authentic and the florals were gorgeous." },
  { name: "Fatima H.",   rating: 5, date: "2 months ago", text: "Professional, creative, and so kind. They made our Eid celebration unforgettable for our whole family." },
];

const BOOKED = [3, 7, 14, 15, 21, 28];

export function GoogleReviews() {
  return (
    <section className="py-20 px-4 bg-cream dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg viewBox="0 0 48 48" className="w-8 h-8">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span className="font-serif text-2xl sm:text-3xl text-charcoal dark:text-cream">Google Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-gold text-2xl font-bold">4.9</span>
            <div className="text-gold text-xl">★★★★★</div>
            <span className="text-charcoal/50 text-sm">(120+ reviews)</span>
          </div>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-gold/10 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">{r.name[0]}</div>
                <div>
                  <p className="text-charcoal dark:text-cream text-sm font-semibold">{r.name}</p>
                  <p className="text-charcoal/40 text-xs">{r.date}</p>
                </div>
                <div className="ml-auto text-gold text-xs">{"★".repeat(r.rating)}</div>
              </div>
              <p className="text-charcoal/70 dark:text-cream/70 text-xs leading-relaxed">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AvailabilityCalendar() {
  const [current, setCurrent] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const ui = useTranslations("ui");
  const year = current.getFullYear();
  const m = current.getMonth();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const firstDay = new Date(year, m, 1).getDay();
  const monthName = current.toLocaleString("default", { month: "long", year: "numeric" });

  function prevMonth() { setCurrent(new Date(year, m - 1, 1)); }
  function nextMonth() { setCurrent(new Date(year, m + 1, 1)); }

  useEffect(() => {
    fetch("/api/calendar")
      .then(res => res.json())
      .then(data => {
        if (data.dates) {
          setBookedDates(data.dates);
        }
      })
      .catch(err => console.error("Failed to load availability", err));
  }, []);

  return (
    <section className="py-20 px-4 bg-charcoal">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <span className="text-3xl mb-2 block">🗓️</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-gold mb-2">{ui("availability_title")}</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-3" />
          <p className="text-cream/50 text-sm">{ui("availability_subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="bg-white/5 rounded-2xl border border-gold/20 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-gold hover:bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center text-xl transition-colors">‹</button>
            <p className="text-gold font-serif text-lg">{monthName}</p>
            <button onClick={nextMonth} className="text-gold hover:bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center text-xl transition-colors">›</button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="text-cream/30 text-xs text-center py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const booked = bookedDates.includes(dateStr);
              const todayStr2 = new Date().toISOString().split("T")[0];
              const today = dateStr === todayStr2;
              return (
                <div key={day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors
                    ${booked ? "bg-red-500/20 text-red-400 cursor-not-allowed" : "bg-green-500/10 text-green-400 hover:bg-green-500/20 cursor-pointer"}
                    ${today ? "ring-1 ring-gold" : ""}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 justify-center mt-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/20 inline-block" />{ui("available")}</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/20 inline-block" />{ui("booked")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
