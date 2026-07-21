import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function useParallax<T extends HTMLElement>(amount = 80) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = gsap.to(el, {
      yPercent: amount > 0 ? -10 : 10,
      y: -amount,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, [amount]);
  return ref;
}
