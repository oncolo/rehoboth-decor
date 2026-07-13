"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { RentalItem } from "@/lib/db";

export default function RentalsAdmin() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("furniture");
  
  // Image states
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    fetchRentals();
  }, []);

  async function fetchRentals() {
    setIsLoading(true);
    const res = await fetch("/api/rentals", { cache: "no-store" });
    if (res.ok) {
      setRentals(await res.json());
    }
    setIsLoading(false);
  }

  async function addRental(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalUrl = urlInput;

      // 1. Handle image upload if 'file' method selected
      if (uploadMethod === "file") {
        if (!imageFile) {
          alert("Please select an image file.");
          setIsSubmitting(false);
          return;
        }
        
        const formData = new FormData();
        formData.append("file", imageFile);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const { url } = await uploadRes.json();
        finalUrl = url;
      } else {
        if (!finalUrl.trim()) {
          alert("Please enter an image URL.");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Create rental item
      const res = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: Number(price), imageUrl: finalUrl, category }),
      });

      if (res.ok) {
        setName(""); setDescription(""); setPrice(""); setImageFile(null); setUrlInput("");
        const fileInput = document.getElementById("image-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        
        fetchRentals();
      } else {
        alert("Failed to add rental item.");
      }
    } catch (error) {
      alert("An error occurred during upload or saving.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteRental(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/rentals/${id}`, { method: "DELETE" });
    if (res.ok) fetchRentals();
  }

  async function updatePrice(id: string, newPrice: string) {
    const res = await fetch(`/api/rentals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: Number(newPrice) }),
    });
    if (res.ok) fetchRentals();
  }

  return (
    <AdminShell>
      <h1 className="font-serif text-3xl text-gold mb-6">Rental Items Management</h1>

      <form onSubmit={addRental} className="bg-[#1a1a1a] border border-gold/20 rounded-xl p-5 mb-8 space-y-3">
        <h2 className="text-lg font-semibold text-cream mb-4">Add New Item</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Item Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Gold Chiavari Chair" required
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Price ($)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 50" type="number" required
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
        </div>

        {/* Toggle Upload Method */}
        <div className="mt-2">
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2 text-sm text-cream cursor-pointer">
              <input type="radio" checked={uploadMethod === "file"} onChange={() => setUploadMethod("file")} className="accent-gold" />
              Upload File
            </label>
            <label className="flex items-center gap-2 text-sm text-cream cursor-pointer">
              <input type="radio" checked={uploadMethod === "url"} onChange={() => setUploadMethod("url")} className="accent-gold" />
              Paste Image URL
            </label>
          </div>

          {uploadMethod === "file" ? (
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              onChange={e => setImageFile(e.target.files?.[0] || null)} 
              required
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2 text-cream text-sm focus:outline-none focus:border-gold file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gold/20 file:text-gold hover:file:bg-gold/30 cursor-pointer" 
            />
          ) : (
            <input 
              value={urlInput} 
              onChange={e => setUrlInput(e.target.value)} 
              placeholder="e.g. https://example.com/chair.jpg" 
              required
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" 
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description"
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold">
              <option value="furniture">Furniture (Chairs/Tables)</option>
              <option value="centerpiece">Centerpieces</option>
              <option value="backdrop">Backdrops</option>
              <option value="lighting">Lighting</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <button disabled={isSubmitting} type="submit" className="w-full bg-gold text-charcoal font-semibold py-2.5 rounded-full text-sm hover:bg-gold/80 transition-colors mt-2 disabled:opacity-50">
          {isSubmitting ? "Uploading & Saving..." : "+ Add Rental Item"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-cream/50 text-center py-10">Loading...</p>
      ) : rentals.length === 0 ? (
        <div className="text-center py-16 text-cream/30">
          <p className="text-4xl mb-3">🪑</p>
          <p className="text-sm">No rental items found. Add one above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rentals.map((r) => (
            <div key={r.id} className="relative group rounded-xl overflow-hidden border border-gold/20 bg-[#1a1a1a] flex flex-col">
              <img src={r.imageUrl} alt={r.name} className="w-full h-48 object-cover" onError={e => (e.currentTarget.src = "/images/placeholder.jpg")} />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-cream leading-tight">{r.name}</p>
                  <p className="text-gold font-serif whitespace-nowrap ml-2">${r.price}</p>
                </div>
                <p className="text-cream/60 text-xs mb-3 flex-1">{r.description}</p>
                
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-3 border-t border-gold/10">
                  <span className="text-xs text-cream/40 capitalize">{r.category}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <button onClick={() => {
                      const newPrice = prompt("Enter new price:", r.price.toString());
                      if (newPrice) updatePrice(r.id, newPrice);
                    }} className="text-xs text-cream/50 hover:text-gold px-2 py-1 border border-gold/20 rounded">
                      Edit Price
                    </button>
                    <button onClick={() => deleteRental(r.id)}
                      className="text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-red-400/20 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
