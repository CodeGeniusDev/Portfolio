import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll-lock";

export function useLenis() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let active = true;

    const raf = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const init = async () => {
      if (typeof window === "undefined") return;

      await registerGsap();
      if (!active) return;

      const gs = gsap;
      const st = ScrollTrigger;
      if (!gs || !st) return;

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      setLenis(lenis);

      lenis.on("scroll", () => st.update());

      gs.ticker.add(raf);
      gs.ticker.lagSmoothing(0);
    };

    void init();

    return () => {
      active = false;
      if (gsap) {
        gsap.ticker.remove(raf);
      }

      if (lenis) {
        setLenis(null);
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);
}