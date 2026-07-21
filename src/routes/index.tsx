import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { useLenis } from "@/hooks/useLenis";
import { Loader } from "@/components/loader/Loader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Hud } from "@/components/navbar/Hud";
import { Dock } from "@/components/navbar/Dock";
import { ScrollProgress } from "@/components/navbar/ScrollProgress";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Achievements } from "@/components/achievements/Achievements";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const hydrated = useHydrated();
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <div className="relative bg-[#050505] text-white overflow-x-clip">
      {hydrated && !loaded && <Loader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <Hud />
      <Dock />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
