"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Photo } from "@/lib/db";

const CATEGORIES = ["Weddings", "Cultural Holidays", "🎓 Graduation", "Corporate", "Other"];

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Weddings");
  const [filter, setFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (res.ok) {
        setPhotos(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function addPhoto(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalUrl = urlInput;

      if (uploadMethod === "file") {
        if (!imageFile) {
          alert("Please select a file.");
          setIsSubmitting(false);
          return;
        }
        const formData = new FormData();
        formData.append("file", imageFile);
        
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        
        const data = await uploadRes.json();
        finalUrl = data.url;
      } else {
        if (!finalUrl.trim()) {
          alert("Please enter an image URL.");
          setIsSubmitting(false);
          return;
        }
      }

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl, caption, category })
      });

      if (res.ok) {
        setCaption(""); 
        setImageFile(null);
        setUrlInput("");
        const fileInput = document.getElementById("gallery-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchPhotos();
      } else {
        alert("Failed to add photo to database.");
      }
    } catch (error) {
      alert("Failed to upload/add photo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deletePhoto(id: number) {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPhotos();
      } else {
        alert("Failed to delete photo");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = filter === "all" ? photos : photos.filter(p => p.category === filter);

  return (
    <AdminShell>
      <h1 className="font-serif text-3xl text-gold mb-6">Gallery Management</h1>

      <form onSubmit={addPhoto} className="bg-[#1a1a1a] border border-gold/20 rounded-xl p-5 mb-8 space-y-3">
        
        {/* Toggle Upload Method */}
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

        <div>
          {uploadMethod === "file" ? (
            <input 
              id="gallery-upload"
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
              placeholder="e.g. https://example.com/photo.jpg" 
              required
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" 
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Caption</label>
            <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption (optional)"
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-cream/50 mb-1 uppercase">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        
        <button disabled={isSubmitting} type="submit" className="w-full bg-gold text-charcoal font-semibold py-2.5 rounded-full text-sm hover:bg-gold/80 transition-colors disabled:opacity-50 mt-2">
          {isSubmitting ? "Processing..." : "+ Add Photo"}
        </button>
      </form>

      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors capitalize ${filter === c ? "bg-gold text-charcoal border-gold" : "border-gold/20 text-cream/50 hover:border-gold/50"}`}>
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-cream/50 text-center py-10">Loading photos...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-cream/30">
          <p className="text-4xl mb-3">🖼️</p>
          <p className="text-sm">No photos yet. Add a photo above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="relative group rounded-xl overflow-hidden border border-gold/10 bg-[#1a1a1a]">
              <img src={p.url} alt={p.caption} className="w-full h-40 object-cover" onError={e => (e.currentTarget.src = "/images/placeholder.jpg")} />
              <div className="p-2">
                <p className="text-cream/60 text-xs truncate">{p.caption || "—"}</p>
                <p className="text-gold/50 text-xs capitalize">{p.category}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => deletePhoto(p.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                  ✕ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
