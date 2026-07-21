import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function useScrollReveal<T extends HTMLElement>(
  opts: { y?: number; stagger?: number; selector?: string; delay?: number } = {},
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const targets = opts.selector ? el.querySelectorAll(opts.selector) : [el];
    const anim = gsap.from(targets, {
      y: opts.y ?? 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [opts.y, opts.stagger, opts.selector, opts.delay]);
  return ref;
}
