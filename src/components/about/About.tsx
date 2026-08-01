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
      className="relative py-20 md:py-32 px-4 md:px-6 lg:px-12 bg-card"
      aria-label="About"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div
          ref={imgRef}
          className="relative aspect-4/5 md:aspect-3/4 overflow-hidden rounded-2xl border border-white/10 order-2 md:order-1"
        >
          <img
            src={portrait}
            alt="Portrait of Abdullah Abbad in a grayscale profile image"
            loading="lazy"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>
        <div ref={textRef} className="order-1 md:order-2">
          <p data-reveal className="mono-label mb-4 md:mb-6">
            / 01 &mdash; About
          </p>
          <h2
            data-reveal
            className="font-display text-5xl font-black italic uppercase leading-[0.95] tracking-tight md:text-7xl mb-6 md:mb-8"
          >
            Engineer <span className="text-primary">building</span> quiet,
            precise interfaces.
          </h2>
          {profile.bio.map((p, i) => (
            <p
              key={i}
              data-reveal
              className="text-white/70 text-base md:text-lg leading-relaxed mb-4"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
