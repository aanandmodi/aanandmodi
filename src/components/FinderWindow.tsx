"use client";

import React, { useState, useCallback, useRef } from "react";

/* ── Real project data from resume ── */
const projects = [
  {
    id: "hireminds",
    name: "HireMinds AI",
    icon: "🤖",
    iconColor: "#C4622D",
    subtitle: "Autonomous Hiring Orchestrator",
    year: "2025",
    gradient: "linear-gradient(135deg, #C4622D 0%, #D4746E 100%)",
    description: "6-agent autonomous pipeline handling full recruitment lifecycle: resume screening, fraud detection, live coding, AI interviews, and explainable shortlisting. Real-time proctoring with identity verification.",
    tech: ["Python", "FastAPI", "LangGraph", "React", "Docker"],
    achievement: "2nd Runner-Up — CodeVersity, IIT Gandhinagar",
    link: "https://lnkd.in/gPdR7Qwv",
  },
  {
    id: "startupops",
    name: "StartupOps",
    icon: "🚀",
    iconColor: "#5A9E82",
    subtitle: "AI Co-Founder System",
    year: "2026",
    gradient: "linear-gradient(135deg, #5A9E82 0%, #6DBEA0 100%)",
    description: "AI co-founder that provides real-time strategic guidance to early-stage startups — prioritization, pivot decisions, roadmap generation. Operates 24/7 without human intervention.",
    tech: ["Python", "LangGraph", "React", "TypeScript", "Firebase"],
    achievement: "2nd Runner-Up — GDG Autonomous Hackathon 2026",
    link: "#",
  },
  {
    id: "magnetic",
    name: "Magnetic Manuscript",
    icon: "📄",
    iconColor: "#9680C2",
    subtitle: "AI Academic Formatter",
    year: "2026",
    gradient: "linear-gradient(135deg, #9680C2 0%, #B8A4E0 100%)",
    description: "12 specialized LangGraph agents formatting raw research papers to IEEE, Nature, The Lancet standards. Self-healing pipeline auto-reformats when compliance drops below 50%. Includes plagiarism detection.",
    tech: ["Python", "LangGraph", "Python-docx", "Citeproc", "FastAPI", "React"],
    achievement: "HACKaMINeD 2026, Nirma University (1250+ hackers)",
    link: "https://lnkd.in/gwqvZtjq",
  },
  {
    id: "foodinsight",
    name: "Food Insight Scanner",
    icon: "🍎",
    iconColor: "#C9A060",
    subtitle: "Personalized Nutrition AI",
    year: "2025",
    gradient: "linear-gradient(135deg, #C9A060 0%, #E8C97C 100%)",
    description: "Flutter mobile app using Groq AI + OCR to analyze food labels, detect allergens, and suggest healthier alternatives. Personalization engine adapts scores based on medical conditions & dietary preferences.",
    tech: ["Flutter", "Dart", "Groq AI", "Google ML Kit", "Firebase"],
    achievement: "Showcased at Avishkar 2.0, Silver Oak University",
    link: "#",
  },
  {
    id: "bloggazers",
    name: "Bloggazers",
    icon: "✍️",
    iconColor: "#6A9EC0",
    subtitle: "Full Stack Blog Platform",
    year: "2024",
    gradient: "linear-gradient(135deg, #6A9EC0 0%, #8CBEE0 100%)",
    description: "Full-stack blog platform with Google OAuth, nested comment threads, full CRUD operations, and responsive UI. Built with modern web standards.",
    tech: ["React", "TypeScript", "Node.js", "Firebase", "TailwindCSS"],
    achievement: "First major full-stack project",
    link: "#",
  },
];

/* ── Folder icon with perspective tilt on hover ── */
function FolderIcon({
  project,
  isActive,
  onClick,
}: {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 group/folder ${
        isActive ? "bg-stone-100" : "hover:bg-stone-50"
      }`}
      style={{ perspective: "600px" }}
    >
      <div
        className="relative w-[70px] h-[70px] flex items-center justify-center transition-transform duration-300 group-hover/folder:scale-110"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Folder back */}
        <img src="/mac-folder-back-opt.svg" alt="" className="absolute inset-0 w-full h-full" draggable={false} />
        {/* Emoji icon peeks out on hover */}
        <span
          className="absolute text-[22px] transition-all duration-500 opacity-0 group-hover/folder:opacity-100 group-hover/folder:-translate-y-3 z-10"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
        >
          {project.icon}
        </span>
        {/* Folder front */}
        <img
          src="/mac-folder-front-opt.svg"
          alt=""
          className="absolute inset-0 w-full h-full z-20 transition-transform duration-500 origin-bottom group-hover/folder:[transform:rotateX(-18deg)]"
          draggable={false}
        />
      </div>
      <span
        className={`text-[10px] text-center leading-tight transition-colors ${isActive ? "text-stone-800 font-medium" : "text-stone-500"}`}
        style={{ fontFamily: "var(--font-body)", maxWidth: "80px" }}
      >
        {project.name}
      </span>
    </div>
  );
}

export function FinderWindow() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <div className="finder-window overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)" }}>
      {/* macOS chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-200/60 bg-stone-50/80 backdrop-blur-sm">
        <div className="flex gap-[6px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57] hover:scale-125 transition-transform cursor-pointer" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E] hover:scale-125 transition-transform cursor-pointer" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28C840] hover:scale-125 transition-transform cursor-pointer" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[11px] text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>
            ~/aanand/projects
          </span>
        </div>
        <div className="w-[50px]" />
      </div>

      <div className="flex min-h-[480px]">
        {/* Sidebar */}
        <div className="w-[180px] border-r border-stone-200/60 bg-stone-50/40 p-3 hidden lg:block">
          <div className="text-[9px] text-stone-400 uppercase tracking-[0.2em] mb-3 px-2" style={{ fontFamily: "var(--font-mono)" }}>
            Favorites
          </div>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] mb-0.5 transition-all flex items-center gap-2 ${
                activeId === p.id
                  ? "bg-stone-200/60 text-stone-800 font-medium"
                  : "text-stone-500 hover:bg-stone-100/60 hover:text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="text-[14px]">{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Folder grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
              {projects.map((p) => (
                <FolderIcon
                  key={p.id}
                  project={p}
                  isActive={activeId === p.id}
                  onClick={() => setActiveId(p.id)}
                />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="w-full lg:w-[320px] border-t lg:border-t-0 lg:border-l border-stone-200/60 bg-stone-50/30 p-5 flex flex-col">
            {/* Header with gradient */}
            <div className="rounded-xl p-4 mb-4 relative overflow-hidden" style={{ background: active.gradient }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }} />
              <div className="relative z-10">
                <span className="text-[32px]">{active.icon}</span>
                <h3 className="text-white font-bold text-[18px] mt-2 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {active.name}
                </h3>
                <p className="text-white/70 text-[11px] mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  {active.subtitle}
                </p>
              </div>
            </div>

            {/* Year */}
            <div className="text-[9px] text-stone-400 uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              {active.year}
            </div>

            {/* Description */}
            <p className="text-[12px] text-stone-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
              {active.description}
            </p>

            {/* Achievement badge */}
            {active.achievement && (
              <div className="flex items-start gap-2 mb-4 p-2.5 rounded-lg bg-amber-50/60 border border-amber-100/60">
                <span className="text-[14px]">🏆</span>
                <span className="text-[10px] text-amber-800 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {active.achievement}
                </span>
              </div>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {active.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors cursor-default"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Link */}
            {active.link && active.link !== "#" && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#C4622D] hover:text-stone-800 transition-colors underline mt-auto"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                View Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
