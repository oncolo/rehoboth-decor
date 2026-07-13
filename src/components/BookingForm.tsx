"use client";
import { useState } from "react";
import { RentalItem } from "@/lib/db";

type Props = {
  rentalItem?: RentalItem;
  onClose: () => void;
};

export default function BookingForm({ rentalItem, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, phone, date, location, message,
        rentalItemId: rentalItem?.id,
        event_type: rentalItem ? `Rental: ${rentalItem.name}` : "General Booking",
        budget: rentalItem ? `$${rentalItem.price}` : "N/A"
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-[#1a1a1a] border border-gold/30 rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-2xl font-serif text-gold mb-2">Request Sent!</h2>
          <p className="text-cream/70 text-sm mb-6">We have received your booking request and will contact you shortly via WhatsApp.</p>
          <button onClick={onClose} className="bg-gold text-charcoal font-semibold py-2 px-6 rounded-full hover:bg-gold/80 transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1a1a1a] border border-gold/30 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-cream/40 hover:text-white transition-colors">
          ✕
        </button>
        
        <h2 className="text-2xl font-serif text-gold mb-2">{rentalItem ? `Book ${rentalItem.name}` : "Book Now"}</h2>
        {rentalItem && <p className="text-cream/50 text-sm mb-6 border-b border-gold/10 pb-4">Price: <span className="text-gold">${rentalItem.price}</span></p>}
        {!rentalItem && <p className="text-cream/50 text-sm mb-6">Fill out the details below.</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase tracking-wider">Name</label>
            <input required value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase tracking-wider">Phone / WhatsApp</label>
            <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1 uppercase tracking-wider">Event Date</label>
              <input required type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1 uppercase tracking-wider">Location</label>
              <input required value={location} onChange={e => setLocation(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase tracking-wider">Additional Requirements</label>
            <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold resize-none" />
          </div>

          {status === "error" && <p className="text-red-400 text-xs">❌ Something went wrong. Please try again.</p>}

          <button disabled={status === "submitting"} type="submit"
            className="w-full bg-gold text-charcoal font-semibold py-3 rounded-full hover:bg-gold/80 transition-colors mt-2 disabled:opacity-50">
            {status === "submitting" ? "Sending..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
