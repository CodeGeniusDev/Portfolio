import { useEffect, useRef } from "react";
import { achievements } from "@/data/projects";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

function Counter({ v }: { v: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    let anim: gsap.core.Tween | null = null;

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;

      const el = ref.current;
      if (!el) return;

      const obj = { n: 0 };
      anim = gs.to(obj, {
        n: v,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.n).toLocaleString();
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    };

    init();

    return () => {
      active = false;
      anim?.scrollTrigger?.kill();
      anim?.kill();
    };
  }, [v]);

  return <span ref={ref}>0</span>;
}

export function Achievements() {
  return (
    <section
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12"
      aria-label="Achievements"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {achievements.map((a) => (
          <div key={a.label} className="glass rounded-2xl p-4 md:p-6 lg:p-8">
            <div className="font-display font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none">
              <Counter v={a.value} />
              <span className="text-primary">+</span>
            </div>
            <div className="mono-label mt-3 md:mt-4 text-xs md:text-sm">
              {a.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
