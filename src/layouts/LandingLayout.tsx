import { useCallback, useEffect, useRef, useState } from "react";
import Header, { type NavKey } from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/landing/HeroSection";
import MockUiSection from "../components/landing/MockUiSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CtaSection from "../components/landing/CtaSection";

const HEADER_OFFSET_PX = 96;
/** Ignore scroll-spy right after a nav click so it doesn't overwrite state mid–smooth-scroll. */
const SCROLL_SPY_LOCK_MS = 900;

const LandingLayout = () => {
  const [activeNav, setActiveNav] = useState<NavKey>("overview");
  const scrollSpyLockUntilRef = useRef(0);
  const syncActiveNavRef = useRef<() => void>(() => {});

  const navigateSection = useCallback((key: NavKey) => {
    scrollSpyLockUntilRef.current = Date.now() + SCROLL_SPY_LOCK_MS;
    setActiveNav(key);
    const id = key === "overview" ? "overview" : "resources";
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);

    window.setTimeout(() => {
      scrollSpyLockUntilRef.current = 0;
      syncActiveNavRef.current();
    }, SCROLL_SPY_LOCK_MS);
  }, []);

  useEffect(() => {
    const resourcesEl = document.getElementById("resources");
    if (!resourcesEl) return;

    const updateFromScroll = () => {
      if (Date.now() < scrollSpyLockUntilRef.current) return;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop < 12) {
        setActiveNav("overview");
        return;
      }
      const top = resourcesEl.getBoundingClientRect().top;
      setActiveNav(top <= HEADER_OFFSET_PX ? "resources" : "overview");
    };

    syncActiveNavRef.current = updateFromScroll;

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    window.addEventListener("scrollend", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      window.removeEventListener("scrollend", updateFromScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Header activeNav={activeNav} onNavigateSection={navigateSection} />
      <main className="relative mx-auto flex w-full max-w-[1408px] flex-col items-center gap-16 overflow-x-hidden pb-24 pt-16 sm:gap-20 sm:pt-20 md:gap-24 md:pb-32">
        <div
          className="pointer-events-none absolute right-0 top-[18%] h-96 w-96 rounded-full bg-[rgba(123,208,255,0.05)] blur-[50px]"
          aria-hidden
        />
        <section
          id="overview"
          className="flex w-full flex-col items-center gap-16 scroll-mt-24 sm:gap-20"
        >
          <HeroSection />
          <MockUiSection />
        </section>
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
