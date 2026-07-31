"use client"
import {
  FiHome,
  FiUser,
  FiCode,
  FiAward,
  FiBriefcase,
  FiPlay,
  FiMail,
  FiZap,
  FiFileText,
  FiMoon,
} from "react-icons/fi";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { useRef, useState } from "react";
import { gsap } from "gsap";

const items = [
  { id: "home", icon: FiHome, label: "Home" },
  { id: "about", icon: FiUser, label: "About" },
  { id: "experience", icon: FiBriefcase, label: "Experience" },
  { id: "skills", icon: FiCode, label: "Skills" },
  { id: "projects", icon: FiAward, label: "Projects" },
  // { id: "youtube", icon: FiPlay, label: "YouTube" },
  { id: "contact", icon: FiMail, label: "Contact" },
  // { id: "hub", icon: FiZap, label: "Hub" },
  { id: "resume", icon: FiFileText, label: "Resume", href: "/resume.pdf", download: true, },
  // { id: "theme", icon: FiMoon, label: "Theme" },
];

function DockButton({
  Icon,
  label,
  id,
}: {
  Icon: typeof FiHome;
  label: string;
  id: string;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const showTooltip = () => {
    if (!tooltipRef.current) return;

    gsap.fromTo(
      tooltipRef.current,
      {
        opacity: 0,
        y: 10,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
      }
    );
  };

  const hideTooltip = () => {
    if (!tooltipRef.current) return;

    gsap.to(tooltipRef.current, {
      opacity: 0,
      y: 10,
      scale: 0.8,
      duration: 0.2,
      ease: "power3.in",
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <span
        ref={tooltipRef}
        className="
        z-100
  pointer-events-none
  absolute
  bottom-12
  left-1/2
  -translate-x-1/2
  opacity-0
  px-3
  py-1.5
  rounded-xl
  whitespace-nowrap
  text-xs
  font-medium
  backdrop-blur-xl
  bg-white/80
  text-black
  border border-white/30
  shadow-[0_8px_30px_rgba(0,0,0,0.15)]
"
      >
        {label}
      </span>

      <a
        ref={ref}
        href={id === "resume" ? "/resume.pdf" : `#${id}`}
        download={id === "resume"}
        target={id === "resume" ? "_blank" : undefined}
        rel={id === "resume" ? "noopener noreferrer" : undefined}
        aria-label={label}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="
    w-8 h-8 md:w-10 md:h-10
    rounded-full
    flex items-center justify-center
    text-white/70
    hover:text-black
    hover:bg-primary
    transition-colors
    flex-shrink-0
  "
      >
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </a>
    </div>
  );
}

export function Dock() {
  return (
    <nav
      aria-label="Section navigation"
      className="
    fixed bottom-4 md:bottom-6
    left-1/2 -translate-x-1/2
    z-40
    glass rounded-full
    px-2 md:px-3 py-1.5 md:py-2
    flex items-center gap-0.5 md:gap-1
    max-w-[90vw]
    overflow-none
  "
    >
      {items.map((it) => (
        <DockButton key={it.id} id={it.id} Icon={it.icon} label={it.label} />
      ))}
    </nav>
  );
}
