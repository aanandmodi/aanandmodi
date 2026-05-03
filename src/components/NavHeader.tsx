"use client";

import React from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export const NavHeader = React.memo(function NavHeader() {
  return (
    <nav className="relative z-[100]">
      <div className="mx-auto max-w-[1400px] px-8 pt-6 pb-3 flex items-center justify-between">
        <Link
          href="/"
          style={{ fontFamily: "var(--font-display)" }}
          className="text-[14px] font-medium text-stone-700 hover:text-stone-900 transition-colors tracking-wide"
        >
          Aanand Modi
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[12px] text-stone-500 hover:text-stone-800 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
});

