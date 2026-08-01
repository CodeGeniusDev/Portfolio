import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { projects, type Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const Icon = project.icon;

  useEffect(() => {
    let active = true;
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      await registerGsap();
      if (!active) return;

      const el = root.current;
      if (!el) return;

      const gs = gsap;
      const st = ScrollTrigger;
      if (!gs || !st) return;

      ctx = gs.context(() => {
        gs.from(el.querySelectorAll("[data-row-line]"), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
        gs.from(el.querySelectorAll("[data-row-fade]"), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
        gs.fromTo(
          el.querySelector("[data-row-number]"),
          { opacity: 0, y: 90 },
          {
            opacity: 1,
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      }, el);
    };

    void init();

    return () => {
      active = false;
      ctx?.revert();
      ScrollTrigger?.refresh();
    };
  }, []);

  const alt = index % 2 === 1;

  return (
    <article
      ref={root}
      onClick={onOpen}
      data-cursor="hover"
      className={`group relative flex min-h-[78vh] w-full cursor-pointer items-center border-y border-white/8 px-6 py-20 md:px-12 lg:min-h-[85vh] ${alt ? "bg-white/5" : "bg-transparent"
        }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(900px_400px_at_20%_50%,rgba(198,242,78,0.07),transparent_70%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left */}
        <div>
          <div className="flex flex-wrap items-center gap-2" data-row-fade>
            <span className="mono-label rounded-full border border-white/15 px-3 py-1">
              {project.category}
            </span>
            <span className="mono-label rounded-full border border-white/15 px-3 py-1">
              {project.year}
            </span>
          </div>
          <h3 className="mt-7 font-display text-[13vw] font-black italic leading-[0.86] tracking-tighter sm:text-[9vw] lg:text-[6.4vw] group-hover:transform transition-transform duration-500 group-hover:translate-x-6">
            {project.title.split(" ").map((w) => (
              <span key={w} className="block">
                <span data-row-line className="inline-block transition-colors duration-500 group-hover:text-primary">
                  {w}
                </span>
              </span>
            ))}
          </h3>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg" data-row-fade>
            {project.description}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2" data-row-fade>
            {project.technologies.map((t) => (
              <li key={t} className="mono-label">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative flex flex-col items-start gap-8 lg:items-end">
          <span
            data-row-number
            aria-hidden
            className="pointer-events-none select-none font-display text-[26vw] font-black leading-none tracking-tighter text-secondary-foreground/8 lg:text-[16vw]"
            style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.12)" }}
          >
            {project.number}
          </span>
          <div
            data-row-fade
            className="grid h-20 w-20 place-items-center rounded-full border border-white/12 bg-white/5 text-2xl text-primary transition-transform duration-500 group-hover:scale-110"
          >
            <Icon />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative bg-primary-foreground" aria-label="Projects">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12">
        <p className="mono-label mb-6">/ 04 &mdash; Selected</p>
        <h2 className="font-display text-5xl font-black italic uppercase leading-[0.95] tracking-tight md:text-7xl mb-10 md:mb-12">
          Recent <span className="text-primary">projects</span>.
        </h2>
      </div>
      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
