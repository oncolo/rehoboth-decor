"use client";
import { useEffect, useState } from "react";
import { RentalItem } from "@/lib/db";
import BookingForm from "@/components/BookingForm";

export default function RentalsPage() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState<RentalItem | null>(null);

  useEffect(() => {
    async function fetchRentals() {
      const res = await fetch("/api/rentals", { cache: "no-store" });
      if (res.ok) {
        setRentals(await res.json());
      }
      setIsLoading(false);
    }
    fetchRentals();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-cream pb-20">
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-serif text-gold mb-4">Event Rentals</h1>
        <p className="text-cream/60 max-w-2xl mx-auto">
          Browse our premium collection of furniture, centerpieces, backdrops, and lighting for your next event.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-20 border border-gold/10 rounded-2xl bg-[#1a1a1a]">
            <p className="text-cream/40 mb-2">No items available for rent right now.</p>
            <p className="text-sm text-cream/30">Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rentals.map((r) => (
              <div key={r.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gold/20 flex flex-col group hover:border-gold/50 transition-colors">
                <div className="relative h-60 overflow-hidden">
                  <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => (e.currentTarget.src = "/images/placeholder.jpg")} />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-sm font-semibold border border-gold/30">
                    ${r.price}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gold mb-2">{r.category}</span>
                  <h3 className="font-serif text-xl mb-2 text-cream">{r.name}</h3>
                  <p className="text-sm text-cream/60 mb-6 flex-1 line-clamp-3">{r.description}</p>
                  
                  <button 
                    onClick={() => setSelectedRental(r)}
                    className="w-full py-2.5 rounded-full border border-gold text-gold font-semibold hover:bg-gold hover:text-charcoal transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRental && (
        <BookingForm rentalItem={selectedRental} onClose={() => setSelectedRental(null)} />
      )}
    </div>
  );
}
