'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';

interface VoiceNote {
  id: string;
  name: string;
  message: string;
  audioUrl?: string;
  receivedAt: string;
  read: boolean;
}

export default function VoiceNotesPage() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem('voice_notes') || '[]'));
  }, []);

  function markRead(id: string) {
    const updated = notes.map(n => n.id === id ? { ...n, read: true } : n);
    setNotes(updated);
    localStorage.setItem('voice_notes', JSON.stringify(updated));
  }

  function deleteNote(id: string) {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('voice_notes', JSON.stringify(updated));
  }

  const unread = notes.filter(n => !n.read).length;

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-3xl text-gold">Voice Messages</h1>
          {unread > 0 && (
            <span className="bg-gold text-charcoal text-xs font-bold px-2.5 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-20 text-cream/30">
            <p className="text-5xl mb-4">🎙️</p>
            <p className="text-sm">No voice messages yet. They appear here when customers send them.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...notes].reverse().map(note => (
              <div
                key={note.id}
                className={`bg-[#1a1a1a] border rounded-xl px-5 py-4 transition-colors ${
                  note.read ? 'border-gold/10' : 'border-gold/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-cream">{note.name || 'Anonymous'}</p>
                      {!note.read && (
                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    {note.message && (
                      <p className="text-cream/60 text-sm mb-2">{note.message}</p>
                    )}
                    {note.audioUrl && (
                      <audio
                        controls
                        src={note.audioUrl}
                        onPlay={() => { setPlaying(note.id); markRead(note.id); }}
                        onPause={() => setPlaying(null)}
                        className="w-full max-w-sm h-8 mt-1"
                      />
                    )}
                    <p className="text-cream/30 text-xs mt-2">
                      {new Date(note.receivedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!note.read && (
                      <button
                        onClick={() => markRead(note.id)}
                        className="text-xs text-gold border border-gold/30 px-3 py-1 rounded-full hover:bg-gold/10 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-xs text-red-400 border border-red-400/20 px-2 py-1 rounded-full hover:bg-red-400/10 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
