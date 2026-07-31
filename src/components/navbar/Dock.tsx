"use client";

import {
  FiHome,
  FiUser,
  FiCode,
  FiAward,
  FiBriefcase,
  FiMail,
  FiFileText,
  FiMoon,
  FiPlay,
  FiZap,
} from "react-icons/fi";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import type { IconType } from "react-icons";

type DockItem = {
  icon: IconType;
  label: string;
  id: string;
  href?: string;
  download?: boolean;
  external?: boolean;
};

const items: DockItem[] = [
  { id: "home", icon: FiHome, label: "Home" },
  { id: "about", icon: FiUser, label: "About" },
  { id: "experience", icon: FiBriefcase, label: "Experience" },
  { id: "skills", icon: FiCode, label: "Skills" },
  { id: "projects", icon: FiAward, label: "Projects" },
  { id: "contact", icon: FiMail, label: "Contact" },
  { id: "resume", icon: FiFileText, label: "Resume", href: "/resume.pdf", download: true },
  // { id: "youtube", icon: FiPlay, label: "YouTube" },
  // { id: "hub", icon: FiZap, label: "Hub" },
  // { id: "theme", icon: FiMoon, label: "Theme" },
];

function DockButton({
  icon: Icon,
  label,
  id,
  href,
  download,
  external,
}: DockItem) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);

  const isResume = id === "resume";
  const linkHref = href ?? `#${id}`;

  return (
    <div className="group relative flex items-center justify-center overflow-visible">
      <span
        className="
          pointer-events-none
          absolute
          bottom-12
          left-1/2
          -translate-x-1/2
          z-[9999]
          whitespace-nowrap
          rounded-xl
          border border-white/30
          bg-white/80
          px-3
          py-1.5
          text-xs
          font-medium
          text-black
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          backdrop-blur-xl
          opacity-0
          scale-90
          translate-y-2
          transition-all
          duration-200
          ease-out
          group-hover:opacity-100
          group-hover:scale-100
          group-hover:translate-y-0
          group-focus-within:opacity-100
          group-focus-within:scale-100
          group-focus-within:translate-y-0
        "
      >
        {label}
      </span>

      <a
        ref={ref}
        href={linkHref}
        download={download}
        target={external ? "_blank" : isResume ? "_blank" : undefined}
        rel={external || isResume ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="
          flex w-9 h-9 flex-shrink-0 items-center justify-center
          rounded-full
          text-white/70
          transition-colors
          hover:bg-primary hover:text-black
          md:h-10 md:w-10
        "
      >
        <Icon className="h-5 w-5 md:h-4 md:w-4" />
      </a>
    </div>
  );
}

export function Dock() {
  return (
    <nav
      aria-label="Section navigation"
      className="
        fixed bottom-4 left-1/2 z-40
        flex max-w-[90vw] items-center gap-0.5 overflow-visible
        rounded-full glass px-2 py-1.5
        -translate-x-1/2 md:bottom-6 md:gap-1 md:px-3 md:py-2
      "
    >
      {items.map((it) => (
        <DockButton
          key={it.id}
          id={it.id}
          icon={it.icon}
          label={it.label}
          href={it.href}
          download={it.download}
          external={it.external}
        />
      ))}
    </nav>
  );
}