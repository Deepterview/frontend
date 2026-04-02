const Header = () => {
  return (
    <>
      <div className="flex justify-between py-3 px-9 border-b border-[rgba(80,72,229,0.10)]">
        <div>
          <button className="text-[#CEBDFF] text-xl tracking-[-1px] font-bold leading-7 cursor-pointer">
            Deepterview
          </button>
        </div>
        <div className="flex gap-8 text-sm font-medium leading-5 tracking-[0.35px]">
          <button className="text-[#CEBDFF] cursor-pointer">Overview</button>
          <button className="text-[#94A3B8] cursor-pointer">Resources</button>
        </div>
        <div className="flex gap-6">
          <button className="text-white text-sm font-medium leading-5 cursor-pointer">
            Login
          </button>
          <button className="text-white text-sm font-medium px-2 py-2 bg-[rgba(155, 127, 237, 0.80)] rounded-2xl border  cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
