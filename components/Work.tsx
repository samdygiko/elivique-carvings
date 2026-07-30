"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// carving-02 through carving-21 — twenty portrait images.
const WORK = Array.from({ length: 20 }, (_, i) => {
  const n = i + 2; // 2..21
  return {
    src: `/images/work/carving-${String(n).padStart(2, "0")}.jpeg`,
    index: String(i + 1).padStart(2, "0"),
  };
});

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [wrapperH, setWrapperH] = useState<number | undefined>(undefined);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Detect the pinned-vs-stacked breakpoint (900px).
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 900px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Measure the horizontal track and size the pin wrapper so vertical scroll
  // distance equals the horizontal travel.
  useEffect(() => {
    if (!isDesktop) {
      setWrapperH(undefined);
      if (trackRef.current) trackRef.current.style.transform = "";
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
      setWrapperH(window.innerHeight + maxTranslate);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  // Scroll → translateX, throttled with requestAnimationFrame.
  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
        const distance = section.offsetHeight - window.innerHeight;
        const top = section.getBoundingClientRect().top;
        const progress = distance > 0 ? Math.min(1, Math.max(0, -top / distance)) : 0;
        track.style.transform = `translateX(${-progress * maxTranslate}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isDesktop, wrapperH]);

  // Lightbox keyboard controls.
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((dir: number) => {
    setOpenIndex((cur) => (cur === null ? cur : (cur + dir + WORK.length) % WORK.length));
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const Card = ({ item, i }: { item: (typeof WORK)[number]; i: number }) => (
    <button
      onClick={() => setOpenIndex(i)}
      className="group block text-left"
      aria-label={`Open carving ${item.index}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
        <Image
          src={item.src}
          alt={`Hand-carved hardwood sculpture ${item.index}`}
          fill
          sizes="(min-width: 900px) 34vw, 45vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <span className="mt-3 block font-sora text-xs font-light tracking-wide text-muted">
        {item.index}
      </span>
    </button>
  );

  return (
    <section id="work">
      {/* Section intro */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-12 lg:pt-36">
        <p className="eyebrow text-sienna">Selected Work</p>
        <h2 className="mt-4 max-w-3xl font-marcellus text-4xl leading-tight lg:text-6xl">
          Twenty pieces, each from one block
        </h2>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      {mounted && isDesktop ? (
        <div ref={sectionRef} style={{ height: wrapperH }} className="relative mt-16">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center gap-10 px-6 will-change-transform lg:px-12"
              style={{ transform: "translateX(0px)" }}
            >
              {WORK.map((item, i) => (
                <div key={item.src} style={{ width: "34vw", flex: "0 0 auto" }}>
                  <Card item={item} i={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Mobile: two-column vertical stack
        <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-2 gap-x-4 gap-y-8 px-6 lg:px-12">
          {WORK.map((item, i) => (
            <Card key={item.src} item={item} i={i} />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(28,22,19,0.94)" }}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 font-sora text-sm text-paper/70 transition-opacity hover:text-paper"
          >
            Close ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
            className="absolute left-4 z-10 px-4 font-marcellus text-3xl text-paper/60 transition-opacity hover:text-paper lg:left-10"
          >
            ‹
          </button>

          <div className="relative max-h-[82vh] w-[86vw] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={WORK[openIndex].src}
              alt={`Hand-carved hardwood sculpture ${WORK[openIndex].index}`}
              width={1200}
              height={1600}
              sizes="86vw"
              className="mx-auto h-auto max-h-[82vh] w-auto object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
            className="absolute right-4 z-10 px-4 font-marcellus text-3xl text-paper/60 transition-opacity hover:text-paper lg:right-10"
          >
            ›
          </button>

          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sora text-xs tracking-widest text-paper/70">
            {String(openIndex + 1).padStart(2, "0")} / {String(WORK.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </section>
  );
}
