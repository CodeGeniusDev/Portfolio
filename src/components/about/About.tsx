import portrait from "@/assets/3.png";
import { profile } from "@/data/profile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

export function About() {
  const textRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });
  const imgRef = useParallax<HTMLDivElement>(120);
  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-12"
      aria-label="About"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div
          ref={imgRef}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
        >
          <img
            src={portrait}
            alt="Portrait"
            loading="lazy"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div ref={textRef}>
          <p data-reveal className="mono-label mb-6">
            / 01 &mdash; About
          </p>
          <h2
            data-reveal
            className="font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl mb-8"
          >
            Engineer <span className="text-accent-lime">building</span> quiet,
            precise interfaces.
          </h2>
          {profile.bio.map((p, i) => (
            <p
              key={i}
              data-reveal
              className="text-white/70 text-lg leading-relaxed mb-4"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
