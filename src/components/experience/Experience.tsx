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
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        }),
      );
    });

    return () => {
      fill.scrollTrigger?.kill();
      fill.kill();
      anims.forEach((a) => {
        a.scrollTrigger?.kill();
        a.kill();
      });
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12"
      aria-label="Experience"
    >
      <div className="max-w-6xl mx-auto">
        <p className="mono-label mb-4 md:mb-6">/ 02 &mdash; Experience</p>
        <h2 className="font-display font-black leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-7xl mb-12 md:mb-16">
          A <span className="text-primary">timeline</span> of work.
        </h2>

        <div ref={rootRef} className="relative pl-6 md:pl-8 lg:pl-24">
          <div className="absolute left-2 md:left-3 lg:left-10 top-0 bottom-0 w-px bg-white/10" />
          <div
            ref={lineRef}
            className="absolute left-2 md:left-3 lg:left-10 top-0 bottom-0 w-px bg-primary origin-top"
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12 md:space-y-16">
            {experience.map((e) => (
              <div key={e.company} data-tl-card className="relative">
                <span className="absolute -left-5 md:-left-8 lg:-left-15.5 top-2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary ring-4 ring-black" />
                <div className="glass rounded-xl p-4 md:p-6 lg:p-8">
                  <div className="flex justify-between mono-label mb-2 md:mb-3">
                    <span className="text-xs md:text-sm">{e.company}</span>
                    <span className="text-primary text-xs md:text-sm">
                      {e.period}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
                    {e.role}
                  </h3>
                  <p className="text-white/70 mb-3 md:mb-4 max-w-2xl text-sm md:text-base">
                    {e.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="mono-label px-1.5 md:px-2 py-0.5 md:py-1 rounded border border-white/10 text-xs md:text-sm"
                      >
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
