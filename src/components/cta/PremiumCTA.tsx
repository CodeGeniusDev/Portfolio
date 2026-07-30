import { useEffect, useRef } from "react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagneticEffect";

const HEADLINE = ["LET'S", "BUILD", "TOGETHER"];
const BG_WORDS = [
  "FULL STACK",
  "WEB DEVELOPER",
  "UI/UX DESIGNER",
  "AI BUILDER",
];

const COLORS = {
  bg: "var(--secondary-foreground)",
  text: "var(--primary-foreground)",
  primary: "var(--primary)",
  accent: "var(--primary)",
};

function splitIntoChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const chars: HTMLSpanElement[] = [];
  for (const ch of text) {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "bottom";
    wrap.style.lineHeight = "0.9";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = ch === " " ? "\u00A0" : ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    chars.push(inner);
  }
  return chars;
}

function Button({
  href,
  children,
  variant,
  download,
}: {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "primary" | "outline";
  download?: boolean;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    let active = true;
    let enter: (() => void) | null = null;
    let leave: (() => void) | null = null;
    const el = ref.current;
    if (!el) return;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;

      enter = () =>
        gs.to(el, { scale: 1.06, duration: 0.35, ease: "power2.out" });
      leave = () =>
        gs.to(el, { scale: 1, duration: 0.35, ease: "power2.out" });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    };

    init();

    return () => {
      active = false;
      if (enter) el.removeEventListener("mouseenter", enter);
      if (leave) el.removeEventListener("mouseleave", leave);
    };
  }, [ref]);

  const style: React.CSSProperties =
    variant === "solid"
      ? { background: COLORS.text, color: COLORS.bg }
      : variant === "primary"
        ? { background: COLORS.primary, color: COLORS.text }
        : {
          background: "transparent",
          color: COLORS.text,
          borderColor: "rgba(17,17,17,0.2)",
        };

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      data-btn
      data-cursor="hover"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${variant === "outline" ? "border" : ""
        }`}
      style={{ ...style, opacity: 0 }}
    >
      {children}
    </a>
  );
}

export function LetsBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let active = true;
    let cleanup = () => {
      /* no-op */
    };

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      const gs = gsap;
      const scrollTrigger = ScrollTrigger;
      if (!active || !gs || !scrollTrigger) return;

      const section = sectionRef.current;
      if (!section) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const tweens: gsap.core.Tween[] = [];
      const triggers: (ScrollTrigger | undefined)[] = [];

      if (reduced) {
        gs.set(headlineRef.current?.querySelectorAll("[data-line]") ?? [], {
          opacity: 1,
        });
        gs.set(descRef.current, { opacity: 1, y: 0 });
        gs.set(buttonsRef.current?.querySelectorAll("[data-btn]") ?? [], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const lineEls = Array.from(
        headlineRef.current?.querySelectorAll<HTMLElement>("[data-line]") ?? [],
      );
      lineEls.forEach((lineEl, li) => {
        const chars = splitIntoChars(lineEl);
        const t = gs.fromTo(
          chars,
          { yPercent: 120, opacity: 0, scale: 0.7 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.02,
            delay: li * 0.08,
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );
        tweens.push(t);
        triggers.push(t.scrollTrigger);
      });

      const descTween = gs.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
      tweens.push(descTween);
      triggers.push(descTween.scrollTrigger);

      const btns = buttonsRef.current?.querySelectorAll("[data-btn]");
      if (btns?.length) {
        const btnTween = gs.fromTo(
          btns,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.7,
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );
        tweens.push(btnTween);
        triggers.push(btnTween.scrollTrigger);
      }

      const parallaxTween = gs.to(bgTextRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tweens.push(parallaxTween);
      triggers.push(parallaxTween.scrollTrigger);

      const floaters = [
        { ref: shape1Ref, y: -28, rotate: 16, duration: 4.5, delay: 0 },
        { ref: shape2Ref, y: 22, rotate: -14, duration: 5.5, delay: 0.4 },
        { ref: shape3Ref, y: -18, rotate: 22, duration: 6.5, delay: 0.8 },
      ];
      floaters.forEach((f) => {
        const t = gs.to(f.ref.current, {
          y: f.y,
          rotate: f.rotate,
          duration: f.duration,
          delay: f.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        tweens.push(t);
      });

      const path = lineRef.current;
      let pathTween: gsap.core.Tween | null = null;
      if (path) {
        const len = path.getTotalLength();
        gs.set(path, { strokeDasharray: len, strokeDashoffset: len });
        pathTween = gs.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        });
        tweens.push(pathTween);
        triggers.push(pathTween.scrollTrigger);
      }

      cleanup = () => {
        triggers.forEach((tr) => tr?.kill());
        tweens.forEach((t) => t.kill());
      };
    };

    init();
    return () => {
      active = false;
      cleanup();
    };
  }, []);

  return (
    <section
      id="build"
      ref={sectionRef}
      aria-label="Let's build something amazing"
      className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 md:px-12 py-3"
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      {/* grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* giant outlined background words */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
      >
        <div className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none">
          {[...BG_WORDS, ...BG_WORDS].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="font-display font-black uppercase leading-none tracking-tighter whitespace-nowrap shrink-0"
              style={{
                fontSize: "clamp(3rem, 12vw, 9rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(17,17,17,0.08)",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* animated line */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={lineRef}
          d="M -50 420 C 200 300, 400 500, 650 340 S 950 200, 1050 260"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>

      {/* floating geometric shapes */}
      <div
        ref={shape1Ref}
        className="pointer-events-none absolute left-[8%] top-[20%] w-10 h-10 md:w-16 md:h-16 rounded-full border-2"
        style={{ borderColor: COLORS.primary }}
      />
      <div
        ref={shape2Ref}
        className="pointer-events-none absolute right-[10%] top-[24%] w-9 h-9 md:w-14 md:h-14 rotate-12"
        style={{ background: COLORS.accent, opacity: 0.15 }}
      />
      <div
        ref={shape3Ref}
        className="pointer-events-none absolute left-[14%] bottom-[18%] w-0 h-0"
        style={{
          borderLeft: "18px solid transparent",
          borderRight: "18px solid transparent",
          borderBottom: "30px solid rgba(198,242,78,0.25)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[16%] bottom-[14%] w-8 h-8 md:w-12 md:h-12 rounded-full"
        style={{ background: "rgba(17,17,17,0.06)" }}
      />

      {/* center content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="mono-label mb-6" style={{ color: "rgba(17,17,17,0.5)" }}>
          / 06 &mdash; Let&rsquo;s Talk
        </p>
        <h2
          ref={headlineRef}
          className="font-display font-black uppercase leading-[0.9] tracking-tighter mb-8"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
        >
          {HEADLINE.map((word, i) => (
            <span
              key={word}
              data-line
              className="block"
              style={i === 1 ? { color: COLORS.accent } : undefined}
            >
              {word}
            </span>
          ))}
        </h2>
        <p
          ref={descRef}
          className="text-base md:text-xl max-w-xl mx-auto mb-12"
          style={{ color: "rgba(17,17,17,0.65)" }}
        >
          Building modern web experiences, premium interfaces, and scalable
          digital products.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#projects" variant="solid">
            View Projects <FiArrowUpRight />
          </Button>
          <Button href="#contact" variant="primary">
            Contact Me <FiArrowUpRight />
          </Button>
          <Button href="/resume.pdf" variant="outline" download>
            Download Resume <FiDownload />
          </Button>
        </div>
      </div>
    </section>
  );
}
