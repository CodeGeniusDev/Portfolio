import { FiHome, FiUser, FiCode, FiAward, FiBriefcase, FiPlay, FiMail, FiZap, FiFileText, FiMoon } from "react-icons/fi";
import { useMagnetic } from "@/hooks/useMagneticEffect";

const items = [
  { id: "home", icon: FiHome, label: "Home" },
  { id: "about", icon: FiUser, label: "About" },
  { id: "skills", icon: FiCode, label: "Skills" },
  { id: "experience", icon: FiBriefcase, label: "Experience" },
  { id: "projects", icon: FiAward, label: "Projects" },
  { id: "youtube", icon: FiPlay, label: "YouTube" },
  { id: "contact", icon: FiMail, label: "Contact" },
  { id: "hub", icon: FiZap, label: "Hub" },
  { id: "resume", icon: FiFileText, label: "Resume" },
  { id: "theme", icon: FiMoon, label: "Theme" },
];

function DockButton({ Icon, label, id }: { Icon: typeof FiHome; label: string; id: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  return (
    <a
      ref={ref}
      href={`#${id}`}
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-black hover:bg-accent-lime transition-colors"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

export function Dock() {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-3 py-2 flex items-center gap-1"
    >
      {items.map((it) => (
        <DockButton key={it.id} id={it.id} Icon={it.icon} label={it.label} />
      ))}
    </nav>
  );
}
