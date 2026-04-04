import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/landing/HeroSection";
import MockUiSection from "../components/landing/MockUiSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CtaSection from "../components/landing/CtaSection";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Header />
      <main
        id="overview"
        className="relative mx-auto flex w-full max-w-[1408px] flex-col items-center gap-24 overflow-x-hidden pb-24 pt-16 sm:gap-28 sm:pt-24 md:gap-32 md:pb-40"
      >
        <div
          className="pointer-events-none absolute right-0 top-[18%] h-96 w-96 rounded-full bg-[rgba(123,208,255,0.05)] blur-[50px]"
          aria-hidden
        />
        <HeroSection />
        <MockUiSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
