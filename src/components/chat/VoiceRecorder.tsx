"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import AudioPlayer from "./AudioPlayer";

const Mic = ({ size = 20 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>);
const Square = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>);
const Trash2 = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>);
const Send = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>);

interface Props {
  onSend: (blob: Blob, waveform: number[]) => void;
}

export default function VoiceRecorder({ onSend }: Props) {
  const t = useTranslations("voice");
  const [state, setState] = useState<"idle" | "recording" | "review">("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragX, setDragX] = useState(0);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveDataRef = useRef<number[]>([]);
  const dragStartRef = useRef<number | null>(null);

  const stopTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const stopAnimation = () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };

  const captureWave = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    waveDataRef.current = [...waveDataRef.current.slice(-60), data[0] / 255];
    animFrameRef.current = requestAnimationFrame(captureWave);
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/ogg";
      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      waveDataRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: mimeType }));
        setWaveform([...waveDataRef.current]);
        setState("review");
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start(100);
      mediaRef.current = recorder;
      setState("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      captureWave();
    } catch (err: unknown) {
      const name = err instanceof Error ? err.name : "";
      setError(name === "NotFoundError" ? "No microphone found." : t("permission_denied"));
    }
  };

  const stopRecording = () => { stopTimer(); stopAnimation(); mediaRef.current?.stop(); };
  const deleteRecording = () => { setAudioBlob(null); setWaveform([]); setSeconds(0); setState("idle"); };
  const sendRecording = () => { if (audioBlob) { onSend(audioBlob, waveform); deleteRecording(); } };

  const onTouchStart = (e: React.TouchEvent) => { dragStartRef.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStartRef.current === null) return;
    const dx = e.touches[0].clientX - dragStartRef.current;
    if (dx < 0) setDragX(dx);
  };
  const onTouchEnd = () => {
    if (dragX < -80) { stopRecording(); deleteRecording(); }
    setDragX(0);
    dragStartRef.current = null;
  };

  useEffect(() => () => { stopTimer(); stopAnimation(); }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (state === "review" && audioBlob) {
    return (
      <div className="flex items-center gap-2 w-full px-2">
        <button onClick={deleteRecording} className="text-red-400 hover:text-red-300 flex-shrink-0"><Trash2 size={18} /></button>
        <div className="flex-1"><AudioPlayer blob={audioBlob} waveform={waveform} /></div>
        <button onClick={sendRecording} className="bg-gold text-charcoal rounded-full p-2 hover:bg-gold/80 flex-shrink-0" style={{ color: "#1a1a1a" }}><Send size={16} /></button>
      </div>
    );
  }

  if (state === "recording") {
    return (
      <div
        className="flex items-center gap-3 w-full px-2 select-none"
        style={{ transform: `translateX(${dragX}px)`, transition: dragX === 0 ? "transform 0.3s" : "none" }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <div className="relative flex-shrink-0">
          <span className="absolute inset-0 rounded-full animate-ping bg-red-500/30" />
          <button onClick={stopRecording} className="relative z-10 bg-red-500 rounded-full p-2 text-white"><Square size={16} /></button>
        </div>
        <span className="text-red-400 text-xs font-mono font-semibold">{fmt(seconds)}</span>
        <span className="text-cream/50 text-xs flex-1">{t("recording_status")}</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-1">
      {error && (
        <div className="absolute bottom-full mb-2 right-0 bg-charcoal border border-red-500/40 text-red-400 text-xs rounded-xl px-3 py-2 max-w-[220px] shadow-lg z-10">
          <p className="font-semibold mb-1">{error}</p>
          <p className="text-cream/50 leading-snug">Settings → Site permissions → Microphone → Allow</p>
        </div>
      )}
      <button onClick={() => { setError(null); startRecording(); }} title={t("mic_tooltip")} className="p-2 rounded-full hover:bg-gold/10 text-gold transition-colors">
        <Mic size={20} />
      </button>
    </div>
  );
}

