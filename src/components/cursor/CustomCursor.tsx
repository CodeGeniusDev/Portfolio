import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
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
          background: hover ? "rgba(198,242,78,0.15)" : "transparent",
          borderColor: hover ? "#c6f24e" : "rgba(255,255,255,0.35)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
