import { useEffect, useState } from "react";
import portrait from "@/assets/3.png";
import { profile, skillBars } from "@/data/profile";
import { useSplitChars } from "@/hooks/useSplitText";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { FiArrowUpRight, FiMapPin, FiClock } from "react-icons/fi";

function useIstTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", hour12: true,
      });
    setT(fmt());
    const i = setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(i);
  }, []);
  return t;
}

export function Hero() {
  const first = useSplitChars<HTMLSpanElement>(0.1);
  const last = useSplitChars<HTMLSpanElement>(0.25);
  const cta = useMagnetic<HTMLAnchorElement>(0.4);
  const time = useIstTime();

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden" aria-label="Hero">
      {/* ghost wordmark */}
      <div className="pointer-events-none absolute inset-x-0 top-[46%] flex justify-center">
        <span
          className="font-display font-black uppercase leading-none tracking-tighter select-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 20rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          }}
        >
          BACKEND / FULL
        </span>
      </div>

      {/* portrait */}
      <img
        src={portrait}
        alt=""
        aria-hidden
        width={1280}
        height={1600}
        className="absolute left-1/2 z-20 -translate-x-1/2 top-[6%] h-[80%] w-auto object-contain grayscale opacity-100 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)" }}
      />

      {/* name headline */}
      <div className="relative z-10 pt-40 md:pt-32 text-center px-4">
        <h1
          className="font-display font-black uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
        >
          <span ref={first} className="block">{profile.firstName}</span>
          <span ref={last} className="block">{profile.lastName}</span>
        </h1>
      </div>

      {/* left telemetry card */}
      <div className="absolute left-4 md:left-8 bottom-[22%] z-10 w-[280px] glass rounded-xl p-4">
        <div className="flex items-center justify-between mono-label">
          <span>Telemetry <span className="text-white/25">/</span> <span className="text-accent-lime">Active</span></span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
          <FiMapPin className="text-accent-lime" />
          {profile.location}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
          <FiClock /> {time || "--:-- --"} {profile.timezone}
        </div>
      </div>

      {/* right tech specs card */}
      <div className="absolute right-4 md:right-8 bottom-[22%] z-10 w-[300px] glass rounded-xl p-4">
        <div className="flex items-center justify-between mono-label">
          <span>Tech Specs <span className="text-white/25">/</span> Load</span>
          <span className="text-accent-lime">◆</span>
        </div>
        <div className="mt-4 space-y-3">
          {skillBars.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-xs font-semibold">
                <span>{s.name}</span>
                <span className="text-white/60">{s.value}%</span>
              </div>
              <div className="mt-1 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent-lime" style={{ width: `${s.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="absolute left-4 md:left-8 bottom-[10%] z-10">
        <a
          ref={cta}
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-black px-6 py-3 text-sm font-bold"
        >
          START ENGINE <FiArrowUpRight />
        </a>
      </div>
      <div className="absolute right-4 md:right-8 bottom-[10%] z-10">
        <a href="#projects" className="mono-label flex items-center gap-2 hover:text-accent-lime">
          Project Gallery <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
}
