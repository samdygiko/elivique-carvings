"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Gus's actual pieces. Shown whole (no crop, no zoom) and cycled automatically.
const PIECES = [
  { src: "/images/pieces/piece-01.jpeg", w: 188, h: 320 },
  { src: "/images/pieces/piece-02.jpeg", w: 240, h: 249 },
  { src: "/images/pieces/piece-03.jpeg", w: 240, h: 253 },
  { src: "/images/pieces/piece-04.jpeg", w: 260, h: 240 },
  { src: "/images/pieces/piece-05.jpeg", w: 240, h: 293 },
  { src: "/images/pieces/piece-06.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-07.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-08.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-09.jpeg", w: 240, h: 311 },
  { src: "/images/pieces/piece-10.jpeg", w: 240, h: 314 },
  { src: "/images/pieces/piece-11.jpeg", w: 228, h: 320 },
  { src: "/images/pieces/piece-12.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-13.jpeg", w: 260, h: 240 },
  { src: "/images/pieces/piece-14.jpeg", w: 234, h: 320 },
  { src: "/images/pieces/piece-15.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-16.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-17.jpeg", w: 240, h: 320 },
  { src: "/images/pieces/piece-18.jpeg", w: 240, h: 307 },
];

const INTERVAL = 4000;

export default function Work() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + PIECES.length) % PIECES.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % PIECES.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="work" className="section-pad">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="eyebrow text-sienna">Selected Work</p>
        <h2 className="mt-4 max-w-3xl font-marcellus text-4xl leading-tight lg:text-6xl">
          Carved from single blocks
        </h2>

        {/* Slideshow */}
        <div
          className="relative mt-14"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {/* Stage — fixed height, images centred and shown whole */}
          <div className="relative flex items-center justify-center" style={{ height: "clamp(320px, 50vh, 440px)" }}>
            {PIECES.map((p, i) => (
              <div
                key={p.src}
                aria-hidden={i !== index}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
              >
                <Image
                  src={p.src}
                  alt={`Wood carving by Gus Elivique — piece ${two(i + 1)}`}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 480px, 80vw"
                  priority={i === 0}
                  className="h-full w-auto max-w-[86vw] object-contain"
                  style={{ maxHeight: "100%" }}
                />
              </div>
            ))}
          </div>

          {/* Controls row */}
          <div className="mt-8 flex items-center justify-between">
            <span className="font-sora text-xs font-light tracking-widest text-muted">
              {two(index + 1)} <span className="text-ink/25">/ {two(PIECES.length)}</span>
            </span>

            <div className="flex items-center gap-6">
              <button onClick={() => go(-1)} aria-label="Previous piece" className="font-marcellus text-2xl text-ink/50 transition-colors hover:text-sienna">
                ‹
              </button>
              <button onClick={() => go(1)} aria-label="Next piece" className="font-marcellus text-2xl text-ink/50 transition-colors hover:text-sienna">
                ›
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex flex-wrap gap-2">
            {PIECES.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setIndex(i)}
                aria-label={`Go to piece ${two(i + 1)}`}
                className="h-[3px] transition-all"
                style={{
                  width: i === index ? 28 : 14,
                  background: i === index ? "var(--sienna)" : "rgba(28,22,19,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
