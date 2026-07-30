import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function useParallax<T extends HTMLElement>(amount = 80) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    let active = true;
    let anim: gsap.core.Tween | null = null;

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      const gs = gsap;
      const scrollTrigger = ScrollTrigger;
      if (!active || !gs || !scrollTrigger) return;

      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      anim = gs.to(el, {
        yPercent: amount > 0 ? -10 : 10,
        y: -amount,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    };

    init();

    return () => {
      active = false;
      anim?.scrollTrigger?.kill();
      anim?.kill();
    };
  }, [amount]);

  return ref;
}
