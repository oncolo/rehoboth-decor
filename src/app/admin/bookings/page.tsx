"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { BookingRequest } from "@/lib/db";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setIsLoading(true);
    const res = await fetch("/api/bookings", { cache: "no-store" });
    if (res.ok) {
      setBookings(await res.json());
    }
    setIsLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchBookings();
  }

  async function deleteBooking(id: string) {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    if (res.ok) {
      setExpanded(null);
      fetchBookings();
    }
  }

  const reversed = [...bookings].reverse();

  return (
    <AdminShell>
      <h1 className="font-serif text-3xl text-gold mb-6">Booking Requests</h1>
      
      {isLoading ? (
        <p className="text-cream/50 text-center py-10">Loading...</p>
      ) : reversed.length === 0 ? (
        <div className="text-center py-20 text-cream/30">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-sm">No bookings yet. They appear here when customers submit the form.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reversed.map((b) => {
            const isOpen = expanded === b.id;
            return (
              <div key={b.id} className="bg-[#1a1a1a] border border-gold/10 rounded-xl px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpanded(isOpen ? null : b.id)}>
                    <p className="font-semibold text-cream">{b.name} {b.rentalItemId && <span className="text-xs ml-2 bg-gold/20 text-gold px-2 py-0.5 rounded">Rental</span>}</p>
                    <p className="text-cream/50 text-xs mt-0.5">{b.event_type} · {b.date} · {b.location}</p>
                    <p className="text-cream/40 text-xs">Budget: {b.budget}</p>
                    {b.receivedAt && <p className="text-cream/30 text-xs mt-1">{new Date(b.receivedAt).toLocaleString()}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    <select value={b.status || "pending"} onChange={e => updateStatus(b.id, e.target.value)}
                      className="bg-[#0d0d0d] border border-gold/20 text-cream text-xs rounded px-2 py-1 focus:outline-none">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <a href={`https://wa.me/${b.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-green-600/20 text-green-400 border border-green-600/30 px-3 py-1 rounded-full hover:bg-green-600/40 transition-colors">
                      📱 WhatsApp
                    </a>
                    <button onClick={() => deleteBooking(b.id)}
                      className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-2 py-1 rounded-full">✕</button>
                  </div>
                </div>
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-gold/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-cream/60">
                    <p><span className="text-cream/30">Phone:</span> {b.phone}</p>
                    <p><span className="text-cream/30">Location:</span> {b.location}</p>
                    <p><span className="text-cream/30">Budget:</span> {b.budget}</p>
                    <p><span className="text-cream/30">Event:</span> {b.event_type}</p>
                    {b.rentalItemId && <p className="sm:col-span-2"><span className="text-cream/30">Rental Item ID:</span> {b.rentalItemId}</p>}
                    <p className="sm:col-span-2"><span className="text-cream/30">Message:</span> {b.message || "—"}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
