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
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between mono-label">
          <span>{p.year}</span>
          <span className="text-accent-lime">Case Study</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold">{p.title}</h3>
        <p className="text-white/60 max-w-xl">{p.body}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="mono-label px-2 py-1 rounded border border-white/10">
                {t}
              </span>
            ))}
          </div>
          <a
            ref={cta}
            href="#"
            className="inline-flex items-center gap-1 rounded-full bg-white text-black px-4 py-2 text-xs font-bold"
          >
            View <FiArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const grid = useScrollReveal<HTMLDivElement>({ selector: "[data-project]", stagger: 0.1, y: 60 });
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="mono-label mb-6">/ 04 &mdash; Selected</p>
            <h2 className="font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl">
              Recent <span className="text-accent-lime">projects</span>.
            </h2>
          </div>
          <a href="#" className="mono-label hidden md:flex items-center gap-2 hover:text-accent-lime">
            All Work <FiArrowUpRight />
          </a>
        </div>
        <div ref={grid} className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
