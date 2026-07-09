"use client";

import { useTranslations } from "next-intl";

const Phone = ({ size = 14 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.5 6.5l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const PhoneOff = ({ size = 14 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.5 16.5L19 19a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18a2 2 0 0 1 2-.17l3 .01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11l-.96.96"/></svg>);

function isBusinessHours(): boolean {
  const est = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const h = est.getHours();
  const day = est.getDay();
  return day >= 1 && day <= 5 && h >= 9 && h < 18;
}

export default function LiveCallButton() {
  const t = useTranslations("voice");
  const open = isBusinessHours();

  if (open) {
    return (
      <a href="tel:+14848406162" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors">
        <Phone size={14} />{t("call_live")}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2 text-cream/40 text-xs px-2 cursor-not-allowed select-none">
      <PhoneOff size={14} /><span>9 AM – 6 PM EST</span>
    </div>
  );
}

