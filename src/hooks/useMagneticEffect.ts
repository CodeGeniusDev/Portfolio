import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | null = null;
    const el = ref.current;
    if (!el) return;

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gs.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gs.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };

      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", reset);

      cleanup = () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", reset);
      };
    };

    init();

    return () => {
      active = false;
      cleanup?.();
    };
  }, [strength]);

  return ref;
}
