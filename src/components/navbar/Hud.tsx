import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useMagnetic } from "@/hooks/useMagneticEffect";

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour12: false });
    setT(fmt());
    const i = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(i);
  }, []);
  return <span>{t || "--:--:--"}</span>;
}

export function Hud() {
  const cta = useMagnetic<HTMLAnchorElement>(0.4);
  return (
    <>
      {/* top-left monogram */}
      <div className="fixed top-4 left-4 md:top-5 md:left-6 z-40 flex items-center gap-2">
        <a ref={cta} href="/">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center font-bold text-[13px] md:text-[15px] text-black">
            {/* {profile.monogram} */}
            <img
              src="/favicon.ico"
              alt="Portfolio logo icon for Abdullah Abbad"
              loading="eager"
              fetchPriority="high"
              className="w-7 h-7 md:w-9 md:h-9"
            />
          </div>
        </a>
      </div>
      {/* top-right role */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 md:top-4 z-40 mono-label hidden sm:block w-max max-w-[90vw] text-center text-[10px] md:text-xs text-white/50">
        {profile.role}
      </div>
      {/* bottom-left location */}
      <div className="fixed hidden bottom-20 left-4 md:bottom-4 md:left-6 z-40 mono-label md:flex items-center gap-2 text-[10px] md:text-xs">
        {/* <span className="w-1.5 h-1.5 rounded-full bg-primary" /> */}
        <span>{profile.location}</span>
        <span className="text-white/25">/</span>
        <Clock />
      </div>
      {/* bottom-right local */}
      {/* <div className="fixed bottom-20 right-4 md:bottom-4 md:right-8 z-40 mono-label hidden sm:flex items-center gap-2 text-[10px] md:text-xs">
        <span>LOCAL</span>
        <span className="text-white/25">/</span>
        <Clock />
      </div> */}
    </>
  );
}
