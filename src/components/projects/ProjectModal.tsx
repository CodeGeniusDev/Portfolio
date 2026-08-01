import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FiX, FiExternalLink, FiGithub, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { gsap, registerGsap } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import type { Project } from "@/data/projects";
import { useMagnetic } from "@/hooks/useMagneticEffect";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const backdrop = useRef<HTMLDivElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const cta = useMagnetic<HTMLAnchorElement>(0.2);
    const cta2 = useMagnetic<HTMLAnchorElement>(0.2);
    const cta3 = useMagnetic<HTMLAnchorElement>(0.2);
    const cta4 = useMagnetic<HTMLAnchorElement>(0.4);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKey);
        lockScroll();

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            unlockScroll();
        };
    }, [onClose]);

    useEffect(() => {
        const focusTarget = panel.current;
        focusTarget?.focus();
    }, []);

    useEffect(() => {
        let cancelled = false;
        let ctx: { revert: () => void } | undefined;

        const init = async () => {
            await registerGsap();
            if (cancelled) return;

            const gs = gsap;
            if (!gs || !backdrop.current || !panel.current) return;

            ctx = gs.context(() => {
                const tl = gs.timeline();
                tl.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
                    .fromTo(
                        panel.current,
                        { opacity: 0, scale: 0.96, y: 24 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" },
                        "-=0.2",
                    )
                    .from(
                        panel.current?.querySelectorAll("[data-reveal]") ?? [],
                        { opacity: 0, y: 24, duration: 0.5, stagger: 0.06, ease: "power3.out" },
                        "-=0.3",
                    );
            }, panel.current);
        };

        void init();

        return () => {
            cancelled = true;
            ctx?.revert();
        };
    }, []);

    const Icon = project.icon;

    const body = (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-8">
            <motion.div
                ref={backdrop}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.div
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
                tabIndex={-1}
                data-lenis-prevent
                style={{ WebkitOverflowScrolling: "touch" }}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[min(84vw,1000px)] max-h-[88vh] overflow-y-auto overscroll-contain scroll-smooth rounded-[28px] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] outline-none [&::-webkit-scrollbar]:hidden"
            >
                <a
                    ref={cta4}
                    onClick={onClose}
                    aria-label="Close project details"
                    data-cursor="hover"
                    className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white hover:text-black cursor-pointer focus:outline-none"
                >
                    <FiX />
                </a>

                <div className="p-7 md:p-12 lg:p-16">
                    <div className="flex flex-wrap items-center gap-3" data-reveal>
                        <span className="mono-label rounded-full border border-white/15 px-3 py-1">
                            {project.category}
                        </span>
                        <span className="mono-label rounded-full border border-white/15 px-3 py-1 text-primary">
                            {project.year}
                        </span>
                    </div>

                    <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                        <div>
                            <h2
                                data-reveal
                                className="font-display text-5xl font-black italic leading-[0.92] tracking-tight md:text-7xl"
                            >
                                {project.title}
                            </h2>
                            <p data-reveal className="mt-6 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
                                {project.longDescription}
                            </p>
                        </div>

                        <div data-reveal className="space-y-4">
                            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="mono-label text-white/55">Premium Case Study</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    Production-grade experience with a cinematic reveal, tactile micro-interactions, and polished
                                    motion language.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-2 md:gap-16">
                        <div data-reveal>
                            <h3 className="mono-label mb-5 text-white/80">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/10"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div data-reveal>
                            <h3 className="mono-label mb-5 text-white/80">Key Highlights</h3>
                            <ul className="space-y-3">
                                {project.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-3 text-white/70">
                                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] text-black">
                                            <FiCheck />
                                        </span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div data-reveal className="mt-12 flex flex-col gap-x-10 gap-y-4 border-t border-white/10 pt-12 sm:flex-row">
                        <a
                            ref={cta}
                            href={project.liveUrl}
                            data-cursor="hover"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-black"
                        >
                            <FiExternalLink /> Live Demo
                        </a>
                        <a
                            ref={cta2}
                            href={project.githubUrl}
                            data-cursor="hover"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-bold bg-secondary-foreground text-black"
                        >
                            <FiGithub /> Source Code
                        </a>
                        {/* <a
                            ref={cta3}
                            href={project.caseStudyUrl}
                            data-cursor="hover"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-bold text-white hover:scale-[1.02] hover:bg-white hover:text-black"
                        >
                            <Icon /> Case Study <FiArrowUpRight />
                        </a> */}
                    </div>
                </div>
            </motion.div>
        </div>
    );

    if (typeof document === "undefined") return null;
    return createPortal(body, document.body);
}
