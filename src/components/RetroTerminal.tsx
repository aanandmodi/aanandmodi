"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { prompt: "whoami", output: "AI/ML Engineer · Full Stack Dev · Researcher" },
  { prompt: "cat motto.txt", output: '"Ship it, then iterate."' },
  { prompt: "ls ~/wins/", output: "2× national hackathon 🏆  published research 📄" },
];

type LogLine = {
  type: "input" | "output";
  text: string;
};

// performant Matrix Canvas component
const MatrixRain = React.memo(function MatrixRain({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const w = parent?.clientWidth || 360;
    const h = parent?.clientHeight || 200;
    canvas.width = w;
    canvas.height = h;

    const fontSize = 11;
    const columns = Math.floor(w / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#&λ∞Σπ";

    let frameId = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(28, 25, 23, 0.15)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#10b981"; // emerald-500
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]!;
        ctx.fillText(char, i * fontSize, drops[i]! * fontSize);

        if (drops[i]! * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    const handleKey = () => {
      onExit();
    };
    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("click", handleKey);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("click", handleKey);
    };
  }, [onExit]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-b-xl z-20 cursor-pointer" />;
});

export function RetroTerminal() {
  const [display, setDisplay] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Interactive Terminal States
  const [isInteractive, setIsInteractive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState<LogLine[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-typing animation on mount
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delayTime = 3000;

    terminalLines.forEach((line, lineIdx) => {
      const fullPrompt = `$ ${line.prompt}`;
      for (let c = 1; c <= fullPrompt.length; c++) {
        timeouts.push(
          setTimeout(() => {
            setDisplay((prev) => {
              const next = [...prev];
              next[lineIdx * 2] = fullPrompt.slice(0, c);
              return next;
            });
          }, delayTime)
        );
        delayTime += 35;
      }
      delayTime += 300;
      timeouts.push(
        setTimeout(() => {
          setDisplay((prev) => {
            const next = [...prev];
            next[lineIdx * 2 + 1] = line.output;
            return next;
          });
        }, delayTime)
      );
      delayTime += 400;
    });

    timeouts.push(
      setTimeout(() => {
        setIsInteractive(true);
        setHistory([
          { type: "output", text: "Interactive terminal initialized." },
          { type: "output", text: "Type 'help' for available commands." },
        ]);
      }, delayTime)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const executeCommand = useCallback((cmdStr: string) => {
    const clean = cmdStr.trim().toLowerCase();
    const newLogs: LogLine[] = [{ type: "input", text: cmdStr }];

    if (clean === "help") {
      newLogs.push(
        { type: "output", text: "Available commands:" },
        { type: "output", text: "  help       - show this menu" },
        { type: "output", text: "  about      - output short bio summary" },
        { type: "output", text: "  skills     - list programming expertise" },
        { type: "output", text: "  neofetch   - show system properties (ASCII)" },
        { type: "output", text: "  matrix     - enter the digital rain matrix screen" },
        { type: "output", text: "  cat secrets.txt - view developer logs" },
        { type: "output", text: "  clear      - clear terminal window" }
      );
    } else if (clean === "about") {
      newLogs.push(
        { type: "output", text: "Aanand Modi | Computer Engineering @ Ahmedabad" },
        { type: "output", text: "AI/ML Engineer & Full Stack developer specializing in RAG," },
        { type: "output", text: "multi-agent orchestration (LangGraph), and real-world pipelines." }
      );
    } else if (clean === "skills") {
      newLogs.push(
        { type: "output", text: "Languages : Python, TypeScript, Java, Dart" },
        { type: "output", text: "Frameworks : LangGraph, React, Next.js, FastAPI, Flutter" },
        { type: "output", text: "Cloud/Ops : Docker, Firebase, AWS, GCP, Linux" }
      );
    } else if (clean === "clear") {
      setHistory([]);
      return;
    } else if (clean === "neofetch") {
      newLogs.push(
        { type: "output", text: "   /\\_/\\      user@modi-dev" },
        { type: "output", text: "  ( o.o )     ------------" },
        { type: "output", text: "   > ^ <      OS: Human / CE Student" },
        { type: "output", text: "              CPU: Brainrot Engine v2.6" },
        { type: "output", text: "              RAM: Coffee (6/8 cups)" },
        { type: "output", text: "              Uptime: Locked in fr fr" }
      );
    } else if (clean === "matrix") {
      setShowMatrix(true);
      return;
    } else if (clean === "cat secrets.txt") {
      newLogs.push(
        { type: "output", text: "🔐 Developer logs unlocked:" },
        { type: "output", text: "  - Shipped autonomous hiring pipelines at 4AM." },
        { type: "output", text: "  - 2× national hackathon podiums. Always Team Apex." },
        { type: "output", text: "  - Code compile works 100% of the time, except when being graded." }
      );
    } else if (clean !== "") {
      newLogs.push({ type: "output", text: `zsh: command not found: ${clean}` });
    }

    setHistory((prev) => [...prev, ...newLogs]);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(userInput);
      setUserInput("");
    }
  };

  const focusInput = () => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  const autoTypingDone = display.length > 0 && display[terminalLines.length * 2 - 1] !== undefined;

  // Scroll to bottom of terminal body on change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, userInput, autoTypingDone]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ rotate: 2 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 150, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
      className={`w-[360px] cursor-grab active:cursor-grabbing ${isDragging ? "" : "transition-transform duration-300 hover:scale-[1.03]"}`}
      style={{ zIndex: isDragging ? 150 : 20, touchAction: "none", willChange: "transform" }}
      onMouseEnter={() => autoTypingDone && !isDragging && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          background: "#1c1917",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* macOS title bar — DRAG HANDLE */}
        <div
          className="flex items-center justify-between px-3.5 py-2.5"
          style={{
            background: "linear-gradient(to bottom, #292524, #1c1917)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-[7px]">
            <div className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E0443E]/70" />
            <div className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] border border-[#DEA123]/70" />
            <div className="w-[12px] h-[12px] rounded-full bg-[#28C840] border border-[#1AAB29]/70" />
          </div>
          <span className="text-[10px] text-stone-500 select-none tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
            aanand@dev ~ zsh {isFocused && isInteractive ? "• active" : ""}
          </span>
          <div className="flex gap-[3px] opacity-30" title="Drag me!">
            <div className="grid grid-cols-2 gap-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[2px] h-[2px] rounded-full bg-stone-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={bodyRef}
          onClick={focusInput}
          className="w-full p-4 overflow-y-auto relative cursor-text select-text"
          style={{ fontFamily: "var(--font-mono)", height: "200px" }}
        >
          {/* Hidden Input field to handle typing */}
          {isInteractive && (
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => setIsFocused(false)}
              className="absolute opacity-0 pointer-events-none w-0 h-0"
              aria-label="Terminal input"
            />
          )}

          {/* Matrix Digital Rain Overlay */}
          {showMatrix && <MatrixRain onExit={() => setShowMatrix(false)} />}

          {/* Auto-typing text */}
          {!isInteractive &&
            terminalLines.map((line, i) => (
              <div key={i} className="mb-1 text-[11px] leading-[1.6]">
                {display[i * 2] !== undefined && (
                  <div>
                    <span className="text-emerald-400/80">❯</span> <span className="text-stone-300">{display[i * 2]}</span>
                    {display[i * 2 + 1] === undefined && (
                      <span
                        className="inline-block w-[7px] h-[13px] bg-amber-400/70 ml-[2px] align-text-bottom rounded-[1px]"
                        style={{ animation: "cursor-blink 1s step-end infinite" }}
                      />
                    )}
                  </div>
                )}
                {display[i * 2 + 1] !== undefined && (
                  <div className="text-[11px] text-stone-500 mb-1.5 leading-[1.6]">{display[i * 2 + 1]}</div>
                )}
              </div>
            ))}

          {/* Interactive Shell Log History */}
          {isInteractive && (
            <div className="text-[11px]">
              {history.map((line, i) => (
                <div key={i} className="mb-1 leading-[1.6]">
                  {line.type === "input" ? (
                    <div>
                      <span className="text-emerald-400/80">❯</span>{" "}
                      <span className="text-stone-200">{line.text}</span>
                    </div>
                  ) : (
                    <div className="text-stone-400 whitespace-pre-wrap">{line.text}</div>
                  )}
                </div>
              ))}

              {/* Active command line typing */}
              <div className="flex items-center gap-1.5 leading-[1.6]">
                <span className="text-emerald-400/80">❯</span>
                <span className="text-stone-200 whitespace-pre">{userInput}</span>
                <span
                  className={`inline-block w-[7px] h-[13px] rounded-[1px] ${
                    isFocused ? "bg-emerald-400/85 animate-pulse" : "bg-stone-500/50"
                  }`}
                  style={{ animation: isFocused ? "" : "cursor-blink 1s step-end infinite" }}
                />
              </div>
            </div>
          )}

          {/* Easter egg cat (only if interactive and mouse hover) */}
          {hovered && autoTypingDone && !showMatrix && (
            <div className="absolute right-3 bottom-3 opacity-80 pointer-events-none">
              <img src="/cat-dance.gif" alt="Dancing cat" className="h-[55px] rounded" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
