"use client";

import { useEffect, useRef, useState } from "react";

const Play = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>);
const Pause = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>);

const GOLD = "#D4AF37";
// shttet
interface Props {
  blob: Blob;
  waveform: number[];
}

export default function AudioPlayer({ blob, waveform }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const urlRef = useRef<string>("");

  useEffect(() => {
    urlRef.current = URL.createObjectURL(blob);
    const audio = new Audio(urlRef.current);
    audioRef.current = audio;
    audio.ontimeupdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.onended = () => { setPlaying(false); setProgress(0); };
    return () => { audio.pause(); URL.revokeObjectURL(urlRef.current); };
  }, [blob]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const bars = waveform.length || 30;
    const barW = W / bars - 1;
    ctx.clearRect(0, 0, W, H);
    (waveform.length ? waveform : Array.from({ length: 30 }, () => 0.3 + Math.random() * 0.4)).forEach((v, i) => {
      ctx.fillStyle = i / bars < progress ? GOLD : `${GOLD}55`;
      const h = Math.max(3, v * H);
      ctx.beginPath();
      ctx.roundRect(i * (barW + 1), (H - h) / 2, barW, h, 2);
      ctx.fill();
    });
  }, [waveform, progress]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <button onClick={toggle} className="text-gold flex-shrink-0 hover:opacity-80">
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <canvas ref={canvasRef} width={160} height={32} className="flex-1" />
    </div>
  );
}

