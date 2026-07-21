import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setHide(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const filled = Math.floor(pct / 20);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!hide && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[100] bg-white text-black"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{
                    background: i < filled ? "#0d0d0d" : "#0d0d0d",
                    boxShadow: i < filled ? "0 0 24px rgba(198,242,78,0.6)" : "none",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full transition-colors"
                    style={{ background: i < filled ? "#c6f24e" : "#1a1a1a" }}
                  />
                </div>
              ))}
            </div>
            <p className="mono-label text-black/50">Initializing Telemetry...</p>
          </div>
          <div className="absolute bottom-8 right-10 flex flex-col items-end">
            <span className="font-display font-bold leading-none" style={{ fontSize: "clamp(6rem, 14vw, 14rem)" }}>
              {pct}%
            </span>
            <span className="mono-label mt-2" style={{ color: "#7cae1c" }}>System Check</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
