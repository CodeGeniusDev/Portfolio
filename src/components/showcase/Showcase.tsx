import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiZap,
  FiTrendingUp,
  FiActivity,
  FiStar,
} from "react-icons/fi";
import { gsap, registerGsap } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import portrait from "@/assets/3.png";

const BG = "var(--secondary-foreground)";
const FG = "var(--primary-foreground)";
const LIME = "var(--primary)";
const BORDER = "#E5E5E5";

const panels = ["01", "02", "03", "04"];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let active = true;
    let tween: gsap.core.Tween | null = null;
    let timelines: Array<gsap.core.Timeline | null> = [];

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track || !progress) return;

      const panelEls = gs.utils.toArray<HTMLElement>("[data-sc-panel]", track);
      const totalScroll = () => track.scrollWidth - window.innerWidth;

      tween = gs.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              panelEls.length - 1,
              Math.floor(self.progress * panelEls.length),
            );
            setActive(idx);
            gs.to(progress, {
              scaleX: self.progress,
              duration: 0.2,
              ease: "power2.out",
              overwrite: true,
            });
          },
        },
      });

      timelines = panelEls.map((p) => {
        const inner = p.querySelector<HTMLElement>("[data-sc-inner]");
        const bigNum = p.querySelector<HTMLElement>("[data-sc-num]");
        const floats = p.querySelectorAll<HTMLElement>("[data-sc-float]");
        if (!inner || !bigNum) return null;
        const tl = gs.timeline({
          scrollTrigger: {
            trigger: p,
            containerAnimation: tween!,
            start: "left 85%",
            end: "right 15%",
            scrub: true,
          },
        });
        tl.fromTo(
          inner,
          { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 40 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, ease: "power2.out" },
          0,
        )
          .fromTo(
            bigNum,
            { xPercent: 25, opacity: 0.4 },
            { xPercent: -25, opacity: 1, ease: "none" },
            0,
          )
          .fromTo(
            floats,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out" },
            0.1,
          );
        return tl;
      });
    };

    init();

    return () => {
      active = false;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      timelines.forEach((t) => {
        t?.scrollTrigger?.kill();
        t?.kill();
      });
    };
  }, []);

  return (
    <div id="about">
      {/* Desktop / tablet pinned horizontal */}
      <section
        ref={sectionRef}
        aria-label="Showcase"
        className="relative overflow-hidden hidden md:block"
        style={{ height: "100vh", background: BG, color: FG }}
      >
        {/* Header overlay */}
        <div className="absolute top-0 left-6 right-0 z-30 px-6 md:px-12 pt-6 pointer-events-none">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div
              className="
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    rounded-full
    px-4
    py-2
    bg-white/35
    backdrop-blur-3xl
    backdrop-saturate-200
    border
    border-white/40
    shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent pointer-events-none" />
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.16em",
                  fontSize: "0.7rem",
                  color: "#444",
                }}
              >
                / SHOWCASE — SCROLL TO EXPLORE
              </p>
            </div>
            <div
              className="
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    rounded-full
    px-4
    py-2
    bg-white/35
    backdrop-blur-3xl
    backdrop-saturate-200
    border
    border-white/40
    shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent pointer-events-none" />

              <p
                className="relative z-10"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.16em",
                  fontSize: "0.7rem",
                  color: "#444",
                }}
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(panels.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Progress line */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 z-30">
          <div className="h-px w-full" style={{ background: BORDER }}>
            <div
              ref={progressRef}
              className="h-px w-full origin-left"
              style={{ background: FG, transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${panels.length * 100}vw` }}
        >
          <PanelIntro />
          <PanelMetrics />
          <PanelWork />
          <PanelCTA />
        </div>
      </section>

      {/* Mobile stacked */}
      <ShowcaseMobile />
    </div>
  );
}

/* ---------- Panels ---------- */

function PanelShell({
  num,
  label,
  children,
  bg = BG,
  fg = FG,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  bg?: string;
  fg?: string;
}) {
  return (
    <div
      data-sc-panel
      className="relative flex items-center px-8 md:px-20 lg:px-28"
      style={{ width: "100vw", flex: "0 0 100vw", background: bg, color: fg }}
    >
      {/* Massive bg number */}
      <div
        data-sc-num
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-4vw] flex items-center select-none"
        style={{
          color: fg === FG ? "rgba(17,17,17,0.05)" : "rgba(17,17,17,0.12)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(280px, 46vw, 720px)",
            lineHeight: 0.8,
            letterSpacing: "-0.06em",
          }}
        >
          {num}
        </span>
      </div>

      {/* Panel top label */}
      <div className="absolute top-0 sm:top-8 md:top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.25em] opacity-60 whitespace-nowrap">
          / CHAPTER {num} — {label}
        </p>
      </div>

      <div data-sc-inner className="relative z-10 w-full max-w-350 mx-auto">
        {children}
      </div>
    </div>
  );
}

function PanelIntro() {
  return (
    <PanelShell num="01" label="THE PERSON">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-5 relative">
          <div className="relative aspect-[4/5] w-full max-w-[440px]">
            <div
              className="absolute inset-0 rounded-full border animate-[spin_60s_linear_infinite]"
              style={{ borderColor: BORDER }}
              data-sc-float
            />
            <div
              className="absolute inset-6 rounded-full border"
              style={{ borderColor: BORDER }}
              data-sc-float
            />
            <img
              src={portrait}
              alt="Portrait of Abdullah Abbad displayed in a circular showcase frame"
              className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] object-cover rounded-full grayscale"
              loading="lazy"
            />
            <div
              data-sc-float
              className="absolute -right-2 top-8 w-20 h-20 border border-black rounded-2xl grid place-items-center shadow-lg"
              style={{ background: LIME, color: FG }}
            >
              <FiZap size={32} />
            </div>
            <div
              data-sc-float
              className="absolute -left-4 bottom-16 rounded-full px-4 py-2 border bg-white"
              style={{
                borderColor: BORDER,
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
              }}
            >
              <span className="text-primary">●</span> AVAILABLE
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(56px, 9vw, 180px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
            }}
          >
            HELLO
            <span
              className="text-primary"
              style={{
                WebkitTextStroke: "1px #000",
              }}
            >
              ,
            </span>
            <br />
            I&apos;M{" "}
            <span
              style={{
                WebkitTextStroke: `2px ${FG}`,
                color: "transparent",
              }}
            >
              {profile.firstName}
            </span>
          </h2>
          <p className="mt-8 max-w-lg text-lg" style={{ color: "#444" }}>
            {profile.bio[0]}
          </p>
          <div
            className="mt-8 flex items-center gap-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
            }}
          >
            <span>{profile.location}</span>
            <span style={{ color: "#999" }}>—</span>
            <span>{profile.role}</span>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function PanelMetrics() {
  const stats = [
    { k: "35+", v: "Projects Shipped", Icon: FiStar },
    { k: "3+", v: "Years Experience", Icon: FiTrendingUp },
    { k: "20+", v: "Technologies", Icon: FiActivity },
    { k: "15+", v: "Client Projects", Icon: FiZap },
  ];
  return (
    <PanelShell num="02" label="BY THE NUMBERS">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(48px, 7vw, 140px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            Metrics
            <br />
            that{" "}
            <span style={{ color: LIME, WebkitTextStroke: `1px ${FG}` }}>
              matter
            </span>
            .
          </h2>
          <p className="mt-6 max-w-md text-base" style={{ color: "#555" }}>
            Numbers from the last five years — shipped, scaled, and
            stress-tested in production.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <div
              key={s.v}
              data-sc-float
              className="relative rounded-2xl p-8 bg-white border transition-transform hover:-translate-y-1"
              style={{ borderColor: BORDER, minHeight: 220 }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center"
                  style={{
                    background: i % 2 === 0 ? LIME : "var(--primary)",
                    color: i % 2 === 0 ? FG : "var(--primary-foreground)",
                  }}
                >
                  <s.Icon size={22} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    color: "#888",
                  }}
                >
                  /0{i + 1}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 5vw, 88px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginTop: "2rem",
                }}
              >
                {s.k}
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  color: "#666",
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

function PanelWork() {
  const items = projects.slice(0, 3);
  const cta = useMagnetic<HTMLAnchorElement>(0.4);
  return (
    <PanelShell num="03" label="SELECTED WORK">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(48px, 7vw, 140px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            Recent
            <br />
            work.
          </h2>
          <p className="mt-6 text-base max-w-sm" style={{ color: "#555" }}>
            A cross-section of platforms, systems, and interfaces I&apos;ve
            shaped end-to-end.
          </p>
          <a
            ref={cta}
            href="#projects"
            className="inline-flex mt-6 items-center gap-2 rounded-full bg-primary text-[var(--primary-foreground)] px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold"
          >
            ALL PROJECT <FiArrowUpRight />
          </a>
        </div>
        <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-5">
          {items.map((p, i) => (
            <div
              key={p.title}
              data-sc-float
              className="group relative rounded-2xl overflow-hidden border bg-white transition-transform hover:-translate-y-2"
              style={{ borderColor: BORDER }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={`Showcase image for ${p.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.66rem",
                      letterSpacing: "0.16em",
                      color: "#888",
                    }}
                  >
                    /0{i + 1} — {p.year}
                  </span>
                  <FiArrowUpRight />
                </div>
                <h3
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {p.title}
                </h3>
                <div
                  className="mt-3 h-px w-full"
                  style={{ background: BORDER }}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.technologies.slice(0, 2).map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-full border"
                      style={{
                        borderColor: BORDER,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        color: "#555",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

function PanelCTA() {
  const ctaPrimary = useMagnetic<HTMLAnchorElement>(0.2);
  const ctaSecondary = useMagnetic<HTMLAnchorElement>(0.2);
  return (
    <PanelShell num="04" label="LET'S BUILD" bg={LIME} fg={FG}>
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-9">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(72px, 12vw, 260px)",
              lineHeight: 0.86,
              letterSpacing: "-0.05em",
            }}
          >
            Got an
            <br />
            <span
              style={{ WebkitTextStroke: `2px ${FG}`, color: "var(--secondary-foreground)" }}
            >
              idea?
            </span>
            <br />
            Let&apos;s build
            <span
              style={{ WebkitTextStroke: `2px ${FG}`, color: "var(--secondary-foreground)" }}
            >
              .
            </span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <a
            ref={ctaPrimary}
            href="#contact"
            data-sc-float
            className="group inline-flex items-center justify-between rounded-full px-6 py-4 text-black"
            style={{ background: FG, color: "var(--secondary-foreground)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.16em",
                fontSize: "0.75rem",
              }}
            >
              START A PROJECT
            </span>
            <FiArrowUpRight size={22} />
          </a>
          <a
            ref={ctaSecondary}
            href="mailto:abdullahabbad916@gmail.com"
            data-sc-float
            className="inline-flex items-center justify-between rounded-full px-6 py-4 border bg-transparent"
            style={{ borderColor: FG }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.16em",
                fontSize: "0.75rem",
              }}
            >
              SAY HELLO
            </span>
            <FiArrowUpRight size={22} />
          </a>
        </div>
      </div>
    </PanelShell>
  );
}

/* ---------- Mobile stacked ---------- */

function ShowcaseMobile() {
  return (
    <section
      className="md:hidden px-6 py-20"
      style={{ background: BG, color: FG }}
      aria-label="Showcase"
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.16em",
          fontSize: "0.7rem",
          color: "#666",
        }}
        className="mb-4"
      >
        / SHOWCASE
      </p>

      <div className="space-y-16">
        {[
          {
            n: "01",
            t: "Hello, I'm",
            accent: profile.firstName,
            body: profile.bio[0],
          },
          {
            n: "02",
            t: "Metrics that",
            accent: "matter",
            body: "35+ projects, 3+ years, 20+ technologies, multiple industries.",
          },
          {
            n: "03",
            t: "Recent",
            accent: "work.",
            body: "Platforms, systems, and interfaces.",
          },
          {
            n: "04",
            t: "Got an",
            accent: "idea?",
            body: "Let's build something great.",
          },
        ].map((p) => (
          <div
            key={p.n}
            className="relative rounded-2xl border p-8 bg-white"
            style={{ borderColor: BORDER }}
          >
            <span
              aria-hidden
              className="absolute -top-6 right-4 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "8rem",
                lineHeight: 1,
                letterSpacing: "-0.06em",
                color: "rgba(17,17,17,0.06)",
              }}
            >
              {p.n}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 10vw, 3rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {p.t}{" "}
              <span
                style={{
                  WebkitTextStroke: `1.5px ${FG}`,
                  color: "transparent",
                }}
              >
                {p.accent}
              </span>
            </h3>
            <p className="mt-4 text-base" style={{ color: "#555" }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
