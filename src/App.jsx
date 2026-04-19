import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, motion, useScroll } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import BootLoader from "./components/ui/BootLoader.jsx";
import GrainOverlay from "./components/ui/GrainOverlay.jsx";
import { useAppBootReady } from "./hooks/useAppBootReady.js";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import TechStack from "./components/sections/TechStack.jsx";
import Experience from "./components/sections/Experience.jsx";
import Projects from "./components/sections/Projects.jsx";
import Contact from "./components/sections/Contact.jsx";

const GitHub = lazy(() => import("./components/sections/GitHub.jsx"));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
    />
  );
}

export default function App() {
  const bootReady = useAppBootReady();
  const skipBootLoader =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [showBoot, setShowBoot] = useState(!skipBootLoader);
  const [scrollLocked, setScrollLocked] = useState(!skipBootLoader);

  useEffect(() => {
    if (bootReady) setShowBoot(false);
  }, [bootReady]);

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollLocked]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence onExitComplete={() => setScrollLocked(false)}>
        {showBoot && <BootLoader key="boot-overlay" />}
      </AnimatePresence>
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Suspense
          fallback={
            <section className="section-padding">
              <div className="container-tight">
                <div className="h-64 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40" />
              </div>
            </section>
          }
        >
          <GitHub />
        </Suspense>
        <Contact />
      </main>
    </LazyMotion>
  );
}
