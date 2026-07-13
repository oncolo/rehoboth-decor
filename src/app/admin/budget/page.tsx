"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

interface BudgetState {
  weddings: number;
  babyShowers: number;
  birthdays: number;
  graduations: number;
  holidays: number;
}

const labels: Record<keyof BudgetState, string> = {
  weddings: "Weddings",
  babyShowers: "Baby Showers",
  birthdays: "Birthdays",
  graduations: "Graduations",
  holidays: "Cultural / Holidays",
};

const defaults: BudgetState = {
  weddings: 2500,
  babyShowers: 800,
  birthdays: 600,
  graduations: 750,
  holidays: 1200,
};

export default function BudgetManager() {
  const [prices, setPrices] = useState<BudgetState>(defaults);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/settings?key=service_prices", { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setPrices({ ...defaults, ...data });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  function handleChange(key: keyof BudgetState, value: string) {
    setPrices(prev => ({ ...prev, [key]: Math.max(0, Number(value)) }));
  }

  async function handleSave() {
    setIsSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "service_prices", value: prices }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl text-gold">Budget Configurator</h1>
            <p className="text-cream/40 text-sm mt-1">Set starting prices for each service type</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="bg-gold text-charcoal px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gold/80 transition-colors disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Update Prices"}
          </button>
        </div>

        {status === "success" && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold">
            ✓ Prices updated successfully!
          </div>
        )}
        {status === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold">
            ✗ Failed to save. Please try again.
          </div>
        )}

        {isLoading ? (
          <p className="text-cream/40 text-sm">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(Object.keys(prices) as (keyof BudgetState)[]).map(key => (
              <div key={key} className="bg-[#1a1a1a] border border-gold/20 rounded-xl p-5 hover:border-gold/40 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-cream">{labels[key]}</label>
                  <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded-full font-mono">USD ($)</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 font-bold">$</span>
                  <input
                    type="number"
                    value={prices[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#0d0d0d] border border-gold/20 rounded-lg text-cream font-mono text-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
