import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function useSplitChars<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const text = el.textContent ?? "";
    el.innerHTML = "";
    const chars: HTMLSpanElement[] = [];
    for (const ch of text) {
      const wrap = document.createElement("span");
      wrap.style.display = "inline-block";
      wrap.style.overflow = "hidden";
      wrap.style.verticalAlign = "bottom";
      wrap.style.lineHeight = "0.95";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.willChange = "transform";
      inner.textContent = ch === " " ? "\u00A0" : ch;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      chars.push(inner);
    }
    gsap.from(chars, {
      yPercent: 110,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.03,
      delay,
    });
  }, [delay]);
  return ref;
}
