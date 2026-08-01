import { skills } from "@/data/skills";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Skills() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-skill]",
    stagger: 0.04,
    y: 30,
  });
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-card"
      aria-label="Skills"
    >
      <div className="max-w-7xl mx-auto">
        <p className="mono-label mb-4 md:mb-6">/ 03 &mdash; Stack</p>
        <h2 className="font-display text-5xl font-black italic uppercase leading-[0.95] tracking-tight md:text-7xl mb-12 md:mb-16">
          Tools of the <span className="text-primary">craft</span>.
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {skills.map((s) => (
            <div
              key={s.name}
              data-skill
              data-cursor="hover"
              className="group relative glass rounded-xl p-4 md:p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mono-label mb-4 md:mb-8 text-xs md:text-sm">
                {s.tag}
              </div>
              <div className="text-xl md:text-2xl font-bold">{s.name}</div>
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  boxShadow:
                    "inset 0 0 40px rgb(155, 194, 45, 0.15), 0 20px 40px -20px rgb(155, 194, 45, 0.35)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
