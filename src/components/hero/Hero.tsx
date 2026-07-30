import { useEffect, useState, useRef } from "react";
import portrait from "@/assets/5.png";
import portrait2 from "@/assets/3.png";
import { profile, skillBars } from "@/data/profile";
import { useSplitChars } from "@/hooks/useSplitText";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { FiArrowUpRight, FiMapPin, FiClock } from "react-icons/fi";
import { gsap, registerGsap } from "@/lib/gsap";

function useIstTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
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
  const [currentImage, setCurrentImage] = useState(1);
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 1 ? 2 : 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    let pieces: HTMLDivElement[] = [];

    const init = async () => {
      if (typeof window === "undefined") return;
      await registerGsap();
      const gs = gsap;
      if (!active || !gs) return;
      if (!containerRef.current) return;

      const container = containerRef.current;
      const outgoingImage =
        currentImage === 1 ? imageRef1.current : imageRef2.current;

      if (!outgoingImage) return;

      const imageRect = outgoingImage.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeLeft = imageRect.left - containerRect.left;
      const relativeTop = imageRect.top - containerRect.top;

      container.querySelectorAll(".crack-piece").forEach((crack) => crack.remove());

      const numPieces = 8;
      for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement("div");
        piece.className = "crack-piece absolute overflow-hidden";
        const yPos = (i / numPieces) * 100;
        const height = (1 / numPieces) * 100;

        piece.style.clipPath = `polygon(0 ${yPos}%, 100% ${yPos}%, 100% ${yPos + height}%, 0 ${yPos + height}%)`;
        piece.style.left = `${relativeLeft}px`;
        piece.style.top = `${relativeTop}px`;
        piece.style.width = `${imageRect.width}px`;
        piece.style.height = `${imageRect.height}px`;

        const imgClone = outgoingImage.cloneNode(true) as HTMLImageElement;
        imgClone.className =
          "absolute left-0 top-0 h-full w-full object-contain grayscale pointer-events-none";
        imgClone.style.transform = "none";
        imgClone.style.maskImage =
          "linear-gradient(to bottom, black 78%, transparent 100%)";

        piece.appendChild(imgClone);
        container.appendChild(piece);
        pieces.push(piece);
      }

      gs.to(pieces, {
        x: () => gs.utils.random(-30, 30),
        y: () => gs.utils.random(-20, 20),
        rotation: () => gs.utils.random(-5, 5),
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          pieces.forEach((piece) => piece.remove());
        },
      });
    };

    init();
    return () => {
      active = false;
      pieces.forEach((piece) => piece.remove());
    };
  }, [currentImage]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* ghost wordmark */}
      <div className="pointer-events-none absolute inset-x-0 top-[46%] flex justify-center">
        <span
          className="font-display font-black uppercase leading-none tracking-tighter select-none text-center px-4"
          style={{
            fontSize: "clamp(2rem, 10vw, 20rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          }}
        >
          FULL STACK DEVELOPER • UI/UX DESIGNER • AI PRODUCT BUILDER
        </span>
      </div>

      {/* portrait */}
      <div
        ref={containerRef}
        className="absolute left-1/2 z-20 -translate-x-1/2 top-[6%] h-[60%] md:h-[80%] w-full max-w-[400px] md:max-w-[600px] pointer-events-none"
      >
        <img
          ref={imageRef1}
          src={portrait}
          loading="eager"
          alt=""
          aria-hidden
          width={1280}
          height={1600}
          className={`absolute left-1/2 -translate-x-1/2 h-full w-auto object-contain grayscale pointer-events-none transition-opacity duration-500 ${currentImage === 1 ? "opacity-100" : "opacity-0"}`}
          style={{
            maskImage:
              "linear-gradient(to bottom, black 78%, transparent 100%)",
          }}
        />
        <img
          ref={imageRef2}
          src={portrait2}
          loading="eager"
          alt=""
          aria-hidden
          width={1280}
          height={1600}
          className={`absolute left-1/2 -translate-x-1/2 h-full w-auto object-contain grayscale pointer-events-none transition-opacity duration-500 ${currentImage === 2 ? "opacity-100" : "opacity-0"}`}
          style={{
            maskImage:
              "linear-gradient(to bottom, black 78%, transparent 100%)",
          }}
        />
      </div>

      {/* name headline */}
      <div className="relative z-10 pt-32 md:pt-40 text-center px-4">
        <h1
          className="font-display font-black uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
        >
          <span ref={first} className="block">
            {profile.firstName}
          </span>
          <span ref={last} className="block">
            {profile.lastName}
          </span>
        </h1>
      </div>

      {/* left telemetry card */}
      <div className="absolute left-4 md:left-8 bottom-[28%] md:bottom-[22%] z-10 w-[240px] md:w-[280px] glass rounded-xl p-3 md:p-4">
        <div className="flex items-center justify-between mono-label">
          <span>
            Telemetry <span className="text-white/25">/</span>{" "}
            <span className="text-primary">Active</span>
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </span>
        </div>
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-base md:text-lg font-semibold">
          <FiMapPin className="text-primary" />
          {profile.location}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs md:text-sm text-white/60">
          <FiClock /> {time || "--:-- --"} {profile.timezone}
        </div>
      </div>

      {/* right tech specs card */}
      <div className="absolute right-4 md:right-8 bottom-[28%] md:bottom-[22%] z-10 w-[240px] md:w-[300px] glass rounded-xl p-3 md:p-4">
        <div className="flex items-center justify-between mono-label">
          <span>
            Tech Specs <span className="text-white/25">/</span> Load
          </span>
          <span className="text-primary">◆</span>
        </div>
        <div className="mt-4 space-y-3">
          {skillBars.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-xs font-semibold">
                <span>{s.name}</span>
                <span className="text-white/60">{s.value}%</span>
              </div>
              <div className="mt-1 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${s.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="absolute left-4 md:left-8 bottom-[16%] md:bottom-[10%] z-10">
        <a
          ref={cta}
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-black px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold"
        >
          START ENGINE <FiArrowUpRight />
        </a>
      </div>
      <div className="absolute right-4 md:right-8 bottom-[16%] md:bottom-[10%] z-10">
        <a
          href="#projects"
          className="mono-label flex items-center gap-2 hover:text-primary text-xs md:text-sm"
        >
          Project Gallery <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
}
