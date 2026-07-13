"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { 
    href: "/admin", 
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )
  },
  { 
    href: "/admin/bookings", 
    label: "Bookings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
    )
  },
  { 
    href: "/admin/rentals", 
    label: "Rentals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
    )
  },
  { 
    href: "/admin/gallery", 
    label: "Gallery",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    )
  },
  { 
    href: "/admin/calendar", 
    label: "Calendar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
    )
  },
  { 
    href: "/admin/budget", 
    label: "Budget",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    )
  },
  { 
    href: "/admin/voice-notes", 
    label: "Voice Notes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
    )
  },
  { 
    href: "/admin/settings", 
    label: "Settings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    )
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password })
    });

    if (res.ok) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
    } else {
      setError(true);
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  }

  if (authed === null) return null; // hydration guard

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#1a1a1a]/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.jpg" alt="Rehoboth Decor" width={64} height={64} className="rounded-full object-cover border-2 border-gold/30" />
          </div>
          <h1 className="text-gold font-serif text-2xl font-bold text-center mb-1">Rehoboth Decor</h1>
          <p className="text-cream/40 text-sm text-center mb-8">Secure Admin Portal</p>
          
          <form onSubmit={login} className="space-y-4">
            <div>
              <input
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false); }}
                className="w-full bg-[#0d0d0d]/50 border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-cream/20"
              />
            </div>
            <div>
              <input
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                className="w-full bg-[#0d0d0d]/50 border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-cream/20"
              />
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400/80 text-xs mt-2 pl-1">
                  Incorrect username or password
                </motion.p>
              )}
            </div>
            <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-2">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-cream flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gold/10 bg-[#111111]/80 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 flex items-center gap-3">
          <Image src="/images/logo.jpg" alt="Rehoboth Decor" width={36} height={36} className="rounded-full object-cover" />
          <h2 className="text-gold font-serif font-bold text-xl tracking-wide">Rehoboth Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                pathname === l.href 
                  ? "bg-gold/10 text-gold font-medium border border-gold/10" 
                  : "text-cream/50 hover:bg-white/5 hover:text-cream"
              }`}>
              <span className={pathname === l.href ? "text-gold" : "text-cream/40 group-hover:text-cream/70 transition-colors"}>
                {l.icon}
              </span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gold/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 border-r border-gold/10 bg-[#111111]/95 backdrop-blur-xl z-50 flex flex-col shadow-2xl lg:hidden"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.jpg" alt="Rehoboth Decor" width={28} height={28} className="rounded-full object-cover" />
                <h2 className="text-gold font-serif font-bold text-xl">Admin</h2>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-cream/40 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {links.map(l => (
                <Link key={l.href} href={l.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    pathname === l.href 
                      ? "bg-gold/10 text-gold font-medium border border-gold/10" 
                      : "text-cream/50 hover:bg-white/5"
                  }`}>
                  <span className={pathname === l.href ? "text-gold" : "text-cream/40"}>{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gold/10">
              <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-red-400/70 hover:bg-red-400/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-gold/5 bg-[#111111]/40 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-cream/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <h1 className="text-lg font-medium text-cream/90 capitalize">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop()?.replace("-", " ")}
            </h1>
          </div>
          <Link href="/en" className="text-xs text-cream/40 hover:text-gold border border-gold/20 px-3 py-1.5 rounded-full transition-all hover:bg-gold/5 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span className="hidden sm:inline">View Site</span>
          </Link>
        </header>

        <div className="p-4 sm:p-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>

    </div>
  );
}
