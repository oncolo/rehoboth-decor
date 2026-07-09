"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBotReply, type Lang } from "@/lib/chatReplies";

interface Message { from: "user" | "bot"; text: string }

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English",  flag: "🇺🇸" },
  { code: "am", label: "አማርኛ",    flag: "🇪🇹" },
  { code: "om", label: "Oromoo",   flag: "🇪🇹" },
  { code: "ti", label: "ትግርኛ",    flag: "🇪🇷" },
];

const WELCOME: Record<Lang, string> = {
  en: "👋 Welcome to Habesha Decor! How can we help you today?",
  am: "👋 ወደ ሀበሻ ዲኮር እንኳን ደህና መጡ! ዛሬ እንዴት ልንረዳዎ እንችላለን?",
  om: "👋 Baga Habesha Decor dhuftan! Maal gochuu dandeenyaa?",
  ti: "👋 ናብ ሃበሻ ዲኮር እንኳን ብደሓን! ብኸመይ ክንሕግዘኩም ንኽእል?",
};

const QUICK: Record<Lang, string[]> = {
  en: ["💍 Weddings", "🌸 Enkutatash", "💰 Pricing", "📅 Book Now", "✨ How it works", "❓ FAQ", "🌺 Decor items", "📍 Location"],
  am: ["💍 ሰርጎች", "🌸 እንቁጣጣሽ", "💰 ዋጋ", "📅 ቀጠሮ ያዝ", "✨ ሂደት", "❓ ጥያቄዎች", "🌺 አስጌጦች", "📍 ቦታ"],
  om: ["💍 Heeruma", "🌸 Enkutatash", "💰 Gatii", "📅 Qabadhu", "✨ Tartiiba", "❓ FAQ", "🌺 Miidhagina", "📍 Iddoo"],
  ti: ["💍 ሰርጋት", "🌸 እንቁጣጣሽ", "💰 ዋጋ", "📅 ቆጸራ ሓዝ", "✨ ሂደት", "❓ ሕቶታት", "🌺 ዝርዝር", "📍 ቦታ"],
};

const PLACEHOLDER: Record<Lang, string> = {
  en: "Type a message...",
  am: "መልዕክት ይጻፉ...",
  om: "Ergaa barreessi...",
  ti: "መልእኽቲ ጸሓፍ...",
};

export default function ChatWidget({ locale }: { locale?: string }) {
  const [open, setOpen]       = useState(false);
  const [lang, setLang]       = useState<Lang>((locale as Lang) ?? "en");
  const [input, setInput]     = useState("");
  const [showLangs, setShowLangs] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: WELCOME[(locale as Lang) ?? "en"] },
  ]);
  const [typing, setTyping]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    window.openChatWidget = () => setOpen(true);
    return () => { delete window.openChatWidget; };
  }, []);

  function switchLang(l: Lang) {
    setLang(l);
    setShowLangs(false);
    setMessages([{ from: "bot", text: WELCOME[l] }]);
  }

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((p) => [...p, { from: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [...p, { from: "bot", text: getBotReply(msg, lang) }]);
    }, 700);
  }

  const currentLang = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
            style={{ background: "#111", width: 320, maxHeight: 540 }}
          >
            
            <div
              className="px-4 py-3 flex items-center justify-between shrink-0"
              style={{ background: "linear-gradient(90deg,#c9982a,#D4AF37,#e8c84a)" }}
            >
              <div>
                <p className="font-bold text-sm text-black">Habesha Decor</p>
                <p className="text-[10px] text-black/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block" />
                  Philadelphia, PA
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Language picker */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangs((v) => !v)}
                    className="flex items-center gap-1 bg-black/20 hover:bg-black/30 rounded-full px-2 py-1 text-[10px] font-semibold text-black transition-colors"
                  >
                    {currentLang.flag} {currentLang.label}
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {showLangs && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute right-0 top-8 rounded-xl shadow-xl border border-white/10 overflow-hidden z-50"
                        style={{ background: "#1a1a1a", minWidth: 130 }}
                      >
                        {LANGS.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => switchLang(l.code)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/10 transition-colors text-left ${lang === l.code ? "text-yellow-400 font-semibold" : "text-white/80"}`}
                          >
                            {l.flag} {l.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-full shrink-0 mr-1.5 mt-0.5 flex items-center justify-center text-[10px]"
                      style={{ background: "linear-gradient(135deg,#c9982a,#D4AF37)" }}>
                      ✦
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line"
                    style={
                      msg.from === "user"
                        ? { background: "linear-gradient(135deg,#c9982a,#D4AF37)", color: "#111" }
                        : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

            
              {typing && (
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px]"
                    style={{ background: "linear-gradient(135deg,#c9982a,#D4AF37)" }}>
                    ✦
                  </div>
                  <div className="px-3 py-2 rounded-2xl flex gap-1 items-center"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Quick replies ── */}
            <div className="px-3 pt-1 pb-0 flex gap-1.5 flex-wrap shrink-0">
              {QUICK[lang].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* ── Input ── */}
            <div className="px-3 py-3 shrink-0 space-y-2">
              <div
                className="flex items-center gap-2 rounded-2xl px-3 py-2"
                style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={PLACEHOLDER[lang]}
                  className="bg-transparent text-white outline-none flex-1 text-xs placeholder:text-white/40"
                />
                <button
                  onClick={() => send()}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#c9982a,#D4AF37)" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#111" }}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>

              {/* Call / WhatsApp */}
              <div className="flex gap-2">
                <a
                  href="tel:+14848406162"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-semibold"
                  style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  Call
                </a>
                <button
                  onClick={() => window.open("https://wa.me/14848406162", "_blank")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-semibold"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-16 h-16 rounded-full flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg,#c9982a,#D4AF37,#e8c84a)", boxShadow: "0 4px 24px rgba(212,175,55,0.4)" }}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="#111" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="#111" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        )}
        {!open && (
          <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] text-white flex items-center justify-center font-bold">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}
