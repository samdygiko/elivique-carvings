"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Commissions", href: "#commissions" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "var(--paper)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(28,22,19,0.12)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#top"
          className="font-marcellus text-lg tracking-wide"
          style={{ color: scrolled ? "var(--ink)" : "var(--paper)" }}
        >
          ELIVIQUE CARVINGS
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="eyebrow link-underline"
              style={{ color: scrolled ? "var(--ink)" : "var(--paper)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+13109888522"
          className="eyebrow link-underline hidden lg:inline-block"
          style={{ color: "var(--sienna)" }}
        >
          +1 (310) 988-8522
        </a>
      </div>
    </header>
  );
}
