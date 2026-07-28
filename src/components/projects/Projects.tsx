import { useRef } from "react";
import { projects } from "@/data/projects";
import { FiArrowUpRight } from "react-icons/fi";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function Card({ p }: { p: (typeof projects)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cta = useMagnetic<HTMLAnchorElement>(0.35);
  return (
    <div
      ref={cardRef}
      data-project
      data-cursor="hover"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
    >
      <div className="aspect-16/10 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between mono-label text-xs md:text-sm">
          <span>{p.year}</span>
          <span className="text-primary">Case Study</span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {p.title}
        </h3>
        <p className="text-white/60 max-w-xl text-sm md:text-base">{p.body}</p>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 mt-2">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="mono-label px-1.5 md:px-2 py-0.5 md:py-1 rounded border border-white/10 text-xs md:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            ref={cta}
            href="#"
            className="inline-flex items-center gap-1 rounded-full bg-white text-black px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold self-start md:self-auto"
          >
            View <FiArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const grid = useScrollReveal<HTMLDivElement>({
    selector: "[data-project]",
    stagger: 0.1,
    y: 60,
  });
  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12"
      aria-label="Projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <p className="mono-label mb-4 md:mb-6">/ 04 &mdash; Selected</p>
            <h2 className="font-display font-black leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-7xl">
              Recent <span className="text-primary">projects</span>.
            </h2>
          </div>
          <a
            href="#"
            className="mono-label hidden md:flex items-center gap-2 hover:text-primary"
          >
            All Work <FiArrowUpRight />
          </a>
        </div>
        <div
          ref={grid}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {projects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
