"use client";

import React, { useEffect, useMemo, useState } from "react";

type Sticker = { id: string; label: string; src?: string; emoji?: string };
type Placed = { id: number; x: number; y: number; rot: number; scale: number; sticker: Sticker };

const baseStickers: Sticker[] = [
  { id: "yellow-star", label: "Star", src: "/yellow-star.svg" },
  { id: "pixel-flower", label: "Flower", src: "/pixel-flower.svg" },
  { id: "messy", label: "Messy", src: "/messy.svg" },
  { id: "sticky", label: "Sticky", src: "/sticky-notes.svg" },
  { id: "star", label: "Sparkle", src: "/star.svg" },
  { id: "goated", label: "GOAT", emoji: "🐐" },
  { id: "fire", label: "Fire", emoji: "🔥" },
  { id: "sparkles", label: "Sparkles", emoji: "✨" },
  { id: "brain", label: "Brain", emoji: "🧠" },
];

export const StickerSheet = React.memo(function StickerSheet() {
  const stickers = useMemo(() => baseStickers, []);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Sticker>(stickers[0]!);
  const [placed, setPlaced] = useState<Placed[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPlace = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".sticker-sheet-panel") || target?.closest?.(".sticker-sheet-button")) return;

      const id = Date.now();
      setPlaced((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
          rot: Math.random() * 24 - 12,
          scale: 0.9 + Math.random() * 0.25,
          sticker: selected,
        },
      ]);
    };

    window.addEventListener("click", onPlace);
    return () => window.removeEventListener("click", onPlace);
  }, [open, selected]);

  const remove = (id: number) => setPlaced((prev) => prev.filter((p) => p.id !== id));

  return (
    <>
      <button
        className="sticker-sheet-button magnetic"
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        data-cursor-label="stickers"
        aria-label="Open sticker sheet"
      >
        ✿
      </button>

      {open && (
        <div className="sticker-sheet-panel" role="dialog" aria-label="Sticker sheet">
          <div className="sticker-sheet-header">
            <div>
              <div className="sticker-sheet-kicker">STICKER SHEET</div>
              <div className="sticker-sheet-sub">Click a sticker, then click anywhere to place.</div>
            </div>
            <button className="sticker-sheet-close magnetic" onClick={() => setOpen(false)} data-cursor="link" data-cursor-label="close">
              ✕
            </button>
          </div>

          <div className="sticker-grid">
            {stickers.map((s) => (
              <button
                key={s.id}
                className={`sticker-pick ${selected.id === s.id ? "sticker-pick-active" : ""} magnetic`}
                onClick={() => setSelected(s)}
                data-cursor="link"
                data-cursor-label={s.label.toLowerCase()}
              >
                {s.src ? (
                  <img src={s.src} alt="" className="sticker-icon" draggable={false} />
                ) : (
                  <span className="sticker-emoji">{s.emoji}</span>
                )}
                <span className="sticker-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="sticker-sheet-footer">
            <span className="sticker-sheet-tip">Tip: double-click a placed sticker to remove.</span>
          </div>
        </div>
      )}

      {placed.map((p) => (
        <div
          key={p.id}
          className="placed-sticker"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg) scale(${p.scale})`,
          }}
          onDoubleClick={() => remove(p.id)}
          aria-hidden
        >
          {p.sticker.src ? (
            <img src={p.sticker.src} alt="" draggable={false} />
          ) : (
            <span className="placed-sticker-emoji">{p.sticker.emoji}</span>
          )}
        </div>
      ))}
    </>
  );
});

