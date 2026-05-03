"use client";

import React, { useCallback, useRef, useState } from "react";
import { SectionDoodles } from "./SectionDoodles";
import { InkHighlight } from "./InkHighlight";

const projects = [
  { id: "hireminds", name: "HireMinds AI", icon: "🤖", subtitle: "Autonomous Hiring Orchestrator", year: "2025", color: "#C4622D", thought: "What if we removed humans from hiring entirely? Not the decision — the process.", description: "6-agent autonomous pipeline: resume screening, fraud detection, live coding, AI interviews, and explainable shortlisting. Zero human intervention until final decision.", tech: ["Python", "FastAPI", "LangGraph", "React", "Docker"], achievement: "🏆 2nd Runner-Up — CodeVersity, IIT Gandhinagar", link: "https://lnkd.in/gPdR7Qwv", metrics: ["6 AI Agents", "48hr Build", "Real-time Proctoring"], thumb: "linear-gradient(135deg, #c4622d, #d4835b 50%, #f5d5c2)" },
  { id: "startupops", name: "StartupOps", icon: "🚀", subtitle: "AI Co-Founder System", year: "2026", color: "#5A9E82", thought: "Every first-time founder needs a co-founder who never sleeps and has seen 10,000 pitch decks.", description: "AI co-founder providing real-time strategic guidance — prioritization, pivot decisions, roadmap generation. Operates 24/7 without human intervention.", tech: ["Python", "LangGraph", "React", "TypeScript", "Firebase"], achievement: "🏆 2nd Runner-Up — GDG Autonomous Hackathon 2026", link: "#", metrics: ["24/7 Uptime", "Multi-Agent", "Decision Engine"], thumb: "linear-gradient(135deg, #5a9e82, #84b9a4 50%, #d9efe5)" },
  { id: "magnetic", name: "Magnetic Manuscript", icon: "📄", subtitle: "AI Academic Formatter", year: "2026", color: "#9680C2", thought: "Formatting a paper to IEEE standards took me 6 hours. An AI should do it in 6 seconds.", description: "12 specialized LangGraph agents formatting research papers to IEEE, Nature, The Lancet standards. Self-healing pipeline auto-reformats when compliance drops below 50%.", tech: ["Python", "LangGraph", "Python-docx", "Citeproc", "FastAPI"], achievement: "🏁 HACKaMINeD 2026, Nirma University (1250+ hackers)", link: "https://lnkd.in/gwqvZtjq", metrics: ["12 AI Agents", "5 Journal Formats", "Auto-heal"], thumb: "linear-gradient(135deg, #9680c2, #b19cd8 50%, #ece6fa)" },
  { id: "foodinsight", name: "Food Insight Scanner", icon: "🍎", subtitle: "Personalized Nutrition AI", year: "2025", color: "#C9A060", thought: "My diabetic grandfather couldn't read food labels. I built an app that reads them for him.", description: "Flutter mobile app using Groq AI + OCR to analyze food labels, detect allergens, and suggest healthier alternatives. Personalized health scoring engine.", tech: ["Flutter", "Dart", "Groq AI", "Google ML Kit", "Firebase"], achievement: "🎯 Showcased at Avishkar 2.0, Silver Oak University", link: "#", metrics: ["OCR Pipeline", "Health Scoring", "Published Paper"], thumb: "linear-gradient(135deg, #c9a060, #dfbe87 50%, #f5ead6)" },
  { id: "bloggazers", name: "Bloggazers", icon: "✍️", subtitle: "Full Stack Blog Platform", year: "2024", color: "#6A9EC0", thought: "Every developer needs to build a blog. Not for the blog — for the lessons.", description: "Full-stack blog platform with Google OAuth, nested comment threads, full CRUD operations, and responsive UI. My first real full-stack project.", tech: ["React", "TypeScript", "Node.js", "Firebase", "TailwindCSS"], achievement: "🌟 First major full-stack project", link: "#", metrics: ["Google OAuth", "Nested Comments", "Full CRUD"], thumb: "linear-gradient(135deg, #6a9ec0, #8db5d1 50%, #deedf7)" },
];

