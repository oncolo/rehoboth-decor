"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const res = await fetch("/api/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newUsername, newPassword })
    });

    if (res.ok) {
      setStatus("success");
      setCurrentPassword("");
      setNewUsername("");
      setNewPassword("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      const data = await res.json();
      setErrorMessage(data.error || "Update failed");
      setStatus("error");
    }
  }

  return (
    <AdminShell>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl text-gold mb-6">Security Settings</h1>
        
        <div className="bg-[#1a1a1a] border border-gold/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl text-cream font-medium mb-2">Change Credentials</h2>
          <p className="text-cream/40 text-sm mb-6">Update your admin username and password here. You must provide your current password to make changes.</p>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs text-cream/50 mb-1.5 uppercase tracking-wider">Current Password <span className="text-red-400">*</span></label>
              <input required type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/60" />
            </div>
            
            <hr className="border-gold/10 my-6" />

            <div>
              <label className="block text-xs text-cream/50 mb-1.5 uppercase tracking-wider">New Username</label>
              <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Leave blank to keep current"
                className="w-full bg-[#0d0d0d] border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/60" />
            </div>
            
            <div>
              <label className="block text-xs text-cream/50 mb-1.5 uppercase tracking-wider">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Leave blank to keep current"
                className="w-full bg-[#0d0d0d] border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/60" />
            </div>

            {status === "error" && (
              <div className="bg-red-400/10 border border-red-400/20 text-red-400 text-sm p-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            {status === "success" && (
              <div className="bg-green-400/10 border border-green-400/20 text-green-400 text-sm p-3 rounded-lg">
                Credentials updated successfully!
              </div>
            )}

            <button disabled={status === "submitting" || !currentPassword} type="submit"
              className="bg-gold text-charcoal font-semibold py-3 px-6 rounded-xl hover:bg-gold/90 transition-all disabled:opacity-50 mt-4">
              {status === "submitting" ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>

        <BudgetSettings />
      </div>
    </AdminShell>
  );
}

function BudgetSettings() {
  const [budgets, setBudgets] = useState<string[]>([]);
  const [newBudget, setNewBudget] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings?key=budget_ranges", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setBudgets(data);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  async function saveBudgets(updatedBudgets: string[]) {
    setIsSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "budget_ranges", value: updatedBudgets })
      });
      if (res.ok) {
        setBudgets(updatedBudgets);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    }
    setIsSaving(false);
  }

  function addBudget() {
    if (!newBudget.trim()) return;
    saveBudgets([...budgets, newBudget.trim()]);
    setNewBudget("");
  }

  function removeBudget(index: number) {
    const updated = budgets.filter((_, i) => i !== index);
    saveBudgets(updated);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gold/10 rounded-2xl p-6 sm:p-8 mt-8">
      <h2 className="text-xl text-cream font-medium mb-2">Budget Ranges</h2>
      <p className="text-cream/40 text-sm mb-6">Manage the budget options that appear in the public booking form.</p>

      {isLoading ? (
        <p className="text-cream/50 text-sm py-4">Loading...</p>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-2">
            {budgets.map((b, i) => (
              <li key={i} className="flex items-center justify-between bg-[#0d0d0d] border border-white/5 rounded-lg px-4 py-3">
                <span className="text-cream text-sm">{b}</span>
                <button 
                  onClick={() => removeBudget(i)}
                  disabled={isSaving}
                  className="text-red-400 hover:text-red-300 text-xs px-2 py-1 disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <input 
              type="text"
              value={newBudget}
              onChange={e => setNewBudget(e.target.value)}
              placeholder="e.g. $15,000 - $20,000"
              className="flex-1 bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold"
              onKeyDown={e => e.key === "Enter" && addBudget()}
            />
            <button 
              onClick={addBudget}
              disabled={isSaving || !newBudget.trim()}
              className="bg-gold text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </div>

          {status === "success" && <p className="text-green-400 text-xs pt-2">Saved successfully!</p>}
          {status === "error" && <p className="text-red-400 text-xs pt-2">Failed to save. Try again.</p>}
        </div>
      )}
    </div>
  );
}
