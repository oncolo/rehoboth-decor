"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarAdmin() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [icalUrl, setIcalUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const resDates = await fetch("/api/settings?key=manual_booked_dates", { cache: "no-store" });
      if (resDates.ok) {
        const dates = await resDates.json();
        if (Array.isArray(dates)) setBookedDates(dates);
      }
      
      const resIcal = await fetch("/api/settings?key=ical_url", { cache: "no-store" });
      if (resIcal.ok) {
        const url = await resIcal.json();
        if (typeof url === 'string') setIcalUrl(url);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  async function toggleDate(dateStr: string) {
    const updated = bookedDates.includes(dateStr)
      ? bookedDates.filter(d => d !== dateStr)
      : [...bookedDates, dateStr];
    
    setBookedDates(updated);
    
    // Save to backend
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "manual_booked_dates", value: updated })
    });
  }

  async function saveIcalUrl() {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "ical_url", value: icalUrl.trim() })
      });
      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (e) {
      setSaveStatus("error");
    }
    setIsSaving(false);
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const todayStr = today.toISOString().split("T")[0];

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl text-gold mb-6">Availability Calendar</h1>

        <div className="bg-[#1a1a1a] border border-gold/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl text-cream font-medium mb-2">Web Calendar Sync (iCal)</h2>
          <p className="text-cream/40 text-sm mb-4">Paste your Google, Apple, or Outlook Calendar's public iCal (.ics) link here to automatically sync booked dates to your website.</p>
          
          <div className="flex gap-2">
            <input 
              type="text"
              value={icalUrl}
              onChange={e => setIcalUrl(e.target.value)}
              placeholder="https://calendar.google.com/calendar/ical/.../basic.ics"
              className="flex-1 bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold"
            />
            <button 
              onClick={saveIcalUrl}
              disabled={isSaving}
              className="bg-gold text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Sync"}
            </button>
          </div>
          {saveStatus === "success" && <p className="text-green-400 text-xs pt-2">Sync URL saved! The public site will now reflect these dates.</p>}
          {saveStatus === "error" && <p className="text-red-400 text-xs pt-2">Failed to save sync URL.</p>}
        </div>

        <h2 className="text-xl text-cream font-medium mb-4">Manual Availability</h2>
        
        {isLoading ? (
          <p className="text-cream/50 text-sm">Loading calendar...</p>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full text-xl transition-colors">‹</button>
              <p className="text-cream font-semibold text-lg min-w-[180px] text-center">{MONTHS[month]} {year}</p>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 rounded-full text-xl transition-colors">›</button>
            </div>

            <div className="flex gap-4 mb-4 text-xs text-cream/50">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500/30 border border-green-500/60 inline-block" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500/30 border border-red-500/60 inline-block" /> Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gold/20 border border-gold inline-block" /> Today</span>
            </div>

            <div className="bg-[#1a1a1a] border border-gold/10 rounded-2xl p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                  <p key={d} className="text-center text-cream/30 text-xs py-1 font-medium">{d}</p>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isBooked = bookedDates.includes(dateStr);
                  const isToday = dateStr === todayStr;
                  return (
                    <button key={i} onClick={() => toggleDate(dateStr)} title={isBooked ? "Click to mark available" : "Click to mark booked"}
                      className={`rounded-lg py-2.5 text-sm font-medium transition-all border
                        ${isBooked ? "bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30" :
                          "bg-[#0d0d0d] border-gold/10 text-cream/60 hover:border-green-500/50 hover:text-cream"}
                        ${isToday ? "ring-2 ring-gold ring-offset-1 ring-offset-[#1a1a1a]" : ""}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-cream/30 text-xs mt-3">Click any date to toggle manually booked / available.</p>
          </>
        )}
      </div>
    </AdminShell>
  );
}
