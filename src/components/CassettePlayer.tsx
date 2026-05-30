"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Web Audio Ambient Synthesizer Class
class LofiSynth {
  ctx: AudioContext | null = null;
  chords = [
    [130.81, 164.81, 196.00, 246.94], // Cmaj7
    [110.00, 138.59, 164.81, 220.00], // A7
    [87.31, 110.00, 130.81, 174.61],  // Fmaj7
    [98.00, 123.47, 146.83, 196.00],  // G7
  ];
  currentChordIdx = 0;
  isPlaying = false;
  nodes: { oscs: OscillatorNode[]; gain: GainNode; filter: BiquadFilterNode; noise?: AudioWorkletNode | OscillatorNode } = { oscs: [], gain: {} as GainNode, filter: {} as BiquadFilterNode };
  analyser: AnalyserNode | null = null;
  timerId: any = null;

  constructor() {}

  start(analyserNode: AnalyserNode) {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = analyserNode;
      
      // Main output nodes
      const mainGain = this.ctx.createGain();
      mainGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      filter.connect(mainGain);
      mainGain.connect(this.ctx.destination);
      mainGain.connect(this.analyser);

      this.nodes.gain = mainGain;
      this.nodes.filter = filter;
      this.isPlaying = true;

      // Start Vinyl Crackle Noise
      this.startCrackle();

      // Start Chord Progression Loop
      const playNextChord = () => {
        if (!this.isPlaying || !this.ctx) return;
        this.playChord(this.chords[this.currentChordIdx]!);
        this.currentChordIdx = (this.currentChordIdx + 1) % this.chords.length;
        this.timerId = setTimeout(playNextChord, 4500);
      };
      playNextChord();
    } catch (e) {
      console.warn("Could not start Web Audio Synth: ", e);
    }
  }

  playChord(frequencies: number[]) {
    if (!this.ctx || !this.nodes.filter) return;

    // Fade out previous oscillators
    this.nodes.oscs.forEach(osc => {
      try {
        osc.stop(this.ctx!.currentTime + 0.5);
      } catch (e) {}
    });
    this.nodes.oscs = [];

    const now = this.ctx.currentTime;
    
    frequencies.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = "triangle"; // cozy warm sound
      osc.frequency.setValueAtTime(freq, now);

      // slow attack, long release
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.25, now + 1.2);
      oscGain.gain.setValueAtTime(0.25, now + 3.8);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 4.4);

      osc.connect(oscGain);
      oscGain.connect(this.nodes.filter);
      
      osc.start(now);
      osc.stop(now + 4.5);
      this.nodes.oscs.push(osc);
    });
  }

  startCrackle() {
    if (!this.ctx || !this.nodes.gain) return;
    try {
      // Simulate crackle using a low-frequency oscillator and filtered noise
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 3.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.008; // very subtle crackle background

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.nodes.gain);

      whiteNoise.start();
    } catch (e) {
      console.warn("Vinyl crackle generation failed", e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) clearTimeout(this.timerId);
    
    this.nodes.oscs.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.nodes.oscs = [];

    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEjected, setIsEjected] = useState(false);
  
  const analyserRef = useRef<AnalyserNode | null>(null);
  const synthRef = useRef<LofiSynth | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);

  // Setup visualizer canvas loop
  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(120, 113, 108, 0.4)"; // dark gray stroke
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const bufferLength = analyserRef.current?.frequencyBinCount || 64;
    const dataArray = new Uint8Array(bufferLength);

    if (analyserRef.current && isPlaying) {
      analyserRef.current.getByteTimeDomainData(dataArray);
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i]! / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
    } else {
      // Draw standard simulated flat line with tiny mechanical wobble
      const waveOffset = Date.now() * 0.004;
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x++) {
        const wobble = Math.sin(x * 0.05 + waveOffset) * (isPlaying ? 5 : 0.8);
        ctx.lineTo(x, height / 2 + wobble);
      }
    }

    ctx.stroke();
    animationRef.current = requestAnimationFrame(drawVisualizer);
  }, [isPlaying]);

  // Handle play/pause toggle
  const togglePlay = useCallback(() => {
    if (isEjected) return;

    if (isPlaying) {
      synthRef.current?.stop();
      setIsPlaying(false);
    } else {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 128;
        }
      }

      if (!synthRef.current) {
        synthRef.current = new LofiSynth();
      }

      if (analyserRef.current) {
        synthRef.current.start(analyserRef.current);
        setIsPlaying(true);
      }
    }
  }, [isPlaying, isEjected]);

  const toggleEject = useCallback(() => {
    if (isPlaying) {
      synthRef.current?.stop();
      setIsPlaying(false);
    }
    setIsEjected(prev => !prev);
  }, [isPlaying]);

  // Trigger canvas drawing loop on mount
  useEffect(() => {
    animationRef.current = requestAnimationFrame(drawVisualizer);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      synthRef.current?.stop();
    };
  }, [drawVisualizer]);

  return (
    <div
      className="relative w-[210px] bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:rotate-0 hover:scale-105 z-30 select-none cursor-default"
      style={{
        boxShadow: "0 10px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
        background: "linear-gradient(150deg, var(--color-card) 0%, var(--color-base) 100%)"
      }}
    >
      {/* Tape label header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[8px] text-stone-400 dark:text-stone-500 font-bold tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          COZY.TAPE / v2.0
        </span>
        <span className="text-[8px] text-stone-600 dark:text-stone-300 bg-stone-200/50 dark:bg-stone-800/80 px-1.5 py-0.5 rounded font-mono">
          SIDE A
        </span>
      </div>

      {/* skeletal cassette tape graphics */}
      <div
        className="h-20 w-full rounded-lg bg-stone-800 border border-stone-900 flex items-center justify-center relative overflow-hidden transition-all duration-500"
        style={{
          background: isEjected ? "#2A2625" : "linear-gradient(to bottom, #1E1C1A, #121110)",
          boxShadow: "inset 0 4px 10px rgba(0,0,0,0.8)",
        }}
      >
        {!isEjected ? (
          <>
            {/* Left Reel wheel */}
            <div className="absolute left-[38px] top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                className={`text-stone-700 transition-all ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
                fill="currentColor"
              >
                <circle cx="17" cy="17" r="15" fill="#3E3A39" stroke="#1E1C1A" strokeWidth="1.5" />
                <path d="M17 5 L17 12 M17 22 L17 29 M5 17 L12 17 M22 17 L29 17 M8.5 8.5 L13.5 13.5 M20.5 20.5 L25.5 25.5 M8.5 25.5 L13.5 20.5 M20.5 13.5 L25.5 8.5" stroke="#78716C" strokeWidth="1.5" />
                <circle cx="17" cy="17" r="5" fill="#1C1917" />
              </svg>
            </div>

            {/* Right Reel wheel */}
            <div className="absolute right-[38px] top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                className={`text-stone-700 transition-all ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
                fill="currentColor"
              >
                <circle cx="17" cy="17" r="15" fill="#3E3A39" stroke="#1E1C1A" strokeWidth="1.5" />
                <path d="M17 5 L17 12 M17 22 L17 29 M5 17 L12 17 M22 17 L29 17 M8.5 8.5 L13.5 13.5 M20.5 20.5 L25.5 25.5 M8.5 25.5 L13.5 20.5 M20.5 13.5 L25.5 8.5" stroke="#78716C" strokeWidth="1.5" />
                <circle cx="17" cy="17" r="5" fill="#1C1917" />
              </svg>
            </div>

            {/* Central tape window */}
            <div className="absolute w-[65px] h-[22px] bg-stone-900/60 rounded-md border border-stone-800/80 flex items-center justify-center z-10">
              <span className="text-[7px] text-amber-500/50 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                {isPlaying ? "PLAY" : "PAUSE"}
              </span>
            </div>

            {/* Simulated brown magnetic tape spool */}
            <div
              className="absolute left-[38px] right-[38px] top-1/2 -translate-y-1/2 h-[26px] bg-[#5C4033] rounded-full z-0 opacity-40 filter blur-[0.4px] transition-all"
              style={{
                transform: `translateY(-50%) scaleX(${isPlaying ? 1.05 : 1})`
              }}
            />
          </>
        ) : (
          <span className="text-[10px] text-stone-500 dark:text-stone-400 tracking-wider uppercase font-bold text-center p-4 leading-normal" style={{ fontFamily: "var(--font-mono)" }}>
            [ Tape Ejected ]
          </span>
        )}
      </div>

      {/* Visualizer output on paper texture */}
      <div className="mt-3 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-850 rounded-md p-1.5 h-7 relative flex items-center overflow-hidden">
        <canvas ref={canvasRef} width="180" height="24" className="w-full h-full opacity-70" />
      </div>

      {/* Button deck controls */}
      <div className="grid grid-cols-3 gap-1.5 mt-3">
        <button
          onClick={togglePlay}
          disabled={isEjected}
          className={`py-2 px-1 rounded-lg border text-[10px] font-bold tracking-widest flex items-center justify-center transition-all ${
            isEjected
              ? "opacity-30 bg-stone-100 dark:bg-stone-850 text-stone-400 dark:text-stone-555 border-stone-200 dark:border-stone-800 cursor-not-allowed"
              : isPlaying
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 shadow-sm active:scale-95 cursor-pointer"
                : "bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 shadow-inner active:scale-95 cursor-pointer"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
          data-cursor="link"
          data-cursor-label={isPlaying ? "pause audio" : "play lofi"}
        >
          {isPlaying ? "PAUSE" : "PLAY"}
        </button>

        <button
          onClick={() => {
            if (isPlaying) {
              synthRef.current?.stop();
              setIsPlaying(false);
            }
          }}
          disabled={isEjected || !isPlaying}
          className={`py-2 px-1 rounded-lg border text-[10px] font-bold tracking-widest flex items-center justify-center transition-all ${
            isEjected || !isPlaying
              ? "opacity-30 bg-stone-100 dark:bg-stone-850 text-stone-400 dark:text-stone-555 border-stone-200 dark:border-stone-800 cursor-not-allowed"
              : "bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 shadow-inner active:scale-95 cursor-pointer"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          STOP
        </button>

        <button
          onClick={toggleEject}
          className={`py-2 px-1 rounded-lg border text-[10px] font-bold tracking-widest flex items-center justify-center transition-all bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 shadow-inner active:scale-95 cursor-pointer`}
          style={{ fontFamily: "var(--font-mono)" }}
          data-cursor="link"
          data-cursor-label={isEjected ? "load tape" : "eject tape"}
        >
          {isEjected ? "LOAD" : "EJECT"}
        </button>
      </div>
    </div>
  );
}
