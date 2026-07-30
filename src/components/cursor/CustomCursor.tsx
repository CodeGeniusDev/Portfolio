import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let active = true;
    let moveHandler: ((e: MouseEvent) => void) | null = null;
    let overHandler: ((e: MouseEvent) => void) | null = null;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const dx = gs.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
      const dy = gs.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
      const rx = gs.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
      const ry = gs.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

      moveHandler = (e: MouseEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };

      overHandler = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        setHover(!!t.closest("a,button,[data-cursor='hover']"));
      };

      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseover", overHandler);
    };

    init();

    return () => {
      active = false;
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
      if (overHandler) window.removeEventListener("mouseover", overHandler);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] w-1.5 h-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-[width,height,background-color,border-color] duration-200"
        style={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          background: hover ? "rgb(155, 194, 45, 0.15)" : "transparent",
          borderColor: hover ? "var(--primary)" : "rgba(255,255,255,0.35)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
