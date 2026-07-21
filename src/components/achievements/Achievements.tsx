import { useEffect, useRef } from "react";
import { achievements } from "@/data/projects";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

function Counter({ v }: { v: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const anim = gsap.to(obj, {
      n: v,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString(); },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, [v]);
  return <span ref={ref}>0</span>;
}

export function Achievements() {
  return (
    <section className="relative py-32 px-6 md:px-12" aria-label="Achievements">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map((a) => (
          <div key={a.label} className="glass rounded-2xl p-8">
            <div className="font-display font-black text-5xl md:text-6xl leading-none">
              <Counter v={a.value} />
              <span className="text-accent-lime">+</span>
            </div>
            <div className="mono-label mt-4">{a.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
