import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let active = true;
    let gs: typeof import("gsap") | undefined;
    const raf = (t: number) => {
      if (lenis) lenis.raf(t * 1000);
    };

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      gs = gsap;
      const scrollTrigger = ScrollTrigger;
      if (!active || !gs || !scrollTrigger) return;

      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", scrollTrigger.update);
      gs.ticker.add(raf);
      gs.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      active = false;
      if (gs) gs.ticker.remove(raf);
      if (lenis) lenis.destroy();
    };
  }, []);
}
