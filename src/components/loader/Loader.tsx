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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-4 px-4">
            <div className="flex gap-2 md:gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-11 md:h-11 rounded-lg flex items-center justify-center"
                  style={{
                    background: i < filled ? "var(--primary-foreground)" : "var(--primary-foreground)",
                    boxShadow:
                      i < filled ? "0 0 24px rgba(155, 194, 45, 0.6)" : "none",
                  }}
                >
                  <span
                    className="w-4 h-4 md:w-6 md:h-6 rounded-full transition-colors"
                    style={{ background: i < filled ? "var(--primary)" : "var(--primary-foreground)" }}
                  />
                </div>
              ))}
            </div>
            <p className="mono-label text-black/50 text-xs md:text-sm">
              Initializing Telemetry...
            </p>
          </div>
          <div className="absolute bottom-6 right-4 md:bottom-8 md:right-10 flex flex-col items-end">
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(3rem, 12vw, 14rem)" }}
            >
              {pct}%
            </span>
            <span
              className="mono-label mt-2 text-xs md:text-sm"
              style={{ color: "#7cae1c" }}
            >
              System Check
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
