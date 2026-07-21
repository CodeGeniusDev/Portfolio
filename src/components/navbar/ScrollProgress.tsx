import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const s = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? s / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
      <div className="h-full bg-accent-lime" style={{ width: `${p * 100}%` }} />
    </div>
  );
}
