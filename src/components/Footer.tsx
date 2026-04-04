const Footer = () => {
  return (
    <footer className="w-full bg-[#05070a] px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1280px] border-t border-[rgba(30,41,59,0.3)] pt-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="pb-4 text-xl font-black tracking-tight text-[#cebdff]">
              Deepterview
            </p>
            <p className="text-xs uppercase tracking-[1.2px] text-[#64748b]">
              © 2026 Deepterview. The Midnight Observer Edition.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-10 gap-y-2"
            aria-label="Footer"
          >
            {(["Privacy", "Terms", "Support", "Contact"] as const).map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-xs uppercase tracking-[1.2px] text-[#475569] transition hover:text-[#94a3b8]"
                >
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