const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  isActive,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  const applyTilt = useCallback(() => {
    rafRef.current = undefined;
    const el = innerRef.current;
    if (!el) return;
    const { x, y } = tiltTarget.current;
    el.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  }, []);

  const scheduleTilt = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(applyTilt);
  }, [applyTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      tiltTarget.current = { x, y };
      scheduleTilt();
    },
    [scheduleTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = undefined;
    tiltTarget.current = { x: 0, y: 0 };
    if (innerRef.current) innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`scroll-fade-in cursor-pointer work-card-shell ${isActive ? "lg:col-span-2" : ""}`}
      style={{ perspective: "800px", rotate: `${index % 2 === 0 ? -0.6 : 0.8}deg` }}
      data-cursor="drag"
      data-cursor-label="expand"
    >
      <div className="work-paper-stack work-paper-stack-1" />
      <div className="work-paper-stack work-paper-stack-2" />

      <div
        ref={innerRef}
        className="rounded-2xl overflow-hidden relative h-full transition-[box-shadow,background-color,border-color,filter] duration-400 ease-out paper-tilt-glare work-focus-card"
        style={{
          background: isActive ? `linear-gradient(145deg, ${project.color}08, #fdfcfb)` : "rgba(255,255,255,0.78)",
          border: `1px solid ${isActive ? `${project.color}30` : "#e7e5e4"}`,
          boxShadow: isActive ? `0 18px 56px ${project.color}16, 0 4px 16px rgba(0,0,0,0.05)` : "0 4px 14px rgba(0,0,0,0.04)",
          transform: "rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow, filter",
        }}
      >
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60, transparent)` }} />

        <div className="p-5 lg:p-6">
          <div className="project-thumb mb-4" style={{ background: project.thumb }}>
            <div className="project-thumb-media">
              <span>{project.icon}</span>
            </div>
            <div className="project-thumb-caption">
              <span className="project-thumb-pill">click to expand</span>
            </div>
            <div className="project-polaroid-stack"><span /><span /></div>
          </div>

          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-[44px] h-[44px] rounded-xl flex items-center justify-center text-[22px]" style={{ background: `${project.color}12`, border: `1px solid ${project.color}20` }}>
                {project.icon}
              </div>
              <div>
                <h3 className="text-stone-800 font-bold text-[16px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>{project.name}</h3>
                <p className="text-[10px] text-stone-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{project.subtitle} · {project.year}</p>
              </div>
            </div>
            <span className="text-[42px] font-bold leading-none select-none transition-colors duration-300" style={{ fontFamily: "var(--font-display)", color: isActive ? `${project.color}24` : "#f0efec" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className={`grid gap-4 ${isActive ? "lg:grid-cols-[1.05fr_1fr]" : "grid-cols-1"}`}>
            <div>
              <div className="rounded-lg p-3 mb-4 relative" style={{ background: `${project.color}06`, borderLeft: `3px solid ${project.color}40` }}>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold block mb-1" style={{ color: project.color, fontFamily: "var(--font-mono)" }}>💭 The Thought</span>
                <p className="text-[12px] text-stone-600 leading-relaxed italic" style={{ fontFamily: "var(--font-editorial)" }}>&ldquo;{project.thought}&rdquo;</p>
              </div>
              <p className="text-[12px] text-stone-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>{project.description}</p>
            </div>

            {isActive && (
              <div className="work-story-strip">
                <div className="work-story-step"><span>Problem</span><p>A practical pain point with real-world users and broken workflow.</p></div>
                <div className="work-story-step"><span>Build</span><p>Rapid prototype with focused AI + product iteration.</p></div>
                <div className="work-story-step"><span>Outcome</span><p>Shipped demo, validated utility, and earned recognition.</p></div>
              </div>
            )}
          </div>

          {isActive && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.metrics.map((m) => (
                <span key={m} className="text-[9px] px-2.5 py-1 rounded-lg font-medium" style={{ fontFamily: "var(--font-mono)", background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}20` }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          {project.achievement && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/50 border border-amber-100/40 mb-3 work-stamp">
              <span className="text-[10px] text-amber-800 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{project.achievement}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, isActive ? undefined : 3).map((t) => (
                <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>{t}</span>
              ))}
            </div>
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#C4622D] hover:text-stone-800 transition-colors font-medium magnetic" style={{ fontFamily: "var(--font-mono)" }} data-cursor="link" data-cursor-label="open" onClick={(e) => e.stopPropagation()}>
                View →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export const WorkSection = React.memo(function WorkSection() {
  const [activeId, setActiveId] = useState(projects[0].id);

  const handleSetActive = useCallback((id: string) => setActiveId(id), []);

  return (
    <section id="work" className="relative px-6 lg:px-8 pt-20 lg:pt-32 pb-16 scroll-mt-16 overflow-hidden">
      <SectionDoodles seed={2} tone="warm" density="extreme" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]" style={{ backgroundImage: `url('/paper-texture.jpg')`, backgroundSize: "cover", mixBlendMode: "multiply" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #C4622D 10px, #C4622D 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #C4622D 10px, #C4622D 11px)`, backgroundSize: "100px 100px" }} />

      <div className="mx-auto max-w-[1200px] relative z-10">
        <div className="flex items-center gap-4 mb-6 scroll-fade-in">
          <span className="text-[11px] tracking-[0.3em] uppercase text-stone-500 font-bold" style={{ fontFamily: "var(--font-mono)" }}>02 — Work</span>
          <div className="flex-1 h-[2px] bg-stone-300" />
        </div>

        <div className="mb-12 scroll-fade-in relative">
          <h2 className="text-stone-800 max-w-[640px] relative z-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Every project starts with a <InkHighlight color="#C4622D"><span style={{ fontStyle: "italic" }}>question</span></InkHighlight>.
          </h2>
          <p className="text-stone-500 mt-4 text-[13px] bg-stone-100 border border-stone-200 inline-block px-3 py-1.5 shadow-sm -rotate-1" style={{ fontFamily: "var(--font-mono)" }}>
            click any card to expand · {projects.length} projects shown
          </p>
        </div>

        <div className="hidden lg:block absolute top-[46px] right-[44px] w-[190px] p-4 bg-[#F3DDE1] shadow-lg rotate-6 transition-transform hover:rotate-0 hover:scale-105 z-20" style={{ borderBottomRightRadius: "20px 5px", willChange: "transform" }}>
          <div className="w-8 h-3 bg-black/10 absolute -top-1.5 left-1/2 -translate-x-1/2 -rotate-2" />
          <p className="text-[12px] font-bold text-stone-800 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>Case Study Mode</p>
          <p className="text-[13px] text-stone-700 leading-snug" style={{ fontFamily: "var(--font-editorial)" }}>Tap a card to open full narrative: thought, build, outcome.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative work-bento-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isActive={activeId === p.id} onClick={() => handleSetActive(p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
});
