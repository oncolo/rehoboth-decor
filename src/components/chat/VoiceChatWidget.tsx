"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import VoiceRecorder from "./VoiceRecorder";
import AudioPlayer from "./AudioPlayer";
import LiveCallButton from "./LiveCallButton";

const MessageCircle = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const X = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

interface VoiceNote {
  id: number;
  blob: Blob;
  waveform: number[];
}

export default function VoiceChatWidget() {
  const t = useTranslations("voice");
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [text, setText] = useState("");

  const handleSend = (blob: Blob, waveform: number[]) => {
    setNotes((prev) => [...prev, { id: Date.now(), blob, waveform }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-80 bg-charcoal border border-gold/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "480px" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/10">
              <span className="font-serif text-gold text-sm font-semibold">Habesha Decor</span>
              <LiveCallButton />
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[160px]">
              {notes.length === 0 && (
                <p className="text-cream/30 text-xs text-center mt-8">{t("placeholder")}</p>
              )}
              {notes.map((note) => (
                <div key={note.id} className="flex justify-end">
                  <div className="bg-gold/10 border border-gold/20 rounded-xl rounded-br-sm px-3 py-2 max-w-[220px]">
                    <AudioPlayer blob={note.blob} waveform={note.waveform} />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/10 px-2 py-2 flex items-center gap-1">
              <VoiceRecorder onSend={handleSend} />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("type_placeholder")}
                className="flex-1 bg-transparent text-cream/80 text-sm placeholder-cream/30 outline-none px-2"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        className="relative bg-gold rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gold/90 transition-colors"
        style={{ color: "#1a1a1a" }}
      >
        {!open && <span className="absolute inset-0 rounded-full animate-ping bg-gold/30 pointer-events-none" />}
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}

