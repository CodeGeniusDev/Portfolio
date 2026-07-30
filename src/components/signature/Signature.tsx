import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGlobe,
  FiMail,
} from "react-icons/fi";
import { profile } from "@/data/profile";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagneticEffect";

const LIME = "var(--accent)";
const INK = "var(--primary-foreground)";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS: Record<string, typeof FiGithub> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
  X: FiTwitter,
  Email: FiMail,
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

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  strength?: number;
};

function MagneticLink({
  href,
  children,
  className,
  style,
  strength = 0.25,
  ...props
}: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let cleanup: (() => void) | null = null;

    const init = async () => {
      await registerGsap();
      const gs = gsap;
      if (!gs) return;

      const enter = () =>
        gs.to(el, {
          scale: 1 + strength * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });

      const leave = () =>
        gs.to(el, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);

      cleanup = () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    };

    void init();

    return () => {
      cleanup?.();
    };
  }, [ref, strength]);

  return (
    <a
      ref={ref}
      href={href}
      data-cursor="hover"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}

export function Signature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const tweens: gsap.core.Tween[] = [];
    const triggers: (ScrollTrigger | undefined)[] = [];

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

      if (reduced) {
        gs.set(
          [
            nameRef.current?.querySelectorAll("[data-line]"),
            topRef.current,
            navRef.current?.querySelectorAll("[data-item]"),
            socialRef.current?.querySelectorAll("[data-item]"),
            ctaRef.current,
          ],
          { opacity: 1, y: 0, x: 0 },
        );
        return;
      }

      const topTween = gs.fromTo(
        topRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
      tweens.push(topTween);
      triggers.push(topTween.scrollTrigger);

      const lineEls = Array.from(
        nameRef.current?.querySelectorAll<HTMLElement>("[data-line]") ?? [],
      );

      lineEls.forEach((lineEl, li) => {
        const chars = splitIntoChars(lineEl);
        const t = gs.fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.02,
            delay: 0.15 + li * 0.1,
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );
        tweens.push(t);
        triggers.push(t.scrollTrigger);
      });

      const navItems = navRef.current?.querySelectorAll("[data-item]");
      if (navItems?.length) {
        const t = gs.fromTo(
          navItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.5,
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );
        tweens.push(t);
        triggers.push(t.scrollTrigger);
      }

      const socialItems = socialRef.current?.querySelectorAll("[data-item]");
      if (socialItems?.length) {
        const t = gs.fromTo(
          socialItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.5,
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );
        tweens.push(t);
        triggers.push(t.scrollTrigger);
      }

      const ctaTween = gs.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
      tweens.push(ctaTween);
      triggers.push(ctaTween.scrollTrigger);

      const ghostTween = gs.to(ghostRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tweens.push(ghostTween);
      triggers.push(ghostTween.scrollTrigger);

      [line1Ref, line2Ref].forEach((r, i) => {
        const path = r.current;
        if (!path) return;

        const len = path.getTotalLength();
        gs.set(path, { strokeDasharray: len, strokeDashoffset: len });

        const t = gs.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top ${85 - i * 5}%`,
            end: `top ${25 - i * 5}%`,
            scrub: true,
          },
        });

        tweens.push(t);
        triggers.push(t.scrollTrigger);
      });

      const sparkTween = gs.to(sparkRef.current, {
        y: -14,
        rotate: 25,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      tweens.push(sparkTween);

      const refreshOnResize = () => scrollTrigger.refresh();
      window.addEventListener("resize", refreshOnResize);
      window.addEventListener("orientationchange", refreshOnResize);

      return () => {
        window.removeEventListener("resize", refreshOnResize);
        window.removeEventListener("orientationchange", refreshOnResize);
        triggers.forEach((tr) => tr?.kill());
        tweens.forEach((t) => t.kill());
      };
    };

    const cleanup = init();
    return () => {
      active = false;
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-[var(--secondary-foreground)] px-3 py-4 sm:px-6 sm:py-6 lg:px-16 lg:py-16">
      <div className="mx-auto w-full max-w-[1800px]">
        <section
          id="contact"
          ref={sectionRef}
          aria-label="Signature"
          className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.97)] min-h-[100svh] flex flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10"
          style={{ backgroundColor: LIME, color: INK }}
        >
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 bg-white h-12 w-[75vw] max-w-[600px] min-w-[320px]"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)",
            }}
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={line1Ref}
              d="M -50 520 C 300 460, 600 580, 900 500 S 1400 440, 1650 500"
              fill="none"
              stroke={INK}
              strokeWidth="1.5"
              opacity="0.55"
            />
            <path
              ref={line2Ref}
              d="M -50 700 C 350 650, 650 760, 950 690 S 1400 640, 1650 690"
              fill="none"
              stroke={INK}
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>

          <div
            ref={sparkRef}
            className="pointer-events-none absolute right-[8%] bottom-[24%] hidden text-xl opacity-40 md:block md:right-[12%] md:text-2xl"
          >
            ✦
          </div>

          <div
            ref={topRef}
            className="relative z-10 flex items-start justify-between gap-4"
          >
            <div className="ml-auto flex flex-col items-end justify-end gap-2 sm:gap-3">
              <span
                className="mono-label hidden sm:block"
                style={{ color: "rgba(13,13,13,0.6)" }}
              >
                {profile.role}
              </span>

              <MagneticLink
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold whitespace-nowrap sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3"
                style={{ background: INK, color: LIME }}
                strength={0.25}
              >
                <FiDownload />
                <span className="hidden min-[380px]:inline">Download</span>{" "}
                Resume
              </MagneticLink>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center py-6 sm:py-10">
            <div className="relative flex w-full items-center justify-center">
              <div
                ref={ghostRef}
                className="pointer-events-none absolute inset-0 flex select-none items-center justify-center px-4"
              >
                <span
                  className="whitespace-nowrap font-display font-black uppercase leading-none tracking-tighter"
                  style={{
                    fontSize: "clamp(2.25rem, 11vw, 9rem)",
                    color: "transparent",
                    WebkitTextStroke: `1px rgba(13,13,13,0.15)`,
                  }}
                >
                  {profile.role}
                </span>
              </div>

              <div ref={nameRef} className="relative z-10 px-2 text-center">
                <h2
                  className="font-display font-black uppercase leading-[0.92] tracking-tighter"
                  style={{ fontSize: "clamp(2.25rem, 10vw, 7.5rem)" }}
                >
                  <span data-line className="block">
                    {profile.firstName}
                  </span>
                  <span data-line className="block">
                    {profile.lastName}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-end gap-6 sm:gap-8 lg:grid-cols-[1fr_auto_1fr]">
            <div ref={navRef} className="order-2 lg:order-1">
              <p
                className="mono-label mb-2 sm:mb-3"
                style={{ color: "rgba(13,13,13,0.55)" }}
              >
                Links <span style={{ opacity: 0.5 }}>/</span> Menu
              </p>

              <ul className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-1 lg:flex-col lg:justify-start lg:gap-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.label} data-item>
                    <MagneticLink
                      href={l.href}
                      className="inline-block font-display font-black uppercase tracking-tight transition-opacity hover:opacity-70"
                      style={{
                        fontSize: "clamp(1rem, 3vw, 2.25rem)",
                        lineHeight: 1.1,
                      }}
                      strength={0.25}
                    >
                      {l.label}
                    </MagneticLink>
                  </li>
                ))}
              </ul>
            </div>

            <div ref={ctaRef} className="order-1 flex justify-center lg:order-2">
              <MagneticLink
                href="mailto:abdullahabbad916@gmail.com"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap sm:px-6 sm:py-3.5 md:px-8 md:py-4 md:text-base"
                style={{ background: INK, color: LIME }}
                strength={0.4}
              >
                Explore More <FiArrowUpRight />
              </MagneticLink>
            </div>

            <div ref={socialRef} className="order-3 text-center lg:text-right">
              <p
                className="mono-label mb-2 sm:mb-3 lg:text-right"
                style={{ color: "rgba(13,13,13,0.55)" }}
              >
                Connect <span style={{ opacity: 0.5 }}>/</span> Social
              </p>

              <ul className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-1 lg:flex-col lg:items-end lg:justify-end lg:gap-y-1">
                {profile.socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.label] ?? FiGlobe;

                  return (
                    <li key={s.label} data-item>
                      <MagneticLink
                        href={s.href}
                        className="inline-flex items-center gap-2 font-display font-black uppercase tracking-tight transition-opacity hover:opacity-70"
                        style={{
                          fontSize: "clamp(1rem, 3vw, 2.25rem)",
                          lineHeight: 1.1,
                        }}
                        strength={0.25}
                      >
                        {s.label}{" "}
                        <Icon className="text-[0.55em] opacity-50" />
                      </MagneticLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}