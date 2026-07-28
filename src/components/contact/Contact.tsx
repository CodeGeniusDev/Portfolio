import { profile } from "@/data/profile";
import { useMagnetic } from "@/hooks/useMagneticEffect";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FiArrowUpRight } from "react-icons/fi";

function Social({ label, href }: { label: string; href: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <a
      ref={ref}
      href={href}
      className="group flex items-center justify-between border-t border-white/10 py-4 md:py-6 text-xl md:text-2xl lg:text-4xl font-semibold hover:text-primary transition-colors"
    >
      <span className="text-base md:text-xl lg:text-2xl xl:text-4xl">
        {label}
      </span>
      <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 w-5 h-5 md:w-6 md:h-6" />
    </a>
  );
}

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-c]",
    stagger: 0.08,
  });
  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12"
      aria-label="Contact"
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto glass rounded-3xl p-6 md:p-8 lg:p-16"
      >
        <p data-c className="mono-label mb-4 md:mb-6">
          / 05 &mdash; Contact
        </p>
        <h2
          data-c
          className="font-display font-black leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6"
        >
          Let&rsquo;s build something{" "}
          <span className="text-primary">worth shipping</span>.
        </h2>
        <p
          data-c
          className="text-white/60 max-w-xl mb-8 md:mb-12 text-sm md:text-base"
        >
          Open to senior engineering roles, motion-heavy product work, and
          interesting collaborations.
        </p>
        <div data-c>
          {profile.socials.map((s) => (
            <Social key={s.label} {...s} />
          ))}
          <div className="border-b border-white/10" />
        </div>
      </div>
    </section>
  );
}
