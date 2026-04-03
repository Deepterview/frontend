const Header = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 border-b border-white/10">
      {/* Logo */}
      <button className="text-[#CEBDFF] text-xl font-bold tracking-tight">
        Deepterview
      </button>

      {/* Menu */}
      <div className="flex items-center gap-8 text-sm font-medium">
        <button className="text-[#CEBDFF] hover:text-white transition">
          Overview
        </button>
        <button className="text-[#94A3B8] hover:text-white transition">
          Resources
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="text-white text-sm hover:opacity-80 transition">
          Login
        </button>

        {/* Sign Up */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-40"></div>

          <button className="relative z-10 px-4 py-2 text-sm font-medium text-[#2E1065] rounded-full bg-linear-to-r from-[#a78bfa] to-[#7c3aed] hover:opacity-90 transition cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
