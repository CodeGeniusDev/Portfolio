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
      className="group flex items-center justify-between border-t border-white/10 py-6 text-2xl md:text-4xl font-semibold hover:text-accent-lime transition-colors"
    >
      <span>{label}</span>
      <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
    </a>
  );
}

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>({ selector: "[data-c]", stagger: 0.08 });
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12" aria-label="Contact">
      <div ref={ref} className="max-w-5xl mx-auto glass rounded-3xl p-8 md:p-16">
        <p data-c className="mono-label mb-6">/ 05 &mdash; Contact</p>
        <h2 data-c className="font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl mb-6">
          Let&rsquo;s build something <span className="text-accent-lime">worth shipping</span>.
        </h2>
        <p data-c className="text-white/60 max-w-xl mb-12">
          Open to senior engineering roles, motion-heavy product work, and interesting collaborations.
        </p>
        <div data-c>
          {profile.socials.map((s) => <Social key={s.label} {...s} />)}
          <div className="border-b border-white/10" />
        </div>
      </div>
    </section>
  );
}
