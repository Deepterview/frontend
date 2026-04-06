import { useNavigate } from "react-router-dom";

export type NavKey = "overview" | "resources";

type HeaderProps = {
  activeNav: NavKey;
  onNavigateSection: (key: NavKey) => void;
};

const Header = ({ activeNav, onNavigateSection }: HeaderProps) => {
  const navigate = useNavigate();

  const navLinkClass = (key: NavKey) => {
    const base =
      "border-b-2 pb-1.5 text-sm font-medium tracking-wide transition-colors";
    if (activeNav === key) {
      return `${base} border-[#cebdff] text-[#cebdff]`;
    }
    return `${base} border-transparent text-[#94a3b8] hover:text-white`;
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full shrink-0 border-b border-[rgba(206,189,255,0.1)] bg-[rgba(2,6,23,0.6)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-[32px]">
      <div className="relative mx-auto flex h-full max-w-[1536px] items-center justify-between px-6 sm:px-8">
        <div className="shadow-[0_0_8px_0_rgba(206,189,255,0.4)]">
          <button className="text-xl font-bold tracking-tight text-[#cebdff] cursor-pointer">
            Deepterview
          </button>
        </div>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <a
            href="#overview"
            className={navLinkClass("overview")}
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection("overview");
            }}
          >
            Overview
          </a>
          <a
            href="#resources"
            className={navLinkClass("resources")}
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection("resources");
            }}
          >
            Resources
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-sm font-medium text-white transition hover:opacity-80 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full bg-purple-500 opacity-40 blur-xl"
              aria-hidden
            />
            <button
              type="button"
              className="relative z-10 rounded-full bg-[rgba(155,127,237,0.8)] px-6 py-2 text-sm font-medium text-[#31057e] transition hover:opacity-90 cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
