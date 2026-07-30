import Image from "next/image";
import Header from "@/components/Header";
import Work from "@/components/Work";
import ContactForm from "@/components/ContactForm";
import FloatingContact from "@/components/FloatingContact";

const PROCESS = [
  {
    n: "01",
    title: "Selection",
    body: "Each piece starts with a single block of hardwood, chosen for its grain, density, and how it will move as it dries. The wood is read closely before any cut is planned.",
  },
  {
    n: "02",
    title: "Roughing",
    body: "Large cuts set the mass and proportion of the form. This stage is quick and decisive, taking the block down to a rough version of the piece.",
  },
  {
    n: "03",
    title: "Refinement",
    body: "Smaller tools bring out the detail and the lines of the form. The work slows here as the surface is brought close to its final shape.",
  },
  {
    n: "04",
    title: "Finish",
    body: "The surface is smoothed and treated with oil or wax to protect it. The grain darkens and settles into its final tone.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <FloatingContact />
      <main id="top">
        {/* 1. HERO */}
        <section className="relative h-screen w-full overflow-hidden">
          <Image
            src="/images/work/carving-01.jpeg"
            alt="Hand-carved hardwood sculpture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(28,22,19,0.82) 0%, rgba(28,22,19,0.35) 45%, rgba(28,22,19,0.12) 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-12 lg:pb-28">
              <p className="eyebrow text-paper/80">Elivique Carvings · Los Angeles</p>
              <h1
                className="mt-6 max-w-4xl font-marcellus leading-[0.95] text-paper"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
              >
                Wood, cut by hand
              </h1>
              <p className="mt-6 max-w-xl font-sora text-lg font-light text-paper/85 lg:text-xl">
                Sculptural carving from single blocks of hardwood. Los Angeles.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <a href="#work" className="eyebrow link-underline text-paper">
                  View the work
                </a>
                <a href="tel:+13109888522" className="eyebrow link-underline text-sienna">
                  +1 (310) 988-8522
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WORK */}
        <Work />

        {/* 3. ABOUT */}
        <section id="about" className="section-pad">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
              <Image
                src="/images/work/carving-22.jpeg"
                alt="Carving detail"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-sienna">About</p>
              <h2 className="mt-4 font-marcellus text-4xl lg:text-5xl">Gus Elivique</h2>
              <div className="mt-8 flex flex-col gap-5 font-sora text-base font-light leading-relaxed text-ink/80">
                <p>
                  Gus Elivique carves by removing material. He begins with a single block of
                  hardwood and takes away everything that is not the piece. Nothing is added,
                  glued, or joined — the finished form was always inside the block.
                </p>
                <p>
                  He works with the grain rather than against it. The direction of the wood
                  decides where a cut can go and where it cannot, so the block sets many of the
                  terms before the first tool touches it.
                </p>
                <p>
                  Each piece is a negotiation with the wood. Knots, splits, and shifts in density
                  turn up as the work goes on, and he reads them as he finds them and lets them
                  shape the result. A carving is done when the block and the idea have met
                  somewhere in the middle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROCESS */}
        <section id="process" className="section-pad" style={{ background: "var(--ink)", color: "var(--paper)" }}>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <p className="eyebrow text-sienna">Process</p>
            <h2 className="mt-4 max-w-2xl font-marcellus text-4xl text-paper lg:text-5xl">
              From block to finished form
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step) => (
                <div key={step.n} className="flex flex-col">
                  <span className="font-marcellus text-5xl text-sienna">{step.n}</span>
                  <h3 className="mt-5 font-marcellus text-2xl text-paper">{step.title}</h3>
                  <p className="mt-4 font-sora text-sm font-light leading-relaxed text-paper/70">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COMMISSIONS */}
        <section id="commissions" className="section-pad">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="flex flex-col justify-center lg:order-1">
              <p className="eyebrow text-sienna">Commissions</p>
              <h2 className="mt-4 font-marcellus text-4xl lg:text-5xl">Commission a piece</h2>
              <div className="mt-8 flex flex-col gap-5 font-sora text-base font-light leading-relaxed text-ink/80">
                <p>
                  Every commission starts with a conversation — about the piece, the wood it will
                  be cut from, and the space it is going to live in. From there the form is worked
                  up and carved from a single block.
                </p>
                <p>
                  Most commissions take eight to sixteen weeks, depending on scale and the wood.
                  The timeline is set once the piece and the block are agreed.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-10 inline-block bg-sienna px-8 py-3 font-sora text-sm text-paper transition-opacity hover:opacity-90"
                style={{ fontWeight: 600 }}
              >
                Start a commission
              </a>
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5 lg:order-2">
              <Image
                src="/images/work/carving-23.jpeg"
                alt="Commissioned carving"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="section-pad" style={{ background: "var(--ink)", color: "var(--paper)" }}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-sienna">Contact</p>
              <h2 className="mt-4 font-marcellus text-4xl text-paper lg:text-5xl">Start a commission</h2>
              <p className="mt-6 max-w-md font-sora text-base font-light leading-relaxed text-paper/70">
                Studio visits are by appointment. Call, or send a note about the piece and Gus
                will get back to you.
              </p>
              <a
                href="tel:+13109888522"
                className="link-underline mt-10 inline-block font-marcellus text-4xl text-paper lg:text-5xl"
              >
                +1 (310) 988-8522
              </a>
            </div>
            <div className="flex flex-col justify-center">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="relative h-40 w-full overflow-hidden lg:h-48">
          <Image
            src="/images/work/carving-24.jpeg"
            alt="Carving detail"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-14 text-center lg:px-12">
          <p className="font-marcellus text-xl tracking-wide text-paper">ELIVIQUE CARVINGS</p>
          <a href="tel:+13109888522" className="link-underline eyebrow text-sienna">
            +1 (310) 988-8522
          </a>
          <p className="font-sora text-xs font-light text-paper/50">
            © 2026 Elivique Carvings · Los Angeles · By appointment
          </p>
        </div>
      </footer>
    </>
  );
}
