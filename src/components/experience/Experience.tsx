import { useEffect, useRef } from "react";
import { experience } from "@/data/experience";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const fill = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      },
    );

    const cards = root.querySelectorAll("[data-tl-card]");
    const anims: gsap.core.Tween[] = [];
    cards.forEach((c) => {
      anims.push(
        gsap.from(c, {
          y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        }),
      );
    });

    return () => {
      fill.scrollTrigger?.kill(); fill.kill();
      anims.forEach((a) => { a.scrollTrigger?.kill(); a.kill(); });
    };
  }, []);

  return (
    <section id="experience" className="relative py-32 px-6 md:px-12" aria-label="Experience">
      <div className="max-w-6xl mx-auto">
        <p className="mono-label mb-6">/ 02 &mdash; Experience</p>
        <h2 className="font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl mb-16">
          A <span className="text-accent-lime">timeline</span> of work.
        </h2>

        <div ref={rootRef} className="relative pl-8 md:pl-24">
          <div className="absolute left-3 md:left-10 top-0 bottom-0 w-px bg-white/10" />
          <div
            ref={lineRef}
            className="absolute left-3 md:left-10 top-0 bottom-0 w-px bg-accent-lime origin-top"
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-16">
            {experience.map((e) => (
              <div key={e.company} data-tl-card className="relative">
                <span className="absolute -left-8 md:-left-[62px] top-2 w-3 h-3 rounded-full bg-accent-lime ring-4 ring-black" />
                <div className="glass rounded-xl p-6 md:p-8">
                  <div className="flex justify-between mono-label mb-3">
                    <span>{e.company}</span>
                    <span className="text-accent-lime">{e.period}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{e.role}</h3>
                  <p className="text-white/70 mb-4 max-w-2xl">{e.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="mono-label px-2 py-1 rounded border border-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
