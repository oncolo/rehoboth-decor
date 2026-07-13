"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("admin_bookings") || "[]"));
    setBookedDates(JSON.parse(localStorage.getItem("booked_dates") || "[]"));
    setGallery(JSON.parse(localStorage.getItem("admin_gallery") || "[]"));
  }, []);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: "📋", href: "/admin/bookings" },
    { label: "Pending", value: bookings.filter(b => !b.status || b.status === "pending").length, icon: "🔔", href: "/admin/bookings" },
    { label: "Booked Dates", value: bookedDates.length, icon: "📅", href: "/admin/calendar" },
    { label: "Gallery Photos", value: gallery.length, icon: "🖼️", href: "/admin/gallery" },
  ];

  return (
    <AdminShell>
      <h1 className="font-serif text-3xl text-gold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <Link key={s.label} href={s.href}
            className="bg-[#1a1a1a] border border-gold/20 rounded-xl p-5 hover:border-gold/50 transition-colors">
            <p className="text-3xl mb-2">{s.icon}</p>
            <p className="text-2xl font-bold text-gold">{s.value}</p>
            <p className="text-cream/50 text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-cream/80 mb-4">Recent Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-16 text-cream/30">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm">No bookings yet. Submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...bookings].reverse().slice(0, 5).map((b, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-gold/10 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-cream">{b.name}</p>
                <p className="text-cream/40 text-xs mt-0.5">{b.event_type} — {b.date}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${
                b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                b.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                "bg-gold/20 text-gold"}`}>
                {b.status || "pending"}
              </span>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
